/**
 * AI Toolkit specific JavaScript functionality
 */

// These functions are implemented in toolkit-functions.js
// This file just contains the AI toolkit specific functions that depend on those
// core functions

// Function to handle the "Next Step" button click
function nextTab(baseId) {
  const structureTab = document.querySelector(`[data-tab="structure-${baseId}"]`)
  const contentTab = document.querySelector(`[data-tab="content-${baseId}"]`)

  if (!structureTab || !contentTab) {
    console.error(`Tabs for ${baseId} not found`)
    return
  }

  // Update tab buttons
  structureTab.classList.remove("active")
  contentTab.classList.add("active")

  // Mark the first tab as completed
  structureTab.classList.add("completed")

  // Update tab content
  const structureContent = document.getElementById(`structure-${baseId}`)
  const contentContent = document.getElementById(`content-${baseId}`)

  if (!structureContent || !contentContent) {
    console.error(`Tab content for ${baseId} not found`)
    return
  }

  structureContent.classList.remove("active")
  contentContent.classList.add("active")

  // Scroll to the content tab if needed
  contentContent.scrollIntoView({ behavior: "smooth", block: "nearest" })
}

// Function to copy the generated prompt
function copyGeneratedPrompt(baseId) {
  const outputElement = document.getElementById(`${baseId}-output`)

  if (!outputElement) {
    console.error(`Output element for ${baseId} not found`)
    return
  }

  if (outputElement.textContent.trim() === "") {
    // If nothing has been generated yet, generate first
    generatePrompt(baseId)
  }

  navigator.clipboard
    .writeText(outputElement.textContent)
    .then(() => {
      const copyBtn = document.getElementById(`${baseId}-copy-btn`)
      if (copyBtn) {
        copyBtn.innerHTML = `
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"></path>
          </svg>
          Copied!
        `
        copyBtn.classList.add("copied")

        setTimeout(() => {
          copyBtn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
            Copy Complete Prompt
          `
          copyBtn.classList.remove("copied")
        }, 2000)
      }

      showNotification("Complete prompt copied to clipboard!")
    })
    .catch((err) => {
      console.error("Could not copy text: ", err)
      showNotification("Failed to copy. Please try again.", "error")
    })
}

// Function to copy a prompt
function copyPrompt(id) {
  const element = document.getElementById(id);
  if (!element) {
    console.error(`Element with ID ${id} not found`);
    showNotification("Could not find content to copy", "error");
    return;
  }
  
  const text = element.innerText.trim();
  if (!text) {
    showNotification("Content is empty", "error");
    return;
  }
  
  navigator.clipboard.writeText(text)
    .then(() => {
      showNotification("Prompt copied to clipboard!");
      
      // Update button state if it triggered the copy
      const button = document.querySelector(`[onclick*="${id}"]`);
      if (button) {
        const originalHTML = button.innerHTML;
        button.innerHTML = `
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"></path>
          </svg>
          Copied!
        `;
        button.classList.add('copied');
        
        setTimeout(() => {
          button.innerHTML = originalHTML;
          button.classList.remove('copied');
        }, 2000);
      }
    })
    .catch((err) => {
      console.error("Could not copy text: ", err);
      showNotification("Failed to copy. Please try again.", "error");
    });
}

// Function to track prompt usage
function trackPromptUsage(promptId, action) {
  // This would typically send analytics data to a backend
  console.log(`Prompt ${promptId} ${action}`)

  // For demonstration purposes, we'll just increment a counter in localStorage
  const usageKey = `prompt-${promptId}-${action}`
  const currentCount = Number.parseInt(localStorage.getItem(usageKey) || "0")
  localStorage.setItem(usageKey, currentCount + 1)
}

// Initialize prompt usage tracking
document.addEventListener("DOMContentLoaded", () => {
  // Track copy events
  document.querySelectorAll(".copy-btn").forEach((btn) => {
    const originalClick = btn.onclick
    btn.onclick = function (e) {
      const promptId = this.closest(".prompt-card").querySelector(".prompt-title").textContent
      trackPromptUsage(promptId, "copy")
      if (originalClick) originalClick.call(this, e)
    }
  })

  // Track generate events
  document.querySelectorAll(".generate-btn").forEach((btn) => {
    const originalClick = btn.onclick
    btn.onclick = function (e) {
      const promptId = this.closest(".prompt-card").querySelector(".prompt-title").textContent
      trackPromptUsage(promptId, "generate")
      if (originalClick) originalClick.call(this, e)
    }
  })
})

// Add keyboard shortcuts
document.addEventListener("keydown", (e) => {
  // Ctrl/Cmd + / to focus search
  if ((e.ctrlKey || e.metaKey) && e.key === "/") {
    e.preventDefault()
    const searchInput = document.getElementById("search-input")
    if (searchInput) searchInput.focus()
  }
})

console.log("AI toolkit specific JS loaded");
