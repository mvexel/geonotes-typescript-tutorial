# Exercise 1: Basic TypeScript Interface Definition

## Overview

In this exercise, you'll learn TypeScript fundamentals by defining a simple data structure and working with basic TypeScript features. This exercise focuses on understanding interfaces, type annotations, and basic TypeScript syntax - not building a complete API.

## Learning Objectives

- Understand TypeScript interface syntax and structure
- Practice with basic TypeScript types (number, string, boolean, Date)
- Learn about optional properties in interfaces
- See how TypeScript prevents type errors at compile time
- Practice writing functions with type annotations

## What You'll Learn

This exercise covers the core TypeScript concepts from **Chapter 1, Lesson 1**:
- Interface definition syntax
- Basic type annotations
- Optional properties with `?`
- Function parameter and return types
- Working with arrays of typed objects
- How TypeScript catches errors before runtime

## The Exercise

**File**: `src/types/geonote.ts`
**Time Estimate**: 30 minutes

You'll implement three TypeScript constructs:

1. **GeoNote Interface**: Define a data structure with proper TypeScript types
2. **formatNote Function**: Write a function that takes typed parameters and returns a typed result
3. **countPrivateNotes Function**: Work with arrays and optional properties

## Getting Started

1. **Install dependencies**: `npm install`
2. **Run tests to see current state**: `npm test` (you'll see failures - that's expected!)
3. **Open the exercise file**: `src/types/geonote.ts`
4. **Implement the interface and functions** following the comments
5. **Run tests**: `npm run validate:exercise-1`

## Validation

Your implementation is complete when:
- All TypeScript compilation errors are resolved: `npm run build`
- All tests pass: `npm run validate:exercise-1`
- ESLint shows no errors: `npm run lint`

## What Success Looks Like

When you complete this exercise:
- You'll understand how TypeScript interfaces define data shapes
- You'll see how TypeScript catches type errors before runtime
- You'll have hands-on experience with optional properties
- You'll understand function type annotations

## Completion

When the exercise is complete:
1. Run the full test suite: `npm test`  
2. Create a commit with your progress: `npm run commit:exercise-1`

## Help & Resources

- [TypeScript Handbook - Interfaces](https://www.typescriptlang.org/docs/handbook/2/objects.html)
- [TypeScript Handbook - Functions](https://www.typescriptlang.org/docs/handbook/2/functions.html)
- Original lesson: [TypeScript Basics for APIs](../../ch1-typescript-fundamentals/C1L1-typescript-basics-for-apis.md)