// Simple fix for copy buttons
document.addEventListener('DOMContentLoaded', function() {
  // Direct function to copy text
  window.copyPrompt = function(id) {
    const element = document.getElementById(id);
    if (!element) return;
    
    navigator.clipboard.writeText(element.textContent)
      .then(() => alert('Copied to clipboard!'))
      .catch(err => alert('Failed to copy: ' + err));
  };
  
  // Direct function to handle next tab
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
