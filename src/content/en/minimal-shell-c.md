---
title: "Building a minimal shell in C"
date: 2024-11-15
lang: en
tags: [systems, C, CLI]
description: "Walking through the core loop of a minimal Unix shell — parsing, forking, and exec."
---

## Why write a shell?

Writing a shell from scratch is one of the clearest ways to understand how Unix works underneath. You get to touch `fork`, `exec`, `waitpid`, and signal handling — all in one small project.

## The core loop

Every shell is just this:

```c
while (1) {
    char *line = read_line();
    char **args = parse_line(line);
    execute(args);
    free(line);
    free(args);
}
```

Read, parse, execute. That's it.

## Forking

The tricky part is that `exec` replaces the current process image. So you need to fork first, run the command in the child, and wait in the parent.

```c
pid_t pid = fork();
if (pid == 0) {
    execvp(args[0], args);
    perror("exec failed");
    exit(1);
} else {
    waitpid(pid, NULL, 0);
}
```

## Signal handling

A minimal shell should at least handle `SIGINT` (Ctrl+C) gracefully — ignoring it in the shell process but letting child processes receive it normally.

```c
signal(SIGINT, SIG_IGN);
// After fork, in child:
signal(SIGINT, SIG_DFL);
```

## What's next

From here you can add: pipes, redirections, builtins like `cd` and `exit`, job control, and history. Each feature is a well-scoped problem.
