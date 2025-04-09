// JavaScript for package view toggle functionality

document.addEventListener('DOMContentLoaded', function() {
    // Package view toggle
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    const packagesGrid = document.getElementById('packagesGrid');
    const packageTable = document.getElementById('packageTable');
    
    if (toggleButtons.length && packagesGrid && packageTable) {
        toggleButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                toggleButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Show/hide appropriate view
                const viewType = button.getAttribute('data-view');
                if (viewType === 'cards') {
                    packagesGrid.style.display = 'grid';
                    packageTable.style.display = 'none';
                } else if (viewType === 'table') {
                    packagesGrid.style.display = 'none';
                    packageTable.style.display = 'block';
                }
            });
        });
    }
    
    // Fix for package buttons to ensure they are clickable
    const packageButtons = document.querySelectorAll('.package-card .cta-button, .package-table .cta-button');
    packageButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const href = button.getAttribute('href');
            if (href) {
                window.location.href = href;
            }
        });
    });
    
    // Enhanced animations for better visual appeal
    // Feature card entrance animations
    const featureCards = document.querySelectorAll('.feature-card');
    
    const observeFeatures = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, index * 150);
            }
        });
    }, { threshold: 0.2 });
    
    featureCards.forEach(card => {
        observeFeatures.observe(card);
    });
    
    // Process steps animation
    const processSteps = document.querySelectorAll('.process-step');
    const processLine = document.querySelector('.process-line');
    
    const observeProcess = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            processSteps.forEach((step, index) => {
                setTimeout(() => {
                    step.classList.add('active');
                }, index * 300);
            });
            
            if (processLine) {
                setTimeout(() => {
                    processLine.style.width = '100%';
                }, 300);
            }
        }
    }, { threshold: 0.3 });
    
    if (processSteps.length > 0 && processLine) {
        observeProcess.observe(document.querySelector('.process-steps'));
    }
    
    // Package card animations on scroll
    const packageCards = document.querySelectorAll('.package-card');
    
    const observePackages = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";
                }, index * 150);
            }
        });
    }, { threshold: 0.1 });
    
    packageCards.forEach(card => {
        card.style.opacity = "0";
        card.style.transform = "translateY(30px)";
        card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        observePackages.observe(card);
    });
});
