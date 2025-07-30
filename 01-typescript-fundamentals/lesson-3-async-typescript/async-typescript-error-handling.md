# Lesson 3: Async TypeScript & Error Handling

## Learning Objectives
- Master Promise types and async/await patterns in TypeScript
- Implement type-safe error handling for API operations
- Use Result types for explicit error handling
- Handle concurrent operations with proper typing

## Promise Types and Async Operations

TypeScript provides strong typing for asynchronous operations, preventing common Promise-related bugs.

**JavaScript vs TypeScript:**
```javascript
// JavaScript - no type safety for async operations
async function fetchNote(id) {
  const response = await fetch(`/api/notes/${id}`);
  const data = await response.json();
  return data; // Could be anything
}

// Usage - no type checking
const note = await fetchNote(123);
console.log(note.invalidProperty); // Runtime error
```

```typescript
// TypeScript - type-safe async operations
async function fetchNote(id: number): Promise<Note> {
  const response = await fetch(`/api/notes/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch note: ${response.status}`);
  }
  const data: Note = await response.json();
  return data;
}

// Usage - compile-time type checking
const note: Note = await fetchNote(123);
console.log(note.description); // ✅ Type-safe property access
// console.log(note.invalidProperty); // ❌ Compile error
```

**Reference:** [TypeScript Promises](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-1-7.html#asyncawait)

## Type-Safe Error Handling

Traditional try/catch doesn't provide type information about errors. TypeScript can help create more structured error handling.

### Custom Error Types

```typescript
// Define specific error types for your domain
abstract class AppError extends Error {
  abstract readonly statusCode: number;
  abstract readonly isOperational: boolean;
  
  constructor(message: string, public readonly context?: Record<string, unknown>) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

class ValidationError extends AppError {
  readonly statusCode = 400;
  readonly isOperational = true;
  
  constructor(message: string, public readonly field: string) {
    super(message, { field });
  }
}

class NotFoundError extends AppError {
  readonly statusCode = 404;
  readonly isOperational = true;
}

class DatabaseError extends AppError {
  readonly statusCode = 500;
  readonly isOperational = false;
}
```

### Service Layer with Typed Errors

```typescript
class NoteService {
  async createNote(data: NoteCreate): Promise<Note> {
    // Validate coordinates
    if (data.latitude < -90 || data.latitude > 90) {
      throw new ValidationError('Invalid latitude', 'latitude');
    }
    if (data.longitude < -180 || data.longitude > 180) {
      throw new ValidationError('Invalid longitude', 'longitude');
    }
    
    try {
      const note = await this.database.notes.create({
        data: {
          ...data,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      });
      return note;
    } catch (error) {
      if (error.code === 'P2002') { // Prisma unique constraint
        throw new ValidationError('Note already exists at this location', 'coordinates');
      }
      throw new DatabaseError('Failed to create note');
    }
  }
  
  async findNoteById(id: number): Promise<Note> {
    const note = await this.database.notes.findUnique({ where: { id } });
    if (!note) {
      throw new NotFoundError(`Note with id ${id} not found`);
    }
    return note;
  }
}
```

## Result Types for Explicit Error Handling

Instead of throwing exceptions, use Result types to make error handling explicit and type-safe.

### Result Type Implementation

```typescript
// Result type that can represent success or failure
type Result<T, E = Error> = Success<T> | Failure<E>;

interface Success<T> {
  success: true;
  data: T;
}

interface Failure<E> {
  success: false;
  error: E;
}

// Helper functions for creating Results
function ok<T>(data: T): Success<T> {
  return { success: true, data };
}

function err<E>(error: E): Failure<E> {
  return { success: false, error };
}
```

### Service with Result Types

```typescript
class SafeNoteService {
  async createNote(data: NoteCreate): Promise<Result<Note, ValidationError | DatabaseError>> {
    // Validate coordinates
    if (data.latitude < -90 || data.latitude > 90) {
      return err(new ValidationError('Invalid latitude', 'latitude'));
    }
    
    try {
      const note = await this.database.notes.create({ data });
      return ok(note);
    } catch (error) {
      return err(new DatabaseError('Failed to create note'));
    }
  }
  
  async findNoteById(id: number): Promise<Result<Note, NotFoundError | DatabaseError>> {
    try {
      const note = await this.database.notes.findUnique({ where: { id } });
      if (!note) {
        return err(new NotFoundError(`Note with id ${id} not found`));
      }
      return ok(note);
    } catch (error) {
      return err(new DatabaseError('Database query failed'));
    }
  }
}

// Usage - explicit error handling
const noteResult = await noteService.createNote(noteData);
if (noteResult.success) {
  console.log('Created note:', noteResult.data.id);
} else {
  console.error('Failed to create note:', noteResult.error.message);
}
```

## Concurrent Operations with Type Safety

Handle multiple async operations concurrently while maintaining type safety.

### Parallel Operations

```typescript
// Type-safe parallel operations
async function getNoteWithRelatedData(noteId: number): Promise<{
  note: Note;
  owner: User;
  nearbyNotes: Note[];
}> {
  const [noteResult, ownerResult, nearbyResult] = await Promise.all([
    noteService.findNoteById(noteId),
    userService.findUserById(ownerId), // Need to get ownerId first
    noteService.findNearby(latitude, longitude, 1000)
  ]);
  
  // Handle Results if using Result types
  if (!noteResult.success) throw noteResult.error;
  if (!ownerResult.success) throw ownerResult.error;
  if (!nearbyResult.success) throw nearbyResult.error;
  
  return {
    note: noteResult.data,
    owner: ownerResult.data,
    nearbyNotes: nearbyResult.data
  };
}
```

### Async Generators for Streaming

```typescript
// Stream large datasets with proper typing
async function* streamNotesInRadius(
  latitude: number,
  longitude: number,
  radiusMeters: number,
  batchSize = 100
): AsyncGenerator<Note[], void, unknown> {
  let offset = 0;
  
  while (true) {
    const notes = await database.notes.findMany({
      where: {
        // Spatial query using PostGIS
        location: {
          distance_lt: [latitude, longitude, radiusMeters]
        }
      },
      skip: offset,
      take: batchSize,
      orderBy: { createdAt: 'desc' }
    });
    
    if (notes.length === 0) break;
    
    yield notes;
    offset += batchSize;
    
    if (notes.length < batchSize) break; // Last batch
  }
}

// Usage
for await (const noteBatch of streamNotesInRadius(40.7128, -74.0060, 5000)) {
  console.log(`Processing ${noteBatch.length} notes`);
  await processBatch(noteBatch);
}
```

## Advanced Async Patterns

### Retry with Exponential Backoff

```typescript
async function withRetry<T>(
  operation: () => Promise<T>,
  maxRetries = 3,
  baseDelay = 1000
): Promise<T> {
  let lastError: Error;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error as Error;
      
      if (attempt === maxRetries) break;
      
      // Exponential backoff
      const delay = baseDelay * Math.pow(2, attempt);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw lastError!;
}

// Usage
const note = await withRetry(
  () => externalApiService.fetchNote(id),
  3,
  1000
);
```

### Timeout Wrapper

```typescript
async function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number,
  timeoutMessage = 'Operation timed out'
): Promise<T> {
  const timeoutPromise = new Promise<never>((_, reject) => {
    setTimeout(() => reject(new Error(timeoutMessage)), timeoutMs);
  });
  
  return Promise.race([promise, timeoutPromise]);
}

// Usage
const note = await withTimeout(
  slowDatabaseQuery(),
  5000,
  'Database query timed out after 5 seconds'
);
```

## Practical Exercise

Implement a complete async service for GeoNotes with proper error handling:

```typescript
// TODO: Implement NoteService with:
class NoteService {
  // 1. Create note with validation and error handling
  async createNote(data: NoteCreate): Promise<Result<Note, ValidationError | DatabaseError>> {
    // Validate coordinates, description length, etc.
    // Handle database errors
  }
  
  // 2. Batch create with concurrent processing
  async createNoteBatch(notes: NoteCreate[]): Promise<{
    successful: Note[];
    failed: Array<{ note: NoteCreate; error: Error }>;
  }> {
    // Process notes concurrently with error isolation
  }
  
  // 3. Stream nearby notes with async generator
  async* findNearbyStream(
    lat: number, 
    lng: number, 
    radius: number
  ): AsyncGenerator<Note[], void, unknown> {
    // Implement streaming with proper cleanup
  }
  
  // 4. Retry wrapper for external API calls
  async geocodeAddress(address: string): Promise<{ lat: number; lng: number }> {
    // Implement with retry logic and timeout
  }
}
```

**Next:** Continue to [Chapter 2: Framework Selection & Architecture](../../02-framework-selection-architecture/) to choose between Express and NestJS for your GeoNotes API.

## Additional References

- [TypeScript Async/Await](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-1.html#asyncawait)
- [Error Handling Best Practices](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-4.html#control-flow-analysis-of-aliased-conditions-and-discriminants)
- [Promise Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#promise)
- [Async Iterators](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-3.html#async-iteration)