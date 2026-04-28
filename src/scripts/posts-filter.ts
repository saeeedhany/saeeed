// src/scripts/posts-filter.ts
// Lang tabs + tag filtering for /posts. Re-runs after View Transitions.

export function initPostsFilter() {
  const langBtns  = document.querySelectorAll<HTMLButtonElement>('.lang-btn');
  const sectionEn = document.getElementById('section-en');
  const sectionAr = document.getElementById('section-ar');

  if (!sectionEn || !sectionAr) return; // not on the posts page

  // ── Language switcher ──────────────────────────────────────────────────────
  langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      langBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const lang = btn.dataset.lang;
      sectionEn.style.display = lang === 'en' ? '' : 'none';
      sectionAr.style.display = lang === 'ar' ? '' : 'none';
    });
  });

  // ── English tag filter ─────────────────────────────────────────────────────
  const enTagBtns = document.querySelectorAll<HTMLButtonElement>('#en-tag-filter .tag-btn');
  const enItems   = document.querySelectorAll<HTMLElement>('#en-posts .post-item');
  const enEmpty   = document.getElementById('en-empty');

  enTagBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      enTagBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const tag = btn.dataset.tag ?? 'all';
      let visible = 0;
      enItems.forEach(item => {
        const show = tag === 'all' || (item.dataset.tags ?? '').split(',').includes(tag);
        item.style.display = show ? '' : 'none';
        if (show) visible++;
      });
      if (enEmpty) enEmpty.style.display = visible === 0 ? 'block' : 'none';
    });
  });

  // ── Arabic tag filter ──────────────────────────────────────────────────────
  const arTagBtns = document.querySelectorAll<HTMLButtonElement>('#ar-tag-filter .tag-btn-ar');
  const arItems   = document.querySelectorAll<HTMLElement>('#ar-posts .post-item');
  const arEmpty   = document.getElementById('ar-empty');

  arTagBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      arTagBtns.forEach(b => b.classList.remove('active-ar'));
      btn.classList.add('active-ar');
      const tag = btn.dataset.tag ?? 'all';
      let visible = 0;
      arItems.forEach(item => {
        const show = tag === 'all' || (item.dataset.tags ?? '').split(',').includes(tag);
        item.style.display = show ? '' : 'none';
        if (show) visible++;
      });
      if (arEmpty) arEmpty.style.display = visible === 0 ? 'block' : 'none';
    });
  });

  // ── Restore ?lang= query param ─────────────────────────────────────────────
  const params = new URLSearchParams(window.location.search);
  if (params.get('lang') === 'ar') {
    document.querySelector<HTMLButtonElement>('[data-lang="ar"]')?.click();
  }
}
