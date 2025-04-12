// Script to fix collapsible features, package buttons, and other issues

document.addEventListener('DOMContentLoaded', function() {
    // Fix for collapsible features
    const collapsibleFeatures = document.querySelectorAll('.package-feature.collapsible');
    
    collapsibleFeatures.forEach(feature => {
        const header = feature.querySelector('.feature-header');
        const content = feature.querySelector('.feature-content');
        
        if (header && content) {
            header.addEventListener('click', () => {
                // Toggle active class
                feature.classList.toggle('active');
                
                if (feature.classList.contains('active')) {
                    content.style.maxHeight = content.scrollHeight + 'px';
                    content.style.opacity = '1';
                    content.style.visibility = 'visible';
                } else {
                    content.style.maxHeight = '0';
                    content.style.opacity = '0';
                    content.style.visibility = 'hidden';
                }
            });
        }
    });
    
    // Make package buttons clickable
    const packageButtons = document.querySelectorAll('.package-buttons .cta-button');
    packageButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const href = button.getAttribute('href');
            if (href) {
                window.location.href = href;
            }
        });
    });
    
    // Mobile menu fix
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
    
    // Fix testimonial and comparison sliders
    initSliders();
});

// Initialize sliders
function initSliders() {
    // Testimonials Slider
    const testimonialsTrack = document.getElementById('testimonialsTrack');
    const testimonialPrev = document.getElementById('testimonialPrev');
    const testimonialNext = document.getElementById('testimonialNext');
    const testimonialDots = document.querySelectorAll('.testimonial-dot');
    let currentTestimonial = 0;
    
    function updateTestimonialSlider() {
        if (testimonialsTrack) {
            testimonialsTrack.style.transform = `translateX(-${currentTestimonial * 100}%)`;
            
            // Update dots
            testimonialDots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentTestimonial);
            });
        }
    }
    
    if (testimonialPrev && testimonialNext) {
        testimonialPrev.addEventListener('click', () => {
            currentTestimonial = (currentTestimonial - 1 + testimonialDots.length) % testimonialDots.length;
            updateTestimonialSlider();
        });
        
        testimonialNext.addEventListener('click', () => {
            currentTestimonial = (currentTestimonial + 1) % testimonialDots.length;
            updateTestimonialSlider();
        });
        
        testimonialDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentTestimonial = index;
                updateTestimonialSlider();
            });
        });
    }
    
    // Comparison Slider
    const comparisonTrack = document.getElementById('comparisonTrack');
    const comparisonPrev = document.getElementById('comparisonPrev');
    const comparisonNext = document.getElementById('comparisonNext');
    const comparisonDots = document.querySelectorAll('.comparison-dot');
    let currentComparison = 0;

    function updateComparisonSlider() {
        if (comparisonTrack) {
            comparisonTrack.style.transform = `translateX(-${currentComparison * 100}%)`;
            
            // Update dots
            comparisonDots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentComparison);
            });
        }
    }

    if (comparisonPrev && comparisonNext) {
        comparisonPrev.addEventListener('click', () => {
            currentComparison = (currentComparison - 1 + comparisonDots.length) % comparisonDots.length;
            updateComparisonSlider();
        });
        
        comparisonNext.addEventListener('click', () => {
            currentComparison = (currentComparison + 1) % comparisonDots.length;
            updateComparisonSlider();
        });
        
        comparisonDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentComparison = index;
                updateComparisonSlider();
            });
        });
    }
    
    // Package Tabs
    const tabs = document.querySelectorAll('.tab');
    const packageDisplays = document.querySelectorAll('.package-display');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Show corresponding package display
            const tabId = tab.getAttribute('data-tab');
            packageDisplays.forEach(display => {
                display.classList.remove('active');
                if (display.id === `${tabId}-display`) {
                    display.classList.add('active');
                }
            });
        });
    });
}
