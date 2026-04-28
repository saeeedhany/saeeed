export function initBooksFilter() {
  const tabs      = document.querySelectorAll<HTMLButtonElement>('.books-tab');
  const panels    = document.querySelectorAll<HTMLElement>('.books-cat-panel');
  const topicRows = document.querySelectorAll<HTMLElement>('.books-topic-row');
  const search    = document.getElementById('books-search') as HTMLInputElement | null;

  if (tabs.length === 0) return;

  let activeCat   = tabs[0]?.dataset.cat ?? '';
  let activeTopic = 'all';
  let searchQuery = '';

  function applyFilters() {
    panels.forEach(panel => {
      const isActiveCat = panel.dataset.cat === activeCat;
      panel.classList.toggle('active', isActiveCat);
      if (!isActiveCat) return;

      const cards = panel.querySelectorAll<HTMLElement>('.book-card');
      cards.forEach(card => {
        const tags    = (card.dataset.tags ?? '').split(',');
        const title   = card.dataset.title  ?? '';
        const author  = card.dataset.author ?? '';

        const topicOk  = activeTopic === 'all' || tags.includes(activeTopic);
        const searchOk = searchQuery === '' ||
          title.includes(searchQuery) || author.includes(searchQuery);

        card.classList.toggle('hidden', !topicOk || !searchOk);
      });

      // Hide empty sections
      panel.querySelectorAll<HTMLElement>('.books-section').forEach(section => {
        const visible = section.querySelectorAll('.book-card:not(.hidden)').length;
        section.style.display = visible === 0 ? 'none' : '';
      });
    });
  }

  // Category tab click
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeCat   = tab.dataset.cat ?? '';
      activeTopic = 'all';

      // Switch topic row
      topicRows.forEach(row => {
        const isActive = row.dataset.cat === activeCat;
        row.classList.toggle('active', isActive);
        if (isActive) {
          row.querySelectorAll<HTMLButtonElement>('.tag-btn').forEach((b, i) => {
            b.classList.toggle('active', i === 0);
          });
        }
      });

      applyFilters();
    });
  });

  // Topic button click (delegated per row)
  topicRows.forEach(row => {
    row.querySelectorAll<HTMLButtonElement>('.tag-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        row.querySelectorAll('.tag-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeTopic = btn.dataset.topic ?? 'all';
        applyFilters();
      });
    });
  });

  // Search
  search?.addEventListener('input', () => {
    searchQuery = search.value.toLowerCase().trim();
    applyFilters();
  });
}
