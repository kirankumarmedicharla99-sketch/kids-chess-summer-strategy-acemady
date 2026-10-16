(function () {
  'use strict';

  const CONTACT_CONFIG = {

    apiEndpoint: null,

    simulatedLatencyMs: 350,

    emailRegex: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/,
    phoneRegex: /^(\+?\d{1,3}[-.\s]?)?(\(?\d{2,4}\)?[-.\s]?)?\d{3,4}[-.\s]?\d{3,4}$/
  };

  let isSubmitting = false;

  const elements = {
    form: document.getElementById('contactInquiryForm'),
    successPanel: document.getElementById('contactSuccessPanel'),
    submitBtn: document.getElementById('submitInquiryBtn'),
    sendAnotherBtn: document.getElementById('sendAnotherBtn'),
    toast: document.getElementById('contactToast'),
    formStatusNote: document.getElementById('formStatusNote'),
    heroTouchBtn: document.getElementById('heroTouchBtn'),

    parentName: document.getElementById('parentName'),
    childName: document.getElementById('childName'),
    parentEmail: document.getElementById('parentEmail'),
    parentPhone: document.getElementById('parentPhone'),
    childAge: document.getElementById('childAge'),
    interestedProgram: document.getElementById('interestedProgram'),
    inquiryType: document.getElementById('inquiryType'),
    contactMethod: document.getElementById('contactMethod'),
    messageText: document.getElementById('messageText'),
    privacyConsent: document.getElementById('privacyConsent'),

    groupParentName: document.getElementById('groupParentName'),
    groupEmail: document.getElementById('groupEmail'),
    groupPhone: document.getElementById('groupPhone'),
    groupInquiryType: document.getElementById('groupInquiryType'),
    groupMessage: document.getElementById('groupMessage'),
    groupConsent: document.getElementById('groupConsent'),

    errParentName: document.getElementById('errParentName'),
    errParentEmail: document.getElementById('errParentEmail'),
    errParentPhone: document.getElementById('errParentPhone'),
    errMessageText: document.getElementById('errMessageText'),
    errConsent: document.getElementById('errConsent')
  };

  let toastTimer = null;

  function showToast(message, type = 'success') {
    if (!elements.toast) return;

    if (toastTimer) clearTimeout(toastTimer);

    elements.toast.textContent = message;
    elements.toast.className = 'contact-toast is-visible';

    if (type === 'success') {
      elements.toast.classList.add('toast-success');
    } else if (type === 'error') {
      elements.toast.classList.add('toast-error');
    }

    toastTimer = setTimeout(() => {
      elements.toast.classList.remove('is-visible');
    }, 4500);
  }

  function setFieldError(fieldGroup, inputElement, errorMessage, errorContainer) {
    if (!fieldGroup || !inputElement) return;

    fieldGroup.classList.add('has-error');
    inputElement.classList.add('is-invalid');
    inputElement.setAttribute('aria-invalid', 'true');

    if (errorContainer && errorMessage) {
      errorContainer.textContent = errorMessage;
    }
  }

  function clearFieldError(fieldGroup, inputElement) {
    if (!fieldGroup || !inputElement) return;

    fieldGroup.classList.remove('has-error');
    inputElement.classList.remove('is-invalid');
    inputElement.removeAttribute('aria-invalid');
  }

  function validateForm() {
    let isValid = true;
    let firstInvalidField = null;

    const nameVal = elements.parentName ? elements.parentName.value.trim() : '';
    if (!nameVal || nameVal.length < 2) {
      setFieldError(elements.groupParentName, elements.parentName, 'Please enter your full parent / guardian name.', elements.errParentName);
      if (!firstInvalidField) firstInvalidField = elements.parentName;
      isValid = false;
    } else {
      clearFieldError(elements.groupParentName, elements.parentName);
    }

    const emailVal = elements.parentEmail ? elements.parentEmail.value.trim() : '';
    if (!emailVal) {
      setFieldError(elements.groupEmail, elements.parentEmail, 'Email address is required for admissions correspondence.', elements.errParentEmail);
      if (!firstInvalidField) firstInvalidField = elements.parentEmail;
      isValid = false;
    } else if (!CONTACT_CONFIG.emailRegex.test(emailVal)) {
      setFieldError(elements.groupEmail, elements.parentEmail, 'Please enter a valid email address (e.g. name@domain.com).', elements.errParentEmail);
      if (!firstInvalidField) firstInvalidField = elements.parentEmail;
      isValid = false;
    } else {
      clearFieldError(elements.groupEmail, elements.parentEmail);
    }

    const phoneVal = elements.parentPhone ? elements.parentPhone.value.trim() : '';
    const digitsOnly = phoneVal.replace(/\D/g, '');
    if (!phoneVal) {
      setFieldError(elements.groupPhone, elements.parentPhone, 'Phone number is required for consultation coordination.', elements.errParentPhone);
      if (!firstInvalidField) firstInvalidField = elements.parentPhone;
      isValid = false;
    } else if (digitsOnly.length < 7 || !CONTACT_CONFIG.phoneRegex.test(phoneVal)) {
      setFieldError(elements.groupPhone, elements.parentPhone, 'Please provide a valid phone number (at least 7 digits).', elements.errParentPhone);
      if (!firstInvalidField) firstInvalidField = elements.parentPhone;
      isValid = false;
    } else {
      clearFieldError(elements.groupPhone, elements.parentPhone);
    }

    const msgVal = elements.messageText ? elements.messageText.value.trim() : '';
    if (!msgVal || msgVal.length < 10) {
      setFieldError(elements.groupMessage, elements.messageText, 'Please provide at least 10 characters detailing your question or camp goals.', elements.errMessageText);
      if (!firstInvalidField) firstInvalidField = elements.messageText;
      isValid = false;
    } else {
      clearFieldError(elements.groupMessage, elements.messageText);
    }

    if (elements.privacyConsent && !elements.privacyConsent.checked) {
      setFieldError(elements.groupConsent, elements.privacyConsent, 'Please agree to our privacy terms before sending your inquiry.', elements.errConsent);
      if (!firstInvalidField) firstInvalidField = elements.privacyConsent;
      isValid = false;
    } else {
      clearFieldError(elements.groupConsent, elements.privacyConsent);
    }

    if (firstInvalidField) {
      firstInvalidField.focus();
    }

    return isValid;
  }

  function initInputListeners() {
    if (elements.parentName) {
      elements.parentName.addEventListener('input', () => {
        if (elements.parentName.value.trim().length >= 2) {
          clearFieldError(elements.groupParentName, elements.parentName);
        }
      });
    }

    if (elements.parentEmail) {
      elements.parentEmail.addEventListener('input', () => {
        if (CONTACT_CONFIG.emailRegex.test(elements.parentEmail.value.trim())) {
          clearFieldError(elements.groupEmail, elements.parentEmail);
        }
      });
    }

    if (elements.parentPhone) {
      elements.parentPhone.addEventListener('input', () => {
        const digits = elements.parentPhone.value.replace(/\D/g, '');
        if (digits.length >= 7) {
          clearFieldError(elements.groupPhone, elements.parentPhone);
        }
      });
    }

    if (elements.messageText) {
      elements.messageText.addEventListener('input', () => {
        if (elements.messageText.value.trim().length >= 10) {
          clearFieldError(elements.groupMessage, elements.messageText);
        }
      });
    }

    if (elements.privacyConsent) {
      elements.privacyConsent.addEventListener('change', () => {
        if (elements.privacyConsent.checked) {
          clearFieldError(elements.groupConsent, elements.privacyConsent);
        }
      });
    }
  }

  async function handleFormSubmit(e) {
    e.preventDefault();

    if (isSubmitting) return;

    if (!validateForm()) {
      showToast('Please correct the highlighted fields before submitting.', 'error');
      return;
    }

    const formData = {
      parentName: elements.parentName.value.trim(),
      childName: elements.childName ? elements.childName.value.trim() : '',
      email: elements.parentEmail.value.trim(),
      phone: elements.parentPhone.value.trim(),
      childAgeBracket: elements.childAge ? elements.childAge.value : '',
      interestedProgram: elements.interestedProgram ? elements.interestedProgram.value : '',
      inquiryType: elements.inquiryType ? elements.inquiryType.value : '',
      preferredContactMethod: elements.contactMethod ? elements.contactMethod.value : 'email',
      message: elements.messageText.value.trim(),
      privacyConsentAgreed: elements.privacyConsent ? elements.privacyConsent.checked : false,
      submittedAt: new Date().toISOString()
    };

    isSubmitting = true;
    if (elements.submitBtn) {
      elements.submitBtn.classList.add('is-loading');
      elements.submitBtn.disabled = true;
      const labelText = elements.submitBtn.querySelector('.btn-label-text');
      if (labelText) labelText.textContent = 'TRANSMITTING INQUIRY...';
    }

    if (elements.formStatusNote) {
      elements.formStatusNote.textContent = 'Encrypting & dispatching your message to our admissions desk...';
    }

    try {
      if (CONTACT_CONFIG.apiEndpoint) {

        const response = await fetch(CONTACT_CONFIG.apiEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        if (!response.ok) {
          throw new Error(`Server responded with status ${response.status}`);
        }
      } else {

        await new Promise(resolve => setTimeout(resolve, CONTACT_CONFIG.simulatedLatencyMs));
      }

      showSuccessState();
      showToast('Thank you! Your inquiry has been dispatched to our admissions team.', 'success');

    } catch (error) {
      console.error('[Stratagem Contact Form] Submission failed:', error);
      showToast('Unable to transmit inquiry at this moment. Please call our hotline or try again.', 'error');

      if (elements.formStatusNote) {
        elements.formStatusNote.textContent = 'Submission failed. Your entered details have been preserved. Please retry.';
      }
    } finally {
      isSubmitting = false;
      if (elements.submitBtn) {
        elements.submitBtn.classList.remove('is-loading');
        elements.submitBtn.disabled = false;
        const labelText = elements.submitBtn.querySelector('.btn-label-text');
        if (labelText) labelText.textContent = 'SEND YOUR INQUIRY';
      }
    }
  }

  function showSuccessState() {
    if (elements.form) {
      elements.form.hidden = true;
      elements.form.style.display = 'none';
    }

    if (elements.successPanel) {
      elements.successPanel.hidden = false;
      elements.successPanel.style.display = 'block';
      elements.successPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  function resetToFormState() {
    if (elements.form) {
      elements.form.reset();
      elements.form.hidden = false;
      elements.form.style.display = 'flex';

      clearFieldError(elements.groupParentName, elements.parentName);
      clearFieldError(elements.groupEmail, elements.parentEmail);
      clearFieldError(elements.groupPhone, elements.parentPhone);
      clearFieldError(elements.groupMessage, elements.messageText);
      clearFieldError(elements.groupConsent, elements.privacyConsent);
    }

    if (elements.successPanel) {
      elements.successPanel.hidden = true;
      elements.successPanel.style.display = 'none';
    }

    if (elements.formStatusNote) {
      elements.formStatusNote.textContent = 'Responses typically provided within 1 business day.';
    }

    if (elements.parentName) {
      elements.parentName.focus();
    }
  }

  function initSmoothScrollLinks() {

    if (elements.heroTouchBtn) {
      elements.heroTouchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.getElementById('contactFormSection');
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          setTimeout(() => {
            if (elements.parentName) elements.parentName.focus();
          }, 600);
        }
      });
    }

    const scrollLinks = document.querySelectorAll('.scroll-to-form');
    scrollLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.getElementById('contactFormSection');
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          setTimeout(() => {
            if (elements.parentName) elements.parentName.focus();
          }, 600);
        }
      });
    });
  }

  function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    if (!revealElements.length) return;

    if (!('IntersectionObserver' in window)) {
      revealElements.forEach(el => el.classList.add('is-revealed'));
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          obs.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.1
    });

    revealElements.forEach(el => observer.observe(el));
  }

  function initLineupParallax() {
    const stage = document.getElementById('contactLineupStage');
    const wrap = document.querySelector('.contact-lineup-sticker-wrap');
    if (!stage || !wrap || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let rafId = null;

    stage.addEventListener('mousemove', (e) => {
      const rect = stage.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const rotateY = (x / (rect.width / 2)) * 7;
      const rotateX = -(y / (rect.height / 2)) * 5;

      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        wrap.style.transform = `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(8px)`;
      });
    });

    stage.addEventListener('mouseleave', () => {
      if (rafId) cancelAnimationFrame(rafId);
      wrap.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0)';
    });
  }

  function init() {
    if (elements.form) {
      elements.form.addEventListener('submit', handleFormSubmit);
    }

    if (elements.sendAnotherBtn) {
      elements.sendAnotherBtn.addEventListener('click', resetToFormState);
    }

    initInputListeners();
    initSmoothScrollLinks();
    initScrollReveal();
    initLineupParallax();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
