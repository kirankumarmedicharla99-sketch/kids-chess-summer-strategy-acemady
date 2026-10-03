(function () {
  'use strict';

  const header = document.getElementById('strataHeader');
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const rtlToggleBtn = document.getElementById('rtlToggleBtn');
  const rtlLabel = document.getElementById('rtlLabel');
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerBackdrop = document.getElementById('drawerBackdrop');
  const drawerCloseBtn = document.getElementById('drawerCloseBtn');
  const navHomeDropdown = document.getElementById('navHomeDropdown');
  const mobileHomeAccordion = document.getElementById('mobileHomeAccordion');

  const THEME_STORAGE_KEY = 'strata_chess_theme';

  function getPreferredTheme() {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme) {
      return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);

    if (themeToggleBtn) {
      themeToggleBtn.setAttribute(
        'aria-label',
        theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'
      );
      themeToggleBtn.setAttribute(
        'title',
        theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'
      );
    }

    window.dispatchEvent(new CustomEvent('strataThemeChanged', { detail: { theme } }));
  }

  function initTheme() {
    const currentTheme = getPreferredTheme();
    applyTheme(currentTheme);

    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', () => {
        const activeTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const nextTheme = activeTheme === 'dark' ? 'light' : 'dark';
        applyTheme(nextTheme);
      });
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(THEME_STORAGE_KEY)) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  const DIR_STORAGE_KEY = 'strata_chess_direction';

  function applyDirection(dir) {
    document.documentElement.setAttribute('dir', dir);
    localStorage.setItem(DIR_STORAGE_KEY, dir);

    if (rtlLabel) {
      rtlLabel.textContent = dir === 'rtl' ? 'LTR' : 'RTL';
    }

    if (rtlToggleBtn) {
      rtlToggleBtn.setAttribute(
        'aria-label',
        dir === 'rtl' ? 'Switch to Left-to-Right layout' : 'Switch to Right-to-Left layout'
      );
      rtlToggleBtn.setAttribute(
        'title',
        dir === 'rtl' ? 'Switch to LTR' : 'Switch to RTL'
      );
    }

    window.dispatchEvent(new CustomEvent('strataDirChanged', { detail: { dir } }));
  }

  function initDirection() {
    const savedDir = localStorage.getItem(DIR_STORAGE_KEY) || 'ltr';
    applyDirection(savedDir);

    if (rtlToggleBtn) {
      rtlToggleBtn.addEventListener('click', () => {
        const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
        const nextDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
        applyDirection(nextDir);
      });
    }
  }

  function initHeaderScroll() {
    if (!header) return;

    const handleScroll = () => {
      if (window.scrollY > 15) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  function initDropdown() {
    if (!navHomeDropdown) return;

    const toggle = navHomeDropdown.querySelector('.dropdown-toggle');
    if (!toggle) return;

    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      const isOpen = navHomeDropdown.classList.contains('is-open');
      navHomeDropdown.classList.toggle('is-open', !isOpen);
      toggle.setAttribute('aria-expanded', String(!isOpen));
    });

    document.addEventListener('click', (e) => {
      if (!navHomeDropdown.contains(e.target)) {
        navHomeDropdown.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navHomeDropdown.classList.contains('is-open')) {
        navHomeDropdown.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
  }

  function initMobileDrawer() {
    if (!hamburgerBtn || !mobileDrawer || !drawerBackdrop) return;

    const openDrawer = () => {
      hamburgerBtn.classList.add('is-active');
      hamburgerBtn.setAttribute('aria-expanded', 'true');
      mobileDrawer.classList.add('is-active');
      mobileDrawer.setAttribute('aria-hidden', 'false');
      drawerBackdrop.classList.add('is-active');
      drawerBackdrop.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    };

    const closeDrawer = () => {
      hamburgerBtn.classList.remove('is-active');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
      mobileDrawer.classList.remove('is-active');
      mobileDrawer.setAttribute('aria-hidden', 'true');
      drawerBackdrop.classList.remove('is-active');
      drawerBackdrop.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };

    hamburgerBtn.addEventListener('click', () => {
      const isActive = mobileDrawer.classList.contains('is-active');
      if (isActive) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });

    if (drawerCloseBtn) {
      drawerCloseBtn.addEventListener('click', closeDrawer);
    }

    drawerBackdrop.addEventListener('click', closeDrawer);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileDrawer.classList.contains('is-active')) {
        closeDrawer();
        hamburgerBtn.focus();
      }
    });

    if (mobileHomeAccordion) {
      const accordionToggle = mobileHomeAccordion.querySelector('.accordion-toggle');
      if (accordionToggle) {
        accordionToggle.addEventListener('click', (e) => {
          e.preventDefault();
          const isOpen = mobileHomeAccordion.classList.contains('open');
          mobileHomeAccordion.classList.toggle('open', !isOpen);
          accordionToggle.setAttribute('aria-expanded', String(!isOpen));
        });
      }
    }

    const mobileLinks = mobileDrawer.querySelectorAll('.mobile-nav-link:not(.accordion-toggle), .mobile-sublink, .mobile-drawer-login');
    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => {
        closeDrawer();
      });
    });
  }

  function init() {
    initTheme();
    initDirection();
    initHeaderScroll();
    initDropdown();
    initMobileDrawer();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
