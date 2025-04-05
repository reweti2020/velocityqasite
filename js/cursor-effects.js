/**
 * Cursor Effects - Custom cursor follower with interactive effects
 */
document.addEventListener('DOMContentLoaded', function() {
    // Only apply on devices with hover capability
    if (!window.matchMedia('(hover: hover)').matches) return;
    
    // Create cursor element if it doesn't exist
    let cursorFollower = document.querySelector('.cursor-follower');
    
    if (!cursorFollower) {
        cursorFollower = document.createElement('div');
        cursorFollower.className = 'cursor-follower';
        document.body.appendChild(cursorFollower);
    }
    
    // Track cursor position
    let cursorX = 0;
    let cursorY = 0;
    let currentX = 0;
    let currentY = 0;
    
    // Update cursor position with smooth animation
    function animateCursor() {
        const easeFactor = 0.15; // Adjust for more/less smoothing
        
        // Calculate smoothed position
        currentX += (cursorX - currentX) * easeFactor;
        currentY += (cursorY - currentY) * easeFactor;
        
        // Apply position
        cursorFollower.style.left = `${currentX}px`;
        cursorFollower.style.top = `${currentY}px`;
        
        // Continue animation
        requestAnimationFrame(animateCursor);
    }
    
    // Start animation loop
    animateCursor();
    
    // Update raw cursor position on mouse move
    document.addEventListener('mousemove', (e) => {
        cursorX = e.clientX;
        cursorY = e.clientY;
        
        if (!cursorFollower.classList.contains('active')) {
            setTimeout(() => {
                cursorFollower.classList.add('active');
            }, 100);
        }
    });
    
    // Add hover effect on interactive elements
    const interactiveElements = document.querySelectorAll(
        'a, button, .nav-link, .cta-button, ' +
        '.feature-card, .package-card, ' + 
        '.testimonial-card, .theme-toggle, ' +
        '.disclosure-toggle, .faq-question'
    );
    
    interactiveElements.forEach(element => {
        // Add appropriate hover class
        element.addEventListener('mouseenter', () => {
            if (element.classList.contains('cta-button') || element.tagName === 'BUTTON') {
                cursorFollower.classList.add('hover-button');
            } else {
                cursorFollower.classList.add('hover-link');
            }
        });
        
        // Remove hover class
        element.addEventListener('mouseleave', () => {
            cursorFollower.classList.remove('hover-button', 'hover-link');
        });
    });
    
    // Hide cursor when it leaves the window
    document.addEventListener('mouseout', (e) => {
        if (e.relatedTarget === null) {
            cursorFollower.classList.remove('active');
        }
    });
    
    // Show cursor when it enters the window
    document.addEventListener('mouseover', () => {
        cursorFollower.classList.add('active');
    });
});
