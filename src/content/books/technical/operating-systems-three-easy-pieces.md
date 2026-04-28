---
title: "Operating Systems: Three Easy Pieces"
author: "Remzi H. Arpaci-Dusseau, Andrea C. Arpaci-Dusseau"
year: 2018
status: read
rating: 5
cover: "/images/covers/operatin-systems-tep.jpg"
tags: ["os", "systems", "cs"]
category: technical
description: "The best freely available OS textbook. Virtualization, concurrency, persistence — explained with clarity."
relatedPosts: []
---

This is the book I wish I had found earlier. It's available for free online, which somehow makes people underestimate it. Don't.

The three-part structure — virtualization, concurrency, persistence — is the right way to think about an OS. Each section builds on the last in a way that feels natural rather than forced. The authors have a conversational writing style that makes dense material approachable without dumbing it down.

The concurrency chapters are where the book really shines. Locks, condition variables, semaphores — each concept is introduced with a concrete problem, then the solution, then the subtleties of the solution. By the time you finish those chapters, you understand why concurrency is hard in a way that just reading about race conditions never gives you.

I'm still working through the persistence section. File systems are harder than they look, and this book makes sure you feel that difficulty properly before explaining how it's solved.

---

**What I took away so far:** A much clearer picture of what the kernel actually does when your code runs. The physical reality of scheduling, memory management, and I/O is no longer abstract to me.
