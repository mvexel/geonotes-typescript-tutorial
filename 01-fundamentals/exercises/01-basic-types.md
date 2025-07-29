# Exercise 1: Basic TypeScript Types

## Objective
Define TypeScript interfaces and types for the GeoNotes API domain, focusing on geographic data validation and extensible user data structures.

## Setup
Create `exercises/01-basic-types.ts` and implement the following type definitions.

## Exercise 1: Define Note States

Our GeoNotes API needs to track the lifecycle of notes. A note can be:
- "new" - Just reported, needs attention
- "taken" - Someone is working on it  
- "closed" - Issue resolved

**Your Task**: Create TypeScript types for note states using both string literal unions and enums.

<details>
<summary>Solution</summary>

```typescript
// Option 1: String literal union (preferred for simple cases)
type NoteState = "new" | "taken" | "closed";

// Option 2: Enum (good for more complex cases)
enum NoteStateEnum {
  NEW = "new",
  TAKEN = "taken",
  CLOSED = "closed"
}

// Usage examples
let currentState: NoteState = "new"; // ✅ Valid
let enumState: NoteStateEnum = NoteStateEnum.NEW; // ✅ Valid
// let invalidState: NoteState = "invalid"; // ❌ TypeScript error
```
</details>

## Exercise 2: Create Note Interfaces

Our API needs interfaces for creating and returning notes.

A note creation request should include:
- latitude (number between -90 and 90)
- longitude (number between -180 and 180)
- description (string)
- isPrivate (optional boolean, defaults to false)
- userData (optional object for extensible user-defined data)

A note response includes all creation fields plus:
- id (number)
- state (one of the note states from exercise 1)
- createdAt (Date)
- ownerId (optional number, for private notes)
- userData (required object for extensible user-defined data)

**Your Task**: Create TypeScript interfaces for `NoteCreate` and `NoteResponse`.

<details>
<summary>Solution</summary>

```typescript
interface NoteCreate {
  latitude: number;
  longitude: number;
  description: string;
  isPrivate?: boolean; // Optional with default false
  userData?: Record<string, any>; // Optional extensible data
}

interface NoteResponse {
  id: number;
  latitude: number;
  longitude: number;
  description: string;
  state: NoteState;
  isPrivate: boolean;
  userData: Record<string, any>; // Required extensible data
  createdAt: Date;
  ownerId?: number; // Optional - only set for private notes
}

// Example usage:
const infrastructureReport: NoteCreate = {
  latitude: 40.7128,
  longitude: -74.0060,
  description: "Pothole blocking bike lane",
  userData: {
    category: "infrastructure",
    severity: "high",
    estimatedCost: 500
  }
};

const businessListing: NoteCreate = {
  latitude: 40.7589,
  longitude: -73.9851,
  description: "New artisan bakery",
  userData: {
    businessType: "food",
    cuisine: "bakery",
    priceRange: "$$",
    openingHours: "6-18"
  }
};
```
</details>

## Exercise 3: Generic Types

Create a generic wrapper for API responses, similar to your Python response patterns:

**Your Task**: Create generic types for:
1. Standard API response wrapper
2. Paginated response
3. Error response

<details>
<summary>Solution</summary>

```typescript
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
  hasNext: boolean;
  hasPrevious: boolean;
}

interface ErrorResponse {
  error: string;
  details?: string[];
  code: number;
}

// Usage examples
type NotesListResponse = ApiResponse<PagedResponse<NoteResponse>>;
type SingleNoteResponse = ApiResponse<NoteResponse>;
```
</details>

## Exercise 4: Type Guards

Our API receives data from users that might not match our types. We need functions to validate the data at runtime.

**Your Task**: Write type guards for:
1. Validating if an object is a valid `NoteCreate` (check all required fields and coordinate ranges)
2. Checking if a string is a valid `NoteState`

<details>
<summary>Solution</summary>

```typescript
function isNoteCreate(obj: any): obj is NoteCreate {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.latitude === 'number' &&
    typeof obj.longitude === 'number' &&
    typeof obj.description === 'string' &&
    (obj.isPrivate === undefined || typeof obj.isPrivate === 'boolean') &&
    (obj.userData === undefined || (typeof obj.userData === 'object' && obj.userData !== null)) &&
    obj.latitude >= -90 && obj.latitude <= 90 &&
    obj.longitude >= -180 && obj.longitude <= 180
  );
}

function isValidNoteState(value: string): value is NoteState {
  return ['new', 'taken', 'closed'].includes(value);
}

// Usage
function processNoteData(data: unknown) {
  if (isNoteCreate(data)) {
    console.log(`Creating note at ${data.latitude}, ${data.longitude}`);
    return data; // TypeScript knows this is NoteCreate
  }
  throw new Error('Invalid note data');
}
```
</details>

## Exercise 5: User Management Types

Our API also needs user management. Create types for:

1. **User interface** with id, username, email, isAdmin (boolean), disabled (boolean), createdAt
2. **UserCreate interface** for registration (username, email, password, optional isAdmin)
3. **AuthResponse interface** for login (user info + accessToken string + expiresIn number)

**Your Task**: Define these three interfaces for user management.

<details>
<summary>Solution</summary>

```typescript
interface User {
  id: number;
  username: string;
  email: string;
  isAdmin: boolean;
  disabled: boolean;
  createdAt: Date;
}

interface UserCreate {
  username: string;
  email: string;
  password: string;
  isAdmin?: boolean; // Optional - only admins can set this
}

interface AuthResponse {
  user: User;
  accessToken: string;
  expiresIn: number; // seconds until token expires
}
```
</details>

## Validation

Compile your solution with `tsc --noEmit 01-basic-types.ts` to verify type correctness. Test edge cases by assigning invalid values and confirming TypeScript catches the errors.

## Key Takeaways

- **Type safety vs runtime validation**: TypeScript types are compile-time only
- **Extensible data**: `Record<string, any>` provides flexibility while maintaining some type safety
- **Geographic constraints**: Coordinate validation belongs in both types and runtime checks
- **API design**: Separate creation and response interfaces for different use cases

**Next:** Proceed to [Lesson 2: Classes and Interfaces](../lessons/02-classes-interfaces.md) for object-oriented patterns in the GeoNotes domain.