(function () {
  'use strict';

  const THEME_STORAGE_KEY = 'strata_chess_theme';
  const DIR_STORAGE_KEY = 'strata_chess_direction';

  const htmlRoot = document.documentElement;
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const rtlToggleBtn = document.getElementById('rtlToggleBtn');
  const rtlLabel = document.getElementById('rtlLabel');

  const signupForm = document.getElementById('signupForm');
  const fullNameInput = document.getElementById('signupFullName');
  const emailInput = document.getElementById('signupEmail');
  const passwordInput = document.getElementById('signupPassword');
  const confirmPasswordInput = document.getElementById('signupConfirmPassword');
  const termsCheckbox = document.getElementById('termsCheckbox');
  const submitBtn = document.getElementById('signupSubmitBtn');

  const togglePasswordBtn = document.getElementById('togglePasswordBtn');
  const toggleConfirmPasswordBtn = document.getElementById('toggleConfirmPasswordBtn');

  const passwordStrengthWrap = document.getElementById('passwordStrengthWrap');
  const strengthText = document.getElementById('strengthText');

  const fullNameError = document.getElementById('fullNameError');
  const emailError = document.getElementById('emailError');
  const passwordError = document.getElementById('passwordError');
  const confirmPasswordError = document.getElementById('confirmPasswordError');
  const termsError = document.getElementById('termsError');

  const authAlertBox = document.getElementById('authAlertBox');
  const alertIcon = document.getElementById('alertIcon');
  const alertMessage = document.getElementById('alertMessage');

  const googleBtn = document.getElementById('googleSignupBtn');
  const appleBtn = document.getElementById('appleSignupBtn');

  const legalModal = document.getElementById('legalModal');
  const termsTrigger = document.getElementById('termsTrigger');
  const privacyTrigger = document.getElementById('privacyTrigger');
  const closeLegalModalBtn = document.getElementById('closeLegalModalBtn');
  const acceptLegalBtn = document.getElementById('acceptLegalBtn');
  const legalModalTitle = document.getElementById('legalModalTitle');

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

  function setupPasswordToggle(btn, input) {
    if (!btn || !input) return;

    btn.addEventListener('click', function () {
      const isPassword = input.getAttribute('type') === 'password';
      input.setAttribute('type', isPassword ? 'text' : 'password');

      if (isPassword) {
        btn.classList.add('is-revealed');
      } else {
        btn.classList.remove('is-revealed');
      }

      const eyeShow = btn.querySelector('.eye-show');
      const eyeHide = btn.querySelector('.eye-hide');

      if (eyeShow && eyeHide) {
        eyeShow.hidden = isPassword;
        eyeHide.hidden = !isPassword;
        eyeShow.style.display = isPassword ? 'none' : 'block';
        eyeHide.style.display = isPassword ? 'block' : 'none';
      }

      btn.setAttribute(
        'aria-label',
        isPassword ? 'Hide password' : 'Show password as plain text'
      );
      btn.setAttribute(
        'title',
        isPassword ? 'Hide password' : 'Show password'
      );
    });
  }

  function evaluatePasswordStrength(password) {
    if (!password) return 0;
    let score = 0;

    if (password.length >= 8) score++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password) && password.length >= 10) score++;

    return Math.max(1, Math.min(4, score));
  }

  function updateStrengthUI(strength) {
    if (!passwordStrengthWrap || !strengthText) return;

    passwordStrengthWrap.setAttribute('data-strength', strength);

    switch (strength) {
      case 1:
        strengthText.textContent = 'Strength: Weak';
        strengthText.style.color = '#E53935';
        break;
      case 2:
        strengthText.textContent = 'Strength: Fair';
        strengthText.style.color = '#E67E22';
        break;
      case 3:
        strengthText.textContent = 'Strength: Good';
        strengthText.style.color = '#C6A15B';
        break;
      case 4:
        strengthText.textContent = 'Strength: Strong';
        strengthText.style.color = '#2E5A46';
        break;
      default:
        strengthText.textContent = 'Strength: Too weak';
        strengthText.style.color = '';
    }
  }

  const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

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

  function validateFullName() {
    const val = fullNameInput.value.trim();
    const group = fullNameInput.closest('.form-group');

    if (!val) {
      setFieldError(group, fullNameError, 'Parent / Guardian name is required.');
      return false;
    }
    if (val.length < 2) {
      setFieldError(group, fullNameError, 'Please enter your full first and last name.');
      return false;
    }

    clearFieldError(group, fullNameError);
    return true;
  }

  function validateEmail() {
    const val = emailInput.value.trim();
    const group = emailInput.closest('.form-group');

    if (!val) {
      setFieldError(group, emailError, 'Email address is required.');
      return false;
    }
    if (!EMAIL_REGEX.test(val)) {
      setFieldError(group, emailError, 'Please enter a valid email address (e.g. parent@example.com).');
      return false;
    }

    clearFieldError(group, emailError);
    return true;
  }

  function validatePassword() {
    const val = passwordInput.value;
    const group = passwordInput.closest('.form-group');

    if (!val) {
      setFieldError(group, passwordError, 'Password is required.');
      return false;
    }
    if (val.length < 8) {
      setFieldError(group, passwordError, 'Password must be at least 8 characters long.');
      return false;
    }

    clearFieldError(group, passwordError);
    return true;
  }

  function validateConfirmPassword() {
    const pass = passwordInput.value;
    const confirmVal = confirmPasswordInput.value;
    const group = confirmPasswordInput.closest('.form-group');

    if (!confirmVal) {
      setFieldError(group, confirmPasswordError, 'Please confirm your password.');
      return false;
    }
    if (pass !== confirmVal) {
      setFieldError(group, confirmPasswordError, 'Passwords do not match. Please verify your entry.');
      return false;
    }

    clearFieldError(group, confirmPasswordError);
    return true;
  }

  function validateTerms() {
    if (!termsCheckbox.checked) {
      termsError.textContent = 'You must agree to the Terms of Service and Privacy Policy to create an account.';
      termsError.style.display = 'block';
      return false;
    }
    termsError.textContent = '';
    termsError.style.display = 'none';
    return true;
  }

  function attachLiveValidation() {
    if (fullNameInput) {
      fullNameInput.addEventListener('input', () => {
        if (fullNameError.textContent) validateFullName();
      });
      fullNameInput.addEventListener('blur', validateFullName);
    }

    if (emailInput) {
      emailInput.addEventListener('input', () => {
        if (emailError.textContent) validateEmail();
      });
      emailInput.addEventListener('blur', validateEmail);
    }

    if (passwordInput) {
      passwordInput.addEventListener('input', () => {
        const val = passwordInput.value;
        const strength = evaluatePasswordStrength(val);
        updateStrengthUI(strength);

        if (passwordError.textContent) validatePassword();
        if (confirmPasswordInput.value) validateConfirmPassword();
      });
      passwordInput.addEventListener('blur', validatePassword);
    }

    if (confirmPasswordInput) {
      confirmPasswordInput.addEventListener('input', () => {
        if (confirmPasswordError.textContent) validateConfirmPassword();
      });
      confirmPasswordInput.addEventListener('blur', validateConfirmPassword);
    }

    if (termsCheckbox) {
      termsCheckbox.addEventListener('change', () => {
        if (termsError.textContent) validateTerms();
      });
    }
  }

  function handleSignupSubmit(e) {
    e.preventDefault();
    hideAlert();

    const isNameValid = validateFullName();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isConfirmValid = validateConfirmPassword();
    const isTermsValid = validateTerms();

    if (!isNameValid || !isEmailValid || !isPasswordValid || !isConfirmValid || !isTermsValid) {
      showAlert('Please review the highlighted fields to complete your registration.', 'error');

      if (!isNameValid) fullNameInput.focus();
      else if (!isEmailValid) emailInput.focus();
      else if (!isPasswordValid) passwordInput.focus();
      else if (!isConfirmValid) confirmPasswordInput.focus();
      else if (!isTermsValid) termsCheckbox.focus();

      return;
    }

    setButtonLoading(true);

    const fullNameValue = fullNameInput.value.trim();
    const emailValue = emailInput.value.trim();

    setTimeout(() => {
      setButtonLoading(false);

      sessionStorage.setItem('strata_parent_session', JSON.stringify({
        fullName: fullNameValue,
        email: emailValue,
        loginTime: new Date().toISOString(),
        isDemo: true
      }));

      showToast(
        'Account Registered (Demo)',
        `Welcome to Stratagem Academy, ${fullNameValue}! Preparing your Parent Dashboard...`,
        'success',
        4000
      );

      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 1400);

    }, 900);
  }

  function setButtonLoading(isLoading) {
    if (!submitBtn) return;
    const btnText = submitBtn.querySelector('.btn-text');
    const spinner = submitBtn.querySelector('.btn-spinner');
    const arrow = submitBtn.querySelector('.btn-arrow');

    submitBtn.disabled = isLoading;
    if (isLoading) {
      submitBtn.classList.add('is-loading');
      if (btnText) btnText.textContent = 'CREATING ACCOUNT...';
      if (spinner) spinner.hidden = false;
      if (arrow) arrow.style.display = 'none';
    } else {
      submitBtn.classList.remove('is-loading');
      if (btnText) btnText.textContent = 'CREATE ACCOUNT';
      if (spinner) spinner.hidden = true;
      if (arrow) arrow.style.display = '';
    }
  }

  function initSocialAuth() {
    if (googleBtn) {
      googleBtn.addEventListener('click', () => {
        showToast(
          'Google Sign-Up Demo',
          'Google OAuth 2.0 requires active Client IDs. For this demo, please use the primary form registration.',
          'info',
          5000
        );
      });
    }

    if (appleBtn) {
      appleBtn.addEventListener('click', () => {
        showToast(
          'Apple Sign-Up Demo',
          'Apple ID registration requires Apple Developer Team keys. For this demo, please use the primary form registration.',
          'info',
          5000
        );
      });
    }
  }

  let lastActiveElement = null;

  function openLegalModal(type = 'terms') {
    if (!legalModal) return;
    lastActiveElement = document.activeElement;
    legalModal.hidden = false;
    document.body.style.overflow = 'hidden';

    if (legalModalTitle) {
      legalModalTitle.textContent = type === 'terms' ? 'Terms of Service' : 'Privacy Notice & Youth Safeguards';
    }

    if (closeLegalModalBtn) {
      closeLegalModalBtn.focus();
    }
  }

  function closeLegalModal() {
    if (!legalModal) return;
    legalModal.hidden = true;
    document.body.style.overflow = '';
    if (lastActiveElement) {
      lastActiveElement.focus();
    }
  }

  function initLegalModal() {
    if (termsTrigger) {
      termsTrigger.addEventListener('click', (e) => {
        e.preventDefault();
        openLegalModal('terms');
      });
    }

    if (privacyTrigger) {
      privacyTrigger.addEventListener('click', (e) => {
        e.preventDefault();
        openLegalModal('privacy');
      });
    }

    if (closeLegalModalBtn) {
      closeLegalModalBtn.addEventListener('click', closeLegalModal);
    }

    if (acceptLegalBtn) {
      acceptLegalBtn.addEventListener('click', () => {
        closeLegalModal();
        if (termsCheckbox) {
          termsCheckbox.checked = true;
          if (termsError) {
            termsError.textContent = '';
            termsError.style.display = 'none';
          }
        }
      });
    }

    if (legalModal) {
      legalModal.addEventListener('click', (e) => {
        if (e.target === legalModal) {
          closeLegalModal();
        }
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && legalModal && !legalModal.hidden) {
        closeLegalModal();
      }
    });
  }

  function initNavLinks() {
    const toLoginLink = document.getElementById('toLoginLink');
    if (toLoginLink) {
      toLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        const currentTheme = htmlRoot.getAttribute('data-theme') || 'light';
        const currentDir = htmlRoot.getAttribute('dir') || 'ltr';
        window.location.href = `login.html?theme=${encodeURIComponent(currentTheme)}&dir=${encodeURIComponent(currentDir)}`;
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

    setupPasswordToggle(togglePasswordBtn, passwordInput);
    setupPasswordToggle(toggleConfirmPasswordBtn, confirmPasswordInput);

    attachLiveValidation();
    initSocialAuth();
    initLegalModal();
    initNavLinks();

    if (signupForm) {
      signupForm.addEventListener('submit', handleSignupSubmit);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
