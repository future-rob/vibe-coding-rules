# Cursor Rules for Python FastAPI Projects

This repository contains Cursor AI coding rules and guidelines for Python and FastAPI projects. These rules help maintain consistency, code quality, and best practices across the codebase when working with AI assistants in Cursor.

## What are Cursor Rules?

Cursor rules are markdown files (`.mdc` format) that provide context and guidelines to AI coding assistants. They help ensure that AI-generated code follows your project's specific patterns, conventions, and architectural decisions.

## Overview of Rules

### 📋 Core Framework & Language (`core-framework-&-language.mdc`)
Defines the foundational technology stack:
- **Framework:** FastAPI (Async REST API Framework)
- **Language:** Python 3.11+
- **Runtime:** Python with Uvicorn ASGI server

### 🔧 Backend Architecture (`backend-architecture.mdc`)
Backend architecture and patterns:
- **API Design:** RESTful API with OpenAPI/Swagger
- **Dependency Injection:** FastAPI's built-in DI system
- **Database:** SQLAlchemy ORM with PostgreSQL
- **Background Tasks:** Celery with Redis
- **Validation:** Pydantic schemas
- **Authentication:** JWT tokens with OAuth2

### 🏗️ Key Architectural Patterns (`key-architecture-patterns.mdc`)
Core architectural patterns used in the codebase:
- **Service Layer:** Business logic in `app/services/`
- **Repository Pattern:** Data access in `app/repositories/`
- **Domain Models:** Pydantic models and SQLAlchemy models
- **Dependency Injection:** FastAPI's Depends system
- **Modular Routers:** Feature-based API routes

### 💬 Commenting Guidelines (`commenting-guidelines.mdc`)
Comprehensive docstring standards:
- **Format:** Google-style docstrings for all public functions
- **Focus:** Explain the "why" and "intent", not the "what"
- **When to Comment:** Public APIs, complex logic, non-obvious decisions
- **Key Elements:** Parameters, returns, raises, examples
- **Type Hints:** Always use type annotations

### 📝 Logging Guidelines (`logging-guidelines.mdc`)
**⚠️ IMPORTANT: Only add logs when asked for. By default, do NOT add logs.**

Comprehensive logging standards:
- **Logger:** Use Python's `logging` module with custom formatters
- **Log Levels:** `error`, `warning`, `info`, `debug`
- **Context:** Include request IDs, user IDs, operation context
- **Best Practices:** Structured logging, avoid sensitive data
- **Performance:** Async-aware logging, minimal performance impact

### 🎯 Code Style Guidelines (`code-style-guidelines.mdc`)
Comprehensive code style guide following PEP 8 and beyond:
- **Formatting:** Black formatter with 100-char line length
- **Import Order:** isort with custom grouping
- **Type Hints:** Mandatory for all functions
- **Naming:** snake_case for functions/variables, PascalCase for classes
- **Async:** Prefer async/await for I/O operations
- **Docstrings:** Google-style for all public functions

### ✅ No Hiding (`no-hiding.mdc`)
**Critical Rule:** Never hide linter errors or type checker warnings. All must be resolved.

### 🧪 Testing (`testing.mdc`)
Comprehensive testing philosophy:
- **Framework:** Pytest with async support
- **Coverage:** 100% for service and repository layers
- **Test Types:** Unit, integration, and API tests
- **Test Organization:** Tests mirror source structure
- **Mocking:** Use `pytest-mock` and `unittest.mock`
- **Fixtures:** Extensive use of pytest fixtures

### 🚨 Error Handling Patterns (`error-handling-patterns.mdc`)
Comprehensive error management:
- **Custom Exceptions:** Domain-specific error classes
- **API Error Responses:** Consistent error format
- **Exception Handlers:** Global and route-specific
- **Validation Errors:** Pydantic validation with clear messages
- **Logging:** All errors logged with context

### ⚡ Performance Guidelines (`performance-guidelines.mdc`)
Python and FastAPI optimization:
- **Async Best Practices:** Proper async/await usage
- **Database Optimization:** Query optimization, connection pooling
- **Caching:** Redis caching strategies
- **Background Tasks:** Offload heavy operations
- **Response Streaming:** For large datasets
- **Profiling:** Performance monitoring tools

### 🗄️ Data Management Patterns (`data-management-patterns.mdc`)
Database and data handling:
- **SQLAlchemy Patterns:** Async sessions, proper transactions
- **Migrations:** Alembic for database schema management
- **Query Optimization:** Eager loading, query builders
- **Data Validation:** Pydantic models for all I/O
- **Serialization:** Proper JSON encoding/decoding

### 🔒 Security Guidelines (`security-guidelines.mdc`)
Security best practices:
- **Authentication:** JWT with refresh tokens
- **Authorization:** Role-based access control (RBAC)
- **Input Validation:** Always validate with Pydantic
- **SQL Injection:** Use parameterized queries
- **Secrets Management:** Environment variables, never hardcode
- **CORS:** Properly configured CORS middleware

### 🔀 Git Workflow (`git-workflow.mdc`)
Version control standards:
- **Commit Format:** Conventional Commits
- **Branch Naming:** Consistent conventions
- **Pull Requests:** PR template and process
- **Pre-commit Hooks:** Black, isort, mypy, ruff

### 👀 Code Review (`code-review.mdc`)
Code review checklist:
- **Functionality:** Does it work as intended?
- **Tests:** Are there adequate tests?
- **Performance:** Any obvious bottlenecks?
- **Security:** Any security concerns?
- **Style:** Follows all guidelines?

### 🚀 API Design Guidelines (`api-design-guidelines.mdc`)
RESTful API design principles:
- **Resource Naming:** Plural nouns, kebab-case
- **HTTP Methods:** Proper use of GET, POST, PUT, DELETE
- **Status Codes:** Appropriate HTTP status codes
- **Pagination:** Cursor-based pagination
- **Versioning:** URL path versioning (/v1/)
- **Documentation:** OpenAPI/Swagger auto-generated

### 🔧 Configuration Management (`configuration-management.mdc`)
Configuration best practices:
- **Environment Variables:** Using Pydantic Settings
- **Configuration Layers:** Development, staging, production
- **Secrets:** Never in code, use env vars or secret manager
- **Validation:** All config validated at startup

### 📦 Dependency Management (`dependency-management.mdc`)
Package and dependency handling:
- **Poetry:** For dependency management
- **Version Pinning:** Exact versions in lock file
- **Security:** Regular dependency audits
- **Docker:** Multi-stage builds for production

### ⚖️ Conflict Resolution (`conflict-resolution.mdc`)
Guidance for resolving rule conflicts:
- **Priority Hierarchy:** Rule precedence order
- **Common Scenarios:** How to handle specific conflicts
- **Decision Process:** Step-by-step conflict resolution
- **Documentation:** When and how to document exceptions

## How to Use These Rules

### In Cursor IDE

1. **Automatic Application:** Files with `alwaysApply: true` in their frontmatter are automatically applied to all AI interactions.

2. **Context-Aware Application:** Files with `globs` patterns are applied when working with matching file types or directories.

3. **Manual Reference:** You can reference specific rules in your prompts:
   ```
   @commenting-guidelines.mdc Please add docstrings to this function
   ```

### File Structure

```
vibe-coding-rules/
├── README.md (this file)
└── Python + FastAPI/
    ├── api-design-guidelines.mdc
    ├── backend-architecture.mdc
    ├── code-review.mdc
    ├── code-style-guidelines.mdc
    ├── commenting-guidelines.mdc
    ├── configuration-management.mdc
    ├── conflict-resolution.mdc
    ├── core-framework-&-language.mdc
    ├── data-management-patterns.mdc
    ├── dependency-management.mdc
    ├── error-handling-patterns.mdc
    ├── git-workflow.mdc
    ├── key-architecture-patterns.mdc
    ├── logging-guidelines.mdc
    ├── no-hiding.mdc
    ├── performance-guidelines.mdc
    ├── security-guidelines.mdc
    └── testing.mdc
```

## Quick Reference

### When Writing Code
- ✅ Follow PEP 8 and use Black formatter
- ✅ **NEVER abbreviate variables** - Always use descriptive names
- ✅ Use type hints for all function signatures
- ✅ Write Google-style docstrings for public APIs
- ✅ Never hide linter or type checker errors
- ✅ Use appropriate logging (only when requested)
- ✅ Follow architectural patterns (Service Layer, Repository Pattern)

### When Building APIs
- ✅ Use Pydantic models for request/response validation
- ✅ Implement proper error handling with custom exceptions
- ✅ Use dependency injection for shared resources
- ✅ Document endpoints with OpenAPI schemas
- ✅ Implement proper authentication and authorization
- ✅ Use async/await for I/O operations

### When Testing
- ✅ Write tests for service and repository layers (100% coverage)
- ✅ Use pytest fixtures for test data
- ✅ Mock external dependencies properly
- ✅ Test both success and error cases
- ✅ Use async test functions for async code

### When Handling Errors
- ✅ Use custom exception classes
- ✅ Never expose internal errors to API consumers
- ✅ Log errors with proper context
- ✅ Return consistent error responses
- ✅ Validate all inputs with Pydantic

### When Optimizing Performance
- ✅ Profile before optimizing
- ✅ Use async/await properly
- ✅ Implement caching where appropriate
- ✅ Optimize database queries
- ✅ Use background tasks for heavy operations
- ✅ Monitor API response times

### When Managing Data
- ✅ Use SQLAlchemy ORM with async support
- ✅ Implement proper transaction management
- ✅ Use Alembic for migrations
- ✅ Validate all data with Pydantic
- ✅ Handle database connections properly

### When Committing Code
- ✅ Use Conventional Commits format
- ✅ Run pre-commit hooks (black, isort, mypy, ruff)
- ✅ Write clear commit messages
- ✅ Make atomic commits
- ✅ Never commit secrets

### When Reviewing Code
- ✅ Check functionality and edge cases
- ✅ Verify test coverage
- ✅ Look for security issues
- ✅ Ensure performance considerations
- ✅ Verify adherence to all guidelines

### When Designing APIs
- ✅ Use RESTful principles
- ✅ Return appropriate status codes
- ✅ Implement proper pagination
- ✅ Version your APIs
- ✅ Document with OpenAPI/Swagger

## Contributing

When updating these rules:
1. Keep guidelines clear and actionable
2. Include examples where helpful
3. Update this README if adding new rule files
4. Ensure consistency across all rule files

## Notes

- These rules are specifically tailored for Python + FastAPI projects
- Rules marked with `alwaysApply: true` are enforced automatically
- The logging guidelines emphasize minimal logging by default - only log when explicitly requested
- The "no-hiding" rule is critical - all linter and type checker errors must be resolved
- When rules conflict, refer to `conflict-resolution.mdc` for guidance
- Focus on async patterns as FastAPI is async-first
