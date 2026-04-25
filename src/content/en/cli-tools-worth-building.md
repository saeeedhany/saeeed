---
title: "CLI tools worth building yourself"
date: 2025-01-08
lang: en
tags: [CLI, tools, systems]
description: "Some tools I've built for myself and why building them beats installing them."
---

## The argument for rolling your own

Most CLI tools you can find a good existing version of. But building them yourself teaches you something that reading docs never does.

## Tools worth the effort

### A file watcher

Something that watches a directory and runs a command when files change. It's a great introduction to `inotify` on Linux or `kqueue` on macOS.

### A tiny HTTP server

Static file serving in a hundred lines of C or Go. You'll understand exactly what happens between a browser request and a response.

### A note-taking tool

Mine is basically a wrapper around a plain text file. The interesting part is building a minimal query system.

## The rule

If you use a tool daily and you don't understand it, build a version of it. You don't have to use the version you build.
