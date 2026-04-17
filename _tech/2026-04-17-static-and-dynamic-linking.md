---
layout: post
title: "From Static to Dynamic: Understanding How Programs Really Link"
date: 2026-04-11
category: systems
tags: [linking, static, dynamic, linux, elf]
featured: false
pinned: false
read_time: 9
excerpt: "Understanding how your program becomes executable - how code connects to libraries, and what really happens between compilation and execution."
---
# Static vs Dynamic Linking — Deep Dive

## 1. Introduction

When you compile a program, the resulting executable is not just your code. It depends on external libraries (like libc) that provide implementations for many functions.

The process of connecting your code with these external implementations is called:

> **Linking**

There are two main strategies:

* Static Linking
* Dynamic Linking

---

## 2. The Core Problem

Consider this simple program:

```c
#include <stdio.h>

int main() {
    printf("Hello\n");
}
```

Your code calls `printf`, but:

* `printf` is not defined in your source file
* It exists inside a library (like libc)

So the system must:

> Resolve where `printf` actually lives

---

## 3. What is Linking?

Linking is the process of:

1. Resolving symbols (like `printf`)
2. Connecting function calls to their implementations
3. Producing a final executable

---

## 4. Static Linking

### 4.1 Concept

Static linking means:

> All required library code is copied into the final executable

---

### 4.2 Memory View

```
Executable:
-------------------------
| Your Code             |
| printf implementation |
| malloc implementation |
| ...                   |
-------------------------
```

---

### 4.3 Build Example

```bash
gcc -static main.c -o app
```

---

### 4.4 Characteristics

* Self-contained executable
* No runtime dependencies
* Larger file size

---

### 4.5 Advantages

* Portability (runs anywhere)
* No missing library issues
* Predictable behavior

---

### 4.6 Disadvantages

* Large binary size
* Memory duplication across programs
* No automatic updates

---

## 5. Dynamic Linking

### 5.1 Concept

Dynamic linking means:

> The executable contains references to libraries, not the actual code

---

### 5.2 Memory View

```
Executable:
-------------------------
| Your Code             |
| Reference to printf   |
-------------------------

At Runtime:
-------------------------
| libc.so loaded        |
| shared across apps    |
-------------------------
```

---

### 5.3 Build Example

```bash
gcc main.c -o app
```

(Default behavior)

---

### 5.4 Runtime Flow

1. Program starts
2. Dynamic loader is invoked
3. Required shared libraries are loaded
4. Symbols are resolved

---

### 5.5 Advantages

* Smaller binaries
* Shared memory usage
* Easy library updates

---

### 5.6 Disadvantages

* Runtime dependency on libraries
* Version compatibility issues
* Slight startup overhead

---

## 6. Symbol Resolution

Symbols are function or variable names.

Example:

```
printf → address in memory
```

---

### Static Linking

* Resolved at compile time
* Direct addresses embedded

---

### Dynamic Linking

* Resolved at runtime
* Uses indirection (GOT/PLT)

---

## 7. Lazy vs Eager Binding

### Eager Binding

* All symbols resolved at startup

### Lazy Binding

* Symbols resolved only when used

---

## 8. Tools

### Check dependencies

```bash
ldd ./app
```

### Inspect symbols

```bash
nm ./app
```

---

## 9. Performance Considerations

### Static

* Faster startup
* Larger memory footprint

### Dynamic

* Slightly slower startup
* Better memory efficiency

---

## 10. Comparison Table

| Feature      | Static Linking | Dynamic Linking |
| ------------ | -------------- | --------------- |
| Size         | Large          | Small           |
| Dependencies | None           | Required        |
| Memory       | Not shared     | Shared          |
| Updates      | Manual         | Automatic       |
| Startup      | Fast           | Slightly slower |

---

## 11. When to Use

### Static Linking

* Embedded systems
* Single-binary distribution
* Minimal environments

---

### Dynamic Linking

* General-purpose systems
* Large applications
* Systems requiring updates

---

## 12. Mental Model

* Static → "carry everything with you"
* Dynamic → "load what you need when you need it"

---

## 13. Final Insight

Linking is what transforms code into a runnable program.

Understanding it reveals:

* How binaries are structured
* How programs interact with the system
* Why dependencies matter

---

End of Document

