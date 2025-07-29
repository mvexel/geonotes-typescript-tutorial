# Lesson 1: TypeScript Basics

## Learning Objectives
- Understand TypeScript's type system and why it's valuable
- Learn primitive types, interfaces, and basic type annotations
- Apply TypeScript types to GeoNotes domain concepts

## TypeScript for Enterprise APIs

TypeScript adds static typing to JavaScript, enabling compile-time error detection and improved tooling for large codebases. For APIs handling geographic data and user-generated content, the type system prevents entire categories of runtime errors.


```typescript
// TypeScript - catches errors before running
interface NoteCreate {
  latitude: number;
  longitude: number; 
  description: string;
  isPrivate?: boolean; // Optional property
}

function createNote(lat: number, lng: number, description: string): NoteCreate {
  return {
    latitude: lat,
    longitude: lng,
    description: description,
    isPrivate: false
  };
}

// Prevents coordinate validation errors at compile time
// createNote("not a number", null, 123); // ❌ Type error!
```

## Core Type System

### Primitive Types

```typescript
// Geographic data requires precise typing
let noteId: number = 1;
let description: string = "Road needs repair";
let isPrivate: boolean = false;
let coordinates: number[] = [40.7128, -74.0060]; // [lat, lng]
let tags: string[] = ["urgent", "infrastructure"];

// Avoid 'any' - defeats type safety purpose
// let metadata: any = { source: "mobile_app" }; // ❌ Poor practice
let metadata: { source: string; timestamp?: Date } = { source: "mobile_app" }; // ✅ Better
```

### Optional Types

```typescript
// Optional properties for API flexibility
interface Note {
  id?: number;        // Set by database on creation
  latitude: number;   // Required - validated range
  longitude: number;  // Required - validated range
  description: string;
  ownerId?: number;   // Null for anonymous submissions
}
```

### Union Types

```typescript
// String literal unions for controlled vocabularies
type NoteState = "new" | "taken" | "closed";
type ID = string | number; // API flexibility

// Enums provide runtime values and reverse mapping
enum NoteState {
  NEW = "new",
  TAKEN = "taken", 
  CLOSED = "closed"
}

// String literals vs enums: use literals for simple cases, enums for complex logic
```

## Interfaces vs Types

TypeScript has two ways to define object shapes:

```typescript
// Interface (extendable, like class inheritance)
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

// When to use which:
// - Interface: When you might extend or implement
// - Type: For unions, computed types, or simple aliases
```

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

## Type Guards and Validation

TypeScript types are removed at runtime, so we need explicit validation for user input:

```typescript
// Type guard function - checks if data matches our Note interface
function isValidNoteCreate(obj: any): obj is NoteCreate {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.latitude === 'number' &&
    typeof obj.longitude === 'number' &&
    typeof obj.description === 'string' &&
    obj.latitude >= -90 && obj.latitude <= 90 &&        // Valid latitude
    obj.longitude >= -180 && obj.longitude <= 180 &&     // Valid longitude
    obj.description.length > 0                           // Not empty
  );
}

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

## Record Types and Extensible Data

The `Record<K, V>` type is perfect for extensible data structures:

```typescript
// Record<string, any> allows any property with string keys
interface Note {
  id: number;
  latitude: number;
  longitude: number;
  description: string;
  userData: Record<string, any>;  // Flexible user data
  createdAt: Date;
}

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

## Generic Types

TypeScript generics are powerful for reusable code:

```typescript
// Generic response wrapper - works with any data type
interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

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

## Why TypeScript Matters for APIs

1. **Compile-time Safety**: Catch errors before your code runs
2. **Better IntelliSense**: Your editor can provide accurate autocomplete
3. **Refactoring**: Rename variables/functions safely across your entire codebase
4. **Documentation**: Types serve as inline documentation
5. **Team Collaboration**: Types make code intent clear to other developers

## Enterprise Type Safety Benefits

1. **Compile-time Safety**: Geographic coordinate validation, user permission checks
2. **API Contract Enforcement**: Request/response schemas prevent integration errors
3. **Refactoring Confidence**: Type system catches breaking changes across large codebases
4. **Team Collaboration**: Types serve as executable documentation
5. **IDE Integration**: Autocomplete and error detection improve development velocity

**Next:** Complete [Exercise 1: Basic Types](../exercises/01-basic-types.md) to practice defining GeoNotes domain types.

## References
- [TypeScript Handbook - Basic Types](https://www.typescriptlang.org/docs/handbook/2/basic-types.html)
- [TypeScript Playground](https://www.typescriptlang.org/play)
- [Interface vs Type](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces)