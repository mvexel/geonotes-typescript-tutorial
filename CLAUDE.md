# TypeScript Learning Project: Building GeoNotes API

This project is aimed at experienced developers wanting to learn TypeScript to create a production-grade API. 

We will guide the user in building a location-based API called GeoNotes from scratch. The goal is to understand TypeScript fundamentals through practical application while applying enterpriseproduction-grade software architecture best practices.

## General instructions
- You MUST assume the audience is a fairly senior software developer with experience in at least one other language, but little or no experience with building backend APIs in typescript and node.
- You MUST ensure consistent teaching and writing style throughout. 00-project-overview/project-overview.md should be the reference. 
- You MUST review each file at the start of a session for specific instructions wherever you are mentioned with @claude
- You MUST be critical of my choices. I have teaching experience but I have never created a technical course before
- - You MUST NOT be overly obsequious. Stay to the point, but do explain concepts in depth. 
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
- Chapter 1: TypeScript Fundamentals
- Chapter 2: Framework Selection & Architecture
- Chapter 3: Project Setup & Tooling
- Chapter 4: Database Selection & Model Integration
- Chapter 5: Basic API Implementation
- Chapter 6: Testing Strategy
- Chapter 7: Authentication & Security
- Chapter 8: Bulk Operations & Performance
- Chapter 9: Monitoring & Observability
- Chapter 10: Deployment & Production
- Chapter 11: Documentation
- Chapter 12: Conclusion

Each phase shall consist of lessons that break the topic down into self-contained learning steps that the user can complete within 2 hours.

## Structure
Each phase shall have its own directory under the root of the project. Each directory shall have a subdirectory for each lesson. Each subdirectory shall have one markdown file containing the lesson materials. Each lesson shall end with exercise that reinforce the material taught. There shall not be any other subdirectories. If we are using sample data, we will place this sample data in a directory sample-data at the root level. 

## Learning Principles
- **Hands-on approach**: Write code for every concept learned
- **Incremental complexity**: Start simple, add sophistication gradually
- **Real-world patterns**: Focus on enterprise-grade architecture from the start
- **Documentation**: Each lesson includes references and examples

