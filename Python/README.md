# Cursor Rules for Python Projects

This folder contains Cursor AI coding rules and guidelines for general Python projects. These rules help maintain consistency, code quality, and best practices when working with Python codebases and AI assistants in Cursor.

## What are Cursor Rules?

Cursor rules are markdown files (`.mdc` format) that provide context and guidelines to AI coding assistants. They help ensure that AI-generated code follows your project's specific patterns, conventions, and best practices.

## Overview of Rules

### 📘 Python Code Style Guide (`python-code-style-guide.mdc`)

A comprehensive Python coding standards guide that establishes best practices for writing clean, maintainable, and type-safe Python code.

**Philosophy:**
- **Readability** - Python's core philosophy is that code is read more than written
- **Type Safety** - Leverage type hints fully for clarity and tooling support
- **Explicitness** - Explicit is better than implicit (PEP 20)
- **Consistency** - Uniform patterns across the codebase
- **Quality** - No shortcuts, no suppressed errors, no technical debt

**Key Topics Covered:**

1. **The Zen of Python**
   - Core principles from PEP 20
   - Readability and simplicity
   - Explicit over implicit

2. **Naming Conventions**
   - Variables & Functions: `snake_case`
   - Classes: `PascalCase`
   - Constants: `UPPER_SNAKE_CASE`
   - **NEVER abbreviate** - always use full, descriptive names

3. **Type Hints**
   - Mandatory for all functions
   - Modern syntax (Python 3.10+)
   - Generic types and TypeVars
   - Forward references
   - Type aliases

4. **Functions**
   - Single responsibility principle
   - Proper docstrings
   - Default arguments
   - Lambda functions
   - Pure functions

5. **Classes**
   - Well-structured class definitions
   - Dataclasses for data containers
   - Inheritance and composition
   - Properties and descriptors
   - Abstract base classes

6. **Error Handling**
   - Custom exception hierarchy
   - Specific exception handling
   - Context managers
   - Proper logging

7. **Async Programming**
   - Async/await patterns
   - Parallel execution
   - Concurrency limits
   - Timeout handling

8. **Collections and Comprehensions**
   - List/dict/set comprehensions
   - Generator expressions
   - itertools usage
   - Performance considerations

9. **Code Quality**
   - Pre-commit hooks
   - Type checking with mypy
   - Linting with ruff
   - Formatting with Black

## How to Use These Rules

### In Cursor IDE

1. **Automatic Application:** Files with `alwaysApply: true` in their frontmatter are automatically applied to all AI interactions.

2. **Context-Aware Application:** Files with `globs` patterns are applied when working with matching file types or directories.

3. **Manual Reference:** You can reference specific rules in your prompts:
   ```
   @python-code-style-guide.mdc Please refactor this function to follow our Python style guide
   ```

### File Structure

```
Python/
├── README.md (this file)
└── python-code-style-guide.mdc
```

## Quick Reference

### When Writing Python Code

- ✅ **Always use type hints** - For all function parameters and return types
- ✅ **Never abbreviate variables** - Use full, descriptive names
- ✅ **Write docstrings** - Google-style for all public functions
- ✅ **Handle errors properly** - Never use bare `except:`
- ✅ **Use f-strings** - Preferred for string formatting
- ✅ **Follow PEP 8** - Consistent formatting with Black
- ✅ **Use dataclasses** - For structured data containers
- ✅ **Prefer composition** - Over complex inheritance hierarchies
- ✅ **Write pure functions** - Where possible for testability
- ✅ **Use context managers** - For resource management

### Type Hints Checklist

Before submitting code, ensure:

- [ ] All functions have parameter type hints
- [ ] All functions have return type hints
- [ ] Complex types use proper generics
- [ ] Optional values use `X | None` syntax
- [ ] Type aliases are used for complex types
- [ ] Forward references use `from __future__ import annotations`

### Naming Examples

```python
# ❌ BAD - Abbreviated names
def calc_tot(items):
    return sum(i.price for i in items)

# ✅ GOOD - Descriptive names
def calculate_total(items: list[Item]) -> float:
    return sum(item.price for item in items)

# ❌ BAD - Single letter variables
for u in users:
    process(u)

# ✅ GOOD - Descriptive iteration variables
for user in users:
    process_user(user)
```

### Function Examples

```python
# ✅ GOOD - Type hints, docstring, single responsibility
def validate_email(email: str) -> bool:
    """
    Validate email format.

    Args:
        email: Email address to validate

    Returns:
        True if email format is valid, False otherwise

    Example:
        >>> validate_email("user@example.com")
        True
    """
    import re
    pattern = r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
    return bool(re.match(pattern, email))
```

### Error Handling Examples

```python
# ❌ BAD - Bare except
try:
    risky_operation()
except:
    pass

# ❌ BAD - Catching too broadly
try:
    risky_operation()
except Exception:
    pass

# ✅ GOOD - Specific exceptions with proper handling
try:
    result = risky_operation()
except ValueError as error:
    logger.warning("Invalid value: %s", error)
    raise ValidationError(str(error)) from error
except IOError as error:
    logger.error("IO operation failed", exc_info=True)
    raise
```

### Async Examples

```python
# ✅ GOOD - Parallel execution
async def fetch_user_with_posts(user_id: int) -> tuple[User, list[Post]]:
    """Fetch user and their posts in parallel."""
    user_task = asyncio.create_task(fetch_user(user_id))
    posts_task = asyncio.create_task(fetch_user_posts(user_id))
    
    user, posts = await asyncio.gather(user_task, posts_task)
    return user, posts
```

## Best Practices Summary

### DO ✅

- Use type hints for all functions
- Write descriptive, non-abbreviated variable names
- Provide Google-style docstrings for public APIs
- Handle exceptions specifically and properly
- Use dataclasses for data containers
- Prefer composition over inheritance
- Use context managers for resources
- Write pure functions when possible
- Use async/await for I/O operations
- Run Black, isort, and mypy

### DON'T ❌

- Never use bare `except:`
- Never abbreviate variable names
- Never skip type hints
- Never use mutable default arguments
- Never use `type()` for type checking (use `isinstance()`)
- Never ignore exceptions silently
- Never use global mutable state
- Never mix blocking I/O with async
- Never suppress linter errors without reason

## Tooling Configuration

### pyproject.toml

```toml
[tool.black]
line-length = 100
target-version = ['py311']

[tool.isort]
profile = "black"
line_length = 100

[tool.ruff]
line-length = 100
target-version = "py311"

[tool.ruff.lint]
select = ["E", "W", "F", "I", "B", "C4", "UP"]

[tool.mypy]
python_version = "3.11"
strict = true
```

### Pre-commit Hooks

```yaml
repos:
  - repo: https://github.com/psf/black
    rev: 24.4.2
    hooks:
      - id: black

  - repo: https://github.com/pycqa/isort
    rev: 5.13.2
    hooks:
      - id: isort

  - repo: https://github.com/astral-sh/ruff-pre-commit
    rev: v0.4.4
    hooks:
      - id: ruff
        args: [--fix]

  - repo: https://github.com/pre-commit/mirrors-mypy
    rev: v1.10.0
    hooks:
      - id: mypy
```

## Integration with Framework-Specific Rules

This general Python guide can be used alongside framework-specific rules:

- **Python + FastAPI:** See `../Python + FastAPI/` for FastAPI-specific patterns
- **Python + Django:** Use this guide with Django best practices
- **Python + Flask:** Combine with Flask patterns
- **Any Python Project:** This guide provides the foundation for all Python projects

## Related Guidelines

For framework-specific Python patterns, see:

- **[Python + FastAPI](../Python%20+%20FastAPI/)** - FastAPI and async API patterns
- **[Root README](../README.md)** - Overview of all coding rules

## Contributing

When updating these rules:

1. Keep guidelines clear and actionable
2. Include examples where helpful (❌ BAD vs ✅ GOOD patterns)
3. Update this README if adding new rule files
4. Ensure consistency with other Python-related rules
5. Test guidelines work well with AI assistants

## Notes

- These rules are designed for general Python projects (3.10+)
- Rules marked with `alwaysApply: true` are enforced automatically
- The guide emphasizes type safety and readability above all else
- Never suppress errors - always fix the root cause
- When used with framework-specific rules, this guide provides the Python foundation

## Remember

- **Python is readable by design** - write code that reads like prose
- **Explicit is better than implicit** - be clear about your intentions
- **Type hints are documentation** - they help both humans and tools
- **Errors should never pass silently** - always handle exceptions properly
- **Consistency is key** - follow these patterns uniformly across the codebase













