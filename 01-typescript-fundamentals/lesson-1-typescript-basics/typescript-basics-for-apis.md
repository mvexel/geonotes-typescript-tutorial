# Lesson 1: TypeScript Basics for APIs

## Learning Objectives
- Understand why TypeScript prevents common API bugs
- Apply basic types to geographic data structures
- Build type-safe interfaces for the GeoNotes domain

## Why TypeScript for APIs?

APIs serve external clients that expect consistent data shapes. TypeScript catches breaking changes before deployment.

**JavaScript problem:**
```javascript
// Works until coordinates change from array to object
function createNote(lat, lng, description) {
  return { latitude: lat, longitude: lng, description };
}

// Later, someone changes the interface
createNote([40.7128, -74.0060], null, "Pothole"); // Runtime error
```

**TypeScript solution:**
```typescript
function createNote(lat: number, lng: number, description: string): Note {
  return { latitude: lat, longitude: lng, description };
}

// createNote([40.7128, -74.0060], null, "Pothole"); // ❌ Compile error
createNote(40.7128, -74.0060, "Pothole"); // ✅ Correct usage
```

**Reference:** [TypeScript Handbook - Basic Types](https://www.typescriptlang.org/docs/handbook/2/basic-types.html)

## Core Types for GeoNotes

### Primitive Types

```typescript
// Geographic coordinates
let latitude: number = 40.7128;
let longitude: number = -74.0060;

// Note content  
let description: string = "Pothole blocking bike lane";
let isPrivate: boolean = false;
let tags: string[] = ["urgent", "infrastructure"];

// API responses
let statusCode: number = 201;
let errorMessage: string | null = null; // Union type
```

### Interfaces for Data Structures

Define the shape of your API data:

```typescript
interface Note {
  id: number;
  latitude: number;
  longitude: number;
  description: string;
  isPrivate: boolean;
  userData: Record<string, unknown>; // Flexible user data
  createdAt: Date;
  updatedAt: Date;
}

interface User {
  id: number;
  username: string;
  email: string;
  isAdmin: boolean;
  createdAt: Date;
}

// For creating notes (no id or timestamps yet)
interface NoteCreate {
  latitude: number;
  longitude: number;
  description: string;
  isPrivate?: boolean; // Optional with default
  userData?: Record<string, unknown>;
}
```

**JavaScript vs TypeScript:**
```javascript
// JavaScript - no structure enforcement
const note = {
  lat: 40.7128, // Typo - should be latitude
  lng: -74.0060, // Typo - should be longitude  
  desc: "Issue" // Typo - should be description
};
```

```typescript
// TypeScript - enforced structure
const note: Note = {
  id: 1,
  latitude: 40.7128, // Correct property name required
  longitude: -74.0060,
  description: "Pothole",
  isPrivate: false,
  userData: {},
  createdAt: new Date(),
  updatedAt: new Date()
};
```

**Reference:** [TypeScript Interfaces](https://www.typescriptlang.org/docs/handbook/2/objects.html)

## Union Types for Business Logic

Constrain values to valid options:

```typescript
type NoteState = "new" | "open" | "closed";
type Priority = "low" | "medium" | "high";
type NoteType = "infrastructure" | "business" | "event";

interface NoteWithState extends Note {
  state: NoteState;
  priority: Priority;
  type: NoteType;
}

// Usage
function updateNoteState(note: NoteWithState, newState: NoteState) {
  // TypeScript ensures only valid states
  note.state = newState;
  // note.state = "invalid"; // ❌ Compile error
}
```

**Reference:** [Union Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types)

## Optional Properties and Nullable Types

Handle missing data explicitly:

```typescript
interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: string; // Optional - only present on errors
  meta?: {
    page: number;
    totalCount: number;
  };
}

// Handling nullable values
function findNoteById(id: number): Note | null {
  // Returns Note or null if not found
  return database.findNote(id);
}

// Usage requires null checking
const note = findNoteById(123);
if (note !== null) {
  console.log(note.description); // Safe access
}
```

## Type Guards for Runtime Validation

TypeScript types disappear at runtime, so validate external data:

```typescript
function isValidNoteCreate(obj: unknown): obj is NoteCreate {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof (obj as any).latitude === 'number' &&
    typeof (obj as any).longitude === 'number' &&
    typeof (obj as any).description === 'string' &&
    (obj as any).latitude >= -90 && (obj as any).latitude <= 90 &&
    (obj as any).longitude >= -180 && (obj as any).longitude <= 180
  );
}

// API endpoint usage
function createNoteEndpoint(requestBody: unknown) {
  if (!isValidNoteCreate(requestBody)) {
    throw new Error('Invalid note data');
  }
  
  // Now TypeScript knows requestBody is NoteCreate
  return createNote(requestBody);
}
```

**Reference:** [Type Guards](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates)

## Building GeoNotes Domain Types

Put it together for the GeoNotes API:

```typescript
// Core domain types
interface GeoNote {
  id: number;
  latitude: number;
  longitude: number;
  description: string;
  type: 'infrastructure' | 'business' | 'event';
  state: 'new' | 'open' | 'closed';
  isPrivate: boolean;
  ownerId: number | null; // Null for anonymous notes
  userData: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

// API operation types
type GeoNoteCreate = Omit<GeoNote, 'id' | 'createdAt' | 'updatedAt'>;
type GeoNoteUpdate = Partial<Pick<GeoNote, 'description' | 'state' | 'isPrivate'>>;

// Response types
interface GeoNoteListResponse {
  notes: GeoNote[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
  };
}

interface GeoNoteResponse {
  note: GeoNote;
}
```

## Practical Exercise

Create types for a simple note management system:

```typescript
// TODO: Define these interfaces
interface Note {
  // Basic note properties
}

interface NoteFilters {
  // For searching/filtering notes
  type?: 'infrastructure' | 'business' | 'event';
  state?: 'new' | 'open' | 'closed';
  withinRadius?: {
    latitude: number;
    longitude: number;
    meters: number;
  };
}

interface NoteService {
  // Define method signatures
  createNote(data: unknown): Promise<Note>;
  findNotes(filters: NoteFilters): Promise<Note[]>;
  updateNote(id: number, updates: unknown): Promise<Note>;
  deleteNote(id: number): Promise<void>;
}

// TODO: Implement type guards for validation
function isValidNoteCreate(obj: unknown): obj is NoteCreate {
  // Validate the structure
}
```

**Next:** Continue to [Lesson 2: Advanced Types & Domain Modeling](../lesson-2-advanced-types/advanced-types-domain-modeling.md) to learn generics and utility types.

## Additional References

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [TypeScript Playground](https://www.typescriptlang.org/play)
- [Type vs Interface](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces)