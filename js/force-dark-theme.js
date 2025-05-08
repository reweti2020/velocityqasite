/**
 * Force dark theme and hide theme toggles - simplified error-proof version
 */
(function() {
  try {
    // Set dark theme
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
    
    // Add CSS to hide toggles
    const style = document.createElement('style');
    style.textContent = `
      [data-theme-toggle], [class*="theme-toggle"], [id*="theme-toggle"],
      [class*="dark-mode"], [id*="dark-mode"], .theme-switch, .theme-btn {
        display: none !important;
        visibility: hidden !important;
      }
    `;
    document.head.appendChild(style);
    
    // Remove toggles after DOM is ready
    const hideToggles = function() {
      document.querySelectorAll('[data-theme-toggle], [class*="theme-toggle"], [id*="theme-toggle"]')
        .forEach(el => {
          if (el && el.parentNode) el.parentNode.removeChild(el);
        });
    };
    
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', hideToggles);
    } else {
      hideToggles();
    }
  } catch (e) {
    console.log('Theme setting error - continuing without fixing theme');
  }
})();
