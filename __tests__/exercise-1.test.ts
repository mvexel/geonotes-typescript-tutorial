// Exercise 1 Tests: Basic TypeScript Interface Definition
//
// These tests validate your understanding of basic TypeScript concepts:
// interfaces, types, function signatures, and optional properties.

import { GeoNote, formatNote, countPrivateNotes } from '../src/types/geonote';

describe('Exercise 1: Basic TypeScript Interface Definition', () => {
  describe('GeoNote Interface', () => {
    test('should accept a complete GeoNote object', () => {
      // This test verifies that your interface includes all required properties
      const note: GeoNote = {
        id: 1,
        latitude: 40.7128,
        longitude: -74.0060,
        description: "Statue of Liberty",
        isPrivate: false,
        createdAt: new Date('2023-01-01T12:00:00Z')
      };
      
      // TypeScript should enforce these types at compile time
      expect(typeof note.id).toBe('number');
      expect(typeof note.latitude).toBe('number');
      expect(typeof note.longitude).toBe('number');
      expect(typeof note.description).toBe('string');
      expect(typeof note.isPrivate).toBe('boolean');
      expect(note.createdAt).toBeInstanceOf(Date);
    });

    test('should allow isPrivate to be optional', () => {
      // This test checks that isPrivate is optional (can be omitted)
      const noteWithoutPrivacy: GeoNote = {
        id: 2,
        latitude: 51.5074,
        longitude: -0.1278,
        description: "Big Ben",
        createdAt: new Date()
      };
      
      expect(noteWithoutPrivacy.isPrivate).toBeUndefined();
    });

    test('should accept isPrivate as true', () => {
      const privateNote: GeoNote = {
        id: 3,
        latitude: 48.8566,
        longitude: 2.3522,
        description: "Personal reminder about Eiffel Tower",
        isPrivate: true,
        createdAt: new Date()
      };
      
      expect(privateNote.isPrivate).toBe(true);
    });
  });

  describe('formatNote Function', () => {
    test('should format a public note correctly', () => {
      const note: GeoNote = {
        id: 1,
        latitude: 40.7589,
        longitude: -73.9851,
        description: "Times Square",
        isPrivate: false,
        createdAt: new Date()
      };

      const formatted = formatNote(note);
      
      // Should include description and coordinates
      expect(formatted).toContain("Times Square");
      expect(formatted).toContain("40.7589");
      expect(formatted).toContain("-73.9851");
      // Should not indicate private since isPrivate is false
      expect(formatted).not.toContain("Private");
    });

    test('should format a private note correctly', () => {
      const note: GeoNote = {
        id: 2,
        latitude: 35.6762,
        longitude: 139.6503,
        description: "Secret Tokyo spot",
        isPrivate: true,
        createdAt: new Date()
      };

      const formatted = formatNote(note);
      
      expect(formatted).toContain("Secret Tokyo spot");
      expect(formatted).toContain("35.6762");
      expect(formatted).toContain("139.6503");
      expect(formatted).toContain("Private");
    });

    test('should handle note without isPrivate property', () => {
      const note: GeoNote = {
        id: 3,
        latitude: -33.8688,
        longitude: 151.2093,
        description: "Sydney Opera House",
        createdAt: new Date()
        // isPrivate is optional and omitted
      };

      const formatted = formatNote(note);
      
      expect(formatted).toContain("Sydney Opera House");
      expect(formatted).toContain("-33.8688");
      expect(formatted).toContain("151.2093");
      // Should not crash or indicate private when isPrivate is undefined
    });
  });

  describe('countPrivateNotes Function', () => {
    test('should count private notes correctly', () => {
      const notes: GeoNote[] = [
        {
          id: 1,
          latitude: 40.7128,
          longitude: -74.0060,
          description: "Public note 1",
          isPrivate: false,
          createdAt: new Date()
        },
        {
          id: 2,
          latitude: 51.5074,
          longitude: -0.1278,
          description: "Private note 1",
          isPrivate: true,
          createdAt: new Date()
        },
        {
          id: 3,
          latitude: 48.8566,
          longitude: 2.3522,
          description: "Private note 2",
          isPrivate: true,
          createdAt: new Date()
        }
      ];

      const privateCount = countPrivateNotes(notes);
      expect(privateCount).toBe(2);
    });

    test('should handle notes without isPrivate property', () => {
      const notes: GeoNote[] = [
        {
          id: 1,
          latitude: 35.6762,
          longitude: 139.6503,
          description: "Note without privacy setting",
          createdAt: new Date()
          // isPrivate is omitted (undefined)
        },
        {
          id: 2,
          latitude: -33.8688,
          longitude: 151.2093,
          description: "Private note",
          isPrivate: true,
          createdAt: new Date()
        }
      ];

      const privateCount = countPrivateNotes(notes);
      // Only the explicitly private note should be counted
      expect(privateCount).toBe(1);
    });

    test('should return 0 for empty array', () => {
      const notes: GeoNote[] = [];
      const privateCount = countPrivateNotes(notes);
      expect(privateCount).toBe(0);
    });

    test('should return 0 when no notes are private', () => {
      const notes: GeoNote[] = [
        {
          id: 1,
          latitude: 40.7128,
          longitude: -74.0060,
          description: "Public note 1",
          isPrivate: false,
          createdAt: new Date()
        },
        {
          id: 2,
          latitude: 51.5074,
          longitude: -0.1278,
          description: "Public note 2",
          isPrivate: false,
          createdAt: new Date()
        }
      ];

      const privateCount = countPrivateNotes(notes);
      expect(privateCount).toBe(0);
    });
  });
});

// Type-level tests - these verify TypeScript compilation behavior
// These don't run as tests, but they must compile without errors

// Test that the interface accepts all required properties
const _validNote: GeoNote = {
  id: 1,
  latitude: 0,
  longitude: 0,
  description: "test",
  createdAt: new Date()
  // isPrivate is optional
};

// Test that functions accept the correct parameter types
const _testFormatResult: string = formatNote(_validNote);
const _testCountResult: number = countPrivateNotes([_validNote]);

// Prevent unused variable warnings
export { _validNote, _testFormatResult, _testCountResult };