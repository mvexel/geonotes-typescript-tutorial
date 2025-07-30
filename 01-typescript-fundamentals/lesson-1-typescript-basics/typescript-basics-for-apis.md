# Lesson 1: TypeScript Basics for APIs

## Learning Objectives

By the end of this lesson, you'll understand why production APIs need structured data contracts, learn how TypeScript enforces these contracts at compile time, and apply TypeScript's type system to geographic data modeling.

## Why APIs Need Data Contracts

Building production APIs means serving external clients - mobile apps, web frontends, other services. These clients depend on consistent data structures. When an API changes unexpectedly, it breaks client applications in production.

**The core challenge:** How do you guarantee that your API returns consistent data shapes across time, team changes, and codebase evolution?

Traditional approaches include documentation-based contracts that easily drift out of sync with code, runtime validation that catches errors only after deployment, and integration testing that provides expensive and slow feedback loops.

**TypeScript's approach:** Move contract validation to **compile time**. If your code compiles, your contracts are valid.

## How TypeScript Enforces API Contracts

TypeScript acts as a **contract compiler** - it ensures your implementation matches your intended API shape before any code runs.

### The Problem Without Type Safety

```javascript
// JavaScript - API contract exists only in documentation
/**
 * @api {post} /notes Create Note
 * @apiParam {Number} latitude Geographic latitude (-90 to 90)
 * @apiParam {Number} longitude Geographic longitude (-180 to 180)
 * @apiParam {String} description Note description
 */
function createNote(req, res) {
  const { latitude, longitude, description } = req.body;
  
  // What if latitude is a string? What if longitude is missing?
  // What if someone adds a 'title' field to the request?
  
  const note = {
    id: generateId(),
    lat: latitude,  // Oops, API docs say 'latitude'
    lng: longitude, // Oops, API docs say 'longitude'
    desc: description, // Oops, API docs say 'description'
    created: new Date()
  };
  
  res.json({ data: note });
}
```

This approach suffers from property name mismatches between docs and implementation, no validation of incoming data types, silent failures when data structures change, and the need for manual synchronization between docs and code.

### TypeScript's Solution: Compile-Time Contracts

```typescript
// Define the contract explicitly
interface Note {
  id: number;
  latitude: number;  // Exact property names enforced
  longitude: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

interface NoteCreateRequest {
  latitude: number;
  longitude: number;
  description: string;
}

interface NoteResponse {
  data: Note;
}

function createNote(req: Request<{}, NoteResponse, NoteCreateRequest>, res: Response<NoteResponse>) {
  const { latitude, longitude, description } = req.body;
  
  // TypeScript ensures req.body matches NoteCreateRequest shape
  // TypeScript ensures we return data matching NoteResponse shape
  
  const note: Note = {
    id: generateId(),
    latitude,    // Must match interface property name
    longitude,   // Must match interface property name  
    description, // Must match interface property name
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  // TypeScript verifies this response matches NoteResponse
  res.json({ data: note });
}
```

TypeScript ensures that request structures match expected shapes, response structures match API contracts, property names are exactly correct, and data types are enforced throughout your application.

**Reference:** [TypeScript Handbook - Interfaces](https://www.typescriptlang.org/docs/handbook/2/objects.html)

## Why Geographic APIs Need Extra Structure

Geographic applications have unique constraints that make type safety critical:

### Coordinate Validation Requirements

Invalid coordinates can break spatial queries, cause database errors, or return nonsensical results. A latitude of 91° or longitude of 181° should never reach your database. But coordinate validation is tricky because coordinates can arrive in different formats - arrays, objects with different property names, or even strings that need parsing.

The approach that works is multi-layer validation: TypeScript contracts ensure consistent data shapes during processing, while runtime checks validate the actual numeric ranges. This combination prevents both structural issues (wrong property names) and business logic violations (invalid ranges).

```typescript
// Without TypeScript - coordinate corruption
function updateNoteLocation(noteId, coords) {
  // coords might be [lat, lng] or {lat, lng} or {latitude, longitude}
  // Different formats cause silent bugs
  const lat = coords[0] || coords.lat || coords.latitude;
  const lng = coords[1] || coords.lng || coords.longitude;
  
  // lat/lng might be undefined, strings, or out of range
  database.updateNote(noteId, { latitude: lat, longitude: lng });
}

// With TypeScript - explicit coordinate contract
interface Coordinates {
  latitude: number;  // Must be number
  longitude: number; // Must be number
}

function updateNoteLocation(noteId: number, coords: Coordinates): void {
  // TypeScript guarantees coords has latitude/longitude as numbers
  
  // Still need runtime validation for ranges
  if (coords.latitude < -90 || coords.latitude > 90) {
    throw new Error(`Invalid latitude: ${coords.latitude}`);
  }
  if (coords.longitude < -180 || coords.longitude > 180) {
    throw new Error(`Invalid longitude: ${coords.longitude}`);
  }
  
  // Now safe to store
  database.updateNote(noteId, coords);
}
```

### Flexible User Data Requirements

Different note types need different metadata. Infrastructure reports need severity levels, business reviews need ratings, events need dates. The challenge is building a system that's both flexible enough to handle diverse data and strict enough to prevent errors.

Discriminated unions provide type-safe polymorphism - you can have different note types with different required fields, and TypeScript ensures you handle each type correctly. The type field acts as a discriminator, telling TypeScript which properties are available on each specific note instance.

```typescript
// Flexible but type-safe note structure
interface BaseNote {
  id: number;
  latitude: number;
  longitude: number;
  description: string;
  createdAt: Date;
}

interface InfrastructureNote extends BaseNote {
  type: 'infrastructure';
  severity: 'low' | 'medium' | 'high';
  category: 'road' | 'utilities' | 'safety';
  estimatedCost?: number;
}

interface BusinessNote extends BaseNote {
  type: 'business';
  businessName: string;
  rating: number;
  priceRange: '$' | '$$' | '$$$';
}

type Note = InfrastructureNote | BusinessNote;

// TypeScript ensures exhaustive handling
function formatNoteForDisplay(note: Note): string {
  switch (note.type) {
    case 'infrastructure':
      // TypeScript knows this has severity, category, estimatedCost
      return `${note.description} (Severity: ${note.severity})`;
    case 'business':
      // TypeScript knows this has businessName, rating, priceRange
      return `${note.businessName}: ${note.description} (${note.rating}/5)`;
    // TypeScript error if we forget a case
  }
}
```

**Reference:** [TypeScript Discriminated Unions](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions)

## Building Type-Safe API Layers

Production APIs need multiple layers of validation and transformation. TypeScript helps structure these layers clearly.

### Input Validation Layer

External data can't be trusted - users send malformed JSON, missing fields, or wrong data types. For geographic APIs, this is especially critical since invalid coordinates can crash spatial queries or corrupt your database.

The solution is to create type guards that bridge runtime validation with compile-time types. These functions validate incoming data and inform TypeScript about what passed validation, giving you type safety throughout the rest of your application.

```typescript
// Runtime validation that informs TypeScript
function isValidNoteCreate(obj: unknown): obj is NoteCreateRequest {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof (obj as any).latitude === 'number' &&
    typeof (obj as any).longitude === 'number' &&
    typeof (obj as any).description === 'string' &&
    (obj as any).latitude >= -90 && (obj as any).latitude <= 90 &&
    (obj as any).longitude >= -180 && (obj as any).longitude <= 180 &&
    (obj as any).description.length > 0 && (obj as any).description.length <= 1000
  );
}

// API endpoint with type-safe validation
app.post('/notes', (req, res) => {
  // req.body is unknown - could be anything
  if (!isValidNoteCreate(req.body)) {
    return res.status(400).json({ 
      error: 'Invalid note data',
      details: 'Required: latitude (-90 to 90), longitude (-180 to 180), description (1-1000 chars)'
    });
  }
  
  // Now TypeScript knows req.body is NoteCreateRequest
  const note = createNoteFromRequest(req.body);
  res.status(201).json({ data: note });
});
```

### Response Formatting Layer

Internal data models often contain sensitive information or aren't optimized for API responses. Your database might store user IDs, internal notes, or audit fields that shouldn't be exposed to clients. Additionally, you might want to restructure data for better client consumption.

Transformation functions with explicit input and output types solve this problem elegantly. TypeScript ensures these transformations are complete and consistent - you can't accidentally leak sensitive data or forget required fields.

```typescript
// Internal database model (might have sensitive fields)
interface DatabaseNote {
  id: number;
  latitude: number;
  longitude: number;
  description: string;
  ownerId: number;  // Sensitive - don't expose
  internalNotes: string; // Internal use only
  createdAt: Date;
  updatedAt: Date;
}

// Public API response model
interface PublicNote {
  id: number;
  latitude: number;
  longitude: number;
  description: string;
  createdAt: Date;
}

// Type-safe transformation
function formatNoteForPublicAPI(dbNote: DatabaseNote): PublicNote {
  return {
    id: dbNote.id,
    latitude: dbNote.latitude,
    longitude: dbNote.longitude,
    description: dbNote.description,
    createdAt: dbNote.createdAt
    // TypeScript ensures we don't accidentally include sensitive fields
    // TypeScript ensures we don't forget required fields
  };
}
```

## Type Safety Across Async Operations

Geographic APIs involve many async operations - database queries, geocoding services, spatial calculations. Type errors in async code are particularly nasty because they often manifest as runtime failures in production, long after the initial request.

Consider a common scenario: creating a note from an address. You need to geocode the address, validate the confidence level, then store the result. Each step has different data shapes and potential failure modes. TypeScript's typed Promises help you navigate this complexity by ensuring each async operation returns the expected data shape and that you handle all the transformations correctly.

```typescript
// Type-safe async operations
interface GeocodingResult {
  latitude: number;
  longitude: number;
  address: string;
  confidence: number;
}

interface DatabaseNote {
  id: number;
  latitude: number;
  longitude: number;
  description: string;
  createdAt: Date;
}

// TypeScript ensures Promise types match
async function createNoteFromAddress(description: string, address: string): Promise<DatabaseNote> {
  // TypeScript knows this returns Promise<GeocodingResult>
  const coords: GeocodingResult = await geocodeAddress(address);
  
  if (coords.confidence < 0.8) {
    throw new Error('Address geocoding confidence too low');
  }
  
  // TypeScript ensures we use the right properties
  const note: DatabaseNote = await database.notes.create({
    latitude: coords.latitude,
    longitude: coords.longitude,
    description,
    createdAt: new Date()
  });
  
  // TypeScript guarantees return type matches Promise<DatabaseNote>
  return note;
}
```

**Reference:** [TypeScript Async/Await](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-1-7.html#asyncawait)

## Practical Exercise: Building GeoNotes Types

Create a complete type-safe foundation for the GeoNotes API:

```typescript
// TODO: Define core interfaces
interface GeoNote {
  // Define the complete note structure
  // Consider: id, coordinates, content, metadata, timestamps
}

// TODO: Define request/response types
interface CreateNoteRequest {
  // What should clients send to create a note?
}

interface NoteListResponse {
  // How should paginated note lists be structured?
  // Consider: data array, pagination metadata, total count
}

// TODO: Define discriminated unions for note types
type NoteType = 'infrastructure' | 'business' | 'event';

interface InfrastructureNote extends GeoNote {
  // Infrastructure-specific fields
}

// TODO: Implement type guards
function isValidCreateNoteRequest(obj: unknown): obj is CreateNoteRequest {
  // Validate structure and business rules
  // Check coordinate ranges, description length, etc.
}

// TODO: Define async service interface  
interface NoteService {
  createNote(request: CreateNoteRequest): Promise<GeoNote>;
  findNearbyNotes(lat: number, lng: number, radiusMeters: number): Promise<GeoNote[]>;
  updateNote(id: number, updates: Partial<GeoNote>): Promise<GeoNote>;
}
```

Focus on geographic coordinate validation with proper lat/lng ranges, flexible metadata structures for different note types, type-safe async operations with proper Promise types, input validation with type guards, and response formatting to hide sensitive data.

**Next:** Continue to [Lesson 2: Advanced Types & Domain Modeling](../lesson-2-advanced-types/advanced-types-domain-modeling.md) to learn how generics and utility types scale these patterns across your entire API.

## Additional References

- [TypeScript Handbook - Basic Types](https://www.typescriptlang.org/docs/handbook/2/basic-types.html)
- [API Design with TypeScript](https://www.typescriptlang.org/docs/handbook/declaration-files/by-example.html)
- [Type Guards and Differentiating Types](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)