<header>
<script src="browser-fixes.js"></script>
<!-- Add Package Handler Script -->
<script src="js/package-handler.js"></script>
  <div class="container">
    <nav>
      <div class="nav-section-left">
        <!-- Back Button -->
        <a href="javascript:history.back()" class="back-button" aria-label="Go back to previous page">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </a>
        
        <!-- Logo -->
        <div class="logo-container">
          <a href="index.html">
            <svg width="200" height="60" viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">
              <!-- Main shape - simplified neural network symbol -->
              <g id="logo-mark">
                <!-- Connection lines -->
                <path d="M25 40L40 25L25 10" stroke="url(#logoGradient)" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round" />
                
                <!-- Connection dots -->
                <circle cx="25" cy="40" r="5" fill="#FF6B00" />
                <circle cx="40" cy="25" r="5" fill="#FF6B00" />
                <circle cx="25" cy="10" r="5" fill="#20C5C6" />
                
                <!-- Animated pulse moving from bottom to top -->
                <circle cx="25" cy="40" r="1.5" fill="#FF6B00" opacity="0.8">
                  <!-- Starting at bottom node -->
                  <animate attributeName="cy" from="40" to="10" dur="3s" repeatCount="indefinite" />
                  <!-- Move horizontally in middle -->
                  <animate attributeName="cx" values="25;25;40;25" dur="3s" repeatCount="indefinite" />
                  <!-- Color transitions from orange to teal -->
                  <animate attributeName="fill" from="#FF6B00" to="#20C5C6" dur="3s" repeatCount="indefinite" />
                </circle>
              </g>
              
              <!-- Company name -->
              <text x="60" y="35" font-family="'Inter', -apple-system, sans-serif" font-weight="700" font-size="22">
                <tspan fill="#D1D5DB">Velocity</tspan><tspan fill="#FF6B00">QA</tspan>
              </text>
              
              <!-- Gradient definition -->
              <defs>
                <linearGradient id="logoGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="#FF6B00" />
                  <stop offset="100%" stop-color="#20C5C6" />
                </linearGradient>
              </defs>
            </svg>
          </a>
        </div>
      </div>
      
      <div class="mobile-menu-toggle" id="mobileMenuToggle">
        <span></span>
        <span></span>
        <span></span>
      </div>
                
      <div class="nav-links" id="navLinks">
        <a href="index.html#features" class="nav-link">Features</a>
        <a href="index.html#packages" class="nav-link">Packages</a>
        <a href="index.html#process" class="nav-link">Process</a>
        <a href="index.html#pricing" class="nav-link">Why Choose Us</a>
        <a href="index.html#testimonials" class="nav-link">Testimonials</a>
        <a href="contact.html" class="cta-button">Contact Us</a>
      </div>
    </nav>
  </div>
  
  <style>
    /* Back button styles */
    .nav-section-left {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    
    .back-button {
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--text-light);
      background-color: transparent;
      transition: all 0.2s ease;
      cursor: pointer;
      opacity: 0.6;
      margin-right: 0.5rem;
    }
    
    .back-button:hover {
      color: var(--teal);
      transform: translateX(-3px);
      opacity: 1;
    }
    
    /* Package highlighting styles */
    .highlighted {
      background-color: rgba(32, 197, 198, 0.1);
      border-radius: 8px;
      transition: background-color 0.5s ease;
    }
    
    @media (max-width: 768px) {
      .nav-section-left {
        gap: 0.5rem;
      }
    }
  </style>
  
  <!-- Mobile menu toggle script -->
  <script>
    document.addEventListener('DOMContentLoaded', function() {
      const mobileMenuToggle = document.getElementById('mobileMenuToggle');
      const navLinks = document.getElementById('navLinks');
      
      if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', function() {
          navLinks.classList.toggle('active');
          mobileMenuToggle.classList.toggle('active');
        });
      }
      
      // Only show back button if there's a previous page in history
      const backButton = document.querySelector('.back-button');
      if (backButton && window.history.length <= 1) {
        backButton.style.display = 'none';
      }
    });
  </script>
  
  <!-- Cross-browser compatibility fix -->
  <script>
    /**
     * Simple browser compatibility fix for VelocityQA website
     * Specifically targets the floating add package button visibility
     * and contact form population issues
     */
    (function() {
        // Run when DOM is fully loaded
        document.addEventListener('DOMContentLoaded', function() {
            // Fix floating add package buttons
            fixFloatingButtons();
            
            // Fix contact form population issues
            fixContactFormPopulation();
        });
        
        // Fix floating buttons across all browsers
        function fixFloatingButtons() {
            const floatingButtons = document.querySelectorAll('.floating-add-button, #floating-add-button, #addPackageButton');
            
            floatingButtons.forEach(button => {
                // Make sure the button is visible
                button.style.opacity = '1';
                button.style.zIndex = '9999';
                
                // Reset any positioning that might be hiding it
                if (window.getComputedStyle(button).right === '-150px') {
                    button.style.right = '0';
                }
                
                // Ensure clicks properly save the package info
                button.addEventListener('click', function(e) {
                    const href = this.getAttribute('href');
                    if (href && href.includes('?package=') && href.includes('&add=true')) {
                        const urlParams = new URLSearchParams(href.split('?')[1]);
                        const packageType = urlParams.get('package');
                        
                        if (packageType) {
                            localStorage.setItem('selectedPackage', packageType);
                            localStorage.setItem('addPackage', 'true');
                        }
                    }
                });
            });
            
            // If we're on a service page but don't have a floating button, create one
            if (document.location.pathname.includes('bug-hunter') || 
                document.location.pathname.includes('user-journey') ||
                document.location.pathname.includes('system-auditor') ||
                document.location.pathname.includes('precision-strike') ||
                document.location.pathname.includes('automation')) {
                
                if (floatingButtons.length === 0) {
                    createMissingFloatingButton();
                }
            }
        }
        
        // Create a missing floating button if needed
        function createMissingFloatingButton() {
            if (document.getElementById('addPackageButton')) {
                return; // Button already exists
            }
            
            // Determine package type from URL
            let packageType = '';
            if (document.location.pathname.includes('bug-hunter')) {
                packageType = 'bug-hunter';
            } else if (document.location.pathname.includes('user-journey')) {
                packageType = 'user-journey';
            } else if (document.location.pathname.includes('system-auditor')) {
                packageType = 'system-auditor';
            } else if (document.location.pathname.includes('precision-strike')) {
                packageType = 'precision-strike';
            } else if (document.location.pathname.includes('automation')) {
                packageType = 'automation';
            }
            
            if (packageType) {
                // Create the button
                const button = document.createElement('a');
                button.id = 'addPackageButton';
                button.className = 'floating-add-button';
                button.href = `contact.html?package=${packageType}&add=true`;
                button.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="16"></line>
                        <line x1="8" y1="12" x2="16" y2="12"></line>
                    </svg>
                    <span>Add Package</span>
                `;
                
                // Style the button
                button.style.position = 'fixed';
                button.style.bottom = '6rem';
                button.style.right = '20px';
                button.style.display = 'flex';
                button.style.alignItems = 'center';
                button.style.backgroundColor = 'var(--orange, #ff6b00)';
                button.style.color = 'white';
                button.style.padding = '0.75rem 1.5rem';
                button.style.borderRadius = '8px';
                button.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                button.style.textDecoration = 'none';
                button.style.fontWeight = '600';
                button.style.fontSize = '1rem';
                button.style.transition = 'all 0.3s ease';
                button.style.zIndex = '9999';
                button.style.opacity = '1';
                
                document.body.appendChild(button);
            }
        }
        
        // Fix contact form population issues
        function fixContactFormPopulation() {
            // Check if we're on the contact page
            if (document.getElementById('contactForm')) {
                // Check URL parameters first
                const urlParams = new URLSearchParams(window.location.search);
                const packageParam = urlParams.get('package');
                const addParam = urlParams.get('add');
                
                // If URL parameters don't exist, check localStorage
                const storedPackage = localStorage.getItem('selectedPackage');
                const storedAdd = localStorage.getItem('addPackage');
                
                // Determine which package to select
                const packageToSelect = packageParam || storedPackage;
                const isAddOperation = (addParam === 'true') || (storedAdd === 'true');
                
                if (packageToSelect && isAddOperation) {
                    // Clear localStorage after using it
                    localStorage.removeItem('selectedPackage');
                    localStorage.removeItem('addPackage');
                    
                    // Find and check the checkbox
                    const checkbox = document.getElementById(packageToSelect);
                    if (checkbox) {
                        checkbox.checked = true;
                        
                        // Add visual highlight
                        highlightElement(checkbox.parentNode);
                    }
                    
                    // Handle service type radio buttons
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
                    } else {
                        const standardPackageRadio = document.getElementById('standard-package');
                        if (standardPackageRadio) {
                            standardPackageRadio.checked = true;
                        }
                    }
                    
                    // Scroll to the form
                    setTimeout(() => {
                        const contactSection = document.getElementById('contact');
                        if (contactSection) {
                            contactSection.scrollIntoView({ behavior: 'smooth' });
                        }
                    }, 500);
                }
            }
        }
        
        // Highlight an element briefly
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
    })();
  </script>
</header>
