// GeoNotes TypeScript Type Definitions
// This file demonstrates the types we'll use throughout the tutorial

// Geographic coordinate validation
type Latitude = number;  // -90 to 90
type Longitude = number; // -180 to 180

// Note lifecycle states
type NoteState = "new" | "taken" | "closed";

// Basic note structure
interface Note {
  id: number;
  latitude: Latitude;
  longitude: Longitude;
  description: string;
  state: NoteState;
  isPrivate: boolean;
  userData: Record<string, any>;  // Extensible user data
  ownerId?: number;               // Optional for anonymous notes
  createdAt: Date;
  updatedAt: Date;
}

// For creating new notes
interface NoteCreate {
  latitude: Latitude;
  longitude: Longitude;
  description: string;
  isPrivate?: boolean;
  userData?: Record<string, any>;
}

// For updating existing notes
interface NoteUpdate {
  description?: string;
  state?: NoteState;
  userData?: Record<string, any>;
}

// User management
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
}

// API response wrappers
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

// Authentication
interface AuthResponse {
  user: User;
  accessToken: string;
  expiresIn: number;
}

// Geographic query parameters
interface LocationQuery {
  latitude: Latitude;
  longitude: Longitude;
  radiusKm: number;
}

// Note filtering parameters
interface NoteFilters {
  state?: NoteState;
  isPrivate?: boolean;
  ownerId?: number;
  location?: LocationQuery;
  createdAfter?: Date;
  createdBefore?: Date;
}

// Type guards for runtime validation
function isValidLatitude(value: number): value is Latitude {
  return value >= -90 && value <= 90;
}

function isValidLongitude(value: number): value is Longitude {
  return value >= -180 && value <= 180;
}

function isValidNoteState(value: string): value is NoteState {
  return ["new", "taken", "closed"].includes(value);
}

function isValidNoteCreate(obj: any): obj is NoteCreate {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.latitude === 'number' &&
    typeof obj.longitude === 'number' &&
    typeof obj.description === 'string' &&
    isValidLatitude(obj.latitude) &&
    isValidLongitude(obj.longitude) &&
    (obj.isPrivate === undefined || typeof obj.isPrivate === 'boolean') &&
    (obj.userData === undefined || (typeof obj.userData === 'object' && obj.userData !== null))
  );
}

// Example usage
const exampleNote: Note = {
  id: 1,
  latitude: 40.7128,
  longitude: -74.0060,
  description: "Pothole blocking bike lane",
  state: "new",
  isPrivate: false,
  userData: {
    category: "infrastructure",
    severity: "high",
    estimatedCost: 500,
    reportedBy: "cyclist"
  },
  createdAt: new Date(),
  updatedAt: new Date()
};

const createRequest: NoteCreate = {
  latitude: 40.7589,
  longitude: -73.9851,
  description: "New coffee shop opened",
  userData: {
    businessType: "restaurant",
    cuisine: "coffee",
    rating: 4.5
  }
};

// Type aliases for common response patterns
type NotesListResponse = ApiResponse<PagedResponse<Note>>;
type SingleNoteResponse = ApiResponse<Note>;
type UserResponse = ApiResponse<User>;

export {
  // Types
  Latitude,
  Longitude,
  NoteState,
  
  // Interfaces
  Note,
  NoteCreate,
  NoteUpdate,
  User,
  UserCreate,
  ApiResponse,
  PagedResponse,
  AuthResponse,
  LocationQuery,
  NoteFilters,
  
  // Type guards
  isValidLatitude,
  isValidLongitude,
  isValidNoteState,
  isValidNoteCreate,
  
  // Response type aliases
  NotesListResponse,
  SingleNoteResponse,
  UserResponse
};