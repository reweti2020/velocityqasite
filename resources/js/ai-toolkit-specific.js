// Toolkit-specific JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('AI Toolkit specific JS loaded');
    
    // Initialize any specific functionality for the AI toolkit
    initializeToolkitSpecific();
});

function initializeToolkitSpecific() {
    // Add any toolkit-specific initializations here
    console.log('Toolkit-specific initialization complete');
    
    // Set up search functionality
    const searchInput = document.getElementById('toolkit-search');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            searchPrompts(searchTerm);
        });
    }
}

function searchPrompts(searchTerm) {
    const promptCards = document.querySelectorAll('.prompt-card');
    let matchCount = 0;
    
    promptCards.forEach(card => {
        const title = card.querySelector('.card-title').textContent.toLowerCase();
        const description = card.querySelector('.card-description').textContent.toLowerCase();
        const content = card.querySelector('.prompt-content').textContent.toLowerCase();
        
        // Check if the card content matches the search term
        if (title.includes(searchTerm) || description.includes(searchTerm) || content.includes(searchTerm)) {
            card.style.display = 'block';
            matchCount++;
        } else {
            card.style.display = 'none';
        }
    });
    
    // Show or hide the "no results" message
    const noResultsMessage = document.getElementById('no-results-message');
    if (noResultsMessage) {
        if (matchCount === 0 && searchTerm.length > 0) {
            noResultsMessage.style.display = 'block';
        } else {
            noResultsMessage.style.display = 'none';
        }
    }
}
