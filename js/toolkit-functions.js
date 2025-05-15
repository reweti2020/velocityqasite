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
          const structureContent = document.getElementById(`${id}-structure`).textContent;
          const outputElement = document.getElementById(`${id}-output`);
          
          // If there's already content in the output, copy it
          if (outputElement && outputElement.textContent.trim() !== "") {
            copyToClipboard(outputElement.textContent, element);
          } 
          // Otherwise copy the structure content
          else {
            copyToClipboard(structureContent, element);
          }
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

// Function to copy text to clipboard
function copyToClipboard(text, buttonElement) {
  if (!text) return;
  
  navigator.clipboard.writeText(text)
    .then(() => {
      // Show success feedback
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
    })
    .catch(err => {
      console.error("Error copying to clipboard:", err);
      showNotification("Failed to copy. Please try again.", "error");
    });
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
