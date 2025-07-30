// EXERCISE 1: Basic TypeScript Interface Definition
// 
// Learn TypeScript fundamentals by defining a simple data structure.
// This exercise focuses on TypeScript syntax and basic type annotations.
//
// LEARNING GOALS:
// - Understand interface syntax and property definitions
// - Practice with basic TypeScript types (number, string, boolean, Date)
// - Learn about optional properties
// - See how TypeScript catches type errors at compile time
//
// ACCEPTANCE CRITERIA:
// [ ] GeoNote interface compiles without TypeScript errors
// [ ] Interface includes all required properties with correct types
// [ ] Tests demonstrate TypeScript's type checking
// [ ] All tests in __tests__/exercise-1.test.ts pass

/**
 * A simple data structure representing a geographic note.
 * 
 * This interface demonstrates TypeScript's basic type system.
 * Each property has a specific type that TypeScript will enforce.
 */
export interface GeoNote {
  // IMPLEMENT: Add these properties with the correct TypeScript types
  // 
  // id: a number that uniquely identifies this note
  // latitude: a number representing the north-south position
  // longitude: a number representing the east-west position  
  // description: a string containing the note's text content
  // isPrivate: a boolean indicating if the note is private (make this optional with ?)
  // createdAt: a Date object showing when the note was created
}

/**
 * A simple function that demonstrates TypeScript function types.
 * 
 * This function shows how TypeScript enforces parameter types
 * and return types, preventing common programming errors.
 * 
 * @param note - A GeoNote object (TypeScript ensures it matches the interface)
 * @returns A formatted string describing the note
 */
export function formatNote(note: GeoNote): string {
  // IMPLEMENT: Create a readable description of the note
  //
  // Return a string that includes:
  // - The note's description
  // - Its coordinates in parentheses
  // - Whether it's private (if applicable)
  //
  // Example: "Central Park (40.7829, -73.9654) - Private"
  // Example: "Times Square (40.7589, -73.9851)"
  
  return 'Not implemented';
}

/**
 * Demonstrates TypeScript's type checking with arrays and optional properties.
 * 
 * @param notes - An array of GeoNote objects
 * @returns The number of private notes in the array
 */
export function countPrivateNotes(notes: GeoNote[]): number {
  // IMPLEMENT: Count how many notes in the array are private
  //
  // Remember: isPrivate is optional, so it might be undefined
  // Only count notes where isPrivate is explicitly true
  
  return 0; // Replace with actual implementation
}