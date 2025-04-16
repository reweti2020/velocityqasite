/**
 * VelocityQA Browser Compatibility Script
 * 
 * This script addresses cross-browser compatibility issues across:
 * - Chrome
 * - Firefox
 * - Safari
 * - Edge
 * - IE
 * - Brave
 * 
 * Main issues fixed:
 * 1. Floating add package button visibility
 * 2. Contact form population when using "Add Package" links
 * 3. General rendering inconsistencies
 */

(function() {
    // Execute when DOM is fully loaded
    document.addEventListener('DOMContentLoaded', function() {
        // Detect browser
        const browserInfo = detectBrowser();
        console.log('Browser detected:', browserInfo);
        
        // Apply browser-specific fixes
        applyBrowserFixes(browserInfo);
        
        // Fix floating add package buttons across all browsers
        fixFloatingButtons();
        
        // Fix contact page population issues
        fixContactPagePopulation();
        
        // Apply general cross-browser fixes
        applyGeneralFixes();
    });

    /**
     * Detect browser type and version
     * @returns {Object} Browser information
     */
    function detectBrowser() {
        const userAgent = navigator.userAgent;
        let browser = {
            name: '',
            version: '',
            isChrome: false,
            isFirefox: false,
            isSafari: false,
            isEdge: false,
            isIE: false,
            isBrave: false
        };

        // Detect Chrome (and Chromium-based browsers like Brave)
        if (userAgent.indexOf("Chrome") > -1) {
            browser.isChrome = true;
            browser.name = "Chrome";
            
            // Check if actually Brave
            if (navigator.brave && typeof navigator.brave.isBrave === 'function') {
                // We need to check this asynchronously, but for immediate classification
                // we'll make an educated guess based on user agent and lack of Google-specific info
                if (!navigator.userAgentData && !window.chrome.csi && !window.google) {
                    browser.isBrave = true;
                    browser.name = "Brave";
                }
            }
            // Check if actually Edge
            else if (userAgent.indexOf("Edg") > -1) {
                browser.isChrome = false;
                browser.isEdge = true;
                browser.name = "Edge";
            }
        }
        // Detect Firefox
        else if (userAgent.indexOf("Firefox") > -1) {
            browser.isFirefox = true;
            browser.name = "Firefox";
        }
        // Detect Safari
        else if (userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") === -1) {
            browser.isSafari = true;
            browser.name = "Safari";
        }
        // Detect Internet Explorer
        else if (userAgent.indexOf("MSIE") > -1 || userAgent.indexOf("Trident/") > -1) {
            browser.isIE = true;
            browser.name = "Internet Explorer";
        }
        
        // Add custom attribute to body for CSS targeting
        document.body.setAttribute('data-browser', browser.name.toLowerCase().replace(' ', '-'));
        
        return browser;
    }

    /**
     * Apply browser-specific fixes
     * @param {Object} browser The browser information object
     */
    function applyBrowserFixes(browser) {
        if (browser.isChrome || browser.isBrave) {
            applyChromeAndBraveFixes();
        } else if (browser.isFirefox) {
            applyFirefoxFixes();
        } else if (browser.isSafari) {
            applySafariFixes();
        } else if (browser.isEdge) {
            applyEdgeFixes();
        } else if (browser.isIE) {
            applyIEFixes();
        }
    }

    /**
     * Apply fixes specific to Chrome and Brave browsers
     */
    function applyChromeAndBraveFixes() {
        // Fix z-index issues with floating buttons
        const floatingButtons = document.querySelectorAll('.floating-add-button, #floating-add-button');
        floatingButtons.forEach(button => {
            // Increase z-index to ensure visibility
            button.style.zIndex = '9999';
            
            // Reset opacity and position for visibility
            button.style.opacity = '1';
            
            // Fix Chrome-specific animation issue
            button.style.transform = 'translateZ(0)';
            button.style.webkitTransform = 'translateZ(0)';
            
            // Force hardware acceleration
            button.style.willChange = 'transform';
            
            // Fix any right positioning issues
            if (window.getComputedStyle(button).right === '-150px') {
                button.style.right = '0';
            }
        });
    }

    /**
     * Apply fixes specific to Firefox
     */
    function applyFirefoxFixes() {
        // Fix Firefox-specific rendering issues with floating elements
        const floatingElements = document.querySelectorAll('.floating-add-button, #floating-add-button, .theme-toggle');
        floatingElements.forEach(element => {
            // Force hardware acceleration
            element.style.transform = 'translateZ(0)';
            
            // Ensure proper stacking
            element.style.zIndex = '9999';
            
            // Fix opacity issues
            element.style.opacity = '1';
        });
    }

    /**
     * Apply fixes specific to Safari
     */
    function applySafariFixes() {
        // Safari generally handles the elements correctly, but we'll add some insurance
        
        // Fix any form submission issues specific to Safari
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            // Ensure form elements receive proper events in Safari
            const checkboxes = contactForm.querySelectorAll('input[type="checkbox"]');
            checkboxes.forEach(checkbox => {
                // Ensure Safari properly registers checkbox changes
                checkbox.addEventListener('click', function() {
                    // Force update for Safari
                    const changeEvent = new Event('change', { bubbles: true });
                    this.dispatchEvent(changeEvent);
                });
            });
        }
    }

    /**
     * Apply fixes specific to Edge
     */
    function applyEdgeFixes() {
        // Edge generally follows Chrome but with some specific issues
