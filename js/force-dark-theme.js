/**
 * Force dark theme across the entire VelocityQA site and hide all theme toggles
 * This runs immediately to prevent theme flashing
 */
(function() {
  // Set dark theme immediately to prevent flash of light theme
  document.documentElement.setAttribute('data-theme', 'dark');
  
  // Store the preference permanently
  localStorage.setItem('theme', 'dark');
  
  // Create a style element to forcefully hide all theme toggles
  const style = document.createElement('style');
  style.innerHTML = `
    /* Hide ALL possible theme toggle buttons with maximum specificity */
    html body .theme-toggle, 
    html body #themeToggle, 
    html body [id*="theme-toggle"],
    html body [id*="themeToggle"],
    html body [class*="theme-toggle"],
    html body button[aria-label*="theme"],
    html body button[aria-label*="dark"],
    html body button[aria-label*="light"],
    html body div[aria-label*="theme"],
    html body div[aria-label*="dark"],
    html body div[aria-label*="light"],
    html body .theme-switch,
    html body #theme-switch,
    html body [data-theme-toggle],
    html body .dark-mode-toggle,
    html body #dark-mode-toggle {
      display: none !important;
      visibility: hidden !important;
      opacity: 0 !important;
      pointer-events: none !important;
      position: absolute !important;
      left: -9999px !important;
      height: 0 !important;
      width: 0 !important;
      overflow: hidden !important;
      max-height: 0 !important;
      max-width: 0 !important;
      padding: 0 !important;
      margin: 0 !important;
      border: 0 !important;
    }
  `;
  
  // Add the style to the head immediately with highest priority
  document.head.insertBefore(style, document.head.firstChild);
  
  // When DOM is loaded, ensure theme toggles remain hidden
  document.addEventListener('DOMContentLoaded', function() {
    // Find and remove any theme toggles that might be added dynamically
    const removeThemeToggles = function() {
      // More comprehensive selector to catch all possible toggle elements
      const themeToggles = document.querySelectorAll('[class*="theme"],[id*="theme"],button[aria-label*="theme"],button[aria-label*="dark"],button[aria-label*="light"]');
      themeToggles.forEach(toggle => {
        if (toggle.tagName !== 'HTML' && toggle.tagName !== 'BODY') {
          toggle.remove(); // Completely remove the element instead of just hiding
        }
      });
    };
    
    // Run immediately and also several times to catch dynamic elements
    removeThemeToggles();
    setTimeout(removeThemeToggles, 100);
    setTimeout(removeThemeToggles, 500);
    setTimeout(removeThemeToggles, 1000);
    
    // Add a mutation observer to remove any theme toggles added after page load
    const observer = new MutationObserver(function(mutations) {
      removeThemeToggles();
    });
    
    observer.observe(document.body, { 
      childList: true,
      subtree: true
    });
    
    // Ensure dark theme is still applied
    document.documentElement.setAttribute('data-theme', 'dark');
  });
})();
