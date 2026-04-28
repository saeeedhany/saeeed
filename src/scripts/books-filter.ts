// src/scripts/books-filter.ts
// Tag filtering for /books. Re-runs after View Transitions.

export function initBooksFilter() {
  const tagBtns  = document.querySelectorAll<HTMLButtonElement>('#books-tag-filter .tag-btn');
  const bookCards = document.querySelectorAll<HTMLElement>('.book-card');

  if (tagBtns.length === 0) return; // not on the books page

  tagBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tagBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const tag = btn.dataset.tag ?? 'all';

      bookCards.forEach(card => {
        const cardTags = (card.dataset.tags ?? '').split(',');
        const show = tag === 'all' || cardTags.includes(tag);
        card.classList.toggle('hidden', !show);
      });

      // Hide sections with no visible cards
      document.querySelectorAll<HTMLElement>('.books-section').forEach(section => {
        const visible = section.querySelectorAll('.book-card:not(.hidden)').length;
        section.style.display = visible === 0 ? 'none' : '';
      });
    });
  });
}
