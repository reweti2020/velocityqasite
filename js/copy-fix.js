// Advanced modal-based copy functionality with robust error handling
document.addEventListener('DOMContentLoaded', function() {
  // Check if modal already exists to prevent duplicates
  if (!document.querySelector('.copy-modal-container')) {
    // Create the modal dialog element once
    const modalContainer = document.createElement('div');
    modalContainer.className = 'copy-modal-container';
    modalContainer.style.display = 'none';
    modalContainer.innerHTML = `
      <div class="copy-modal">
        <div class="copy-modal-header">
          <h3>Copy Content</h3>
          <button class="copy-modal-close">&times;</button>
        </div>
        <div class="copy-modal-body">
          <p class="copy-modal-instructions">The text below is pre-selected. You can copy it using:</p>
          <ul class="copy-modal-methods">
            <li>Keyboard shortcut: <kbd>Ctrl</kbd>+<kbd>C</kbd> or <kbd>⌘</kbd>+<kbd>C</kbd></li>
            <li>Click the "Copy to Clipboard" button below</li>
          </ul>
          <div class="copy-modal-content-wrapper">
            <pre class="copy-modal-content" id="modal-copy-content"></pre>
          </div>
          <button class="copy-modal-button">
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
            Copy to Clipboard
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(modalContainer);

    // Add CSS for the modal (inline styles to avoid dependency on external CSS)
    const style = document.createElement('style');
    style.textContent = `
      .copy-modal-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
        z-index: 10000;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px;
      }
      
      .copy-modal {
        background-color: #1e293b;
        color: #f8fafc;
        border-radius: 8px;
        width: 100%;
        max-width: 600px;
        max-height: 90vh;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        overflow: hidden;
      }
      
      .copy-modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px 20px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      }
      
      .copy-modal-header h3 {
        margin: 0;
        color: #00e0e0;
        font-size: 18px;
      }
      
      .copy-modal-close {
        background: none;
        border: none;
        color: #94a3b8;
        font-size: 24px;
        cursor: pointer;
        padding: 0;
        line-height: 1;
      }
      
      .copy-modal-body {
        padding: 20px;
      }
      
      .copy-modal-instructions {
        margin-top: 0;
        color: #f8fafc;
      }
      
      .copy-modal-methods {
        margin-bottom: 20px;
        color: #cbd5e1;
      }
      
      .copy-modal-methods kbd {
        background: rgba(255, 255, 255, 0.1);
        border-radius: 3px;
        padding: 2px 5px;
        font-size: 0.9em;
      }
      
      .copy-modal-content-wrapper {
        background: rgba(15, 23, 42, 0.5);
        border-radius: 5px;
        padding: 15px;
        margin-bottom: 20px;
        max-height: 300px;
        overflow-y: auto;
        border: 1px solid rgba(255, 255, 255, 0.1);
      }
      
      .copy-modal-content {
        margin: 0;
        white-space: pre-wrap;
        word-break: break-word;
        color: #f8fafc;
        font-family: monospace, sans-serif;
      }
      
      .copy-modal-button {
        background: #00e0e0;
        color: #0f172a;
        border: none;
        border-radius: 5px;
        padding: 10px 20px;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 8px;
        font-weight: 600;
        transition: background-color 0.2s;
      }
      
      .copy-modal-button:hover {
        background: #33e6e6;
      }
      
      @media (max-width: 640px) {
        .copy-modal {
          max-width: 95%;
        }
        
        .copy-modal-content-wrapper {
          max-height: 200px;
        }
      }
    `;
    document.head.appendChild(style);

    // Set up event handlers for the modal
    setupModalHandlers();
  }

  // Set up modal handlers
  function setupModalHandlers() {
    const modalContainer = document.querySelector('.copy-modal-container');
    const closeBtn = modalContainer.querySelector('.copy-modal-close');
    const copyBtn = modalContainer.querySelector('.copy-modal-button');
    const contentElem = modalContainer.querySelector('#modal-copy-content');

    // Close the modal when clicking the close button
    closeBtn.addEventListener('click', function() {
      modalContainer.style.display = 'none';
    });

    // Close the modal when clicking outside of it
    modalContainer.addEventListener('click', function(e) {
      if (e.target === modalContainer) {
        modalContainer.style.display = 'none';
      }
    });

    // Copy function for the button
    copyBtn.addEventListener('click', function() {
      // Try multiple copy methods for better browser compatibility
      const text = contentElem.textContent;
      
      // Method 1: Modern Clipboard API
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text)
          .then(function() {
            showCopySuccess(copyBtn);
          })
          .catch(function(err) {
            console.error('Clipboard API error:', err);
            // Fall back to method 2
            execCommandCopy(text, contentElem, copyBtn);
          });
      } else {
        // Method 2: execCommand approach
        execCommandCopy(text, contentElem, copyBtn);
      }
    });
  }

  // Function to copy using execCommand as fallback
  function execCommandCopy(text, element, button) {
    try {
      // Select the text
      const selection = window.getSelection();
      if (selection) {
        const range = document.createRange();
        range.selectNodeContents(element);
        selection.removeAllRanges();
        selection.addRange(range);
        
        // Try to execute the copy command
        const successful = document.execCommand('copy');
        if (successful) {
          showCopySuccess(button);
        } else {
          alert('Please use keyboard shortcut Ctrl+C/Cmd+C to copy');
        }
      }
    } catch (err) {
      console.error('execCommand copy failed:', err);
      alert('Please use keyboard shortcut Ctrl+C/Cmd+C to copy');
    }
  }

  // Show success animation on button
  function showCopySuccess(button) {
    if (!button) return;
    
    const originalHtml = button.innerHTML;
    button.innerHTML = `
      <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20 6L9 17l-5-5"></path>
      </svg>
      Copied!
    `;
    
    setTimeout(function() {
      button.innerHTML = originalHtml;
    }, 2000);
  }

  // Main copy function that will be called by buttons 
  window.copyPrompt = function(id) {
    console.log('Copy function triggered for:', id);
    const element = document.getElementById(id);
    if (!element) {
      console.error('Element not found:', id);
      return;
    }
    
    // Get the text to copy - use innerText to preserve formatting
    const textToCopy = element.innerText || element.textContent;
    
    // First try automatic copying in the background
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(textToCopy)
        .catch(function(err) {
          console.log('Background copy failed, will use modal', err);
        });
    }
    
    // Show the modal with the content
    const modalContainer = document.querySelector('.copy-modal-container');
    const contentElem = document.getElementById('modal-copy-content');
    
    if (modalContainer && contentElem) {
      contentElem.textContent = textToCopy;
      modalContainer.style.display = 'flex';
      
      // Select the content for easy copying
      try {
        setTimeout(function() {
          const selection = window.getSelection();
          const range = document.createRange();
          range.selectNodeContents(contentElem);
          selection.removeAllRanges();
          selection.addRange(range);
        }, 100);
      } catch (e) {
        console.error('Could not select text:', e);
      }
    } else {
      console.error('Modal elements not found, falling back to alert');
      alert('Copy this text:\n\n' + textToCopy);
    }
  };
  
  // Direct function to handle tab switching (preserved from original)
  window.nextTab = function(baseId) {
    const structureTab = document.querySelector(`[data-tab="structure-${baseId}"]`);
    const contentTab = document.querySelector(`[data-tab="content-${baseId}"]`);
    
    if (structureTab) structureTab.classList.remove("active");
    if (contentTab) contentTab.classList.add("active");
    
    const structureContent = document.getElementById(`structure-${baseId}`);
    const contentContent = document.getElementById(`content-${baseId}`);
    
    if (structureContent) structureContent.classList.remove("active");
    if (contentContent) contentContent.classList.add("active");
  };
});
