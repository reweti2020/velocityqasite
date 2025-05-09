/**
 * VelocityQA Navigation Script
 * Handles mobile menu toggling and back button functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    initMobileMenu();
    
    // Back Button Visibility
    handleBackButton();
    
    // Smooth Scrolling for Anchor Links
    initSmoothScroll();
    
    // Active Navigation Highlighting
    highlightActiveNavLink();
});

/**
 * Initialize the mobile menu toggle functionality
 */
function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
            
            // Toggle aria-expanded attribute for accessibility
            const isExpanded = navLinks.classList.contains('active');
            mobileMenuToggle.setAttribute('aria-expanded', isExpanded);
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (navLinks.classList.contains('active') && 
                !navLinks.contains(e.target) && 
                !mobileMenuToggle.contains(e.target)) {
                navLinks.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                mobileMenuToggle.setAttribute('aria-expanded', false);
            }
        });
        
        // Close mobile menu when clicking on a nav link
        const navLinkItems = navLinks.querySelectorAll('a');
        navLinkItems.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                mobileMenuToggle.setAttribute('aria-expanded', false);
            });
        });
    }
}

/**
 * Handle back button visibility
 */
function handleBackButton() {
    const backButton = document.querySelector('.back-button');
    if (backButton && window.history.length <= 1) {
        backButton.style.display = 'none';
    }
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#" or not an anchor link
            if (href === '#' || href.length <= 1) return;
            
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                e.preventDefault();
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for header height
                    behavior: 'smooth'
                });
                
                // Update URL hash without scrolling
                history.pushState(null, null, href);
            }
        });
    });
}

/**
 * Highlight active navigation link based on current URL or scroll position
 */
function highlightActiveNavLink() {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentUrl = window.location.href;
    
    // First check if any nav link matches the current URL
    navLinks.forEach(link => {
        if (link.href === currentUrl) {
            link.classList.add('active');
        }
    });
    
    // If we're on the homepage, highlight based on scroll position
    if (window.location.pathname === '/' || window.location.pathname.includes('index.html')) {
        const sections = Array.from(document.querySelectorAll('section[id]'));
        
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY + 100; // Offset for header
            
            const currentSection = sections.find(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                return scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight;
            });
            
            if (currentSection) {
                const sectionId = currentSection.getAttribute('id');
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').includes(sectionId)) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
}
