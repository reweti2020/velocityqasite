/**
 * Schema Markup Fix for VelocityQA
 * Ensures proper schema structure across the site
 */
document.addEventListener('DOMContentLoaded', function() {
  // Fix schema markup structure issues
  fixSchemaMarkup();
  
  function fixSchemaMarkup() {
    // Get all script elements with type application/ld+json
    const schemaScripts = document.querySelectorAll('script[type="application/ld+json"]');
    
    schemaScripts.forEach(script => {
      try {
        // Parse the JSON content
        const schemaData = JSON.parse(script.textContent);
        
        // Check for pricing inconsistencies in Service schemas
        if (schemaData['@type'] === 'Service' && schemaData.offers) {
          // Standardize pricing to $125/hr for Precision Strike
          if (schemaData.name === 'Precision Strike' || schemaData.name === 'Pay-As-You-Go QA Testing') {
            // Ensure consistent pricing
            if (schemaData.offers.price !== '125.00') {
              schemaData.offers.price = '125.00';
              // Update priceSpecification if it exists
              if (schemaData.offers.priceSpecification) {
                schemaData.offers.priceSpecification.price = '125.00';
              }
            }
          }
        }
        
        // Deduplicate Service schemas by checking for similar ones
        if (schemaData['@type'] === 'Service') {
          const serviceName = schemaData.name;
          const otherServices = Array.from(schemaScripts)
            .filter(s => s !== script)
            .map(s => {
              try {
                return JSON.parse(s.textContent);
              } catch (e) {
                return null;
              }
            })
            .filter(s => s && s['@type'] === 'Service' && s.name === serviceName);
            
          // If duplicate services exist, mark this script for potential removal
          if (otherServices.length > 0) {
            script.setAttribute('data-schema-duplicate', 'true');
          }
        }
        
        // Update schema with fixed content
        script.textContent = JSON.stringify(schemaData);
      } catch (e) {
        console.warn('Error fixing schema markup:', e);
      }
    });
    
    // Handle incomplete schema scripts (those with missing closing tags)
    document.querySelectorAll('script[type="application/ld+json"][data-schema-duplicate="true"]').forEach(script => {
      // We don't remove them directly to avoid breaking the page, just empty them
      script.textContent = '{}';
    });
  }
});
