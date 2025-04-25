document.addEventListener('DOMContentLoaded', function() {
  // Create the navigation button element
  const navButton = document.createElement('div');
  navButton.className = 'scroll-nav-button';
  navButton.id = 'scrollNav';
  navButton.innerHTML = `
    <button class="nav-button" aria-label="Navigation options">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="18 15 12 9 6 15"></polyline>
      </svg>
    </button>
    
    <div class="nav-tooltip">
      <a href="#" id="scrollToTop" class="nav-item">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
        <span>Top</span>
      </a>
      <a href="javascript:history.back()" class="nav-item">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        <span>Back</span>
      </a>
      <a href="index.html" class="nav-item">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
        <span>Home</span>
      </a>
    </div>
  `;

  // Add the navigation button to the body
  document.body.appendChild(navButton);

  // Add the CSS styles
  const style = document.createElement('style');
  style.textContent = `
    .scroll-nav-button {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      z-index: 99;
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.3s ease, transform 0.3s ease;
    }

    .scroll-nav-button.visible {
      opacity: 0.8;
      transform: translateY(0);
    }

    .scroll-nav-button:hover {
      opacity: 1;
    }

    .nav-button {
      background-color: var(--teal, #20C5C6);
      color: white;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transition: background-color 0.3s ease, transform 0.2s ease;
    }

    .nav-button:hover {
      background-color: #1bafb0;
      transform: translateY(-2px);
    }

    .nav-tooltip {
      position: absolute;
      bottom: 100%;
      right: 0;
      margin-bottom: 8px;
      background-color: white;
      border-radius: 6px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      opacity: 0;
      transform: translateY(10px);
      pointer-events: none;
      transition: opacity 0.2s ease, transform 0.2s ease;
      overflow: hidden;
    }

    .scroll-nav-button:hover .nav-tooltip {
      opacity: 1;
      transform: translateY(0);
      pointer-events: auto;
    }

    .nav-item {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 12px;
      color: var(--text, #1e293b);
      text-decoration: none;
      transition: background-color 0.2s ease;
      white-space: nowrap;
    }

    .nav-item:hover {
      background-color: var(--bg-light, #f8fafc);
    }

    @media (max-width: 768px) {
      .scroll-nav-button {
        bottom: 5rem;
        right: 1.5rem;
      }
    }
  `;
  document.head.appendChild(style);

  // Show/hide button based on scroll position
  const scrollThreshold = 300;
  
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > scrollThreshold) {
      navButton.classList.add('visible');
    } else {
      navButton.classList.remove('visible');
    }
  });

  // Initialize visibility
  if (window.pageYOffset > scrollThreshold) {
    navButton.classList.add('visible');
  }

  // Scroll to top function
  const scrollToTop = document.getElementById('scrollToTop');
  if (scrollToTop) {
    scrollToTop.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});
