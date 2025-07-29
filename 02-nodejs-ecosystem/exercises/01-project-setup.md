# Exercise 1: GeoNotes API Project Setup

## Objective
Create a professional TypeScript Node.js project structure for the GeoNotes API with proper tooling, configuration, and development workflow.

## Setup Instructions
Create a new directory `ts-geonotes` in your workspace and complete the following exercises.

## Exercise 1: Initialize Node.js Project

**Task**: Set up the basic Node.js project structure with TypeScript.

**JavaScript Comparison:**
```bash
# JavaScript - simple initialization
mkdir my-api && cd my-api
npm init -y
```

**Your Task:**
```bash
# Create project structure
mkdir ts-geonotes && cd ts-geonotes
npm init -y

# Install TypeScript and essential dependencies
npm install express pg jsonwebtoken bcryptjs
npm install --save-dev typescript @types/node @types/express @types/pg @types/jsonwebtoken @types/bcryptjs

# Create directory structure
mkdir -p src/{types,controllers,services,repositories,middleware}
mkdir -p tests docs
```

**Reference:** [npm init documentation](https://docs.npmjs.com/cli/v9/commands/npm-init)

## Exercise 2: TypeScript Configuration

**Task**: Create comprehensive TypeScript configuration for enterprise development.

**JavaScript Comparison:**
```javascript
// JavaScript - no configuration needed
// Files run directly with node
```

Create `tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModules": true,
    "declaration": true,
    "sourceMap": true,
    "removeComments": true,
    "noEmitOnError": true,
    "noImplicitAny": true,
    "noImplicitReturns": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "tests"]
}
```

**Reference:** [TypeScript Configuration](https://www.typescriptlang.org/tsconfig)

## Exercise 3: Development Tooling

**Task**: Set up ESLint, Prettier, and development scripts.

**JavaScript Comparison:**
```javascript
// JavaScript - basic ESLint only
{
  "extends": ["eslint:recommended"]
}
```

Install development tools:
```bash
npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin prettier nodemon ts-node
```

Create `.eslintrc.js`:
```javascript
module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    project: './tsconfig.json'
  },
  rules: {
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/prefer-nullish-coalescing': 'error'
  }
};
```

Create `.prettierrc`:
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2
}
```

**Reference:** [ESLint TypeScript](https://typescript-eslint.io/getting-started)

## Exercise 4: Package Scripts

**Task**: Add comprehensive npm scripts for development workflow.

**JavaScript Comparison:**
```json
{
  "scripts": {
    "start": "node index.js"
  }
}
```

Update `package.json` scripts:
```json
{
  "scripts": {
    "dev": "nodemon --exec ts-node src/main.ts",
    "build": "tsc",
    "start": "node dist/main.js",
    "type-check": "tsc --noEmit",
    "lint": "eslint src/**/*.ts",
    "lint:fix": "eslint src/**/*.ts --fix",
    "format": "prettier --write src/**/*.ts",
    "clean": "rm -rf dist",
    "prebuild": "npm run clean && npm run lint && npm run type-check"
  }
}
```

## Exercise 5: Basic Application Structure

**Task**: Create the initial TypeScript files with proper type definitions.

**JavaScript Comparison:**
```javascript
// index.js - simple Express setup
const express = require('express');
const app = express();
app.listen(3000);
```

Create `src/types/index.ts`:
```typescript
// Re-export all type definitions
export * from './note.types';
export * from './user.types';
export * from './api.types';
```

Create `src/types/note.types.ts`:
```typescript
export type NoteState = 'new' | 'taken' | 'closed';

export interface Note {
  id: number;
  latitude: number;
  longitude: number;
  description: string;
  state: NoteState;
  isPrivate: boolean;
  userData: Record<string, any>;
  ownerId?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface NoteCreate {
  latitude: number;
  longitude: number;
  description: string;
  isPrivate?: boolean;
  userData?: Record<string, any>;
}
```

Create `src/types/api.types.ts`:
```typescript
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface PagedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}
```

Create `src/main.ts`:
```typescript
import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`GeoNotes API server running on port ${PORT}`);
});
```

**Reference:** [Express TypeScript Setup](https://expressjs.com/en/guide/typescript.html)

## Exercise 6: Testing Setup

**Task**: Configure Jest for TypeScript testing.

**JavaScript Comparison:**
```javascript
// JavaScript - direct Jest usage
module.exports = {
  testEnvironment: 'node'
};
```

Install testing dependencies:
```bash
npm install --save-dev jest @types/jest ts-jest supertest @types/supertest
```

Create `jest.config.js`:
```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts'
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70
    }
  }
};
```

Create `tests/main.test.ts`:
```typescript
import request from 'supertest';
import express from 'express';

const app = express();
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

describe('Health endpoint', () => {
  it('should return ok status', async () => {
    const response = await request(app)
      .get('/health')
      .expect(200);
    
    expect(response.body.status).toBe('ok');
  });
});
```

Add test script:
```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

**Reference:** [Jest TypeScript Configuration](https://jestjs.io/docs/getting-started#using-typescript)

## Validation

Verify your setup works correctly:

```bash
# Check TypeScript compilation
npm run type-check

# Check linting
npm run lint

# Run tests
npm test

# Start development server
npm run dev
```

Visit `http://localhost:3000/health` to verify the server is running.

## Key Takeaways

- **Type Safety**: TypeScript configuration catches errors at compile time
- **Development Experience**: Proper tooling improves code quality and developer productivity
- **Build Process**: Compilation step enables modern TypeScript features while targeting stable Node.js versions
- **Testing Integration**: Type-safe testing with proper coverage reporting
- **Enterprise Patterns**: Structured project layout supports team collaboration and maintainability

**Next:** Proceed to [Lesson 2: Dependency Management](../lessons/02-dependency-management.md) to learn about advanced package management patterns.

## Troubleshooting

**Common Issues:**

1. **Module resolution errors**: Ensure `moduleResolution: "NodeNext"` in tsconfig.json
2. **ESLint conflicts**: Check that parser and plugins versions are compatible
3. **Import errors**: Use proper TypeScript import syntax (`import` instead of `require`)
4. **Build failures**: Run `npm run type-check` to see TypeScript errors before building