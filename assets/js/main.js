/* signal/noise — main.js */

// ── Theme ──────────────────────────────────
(function () {
  const html = document.documentElement;
  const stored = localStorage.getItem('theme');
  if (stored) {
    html.setAttribute('data-theme', stored);
  } else {
    html.setAttribute('data-theme', 'dark');
  }
})();

document.addEventListener('DOMContentLoaded', () => {

  // ── Theme Toggle ──────────────────────────
  const toggle = document.querySelector('.theme-toggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    });
  }

  // ── Scrolled Nav ──────────────────────────
  const nav = document.querySelector('.nav');
  const onScroll = () => {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 20);
    // scroll-to-top
    const st = document.querySelector('.scroll-top');
    if (st) st.classList.toggle('visible', window.scrollY > 400);
    // reading progress
    const bar = document.querySelector('.reading-progress');
    if (bar) {
      const doc = document.documentElement;
      const scrolled = doc.scrollTop / (doc.scrollHeight - doc.clientHeight);
      bar.style.width = Math.min(100, scrolled * 100) + '%';
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  // ── Scroll to Top ─────────────────────────
  const scrollTopBtn = document.querySelector('.scroll-top');
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ── Mobile Nav ────────────────────────────
  const mobileBtn = document.querySelector('.nav-mobile-btn');
  const navLinks  = document.querySelector('.nav-links');
  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
    // close on outside click
    document.addEventListener('click', (e) => {
      if (!mobileBtn.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('open');
      }
    });
  }

  // ── Active nav link ───────────────────────
  const path = window.location.pathname;
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === '/' && (path === '/' || path === '/index.html')) {
      link.classList.add('active');
    } else if (href !== '/' && path.startsWith(href)) {
      link.classList.add('active');
    }
  });

  // ── Post Search (posts page) ───────────────
  const searchInput = document.querySelector('#post-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      const items = document.querySelectorAll('[data-searchable]');
      items.forEach(item => {
        const text = item.getAttribute('data-searchable').toLowerCase();
        item.closest('.post-list-item, .post-card').style.display =
          !q || text.includes(q) ? '' : 'none';
      });

      // show/hide empty group labels
      document.querySelectorAll('.category-group').forEach(group => {
        const visible = [...group.querySelectorAll('.post-list-item, .post-card')]
          .some(el => el.style.display !== 'none');
        group.style.display = visible ? '' : 'none';
      });
    });
  }

  // ── Category Filter ───────────────────────
  document.querySelectorAll('.category-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const cat = tab.getAttribute('data-category');

      document.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      if (cat === 'all') {
        document.querySelectorAll('.category-group').forEach(g => g.style.display = '');
        document.querySelectorAll('.post-list-item, .post-card[data-category]').forEach(el => el.style.display = '');
        return;
      }

      document.querySelectorAll('.category-group').forEach(group => {
        const match = group.getAttribute('data-category-group') === cat;
        group.style.display = match ? '' : 'none';
      });
    });
  });

  // ── Fade-up on scroll (IntersectionObserver) ──
  const fadeEls = document.querySelectorAll('.post-card, .post-list-item, .about-section');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'none';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    fadeEls.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(12px)';
      el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      observer.observe(el);
    });
  }

});
