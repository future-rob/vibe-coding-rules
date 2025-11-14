# Cursor Rules for Solidity + Foundry Projects

This repository contains Cursor AI coding rules and guidelines for Solidity smart contract development using Foundry. These rules help maintain consistency, code quality, security, and best practices across the codebase when working with AI assistants in Cursor.

## What are Cursor Rules?

Cursor rules are markdown files (`.mdc` format) that provide context and guidelines to AI coding assistants. They help ensure that AI-generated code follows your project's specific patterns, conventions, and architectural decisions.

## Overview of Rules

### 📋 Core Framework & Language (`core-framework-&-language.mdc`)
Defines the foundational technology stack:
- **Language:** Solidity 0.8.20+
- **Framework:** Foundry (Forge, Cast, Anvil, Chisel)
- **Testing:** Foundry Test Suite
- **Deployment:** Foundry Scripts
- **Version Management:** Solidity version pragmas

### 🔒 Security Guidelines (`security-guidelines.mdc`)
**CRITICAL** - Security best practices for smart contracts:
- **Common Vulnerabilities:** Reentrancy, overflow/underflow, access control
- **Best Practices:** Checks-Effects-Interactions pattern, access control, input validation
- **Audit Considerations:** Security patterns and anti-patterns
- **Gas Optimization:** While maintaining security
- **Upgradeability:** Proxy patterns and upgrade safety

### 🎯 Code Style Guidelines (`code-style-guidelines.mdc`)
Comprehensive Solidity code style guide:
- **Formatting:** Solidity Style Guide compliance
- **Naming:** camelCase for variables/functions, PascalCase for contracts
- **Spacing:** 4-space indentation, consistent spacing rules
- **Ordering:** Contract elements in standard order
- **Comments:** NatSpec documentation standards
- **NEVER abbreviate variables** - Always use full, descriptive names

### 🏗️ Key Architectural Patterns (`key-architecture-patterns.mdc`)
Core architectural patterns for smart contracts:
- **Contract Organization:** Separation of concerns, interfaces
- **Access Control:** Ownable, Role-based access control
- **Upgradeability:** Proxy patterns (UUPS, Transparent)
- **Factory Patterns:** Contract factories and clones
- **Library Patterns:** Reusable libraries
- **Event Patterns:** Comprehensive event emission

### 💬 Commenting Guidelines (`commenting-guidelines.mdc`)
NatSpec documentation standards:
- **Format:** NatSpec (`///` and `/** */`) for all public/external functions
- **Tags:** `@title`, `@author`, `@notice`, `@dev`, `@param`, `@return`, `@custom:`
- **Focus:** Explain the "why" and "intent", not just the "what"
- **When to Comment:** Public/external functions, complex logic, security considerations

### 📝 Logging Guidelines (`logging-guidelines.mdc`)
**⚠️ IMPORTANT: Use events for logging, not console.log in production.**

Comprehensive event logging standards:
- **Events:** Emit events for all important state changes
- **Event Design:** Indexed parameters, clear naming
- **Gas Considerations:** Event gas costs
- **Best Practices:** When to emit events, what data to include

### ✅ No Hiding (`no-hiding.mdc`)
**Critical Rule:** Never hide compiler warnings, linter errors, or security issues. All must be resolved.

### 🧪 Testing (`testing.mdc`)
Comprehensive testing philosophy with Foundry:
- **Framework:** Foundry Test Suite (Forge)
- **Coverage:** Aim for 100% coverage of critical paths
- **Test Types:** Unit tests, integration tests, fuzz tests, invariant tests
- **Test Organization:** Tests mirror contract structure
- **Forking:** Mainnet fork testing for integration
- **Gas Snapshots:** Track gas usage

### 🚨 Error Handling Patterns (`error-handling-patterns.mdc`)
Comprehensive error management:
- **Custom Errors:** Use custom errors (gas efficient)
- **Require Statements:** When to use require vs custom errors
- **Revert Conditions:** Clear error messages
- **Error Propagation:** Handling errors in complex flows
- **Gas Optimization:** Custom errors vs require strings

### ⚡ Performance Guidelines (`performance-guidelines.mdc`)
Gas optimization and performance:
- **Gas Optimization:** Storage vs memory, loop optimization
- **Storage Patterns:** Packing structs, storage layout
- **Function Optimization:** Minimize external calls, batch operations
- **Compiler Optimization:** Solidity compiler settings
- **Gas Profiling:** Using Foundry's gas reporting

### 🔀 Git Workflow (`git-workflow.mdc`)
Version control standards:
- **Commit Format:** Conventional Commits
- **Branch Naming:** Consistent conventions
- **Pull Requests:** PR template and process
- **Pre-commit Hooks:** Solidity linters, formatters

### 👀 Code Review (`code-review.mdc`)
Code review checklist:
- **Security:** Check for common vulnerabilities
- **Gas Efficiency:** Review gas usage
- **Tests:** Verify test coverage and quality
- **Documentation:** Check NatSpec completeness
- **Style:** Follows all guidelines

### 📦 Dependency Management (`dependency-management.mdc`)
Dependency handling:
- **Foundry:** Using `foundry.toml` for configuration
- **Git Submodules:** Managing dependencies via git
- **Version Pinning:** Specific commit hashes
- **Security:** Regular dependency audits

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
   @security-guidelines.mdc Please review this function for security issues
   ```

### File Structure

```
vibe-coding-rules/
├── README.md (this file)
└── solidity + foundry/
    ├── code-review.mdc
    ├── code-style-guidelines.mdc
    ├── commenting-guidelines.mdc
    ├── conflict-resolution.mdc
    ├── core-framework-&-language.mdc
    ├── dependency-management.mdc
    ├── error-handling-patterns.mdc
    ├── git-workflow.mdc
    ├── key-architecture-patterns.mdc
    ├── logging-guidelines.mdc
    ├── no-hiding.mdc
    ├── performance-guidelines.mdc
    └── security-guidelines.mdc
    └── testing.mdc
```

## Quick Reference

### When Writing Contracts
- ✅ Follow Solidity Style Guide
- ✅ **NEVER abbreviate variables** - Always use descriptive names
- ✅ Use NatSpec comments for all public/external functions
- ✅ Never hide compiler warnings or linter errors
- ✅ Emit events for all important state changes
- ✅ Follow security best practices (checks-effects-interactions)

### When Writing Tests
- ✅ Write comprehensive Foundry tests
- ✅ Use fuzz testing for input validation
- ✅ Test edge cases and error conditions
- ✅ Use gas snapshots to track optimization
- ✅ Fork mainnet for integration testing when needed

### When Handling Errors
- ✅ Use custom errors (gas efficient)
- ✅ Provide clear error messages
- ✅ Validate all inputs
- ✅ Use require statements appropriately

### When Optimizing Gas
- ✅ Profile before optimizing
- ✅ Use storage packing where possible
- ✅ Minimize external calls
- ✅ Use events instead of storage for logs
- ✅ Consider batch operations

### When Managing Security
- ✅ Check for reentrancy vulnerabilities
- ✅ Implement proper access control
- ✅ Validate all inputs
- ✅ Use checks-effects-interactions pattern
- ✅ Consider upgradeability patterns carefully

### When Committing Code
- ✅ Use Conventional Commits format
- ✅ Run pre-commit hooks (linters, formatters)
- ✅ Write clear commit messages
- ✅ Make atomic commits
- ✅ Never commit private keys or secrets

### When Reviewing Code
- ✅ Check for security vulnerabilities
- ✅ Verify gas efficiency
- ✅ Ensure test coverage
- ✅ Review NatSpec documentation
- ✅ Verify adherence to all guidelines

## Contributing

When updating these rules:
1. Keep guidelines clear and actionable
2. Include examples where helpful
3. Update this README if adding new rule files
4. Ensure consistency across all rule files

## Notes

- These rules are specifically tailored for Solidity + Foundry projects
- Rules marked with `alwaysApply: true` are enforced automatically
- Security guidelines are critical - always review security implications
- The "no-hiding" rule is critical - all compiler warnings and linter errors must be resolved
- When rules conflict, refer to `conflict-resolution.mdc` for guidance
- Gas optimization is important but never at the expense of security

