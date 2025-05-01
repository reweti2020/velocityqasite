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
  style.textContent = `
    /* Hide ALL possible theme toggle buttons */
    .theme-toggle, 
    #themeToggle, 
    [id*="theme-toggle"],
    [id*="themeToggle"],
    [class*="theme-toggle"],
    button[aria-label*="theme"],
    button[aria-label*="dark"],
    button[aria-label*="light"],
    div[aria-label*="theme"],
    div[aria-label*="dark"],
    div[aria-label*="light"] {
      display: none !important;
      visibility: hidden !important;
      opacity: 0 !important;
      pointer-events: none !important;
      position: absolute !important;
      left: -9999px !important;
      height: 0 !important;
      width: 0 !important;
      overflow: hidden !important;
    }
  `;
  
  // Add the style to the head immediately
  document.head.appendChild(style);
  
  // When DOM is loaded, ensure theme toggles remain hidden
  document.addEventListener('DOMContentLoaded', function() {
    // Find and remove any theme toggles that might be added dynamically
    const removeThemeToggles = function() {
      const themeToggles = document.querySelectorAll('.theme-toggle, #themeToggle, [id*="theme-toggle"], [class*="theme-toggle"]');
      themeToggles.forEach(toggle => {
        toggle.remove(); // Completely remove the element instead of just hiding
      });
    };
    
    // Run immediately and also after a slight delay to catch dynamic elements
    removeThemeToggles();
    setTimeout(removeThemeToggles, 500);
    
    // Ensure dark theme is still applied
    document.documentElement.setAttribute('data-theme', 'dark');
  });
})();
