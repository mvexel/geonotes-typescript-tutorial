# Getting Started with Interactive GeoNotes Tutorial

Welcome to the hands-on TypeScript learning experience! Instead of just reading about TypeScript concepts, you'll build a complete geospatial API by implementing exercises directly in the codebase.

## Quick Start

1. **Fork this repository** to your GitHub account
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/geonotes-typescript-tutorial.git
   cd geonotes-typescript-tutorial
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Verify setup**:
   ```bash
   npm run build
   npm test
   ```
   You should see TypeScript compilation errors and failing tests - this is expected! You'll fix these by completing the exercises.

## How It Works

### Exercise-Driven Learning
- Each exercise is a real TypeScript file with `// EXERCISE:` comments
- You implement the code where indicated
- Automated tests validate your implementation
- You commit your completed work with provided commit messages

### Your Learning Journey
1. **Read the exercise specification** (e.g., `exercises/01-basic-types-interfaces.md`)
2. **Implement the code** in the corresponding TypeScript files
3. **Run tests** to validate your work: `npm run validate:exercise-1-1`
4. **Commit your progress** when complete: `npm run commit:exercise-1-1`
5. **Move to the next exercise** building on your previous work

## Exercise Structure

### Chapter 1: TypeScript Fundamentals (Available Now)

#### Exercise 1: Basic TypeScript Interface Definition
- **File**: `src/types/geonote.ts`
- **Focus**: Learn interface syntax, basic types, and function annotations
- **Time**: ~30 minutes
- **Validation**: `npm run validate:exercise-1`

**What you'll implement:**
- A TypeScript interface with various property types
- Functions with type annotations for parameters and return values
- Working with optional properties and arrays
- Understanding how TypeScript prevents runtime errors

## Development Workflow

### Running Tests
```bash
# Run all tests
npm test

# Run specific exercise test
npm run validate:exercise-1

# Watch mode for active development
npm run test:watch
```

### Code Quality
```bash
# Check TypeScript compilation
npm run build

# Run linter
npm run lint

# Fix linting issues automatically
npm run lint:fix
```

### Committing Progress
```bash
# Commit completed Exercise 1
npm run commit:exercise-1

# Or commit manually with your own message
git add .
git commit -m "your message"
```

## Understanding the Tests

### Test-Driven Learning
Each exercise includes comprehensive tests that:
- **Validate your implementation** - All tests must pass to complete the exercise
- **Demonstrate expected behavior** - Tests show how your code should work
- **Catch common mistakes** - Tests help identify and fix typical errors
- **Provide immediate feedback** - No waiting for instructor review

### Test Structure
```typescript
describe('Exercise 1: Basic TypeScript Interface Definition', () => {
  test('should accept a complete GeoNote object', () => {
    // This test shows what a valid interface implementation looks like
  });
  
  test('should format a note correctly', () => {
    // This test shows how your function should work
  });
});
```

## Getting Help

### When You're Stuck
1. **Read the error messages carefully** - TypeScript and Jest provide detailed feedback
2. **Check the test expectations** - Tests show exactly what's expected
3. **Review the business requirements** - Each exercise includes context and acceptance criteria
4. **Look at the TypeScript documentation** - Links provided in each exercise

### Common Issues

#### "Cannot find module" errors
- Run `npm install` to ensure all dependencies are installed
- Check that you're in the correct directory

#### TypeScript compilation errors
- This is expected initially - you'll fix these by implementing the exercises
- Focus on one error at a time, starting with the first one shown

#### Tests failing
- This is also expected initially
- Implement the exercise code step by step
- Run `npm run validate:exercise-1` to check progress

## What You'll Build

By completing this exercise, you'll have:

### TypeScript Fundamentals
- A solid understanding of interface syntax and structure
- Experience with basic TypeScript types (number, string, boolean, Date)
- Knowledge of optional properties and how they work
- Understanding of function type annotations

### Practical Skills
- How to define data structures that TypeScript can validate
- Writing functions with proper type annotations
- Working with arrays of typed objects
- Seeing how TypeScript prevents common runtime errors

### Foundation for Advanced Learning
- The basic TypeScript knowledge needed for more complex topics
- Understanding of how TypeScript improves code reliability
- Experience with test-driven learning approach
- Confidence to tackle more advanced TypeScript patterns

## Next Steps

1. **Start with Exercise 1** - Open `exercises/01-basic-types-interfaces.md`
2. **Take your time** - Focus on understanding concepts, not just passing tests
3. **Experiment** - Try breaking things to understand how TypeScript protects you
4. **Commit your work** - Build a portfolio of your learning progress

Ready to begin? Head over to [Exercise 1: Basic TypeScript Interface Definition](exercises/01-basic-types-interfaces.md)!

---

## Project Context

This tutorial teaches TypeScript by building **GeoNotes** - a location-based API for creating and managing geographic notes. You'll learn enterprise-grade TypeScript patterns while building something practical and deployable.

**Why geospatial?** Location-based applications have unique constraints (coordinate validation, spatial queries, performance at scale) that demonstrate advanced TypeScript patterns naturally. The domain is complex enough to be interesting but focused enough to be learnable.

**What you're building:** An API that powers apps like municipal 311 systems, crowdsourced mapping tools, and field research platforms. Real-world patterns, real-world scale.