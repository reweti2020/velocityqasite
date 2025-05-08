/**
 * Back to Top Button Implementation
 * Adds a simple, stylish button that appears when scrolling down
 */
document.addEventListener('DOMContentLoaded', function() {
    // Create the back-to-top button element
    const backToTopButton = document.createElement('a');
    backToTopButton.className = 'back-to-top';
    backToTopButton.id = 'backToTop';
    backToTopButton.href = '#';
    backToTopButton.setAttribute('aria-label', 'Back to top of page');
    backToTopButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
    `;

    // Add the button to the body
    document.body.appendChild(backToTopButton);

    // Add the CSS styles
    const style = document.createElement('style');
    style.textContent = `
        .back-to-top {
            position: fixed;
            bottom: 2.5rem;
            right: 2.5rem;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: rgba(209, 213, 219, 0.25);
            color: rgba(209, 213, 219, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            text-decoration: none;
            transition: all 0.3s ease;
            opacity: 0;
            visibility: hidden;
            z-index: 999;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
            backdrop-filter: blur(4px);
            -webkit-backdrop-filter: blur(4px);
        }

        .back-to-top:hover {
            background-color: rgba(209, 213, 219, 0.4);
            color: rgba(255, 255, 255, 0.9);
            transform: translateY(-3px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }

        .back-to-top.visible {
            opacity: 1;
            visibility: visible;
        }

        @media (max-width: 768px) {
            .back-to-top {
                bottom: 5rem;
                right: 1.5rem;
            }
        }
    `;
    document.head.appendChild(style);

    // Show/hide button based on scroll position
    const scrollThreshold = 300; // Show after scrolling 300px
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > scrollThreshold) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    // Initialize visibility
    if (window.pageYOffset > scrollThreshold) {
        backToTopButton.classList.add('visible');
    }

    // Smooth scroll to top when clicked
    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});