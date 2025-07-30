# TypeScript Learning Project: Building GeoNotes API

This project is aimed at experienced developers wanting to learn TypeScript to create a production-grade API. 

We will guide the user in building a location-based API called GeoNotes from scratch. The goal is to understand TypeScript fundamentals through practical application while applying enterpriseproduction-grade software architecture best practices.

## General instructions
- You MUST assume the audience is a fairly senior software developer with experience in at least one other language, but little or no experience with building backend APIs in typescript and node.
- You MUST ensure consistent structure for each lesson with ch1-typescript-fundamentals/C1L1-typescript-basics-for-apis.md as a the gold standard. 
  - Overview
  - Learning Objectives
  - ...main lesson content...
  - Conclusion
  - Exercise (if applicable)
  - Next Steps
  - Additional References
- You MUST review each file at the start of a session for specific instructions wherever you are mentioned with @claude
- You MUST be critical of my choices. I have teaching experience but I have never created a technical course before
- You MUST NOT be overly obsequious. Stay to the point, but do explain concepts in depth. 
- You MUST use a flowing prose style rather than rigid bullet-point structures. Instead of "Why needed:", "How we implement:", "How TypeScript helps:" headers, weave the engineering context, implementation approach, and TypeScript advantages together naturally in conversational paragraphs. The goal is gentler, more engaging technical writing that reads like a thoughtful discussion rather than a reference manual.
- You MUST avoid using bulleted or numbered lists as much as possible
- You MUST add references to the official documentation whenever a new concept is introduced.
- You MUST demonstrate how Typescript differs from JavaScript wherever possible.
- You MUST add forward links to the next lesson or step at the end of each lesson
- You MUST NOT second guessing earlier decisions about the project architecture, but if we do, revisit earlier chapters to ensure consistency.

## API description

GeoNotes is an production-grade REST API for submitting "geonotes" - location-based reports that can be anything a human or system would want to communicate about a specific place. 

### Core functionality
- **Submit notes** with geographic coordinates and descriptions
- **Track and update note lifecycle** (state: new / open / closed as well as full version history)
- **Manage privacy** (public vs private notes)
- **Handle bulk operations** for importing large datasets
- **Authenticate users** with JWT tokens
- **Monitor system health** with metrics and logging

### Note structure
```json
{
  "latitude": 40.7128,
  "longitude": -74.0060,
  "description": "Pothole blocking bike lane",
  "isPrivate": false,
  "userData": {
    "category": "infrastructure",
    "severity": "medium",
    "reporterType": "cyclist"
  }
}
```


### Target Architecture
- **Framework**: Modern Node.js framework (NestJS or Express)
- **Database**: PostgreSQL with PostGIS for spatial data
- **Architecture**: Service layer, repository pattern, dependency injection
- **Features**: JWT auth, bulk operations, privacy system, monitoring, comprehensive testing
- **Scale**: Designed for millions to billions of notes globally

## TypeScript Learning Approach
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

### Chapter 4: Database Selection & Model Integration
- Lesson 1: PostgreSQL + PostGIS Setup
- Lesson 2: ORM Selection & Configuration
- Lesson 3: Data Models & Spatial Migrations

### Chapter 5: Basic API Implementation
- Lesson 1: Note Creation Endpoint
- Lesson 2: Note Retrieval & Spatial Queries
- Lesson 3: Note Updates & Deletion

### Chapter 6: Testing Strategy
- Lesson 1: Unit Testing with Jest
- Lesson 2: Integration & API Testing
- Lesson 3: Geographic Test Data & Fixtures

### Chapter 7: Authentication & Security
- Lesson 1: JWT Implementation
- Lesson 2: Authorization Middleware
- Lesson 3: Input Validation & Sanitization

### Chapter 8: Bulk Operations & Performance
- Lesson 1: Batch Processing Design
- Lesson 2: Database Optimization
- Lesson 3: Caching Strategies

### Chapter 9: Monitoring & Observability
- Lesson 1: Logging & Structured Events
- Lesson 2: Health Checks & Metrics
- Lesson 3: Error Tracking & Alerting

### Chapter 10: Deployment & Production
- Lesson 1: Docker & Environment Setup
- Lesson 2: CI/CD Pipeline
- Lesson 3: Production Monitoring & Scaling

### Chapter 11: Documentation
- Lesson 1: OpenAPI/Swagger Generation
- Lesson 2: Code Documentation Standards
- Lesson 3: Deployment & Operations Guides

### Chapter 12: Conclusion
- Lesson 1: Architecture Review & Next Steps

Each phase shall consist of lessons that break the topic down into self-contained learning steps that the user can complete within 2 hours.

## Exercises
- Each lesson FROM CHAPTER 4 ONWARDS MUST end with exercise that reinforces the material taught.
- The exercises MUST build on the previous work
- When the student completes all exercises, she MUST have a working, production grade API codebase that is ready to be deployed. 
- CHAPTERS 1-3 SHALL NOT contain exercises. 

## Structure
Each phase shall have its own directory under the root of the project. Each directory shall shall have one markdown file for each lesson starting with CxLy (Chapter x Lesson y).
There shall not be any other subdirectories. If we are using sample data, we will place this sample data in a directory sample-data at the root level. 

## Learning Principles
- **Hands-on approach**: Write code for every concept learned
- **Incremental complexity**: Start simple, add sophistication gradually
- **Real-world patterns**: Focus on enterprise-grade architecture from the start
- **Documentation**: Each lesson includes references and examples

