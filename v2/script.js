// SoFlo Notary - Client-side interactions
// Mobile nav toggle, FAQ accordion, contact form handling

document.addEventListener('DOMContentLoaded', function() {
  // Mobile navigation toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navMobile = document.querySelector('.nav-mobile');

  if (navToggle && navMobile) {
    navToggle.addEventListener('click', function() {
      const isOpen = navMobile.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile nav when clicking a link
    navMobile.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        navMobile.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // FAQ accordion
  document.querySelectorAll('.faq-q').forEach(function(btn) {
    btn.addEventListener('click', function() {
      this.parentElement.classList.toggle('open');
    });
  });

  // Contact form - basic client-side handling
  // Note: This form needs a backend (Netlify Forms, Formspree, etc.) to actually work
  const contactForm = document.querySelector('form[onsubmit]');
  if (contactForm) {
    contactForm.removeAttribute('onsubmit');
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // Basic validation
      const requiredFields = this.querySelectorAll('[required]');
      let valid = true;
      requiredFields.forEach(function(field) {
        if (!field.value.trim()) {
          field.style.borderColor = '#94182C';
          valid = false;
        } else {
          field.style.borderColor = '';
        }
      });

      if (!valid) return;

      // Show success state (in production, submit to backend via fetch)
      const formSuccess = document.getElementById('form-success');
      if (formSuccess) {
        this.style.display = 'none';
        formSuccess.style.display = 'block';

        // Scroll to success message
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }

  // Close mobile nav on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && navMobile && navMobile.classList.contains('open')) {
      navMobile.classList.remove('open');
      if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
      navToggle?.focus();
    }
  });
});