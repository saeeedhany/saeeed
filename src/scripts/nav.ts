export function initNav() {
  // Sticky nav
  const nav = document.getElementById('main-nav');
  window.addEventListener('scroll', () => {
    nav?.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  // Hamburger
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('nav-mobile');

  function closeMenu() {
    hamburger?.classList.remove('open');
    mobileMenu?.classList.remove('open');
    document.body.style.overflow = '';
  }

  hamburger?.addEventListener('click', () => {
    const open = hamburger.classList.toggle('open');
    mobileMenu?.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  document.getElementById('nav-mobile-close')?.addEventListener('click', closeMenu);
  mobileMenu?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

  // Hero scroll fade
  const heroImg     = document.querySelector<HTMLElement>('.hero-image');
  const heroWrapper = document.querySelector<HTMLElement>('.hero-wrapper');
  if (heroImg && heroWrapper) {
    window.addEventListener('scroll', () => {
      const bottom = heroWrapper.getBoundingClientRect().bottom;
      const p = Math.max(0, Math.min(1, 1 - bottom / heroWrapper.offsetHeight));
      heroImg.style.opacity   = String(Math.max(0, 1 - p * 1.4));
      heroImg.style.transform = `scale(${Math.max(0.94, 1 - p * 0.06)}) translateY(${p * -24}px)`;
    }, { passive: true });
  }
}
