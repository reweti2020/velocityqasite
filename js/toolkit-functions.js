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
          copyPrompt(id);
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
          copyGeneratedPrompt(id);
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

// Function to copy prompt text
function copyPrompt(id) {
  const promptElement = document.getElementById(id);
  if (!promptElement) {
    console.error(`Element with ID ${id} not found`);
    return;
  }

  const text = promptElement.textContent || promptElement.innerText;
  console.log("Attempting to copy text:", text.substring(0, 50) + "...");

  // Try modern clipboard API first
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text)
      .then(() => {
        updateCopyButtonUI(id);
        showNotification("Prompt copied to clipboard!");
      })
      .catch((err) => {
        console.error("Clipboard API error:", err);
        fallbackCopyMethod(text, id);
      });
  } else {
    // Use fallback method
    fallbackCopyMethod(text, id);
  }
}

// Fallback copy method using execCommand and textarea
function fallbackCopyMethod(text, id) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.width = "2em";
  textArea.style.height = "2em";
  textArea.style.padding = "0";
  textArea.style.border = "none";
  textArea.style.outline = "none";
  textArea.style.boxShadow = "none";
  textArea.style.background = "transparent";
  textArea.style.opacity = "0";
  document.body.appendChild(textArea);
  
  textArea.focus();
  textArea.select();
  
  try {
    const successful = document.execCommand('copy');
    if (successful) {
      updateCopyButtonUI(id);
      showNotification("Prompt copied to clipboard!");
    } else {
      showNotification("Failed to copy. Please try again.", "error");
    }
  } catch (err) {
    console.error('Fallback copy method failed:', err);
    showNotification("Failed to copy. Please try again.", "error");
  }
  
  document.body.removeChild(textArea);
}

// Update button UI helper
function updateCopyButtonUI(id) {
  const copyBtn = document.querySelector(`[onclick="copyPrompt('${id}')"]`);
  if (copyBtn) {
    const originalHTML = copyBtn.innerHTML;
    copyBtn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"></path>
      </svg>
      Copied!
    `;
    copyBtn.classList.add("copied");

    setTimeout(() => {
      copyBtn.innerHTML = originalHTML;
      copyBtn.classList.remove("copied");
    }, 2000);
  }
}

// Function to copy generated prompt to clipboard
function copyGeneratedPrompt(baseId) {
  const outputElement = document.getElementById(`${baseId}-output`);
  
  if (!outputElement) {
    console.error(`Output element for ${baseId} not found`);
    return;
  }
  
  // If no content generated yet, generate it first
  if (outputElement.textContent.trim() === "") {
    generatePrompt(baseId);
  }
  
  const text = outputElement.textContent;
  console.log("Attempting to copy generated prompt:", text.substring(0, 50) + "...");
  
  // Try modern clipboard API first
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text)
      .then(() => {
        updateGeneratedCopyButtonUI(baseId);
        showNotification("Complete prompt copied to clipboard!");
      })
      .catch((err) => {
        console.error("Clipboard API error:", err);
        fallbackCopyGeneratedMethod(text, baseId);
      });
  } else {
    // Use fallback method
    fallbackCopyGeneratedMethod(text, baseId);
  }
}

// Fallback copy method for generated prompts
function fallbackCopyGeneratedMethod(text, baseId) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.width = "2em";
  textArea.style.height = "2em";
  textArea.style.padding = "0";
  textArea.style.border = "none";
  textArea.style.outline = "none";
  textArea.style.boxShadow = "none";
  textArea.style.background = "transparent";
  textArea.style.opacity = "0";
  document.body.appendChild(textArea);
  
  textArea.focus();
  textArea.select();
  
  try {
    const successful = document.execCommand('copy');
    if (successful) {
      updateGeneratedCopyButtonUI(baseId);
      showNotification("Complete prompt copied to clipboard!");
    } else {
      showNotification("Failed to copy. Please try again.", "error");
    }
  } catch (err) {
    console.error('Fallback copy method failed:', err);
    showNotification("Failed to copy. Please try again.", "error");
  }
  
  document.body.removeChild(textArea);
}

// Update generated prompt button UI
function updateGeneratedCopyButtonUI(baseId) {
  const copyBtn = document.getElementById(`${baseId}-copy-btn`);
  if (copyBtn) {
    copyBtn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"></path>
      </svg>
      Copied!
    `;
    copyBtn.classList.add("copied");

    setTimeout(() => {
      copyBtn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
        Copy Complete Prompt
      `;
      copyBtn.classList.remove("copied");
    }, 2000);
  }
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