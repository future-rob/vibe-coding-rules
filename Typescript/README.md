# Cursor Rules for TypeScript Projects

This folder contains Cursor AI coding rules and guidelines for general TypeScript projects. These rules help maintain consistency, code quality, and best practices when working with TypeScript codebases and AI assistants in Cursor.

## What are Cursor Rules?

Cursor rules are markdown files (`.mdc` format) that provide context and guidelines to AI coding assistants. They help ensure that AI-generated code follows your project's specific patterns, conventions, and best practices.

## Overview of Rules

### 📘 TypeScript Code Style Guide (`typescript-code-style-guide.mdc`)

A comprehensive TypeScript coding standards guide that establishes best practices for writing type-safe, maintainable TypeScript code.

**Core Principles:**
- **Type Safety First** - Leverage TypeScript's type system fully, never use `any`
- **Functional Over Classes** - Prefer functions, closures, and composition over classes and inheritance
- **Descriptive Naming** - Never abbreviate variables, always use full descriptive names
- **Maintainability** - Code should be clear and self-documenting
- **Consistency** - Uniform patterns across the codebase
- **Quality** - No shortcuts, no suppressed errors, no technical debt

**Key Topics Covered:**

1. **Type Safety**
   - Never use `any` - use `unknown` and narrow it
   - Avoid `@ts-ignore` or `@ts-expect-error`
   - Explicit return types for public APIs
   - Type guards for runtime type checking

2. **Naming Conventions**
   - Variables & Functions: `camelCase`
   - Classes & Types: `PascalCase`
   - Constants: `UPPER_SNAKE_CASE` (exported) or `camelCase` (local)
   - **NEVER abbreviate** - always use full, descriptive names

3. **Type Definitions**
   - Interfaces vs Type Aliases (when to use each)
   - Discriminated unions for type-safe state management
   - Generic types and constraints
   - Utility types (built-in and custom)

4. **Function Signatures**
   - Explicit return types
   - Default parameters
   - Rest parameters
   - JSDoc documentation

5. **Advanced Patterns**
   - Type guards and narrowing
   - Optional chaining and nullish coalescing
   - Error handling with custom error classes
   - Async/await patterns
   - Functional composition over class inheritance

6. **Code Quality**
   - No suppressed lint errors
   - Proper error handling
   - Documentation standards
   - Testing considerations
   - Performance patterns

## How to Use These Rules

### In Cursor IDE

1. **Automatic Application:** Files with `alwaysApply: true` in their frontmatter are automatically applied to all AI interactions.

2. **Context-Aware Application:** Files with `globs` patterns are applied when working with matching file types or directories.

3. **Manual Reference:** You can reference specific rules in your prompts:
   ```
   @typescript-code-style-guide.mdc Please refactor this function to follow our TypeScript style guide
   ```

### File Structure

```
Typescript/
├── README.md (this file)
└── typescript-code-style-guide.mdc
```

## Quick Reference

### When Writing TypeScript Code

- ✅ **Never use `any`** - Use `unknown` if type is truly unknown, then narrow it
- ✅ **Avoid classes** - Use functions, closures, and composition instead (see note below)
- ✅ **Always use descriptive names** - Never abbreviate variables
- ✅ **Provide explicit return types** - Especially for exported functions
- ✅ **Use type guards** - For runtime type checking and narrowing
- ✅ **Leverage discriminated unions** - For complex state management
- ✅ **Document public APIs** - Use JSDoc for complex functions
- ✅ **Never suppress errors** - Fix the root cause, don't hide it
- ✅ **Use proper error handling** - Custom error classes with type safety
- ✅ **Prefer interfaces** - For object shapes that might be extended
- ✅ **Use type aliases** - For unions, intersections, and computed types

> ⚠️ **Important: Prefer Functional Paradigms Over Classes**
>
> Classes introduce hidden state, complex inheritance hierarchies, and unnecessary overhead. Modern TypeScript with functional patterns is cleaner, more testable, and easier to reason about. Use pure functions, closures, and composition instead. Only use classes when absolutely necessary (custom Error classes, framework requirements, or genuinely complex stateful objects).

### Type Safety Checklist

Before submitting code, ensure:

- [ ] No `any` types (use `unknown` and narrow)
- [ ] No unnecessary classes (use functions and closures instead)
- [ ] All exported functions have explicit return types
- [ ] No suppressed lint errors (`@ts-ignore`, `eslint-disable`)
- [ ] All variables use descriptive, non-abbreviated names
- [ ] Complex logic is documented with JSDoc
- [ ] Error handling is implemented properly
- [ ] Type guards are used for runtime type checking
- [ ] Code follows formatting guidelines (2-space indentation, semicolons)
- [ ] No mutations of function parameters
- [ ] Proper use of `const`/`let` (prefer `const`)

### Common Patterns

#### Type-Safe Function

```typescript
/**
 * Calculates the total price of items with optional discount.
 *
 * @param items - Array of items with price property
 * @param discountPercentage - Optional discount (0-100)
 * @returns Total price after discount
 * @throws {ValidationError} If discount is out of range
 */
function calculateTotal(
  items: Item[],
  discountPercentage: number = 0
): number {
  if (discountPercentage < 0 || discountPercentage > 100) {
    throw new ValidationError('Discount must be between 0 and 100');
  }
  const subtotal = items.reduce((sum, item) => sum + item.price, 0);
  return subtotal * (1 - discountPercentage / 100);
}
```

#### Type Guard

```typescript
function isUser(obj: unknown): obj is User {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'name' in obj &&
    typeof (obj as User).id === 'string'
  );
}

function processValue(value: unknown) {
  if (isUser(value)) {
    // TypeScript knows value is User here
    return value.name;
  }
  throw new Error('Invalid value type');
}
```

#### Discriminated Union

```typescript
type AsyncState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error };

function handleState<T>(state: AsyncState<T>) {
  switch (state.status) {
    case 'idle':
      return 'Ready';
    case 'loading':
      return 'Loading...';
    case 'success':
      return `Data: ${state.data}`; // TypeScript knows data exists
    case 'error':
      return `Error: ${state.error.message}`; // TypeScript knows error exists
  }
}
```

## Integration with Framework-Specific Rules

This general TypeScript guide can be used alongside framework-specific rules:

- **TypeScript + React + Next.js:** See `../Typescript-React + Nextjs/` for React-specific patterns
- **TypeScript + Node.js:** Use this guide with Node.js best practices
- **TypeScript + Express:** Combine with Express.js patterns
- **Any TypeScript Project:** This guide provides the foundation for all TypeScript projects

## Best Practices Summary

### DO ✅

- Use TypeScript's type system fully
- **Use functions and closures instead of classes**
- **Use composition instead of inheritance**
- Write descriptive, non-abbreviated variable names
- Provide explicit return types for public APIs
- Use type guards for runtime type checking
- Leverage discriminated unions for complex state
- Document complex logic with JSDoc
- Handle errors properly with custom error classes
- Use interfaces for object shapes
- Use type aliases for unions and computed types

### DON'T ❌

- Never use `any` - use `unknown` and narrow
- **Never use classes unless absolutely necessary** (Error classes, framework APIs, complex state)
- **Never use inheritance when composition works**
- Never suppress errors - fix the root cause
- Never abbreviate variables - use full names
- Never skip return types on exported functions
- Never mutate function parameters
- Never use non-null assertions without checks
- Never use type assertions without validation
- Never hide lint errors

## Related Guidelines

For framework-specific TypeScript patterns, see:

- **[TypeScript-React + Nextjs](../Typescript-React%20+%20Nextjs/)** - React and Next.js specific patterns
- **[Root README](../README.md)** - Overview of all coding rules

## Contributing

When updating these rules:

1. Keep guidelines clear and actionable
2. Include examples where helpful (BAD vs GOOD patterns)
3. Update this README if adding new rule files
4. Ensure consistency with other TypeScript-related rules
5. Test guidelines work well with AI assistants

## Notes

- These rules are designed for general TypeScript projects
- Rules marked with `alwaysApply: true` are enforced automatically
- The guide emphasizes type safety and code quality above all else
- Never suppress errors - always fix the root cause
- When used with framework-specific rules, this guide provides the TypeScript foundation

## Remember

- **TypeScript is a tool for safety** - use it fully, don't bypass it
- **Functions over classes** - prefer functional paradigms for cleaner, more testable code
- **Readability matters** - code is read more than written
- **Consistency is key** - follow these patterns uniformly
- **Fix, don't suppress** - every error is an opportunity to improve
- **Document intent** - comments explain "why", types explain "what"




