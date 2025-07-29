# Lesson 1: TypeScript Project Setup and Tooling

## Learning Objectives
- Set up a professional TypeScript Node.js project structure
- Configure TypeScript compiler and build tools for enterprise development
- Understand package management and dependency handling for APIs
- Implement development workflow with linting, formatting, and testing

## Enterprise Node.js Project Structure

**JavaScript vs TypeScript Project Setup:**

```javascript
// JavaScript - minimal structure, no build step
my-api/
├── index.js
├── routes/
│   └── notes.js
└── package.json
```

```typescript
// TypeScript - structured for enterprise scale
geonotes-api/
├── src/
│   ├── types/           // Type definitions
│   ├── controllers/     // Request handlers
│   ├── services/        // Business logic
│   ├── repositories/    // Data access
│   ├── middleware/      // Cross-cutting concerns
│   └── main.ts         // Application entry point
├── dist/               // Compiled JavaScript (generated)
├── tests/              // Test files
├── docs/               // API documentation
├── tsconfig.json       // TypeScript configuration
├── package.json        // Dependencies and scripts
├── .eslintrc.js       // Code quality rules
└── .prettierrc        // Code formatting
```

**Reference:** [TypeScript Project Structure Best Practices](https://www.typescriptlang.org/docs/handbook/declaration-files/library-structures.html)

## TypeScript Configuration

### Core tsconfig.json Setup

**JavaScript vs TypeScript:**
```javascript
// JavaScript - no configuration needed, runs directly
node index.js
```

```typescript
// TypeScript - requires compilation configuration
{
  "compilerOptions": {
    "target": "ES2022",                 // Modern JavaScript features
    "module": "NodeNext",               // Node.js ESM/CommonJS hybrid
    "moduleResolution": "NodeNext",     // Modern module resolution
    "outDir": "./dist",                 // Compiled output directory
    "rootDir": "./src",                 // Source code directory
    "strict": true,                     // Enable all strict type checking
    "esModuleInterop": true,           // CommonJS/ESM compatibility
    "skipLibCheck": true,              // Skip .d.ts file checking for speed
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModules": true,        // Import JSON files
    "declaration": true,               // Generate .d.ts files
    "declarationMap": true,           // Source maps for declarations
    "sourceMap": true,                // Debug support
    "removeComments": true,           // Clean output
    "noEmitOnError": true,           // Don't compile if errors exist
    
    // Strict type checking options
    "noImplicitAny": true,
    "noImplicitReturns": true,
    "noImplicitThis": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "exactOptionalPropertyTypes": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "tests"]
}
```

Key differences from JavaScript:
- **Compilation step required** - TypeScript must be compiled to JavaScript
- **Type checking enforcement** - Errors prevent compilation
- **Modern module support** - ESM and CommonJS compatibility
- **Development tooling** - Source maps, declarations for debugging

**Reference:** [TSConfig Reference](https://www.typescriptlang.org/tsconfig)

### Development vs Production Configurations

```typescript
// tsconfig.json (development)
{
  "extends": "./tsconfig.base.json",
  "compilerOptions": {
    "sourceMap": true,
    "declaration": true,
    "removeComments": false
  }
}

// tsconfig.prod.json (production)
{
  "extends": "./tsconfig.base.json", 
  "compilerOptions": {
    "sourceMap": false,
    "declaration": false,
    "removeComments": true,
    "noUnusedLocals": false,        // Don't fail build on unused vars
    "noUnusedParameters": false
  }
}
```

## Package Management for TypeScript APIs

### Essential Dependencies

**JavaScript vs TypeScript Dependencies:**
```javascript
// JavaScript - runtime dependencies only
{
  "dependencies": {
    "express": "^4.18.0",
    "pg": "^8.8.0"
  }
}
```

```typescript
// TypeScript - runtime + type definitions + build tools
{
  "dependencies": {
    "express": "^4.18.0",
    "pg": "^8.8.0",
    "@types/express": "^4.17.0",     // Type definitions
    "@types/pg": "^8.6.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",          // TypeScript compiler
    "ts-node": "^10.9.0",           // Development execution
    "@types/node": "^18.0.0",       // Node.js type definitions
    "nodemon": "^2.0.0",            // Development file watching
    "eslint": "^8.0.0",             // Code quality
    "@typescript-eslint/eslint-plugin": "^5.0.0",
    "@typescript-eslint/parser": "^5.0.0",
    "prettier": "^2.8.0",           // Code formatting
    "jest": "^29.0.0",              // Testing framework
    "@types/jest": "^29.0.0",
    "ts-jest": "^29.0.0",
    "supertest": "^6.3.0",          // API testing
    "@types/supertest": "^2.0.0"
  }
}
```

**Key Insight:** TypeScript requires type definitions (`@types/*`) for JavaScript libraries to provide type safety and IDE support.

**Reference:** [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) - Community type definitions

### Package.json Scripts

```json
{
  "scripts": {
    "dev": "nodemon --exec ts-node src/main.ts",
    "build": "tsc -p tsconfig.prod.json",
    "start": "node dist/main.js",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "lint": "eslint src/**/*.ts",
    "lint:fix": "eslint src/**/*.ts --fix",
    "format": "prettier --write src/**/*.ts",
    "type-check": "tsc --noEmit",
    "clean": "rm -rf dist",
    "prebuild": "npm run clean && npm run lint && npm run type-check"
  }
}
```

## Code Quality and Formatting

### ESLint Configuration for TypeScript

**JavaScript vs TypeScript Linting:**
```javascript
// JavaScript - basic ESLint rules
module.exports = {
  "extends": ["eslint:recommended"],
  "rules": {
    "no-unused-vars": "error"
  }
};
```

```typescript
// TypeScript - type-aware linting
module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended',
    '@typescript-eslint/recommended-requiring-type-checking'
  ],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    project: './tsconfig.json'
  },
  rules: {
    // TypeScript-specific rules
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/prefer-nullish-coalescing': 'error',
    '@typescript-eslint/prefer-optional-chain': 'error',
    
    // API development rules
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/await-thenable': 'error',
    '@typescript-eslint/no-misused-promises': 'error',
    
    // Strict type checking
    '@typescript-eslint/strict-boolean-expressions': 'error',
    '@typescript-eslint/prefer-readonly': 'error'
  }
};
```

TypeScript ESLint provides **type-aware linting** - rules that understand your type system and can catch semantic errors that regular ESLint cannot.

**Reference:** [TypeScript ESLint](https://typescript-eslint.io/)

### Prettier Configuration

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "bracketSpacing": true,
  "arrowParens": "avoid"
}
```

## Development Workflow

### File Watching and Hot Reload

**JavaScript vs TypeScript Development:**
```javascript
// JavaScript - direct execution with nodemon
nodemon index.js
```

```typescript
// TypeScript - compilation + execution with ts-node
nodemon --exec ts-node src/main.ts

// Or with faster compilation using SWC
nodemon --exec node --loader @swc-node/register/esm src/main.ts
```

### Build Process

```bash
# Development workflow
npm run dev          # Start with file watching
npm run type-check   # Verify types without compiling
npm run lint         # Check code quality
npm run test:watch   # Run tests in watch mode

# Production build
npm run build        # Compile TypeScript to JavaScript
npm start           # Run compiled JavaScript
```

## Testing Setup

### Jest Configuration for TypeScript

**JavaScript vs TypeScript Testing:**
```javascript
// JavaScript - direct Jest execution
module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/*.test.js']
};
```

```typescript
// TypeScript - compilation step required
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/types/**'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};
```

### Example Test Structure

```typescript
// tests/note.service.test.ts
import { NoteService } from '../src/services/note.service';
import { NoteCreate } from '../src/types/note.types';

describe('NoteService', () => {
  let noteService: NoteService;
  
  beforeEach(() => {
    noteService = new NoteService();
  });
  
  it('should validate geographic coordinates', () => {
    const invalidNote: NoteCreate = {
      latitude: 91, // Invalid latitude
      longitude: -74.0060,
      description: 'Test note'
    };
    
    expect(() => noteService.validateNote(invalidNote))
      .toThrow('Invalid latitude');
  });
});
```

## Performance Optimization

### Compilation Speed

```typescript
// tsconfig.json optimizations for large projects
{
  "compilerOptions": {
    "incremental": true,               // Enable incremental compilation
    "tsBuildInfoFile": ".tsbuildinfo", // Cache build information
    "skipLibCheck": true,              // Skip .d.ts files checking
    "assumeChangesOnlyAffectDirectDependencies": true
  },
  "ts-node": {
    "transpileOnly": true,             // Skip type checking in development
    "files": true
  }
}
```

### Alternative Compilers

```bash
# SWC - Rust-based TypeScript compiler (faster)
npm install --save-dev @swc/core @swc-node/register

# esbuild - Go-based compiler (fastest)
npm install --save-dev esbuild tsx
```

## Production Deployment Considerations

### Docker Setup

```dockerfile
# Multi-stage build for TypeScript
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

FROM node:18-alpine AS production
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package.json ./

EXPOSE 3000
CMD ["node", "dist/main.js"]
```

### Environment Configuration

```typescript
// src/config/environment.ts
interface EnvironmentConfig {
  port: number;
  nodeEnv: 'development' | 'production' | 'test';
  database: {
    host: string;
    port: number;
    name: string;
    user: string;
    password: string;
  };
}

function loadConfig(): EnvironmentConfig {
  return {
    port: parseInt(process.env.PORT || '3000', 10),
    nodeEnv: (process.env.NODE_ENV as any) || 'development',
    database: {
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      name: process.env.DB_NAME || 'geonotes',
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'password'
    }
  };
}

export const config = loadConfig();
```

## Enterprise Development Benefits

1. **Type Safety**: Catch configuration errors at compile time
2. **Developer Experience**: IntelliSense for all dependencies and configurations
3. **Refactoring Confidence**: Safe renaming and restructuring across the entire codebase
4. **Team Collaboration**: Consistent formatting and linting rules
5. **Production Reliability**: Build-time verification prevents runtime configuration errors

**Next:** Complete [Exercise 1: Project Setup](../exercises/01-project-setup.md) to create your GeoNotes API project structure.

## Additional References

- [Node.js TypeScript Best Practices](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)
- [TypeScript Project Configuration](https://www.typescriptlang.org/docs/handbook/project-config.html)
- [ESLint TypeScript Integration](https://typescript-eslint.io/getting-started)
- [Jest TypeScript Testing](https://jestjs.io/docs/getting-started#using-typescript)