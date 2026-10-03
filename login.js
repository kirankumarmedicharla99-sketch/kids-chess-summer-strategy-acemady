(function () {
  'use strict';

  const THEME_STORAGE_KEY = 'strata_chess_theme';
  const DIR_STORAGE_KEY = 'strata_chess_direction';

  const htmlRoot = document.documentElement;
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const rtlToggleBtn = document.getElementById('rtlToggleBtn');
  const rtlLabel = document.getElementById('rtlLabel');

  const loginForm = document.getElementById('loginForm');
  const emailInput = document.getElementById('loginEmail');
  const passwordInput = document.getElementById('loginPassword');
  const togglePasswordBtn = document.getElementById('togglePasswordBtn');
  const rememberMeCheckbox = document.getElementById('rememberMe');
  const submitBtn = document.getElementById('loginSubmitBtn');
  const authAlertBox = document.getElementById('authAlertBox');
  const alertIcon = document.getElementById('alertIcon');
  const alertMessage = document.getElementById('alertMessage');

  const emailError = document.getElementById('emailError');
  const passwordError = document.getElementById('passwordError');

  const googleBtn = document.getElementById('googleLoginBtn');
  const appleBtn = document.getElementById('appleLoginBtn');

  const forgotPasswordBtn = document.getElementById('forgotPasswordBtn');
  const forgotModal = document.getElementById('forgotModal');
  const closeForgotModalBtn = document.getElementById('closeForgotModalBtn');
  const cancelForgotBtn = document.getElementById('cancelForgotBtn');
  const forgotForm = document.getElementById('forgotForm');
  const forgotEmailInput = document.getElementById('forgotEmail');
  const forgotEmailError = document.getElementById('forgotEmailError');
  const forgotAlertBox = document.getElementById('forgotAlertBox');
  const sendResetBtn = document.getElementById('sendResetBtn');

  const toast = document.getElementById('authToast');
  const toastTitle = document.getElementById('toastTitle');
  const toastMessage = document.getElementById('toastMessage');
  const toastDismiss = document.getElementById('toastDismiss');
  let toastTimeoutId = null;

  function applyTheme(theme) {
    const validTheme = theme === 'dark' ? 'dark' : 'light';
    htmlRoot.setAttribute('data-theme', validTheme);
    localStorage.setItem(THEME_STORAGE_KEY, validTheme);

    if (themeToggleBtn) {
      themeToggleBtn.setAttribute(
        'aria-label',
        validTheme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'
      );
      themeToggleBtn.setAttribute(
        'title',
        validTheme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'
      );
    }
  }

  function initTheme() {

    const urlParams = new URLSearchParams(window.location.search);
    const urlTheme = urlParams.get('theme');

    if (urlTheme === 'dark' || urlTheme === 'light') {
      applyTheme(urlTheme);
      return;
    }

    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme === 'dark' || savedTheme === 'light') {
      applyTheme(savedTheme);
      return;
    }

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      applyTheme('dark');
    } else {
      applyTheme('light');
    }
  }

  function toggleTheme() {
    const currentTheme = htmlRoot.getAttribute('data-theme') || 'light';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
  }

  function applyDirection(dir) {
    const validDir = dir === 'rtl' ? 'rtl' : 'ltr';
    htmlRoot.setAttribute('dir', validDir);
    localStorage.setItem(DIR_STORAGE_KEY, validDir);

    if (rtlLabel) {
      rtlLabel.textContent = validDir === 'rtl' ? 'LTR' : 'RTL';
    }

    if (rtlToggleBtn) {
      rtlToggleBtn.setAttribute(
        'aria-label',
        validDir === 'rtl' ? 'Switch to Left-to-Right layout' : 'Switch to Right-to-Left layout'
      );
      rtlToggleBtn.setAttribute(
        'title',
        validDir === 'rtl' ? 'Switch to Left-to-Right layout' : 'Switch to Right-to-Left layout'
      );
    }
  }

  function initDirection() {

    const urlParams = new URLSearchParams(window.location.search);
    const urlDir = urlParams.get('dir');

    if (urlDir === 'rtl' || urlDir === 'ltr') {
      applyDirection(urlDir);
      return;
    }

    const savedDir = localStorage.getItem(DIR_STORAGE_KEY);
    if (savedDir === 'rtl' || savedDir === 'ltr') {
      applyDirection(savedDir);
      return;
    }

    applyDirection('ltr');
  }

  function toggleDirection() {
    const currentDir = htmlRoot.getAttribute('dir') || 'ltr';
    const nextDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
    applyDirection(nextDir);
  }

  function showToast(title, message, type = 'info', duration = 4500) {
    if (!toast) return;

    if (toastTimeoutId) {
      clearTimeout(toastTimeoutId);
    }

    toast.className = `auth-toast toast-${type}`;
    if (toastTitle) toastTitle.textContent = title;
    if (toastMessage) toastMessage.textContent = message;

    toast.hidden = false;

    void toast.offsetWidth;
    toast.classList.add('is-visible');

    toastTimeoutId = setTimeout(() => {
      hideToast();
    }, duration);
  }

  function hideToast() {
    if (!toast) return;
    toast.classList.remove('is-visible');
    setTimeout(() => {
      toast.hidden = true;
    }, 300);
  }

  if (toastDismiss) {
    toastDismiss.addEventListener('click', hideToast);
  }

  function showAlert(message, type = 'error') {
    if (!authAlertBox) return;
    authAlertBox.className = `auth-alert-box alert-${type}`;
    if (alertIcon) {
      alertIcon.innerHTML = type === 'success' ? '&#10003;' : '&#9888;';
    }
    if (alertMessage) {
      alertMessage.textContent = message;
    }
    authAlertBox.hidden = false;
    authAlertBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function hideAlert() {
    if (!authAlertBox) return;
    authAlertBox.hidden = true;
    if (alertMessage) alertMessage.textContent = '';
  }

  function initPasswordToggle() {
    if (!togglePasswordBtn || !passwordInput) return;

    togglePasswordBtn.addEventListener('click', function () {
      const isPassword = passwordInput.getAttribute('type') === 'password';
      passwordInput.setAttribute('type', isPassword ? 'text' : 'password');

      if (isPassword) {
        togglePasswordBtn.classList.add('is-revealed');
      } else {
        togglePasswordBtn.classList.remove('is-revealed');
      }

      const eyeShow = togglePasswordBtn.querySelector('.eye-show');
      const eyeHide = togglePasswordBtn.querySelector('.eye-hide');

      if (eyeShow && eyeHide) {
        eyeShow.hidden = isPassword;
        eyeHide.hidden = !isPassword;
        eyeShow.style.display = isPassword ? 'none' : 'block';
        eyeHide.style.display = isPassword ? 'block' : 'none';
      }

      togglePasswordBtn.setAttribute(
        'aria-label',
        isPassword ? 'Hide password' : 'Show password as plain text'
      );
      togglePasswordBtn.setAttribute(
        'title',
        isPassword ? 'Hide password' : 'Show password'
      );
    });
  }

  const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

  function validateEmail(input, errorElement) {
    const val = input.value.trim();
    const group = input.closest('.form-group');

    if (!val) {
      setFieldError(group, errorElement, 'Email address is required.');
      return false;
    }
    if (!EMAIL_REGEX.test(val)) {
      setFieldError(group, errorElement, 'Please enter a valid email address (e.g. parent@example.com).');
      return false;
    }

    clearFieldError(group, errorElement);
    return true;
  }

  function validatePassword(input, errorElement) {
    const val = input.value;
    const group = input.closest('.form-group');

    if (!val) {
      setFieldError(group, errorElement, 'Password is required.');
      return false;
    }
    if (val.length < 6) {
      setFieldError(group, errorElement, 'Password must be at least 6 characters long.');
      return false;
    }

    clearFieldError(group, errorElement);
    return true;
  }

  function setFieldError(group, errorEl, message) {
    if (group) {
      const shell = group.querySelector('.input-shell');
      if (shell) shell.classList.add('has-error');
    }
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.style.display = 'block';
    }
  }

  function clearFieldError(group, errorEl) {
    if (group) {
      const shell = group.querySelector('.input-shell');
      if (shell) shell.classList.remove('has-error');
    }
    if (errorEl) {
      errorEl.textContent = '';
      errorEl.style.display = 'none';
    }
  }

  function attachLiveValidation() {
    if (emailInput) {
      emailInput.addEventListener('input', () => {
        if (emailError.textContent) {
          validateEmail(emailInput, emailError);
        }
      });
      emailInput.addEventListener('blur', () => {
        validateEmail(emailInput, emailError);
      });
    }

    if (passwordInput) {
      passwordInput.addEventListener('input', () => {
        if (passwordError.textContent) {
          validatePassword(passwordInput, passwordError);
        }
      });
      passwordInput.addEventListener('blur', () => {
        validatePassword(passwordInput, passwordError);
      });
    }
  }

  function handleLoginSubmit(e) {
    e.preventDefault();
    hideAlert();

    const isEmailValid = validateEmail(emailInput, emailError);
    const isPasswordValid = validatePassword(passwordInput, passwordError);

    if (!isEmailValid || !isPasswordValid) {
      showAlert('Please correct the highlighted fields before proceeding.', 'error');

      if (!isEmailValid) {
        emailInput.focus();
      } else {
        passwordInput.focus();
      }
      return;
    }

    setButtonLoading(true);

    const emailValue = emailInput.value.trim();
    const rememberValue = rememberMeCheckbox ? rememberMeCheckbox.checked : false;

    setTimeout(() => {
      setButtonLoading(false);

      if (rememberValue) {
        localStorage.setItem('strata_parent_session', JSON.stringify({
          email: emailValue,
          loginTime: new Date().toISOString(),
          isDemo: true
        }));
      } else {
        sessionStorage.setItem('strata_parent_session', JSON.stringify({
          email: emailValue,
          loginTime: new Date().toISOString(),
          isDemo: true
        }));
      }

      showToast(
        'Authentication Verified (Demo)',
        `Welcome back, ${emailValue}! Navigating to Parent Dashboard...`,
        'success'
      );

      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 1200);

    }, 850);
  }

  function setButtonLoading(isLoading) {
    if (!submitBtn) return;
    const btnText = submitBtn.querySelector('.btn-text');
    const spinner = submitBtn.querySelector('.btn-spinner');
    const arrow = submitBtn.querySelector('.btn-arrow');

    submitBtn.disabled = isLoading;
    if (isLoading) {
      submitBtn.classList.add('is-loading');
      if (btnText) btnText.textContent = 'SIGNING IN...';
      if (spinner) spinner.hidden = false;
      if (arrow) arrow.style.display = 'none';
    } else {
      submitBtn.classList.remove('is-loading');
      if (btnText) btnText.textContent = 'LOGIN';
      if (spinner) spinner.hidden = true;
      if (arrow) arrow.style.display = '';
    }
  }

  function initSocialAuth() {
    if (googleBtn) {
      googleBtn.addEventListener('click', () => {
        showToast(
          'Google Sign-In Demo',
          'Google OAuth 2.0 requires active Client IDs. For this demo, please use the primary email sign-in.',
          'info',
          5000
        );
      });
    }

    if (appleBtn) {
      appleBtn.addEventListener('click', () => {
        showToast(
          'Apple Sign-In Demo',
          'Apple ID authentication requires Apple Developer Team keys. For this demo, please use the primary email sign-in.',
          'info',
          5000
        );
      });
    }
  }

  let lastActiveElement = null;

  function openForgotModal() {
    if (!forgotModal) return;
    lastActiveElement = document.activeElement;
    forgotModal.hidden = false;
    document.body.style.overflow = 'hidden';

    if (emailInput && emailInput.value.trim() && forgotEmailInput) {
      forgotEmailInput.value = emailInput.value.trim();
    }

    if (forgotEmailError) forgotEmailError.textContent = '';
    if (forgotAlertBox) {
      forgotAlertBox.hidden = true;
      forgotAlertBox.textContent = '';
    }

    setTimeout(() => {
      if (forgotEmailInput) forgotEmailInput.focus();
    }, 100);
  }

  function closeForgotModal() {
    if (!forgotModal) return;
    forgotModal.hidden = true;
    document.body.style.overflow = '';
    if (lastActiveElement) {
      lastActiveElement.focus();
    }
  }

  function handleForgotSubmit(e) {
    e.preventDefault();
    if (!forgotEmailInput) return;

    const email = forgotEmailInput.value.trim();
    if (!email) {
      if (forgotEmailError) {
        forgotEmailError.textContent = 'Please enter your registered email address.';
        forgotEmailError.style.display = 'block';
      }
      forgotEmailInput.focus();
      return;
    }

    if (!EMAIL_REGEX.test(email)) {
      if (forgotEmailError) {
        forgotEmailError.textContent = 'Please enter a valid email format.';
        forgotEmailError.style.display = 'block';
      }
      forgotEmailInput.focus();
      return;
    }

    if (forgotEmailError) {
      forgotEmailError.textContent = '';
      forgotEmailError.style.display = 'none';
    }

    if (sendResetBtn) {
      sendResetBtn.disabled = true;
      sendResetBtn.innerHTML = '<span>DISPATCHING...</span>';
    }

    setTimeout(() => {
      if (sendResetBtn) {
        sendResetBtn.disabled = false;
        sendResetBtn.innerHTML = '<span>SEND RESET INSTRUCTIONS</span>';
      }

      if (forgotAlertBox) {
        forgotAlertBox.className = 'modal-alert-box alert-success';
        forgotAlertBox.innerHTML = `<strong>Demo Notice:</strong> A reset link has been simulated for <strong>${email}</strong>. In production, an email with a secure token would be delivered to this inbox.`;
        forgotAlertBox.hidden = false;
      }

      showToast(
        'Password Reset Dispatched (Demo)',
        `Reset verification instructions generated for ${email}.`,
        'success'
      );

      setTimeout(() => {
        closeForgotModal();
      }, 3500);

    }, 800);
  }

  function initForgotModal() {
    if (forgotPasswordBtn) {
      forgotPasswordBtn.addEventListener('click', openForgotModal);
    }
    if (closeForgotModalBtn) {
      closeForgotModalBtn.addEventListener('click', closeForgotModal);
    }
    if (cancelForgotBtn) {
      cancelForgotBtn.addEventListener('click', closeForgotModal);
    }

    if (forgotModal) {
      forgotModal.addEventListener('click', (e) => {
        if (e.target === forgotModal) {
          closeForgotModal();
        }
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && forgotModal && !forgotModal.hidden) {
        closeForgotModal();
      }
    });

    if (forgotForm) {
      forgotForm.addEventListener('submit', handleForgotSubmit);
    }
  }

  function initNavLinks() {
    const toSignupLink = document.getElementById('toSignupLink');
    if (toSignupLink) {
      toSignupLink.addEventListener('click', (e) => {
        e.preventDefault();
        const currentTheme = htmlRoot.getAttribute('data-theme') || 'light';
        const currentDir = htmlRoot.getAttribute('dir') || 'ltr';
        window.location.href = `signup.html?theme=${encodeURIComponent(currentTheme)}&dir=${encodeURIComponent(currentDir)}`;
      });
    }
  }

  function init() {
    initTheme();
    initDirection();

    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', toggleTheme);
    }
    if (rtlToggleBtn) {
      rtlToggleBtn.addEventListener('click', toggleDirection);
    }

    initPasswordToggle();
    attachLiveValidation();
    initSocialAuth();
    initForgotModal();
    initNavLinks();

    if (loginForm) {
      loginForm.addEventListener('submit', handleLoginSubmit);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
