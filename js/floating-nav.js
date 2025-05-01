/**
 * Global Back-to-Top Button Implementation
 * Simple, standalone button that appears after scrolling
 */
document.addEventListener('DOMContentLoaded', function() {
  // Create the back-to-top button element
  const backToTopButton = document.createElement('a');
  backToTopButton.className = 'back-to-top';
  backToTopButton.id = 'backToTop';
  backToTopButton.href = '#';
  backToTopButton.setAttribute('aria-label', 'Back to top of page');
  backToTopButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="16 12 12 8 8 12"></polyline>
      <line x1="12" y1="16" x2="12" y2="8"></line>
    </svg>
  `;

  // Add the button to the body
  document.body.appendChild(backToTopButton);

  // Add the CSS styles
  const style = document.createElement('style');
  style.textContent = `
    .back-to-top {
      position: fixed;
      bottom: 2.5rem;
      right: 2.5rem;
      background-color: rgba(32, 197, 198, 0.8); /* VelocityQA teal color with transparency */
      color: white;
      width: 45px;
      height: 45px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      transition: all 0.3s ease;
      opacity: 0;
      visibility: hidden;
      z-index: 99;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .back-to-top:hover {
      background-color: var(--orange, #ff6b00);
      transform: translateY(-3px);
      box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
    }

    .back-to-top.visible {
      opacity: 0.8;
      visibility: visible;
    }

    .back-to-top:hover {
      opacity: 1;
    }

    /* For reduced motion preferences */
    @media (prefers-reduced-motion: reduce) {
      .back-to-top {
        transition: opacity 0.1s linear;
      }
      .back-to-top:hover {
        transform: none;
      }
    }

    /* Mobile optimization */
    @media (max-width: 768px) {
      .back-to-top {
        bottom: 5rem; /* Move up above mobile nav bar */
        right: 1.5rem;
        width: 40px;
        height: 40px;
      }
    }
  `;
  document.head.appendChild(style);

  // Show/hide button based on scroll position
  const scrollThreshold = 300; // Show after scrolling 300px
  
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > scrollThreshold) {
      backToTopButton.classList.add('visible');
    } else {
      backToTopButton.classList.remove('visible');
    }
  });

  // Initialize visibility
  if (window.pageYOffset > scrollThreshold) {
    backToTopButton.classList.add('visible');
  }

  // Smooth scroll to top when clicked
  backToTopButton.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});
