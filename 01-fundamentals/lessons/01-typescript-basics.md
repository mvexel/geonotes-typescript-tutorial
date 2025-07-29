# Lesson 1: TypeScript Basics

## Learning Objectives
- Understand TypeScript's type system and why it's valuable for enterprise APIs
- Learn primitive types, interfaces, and basic type annotations applied to geographic data
- Apply TypeScript types to GeoNotes domain concepts with compile-time safety

## TypeScript for Enterprise APIs

TypeScript adds static typing to JavaScript, enabling compile-time error detection and improved tooling for large codebases. For APIs handling geographic data and user-generated content, the type system prevents entire categories of runtime errors.

**JavaScript vs TypeScript:**
```javascript
// JavaScript - runtime errors only
function createNote(lat, lng, description) {
  return {
    latitude: lat,
    longitude: lng,
    description: description,
    createdAt: new Date()
  };
}

// This compiles but fails at runtime:
createNote("invalid", null, 123);
```

```typescript
// TypeScript - compile-time safety
function createNote(lat: number, lng: number, description: string): Note {
  return {
    latitude: lat,
    longitude: lng,
    description: description,
    createdAt: new Date()
  };
}

// TypeScript catches this before runtime:
// createNote("invalid", null, 123); // ❌ Compile error
```

**Reference:** [TypeScript Handbook - Basic Types](https://www.typescriptlang.org/docs/handbook/2/basic-types.html)

## Core Type System

### Primitive Types

**JavaScript vs TypeScript:**
```javascript
// JavaScript - no type constraints
let noteId = 1;
let description = "Road needs repair";
let coordinates = [40.7128, -74.0060];
// Any value can be assigned later: noteId = "string"; // No error
```

```typescript
// TypeScript - explicit type constraints
let noteId: number = 1;
let description: string = "Road needs repair";
let isPrivate: boolean = false;
let coordinates: number[] = [40.7128, -74.0060]; // [lat, lng]
let tags: string[] = ["urgent", "infrastructure"];

// Compile-time error prevention:
// noteId = "string"; // ❌ Type error
```

**Reference:** [TypeScript Handbook - Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)

### Optional Types

**JavaScript vs TypeScript:**
```javascript
// JavaScript - no indication which properties are optional
const note = {
  latitude: 40.7128,
  longitude: -74.0060,
  description: "Pothole"
  // id and ownerId may or may not be present
};
```

```typescript
// TypeScript - explicit optional properties
interface Note {
  id?: number;        // Set by database on creation
  latitude: number;   // Required - validated range
  longitude: number;  // Required - validated range
  description: string;
  ownerId?: number;   // Null for anonymous submissions
}
```

The `?` syntax makes optionality explicit in the type system, unlike JavaScript where any property might be undefined.

**Reference:** [TypeScript Handbook - Optional Properties](https://www.typescriptlang.org/docs/handbook/2/objects.html#optional-properties)

### Union Types

**JavaScript vs TypeScript:**
```javascript
// JavaScript - no constraint on state values
let noteState = "new"; // Could be typo'd as "nwe"
noteState = "invalid_state"; // No error, runtime bug
```

```typescript
// TypeScript - constrained to valid values
type NoteState = "new" | "taken" | "closed";
let noteState: NoteState = "new";
// noteState = "invalid_state"; // ❌ Compile error

// Enums provide runtime values and reverse mapping
enum NoteStateEnum {
  NEW = "new",
  TAKEN = "taken", 
  CLOSED = "closed"
}
```

Union types constrain values to specific options, preventing typos and invalid states that would cause runtime errors in JavaScript.

**Reference:** [TypeScript Handbook - Union Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types)

## Interfaces vs Types

**JavaScript vs TypeScript:**
```javascript
// JavaScript - no structure enforcement
const note = {
  latitude: 40.7128,
  longitude: -74.0060,
  description: "Issue",
  typo_in_property: "oops" // No error
};
```

```typescript
// TypeScript - enforced structure
interface BaseNote {
  latitude: number;
  longitude: number;
  description: string;
}

interface PublicNote extends BaseNote {
  id: number;
  state: NoteState;
}

// Type alias (more flexible for unions)
type NoteResponse = {
  id: number;
  latitude: number;
  longitude: number;
  description: string;
  state: NoteState;
  createdAt: Date;
};

// Usage patterns:
// - Interface: When you might extend or implement
// - Type: For unions, computed types, or simple aliases
```

**Reference:** [TypeScript Handbook - Interfaces](https://www.typescriptlang.org/docs/handbook/2/objects.html) and [Type Aliases](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-aliases)

## Building GeoNotes Types

Let's define types for our GeoNotes system, starting simple and building up:

```typescript
// Start with basic note structure
interface Note {
  id: number;
  latitude: number;     // Geographic coordinate
  longitude: number;    // Geographic coordinate  
  description: string;  // What the user reported
  userData: Record<string, any>;  // Extensible user-defined data
  createdAt: Date;      // When it was created
}

// For creating new notes (no id or timestamp yet)
interface NoteCreate {
  latitude: number;
  longitude: number;
  description: string;
  userData?: Record<string, any>;  // Optional extensible data
}

// For user accounts
interface User {
  id: number;
  username: string;
  email: string;
  isAdmin: boolean;     // Can manage other users
  disabled: boolean;    // Account status
  createdAt: Date;
}

// For user registration
interface UserCreate {
  username: string;
  email: string;
  password: string;
}
```

## Record Types and Extensible Data

**JavaScript vs TypeScript:**
```javascript
// JavaScript - no type safety for dynamic properties
const note = {
  id: 1,
  latitude: 40.7128,
  longitude: -74.0060,
  userData: {
    category: "road",
    severity: "high",
    estimatedCost: "should be number" // Type error not caught
  }
};
```

```typescript
// TypeScript - structured flexibility with Record<K, V>
interface Note {
  id: number;
  latitude: number;
  longitude: number;
  userData: Record<string, any>; // Any properties with string keys
}
```

The `Record<K, V>` utility type provides structured flexibility for extensible data:

```typescript
// Examples of how userData might be used:
const infrastructureNote: Note = {
  id: 1,
  latitude: 40.7128,
  longitude: -74.0060,
  description: "Pothole blocking bike lane",
  userData: {
    category: "road",
    severity: "high",
    estimatedCost: 500,
    affectedVehicles: ["car", "bike"]
  },
  createdAt: new Date()
};

const businessNote: Note = {
  id: 2,
  latitude: 40.7589,
  longitude: -73.9851,
  description: "Great new coffee shop",
  userData: {
    businessType: "restaurant",
    cuisine: "coffee",
    priceRange: "$$",
    hours: { mon: "7-19", tue: "7-19" },
    rating: 4.5
  },
  createdAt: new Date()
};

// Type-safe access requires checking
function getCostEstimate(note: Note): number | undefined {
  if (typeof note.userData.estimatedCost === 'number') {
    return note.userData.estimatedCost;
  }
  return undefined;
}
```

**Reference:** [TypeScript Handbook - Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)

## Type Guards and Validation

**JavaScript vs TypeScript:**
```javascript
// JavaScript - runtime validation only
function isValidNote(obj) {
  return obj && 
         typeof obj.latitude === 'number' &&
         typeof obj.longitude === 'number' &&
         typeof obj.description === 'string';
}
```

```typescript
// TypeScript - compile-time types + runtime validation
function isValidNoteCreate(obj: any): obj is NoteCreate {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.latitude === 'number' &&
    typeof obj.longitude === 'number' &&
    typeof obj.description === 'string' &&
    obj.latitude >= -90 && obj.latitude <= 90 &&
    obj.longitude >= -180 && obj.longitude <= 180
  );
}
```

TypeScript types are erased at runtime, so explicit validation is still required for external data:

**Reference:** [TypeScript Handbook - Type Guards](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates)

```typescript
// Usage in API endpoint
function createNote(requestData: unknown) {
  if (isValidNoteCreate(requestData)) {
    // TypeScript now knows 'requestData' is a NoteCreate
    console.log(`Creating note at ${requestData.latitude}, ${requestData.longitude}`);
    return requestData; // Safe to use
  } else {
    throw new Error('Invalid note data');
  }
}
```

## Generic Types

**JavaScript vs TypeScript:**
```javascript
// JavaScript - no way to specify what type of data ApiResponse contains
function getNotesResponse(notes) {
  return {
    data: notes,
    success: true,
    message: "Notes retrieved"
  };
}
```

```typescript
// TypeScript - generic constraints ensure type safety
interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

function getNotesResponse<T>(data: T): ApiResponse<T> {
  return {
    data,
    success: true,
    message: "Data retrieved"
  };
}
```

Generics provide type safety for reusable code patterns:

**Reference:** [TypeScript Handbook - Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)

```typescript
interface PagedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

// Usage - T gets replaced with actual types
type NotesResponse = ApiResponse<PagedResponse<Note>>;   // API response containing paged notes
type SingleNoteResponse = ApiResponse<Note>;             // API response containing one note
type UserResponse = ApiResponse<User>;                   // API response containing user info

// Example of what these types represent:
const notesList: NotesResponse = {
  success: true,
  data: {
    items: [/* array of Note objects */],
    total: 150,
    page: 1,
    pageSize: 20
  }
};
```

## Enterprise Type Safety Benefits

1. **Compile-time Safety**: Geographic coordinate validation, user permission checks
2. **API Contract Enforcement**: Request/response schemas prevent integration errors
3. **Refactoring Confidence**: Type system catches breaking changes across large codebases
4. **Team Collaboration**: Types serve as executable documentation
5. **IDE Integration**: Autocomplete and error detection improve development velocity

**Next:** Complete [Exercise 1: Basic Types](../exercises/01-basic-types.md) to practice defining GeoNotes domain types.

## Additional References

- [TypeScript Handbook - Basic Types](https://www.typescriptlang.org/docs/handbook/2/basic-types.html)
- [TypeScript Playground](https://www.typescriptlang.org/play)
- [Interface vs Type Aliases](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces)
- [Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html)