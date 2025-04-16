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

        // Handle parent and nested checkboxes
        handleCheckboxSelection(packageToSelect);

        // Handle specific radio buttons or inputs
        handleSpecialPackages(packageToSelect);

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

function handleCheckboxSelection(packageToSelect) {
    const checkbox = document.getElementById(packageToSelect);
    if (checkbox) {
        checkbox.checked = true;
        highlightElement(checkbox.parentNode);

        // Handle nested checkboxes (if any)
        const nestedCheckboxes = checkbox.closest('.parent-checkbox')?.querySelectorAll('.nested-checkbox input[type="checkbox"]');
        if (nestedCheckboxes) {
            nestedCheckboxes.forEach((nestedCheckbox) => {
                if (nestedCheckbox.id === packageToSelect) {
                    nestedCheckbox.checked = true;
                    highlightElement(nestedCheckbox.parentNode);
                }
            });
        }
    } else {
        console.error(`Checkbox for package "${packageToSelect}" not found.`);
    }
}

function handleSpecialPackages(packageToSelect) {
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
    }
}

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
