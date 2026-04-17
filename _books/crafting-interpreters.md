---
layout: book
title: crafting-interpreters
book_title: "Crafting Interpreters"
book_author: "Robert Nystrom"
description: "A complete, step-by-step guide to building a fully-featured scripting language from scratch — covering lexing, parsing, bytecode compilation, and a virtual machine."
category: "Compilers & PLT"
tags: [compilers, interpreters, c, java, low-level]
rating: 5
year_read: 2025
cover: ./../assets/images/books/Crafting-Interpreters.jpg
date: 2025-10-01
---

## Why I read it

This book was on my list for a long time. After building small toy parsers, I wanted to go all the way — understand what actually happens between source text and execution.

## Structure

The book is split into two parts:

1. **jlox** — a tree-walk interpreter written in Java, focused on understanding the concepts clearly
2. **clox** — a bytecode VM written in C, optimized and closer to how real runtimes work

Each chapter builds something real. You're never just reading theory.

## Key ideas I kept

- **Scanning** is simpler than it looks once you think of it as a state machine
- **Recursive descent parsing** is elegant and readable — matching grammar rules to functions
- **The environment model** for variable scoping made closures finally click for me
- **Bytecode compilation** makes the jump from tree-walking feel natural, not magical

## What it changed

After this book I started understanding C code differently. The clox VM chapters — managing memory manually, writing a mark-and-sweep GC from scratch — demystified a lot of low-level C patterns I'd seen but never fully understood.

## Notes & Chapters

- [Chapter 4 — Scanning](./chapters/scanning)
- [Chapter 6 — Parsing Expressions](./chapters/parsing)
- [Chapter 10 — Functions](./chapters/functions)
- [Chapter 19 — Bytecode Virtual Machine](./chapters/bytecode-vm)
- [Chapter 26 — Garbage Collection](./chapters/gc)

*(Add your chapter notes as separate posts and link them here)*
