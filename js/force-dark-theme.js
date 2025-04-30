/**
 * Force dark theme across the entire VelocityQA site
 * This runs immediately to prevent theme flashing
 */
(function() {
  // Set dark theme immediately to prevent flash of light theme
  document.documentElement.setAttribute('data-theme', 'dark');
  
  // Store the preference permanently
  localStorage.setItem('theme', 'dark');
  
  // Create a style element to hide the theme toggle
  const style = document.createElement('style');
  style.textContent = `
    /* Hide theme toggle buttons */
    .theme-toggle, 
    #themeToggle, 
    [id*="theme-toggle"],
    [class*="theme-toggle"],
    button[aria-label*="theme"],
    button[aria-label*="dark"],
    button[aria-label*="light"] {
      display: none !important;
    }
    
    /* Force dark theme styles if needed */
    html, body {
      background-color: var(--bg-light);
      color: var(--text);
    }
  `;
  
  // Add the style to the head
  document.head.appendChild(style);
  
  // When DOM is loaded, ensure theme toggle remains hidden
  document.addEventListener('DOMContentLoaded', function() {
    // Find and hide any theme toggles that might be added later
    const themeToggles = document.querySelectorAll('.theme-toggle, #themeToggle');
    themeToggles.forEach(toggle => {
      toggle.style.display = 'none';
      toggle.setAttribute('aria-hidden', 'true');
    });
    
    // Ensure dark theme is still applied
    document.documentElement.setAttribute('data-theme', 'dark');
  });
})();
