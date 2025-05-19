// Comprehensive toolkit functionality fix
document.addEventListener('DOMContentLoaded', function() {
  console.log("Toolkit fix script loaded");

  // SECTION 1: COPY FUNCTIONALITY FIX
  // Create the modal dialog element once if it doesn't exist
  if (!document.querySelector('.copy-modal-container')) {
    console.log("Creating copy modal");
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

    // Add CSS for the modal
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
    setupModalHandlers();
  }

  // Set up modal handlers
  function setupModalHandlers() {
    const modalContainer = document.querySelector('.copy-modal-container');
    const closeBtn = modalContainer.querySelector('.copy-modal-close');
    const copyBtn = modalContainer.querySelector('.copy-modal-button');
    const contentElem = modalContainer.querySelector('#modal-copy-content');

    closeBtn.addEventListener('click', function() {
      modalContainer.style.display = 'none';
    });

    modalContainer.addEventListener('click', function(e) {
      if (e.target === modalContainer) {
        modalContainer.style.display = 'none';
      }
    });

    copyBtn.addEventListener('click', function() {
      const text = contentElem.textContent;
      console.log("Copying text:", text.substring(0, 50) + "...");
      
      // Method 1: Use a temporary textarea for more reliable copying
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      
      try {
        const successful = document.execCommand('copy');
        if (successful) {
          console.log("Copy successful via execCommand");
          showCopySuccess(copyBtn);
        } else {
          console.warn("execCommand copy failed, trying clipboard API");
          clipboardApiCopy(text, copyBtn);
        }
      } catch (err) {
        console.error('execCommand failed:', err);
        clipboardApiCopy(text, copyBtn);
      } finally {
        document.body.removeChild(textarea);
      }
    });
  }

  // Clipboard API copy method
  function clipboardApiCopy(text, button) {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text)
        .then(function() {
          console.log("Copy successful via Clipboard API");
          showCopySuccess(button);
        })
        .catch(function(err) {
          console.error('Clipboard API error:', err);
          alert('Please use keyboard shortcut Ctrl+C/Cmd+C to copy');
        });
    } else {
      console.warn("Clipboard API not available");
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

  // Show notification on screen
  function showNotification(message, type = 'success') {
    console.log("Showing notification:", message);
    
    // Create notification element
    const notif = document.createElement('div');
    notif.className = `toolkit-notification ${type}`;
    notif.textContent = message;
    notif.style.position = 'fixed';
    notif.style.top = '20px';
    notif.style.left = '50%';
    notif.style.transform = 'translateX(-50%)';
    notif.style.padding = '12px 20px';
    notif.style.borderRadius = '6px';
    notif.style.backgroundColor = type === 'success' ? '#00e0e0' : '#ff6b6b';
    notif.style.color = '#0f172a';
    notif.style.fontWeight = 'bold';
    notif.style.zIndex = '10001';
    notif.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    
    document.body.appendChild(notif);
    
    // Remove after delay
    setTimeout(function() {
      notif.style.opacity = '0';
      notif.style.transition = 'opacity 0.5s ease';
      setTimeout(function() {
        document.body.removeChild(notif);
      }, 500);
    }, 3000);
  }

  // Find all copy buttons and add direct click handlers
  const copyButtons = document.querySelectorAll('button, .button, [class*="btn"], [class*="button"]');
  copyButtons.forEach(function(btn) {
    if (btn.textContent.includes('Copy') || 
        btn.innerHTML.includes('Copy') || 
        btn.getAttribute('onclick')?.includes('copy')) {
      console.log("Found copy button:", btn);
      
      // Remove any existing onclick handler and add our own
      if (btn.getAttribute('onclick')) {
        btn.removeAttribute('onclick');
      }
      
      // Add our event listener only if it doesn't already have one
      const hasListener = btn._hasCopyListener;
      if (!hasListener) {
        btn._hasCopyListener = true;
        btn.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          
          // Find the target element to copy
          let targetId;
          const cardElement = btn.closest('.prompt-card') || btn.closest('[id$="-card"]') || btn.closest('section');
          
          if (cardElement) {
            // Look for specific elements
            const promptElement = cardElement.querySelector('.prompt-template') || 
                                  cardElement.querySelector('[id$="-structure"]') ||
                                  cardElement.querySelector('[id$="-output"]') ||
                                  cardElement.querySelector('pre');
            if (promptElement) {
              targetId = promptElement.id;
            }
          }
          
          // If we couldn't find it that way, try to get it from nearby elements
          if (!targetId) {
            const cardId = cardElement?.id || btn.closest('[id]')?.id;
            if (cardId) {
              // Try common naming patterns
              const possibleIds = [
                `${cardId}-structure`,
                `${cardId}-output`,
                cardId.replace('-card', '-structure'),
                cardId.replace('-card', '-output'),
                cardId.replace('-copy-btn', '-structure'),
                cardId.replace('-copy-btn', '-output')
              ];
              
              for (const id of possibleIds) {
                if (document.getElementById(id)) {
                  targetId = id;
                  break;
                }
              }
            }
          }
          
          // If we still don't have a target, look for any nearby output element
          if (!targetId && cardElement) {
            const outputElement = cardElement.querySelector('[id$="-output"]') || 
                                cardElement.querySelector('pre') || 
                                cardElement.querySelector('code');
            if (outputElement) {
              targetId = outputElement.id;
              
              // If no id, assign a temporary one
              if (!targetId) {
                targetId = 'temp-output-element-' + Math.floor(Math.random() * 10000);
                outputElement.id = targetId;
              }
            }
          }
          
          console.log("Target ID for copy:", targetId);
          
          if (targetId) {
            window.copyPrompt(targetId);
          } else {
            console.error("Could not find target element to copy");
            alert("Could not find text to copy. Please try again or report this issue.");
          }
        });
      }
    }
  });

  // SECTION 2: FIXING STEP BUTTONS
  
  // Fix step buttons
  const stepButtons = document.querySelectorAll('[class*="step"], [id*="step"], [data-step]');
  stepButtons.forEach(function(btn) {
    if (btn.textContent.includes('Step') || 
        btn.innerHTML.includes('Step') || 
        btn.getAttribute('data-step')) {
      console.log("Found step button:", btn);
      
      // Get step number from various sources
      const stepText = btn.textContent || '';
      let stepNumber = btn.getAttribute('data-step') || 
                      (stepText.match(/step\s*(\d+)/i) || [])[1] || 
                      btn.id?.match(/step-(\d+)/)?.[ 1];
      
      if (stepNumber) {
        // Add the step number as a data attribute if not present
        if (!btn.getAttribute('data-step')) {
          btn.setAttribute('data-step', stepNumber);
        }
        
        // Add our event listener only if it doesn't already have one
        const hasListener = btn._hasStepListener;
        if (!hasListener) {
          btn._hasStepListener = true;
          btn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log("Activating step:", stepNumber);
            activateStep(stepNumber);
          });
        }
      }
    }
  });
  
  // SECTION 3: FIXING GENERATE PROMPT BUTTONS
  
  // Find all generate buttons
  const generateButtons = document.querySelectorAll('button, .button, [class*="btn"], [class*="button"]');
  generateButtons.forEach(function(btn) {
    if ((btn.textContent && btn.textContent.includes('Generate')) || 
        (btn.innerHTML && btn.innerHTML.includes('Generate')) || 
        (btn.getAttribute('onclick') && btn.getAttribute('onclick').includes('generate'))) {
      console.log("Found generate button:", btn);
      
      // Remove any existing onclick handler
      if (btn.getAttribute('onclick')) {
        btn.removeAttribute('onclick');
      }
      
      // Add our event listener only if it doesn't already have one
      const hasListener = btn._hasGenerateListener;
      if (!hasListener) {
        btn._hasGenerateListener = true;
        btn.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          
          // Find the base ID
          const cardElement = btn.closest('.prompt-card') || 
                             btn.closest('[id$="-card"]') || 
                             btn.closest('section') ||
                             btn.closest('form');
          let baseId;
          
          if (cardElement && cardElement.id) {
            baseId = cardElement.id.replace('-card', '')
                               .replace('-form', '')
                               .replace('-section', '')
                               .replace('-generate-btn', '')
                               .replace('-container', '');
          } else {
            // Try to derive base ID from button ID or class
            if (btn.id && btn.id.includes('-generate')) {
              baseId = btn.id.replace('-generate-btn', '')
                         .replace('-generate', '');
            }
          }
          
          // If still no baseId, try to find common elements to deduce it
          if (!baseId) {
            // Look for common output or structure elements
            const outputElem = document.querySelector('[id$="-output"]');
            const structureElem = document.querySelector('[id$="-structure"]');
            
            if (outputElem && outputElem.id) {
              baseId = outputElem.id.replace('-output', '');
            } else if (structureElem && structureElem.id) {
              baseId = structureElem.id.replace('-structure', '');
            }
          }
          
          // If we found a baseId, use it
          if (baseId) {
            console.log("Base ID for generate:", baseId);
            generatePrompt(baseId);
          } else {
            console.error("Could not find base ID for generate prompt");
            generatePromptFromPage(); // Fallback to using whole page
          }
        });
      }
    }
  });

  // Activate a step by number
  function activateStep(stepNumber) {
    console.log("Activating step", stepNumber);
    
    // Find all step content elements
    const stepContents = document.querySelectorAll('.step-content, [id^="step-"], [data-step]');
    console.log("Found step contents:", stepContents.length);
    
    // Hide all step contents
    stepContents.forEach(function(step) {
      // Check if it's a content element, not a button
      if (!step.tagName || step.tagName.toLowerCase() !== 'button') {
        const stepData = step.getAttribute('data-step');
        
        // Skip the active step
        if (stepData !== stepNumber.toString()) {
          console.log("Hiding step:", step.id || step.className);
          step.style.display = 'none';
        }
      }
    });
    
    // Show the requested step
    const stepContent = document.getElementById(`step-${stepNumber}`) || 
                        document.querySelector(`[data-step="${stepNumber}"]`);
    if (stepContent) {
      console.log("Showing step:", stepContent.id || stepContent.className);
      stepContent.style.display = 'block';
    } else {
      console.warn(`Could not find content for step ${stepNumber}`);
    }
    
    // Update step indicators
    document.querySelectorAll('.step-indicator, .step-button, [data-step]').forEach(function(indicator) {
      // Only apply to buttons and indicators, not content sections
      if (indicator.tagName && indicator.tagName.toLowerCase() === 'button' || 
          indicator.classList.contains('step-indicator') ||
          indicator.classList.contains('step-button')) {
        
        const indicatorStep = indicator.getAttribute('data-step') || 
                             (indicator.textContent.match(/step\s*(\d+)/i) || [])[1];
        
        if (indicatorStep) {
          if (indicatorStep === stepNumber.toString()) {
            console.log("Activating step indicator:", indicator.id || indicator.className);
            indicator.classList.add('active');
          } else {
            console.log("Deactivating step indicator:", indicator.id || indicator.className);
            indicator.classList.remove('active');
          }
        }
      }
    });
  }

  // Generate prompt from the whole page as fallback
  function generatePromptFromPage() {
    console.log("Generating prompt from page elements");
    
    // Try to find structure and inputs
    const structureElement = document.querySelector('.prompt-template') || 
                            document.querySelector('[id$="-structure"]') || 
                            document.querySelector('pre');
    
    // Get all form inputs
    const inputElements = document.querySelectorAll('input, textarea, select');
    const inputData = {};
    
    inputElements.forEach(function(input) {
      if (input.name && input.value) {
        inputData[input.name] = input.value.trim();
      } else if (input.id && input.value) {
        inputData[input.id] = input.value.trim();
      }
    });
    
    // Build prompt
    let generatedPrompt = "";
    
    if (structureElement) {
      generatedPrompt = structureElement.textContent + "\n\n";
    }
    
    if (Object.keys(inputData).length > 0) {
      generatedPrompt += "SPECIFIC DETAILS:\n\n";
      
      for (const [key, value] of Object.entries(inputData)) {
        if (value) {
          // Format key from camelCase or kebab-case to Title Case
          const formattedKey = key
            .replace(/-/g, " ")
            .replace(/([A-Z])/g, " $1")
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
          
          generatedPrompt += `${formattedKey}: ${value}\n`;
        }
      }
    }
    
    // Find or create output element
    let outputElement = document.querySelector('[id$="-output"]');
    
    if (!outputElement) {
      // Create output element if doesn't exist
      outputElement = document.createElement('pre');
      outputElement.id = 'generated-output';
      outputElement.className = 'generated-output';
      outputElement.style.whiteSpace = 'pre-wrap';
      outputElement.style.wordBreak = 'break-word';
      outputElement.style.backgroundColor = 'rgba(30, 41, 59, 0.7)';
      outputElement.style.color = '#f8fafc';
      outputElement.style.padding = '15px';
      outputElement.style.borderRadius = '8px';
      outputElement.style.marginTop = '20px';
      outputElement.style.border = '1px solid rgba(255, 255, 255, 0.1)';
      
      // Find a place to insert it
      const insertPoint = document.querySelector('.step-content:last-child') || 
                         document.querySelector('form') || 
                         document.querySelector('main') || 
                         document.body;
      
      insertPoint.appendChild(outputElement);
    }
    
    // Display the generated prompt
    outputElement.textContent = generatedPrompt;
    outputElement.style.display = 'block';
    
    // Show notification
    showNotification("Complete prompt generated!");
    
    // Scroll to output
    outputElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // Generate prompt function - main implementation
  function generatePrompt(baseId) {
    console.log("Generating prompt for base ID:", baseId);
    
    // 1. Get the structure from Step 1
    const structureElement = document.getElementById(`${baseId}-structure`);
    if (!structureElement) {
      console.error(`Structure element not found for ${baseId}`);
      return;
    }
    
    const structureText = structureElement.textContent || structureElement.innerText;
    if (!structureText) {
      console.error("Structure text is empty");
      return;
    }
    
    console.log("Found structure text:", structureText.substring(0, 50) + "...");
    
    // 2. Get all input values from Step 2
    const inputElements = document.querySelectorAll(`[id^="${baseId}-"], [name^="${baseId}-"]`);
    if (inputElements.length === 0) {
      console.warn(`No input elements found for base ID: ${baseId}`);
    }

    const inputData = {};
    inputElements.forEach((input) => {
      // Skip non-input elements and special elements
      if (input.id === `${baseId}-structure` || 
          input.id === `${baseId}-output` || 
          input.id === `${baseId}-copy-btn` || 
          input.id === `${baseId}-generate-btn` ||
          !input.value) {
        return;
      }
      
      if (input.tagName === "INPUT" || input.tagName === "TEXTAREA" || input.tagName === "SELECT") {
        // Extract the field name from the ID or name
        let key = "";
        if (input.id && input.id.startsWith(`${baseId}-`)) {
          key = input.id.replace(`${baseId}-`, "");
        } else if (input.name && input.name.startsWith(`${baseId}-`)) {
          key = input.name.replace(`${baseId}-`, "");
        } else {
          // If no prefix match, use the full id/name
          key = input.id || input.name;
        }
        
        if (key) {
          inputData[key] = input.value.trim();
        }
      }
    });
    
    console.log("Collected input data:", inputData);

    // 3. Create the combined prompt
    let outputPrompt = structureText;
    
    // Add separator between structure and details
    outputPrompt += "\n\n";
    outputPrompt += "PHASE 2: CONTENT DEVELOPMENT\n";
    outputPrompt += "Now, use the following specific details to populate the above framework:\n\n";

    // Add each input field with a label
    for (const [key, value] of Object.entries(inputData)) {
      if (value) {
        // Format key from camelCase or kebab-case to Title Case
        const formattedKey = key
          .replace(/-/g, " ")
          .replace(/([A-Z])/g, " $1")
          .replace(/_/g, " ")
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");

        outputPrompt += `${formattedKey}: ${value}\n\n`;
      }
    }

    // Add final instructions
    outputPrompt += "Please generate a detailed document following the structure provided in Phase 1, incorporating these specific details. Ensure the document is comprehensive, well-organized, and actionable.";

    // 4. Display the complete prompt
    const outputElement = document.getElementById(`${baseId}-output`);
    if (!outputElement) {
      console.error(`Output element not found for ${baseId}, creating one`);
      
      // Create output element
      const newOutputElement = document.createElement('pre');
      newOutputElement.id = `${baseId}-output`;
      newOutputElement.className = 'prompt-output';
      newOutputElement.style.whiteSpace = 'pre-wrap';
      newOutputElement.style.wordBreak = 'break-word';
      newOutputElement.style.backgroundColor = 'rgba(30, 41, 59, 0.7)';
      newOutputElement.style.color = '#f8fafc';
      newOutputElement.style.padding = '15px';
      newOutputElement.style.borderRadius = '8px';
      newOutputElement.style.marginTop = '20px';
      newOutputElement.style.border = '1px solid rgba(255, 255, 255, 0.1)';
      
      // Find the parent container to append to
      const parentContainer = document.getElementById(`${baseId}-card`) || 
                             document.querySelector(`[data-step="2"]`) || 
                             document.querySelector('.step-content:last-child');
      
      if (parentContainer) {
        parentContainer.appendChild(newOutputElement);
        console.log("Created new output element");
      } else {
        console.error("Could not find parent container for output element");
        return;
      }
      
      // Update our reference to the newly created element
      outputElement = newOutputElement;
    }

    // Set the output text
    outputElement.textContent = outputPrompt;
    outputElement.style.display = 'block';
    
    console.log("Generated prompt:", outputPrompt.substring(0, 100) + "...");

    // 5. Update UI and provide feedback
    // Update copy button text if it exists
    const copyBtn = document.getElementById(`${baseId}-copy-btn`);
    if (copyBtn) {
      copyBtn.innerHTML = `
        <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
        Copy Complete Prompt
      `;
    }

    // Show notification
    showNotification("Complete prompt generated!");
    
    // Scroll to the output
    outputElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // Main copy function that will be called by buttons
  window.copyPrompt = function(id) {
    console.log("Copy function triggered for:", id);
    
    // First try to get the element directly
    let element = document.getElementById(id);
    
    // If not found, try different variants of the ID
    if (!element) {
      const alternativeIds = [
        `${id}-structure`,
        `${id}-content`,
        `${id}-output`,
        id.replace('-copy-btn', '-structure'),
        id.replace('-card', '-structure'),
        id.replace('-copy-btn', '-output'),
        id.replace('-card', '-output')
      ];
      
      for (const altId of alternativeIds) {
        element = document.getElementById(altId);
        if (element) {
          console.log("Found element with alternative ID:", altId);
          break;
        }
      }
    }
    
    // If still not found, try to find it by other means
    if (!element) {
      // Try to find any relevant content element
      element = document.querySelector('.prompt-template') || 
                document.querySelector('[id$="-output"]') ||
                document.querySelector('pre') || 
                document.querySelector('code');
      
      if (element) {
        console.log("Falling back to first available content element");
      }
    }
    
    if (!element) {
      console.error("Element not found for copying:", id);
      alert("Could not find content to copy. Please try again or report this issue.");
      return;
    }
    
    // Get the text to copy - check multiple properties for best results
    const textToCopy = element.value || element.innerText || element.textContent;
    
    if (!textToCopy || textToCopy.trim() === '') {
      console.error("Element exists but has no content:", id);
      alert("The selected content appears to be empty. Please try another element or report this issue.");
      return;
    }
    
    console.log("Content found for copying:", textToCopy.substring(0, 50) + "...");
    
    // First try automatic copying in the background
    try {
      const textarea = document.createElement('textarea');
      textarea.value = textToCopy;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      console.log("Background copy attempted via execCommand");
    } catch (err) {
      console.log("Background copy failed:", err);
    }
    
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(textToCopy).then(function() {
        console.log("Background copy successful via Clipboard API");
      }).catch(function(err) {
        console.log("Background Clipboard API copy failed:", err);
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
  
  // Direct function to handle tab switching
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

  // Set default active step if none is active
  setTimeout(function() {
    const hasActiveStep = document.querySelector('.step-button.active') || 
                         document.querySelector('.step-indicator.active');
    if (!hasActiveStep) {
      console.log("No active step found, activating step 1");
      activateStep(1);
    }
  }, 100);
});
