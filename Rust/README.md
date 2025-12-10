# Cursor Rules for Rust Projects

This folder contains Cursor AI coding rules and guidelines for general Rust projects. These rules help maintain consistency, code quality, and best practices when working with Rust codebases and AI assistants in Cursor.

## What are Cursor Rules?

Cursor rules are markdown files (`.mdc` format) that provide context and guidelines to AI coding assistants. They help ensure that AI-generated code follows your project's specific patterns, conventions, and best practices.

## Overview of Rules

### 📘 Rust Code Style Guide (`rust-code-style-guide.mdc`)

A comprehensive Rust coding standards guide that establishes best practices for writing safe, performant, and maintainable Rust code.

**Philosophy:**

- **Memory Safety** - Leverage Rust's ownership system fully
- **Performance** - Zero-cost abstractions and efficient code
- **Clarity** - Code should be clear and self-documenting
- **Consistency** - Uniform patterns across the codebase
- **Quality** - No unsafe code unless absolutely necessary, no shortcuts
- **Error Handling** - Proper use of `Result` and `Option` types

**Key Topics Covered:**

1. **Ownership and Borrowing**

   - Prefer borrowing (`&T`) over owned values (`T`)
   - Use `&mut T` only when mutation is necessary
   - Avoid unnecessary `.clone()` calls
   - Use `Cow<'_, T>` for flexible ownership

2. **Naming Conventions**

   - Variables & Functions: `snake_case`
   - Types & Structs: `PascalCase`
   - Constants: `UPPER_SNAKE_CASE`
   - **NEVER abbreviate** - always use full, descriptive names

3. **Type Definitions**

   - Structs and enums
   - Type aliases
   - Generic types and trait bounds
   - Lifetimes

4. **Error Handling**

   - Custom error types with `thiserror`
   - Proper use of `Result<T, E>`
   - Error propagation with `?`
   - Never use `unwrap()` in production code

5. **Option and Result Patterns**

   - Using combinators (`map`, `and_then`, `or_else`)
   - Pattern matching
   - `if let` for single cases

6. **Lifetimes**

   - Explicit lifetime parameters
   - Lifetime elision rules
   - Structs with lifetime parameters

7. **Generics and Traits**

   - Generic functions and structs
   - Trait bounds and `where` clauses
   - Trait objects

8. **Collections and Iterators**

   - Iterator chains
   - Collecting into different types
   - Using slices instead of `Vec` when possible

9. **Async/Await**

   - Async functions with `tokio`
   - Parallel execution with `futures`
   - Timeout handling
   - Batch processing with semaphores

10. **Pattern Matching**
    - Exhaustive matching
    - Destructuring
    - Guard clauses

## How to Use These Rules

### In Cursor IDE

1. **Automatic Application:** Files with `alwaysApply: true` in their frontmatter are automatically applied to all AI interactions.

2. **Context-Aware Application:** Files with `globs` patterns are applied when working with matching file types or directories.

3. **Manual Reference:** You can reference specific rules in your prompts:
   ```
   @rust-code-style-guide.mdc Please refactor this function to follow our Rust style guide
   ```

### File Structure

```
Rust/
├── README.md (this file)
└── .cursor/
    └── rules/
        └── rust-code-style-guide.mdc
```

## Quick Reference

### When Writing Rust Code

- ✅ **Never use `unwrap()`** - Use proper error handling with `Result` and `?`
- ✅ **Never abbreviate variables** - Use full, descriptive names
- ✅ **Prefer borrowing** - Use `&T` instead of `T` when possible
- ✅ **Use `Result` for errors** - Never use sentinel values or panics
- ✅ **Document public APIs** - Use doc comments (`///`)
- ✅ **Handle `Option` properly** - Use combinators or pattern matching
- ✅ **Avoid unnecessary clones** - Use references and `Cow` when appropriate
- ✅ **Use slices** - Prefer `&[T]` over `&Vec<T>`
- ✅ **Write tests** - Use `#[cfg(test)]` modules
- ✅ **Run clippy** - Address all warnings

### Ownership Checklist

Before submitting code, ensure:

- [ ] No `unwrap()` calls in production code
- [ ] No unnecessary `clone()` calls
- [ ] All public functions have doc comments
- [ ] Error types are properly defined
- [ ] Lifetimes are correctly specified when needed
- [ ] No unsafe code unless absolutely necessary
- [ ] All variables use descriptive, non-abbreviated names
- [ ] Code follows formatting guidelines (run `rustfmt`)
- [ ] Clippy warnings are addressed
- [ ] Tests are written for new functionality

### Naming Examples

```rust
// ❌ BAD - Abbreviated names
let wf = workflows.iter().filter(|w| w.active);
fn calc_tot(items: &[Item]) -> f64 { 0.0 }

// ✅ GOOD - Descriptive names
let active_workflows: Vec<_> = workflows
    .iter()
    .filter(|workflow| workflow.is_active)
    .collect();

fn calculate_total(items: &[Item]) -> f64 {
    items.iter().map(|item| item.price).sum()
}
```

### Error Handling Examples

```rust
// ❌ BAD - Using unwrap()
let user_id = id_str.parse::<u64>().unwrap();

// ✅ GOOD - Proper error handling
let user_id = id_str.parse::<u64>()
    .map_err(|_| ApplicationError::ValidationError {
        field: "id".to_string(),
        message: "Invalid ID format".to_string(),
    })?;

// ❌ BAD - Panicking on error
if user.is_none() {
    panic!("User not found!");
}

// ✅ GOOD - Returning Result or Option
fn get_user(id: u64) -> Result<Option<User>, Error> {
    // Implementation
    Ok(None)
}
```

### Ownership Examples

```rust
// ❌ BAD - Unnecessary cloning
let user_name = user.name.clone();

// ✅ GOOD - Borrow when possible
let user_name = &user.name;

// ❌ BAD - Taking ownership when borrowing would work
fn process_data(data: String) -> usize {
    data.len()
}

// ✅ GOOD - Borrow instead
fn process_data(data: &str) -> usize {
    data.len()
}
```

### Async Examples

```rust
// ✅ GOOD - Parallel execution
async fn fetch_user_data(user_id: u64) -> Result<(User, Vec<Post>), Error> {
    let (user, posts) = futures::try_join(
        fetch_user(user_id),
        fetch_user_posts(user_id),
    ).await?;

    Ok((user, posts))
}
```

## Best Practices Summary

### DO ✅

- Use Rust's ownership system fully
- Write descriptive, non-abbreviated variable names
- Provide doc comments for public APIs
- Handle errors with `Result` and `Option`
- Use borrowing when ownership isn't needed
- Leverage iterator combinators
- Write comprehensive tests
- Run `rustfmt` and `clippy`
- Use `Cow` for flexible ownership
- Prefer slices over `Vec` in function signatures

### DON'T ❌

- Never use `unwrap()` in production code
- Never abbreviate variable names
- Never skip error handling
- Never use unsafe code unless absolutely necessary
- Never clone unnecessarily
- Never use `&Vec<T>` - use `&[T]` instead
- Never ignore clippy warnings
- Never skip documentation for public APIs
- Never use sentinel values for errors
- Never panic in library code

## Tooling Configuration

### Cargo.toml

```toml
[package]
name = "your-project"
version = "0.1.0"
edition = "2021"

[dependencies]
thiserror = "1.0"
tokio = { version = "1.0", features = ["full"] }
serde = { version = "1.0", features = ["derive"] }

[dev-dependencies]
tokio-test = "0.4"

[profile.release]
opt-level = 3
lto = true
codegen-units = 1
```

### Pre-commit Hooks

```yaml
repos:
  - repo: https://github.com/doublify/pre-commit-rust
    rev: v1.0
    hooks:
      - id: fmt
      - id: clippy
      - id: test
```

### rustfmt.toml

```toml
edition = "2021"
max_width = 100
```

## Integration with Framework-Specific Rules

This general Rust guide can be used alongside framework-specific rules:

- **Rust + Tokio:** Use this guide with async patterns
- **Rust + Actix:** Combine with web framework patterns
- **Rust + Serde:** Use with serialization patterns
- **Any Rust Project:** This guide provides the foundation for all Rust projects

## Related Guidelines

For framework-specific Rust patterns, see:

- **[Root README](../README.md)** - Overview of all coding rules

## Contributing

When updating these rules:

1. Keep guidelines clear and actionable
2. Include examples where helpful (❌ BAD vs ✅ GOOD patterns)
3. Update this README if adding new rule files
4. Ensure consistency with Rust API Guidelines
5. Test guidelines work well with AI assistants

## Notes

- These rules are designed for general Rust projects (Edition 2021+)
- Rules marked with `alwaysApply: true` are enforced automatically
- The guide emphasizes memory safety and performance above all else
- Never use `unwrap()` - always handle errors properly
- When used with framework-specific rules, this guide provides the Rust foundation

## Remember

- **Rust is about safety** - leverage the type system and ownership model
- **Zero-cost abstractions** - write high-level code without performance penalty
- **Explicit is better than implicit** - make ownership and lifetimes clear
- **Error handling is mandatory** - use `Result` and `Option` properly
- **No shortcuts** - avoid `unwrap()` and unsafe code unless necessary
- **Documentation matters** - write clear doc comments for public APIs
- **Consistency is key** - follow these patterns uniformly across the codebase




