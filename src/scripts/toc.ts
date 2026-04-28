// src/scripts/toc.ts
// Builds the table of contents from article headings.
// Must re-run after every View Transition (new article content).
// Previous IntersectionObserver is disconnected before rebuilding.

let activeObserver: IntersectionObserver | null = null;

export function buildTOC() {
  // Disconnect any observer from a previous page
  activeObserver?.disconnect();
  activeObserver = null;

  const article = document.querySelector('article');
  const tocList = document.getElementById('toc-list');
  const toc     = document.getElementById('toc');

  if (!article || !tocList) return;

  // Clear stale items from previous page
  tocList.innerHTML = '';

  const headings = Array.from(article.querySelectorAll('h2, h3'));

  if (headings.length === 0) {
    toc?.remove();
    return;
  }

  headings.forEach((heading, i) => {
    if (!heading.id) heading.id = `h-${i}`;

    const li = document.createElement('li');
    li.className = `toc-item${heading.tagName === 'H3' ? ' toc-item--h3' : ''}`;

    const a = document.createElement('a');
    a.href        = `#${heading.id}`;
    a.textContent = heading.textContent ?? '';
    li.appendChild(a);
    tocList.appendChild(li);
  });

  // Highlight active heading on scroll
  activeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const link = tocList.querySelector<HTMLAnchorElement>(`a[href="#${entry.target.id}"]`);
      if (entry.isIntersecting) {
        tocList.querySelectorAll('a').forEach(a => a.classList.remove('active'));
        link?.classList.add('active');
      }
    });
  }, { rootMargin: '-20% 0px -70% 0px' });

  headings.forEach(h => activeObserver!.observe(h));
}
