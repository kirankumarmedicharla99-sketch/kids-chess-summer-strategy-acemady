(function () {
  'use strict';

  const footer = document.getElementById('strataFooter');
  const scrollTopBtn = document.getElementById('scrollTopBtn');

  function initScrollTop() {
    if (!scrollTopBtn) return;

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    const toggleButtonVisibility = () => {
      if (window.scrollY > 300) {
        scrollTopBtn.style.opacity = '1';
        scrollTopBtn.style.pointerEvents = 'auto';
      } else {
        scrollTopBtn.style.opacity = '0.6';
      }
    };

    window.addEventListener('scroll', toggleButtonVisibility, { passive: true });
    toggleButtonVisibility();
  }

  function initSync() {

    window.addEventListener('strataThemeChanged', (e) => {
      const theme = e.detail?.theme;
      if (theme && footer) {
        footer.setAttribute('data-theme', theme);
      }
    });

    window.addEventListener('strataDirChanged', (e) => {
      const dir = e.detail?.dir;
      if (dir && footer) {
        footer.setAttribute('dir', dir);
      }
    });

    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
    if (footer) {
      footer.setAttribute('data-theme', currentTheme);
      footer.setAttribute('dir', currentDir);
    }
  }

  function initEmailCopy() {
    const emailLink = document.querySelector('.contact-item a[href^="mailto:"]');
    if (!emailLink) return;

    emailLink.addEventListener('click', (e) => {
      const email = emailLink.textContent.trim();
      if (navigator.clipboard) {
        navigator.clipboard.writeText(email).then(() => {
          const originalText = emailLink.textContent;
          emailLink.textContent = 'Copied to Clipboard!';
          setTimeout(() => {
            emailLink.textContent = originalText;
          }, 2000);
        }).catch(() => {

        });
      }
    });
  }

  function init() {
    initScrollTop();
    initSync();
    initEmailCopy();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
