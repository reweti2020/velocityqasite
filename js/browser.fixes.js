/**
 * VelocityQA Browser Fix
 * Makes the Add Package button visible on service pages
 */
(function() {
    // Run on page load and after a short delay
    document.addEventListener('DOMContentLoaded', fixAddPackageButton);
    window.addEventListener('load', function() {
        // Run immediately and again after a delay
        fixAddPackageButton();
        setTimeout(fixAddPackageButton, 500);
    });
    
    function fixAddPackageButton() {
        // Check if we're on a service page that should have the button
        if (isServicePage()) {
            // Look for existing floating buttons
            const floatingButtons = document.querySelectorAll('.floating-add-button, #floating-add-button, #addPackageButton');
            
            if (floatingButtons.length > 0) {
                // Fix existing buttons
                floatingButtons.forEach(button => {
                    // Make button visible in all browsers
                    button.style.display = "flex";
                    button.style.position = "fixed";
                    button.style.bottom = "6rem";
                    button.style.right = "20px";
                    button.style.opacity = "1";
                    button.style.zIndex = "9999";
                    button.style.transform = "none"; // Reset any transforms
                });
            } else {
                // Create a button if none exists
                createFloatingButton();
            }
        }
    }
    
    // Create the Add Package button
    function createFloatingButton() {
        const packageType = detectPackageFromURL();
        
        if (packageType) {
            const button = document.createElement('a');
            button.id = 'addPackageButton';
            button.className = 'floating-add-button';
            button.href = `contact.html?package=${packageType}&add=true`;
            button.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="16"></line>
                    <line x1="8" y1="12" x2="16" y2="12"></line>
                </svg>
                <span>Add Package</span>
            `;
            
            // Style the button
            button.style.position = 'fixed';
            button.style.bottom = '6rem';
            button.style.right = '20px';
            button.style.display = 'flex';
            button.style.alignItems = 'center';
            button.style.backgroundColor = '#ff6b00';
            button.style.color = 'white';
            button.style.padding = '0.75rem 1.5rem';
            button.style.borderRadius = '8px';
            button.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            button.style.textDecoration = 'none';
            button.style.fontWeight = '600';
            button.style.fontSize = '1rem';
            button.style.transition = 'all 0.3s ease';
            button.style.zIndex = '9999';
            button.style.opacity = '1';
            
            // Append to document
            document.body.appendChild(button);
        }
    }
    
    // Helper function to check if we're on a service page
    function isServicePage() {
        return document.location.pathname.includes('bug-hunter') || 
               document.location.pathname.includes('user-journey') ||
               document.location.pathname.includes('system-auditor') ||
               document.location.pathname.includes('precision-strike') ||
               document.location.pathname.includes('automation');
    }
    
    // Helper function to detect package type from URL
    function detectPackageFromURL() {
        if (document.location.pathname.includes('bug-hunter')) {
            return 'bug-hunter';
        } else if (document.location.pathname.includes('user-journey')) {
            return 'user-journey';
        } else if (document.location.pathname.includes('system-auditor')) {
            return 'system-auditor';
        } else if (document.location.pathname.includes('precision-strike')) {
            return 'precision-strike';
        } else if (document.location.pathname.includes('automation')) {
            return 'automation';
        }
        return '';
    }
})();
