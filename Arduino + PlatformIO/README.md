# Cursor Rules for Arduino & Microcontroller Projects with PlatformIO

This repository contains Cursor AI coding rules and guidelines for Arduino and microcontroller projects using PlatformIO. These rules help maintain consistency, code quality, and best practices across embedded systems development when working with AI assistants in Cursor.

## What are Cursor Rules?

Cursor rules are markdown files (`.mdc` format) that provide context and guidelines to AI coding assistants. They help ensure that AI-generated code follows your project's specific patterns, conventions, and hardware constraints for embedded systems development.

## Overview of Rules

### 📋 Core Framework & Language (`core-framework-&-language.mdc`)
Defines the foundational technology stack:
- **Framework:** Arduino Framework with PlatformIO
- **Language:** C++ (Arduino variant)
- **Build System:** PlatformIO Core
- **Supported Platforms:** AVR, ESP32, ESP8266, STM32, RP2040, and more

### 🔧 Hardware Abstraction Patterns (`hardware-abstraction-patterns.mdc`)
Hardware abstraction layer (HAL) patterns:
- **Pin Management:** Compile-time pin assignments
- **Peripheral Abstraction:** SPI, I2C, UART interfaces
- **Board Configuration:** Platform-specific configurations
- **Driver Architecture:** Modular sensor/actuator drivers
- **Hardware Traits:** Template-based hardware capabilities

### 🏗️ Key Architectural Patterns (`key-architecture-patterns.mdc`)
Core architectural patterns for embedded systems:
- **State Machines:** Finite state machine implementations
- **Event-Driven Architecture:** Non-blocking event handling
- **Task Scheduling:** Cooperative multitasking patterns
- **Module System:** Component-based architecture
- **Registry Pattern:** Dynamic peripheral registration

### 💾 Memory Management Patterns (`memory-management-patterns.mdc`)
Memory optimization and management strategies:
- **Static Allocation:** Prefer compile-time memory allocation
- **Memory Pools:** Fixed-size memory block allocation
- **String Handling:** PROGMEM and F() macro usage
- **Buffer Management:** Ring buffers and DMA patterns
- **Stack Analysis:** Stack usage monitoring
- **Heap Avoidance:** Minimize dynamic allocation

### ⚡ Interrupt Handling & Real-Time Patterns (`interrupt-handling-patterns.mdc`)
Interrupt service routines and real-time constraints:
- **ISR Design:** Minimal ISR execution time
- **Volatile Variables:** Proper volatile usage
- **Atomic Operations:** Critical section management
- **Timer Management:** Hardware timer abstraction
- **Priority Handling:** Interrupt priority schemes
- **Debouncing:** Hardware and software debouncing

### 💬 Commenting Guidelines (`commenting-guidelines.mdc`)
Comprehensive documentation standards:
- **Format:** Doxygen-style comments for functions and classes
- **Hardware Comments:** Document pin connections and hardware assumptions
- **Timing Comments:** Document timing constraints and delays
- **Memory Comments:** Document memory usage and constraints
- **Safety Comments:** Highlight safety-critical sections

### 📝 Logging Guidelines (`logging-guidelines.mdc`)
**⚠️ IMPORTANT: Only add logs when asked for. By default, do NOT add logs.**

Embedded logging standards:
- **Serial Output:** Conditional compilation with DEBUG flags
- **Log Levels:** ERROR, WARN, INFO, DEBUG with minimal overhead
- **Memory Efficiency:** Use PROGMEM for log strings
- **Production Logs:** Minimal or no logging in production
- **Debug Modes:** Rich debugging with compile-time switches

### 🎯 Code Style Guidelines (`code-style-guidelines.mdc`)
Embedded C++ coding standards:
- **Naming:** camelCase for variables, PascalCase for classes
- **Constants:** Use constexpr and #define appropriately
- **Indentation:** 2 spaces, no tabs
- **Braces:** K&R style for space efficiency
- **Line Length:** 100 characters maximum
- **File Organization:** Header guards, include order

### ✅ No Hiding (`no-hiding.mdc`)
**Critical Rule:** Never hide compiler warnings. All warnings must be treated as errors.

### 🧪 Testing & Debugging (`testing-debugging.mdc`)
Embedded testing strategies:
- **Unit Testing:** PlatformIO native tests
- **Hardware-in-Loop:** Serial-based test frameworks
- **Mocking:** Hardware abstraction layer mocking
- **Debugging Tools:** Serial debugging, logic analyzers
- **Simulation:** QEMU and Wokwi integration
- **Assertions:** Compile-time and runtime assertions

### 🚨 Error Handling Patterns (`error-handling-patterns.mdc`)
Embedded error management:
- **Error Codes:** Enum-based error reporting
- **Watchdog Timer:** Automatic recovery mechanisms
- **Safe States:** Fail-safe default behaviors
- **Error Propagation:** Result types without exceptions
- **Diagnostic LEDs:** Visual error indication
- **Recovery Strategies:** Graceful degradation

### ⚡ Performance Guidelines (`performance-guidelines.mdc`)
Microcontroller optimization techniques:
- **Clock Management:** Dynamic frequency scaling
- **Code Size:** Optimization for flash usage
- **Execution Speed:** Time-critical path optimization
- **Compiler Flags:** Platform-specific optimizations
- **Inline Functions:** Strategic inlining
- **Loop Optimization:** Unrolling and optimization

### 📡 Communication Patterns (`communication-patterns.mdc`)
Protocol implementation patterns:
- **Serial Protocols:** UART command parsers
- **I2C/SPI:** Master/slave implementations
- **Network Protocols:** MQTT, HTTP clients for IoT
- **Protocol Buffers:** Efficient data serialization
- **Message Queuing:** Inter-module communication
- **Error Detection:** CRC and checksum implementation

### 🔀 Git Workflow (`git-workflow.mdc`)
Version control for embedded projects:
- **Commit Format:** Conventional Commits
- **Binary Files:** Handling compiled outputs
- **Library Management:** PlatformIO lib dependencies
- **Board Configurations:** Environment branching
- **CI/CD:** Automated builds and tests

### 👀 Code Review (`code-review.mdc`)
Embedded code review checklist:
- **Hardware Safety:** Pin conflicts, voltage levels
- **Timing Correctness:** Interrupt safety, delays
- **Memory Usage:** Stack/heap analysis
- **Power Consumption:** Sleep modes, optimization
- **Error Handling:** Watchdog, recovery paths

### 🔋 Power Management (`power-management.mdc`)
Low-power design patterns:
- **Sleep Modes:** Deep sleep, light sleep strategies
- **Clock Gating:** Peripheral power management
- **Wake Sources:** Interrupt-based waking
- **Power Profiling:** Current measurement techniques
- **Battery Management:** Voltage monitoring, protection
- **Energy Harvesting:** Solar, kinetic integration

### 📏 Sensor Integration Patterns (`sensor-integration-patterns.mdc`)
Sensor interfacing best practices:
- **Calibration:** Runtime and compile-time calibration
- **Filtering:** Digital signal processing
- **Sampling Strategies:** Timer-based, interrupt-driven
- **Data Fusion:** Multi-sensor integration
- **Error Detection:** Sensor fault detection
- **Power Management:** Sensor sleep modes

### 🛡️ Safety & Reliability (`safety-reliability.mdc`)
Safety-critical design patterns:
- **Redundancy:** Dual-channel architectures
- **Self-Testing:** Built-in self-test (BIST)
- **Fail-Safe States:** Safe shutdown procedures
- **Input Validation:** Bounds checking, sanity checks
- **Critical Sections:** Proper protection mechanisms
- **Certification:** IEC 61508, ISO 26262 considerations

### ⚖️ Conflict Resolution (`conflict-resolution.mdc`)
Guidance for resolving rule conflicts:
- **Hardware Constraints:** When hardware limits override guidelines
- **Performance vs Safety:** Balancing trade-offs
- **Memory vs Features:** Resource allocation decisions
- **Real-Time Constraints:** Priority resolution

### 🏭 Build Configuration (`build-configuration.mdc`)
PlatformIO configuration best practices:
- **platformio.ini:** Environment configuration
- **Build Flags:** Optimization and feature flags
- **Library Dependencies:** Version pinning
- **Custom Scripts:** Pre/post build automation
- **Multi-Environment:** Target board management

### 🔌 Pin Mapping & Configuration (`pin-mapping-configuration.mdc`)
Hardware pin management:
- **Pin Definitions:** Centralized pin configuration
- **Compile-Time Validation:** Pin conflict detection
- **Board Variants:** Multi-board support
- **Pin Functions:** Alternate function mapping
- **Documentation:** Wiring diagrams in code

## How to Use These Rules

### In Cursor IDE

1. **Automatic Application:** Files with `alwaysApply: true` in their frontmatter are automatically applied to all AI interactions.

2. **Context-Aware Application:** Files with `globs` patterns are applied when working with matching file types or directories.

3. **Manual Reference:** You can reference specific rules in your prompts:
   ```
   @memory-management-patterns.mdc How should I implement a ring buffer for serial data?
   ```

### File Structure

```
vibe-coding-rules/
├── README.md (this file)
└── Arduino + PlatformIO/
    ├── build-configuration.mdc
    ├── code-review.mdc
    ├── code-style-guidelines.mdc
    ├── commenting-guidelines.mdc
    ├── communication-patterns.mdc
    ├── conflict-resolution.mdc
    ├── core-framework-&-language.mdc
    ├── error-handling-patterns.mdc
    ├── git-workflow.mdc
    ├── hardware-abstraction-patterns.mdc
    ├── interrupt-handling-patterns.mdc
    ├── key-architecture-patterns.mdc
    ├── logging-guidelines.mdc
    ├── memory-management-patterns.mdc
    ├── no-hiding.mdc
    ├── performance-guidelines.mdc
    ├── pin-mapping-configuration.mdc
    ├── power-management.mdc
    ├── safety-reliability.mdc
    ├── sensor-integration-patterns.mdc
    └── testing-debugging.mdc
```

## Quick Reference

### When Writing Embedded Code
- ✅ Use static memory allocation whenever possible
- ✅ **NEVER use String class** - Use char arrays with bounds checking
- ✅ Keep ISRs minimal - just set flags and return
- ✅ Document all hardware assumptions and connections
- ✅ Never hide compiler warnings - treat as errors
- ✅ Use appropriate logging (only when requested)
- ✅ Follow architectural patterns (State Machines, Event-Driven)

### When Configuring Hardware
- ✅ Define all pins in a central configuration file
- ✅ Use compile-time constants for pin assignments
- ✅ Document voltage levels and current requirements
- ✅ Implement proper pull-up/pull-down configurations
- ✅ Validate pin functions don't conflict
- ✅ Use hardware abstraction layers for portability

### When Managing Memory
- ✅ Prefer stack allocation over heap
- ✅ Use PROGMEM for constant strings and data
- ✅ Implement bounds checking on all arrays
- ✅ Monitor stack usage in deep call chains
- ✅ Use memory pools for dynamic allocation
- ✅ Avoid memory fragmentation

### When Handling Interrupts
- ✅ Keep ISRs under 10 microseconds when possible
- ✅ Use volatile for ISR-shared variables
- ✅ Implement proper critical sections
- ✅ Avoid function calls in ISRs
- ✅ Use atomic operations for flag setting
- ✅ Document interrupt priorities

### When Optimizing Performance
- ✅ Profile before optimizing
- ✅ Use compiler optimization flags appropriately
- ✅ Minimize float operations on 8-bit MCUs
- ✅ Use bit manipulation for flags
- ✅ Unroll critical loops when needed
- ✅ Consider assembly for ultra-critical sections

### When Implementing Communication
- ✅ Use DMA for high-speed transfers when available
- ✅ Implement timeout mechanisms
- ✅ Add CRC/checksum verification
- ✅ Use ring buffers for serial data
- ✅ Handle partial message reception
- ✅ Document protocol specifications

### When Managing Power
- ✅ Use sleep modes aggressively
- ✅ Disable unused peripherals
- ✅ Implement wake-on-interrupt
- ✅ Monitor battery voltage
- ✅ Use power-efficient algorithms
- ✅ Document power consumption

### When Testing
- ✅ Write unit tests for business logic
- ✅ Use hardware abstraction for testability
- ✅ Implement serial-based test commands
- ✅ Add diagnostic modes
- ✅ Use static analysis tools
- ✅ Test edge cases and error conditions

### When Reviewing Code
- ✅ Check for blocking operations
- ✅ Verify interrupt safety
- ✅ Analyze memory usage
- ✅ Review power consumption
- ✅ Validate timing constraints
- ✅ Ensure error recovery paths

### When Ensuring Safety
- ✅ Implement watchdog timers
- ✅ Add input validation
- ✅ Define safe default states
- ✅ Test failure scenarios
- ✅ Document safety assumptions
- ✅ Consider certification requirements

## Contributing

When updating these rules:
1. Consider hardware constraints and limitations
2. Include real-world examples from embedded systems
3. Update this README if adding new rule files
4. Ensure consistency with embedded best practices
5. Test guidelines on multiple microcontroller platforms

## Notes

- These rules are specifically tailored for Arduino-compatible microcontrollers using PlatformIO
- Rules marked with `alwaysApply: true` are enforced automatically
- The logging guidelines emphasize minimal logging by default - embedded systems have limited resources
- The "no-hiding" rule is critical - all compiler warnings must be resolved
- When rules conflict, hardware constraints take precedence
- Real-time constraints may override general programming practices
- Safety-critical applications may require additional guidelines beyond these
