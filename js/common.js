/**
 * Common functions for all pages
 */
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            // Set aria-expanded attribute for accessibility
            const expanded = navLinks.classList.contains('active');
            mobileMenuToggle.setAttribute('aria-expanded', expanded.toString());
        });
        
        // Close menu when clicking on a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }
    
    // Scroll animations for elements
    const fadeElements = document.querySelectorAll('.fade-in-up');
    
    // Scroll observer for animations
    if (fadeElements.length > 0) {
        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    scrollObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        fadeElements.forEach(element => {
            scrollObserver.observe(element);
        });
    }
    
    // Progressive disclosure/show more buttons
    const disclosureContainers = document.querySelectorAll('.disclosure-container');
    
    disclosureContainers.forEach(container => {
        const toggle = container.nextElementSibling;
        
        if (toggle && toggle.classList.contains('disclosure-toggle')) {
            toggle.addEventListener('click', () => {
                container.classList.toggle('expanded');
                
                if (container.classList.contains('expanded')) {
                    toggle.textContent = 'Show Less';
                    toggle.setAttribute('aria-expanded', 'true');
                } else {
                    toggle.textContent = 'Show More';
                    toggle.setAttribute('aria-expanded', 'false');
                }
            });
        }
    });
    
    // FAQ accordions
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        if (question && answer) {
            question.addEventListener('click', () => {
                const isOpen = item.classList.contains('faq-active');
                
                // Close all FAQs
                faqItems.forEach(faq => {
                    faq.classList.remove('faq-active');
                    
                    // Update accessibility attributes
                    const faqQuestion = faq.querySelector('.faq-question');
                    faqQuestion.setAttribute('aria-expanded', 'false');
                });
                
                // If the clicked item wasn't open, open it
                if (!isOpen) {
                    item.classList.add('faq-active');
                    question.setAttribute('aria-expanded', 'true');
                }
            });
            
            // Setup accessibility attributes
            question.setAttribute('aria-expanded', 'false');
            const answerId = 'faq-answer-' + Math.random().toString(36).substring(2, 9);
            answer.id = answerId;
            question.setAttribute('aria-controls', answerId);
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Don't handle non-anchor links
            if (targetId === '#' || !targetId.startsWith('#')) return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                // Close mobile menu if open
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileMenuToggle.classList.remove('active');
                }
                
                // Smooth scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});
