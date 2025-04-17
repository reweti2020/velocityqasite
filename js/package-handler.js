document.addEventListener('DOMContentLoaded', function () {
    // Initialize package handler when DOM is fully loaded
    initPackageHandler();
    
    // Update badge counts on initial page load
    updatePackageBadge();
    
    // Since header might be loaded asynchronously, also update after a delay
    setTimeout(updatePackageBadge, 1000);
    
    // And check again after the header is likely fully loaded
    setTimeout(updatePackageBadge, 2500);
    
    // Handler for service type radios
    const serviceTypeRadios = document.querySelectorAll('input[name="service-type"]');
    const hoursInput = document.getElementById('hours-needed');
    const prepaidSelector = document.getElementById('prepaid-hours-selector');
    
    if (serviceTypeRadios.length) {
        serviceTypeRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                // Hide both inputs first
                if (hoursInput) hoursInput.style.display = 'none';
                if (prepaidSelector) prepaidSelector.style.display = 'none';
                
                // Show the appropriate input based on selection
                if (this.value === 'blocked-hours' && hoursInput) {
                    hoursInput.style.display = 'block';
                } else if (this.value === 'prepaid-hours' && prepaidSelector) {
                    prepaidSelector.style.display = 'block';
                }
            });
        });
    }
    
    // Handler for clear button
    const clearButton = document.getElementById('clearButton');
    if (clearButton) {
        clearButton.addEventListener('click', function() {
            // Clear checkboxes
            document.querySelectorAll('input[name="package[]"]').forEach(checkbox => {
                checkbox.checked = false;
            });
            
            // Reset to tailored package
            const tailoredPackageRadio = document.getElementById('tailored-package');
            if (tailoredPackageRadio) {
                tailoredPackageRadio.checked = true;
            }
            
            // Hide conditional inputs
            if (hoursInput) hoursInput.style.display = 'none';
            if (prepaidSelector) prepaidSelector.style.display = 'none';
            
            // Update badge
            updatePackageBadge();
        });
    }
    
    // Handler for automation parent checkbox
    const automationCheckbox = document.getElementById('automation');
    if (automationCheckbox) {
        automationCheckbox.addEventListener('change', function() {
            // If automation is unchecked, uncheck all its nested checkboxes
            if (!this.checked) {
                document.querySelectorAll('.nested-checkbox input[type="checkbox"]').forEach(checkbox => {
                    checkbox.checked = false;
                });
                updatePackageBadge();
            }
        });
    }
    
    // Set up listeners for all package checkboxes to update badge
    document.querySelectorAll('input[name="package[]"]').forEach(checkbox => {
        checkbox.addEventListener('change', updatePackageBadge);
    });
});

function initPackageHandler() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) {
        console.warn("Contact form not found. Skipping package handler initialization.");
        return;
    }

    // Get package details from URL or localStorage
    const urlParams = new URLSearchParams(window.location.search);
    const packageParam = urlParams.get('package');
    const addParam = urlParams.get('add');

    if (packageParam && addParam === 'true') {
        // Handle package selection without clearing existing selections
        handlePackageSelection(packageParam);

        // Scroll to the contact section for better UX
        setTimeout(() => {
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        }, 500);
        
        // Clear URL parameters after processing to avoid reapplying on refresh
        // This uses history.replaceState which doesn't cause a page reload
        const url = new URL(window.location.href);
        url.searchParams.delete('package');
        url.searchParams.delete('add');
        window.history.replaceState({}, document.title, url);
    }
}

function handlePackageSelection(packageToSelect) {
    // Handle specific package selection
    const checkbox = document.getElementById(packageToSelect);
    if (checkbox) {
        checkbox.checked = true;
        highlightElement(checkbox.parentNode);
    } else {
        console.warn(`Checkbox for package "${packageToSelect}" not found.`);
    }

    // Handle special relationships between packages
    if (packageToSelect === 'precision-strike' || packageToSelect === 'blocked-hours') {
        // For Precision Strike or blocked hours, select both the checkbox and radio
        const precisionStrikeCheckbox = document.getElementById('precision-strike');
        if (precisionStrikeCheckbox) {
            precisionStrikeCheckbox.checked = true;
            highlightElement(precisionStrikeCheckbox.parentNode);
        }
        
        const radioButton = document.getElementById('blocked-hours');
        if (radioButton) {
            radioButton.checked = true;
            const hoursInput = document.getElementById('hours-needed');
            if (hoursInput) {
                hoursInput.style.display = 'block';
            }
        }
    } else if (packageToSelect === 'prepaid-hours') {
        // For prepaid hours, select both Precision Strike checkbox and prepaid radio
        const precisionStrikeCheckbox = document.getElementById('precision-strike');
        if (precisionStrikeCheckbox) {
            precisionStrikeCheckbox.checked = true;
            highlightElement(precisionStrikeCheckbox.parentNode);
        }
        
        const radioButton = document.getElementById('prepaid-hours');
        if (radioButton) {
            radioButton.checked = true;
            const prepaidHoursSelector = document.getElementById('prepaid-hours-selector');
            if (prepaidHoursSelector) {
                prepaidHoursSelector.style.display = 'block';
            }
        }
    } else if (packageToSelect.startsWith('automation')) {
        // For automation packages, check both the specific package and parent automation checkbox
        const automationCheckbox = document.getElementById('automation');
        if (automationCheckbox && !automationCheckbox.checked) {
            automationCheckbox.checked = true;
            highlightElement(automationCheckbox.parentNode);
        }
        
        // If no service type is selected, select the Tailored Package by default
        const serviceTypeChecked = document.querySelector('input[name="service-type"]:checked');
        if (!serviceTypeChecked) {
            const tailoredPackageRadio = document.getElementById('tailored-package');
            if (tailoredPackageRadio) {
                tailoredPackageRadio.checked = true;
            }
        }
    }
    
    // Update mobile badge if it exists
    updatePackageBadge();
}

function updatePackageBadge() {
    // Count selected packages
    const selectedCount = document.querySelectorAll('input[name="package[]"]:checked').length;
    
    // Update all possible badge locations
    // 1. Mobile badge
    const mobilePackageBadge = document.getElementById('mobilePackageBadge');
    if (mobilePackageBadge) {
        mobilePackageBadge.textContent = selectedCount;
    }
    
    // 2. Header badge using various potential selectors
    const headerBadgeSelectors = [
        '.nav-link.package-badge .badge',
        '.nav-links .cta-button .badge',
        '.nav-links a[href*="contact"] .badge',
        '#header-placeholder .badge',
        'header .badge'
    ];
    
    // Try each selector
    for (const selector of headerBadgeSelectors) {
        const headerBadge = document.querySelector(selector);
        if (headerBadge) {
            headerBadge.textContent = selectedCount;
            // Make sure badge is visible if there are selections
            if (selectedCount > 0) {
                headerBadge.style.display = 'flex';
            } else {
                headerBadge.style.display = 'none';
            }
            break; // Stop after finding and updating the first match
        }
    }
    
    // If header is loaded dynamically, we need to monitor for changes
    // and update the badge when the header becomes available
    if (!document.querySelector('header .badge')) {
        // Try to find the contact link in header
        const contactLink = document.querySelector('header a[href*="contact"], .nav-links a[href*="contact"]');
        if (contactLink && selectedCount > 0) {
            // Contact link exists but no badge - create one if needed
            if (!contactLink.querySelector('.badge')) {
                const badge = document.createElement('span');
                badge.className = 'badge';
                badge.textContent = selectedCount;
                badge.style.position = 'absolute';
                badge.style.top = '-8px';
                badge.style.right = '-8px';
                badge.style.backgroundColor = 'var(--orange)';
                badge.style.color = 'white';
                badge.style.fontSize = '0.75rem';
                badge.style.fontWeight = '700';
                badge.style.width = '20px';
                badge.style.height = '20px';
                badge.style.borderRadius = '50%';
                badge.style.display = 'flex';
                badge.style.alignItems = 'center';
                badge.style.justifyContent = 'center';
                badge.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.2)';
                
                // Make sure contact link has position relative for badge positioning
                contactLink.style.position = 'relative';
                contactLink.appendChild(badge);
            }
        }
        
        // Check if we need to create a mutation observer
        if (!window.badgeObserver) {
            window.badgeObserver = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    if (mutation.type === 'childList') {
                        // Try to find contact link after header loads
                        const contactLink = document.querySelector('header a[href*="contact"], .nav-links a[href*="contact"]');
                        if (contactLink && selectedCount > 0) {
                            // Update existing badge or create a new one
                            let headerBadge = contactLink.querySelector('.badge');
                            
                            if (headerBadge) {
                                // Update existing badge
                                headerBadge.textContent = selectedCount;
                                headerBadge.style.display = 'flex';
                            } else {
                                // Create a new badge
                                const badge = document.createElement('span');
                                badge.className = 'badge';
                                badge.textContent = selectedCount;
                                badge.style.position = 'absolute';
                                badge.style.top = '-8px';
                                badge.style.right = '-8px';
                                badge.style.backgroundColor = 'var(--orange)';
                                badge.style.color = 'white';
                                badge.style.fontSize = '0.75rem';
                                badge.style.fontWeight = '700';
                                badge.style.width = '20px';
                                badge.style.height = '20px';
                                badge.style.borderRadius = '50%';
                                badge.style.display = 'flex';
                                badge.style.alignItems = 'center';
                                badge.style.justifyContent = 'center';
                                badge.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.2)';
                                
                                // Make sure contact link has position relative for badge positioning
                                contactLink.style.position = 'relative';
                                contactLink.appendChild(badge);
                            }
                            
                            // Once we've updated the badge, disconnect the observer
                            window.badgeObserver.disconnect();
                            window.badgeObserver = null;
                        }
                    }
                });
            });
            
            // Start observing the header or document body for changes
            const targetNode = document.querySelector('header') || document.body;
            window.badgeObserver.observe(targetNode, { childList: true, subtree: true });
        }
    }
    
    // Show/hide back to packages button based on selections
    const backButton = document.getElementById('backToPackages');
    if (backButton) {
        if (selectedCount > 0) {
            backButton.style.display = 'flex';
        } else {
            backButton.style.display = 'none';
        }
    }
}

function highlightElement(element) {
    if (element) {
        const originalBackground = element.style.backgroundColor;
        element.classList.add('highlighted');
        
        setTimeout(() => {
            element.classList.remove('highlighted');
        }, 3000);
    }
}
