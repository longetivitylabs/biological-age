// Step 1: Create a new JavaScript file named clean-urls.js
// This will handle all the URL rewriting logic

// clean-urls.js
document.addEventListener('DOMContentLoaded', function() {
    // Part 1: Remove .html from current URL if present
    if (window.location.pathname.endsWith('.html')) {
      const cleanPath = window.location.pathname.slice(0, -5);
      window.history.replaceState({}, document.title, cleanPath);
    }
    
    // Part 2: Update all internal links to remove .html extension
    document.querySelectorAll('a').forEach(link => {
      const href = link.getAttribute('href');
      // Only modify internal .html links (not external URLs)
      if (href && href.endsWith('.html') && !href.startsWith('http')) {
        link.setAttribute('href', href.slice(0, -5));
      }
    });
  });
  
  // Step 3: Add this to all your HTML pages right before the closing </body> tag
  /*
  <script src="path/to/clean-urls.js"></script>
  */