# Learn TypeScript With Me!

I am building a geospatial API as a foundation for something new I am starting. I reached for Python / FastAPI initially, but after talking to some developers who are a lot smarter than I am, I decided it would be cool to challenge myself a little and do the whole thing in node / TypeScript. I'd learn someting new in the process and perhaps reconsider some of the choices and assumptions that have settled in my mind writing Python backend code for 15 years or so.

## Me and Claude
I've been a curious user of Claude Code. I've used it to help me write boring and repetitive code faster, to plan work, and to discuss architecture choices. Why not use it to help me on this learning path? The most obvious prompt would be something like "Here's a Python codebase for a geospatial API. Please help me rewrite this in Typescript". But a) that would be boring b) I'd learn little and c) the end result would be a hot pile of garbage. So instead I thought what I'd try is to have Claude inspect what I had and help me write a structured course that would help me understand how to build this myself. This way I a) learn a lot about writing production backend code with TypeScript, b) produce something of value for others and c) end up with a great foundation for my business.

## Free-ish
You may think that what you have in front of you is 95% Claude and 5% me. You would be wrong - I have Claude help me with the structure and scaffolding for the lessons, but I add, delete and rewrite a lot as I follow the lessons myself. As I write this, I have only completed the first lesson of what should be 34 lessons when it's all done, and I spent an entire day on it. Future lessons should be quicker to produce as I tweak CLAUDE.md and learn more TypeScript, but it will be a few weeks work for sure.

So where I am going with this, is that this is not going to be a completely free course. Even though I am unemployed right now (which is why I have time to do this in the first place!) my time has value, and I think the end result will have value for you as well. I'll probably tease the first three or four chapters and ask a reasonable amount of money for the full thing. 

Learn with me!
*Martijn*

## What We'll Build

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

## Get Started

Ready to begin? Start with [Chapter 1: TypeScript Fundamentals](ch1-typescript-fundamentals/C1L1-typescript-basics-for-apis.md) to build your conceptual foundation.

Alternatively, jump to the [Project Overview](00-project-overview/project-overview.md) for more context about the GeoNotes API you'll be building.
