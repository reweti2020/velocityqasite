/**
 * AI Toolkit specific JavaScript functionality
 */

// Track prompt usage
function trackPromptUsage(promptId, action) {
  console.log(`Prompt ${promptId} ${action}`);

  // Store usage in localStorage
  const usageKey = `prompt-${promptId}-${action}`;
  const currentCount = Number.parseInt(localStorage.getItem(usageKey) || "0");
  localStorage.setItem(usageKey, currentCount + 1);
}

// Initialize prompt usage tracking and additional AI toolkit features
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

  // Track copy events
  document.querySelectorAll(".copy-btn").forEach((btn) => {
    const promptCard = btn.closest(".prompt-card");
    if (promptCard) {
      const promptTitle = promptCard.querySelector(".prompt-title");
      if (promptTitle) {
        const originalClick = btn.onclick;
        btn.addEventListener("click", function() {
          trackPromptUsage(promptTitle.textContent, "copy");
          // Allow the original click handler to proceed
        });
      }
    }
  });
});

// Search functionality
document.addEventListener("DOMContentLoaded", function() {
  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("search-button");

  function performSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const promptCategories = document.querySelectorAll(".prompt-category");

    if (searchTerm === "") {
      // If search is empty, restore default view
      promptCategories.forEach((cat) => (cat.style.display = "block"));
      document.querySelectorAll(".prompt-card").forEach((card) => (card.style.display = "block"));
      return;
    }

    // Show all categories for searching
    promptCategories.forEach((cat) => (cat.style.display = "block"));

    // Search in cards
    document.querySelectorAll(".prompt-card").forEach((card) => {
      const title = card.querySelector(".prompt-title").textContent.toLowerCase();
      const description = card.querySelector(".prompt-description").textContent.toLowerCase();
      const content = card.textContent.toLowerCase();

      if (title.includes(searchTerm) || description.includes(searchTerm) || content.includes(searchTerm)) {
        card.style.display = "block";
        // Make sure the parent category is visible
        const parentCategory = card.closest(".prompt-category");
        if (parentCategory) parentCategory.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });

    // Hide empty categories
    promptCategories.forEach((category) => {
      const visibleCards = Array.from(category.querySelectorAll('.prompt-card')).filter(card => 
        card.style.display !== "none"
      );
      if (visibleCards.length === 0) {
        category.style.display = "none";
      }
    });
  }

  if (searchButton) {
    searchButton.addEventListener("click", performSearch);
  }

  if (searchInput) {
    searchInput.addEventListener("keyup", (e) => {
      if (e.key === "Enter") {
        performSearch();
      }
    });
  }
});
