# Lesson 2: Advanced Types & Domain Modeling

## Learning Objectives
- Use generics to build reusable, type-safe API patterns
- Apply utility types for data transformations
- Model complex business domains with discriminated unions
- Implement conditional types for API versioning

## Generics for API Patterns

Generic types let you write reusable code while maintaining type safety. For APIs, this means consistent response structures and type-safe data transformations.

**JavaScript vs TypeScript:**
```javascript
// JavaScript - no type safety for API responses
function createApiResponse(data, success = true) {
  return { data, success, timestamp: new Date() };
}

// Could return anything, no compile-time checks
const noteResponse = createApiResponse(someNote);
const userResponse = createApiResponse(someUser);
```

```typescript
// TypeScript - generic API response pattern
interface ApiResponse<T> {
  data: T;
  success: boolean;
  timestamp: Date;
  error?: string;
}

function createApiResponse<T>(data: T, success = true): ApiResponse<T> {
  return { data, success, timestamp: new Date() };
}

// Type-safe responses
const noteResponse: ApiResponse<Note> = createApiResponse(note);
const userResponse: ApiResponse<User> = createApiResponse(user);
```

**Reference:** [TypeScript Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)

## Utility Types for Data Transformation

TypeScript's utility types help transform existing types for different API contexts.

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

// For creating new notes (no id, timestamps)
type NoteCreate = Omit<Note, 'id' | 'createdAt' | 'updatedAt'>;

// For updating notes (optional fields except id)
type NoteUpdate = Partial<Pick<Note, 'description' | 'latitude' | 'longitude'>>;

// For public API responses (no owner info)
type PublicNote = Omit<Note, 'ownerId'>;

// For admin responses (all fields readonly)
type ReadonlyNote = Readonly<Note>;
```

**Common Utility Types:**
- `Pick<T, K>` - Select specific properties
- `Omit<T, K>` - Exclude specific properties  
- `Partial<T>` - Make all properties optional
- `Required<T>` - Make all properties required
- `Readonly<T>` - Make all properties readonly

**Reference:** [TypeScript Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html)

## Discriminated Unions for Domain Modeling

Model complex business logic with discriminated unions that ensure type safety across different note types.

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

## Practical Exercise

Create type-safe CRUD operations for the GeoNotes API:

```typescript
// Define your types
interface GeoNote {
  id: number;
  latitude: number;
  longitude: number;
  description: string;
  type: 'infrastructure' | 'business' | 'event';
  metadata: Record<string, unknown>;
  createdAt: Date;
}

// TODO: Create utility types for:
// 1. NoteCreate - for POST requests
// 2. NoteUpdate - for PATCH requests  
// 3. NoteListResponse - for paginated GET responses
// 4. Type-safe query builder for spatial searches

// TODO: Implement generic CRUD service:
// class NoteService<T extends GeoNote> {
//   create(data: CreateType<T>): Promise<T>
//   update(id: number, data: UpdateType<T>): Promise<T>
//   findNearby(lat: number, lng: number, radius: number): Promise<T[]>
// }
```

**Next:** Continue to [Lesson 3: Async TypeScript & Error Handling](../lesson-3-async-typescript/async-typescript-error-handling.md) to learn Promise types and error handling patterns.

## Additional References

- [Advanced Types](https://www.typescriptlang.org/docs/handbook/2/types-from-types.html)
- [Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
- [Mapped Types](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html)
- [Template Literal Types](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html)