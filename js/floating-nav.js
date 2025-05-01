/**
 * Improved Back-to-Top Button Implementation
 * Subtle, minimalist design that matches the VelocityQA aesthetic
 */
document.addEventListener('DOMContentLoaded', function() {
  // First, remove any existing back-to-top buttons or navigation elements
  const existingButtons = document.querySelectorAll('.back-to-top, #backToTop, [id*="back-to-top"], [class*="back-to-top"], a[href*="#top"]');
  existingButtons.forEach(button => button.remove());
  
  // Create the back-to-top button element (simple arrow, no box or text)
  const backToTopButton = document.createElement('a');
  backToTopButton.className = 'velocity-back-to-top'; // Unique class to avoid conflicts
  backToTopButton.id = 'velocityBackToTop'; // Unique ID to avoid conflicts
  backToTopButton.href = '#';
  backToTopButton.setAttribute('aria-label', 'Back to top of page');
  backToTopButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="18 15 12 9 6 15"></polyline>
    </svg>
  `;

  // Add the button to the body
  document.body.appendChild(backToTopButton);

  // Add the CSS styles with !important flags
  const style = document.createElement('style');
  style.textContent = `
    /* Override any conflicting styles with !important */
    #velocityBackToTop, 
    .velocity-back-to-top {
      position: fixed !important;
      bottom: 2.5rem !important;
      right: 2.5rem !important;
      background-color: transparent !important;
      color: #D1D5DB !important; /* Silver color that matches footer text */
      width: 45px !important;
      height: 45px !important;
      border-radius: 50% !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      text-decoration: none !important;
      transition: all 0.3s ease !important;
      opacity: 0 !important;
      visibility: hidden !important;
      z-index: 9999 !important; /* Higher z-index to ensure visibility */
      box-shadow: none !important;
      border: none !important;
      outline: none !important;
      text-indent: -9999px !important; /* Hide any text */
      overflow: hidden !important;
      white-space: nowrap !important;
    }
    
    /* Ensure only the SVG is visible */
    #velocityBackToTop::before,
    #velocityBackToTop::after,
    #velocityBackToTop *:not(svg):not(polyline),
    .velocity-back-to-top::before,
    .velocity-back-to-top::after,
    .velocity-back-to-top *:not(svg):not(polyline) {
      display: none !important;
      content: none !important;
      visibility: hidden !important;
    }
    
    /* Position the SVG in the center */
    #velocityBackToTop svg,
    .velocity-back-to-top svg {
      position: absolute !important;
      text-indent: 0 !important; /* Reset text-indent for the SVG */
      top: 50% !important;
      left: 50% !important;
      transform: translate(-50%, -50%) !important;
      stroke: #D1D5DB !important; /* Silver color */
      fill: none !important;
    }

    #velocityBackToTop:hover,
    .velocity-back-to-top:hover {
      color: #20C5C6 !important; /* Teal on hover */
      transform: translateY(-3px) !important;
      background-color: transparent !important;
      text-decoration: none !important;
    }

    #velocityBackToTop:hover svg,
    .velocity-back-to-top:hover svg {
      stroke: #20C5C6 !important; /* Teal on hover */
    }

    #velocityBackToTop.visible,
    .velocity-back-to-top.visible {
      opacity: 0.8 !important;
      visibility: visible !important;
    }

    /* For reduced motion preferences */
    @media (prefers-reduced-motion: reduce) {
      #velocityBackToTop,
      .velocity-back-to-top {
        transition: opacity 0.1s linear !important;
      }
      #velocityBackToTop:hover,
      .velocity-back-to-top:hover {
        transform: none !important;
      }
    }

    /* Mobile optimization */
    @media (max-width: 768px) {
      #velocityBackToTop,
      .velocity-back-to-top {
        bottom: 5rem !important; /* Move up above mobile nav bar */
        right: 1.5rem !important;
      }
    }
    
    /* Hide any elements with these texts */
    a:not(#velocityBackToTop) > *:contains("Top"), 
    a:not(#velocityBackToTop) > *:contains("Back"), 
    a:not(#velocityBackToTop) > *:contains("Home") {
      display: none !important;
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
  
  // Check if there are other elements creating a similar navigation
  // and remove them periodically
  setInterval(function() {
    const elementsToRemove = document.querySelectorAll('a[href*="#top"]:not(#velocityBackToTop), a[href*="#home"]:not(#velocityBackToTop)');
    elementsToRemove.forEach(el => {
      if (el.innerText.includes('Top') || el.innerText.includes('Back') || el.innerText.includes('Home')) {
        el.style.display = 'none';
      }
    });
  }, 1000);
});
