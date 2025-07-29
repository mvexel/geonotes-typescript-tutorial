# Lesson 1: TypeScript Basics

## Learning Objectives
- Understand TypeScript's type system and why it's valuable
- Learn primitive types, interfaces, and basic type annotations
- Apply TypeScript types to GeoNotes domain concepts

## What is TypeScript?

TypeScript is JavaScript with type annotations. It helps catch errors at compile time rather than runtime, making your code more reliable and easier to maintain.

```javascript
// Regular JavaScript - no type checking
function createNote(lat, lng, description) {
  return {
    latitude: lat,
    longitude: lng,
    description: description,
    createdAt: new Date()
  };
}

// This will cause runtime errors but JavaScript won't warn you:
createNote("not a number", null, 123);
```

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

// TypeScript will show an error before you run this:
// createNote("not a number", null, 123); // ❌ Type error!
```

## Core Type System

### Primitive Types

```typescript
// Basic types you'll use constantly
let noteId: number = 1;                        // integers and floats
let description: string = "Road needs repair"; // text
let isPrivate: boolean = false;                // true/false
let coordinates: number[] = [40.7128, -74.0060]; // array of numbers
let metadata: any = { source: "mobile_app" };  // avoid 'any' when possible

// TypeScript is more specific than regular JavaScript
let latitude: number = 40.7128;   // All numbers (int, float, etc.)
let tags: string[] = ["urgent", "infrastructure"]; // Array of strings
```

### Optional Types

```typescript
// TypeScript uses ? for optional properties
interface Note {
  id?: number;        // Optional (like Python's Optional[int])
  latitude: number;   // Required
  longitude: number;  // Required
  description: string;
  ownerId?: number;   // May be undefined for anonymous notes
}
```

### Union Types

```typescript
// Similar to Python's Union type
type NoteState = "new" | "taken" | "closed"; // String literal union
type ID = string | number; // Multiple types allowed

// Your Python enum becomes:
enum NoteState {
  NEW = "new",
  TAKEN = "taken", 
  CLOSED = "closed"
}
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
  createdAt: Date;      // When it was created
}

// For creating new notes (no id or timestamp yet)
interface NoteCreate {
  latitude: number;
  longitude: number;
  description: string;
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

## Next Steps

1. Complete the exercises in `01-fundamentals/exercises/01-basic-types.md`
2. Study the reference materials in `01-fundamentals/references/`
3. Practice creating types for common web API patterns

## References
- [TypeScript Handbook - Basic Types](https://www.typescriptlang.org/docs/handbook/2/basic-types.html)
- [TypeScript Playground](https://www.typescriptlang.org/play) - Try TypeScript online
- [Interface vs Type](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces)