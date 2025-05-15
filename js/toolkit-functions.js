// Simple toolkit functions - minimal approach
document.addEventListener("DOMContentLoaded", function() {
  // Add direct click handlers to all buttons with onclick attributes
  document.querySelectorAll("[onclick]").forEach(function(element) {
    const onclickAttr = element.getAttribute("onclick");
    if (onclickAttr && onclickAttr.includes("copyPrompt")) {
      element.addEventListener("click", function(event) {
        event.preventDefault();
        const match = onclickAttr.match(/copyPrompt\(['"]([^'"]+)['"]\)/);
        if (match && match[1]) {
          const id = match[1];
          const content = document.getElementById(id).textContent;
          copyToClipboard(content, element);
        }
      });
    } else if (onclickAttr && onclickAttr.includes("nextTab")) {
      element.addEventListener("click", function(event) {
        event.preventDefault();
        const match = onclickAttr.match(/nextTab\(['"]([^'"]+)['"]\)/);
        if (match && match[1]) {
          const id = match[1];
          switchToNextTab(id);
        }
      });
    } else if (onclickAttr && onclickAttr.includes("copyGeneratedPrompt")) {
      element.addEventListener("click", function(event) {
        event.preventDefault();
        const match = onclickAttr.match(/copyGeneratedPrompt\(['"]([^'"]+)['"]\)/);
        if (match && match[1]) {
          const id = match[1];
          copyGeneratedPrompt(id, element);
        }
      });
    } else if (onclickAttr && onclickAttr.includes("generatePrompt")) {
      element.addEventListener("click", function(event) {
        event.preventDefault();
        const match = onclickAttr.match(/generatePrompt\(['"]([^'"]+)['"]\)/);
        if (match && match[1]) {
          const id = match[1];
          generatePrompt(id);
        }
      });
    }
  });
  
  // Simplest possible tab switching
  document.querySelectorAll(".tab-btn").forEach(function(tab) {
    tab.addEventListener("click", function() {
      const tabId = this.getAttribute("data-tab");
      const parentCard = this.closest(".prompt-card");
      
      if (parentCard && tabId) {
        // Deactivate all tabs and contents
        parentCard.querySelectorAll(".tab-btn").forEach(t => t.classList.remove("active"));
        parentCard.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));
        
        // Activate selected tab and content
        this.classList.add("active");
        const contentElement = document.getElementById(tabId);
        if (contentElement) {
          contentElement.classList.add("active");
        }
      }
    });
  });
  
  // Category filter functionality
  document.querySelectorAll(".category-button").forEach(function(button) {
    button.addEventListener("click", function() {
      const category = this.getAttribute("data-category");
      
      // Remove active class from all category buttons
      document.querySelectorAll(".category-button").forEach(btn => {
        btn.classList.remove("active");
      });
      
      // Add active class to clicked button
      this.classList.add("active");
      
      // Show/hide categories
      document.querySelectorAll(".prompt-category").forEach(cat => {
        if (category === "all" || cat.getAttribute("data-category") === category) {
          cat.style.display = "block";
        } else {
          cat.style.display = "none";
        }
      });
    });
  });
});

// Function to switch to the next tab
function switchToNextTab(baseId) {
  const structureTab = document.querySelector(`[data-tab="structure-${baseId}"]`);
  const contentTab = document.querySelector(`[data-tab="content-${baseId}"]`);
  
  if (!structureTab || !contentTab) return;
  
  // Update tab classes
  structureTab.classList.remove("active");
  contentTab.classList.add("active");
  
  // Update content visibility
  const structureContent = document.getElementById(`structure-${baseId}`);
  const contentSection = document.getElementById(`content-${baseId}`);
  
  if (structureContent) structureContent.classList.remove("active");
  if (contentSection) contentSection.classList.add("active");
}

// Function to generate prompt by combining structure with form inputs
function generatePrompt(baseId) {
  // Get all input values
  const inputElements = document.querySelectorAll(`[id^="${baseId}-"]`);
  if (inputElements.length === 0) {
    console.error(`No input elements found for base ID: ${baseId}`);
    showNotification("Error generating prompt. Please try again.", "error");
    return;
  }

  const inputData = {};

  inputElements.forEach((input) => {
    if (input.id === `${baseId}-structure` || input.id === `${baseId}-output`) return;
    if (input.tagName === "INPUT" || input.tagName === "TEXTAREA") {
      const key = input.id.replace(`${baseId}-`, "");
      inputData[key] = input.value.trim();
    }
  });

  // Get structure prompt
  const structurePromptElement = document.getElementById(`${baseId}-structure`);
  if (!structurePromptElement) {
    console.error(`Structure prompt element not found for base ID: ${baseId}`);
    showNotification("Error generating prompt. Please try again.", "error");
    return;
  }

  const structurePrompt = structurePromptElement.textContent;

  // Generate the complete prompt based on the template and user inputs
  let outputPrompt =
    structurePrompt +
    "\n\nPHASE 2: CONTENT DEVELOPMENT\nNow, use the following specific details to populate the above framework:";

  // Add each input field with a label
  for (const [key, value] of Object.entries(inputData)) {
    if (value) {
      // Format key from camelCase or kebab-case to Title Case
      const formattedKey = key
        .replace(/-/g, " ")
        .replace(/([A-Z])/g, " $1")
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      outputPrompt += `\n\n${formattedKey}: ${value}`;
    }
  }

  // Add final instructions
  outputPrompt +=
    "\n\nPlease generate a detailed document following the structure provided in Phase 1, incorporating these specific details. Ensure the document is comprehensive, well-organized, and actionable.";

  // Display the complete prompt
  const outputElement = document.getElementById(`${baseId}-output`);
  if (!outputElement) {
    console.error(`Output element not found for base ID: ${baseId}`);
    showNotification("Error generating prompt. Please try again.", "error");
    return;
  }

  outputElement.textContent = outputPrompt;

  // Update copy button text
  const copyBtn = document.getElementById(`${baseId}-copy-btn`);
  if (copyBtn) {
    copyBtn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
      </svg>
      Copy Complete Prompt
    `;
  }

  showNotification("Complete prompt generated!");
  
  // Scroll to the output
  outputElement.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

// Function to copy generated prompt to clipboard
function copyGeneratedPrompt(baseId, buttonElement) {
  const outputElement = document.getElementById(`${baseId}-output`);
  
  if (!outputElement) {
    console.error(`Output element for ${baseId} not found`);
    return;
  }
  
  // If no content generated yet, generate it first
  if (outputElement.textContent.trim() === "") {
    generatePrompt(baseId);
  }
  
  // Use enhanced clipboard function for maximum browser compatibility
  copyToClipboardEnhanced(outputElement.textContent, buttonElement);
}

// Function to copy text to clipboard with fallback methods
function copyToClipboardEnhanced(text, buttonElement) {
  if (!text) return;
  
  // First try the modern clipboard API
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text)
      .then(() => {
        showCopySuccess(buttonElement);
      })
      .catch(err => {
        console.error("Clipboard API failed:", err);
        // Fall back to execCommand method
        fallbackCopyToClipboard(text, buttonElement);
      });
  } else {
    // Use fallback for non-secure contexts
    fallbackCopyToClipboard(text, buttonElement);
  }
}

// Fallback clipboard copy method using execCommand
function fallbackCopyToClipboard(text, buttonElement) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  
  // Make the textarea out of viewport
  textArea.style.position = "fixed";
  textArea.style.left = "-999999px";
  textArea.style.top = "-999999px";
  document.body.appendChild(textArea);
  
  textArea.focus();
  textArea.select();
  
  try {
    const successful = document.execCommand('copy');
    if (successful) {
      showCopySuccess(buttonElement);
    } else {
      showNotification("Failed to copy. Please try manually selecting the text.", "error");
    }
  } catch (err) {
    console.error("execCommand error:", err);
    showNotification("Failed to copy. Please try manually selecting the text.", "error");
  }
  
  document.body.removeChild(textArea);
}

// Show copy success UI feedback
function showCopySuccess(buttonElement) {
  // Show success feedback on button
  if (buttonElement) {
    const originalText = buttonElement.innerHTML;
    buttonElement.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path></svg> Copied!';
    buttonElement.classList.add("copied");
    
    setTimeout(() => {
      buttonElement.innerHTML = originalText;
      buttonElement.classList.remove("copied");
    }, 2000);
  }
  
  // Show notification
  showNotification("Copied to clipboard!");
}

// Function for simple copy operations
function copyToClipboard(text, buttonElement) {
  copyToClipboardEnhanced(text, buttonElement);
}

// Simple notification function
function showNotification(message, type = "success") {
  // Remove existing notifications
  const existingNotification = document.querySelector(".notification");
  if (existingNotification) existingNotification.remove();
  
  // Create notification
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.textContent = message;
  
  // Add to page
  document.body.appendChild(notification);
  
  // Show and then hide
  setTimeout(() => {
    notification.classList.add("show");
  }, 10);
  
  setTimeout(() => {
    notification.classList.remove("show");
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}
