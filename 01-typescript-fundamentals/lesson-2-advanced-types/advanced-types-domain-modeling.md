# Lesson 2: Advanced Types & Domain Modeling

## Learning Objectives

By the end of this lesson, you will have mastered:
- How generics create reusable, type-safe patterns that scale across your entire API
- Why utility types eliminate boilerplate while maintaining strict type safety
- How discriminated unions model complex business domains with compile-time guarantees
- When conditional types provide elegant solutions to API versioning challenges

## Why APIs Need Advanced Type Systems

The simple interfaces you learned in Lesson 1 work well for basic data structures, but production APIs face more complex challenges. You need the same response wrapper for dozens of different data types. You want to create update types that make most fields optional without rewriting entire interfaces. Your domain has multiple note types with different required fields, and you need TypeScript to enforce these differences automatically.

JavaScript handles this complexity through runtime checks and documentation, but these approaches break down as applications grow. Runtime validation catches errors too late. Documentation drifts out of sync with code. Developers make assumptions about data shapes that turn out to be wrong in production.

TypeScript's advanced type system offers compile-time solutions to these runtime problems. Instead of writing repetitive code for each data type, you create generic patterns that work with any type while maintaining full type safety. Instead of manually maintaining multiple variations of similar interfaces, you transform existing types using utility types. Instead of hoping developers handle all possible cases correctly, you use discriminated unions to make incomplete handling a compile-time error.

## How Generics Solve API Repetition

Consider the common pattern of API response wrappers. Every endpoint needs to return data in a consistent format with success indicators, timestamps, and error information. Without generics, you end up writing the same response structure for every data type, leading to maintenance nightmares and inconsistent implementations.

**The Problem Without Generics:**
```javascript
// JavaScript - repetitive response creation
function createNoteResponse(data, success = true) {
  return { data, success, timestamp: new Date() };
}

function createUserResponse(data, success = true) {
  return { data, success, timestamp: new Date() };
}

// Could return anything, no compile-time checks
const noteResponse = createNoteResponse(someNote);
const userResponse = createUserResponse(someUser);
```

This approach suffers from code duplication across response types, no type safety for the data property, and inconsistent response structures when developers forget to update all variants. Each new data type requires a new response function, and there's no guarantee that all response creators follow the same pattern.

**TypeScript's Generic Solution:**
```typescript
// Single generic pattern handles all data types
interface ApiResponse<T> {
  data: T;
  success: boolean;
  timestamp: Date;
  error?: string;
}

function createApiResponse<T>(data: T, success = true): ApiResponse<T> {
  return { data, success, timestamp: new Date() };
}

// Type-safe responses with compile-time verification
const noteResponse: ApiResponse<Note> = createApiResponse(note);
const userResponse: ApiResponse<User> = createApiResponse(user);
```

TypeScript ensures that the data property matches the expected type, the response structure remains consistent across all endpoints, and you only write the pattern once. The generic `<T>` parameter acts as a placeholder that gets replaced with specific types when the function is called, providing both reusability and type safety.

**Reference:** [TypeScript Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)

## Why APIs Need Multiple Views of the Same Data

Real APIs rarely use the same data structure for every operation. When creating a note, clients shouldn't provide the ID or timestamps - the server generates those. When updating a note, most fields should be optional since users might only want to change the description. When returning notes to the public, you shouldn't include ownership information. When displaying data to administrators, you might want to prevent accidental modifications by making fields readonly.

Without utility types, you'd define separate interfaces for each use case, leading to maintenance overhead and drift as the core data model evolves. JavaScript doesn't offer compile-time assistance here - you'd handle these variations through runtime logic or separate object construction functions, both error-prone approaches.

TypeScript's utility types transform existing types to create new ones automatically. When you change the base `Note` interface, all derived types update automatically. You get compile-time verification that transformations are valid, and your API maintains consistency across all operations.

**Transforming Types for Different API Operations:**
```typescript
interface Note {
  id: number;
  latitude: number;
  longitude: number;
  description: string;
  ownerId: number;
  createdAt: Date;
  updatedAt: Date;
}

// Creation requests omit server-generated fields
type NoteCreate = Omit<Note, 'id' | 'createdAt' | 'updatedAt'>;

// Update requests make selected fields optional
type NoteUpdate = Partial<Pick<Note, 'description' | 'latitude' | 'longitude'>>;

// Public responses exclude sensitive information
type PublicNote = Omit<Note, 'ownerId'>;

// Admin views prevent accidental modifications
type ReadonlyNote = Readonly<Note>;
```

The power becomes clear when you change the base interface. Add a new `priority` field to `Note`, and TypeScript immediately tells you everywhere that needs updating. The `NoteCreate` type automatically includes the new field, `NoteUpdate` doesn't include it by default (which you might want), and `PublicNote` includes it unless you explicitly exclude it.

These transformations work through TypeScript's type-level operations. `Omit<T, K>` creates a new type with everything from `T` except the properties listed in `K`. `Pick<T, K>` creates a new type with only the properties listed in `K`. `Partial<T>` makes all properties optional, while `Readonly<T>` makes all properties immutable.

**Reference:** [TypeScript Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html)

## Modeling Complex Business Domains

Geographic notes in the real world come in many varieties. Infrastructure reports need severity levels and estimated repair costs. Business reviews require ratings and price ranges. Event announcements have start dates and capacity limits. Each type has specific required fields that don't make sense for the others - asking for a severity level on a business review would be meaningless.

JavaScript handles this through flexible objects and runtime checks, but this approach scales poorly. Developers forget which fields are required for which note types. Runtime errors occur when code assumes a field exists but the note type doesn't include it. There's no systematic way to ensure you've handled all possible note types in your processing logic.

Discriminated unions provide type-safe polymorphism by using a common field (the discriminator) to tell TypeScript which specific properties are available. TypeScript can then enforce that you handle each type correctly and catch cases where you've assumed the wrong type.

```typescript
// Different note types have different required fields
type Note = InfrastructureNote | BusinessNote | EventNote;

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
  businessType: string;
  rating: number;
  priceRange: '$' | '$$' | '$$$';
  hours?: Record<string, string>;
}

interface EventNote extends BaseNote {
  type: 'event';
  startDate: Date;
  endDate: Date;
  capacity?: number;
  registrationRequired: boolean;
}
```

**Type-safe processing:**
```typescript
function processNote(note: Note) {
  // TypeScript ensures exhaustive checking
  switch (note.type) {
    case 'infrastructure':
      // TypeScript knows this has severity, estimatedCost, etc.
      if (note.severity === 'high') {
        notifyMaintenanceDept(note);
      }
      break;
    case 'business':
      // TypeScript knows this has businessType, rating, etc.
      updateBusinessDirectory(note.businessType, note.rating);
      break;
    case 'event':
      // TypeScript knows this has startDate, capacity, etc.
      scheduleEventReminder(note.startDate);
      break;
    default:
      // TypeScript ensures this is never reached
      const exhaustiveCheck: never = note;
      throw new Error(`Unhandled note type: ${exhaustiveCheck}`);
  }
}
```

## Conditional Types for API Versioning

Handle API versioning with conditional types that transform data based on version.

```typescript
type ApiVersion = 'v1' | 'v2';

// Different API versions return different structures
type NoteResponse<V extends ApiVersion> = V extends 'v1' 
  ? {
      id: number;
      lat: number;  // v1 uses abbreviated names
      lng: number;
      desc: string;
    }
  : {
      id: number;
      latitude: number;  // v2 uses full names
      longitude: number;
      description: string;
      metadata: {
        version: number;
        lastModified: Date;
      };
    };

// Type-safe API versioning
function formatNoteResponse<V extends ApiVersion>(
  note: Note, 
  version: V
): NoteResponse<V> {
  if (version === 'v1') {
    return {
      id: note.id,
      lat: note.latitude,
      lng: note.longitude,
      desc: note.description
    } as NoteResponse<V>;
  } else {
    return {
      id: note.id,
      latitude: note.latitude,
      longitude: note.longitude,
      description: note.description,
      metadata: {
        version: 2,
        lastModified: note.updatedAt
      }
    } as NoteResponse<V>;
  }
}
```

## Advanced Pattern: Builder Pattern with Types

Create fluent APIs using TypeScript's type system:

```typescript
class NoteQueryBuilder {
  private filters: any = {};
  
  withinRadius(lat: number, lng: number, meters: number): this {
    this.filters.location = { lat, lng, radius: meters };
    return this;
  }
  
  ofType<T extends Note['type']>(type: T): NoteQueryBuilder & { _type: T } {
    this.filters.type = type;
    return this as any;
  }
  
  withSeverity(severity: InfrastructureNote['severity']): this {
    this.filters.severity = severity;
    return this;
  }
  
  async execute(): Promise<Note[]> {
    // Execute query with filters
    return [];
  }
}

// Usage - TypeScript guides the fluent API
const highSeverityInfrastructure = await new NoteQueryBuilder()
  .withinRadius(40.7128, -74.0060, 1000)
  .ofType('infrastructure')
  .withSeverity('high')  // Only available after ofType('infrastructure')
  .execute();
```

## Building Towards Production Systems

The advanced type patterns in this lesson become essential as your API grows beyond simple data storage. Generics let you create consistent response wrappers, error handling patterns, and validation functions that work across all your data types. Utility types keep your interfaces synchronized as your domain model evolves, reducing maintenance overhead and preventing drift. Discriminated unions ensure that complex business logic is handled completely and correctly.

When you move into framework selection and API implementation in later chapters, you'll see these patterns everywhere. Generic response types ensure consistent error handling across all endpoints. Utility types power request validation and response formatting. Discriminated unions drive routing logic and processing workflows. The investment in understanding these patterns pays dividends in code quality, developer experience, and system reliability.

## Next Steps

**Next:** Continue to [Lesson 3: Async TypeScript & Error Handling](../lesson-3-async-typescript/async-typescript-error-handling.md) to learn how TypeScript handles Promise types and provides compile-time safety for asynchronous operations.

## Additional References

- [Advanced Types](https://www.typescriptlang.org/docs/handbook/2/types-from-types.html)
- [Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
- [Mapped Types](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html)
- [Template Literal Types](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html)