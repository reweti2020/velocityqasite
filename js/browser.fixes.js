document.addEventListener('DOMContentLoaded', function () {
    // Check for browser type
    const isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    // Fix for Chrome-specific rendering issues
    if (isChrome) {
        console.log("Applying Chrome-specific fixes...");
        // Example: Adjust styles for floating buttons
        const floatingButton = document.querySelector('.floating-add-button');
        if (floatingButton) {
            floatingButton.style.zIndex = '100'; // Ensure it's above other elements
        }
    }

    // Fix for Safari-specific rendering issues
    if (isSafari) {
        console.log("Applying Safari-specific fixes...");
        // Example: Adjust visibility for Safari quirks
    }

    // Add fixes for other browsers as needed
});
