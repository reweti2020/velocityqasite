/**
 * QA Toolkit specific JavaScript functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log("QA Toolkit specific JS loading...");
    
    // Category buttons functionality
    const categoryButtons = document.querySelectorAll('.category-button');
    const resourceCategories = document.querySelectorAll('.resource-category');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log("Category button clicked:", this.getAttribute('data-category'));
            const category = this.getAttribute('data-category');
            
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show/hide categories based on selection
            if (category === 'all') {
                resourceCategories.forEach(cat => cat.style.display = 'block');
            } else {
                resourceCategories.forEach(cat => {
                    if (cat.getAttribute('data-category') === category) {
                        cat.style.display = 'block';
                    } else {
                        cat.style.display = 'none';
                    }
                });
            }
        });
    });
    
    // Toggle preview functionality
    const toggleButtons = document.querySelectorAll('.toggle-preview');
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log("Toggle preview button clicked:", this.getAttribute('data-id'));
            const previewId = this.getAttribute('data-id');
            togglePreview(previewId);
        });
    });
    
    // Function to toggle preview
    function togglePreview(previewId) {
        const previewElement = document.getElementById(previewId);
        
        if (!previewElement) {
            console.error(`Preview element with ID ${previewId} not found`);
            return;
        }
        
        if (previewElement.classList.contains('expanded')) {
            previewElement.classList.remove('expanded');
            document.querySelector(`[data-id="${previewId}"]`).textContent = 'Show More';
        } else {
            previewElement.classList.add('expanded');
            document.querySelector(`[data-id="${previewId}"]`).textContent = 'Show Less';
        }
    }
    
    // Download button functionality
    const downloadButtons = document.querySelectorAll('.resource-button');
    downloadButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log("Download button clicked:", this.getAttribute('data-resource'));
            const resourceId = this.getAttribute('data-resource');
            const resourceTitle = this.closest('.resource-card').querySelector('.resource-title').textContent;
            
            // Show notification for download
            showNotification(`Downloading ${resourceTitle}...`);
            
            // Trigger the download
            setTimeout(() => {
                downloadResource(resourceId, resourceTitle);
            }, 500);
        });
    });
    
    // Function to download resource
    function downloadResource(resourceId, resourceTitle) {
        // The formats available for download
        const formats = ['pdf', 'docx', 'xlsx'];
        
        // Create a download format selection dialog
        const formatDialog = document.createElement('div');
        formatDialog.className = 'format-dialog';
        formatDialog.innerHTML = `
            <div class="format-dialog-content">
                <h3>Select Download Format</h3>
                <div class="format-options">
                    ${formats.map(format => `
                        <button class="format-option" data-format="${format}">
                            ${format.toUpperCase()}
                        </button>
                    `).join('')}
                </div>
                <button class="format-dialog-close">Cancel</button>
            </div>
        `;
        
        // Add styles for the dialog
        const style = document.createElement('style');
        style.textContent = `
            .format-dialog {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1000;
            }
            .format-dialog-content {
                background: var(--card-bg);
                border: 1px solid var(--card-border);
                border-radius: 8px;
                padding: 24px;
                max-width: 400px;
                width: 90%;
                text-align: center;
            }
            .format-dialog-content h3 {
                margin-top: 0;
                margin-bottom: 16px;
                color: var(--text-primary);
            }
            .format-options {
                display: flex;
                justify-content: center;
                gap: 10px;
                margin-bottom: 20px;
            }
            .format-option {
                background: var(--gray-800);
                color: var(--text-primary);
                border: 1px solid var(--gray-700);
                border-radius: 4px;
                padding: 10px 15px;
                cursor: pointer;
                transition: all var(--transition-fast);
            }
            .format-option:hover {
                background: var(--accent-orange);
                color: white;
                border-color: var(--accent-orange);
            }
            .format-dialog-close {
                background: transparent;
                color: var(--text-secondary);
                border: 1px solid var(--gray-700);
                border-radius: 4px;
                padding: 8px 16px;
                cursor: pointer;
                transition: all var(--transition-fast);
            }
            .format-dialog-close:hover {
                color: var(--text-primary);
                border-color: var(--gray-600);
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(formatDialog);
        
        // Handle format selection
        const formatOptions = formatDialog.querySelectorAll('.format-option');
        formatOptions.forEach(option => {
            option.addEventListener('click', function() {
                const format = this.getAttribute('data-format');
                document.body.removeChild(formatDialog);
                
                // Create a blob and trigger download
                const content = `This is a simulated ${resourceTitle} file in ${format.toUpperCase()} format.`;
                const blob = new Blob([content], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                
                const a = document.createElement('a');
                a.href = url;
                a.download = `${resourceId}.${format}`;
                document.body.appendChild(a);
                a.click();
                
                // Clean up
                setTimeout(() => {
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                }, 100);
                
                showNotification(`${resourceTitle} downloaded successfully as ${format.toUpperCase()}!`);
            });
        });
        
        // Handle dialog close
        const closeButton = formatDialog.querySelector('.format-dialog-close');
        closeButton.addEventListener('click', function() {
            document.body.removeChild(formatDialog);
            showNotification('Download canceled');
        });
        
        // Close if clicked outside
        formatDialog.addEventListener('click', function(event) {
            if (event.target === formatDialog) {
                document.body.removeChild(formatDialog);
            }
        });
    }
    
    // Function for showing notifications
    function showNotification(message, type = 'success') {
        console.log(`Showing notification: ${message}`);
        
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        // Set icon based on type
        let icon = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
        `;
        
        if (type === 'error') {
            icon = `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="15" y1="9" x2="9" y2="15"></line>
                    <line x1="9" y1="9" x2="15" y2="15"></line>
                </svg>
            `;
        }
        
        notification.innerHTML = `${icon} ${message}`;
        
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
    
    // Search functionality
    const searchForm = document.querySelector('.search-form');
    const searchInput = document.getElementById('search-input');
    
    if (searchForm) {
        searchForm.addEventListener('submit', function(event) {
            event.preventDefault();
            performSearch();
        });
    }
    
    function performSearch() {
        if (!searchInput) return;
        
        const searchTerm = searchInput.value.toLowerCase().trim();
        console.log("Searching for:", searchTerm);
        
        if (searchTerm === '') {
            // Reset all resources to visible if search is empty
            resourceCategories.forEach(cat => cat.style.display = 'block');
            document.querySelectorAll('.resource-card').forEach(card => card.style.display = 'block');
            return;
        }
        
        // Make all categories visible initially
        resourceCategories.forEach(cat => cat.style.display = 'block');
        
        // Filter resource cards
        const resourceCards = document.querySelectorAll('.resource-card');
        let hasVisibleCards = {};
        
        resourceCards.forEach(card => {
            const title = card.querySelector('.resource-title').textContent.toLowerCase();
            const description = card.querySelector('.resource-description').textContent.toLowerCase();
            const tags = Array.from(card.querySelectorAll('.resource-tag'))
                .map(tag => tag.textContent.toLowerCase())
                .join(' ');
            
            const categorySection = card.closest('.resource-category');
            const categoryId = categorySection.getAttribute('data-category');
            
            if (title.includes(searchTerm) || 
                description.includes(searchTerm) || 
                tags.includes(searchTerm)) {
                card.style.display = 'block';
                hasVisibleCards[categoryId] = true;
            } else {
                card.style.display = 'none';
            }
        });
        
        // Hide categories with no visible cards
        resourceCategories.forEach(cat => {
            const categoryId = cat.getAttribute('data-category');
            if (!hasVisibleCards[categoryId]) {
                cat.style.display = 'none';
            }
        });
    }
    
    console.log("QA Toolkit specific JS loaded successfully!");
});
