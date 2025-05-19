// Function to generate the complete prompt
function generatePrompt(baseId) {
  console.log(`Generating prompt for ${baseId}`);
  
  // Get all input values
  const inputElements = document.querySelectorAll(`[id^="${baseId}-"]`)
  if (inputElements.length === 0) {
    console.error(`No input elements found for base ID: ${baseId}`)
    showNotification("Error generating prompt. Please try again.", "error")
    return
  }

  const inputData = {}

  inputElements.forEach((input) => {
    if (input.id === `${baseId}-structure` || input.id === `${baseId}-output`) return
    const key = input.id.replace(`${baseId}-`, "")
    inputData[key] = input.value.trim()
  })

  // Get structure prompt
  const structurePromptElement = document.getElementById(`${baseId}-structure`)
  if (!structurePromptElement) {
    console.error(`Structure prompt element not found for base ID: ${baseId}`)
    showNotification("Error generating prompt. Please try again.", "error")
    return
  }

  const structurePrompt = structurePromptElement.textContent

  // Generate the complete prompt based on the template and user inputs
  let outputPrompt =
    structurePrompt +
    "\n\nPHASE 2: CONTENT DEVELOPMENT\nNow, use the following specific details to populate the above framework:"

  // Add each input field with a label
  for (const [key, value] of Object.entries(inputData)) {
    if (value) {
      // Format key from camelCase or kebab-case to Title Case
      const formattedKey = key
        .replace(/-/g, " ")
        .replace(/([A-Z])/g, " $1")
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")

      outputPrompt += `\n\n${formattedKey}: ${value}`
    }
  }

  // Add final instructions
  outputPrompt +=
    "\n\nPlease generate a detailed document following the structure provided in Phase 1, incorporating these specific details. Ensure the document is comprehensive, well-organized, and actionable."

  // Display the complete prompt
  const outputElement = document.getElementById(`${baseId}-output`)
  if (!outputElement) {
    console.error(`Output element not found for base ID: ${baseId}`)
    showNotification("Error generating prompt. Please try again.", "error")
    return
  }

  outputElement.textContent = outputPrompt
  console.log(`Generated prompt content (${outputPrompt.length} characters)`);

  // Update copy button text
  const copyBtn = document.getElementById(`${baseId}-copy-btn`)
  if (copyBtn) {
    copyBtn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
      </svg>
      Copy Complete Prompt
    `
  }

  showNotification("Complete prompt generated!")
  
  // Scroll to the output
  outputElement.scrollIntoView({ behavior: "smooth", block: "nearest" })
  
  return outputPrompt;
}

// Function to show notification
function showNotification(message, type = "success") {
  console.log(`Showing notification: ${message} (${type})`);
  
  // Remove any existing notifications
  const existingNotification = document.querySelector(".notification")
  if (existingNotification) {
    existingNotification.remove()
  }

  // Create notification element
  const notification = document.createElement("div")
  notification.className = `notification ${type}`

  // Set icon based on type
  let icon = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
  `

  if (type === "error") {
    icon = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="15" y1="9" x2="9" y2="15"></line>
        <line x1="9" y1="9" x2="15" y2="15"></line>
      </svg>
    `
  }

  notification.innerHTML = `${icon} ${message}`

  // Add to document
  document.body.appendChild(notification)

  // Show notification
  setTimeout(() => {
    notification.classList.add("show")
  }, 10)

  // Hide after 3 seconds
  setTimeout(() => {
    notification.classList.remove("show")
    setTimeout(() => {
      notification.remove()
    }, 300)
  }, 3000)
}

// Function to copy prompt
function copyPrompt(id) {
  console.log(`Original copyPrompt function called with id: ${id}`);
  
  // Get the element with the text
  const element = document.getElementById(id);
  if (!element) {
    console.error(`Element with ID ${id} not found`);
    showNotification('Could not find content to copy', 'error');
    return;
  }
  
  const text = element.innerText.trim();
  if (!text) {
    showNotification('Content is empty', 'error');
    return;
  }
  
  navigator.clipboard.writeText(text)
    .then(() => {
      showNotification('Prompt copied to clipboard!');
      
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

function copyGeneratedPrompt(baseId) {
  console.log(`Original copyGeneratedPrompt function called with baseId: ${baseId}`);
  
  // Make sure the prompt is generated
  const outputElement = document.getElementById(`${baseId}-output`);
  if (!outputElement || outputElement.textContent.trim() === '') {
    generatePrompt(baseId);
  }
  
  // Get the element after possibly generating
  const element = document.getElementById(`${baseId}-output`);
  if (!element) {
    console.error(`Element with ID ${baseId}-output not found`);
    showNotification('Could not find content to copy', 'error');
    return;
  }
  
  const text = element.innerText.trim();
  if (!text) {
    showNotification('Content is empty', 'error');
    return;
  }
  
  navigator.clipboard.writeText(text)
    .then(() => {
      showNotification('Complete prompt copied to clipboard!');
      
      // Update button state
      const copyBtn = document.getElementById(`${baseId}-copy-btn`);
      if (copyBtn) {
        copyBtn.innerHTML = `
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"></path>
          </svg>
          Copied!
        `;
        copyBtn.classList.add('copied');

        setTimeout(() => {
          copyBtn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
            Copy Complete Prompt
          `;
          copyBtn.classList.remove('copied');
        }, 2000);
      }
    })
    .catch((err) => {
      console.error("Could not copy text: ", err);
      showNotification("Failed to copy. Please try again.", "error");
    });
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded - initializing toolkit functions");
  
  // Theme toggle functionality
  const themeToggle = document.querySelector(".theme-toggle")
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme")
      const newTheme = currentTheme === "dark" ? "light" : "dark"
      
      document.documentElement.setAttribute("data-theme", newTheme)
      localStorage.setItem("theme", newTheme)
      
      // Update the icon
      updateThemeIcon(newTheme)
    })
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
      document.documentElement.setAttribute("data-theme", savedTheme)
      updateThemeIcon(savedTheme)
    }
  }

  // Tab functionality
  const tabBtns = document.querySelectorAll(".tab-btn")
  tabBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const tabId = this.getAttribute("data-tab")
      const parentCard = this.closest(".prompt-card")

      // Remove active class from all tabs in this card
      parentCard.querySelectorAll(".tab-btn").forEach((tb) => tb.classList.remove("active"))
      parentCard.querySelectorAll(".tab-content").forEach((tc) => tc.classList.remove("active"))

      // Add active class to clicked tab and corresponding content
      this.classList.add("active")
      parentCard.querySelector(`#${tabId}`).classList.add("active")
    })
  })

  // Category selection
  const categoryButtons = document.querySelectorAll(".category-button")
  const promptCategories = document.querySelectorAll(".prompt-category")

  categoryButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const category = this.getAttribute("data-category")

      // Remove active class from all buttons
      categoryButtons.forEach((btn) => btn.classList.remove("active"))

      // Add active class to clicked button
      this.classList.add("active")

      // Show/hide categories based on selection
      if (category === "all") {
        promptCategories.forEach((cat) => (cat.style.display = "block"))
      } else {
        promptCategories.forEach((cat) => {
          if (cat.getAttribute("data-category") === category) {
            cat.style.display = "block"
          } else {
            cat.style.display = "none"
          }
        })
      }
    })
  })

  // Search functionality
  const searchInput = document.getElementById("search-input")
  const searchButton = document.getElementById("search-button")

  function performSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim()

    if (searchTerm === "") {
      // If search is empty, restore default view
      promptCategories.forEach((cat) => (cat.style.display = "block"))
      document.querySelectorAll(".prompt-card").forEach((card) => (card.style.display = "block"))
      return
    }

    // Show all categories for searching
    promptCategories.forEach((cat) => (cat.style.display = "block"))

    // Search in cards
    document.querySelectorAll(".prompt-card").forEach((card) => {
      const title = card.querySelector(".prompt-title").textContent.toLowerCase()
      const description = card.querySelector(".prompt-description").textContent.toLowerCase()
      const content = card.textContent.toLowerCase()

      if (title.includes(searchTerm) || description.includes(searchTerm) || content.includes(searchTerm)) {
        card.style.display = "block"
        // Make sure the parent category is visible
        const parentCategory = card.closest(".prompt-category")
        parentCategory.style.display = "block"
      } else {
        card.style.display = "none"
      }
    })

    // Hide empty categories
    promptCategories.forEach((category) => {
      const visibleCards = category.querySelectorAll('.prompt-card[style="display: block;"]')
      if (visibleCards.length === 0) {
        category.style.display = "none"
      }
    })
  }

  if (searchButton) {
    searchButton.addEventListener("click", performSearch)
  }

  if (searchInput) {
    searchInput.addEventListener("keyup", (e) => {
      if (e.key === "Enter") {
        performSearch()
      }
    })
  }
  
  console.log("All toolkit functions initialized");
})

function updateThemeIcon(theme) {
  const themeToggle = document.querySelector(".theme-toggle")
  if (!themeToggle) return

  if (theme === "dark") {
    themeToggle.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="theme-icon-light">
        <path d="M12 9c1.65 0 3 1.35 3 3s-1.35 3-3 3-3-1.35-3-3 1.35-3 3-3M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.42 0-.39.39-.39 1.03 0 1.42l1.42 1.42c.39.39 1.03.39 1.42 0 .39-.39.39-1.03 0-1.42L5.99 4.58zm12.42 12.42c-.39-.39-1.03-.39-1.42 0-.39.39-.39 1.03 0 1.42l1.42 1.42c.39.39 1.03.39 1.42 0 .39-.39.39-1.03 0-1.42l-1.42-1.42zM18.01 4.58l-1.42 1.42c-.39.39-.39 1.03 0 1.42.39.39 1.03.39 1.42 0l1.42-1.42c.39-.39.39-1.03 0-1.42-.39-.39-1.03-.39-1.42 0zM5.59 16.99l-1.42 1.42c-.39.39-.39 1.03 0 1.42.39.39 1.03.39 1.42 0l1.42-1.42c.39-.39.39-1.03 0-1.42-.39-.39-1.03-.39-1.42 0z"/>
      </svg>
    `
  } else {
    themeToggle.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="theme-icon-dark">
        <path d="M10 2c-1.82 0-3.53.5-5 1.35C2.99 4.82 2 7.34 2 10c0 5.52 4.48 10 10 10s10-4.48 10-10S17.52 0 12 0L10 2zm0 18c-4.41 0-8-3.59-8-8 0-3.36 2.08-6.23 5-7.41C5.62 5.73 5 7.79 5 10c0 4.41 3.59 8 8 8s8-3.59 8-8c0-2.21-.9-4.21-2.35-5.65C17.79 17.85 14.23 20 10 20z" fill="currentColor"/>
      </svg>
    `
  }
}

// Function to move to next tab
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

// Add this at the end of the file
console.log("Toolkit functions loaded successfully!");