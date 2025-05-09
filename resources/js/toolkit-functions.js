// Essential JavaScript functions for the toolkit
document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle functionality
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.documentElement.setAttribute('data-theme', 
                document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'
            );
        });
    }
    
    // Tab functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            const parentCard = this.closest('.prompt-card');
            
            // Remove active class from all tabs in this card
            parentCard.querySelectorAll('.tab-btn').forEach(tb => tb.classList.remove('active'));
            parentCard.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            parentCard.querySelector(`#${tabId}`).classList.add('active');
        });
    });
    
    // Category selection
    const categoryButtons = document.querySelectorAll('.category-button');
    const promptCategories = document.querySelectorAll('.prompt-category');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show/hide categories based on selection
            if (category === 'all') {
                promptCategories.forEach(cat => cat.style.display = 'block');
            } else {
                promptCategories.forEach(cat => {
                    if (cat.getAttribute('data-category') === category) {
                        cat.style.display = 'block';
                    } else {
                        cat.style.display = 'none';
                    }
                });
            }
        });
    });
    
    // Search functionality
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        if (searchTerm === '') {
            // If search is empty, restore default view
            promptCategories.forEach(cat => cat.style.display = 'block');
            document.querySelectorAll('.prompt-card').forEach(card => card.style.display = 'block');
            return;
        }
        
        // Show all categories for searching
        promptCategories.forEach(cat => cat.style.display = 'block');
        
        // Search in cards
        document.querySelectorAll('.prompt-card').forEach(card => {
            const title = card.querySelector('.prompt-title').textContent.toLowerCase();
            const description = card.querySelector('.prompt-description').textContent.toLowerCase();
            const content = card.textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm) || content.includes(searchTerm)) {
                card.style.display = 'block';
                // Make sure the parent category is visible
                const parentCategory = card.closest('.prompt-category');
                parentCategory.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
        
        // Hide empty categories
        promptCategories.forEach(category => {
            const visibleCards = category.querySelectorAll('.prompt-card[style="display: block;"]');
            if (visibleCards.length === 0) {
                category.style.display = 'none';
            }
        });
    }
    
    if (searchButton) {
        searchButton.addEventListener('click', performSearch);
    }
    
    if (searchInput) {
        searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
});

// Function to copy prompt text
function copyPrompt(id) {
    const promptElement = document.getElementById(id);
    const text = promptElement.textContent;
    
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Prompt copied to clipboard!');
    }).catch(err => {
        console.error('Could not copy text: ', err);
    });
}

// Function to move to next tab
function nextTab(baseId) {
    const structureTab = document.querySelector(`[data-tab="structure-${baseId}"]`);
    const contentTab = document.querySelector(`[data-tab="content-${baseId}"]`);
    
    structureTab.classList.remove('active');
    contentTab.classList.add('active');
    
    const structureContent = document.getElementById(`structure-${baseId}`);
    const contentContent = document.getElementById(`content-${baseId}`);
    
    structureContent.classList.remove('active');
    contentContent.classList.add('active');
}

// Function to generate the complete prompt
function generatePrompt(baseId) {
    // Get all input values
    const inputElements = document.querySelectorAll(`[id^="${baseId}-"]`);
    let inputData = {};
    
    inputElements.forEach(input => {
        const key = input.id.replace(`${baseId}-`, '');
        inputData[key] = input.value.trim();
    });
    
    // Get structure prompt
    const structurePrompt = document.getElementById(`${baseId}-structure`).textContent;
    
    // Generate the complete prompt based on the template and user inputs
    let outputPrompt = structurePrompt + "\n\nPHASE 2: CONTENT DEVELOPMENT\nNow, use the following specific details to populate the above framework:";
    
    // Add each input field with a label
    for (const [key, value] of Object.entries(inputData)) {
        if (value) {
            // Format key from camelCase or kebab-case to Title Case
            const formattedKey = key
                .replace(/-/g, ' ')
                .replace(/([A-Z])/g, ' $1')
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
                
            outputPrompt += `\n\n${formattedKey}: ${value}`;
        }
    }
    
    // Add final instructions
    outputPrompt += "\n\nPlease generate a detailed document following the structure provided in Phase 1, incorporating these specific details. Ensure the document is comprehensive, well-organized, and actionable.";
    
    // Display the complete prompt
    const outputElement = document.getElementById(`${baseId}-output`);
    outputElement.textContent = outputPrompt;
    
    // Update copy button text
    document.getElementById(`${baseId}-copy-btn`).textContent = "Copy Complete Prompt";
    
    showNotification('Complete prompt generated!');
}

// Function to copy the generated prompt
function copyGeneratedPrompt(baseId) {
    const outputElement = document.getElementById(`${baseId}-output`);
    
    if (outputElement.textContent.trim() === '') {
        // If nothing has been generated yet, generate first
        generatePrompt(baseId);
    }
    
    navigator.clipboard.writeText(outputElement.textContent).then(() => {
        const copyBtn = document.getElementById(`${baseId}-copy-btn`);
        copyBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"></path>
        </svg> Copied!`;
        copyBtn.classList.add('copied');
        
        setTimeout(() => {
            copyBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg> Copy Complete Prompt`;
            copyBtn.classList.remove('copied');
        }, 2000);
        
        showNotification('Complete prompt copied to clipboard!');
    }).catch(err => {
        console.error('Could not copy text: ', err);
    });
}

// Function to show notification
function showNotification(message) {
    // Remove any existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
        ${message}
    `;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Hide after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add this at the end of the file
console.log('Toolkit JavaScript loaded successfully!');
