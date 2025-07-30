# TypeScript Learning Project: Building GeoNotes API

A comprehensive TypeScript course for experienced developers who want to learn production-grade API development. Build a complete location-based API from scratch while mastering TypeScript fundamentals, modern frameworks, and enterprise architecture patterns.

## What You'll Build

**GeoNotes** is a production-ready REST API for creating and managing location-based reports. Think municipal 311 systems, crowdsourced mapping tools, or field research platforms. You'll implement:

- **Spatial data handling** with PostgreSQL + PostGIS
- **Type-safe API endpoints** with comprehensive validation
- **Authentication & authorization** using JWT tokens
- **Bulk operations** for importing large datasets
- **Monitoring & observability** for production deployment
- **Complete test coverage** with unit and integration tests

## Prerequisites

This course assumes you're a fairly senior software developer with:
- Experience in at least one other programming language
- Understanding of API concepts and HTTP
- Basic familiarity with JavaScript (enough to be dangerous)
- No prior TypeScript or Node.js backend experience required

## Learning Approach

### Conceptual Foundation (Chapters 1-3)
Learn TypeScript fundamentals, framework selection, and project setup without exercises. Build understanding progressively before writing code.

### Hands-On Implementation (Chapters 4-12)
Starting in Chapter 4, each lesson ends with exercises that build toward a complete, deployable API. Every exercise reinforces the material and adds functionality.

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
   Expected: Some TypeScript compilation errors and failing tests initially - you'll fix these through the exercises.

## Course Structure

### Chapter 1: TypeScript Fundamentals
- Lesson 1: TypeScript Basics for APIs
- Lesson 2: Advanced Types & Domain Modeling  
- Lesson 3: Async TypeScript & Error Handling

### Chapter 2: Framework Selection & Architecture
- Lesson 1: Express vs NestJS for GeoNotes
- Lesson 2: Architecture Patterns & Design
- Lesson 3: Request/Response Pipeline

### Chapter 3: Project Setup & Tooling
- Lesson 1: Framework-Specific Project Structure
- Lesson 2: Development Workflow & Build Tools
- Lesson 3: Environment Configuration

### Chapters 4-12: Implementation & Deployment
Each chapter includes hands-on exercises building toward a production API:
- **Chapter 4**: Database & Models (PostgreSQL + PostGIS)
- **Chapter 5**: Basic API Implementation  
- **Chapter 6**: Testing Strategy
- **Chapter 7**: Authentication & Security
- **Chapter 8**: Bulk Operations & Performance
- **Chapter 9**: Monitoring & Observability
- **Chapter 10**: Deployment & Production
- **Chapter 11**: Documentation
- **Chapter 12**: Architecture Review & Next Steps

## Development Workflow

### Running Tests
```bash
# Run all tests
npm test

# Run specific exercise test (from Chapter 4+)
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

### Exercise Validation
Starting in Chapter 4, each lesson includes exercises with:
- **Comprehensive tests** that validate your implementation
- **Immediate feedback** through automated testing
- **Clear acceptance criteria** in each exercise file
- **Progressive difficulty** building toward production readiness

## Getting Help

### When You're Stuck
1. **Read error messages carefully** - TypeScript and Jest provide detailed feedback
2. **Check test expectations** - Tests show exactly what's expected
3. **Review lesson content** - Each exercise references specific lesson concepts
4. **Consult TypeScript documentation** - Links provided in each lesson

### Common Issues

**"Cannot find module" errors**: Run `npm install` to ensure dependencies are installed

**TypeScript compilation errors**: Expected initially - implement exercises to resolve

**Tests failing**: Also expected - complete exercise implementations step by step

## What Makes This Different

### Real-World Focus
Every pattern and technique is chosen for production API development. No toy examples or academic exercises.

### Progressive Complexity
Start with TypeScript basics, end with enterprise-grade architecture. Each lesson builds naturally on previous knowledge.

### Exercise-Driven Learning
From Chapter 4 onwards, you immediately apply concepts in working code. Build muscle memory alongside understanding.

### Complete Implementation
By the end, you have a deployable API with authentication, monitoring, documentation, and production configuration.

## Get Started

Ready to begin? Start with [Chapter 1: TypeScript Fundamentals](ch1-typescript-fundamentals/C1L1-typescript-basics-for-apis.md) to build your conceptual foundation.

Alternatively, jump to the [Project Overview](00-project-overview/project-overview.md) for more context about the GeoNotes API you'll be building.

---

## About This Course

This course was created through a collaborative process between an experienced developer learning TypeScript and Claude Code. The content combines practical experience building production APIs with TypeScript-specific best practices, resulting in a comprehensive learning path for serious developers.

**Note**: The first few chapters are freely available. The complete course including all exercises and implementation chapters will be available for purchase at a reasonable price that reflects the substantial effort involved in creating quality technical education.