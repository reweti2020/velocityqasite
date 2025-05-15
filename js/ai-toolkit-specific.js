/**
 * AI Toolkit specific JavaScript functionality
 */

// Track prompt usage
function trackPromptUsage(promptId, action) {
  // This would typically send analytics data to a backend
  console.log(`Prompt ${promptId} ${action}`)

  // For demonstration purposes, we increment a counter in localStorage
  const usageKey = `prompt-${promptId}-${action}`
  const currentCount = Number.parseInt(localStorage.getItem(usageKey) || "0")
  localStorage.setItem(usageKey, currentCount + 1)
}

// Initialize prompt usage tracking
document.addEventListener("DOMContentLoaded", () => {
  // Track copy events
  document.querySelectorAll(".copy-btn").forEach((btn) => {
    btn.addEventListener("click", function() {
      const promptCard = this.closest(".prompt-card");
      if (promptCard) {
        const promptTitle = promptCard.querySelector(".prompt-title");
        if (promptTitle) {
          trackPromptUsage(promptTitle.textContent, "copy");
        }
      }
    });
  });

  // Track generate events
  document.querySelectorAll(".generate-btn").forEach((btn) => {
    btn.addEventListener("click", function() {
      const promptCard = this.closest(".prompt-card");
      if (promptCard) {
        const promptTitle = promptCard.querySelector(".prompt-title");
        if (promptTitle) {
          trackPromptUsage(promptTitle.textContent, "generate");
        }
      }
    });
  });
  
  // Attach click handlers for buttons that might be added dynamically
  document.body.addEventListener("click", function(e) {
    if (e.target && e.target.matches(".copy-btn, .copy-btn *")) {
      const btn = e.target.closest(".copy-btn");
      if (btn && !btn.hasAttribute("data-handler-attached")) {
        const onclickAttr = btn.getAttribute("onclick");
        if (onclickAttr && onclickAttr.includes("copyPrompt")) {
          // It's already using the global copyPrompt function
          btn.setAttribute("data-handler-attached", "true");
        }
      }
    }
    
    if (e.target && e.target.matches(".generate-btn, .generate-btn *")) {
      const btn = e.target.closest(".generate-btn");
      if (btn && !btn.hasAttribute("data-handler-attached")) {
        const onclickAttr = btn.getAttribute("onclick");
        if (onclickAttr && onclickAttr.includes("generatePrompt")) {
          // It's already using the global generatePrompt function
          btn.setAttribute("data-handler-attached", "true");
        }
      }
    }
  });
});

// Add keyboard shortcuts
document.addEventListener("keydown", (e) => {
  // Ctrl/Cmd + / to focus search
  if ((e.ctrlKey || e.metaKey) && e.key === "/") {
    e.preventDefault()
    const searchInput = document.getElementById("search-input")
    if (searchInput) searchInput.focus()
  }
});
