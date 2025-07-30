# Building a Geospatial API with TypeScript

In this tutorial, you will build a production-grade location-based API using TypeScript and Node.js: GeoNotes. You'll implement enterprise patterns while learning TypeScript's type system through practical application.

## What you should bring

This is a tutorial for experienced developers. If you're new to software development and have never built an API of any kind, this tutorial is probably not for you.

**Dev experience**
- **Backend development** in any language (Python, Java, C#, Go, etc.)
- **HTTP APIs** - understanding of REST principles, status codes, request/response patterns
- **Database fundamentals** - SQL queries, relationships, basic performance concepts
- **Command line** - comfortable with terminal operations and package managers

**JavaScript Knowledge**
- **Basic syntax** - functions, objects, arrays, async/await
- **ES6+ features** - destructuring, arrow functions, modules, promises
- **Node.js basics** - package.json, npm/yarn, basic server concepts

**Development Environment:**
- **Node.js 18+** installed
- **Code editor** with TypeScript support (VS Code recommended)
- **PostgreSQL** instance (local or cloud)
- **Git** for version control

**What You Don't Need:**
- Prior TypeScript experience
- Frontend development knowledge
- Docker or containerization (though helpful)
- Cloud deployment experience

## Why This Project

Instead of toy examples, you'll build infrastructure software with real-world complexity. The API you will build handles the same patterns found in production systems like municipal 311 APIs, crowdsourced mapping platforms, and field research tools.

Knowing, and sharing, where things are in the world is foundational to a lot of applications. You see a dangerous pothole on your bike ride to work. A neighbor notices that a streetlight has been broken for weeks. A visitor discovers an amazing local business that deserves recognition. A researcher spots an environmental change worth documenting.

With this API, you'll be creating the infrastructure that transforms casual observations into actionable, organized information tied to specific places on Earth. Systems like the one you'll build are already changing the world:

- **Boston's 311 system** handles over 200,000 civic reports annually
- **OpenStreetMap Notes** have generated millions of map improvements worldwide  
- **eBird** has collected over 1 billion bird observations for scientific research
- **Waze** crowdsources traffic data from 140 million active users

The patterns you'll learn building GeoNotes power these massive, impactful systems.

## Core Concepts

At its heart, a "geonote" is just a message tied to coordinates:

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

But we'll build sophisticated features around this simple model.

## What We'll Build Together

### 1. Core Note Management
- **Create notes** with coordinates, descriptions, and custom user data
- **Read notes** with geographic and text-based filtering
- **Update note status** as issues are addressed
- **Delete notes** when no longer relevant

### 2. Note Lifecycle
Notes progress through states:
- **new**: Just reported, needs attention
- **taken**: Someone is working on it
- **closed**: Issue resolved or note is complete
- **can reopen**: Closed notes can return to "new" if needed

### 3. User System
- **User registration** and authentication
- **JWT token-based** secure API access
- **Role-based permissions** (regular users vs admins)
- **User profiles** and settings

### 4. Privacy Features
- **Public notes**: Visible to everyone
- **Private notes**: Only visible to the creator
- **Quota system**: Limits on private note creation
- **Admin oversight**: Administrative controls

### 5. Geographic Features
- **Coordinate validation**: Ensure valid lat/lng values
- **Radius searching**: Find notes within X kilometers
- **Spatial indexing**: Fast geographic queries
- **PostGIS integration**: Advanced spatial operations

### 6. Bulk Operations
- **Bulk import**: Upload thousands of notes at once
- **Async processing**: Handle large operations in background
- **Progress tracking**: Monitor bulk operation status
- **Error reporting**: Detailed feedback on failed operations

### 7. Enterprise Features
- **Comprehensive logging**: Track all system activity
- **Metrics and monitoring**: Prometheus-compatible metrics
- **Health checks**: System status endpoints
- **Rate limiting**: Prevent abuse
- **Input validation**: Secure data handling

## API Structure

### Core Endpoints
```
GET    /api/v1/notes           # List notes with filtering
POST   /api/v1/notes           # Create a new note
GET    /api/v1/notes/{id}      # Get specific note
PUT    /api/v1/notes/{id}      # Update note
DELETE /api/v1/notes/{id}      # Delete note

POST   /api/v1/notes/bulk      # Bulk create notes
GET    /api/v1/jobs/{id}       # Check bulk job status
```

### User Management
```
POST   /api/v1/auth/register   # Create account
POST   /api/v1/auth/login      # Get JWT token
GET    /api/v1/users/me        # Get current user info
PUT    /api/v1/users/me        # Update profile
```

### System Endpoints
```
GET    /api/health             # System health check
GET    /api/metrics            # Prometheus metrics
GET    /api/version            # API version info
```

## Concepts, Patterns and Technology we will use

Some of the ingredients we will use will sound familiar to you, but it will be useful to see them discussed in the context of Typescript and node.js. No need to study up on any of these right now, we will talk about them as we come across them.

### Technology Stack
- **Runtime**: Node.js with TypeScript
- **Framework**: NestJS (enterprise patterns) or Express (simpler)
- **Database**: PostgreSQL with PostGIS extension
- **ORM**: Prisma (type-safe) or TypeORM (decorator-based)
- **Authentication**: JWT tokens
- **Testing**: Jest for unit/integration tests
- **Monitoring**: Prometheus metrics
- **Documentation**: OpenAPI/Swagger

### Design Patterns
- **Repository Pattern**: Data access abstraction
- **Service Layer**: Business logic separation  
- **Dependency Injection**: Modular, testable architecture
- **Middleware**: Cross-cutting concerns (auth, logging, etc.)
- **Error Handling**: Consistent error responses
- **Input Validation**: Type-safe request validation

## Table of Contents

### Chapter 1: TypeScript Foundations
- **Type system basics**: Numbers, strings, booleans, objects
- **Interfaces and types**: Defining data structures
- **Functions and classes**: Building reusable components
- **Generics**: Writing flexible, reusable code

### Chapter 2: Building the API
- **Node.js setup**: Project structure and tooling
- **HTTP server**: Handling requests and responses
- **Database integration**: Persistent data storage
- **Authentication**: Secure user access

### Chapter 3: Advanced Features
- **Geographic queries**: Finding notes by location
- **Bulk operations**: Handling large datasets
- **Privacy controls**: Public vs private notes
- **Real-time updates**: Live data synchronization

### Chapter 4: Production Ready
- **Testing strategies**: Unit, integration, and performance tests
- **Monitoring**: Health checks and metrics
- **Documentation**: API specs and deployment guides
- **Security**: Input validation and protection

## Learning Outcomes

Building GeoNotes will teach you to think like a professional software architect:

**Scale First**: Every decision considers how the system will behave with millions of users and billions of data points.

**Real-World Constraints**: Geographic coordinates must be valid, user permissions must be enforced, and data integrity cannot be compromised.

**Production Concerns**: Logging, monitoring, security, and performance aren't afterthoughts - they're built in from day one.

**Type Safety**: Complex domain logic is expressed through TypeScript's type system, catching entire categories of bugs before they reach users.

**Design Principles**: You'll automatically consider edge cases and error conditions. You'll design APIs that are intuitive and impossible to misuse. You'll write code that's self-documenting through intelligent type design. You'll understand how to build systems that can grow from dozens to millions of users

By the end of this journey, you'll have:

1. **A complete, production-ready API** with authentication, validation, monitoring, and comprehensive testing
2. **Deep TypeScript knowledge** that goes far beyond syntax to include advanced patterns and architectural thinking
3. **Professional development practices** including testing strategies, documentation, and deployment pipelines
4. **A portfolio project** that demonstrates enterprise-grade software engineering skills
5. **Confidence** to tackle any backend development challenge

## Getting Started

The tutorial is structured in phases that build progressively. You'll start with TypeScript fundamentals applied to the GeoNotes domain, then build the actual API implementation.

**Next:** Continue to [Chapter 1: TypeScript Fundamentals](../01-fundamentals/lessons/01-typescript-basics.md) to begin with type system concepts applied to location-based data structures.