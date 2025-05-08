/**
 * Global Accessibility Enhancements for VelocityQA
 * Add this script to all pages via your header template
 */
document.addEventListener('DOMContentLoaded', function() {
  // Add aria attributes to navigation
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    if (!link.hasAttribute('aria-label')) {
      link.setAttribute('aria-label', link.textContent.trim());
    }
  });

  // Make mobile menu toggle fully accessible
  const mobileToggle = document.getElementById('mobileMenuToggle');
  if (mobileToggle) {
    mobileToggle.setAttribute('aria-expanded', 'false');
    mobileToggle.setAttribute('aria-label', 'Open navigation menu');
    mobileToggle.setAttribute('role', 'button');
    
    mobileToggle.addEventListener('click', function() {
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !expanded);
      this.setAttribute('aria-label', expanded ? 'Open navigation menu' : 'Close navigation menu');
    });
  }

  // Enhance FAQ keyboard accessibility
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(question => {
    question.setAttribute('tabindex', '0');
    question.setAttribute('role', 'button');
    
    // Enable keyboard navigation for FAQ items
    question.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });
  });

  // Add missing form field labels and relationships
  const formInputs = document.querySelectorAll('input, textarea, select');
  formInputs.forEach(input => {
    // Find associated label
    const id = input.getAttribute('id');
    if (id) {
      const label = document.querySelector(`label[for="${id}"]`);
      if (!label) {
        // Create label if missing
        const parentNode = input.parentNode;
        if (parentNode.querySelector('label:not([for])')) {
          const unlabeledLabel = parentNode.querySelector('label:not([for])');
          unlabeledLabel.setAttribute('for', id);
        }
      }
    }
    
    // Ensure required inputs have aria-required
    if (input.hasAttribute('required') && !input.hasAttribute('aria-required')) {
      input.setAttribute('aria-required', 'true');
    }
  });
});
