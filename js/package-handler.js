document.addEventListener('DOMContentLoaded', function () {
    // Initialize package handler when DOM is fully loaded
    initPackageHandler();
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
    const storedPackage = localStorage.getItem('selectedPackage');
    const storedAdd = localStorage.getItem('addPackage');

    const packageToSelect = packageParam || storedPackage;
    const isAddOperation = (addParam === 'true') || (storedAdd === 'true');

    if (packageToSelect && isAddOperation) {
        // Clear localStorage after using it
        localStorage.removeItem('selectedPackage');
        localStorage.removeItem('addPackage');

        // Handle package selection without clearing existing selections
        handlePackageSelection(packageToSelect);

        // Scroll to the contact section for better UX
        setTimeout(() => {
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        }, 500);
    } else {
        console.log("No package selected or 'add' operation detected.");
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
    
    // Update mobile badge count if it exists
    updatePackageBadge();
}

function updatePackageBadge() {
    // Count selected packages
    const selectedCount = document.querySelectorAll('input[name="package[]"]:checked').length;
    
    // Update mobile badge if it exists
    const mobilePackageBadge = document.getElementById('mobilePackageBadge');
    if (mobilePackageBadge) {
        mobilePackageBadge.textContent = selectedCount;
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

// Add event handlers for the form elements
document.addEventListener('DOMContentLoaded', function() {
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
