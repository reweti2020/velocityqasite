/**
 * Simple browser compatibility fix for VelocityQA website
 * Specifically targets the floating add package button visibility
 * and contact form population issues
 */
(function() {
    // Run when DOM is fully loaded
    document.addEventListener('DOMContentLoaded', function() {
        // Fix floating add package buttons
        fixFloatingButtons();
        
        // Fix contact form population issues
        fixContactFormPopulation();
    });
    
    // Fix floating buttons across all browsers
    function fixFloatingButtons() {
        const floatingButtons = document.querySelectorAll('.floating-add-button, #floating-add-button, #addPackageButton');
        
        floatingButtons.forEach(button => {
            // Make sure the button is visible
            button.style.opacity = '1';
            button.style.zIndex = '9999';
            
            // Reset any positioning that might be hiding it
            if (window.getComputedStyle(button).right === '-150px') {
                button.style.right = '0';
            }
            
            // Ensure clicks properly save the package info
            button.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href && href.includes('?package=') && href.includes('&add=true')) {
                    const urlParams = new URLSearchParams(href.split('?')[1]);
                    const packageType = urlParams.get('package');
                    
                    if (packageType) {
                        localStorage.setItem('selectedPackage', packageType);
                        localStorage.setItem('addPackage', 'true');
                    }
                }
            });
        });
        
        // If we're on a service page but don't have a floating button, create one
        if (document.location.pathname.includes('bug-hunter') || 
            document.location.pathname.includes('user-journey') ||
            document.location.pathname.includes('system-auditor') ||
            document.location.pathname.includes('precision-strike') ||
            document.location.pathname.includes('automation')) {
            
            if (floatingButtons.length === 0) {
                createMissingFloatingButton();
            }
        }
    }
    
    // Create a missing floating button if needed
    function createMissingFloatingButton() {
        if (document.getElementById('addPackageButton')) {
            return; // Button already exists
        }
        
        // Determine package type from URL
        let packageType = '';
        if (document.location.pathname.includes('bug-hunter')) {
            packageType = 'bug-hunter';
        } else if (document.location.pathname.includes('user-journey')) {
            packageType = 'user-journey';
        } else if (document.location.pathname.includes('system-auditor')) {
            packageType = 'system-auditor';
        } else if (document.location.pathname.includes('precision-strike')) {
            packageType = 'precision-strike';
        } else if (document.location.pathname.includes('automation')) {
            packageType = 'automation';
        }
        
        if (packageType) {
            // Create the button
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
            button.style.backgroundColor = 'var(--orange, #ff6b00)';
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
            
            document.body.appendChild(button);
        }
    }
    
    // Fix contact form population issues
    function fixContactFormPopulation() {
        // Check if we're on the contact page
        if (document.getElementById('contactForm')) {
            // Check URL parameters first
            const urlParams = new URLSearchParams(window.location.search);
            const packageParam = urlParams.get('package');
            const addParam = urlParams.get('add');
            
            // If URL parameters don't exist, check localStorage
            const storedPackage = localStorage.getItem('selectedPackage');
            const storedAdd = localStorage.getItem('addPackage');
            
            // Determine which package to select
            const packageToSelect = packageParam || storedPackage;
            const isAddOperation = (addParam === 'true') || (storedAdd === 'true');
            
            if (packageToSelect && isAddOperation) {
                // Clear localStorage after using it
                localStorage.removeItem('selectedPackage');
                localStorage.removeItem('addPackage');
                
                // Find and check the checkbox
                const checkbox = document.getElementById(packageToSelect);
                if (checkbox) {
                    checkbox.checked = true;
                    
                    // Add visual highlight
                    highlightElement(checkbox.parentNode);
                }
                
                // Handle service type radio buttons
                if (packageToSelect === 'precision-strike' || packageToSelect === 'blocked-hours') {
                    const radioButton = document.getElementById('blocked-hours');
                    if (radioButton) {
                        radioButton.checked = true;
                        const hoursInput = document.getElementById('hours-needed');
                        if (hoursInput) {
                            hoursInput.style.display = 'block';
                        }
                    }
                } else if (packageToSelect === 'prepaid-hours') {
                    const radioButton = document.getElementById('prepaid-hours');
                    if (radioButton) {
                        radioButton.checked = true;
                        const prepaidHoursSelector = document.getElementById('prepaid-hours-selector');
                        if (prepaidHoursSelector) {
                            prepaidHoursSelector.style.display = 'block';
                        }
                    }
                } else {
                    const standardPackageRadio = document.getElementById('standard-package');
                    if (standardPackageRadio) {
                        standardPackageRadio.checked = true;
                    }
                }
                
                // Scroll to the form
                setTimeout(() => {
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                        contactSection.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 500);
            }
        }
    }
    
    // Highlight an element briefly
    function highlightElement(element) {
        if (element) {
            const originalBackground = element.style.backgroundColor;
            element.style.transition = 'background-color 0.5s ease';
            element.style.backgroundColor = 'rgba(32, 197, 198, 0.1)';
            
            setTimeout(() => {
                element.style.backgroundColor = originalBackground;
            }, 3000);
        }
    }
})();
