/**
 * AI Toolkit specific JavaScript functionality
 * Minimalist version that only tracks usage
 */

// Track prompt usage
function trackPromptUsage(promptId, action) {
  console.log(`Prompt ${promptId} ${action}`);

  // Store usage in localStorage
  const usageKey = `prompt-${promptId}-${action}`;
  const currentCount = Number.parseInt(localStorage.getItem(usageKey) || "0");
  localStorage.setItem(usageKey, currentCount + 1);
}

// Initialize prompt usage tracking
document.addEventListener("DOMContentLoaded", () => {
  // Set up keyboard shortcuts
  document.addEventListener("keydown", (e) => {
    // Ctrl/Cmd + / to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === "/") {
      e.preventDefault();
      const searchInput = document.getElementById("search-input");
      if (searchInput) searchInput.focus();
    }
  });
});
