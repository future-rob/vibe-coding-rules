# Cursor Rules for TypeScript React Next.js Projects

This repository contains Cursor AI coding rules and guidelines for TypeScript, React, and Next.js projects. These rules help maintain consistency, code quality, and best practices across the codebase when working with AI assistants in Cursor.

## What are Cursor Rules?

Cursor rules are markdown files (`.mdc` format) that provide context and guidelines to AI coding assistants. They help ensure that AI-generated code follows your project's specific patterns, conventions, and architectural decisions.

## Overview of Rules

### 📋 Core Framework & Language (`core-framework-&-language.mdc`)
Defines the foundational technology stack:
- **Framework:** Next.js (Pages Router)
- **Language:** TypeScript
- **Runtime:** Node.js

### 🎨 Frontend (`frontend.mdc`)
Frontend technology stack and libraries:
- **UI Library:** Chakra UI
- **Styling:** CSS Modules, Chakra UI style props, Emotion
- **State Management:** Zustand
- **Data Fetching:** Standard `fetch` API with custom utilities
- **Form Handling:** React Hook Form
- **Drag & Drop:** React DnD
- **Calendar:** React Calendar

### 🔧 Backend (`backend.mdc`)
Backend architecture and services:
- **API Routes:** Next.js API Routes (`src/pages/api/`)
- **Backend as a Service:** Supabase (Auth, Database, Storage)
- **API Validation:** Yup schemas
- **API Authentication:** Custom HOFs (`withAuthentication`, `withApiKeyAuth`, etc.)

### 🏗️ Key Architectural Patterns (`key-architecture-patterns.mdc`)
Core architectural patterns used in the codebase:
- **Service Layer:** Business logic in `src/services/`
- **Utility Functions:** Reusable functions in `src/utils/`
- **Modular Components:** Feature-specific components in `src/components/modules/`
- **Registry Pattern:** Dynamic component/executor management

### 💬 Commenting Guidelines (`commenting-guidelines.mdc`)
Comprehensive JSDoc commenting standards:
- **Format:** JSDoc (`/** ... */`) for multi-line comments
- **Focus:** Explain the "why" and "intent", not the "what" (types handle that)
- **When to Comment:** Public APIs, complex logic, non-obvious decisions, workarounds
- **Key Tags:** `@param`, `@returns`, `@throws`, `@deprecated`, `@example`, `@see`
- **What NOT to Comment:** Obvious code, type duplication, version control info, commented-out code

### 📝 Logging Guidelines (`logging-guidelines.mdc`)
**⚠️ IMPORTANT: Only add logs when asked for. By default, do NOT add logs.**

Comprehensive logging standards:
- **Server-Side:** Use `getServerLogger(moduleName)` for API routes, server components, middleware
- **Client-Side:** Use `getClientLogger(componentName)` for client components, hooks, event handlers
- **Log Levels:** `error`, `warn`, `info`, `http`, `debug`
- **Best Practices:** Include context, avoid sensitive data, use appropriate levels, structured metadata on server
- **Performance:** Client-side logging should be minimal; only `error` logs are sent to server by default

### 🎯 Styling Guidelines (`styling-guidelines.mdc`)
Comprehensive code style guide covering 30+ categories:
- **Types & References:** Use `const`/`let`, avoid `var`
- **Objects & Arrays:** Literal syntax, spread operators, method shorthand
- **Functions:** Named expressions, arrow functions, default parameters
- **Modules:** ES6 imports/exports, no wildcard imports
- **Naming:** camelCase for variables/functions, PascalCase for classes/components
- **Whitespace:** 2-space indentation, consistent spacing rules
- **Comments:** JSDoc for multi-line, `//` for single-line
- **Testing:** Write tests, aim for 100% coverage

### ✅ No Hiding (`no-hiding.mdc`)
**Critical Rule:** Never hide lint errors. All lint errors must be fully resolved.

### 🧪 Testing (`testing.mdc`)
Comprehensive testing philosophy focusing on logic and behavior:
- **Service Layer Testing:** 100% coverage required for business logic
- **HOF Testing:** Authentication and middleware must be bulletproof  
- **No UI Tests:** Frontend tested manually, backend tested automatically
- **Test Organization:** Tests live alongside code in `__tests__` directories
- **Framework:** Jest with TypeScript support

### 🚨 Error Handling Patterns (`error-handling-patterns.mdc`)
Comprehensive error management strategies:
- **Custom Error Classes:** Domain-specific errors with proper status codes
- **API Error Handling:** Consistent error responses with security in mind
- **React Error Boundaries:** Graceful UI error recovery
- **Error Recovery:** Retry logic, fallbacks, and circuit breakers
- **Monitoring:** Structured logging with context

### ⚡ Performance Guidelines (`performance-guidelines.mdc`)
React and Next.js optimization techniques:
- **React Patterns:** memo, useMemo, useCallback best practices
- **State Optimization:** Selective Zustand subscriptions
- **List Virtualization:** Handling large datasets efficiently
- **Code Splitting:** Dynamic imports and lazy loading
- **Bundle Optimization:** Tree shaking and size monitoring
- **Data Fetching:** SWR patterns and optimistic updates

### 🗄️ State Management Patterns (`state-management-patterns.mdc`)
Zustand best practices and patterns:
- **Store Organization:** Single responsibility, focused stores
- **Performance:** Selective subscriptions and computed selectors
- **TypeScript:** Fully typed stores with predictable state
- **Advanced Patterns:** Middleware, persistence, async actions
- **Testing:** Store testing strategies

### 🔀 Git Workflow (`git-workflow.mdc`)
Version control and commit message standards:
- **Commit Format:** Conventional Commits specification
- **Branch Naming:** Consistent naming conventions
- **Pull Requests:** PR guidelines and templates
- **Workflow:** Feature branch workflow and conflict resolution

### 👀 Code Review (`code-review.mdc`)
Code review checklist and best practices:
- **Review Checklist:** Functionality, quality, architecture, security
- **Review Process:** Guidelines for authors and reviewers
- **Feedback:** How to provide constructive feedback
- **Conflict Resolution:** Handling disagreements during review

### ♿ Accessibility Guidelines (`accessibility-guidelines.mdc`)
Accessibility (a11y) standards for inclusive design:
- **WCAG Compliance:** Level AA target
- **Semantic HTML:** Proper element usage
- **ARIA Attributes:** When and how to use ARIA
- **Keyboard Navigation:** Full keyboard accessibility
- **Testing:** Manual and automated a11y testing

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
   @commenting-guidelines.mdc Please add JSDoc comments to this function
   ```

### File Structure

```
vibe-coding-rules/
├── README.md (this file)
└── Typescript-React-Nextjs/
    ├── accessibility-guidelines.mdc
    ├── backend.mdc
    ├── code-review.mdc
    ├── commenting-guidelines.mdc
    ├── conflict-resolution.mdc
    ├── core-framework-&-language.mdc
    ├── error-handling-patterns.mdc
    ├── frontend.mdc
    ├── git-workflow.mdc
    ├── key-architecture-patterns.mdc
    ├── logging-guidelines.mdc
    ├── no-hiding.mdc
    ├── performance-guidelines.mdc
    ├── state-management-patterns.mdc
    ├── styling-guidelines.mdc
    └── testing.mdc
```

## Quick Reference

### When Writing Code
- ✅ Follow styling guidelines (camelCase, 2-space indentation, semicolons, etc.)
- ✅ **NEVER abbreviate variables** - Always use full, descriptive names
- ✅ Use JSDoc comments for public APIs and complex logic
- ✅ Never hide lint errors - fix them completely
- ✅ Use appropriate logging (only when requested)
- ✅ Follow architectural patterns (Service Layer, Registry Pattern, etc.)

### When Adding Features
- ✅ Use Next.js API Routes for backend endpoints
- ✅ Use Chakra UI for frontend components
- ✅ Use Zustand for global state management
- ✅ Use React Hook Form for forms
- ✅ Validate API requests with Yup schemas
- ✅ Use Supabase for authentication and database

### When Testing
- ✅ Write tests for service layer (100% coverage required)
- ✅ Test HOFs and authentication separately
- ✅ Manual testing for frontend, automated for backend
- ✅ Focus on behavior, not implementation
- ✅ Mock at the boundary, not internally

### When Handling Errors
- ✅ Use custom error classes with proper status codes
- ✅ Never expose sensitive information in errors
- ✅ Implement error boundaries for React components
- ✅ Add retry logic for transient failures
- ✅ Log errors with context for debugging

### When Optimizing Performance
- ✅ Measure before optimizing
- ✅ Use React.memo, useMemo, useCallback appropriately
- ✅ Implement selective Zustand subscriptions
- ✅ Virtualize long lists
- ✅ Code split and lazy load heavy components
- ✅ Monitor bundle size

### When Managing State
- ✅ Use Zustand for global application state
- ✅ Keep local state for UI-only concerns
- ✅ Create focused, single-responsibility stores
- ✅ Use selectors for computed values
- ✅ Implement optimistic updates for better UX

### When Committing Code
- ✅ Use Conventional Commits format
- ✅ Write clear, descriptive commit messages
- ✅ Make atomic commits (one logical change)
- ✅ Test before committing
- ✅ Never commit secrets or sensitive data

### When Reviewing Code
- ✅ Check functionality and edge cases
- ✅ Verify adherence to all guidelines
- ✅ Look for security issues
- ✅ Provide constructive feedback
- ✅ Approve when standards are met

### When Building UI
- ✅ Use semantic HTML elements
- ✅ Ensure keyboard navigation works
- ✅ Provide proper ARIA labels
- ✅ Test with screen readers
- ✅ Meet WCAG AA standards

## Contributing

When updating these rules:
1. Keep guidelines clear and actionable
2. Include examples where helpful
3. Update this README if adding new rule files
4. Ensure consistency across all rule files

## Notes

- These rules are specifically tailored for TypeScript + React + Next.js projects
- Rules marked with `alwaysApply: true` are enforced automatically
- The logging guidelines emphasize minimal logging by default - only log when explicitly requested
- The "no-hiding" rule is critical - all lint errors must be resolved, never suppressed
- When rules conflict, refer to `conflict-resolution.mdc` for guidance
- React Testing Library is available but only for testing hooks, not component rendering

