export function initTheme() {
  const root = document.documentElement;

  function getTheme() {
    return root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  }

  function applyTheme(t: 'light' | 'dark') {
    t === 'light'
      ? root.setAttribute('data-theme', 'light')
      : root.removeAttribute('data-theme');
    localStorage.setItem('theme', t);
    const icon = document.getElementById('theme-icon');
    if (icon) icon.textContent = t === 'light' ? 'dark' : 'light';
    const label = document.getElementById('theme-label-mobile');
    if (label) label.textContent = t === 'light' ? 'dark mode' : 'light mode';
  }

  document.getElementById('theme-toggle')
    ?.addEventListener('click', () => applyTheme(getTheme() === 'dark' ? 'light' : 'dark'));
  document.getElementById('theme-toggle-mobile')
    ?.addEventListener('click', () => applyTheme(getTheme() === 'dark' ? 'light' : 'dark'));

  // Sync button label with current theme on load
  const saved = localStorage.getItem('theme') as 'light' | 'dark' | null;
  applyTheme(saved ?? 'dark');
}
