/* signal/noise — main.js */

// ── Theme (IIFE, runs immediately) ─────────────
(function () {
  const html = document.documentElement;
  const stored = localStorage.getItem('theme');
  html.setAttribute('data-theme', stored || 'dark');
})();

document.addEventListener('DOMContentLoaded', () => {

  // ── Theme Toggle ────────────────────────────
  const toggle = document.querySelector('.theme-toggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    });
  }

  // ── Scrolled Nav ────────────────────────────
  const nav = document.querySelector('.nav');
  const onScroll = () => {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 20);
    const st = document.querySelector('.scroll-top');
    if (st) st.classList.toggle('visible', window.scrollY > 400);
    const bar = document.querySelector('.reading-progress');
    if (bar) {
      const doc = document.documentElement;
      const scrolled = doc.scrollTop / (doc.scrollHeight - doc.clientHeight);
      bar.style.width = Math.min(100, scrolled * 100) + '%';
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  // ── Scroll to Top ────────────────────────────
  const scrollTopBtn = document.querySelector('.scroll-top');
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // ── Mobile Nav ───────────────────────────────
  const mobileBtn = document.getElementById('nav-mobile-btn');
  const navLinks  = document.getElementById('nav-links');
  const backdrop  = document.getElementById('nav-backdrop');

  function openMenu() {
    navLinks.classList.add('open');
    mobileBtn.classList.add('open');
    mobileBtn.setAttribute('aria-expanded', 'true');
    if (backdrop) {
      backdrop.classList.add('visible');
    }
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    navLinks.classList.remove('open');
    mobileBtn.classList.remove('open');
    mobileBtn.setAttribute('aria-expanded', 'false');
    if (backdrop) {
      backdrop.classList.remove('visible');
    }
    document.body.style.overflow = '';
  }

  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      navLinks.classList.contains('open') ? closeMenu() : openMenu();
    });

    // Close on backdrop click
    if (backdrop) {
      backdrop.addEventListener('click', closeMenu);
    }

    // Close on nav link click (except social row)
    navLinks.querySelectorAll('a:not(.nav-social-row a)').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Close on outside click / Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });
  }

  // ── Active nav link ──────────────────────────
  const path = window.location.pathname;
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    if (href === '/' && (path === '/' || path === '/index.html')) {
      link.classList.add('active');
    } else if (href !== '/' && path.startsWith(href)) {
      link.classList.add('active');
    }
  });

  // ── Post Search (posts page) ─────────────────
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
      document.querySelectorAll('.category-group').forEach(group => {
        const visible = [...group.querySelectorAll('.post-list-item, .post-card')]
          .some(el => el.style.display !== 'none');
        group.style.display = visible ? '' : 'none';
      });
    });
  }

  // ── Category Filter ──────────────────────────
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
        group.style.display = group.getAttribute('data-category-group') === cat ? '' : 'none';
      });
    });
  });

  // ── Fade-up on scroll ────────────────────────
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
