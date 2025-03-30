document.addEventListener('DOMContentLoaded', function() {
    // Get the script tag to determine path
    const script = document.querySelector('script[src$="includes.js"]');
    const scriptSrc = script.getAttribute('src');
    const isSubdirectory = scriptSrc.includes('../');
    
    // Set the base path for includes
    const basePath = isSubdirectory ? '../includes/' : 'includes/';
    
    // Set the CSS path based on the folder level
    const cssPath = isSubdirectory ? '../styles.css' : 'styles.css';
    
    // Create and add CSS link
    const cssLink = document.createElement('link');
    cssLink.rel = 'stylesheet';
    cssLink.href = cssPath;
    document.head.insertBefore(cssLink, script);
    
    // Load head includes (skipping Google Analytics code)
    fetch(basePath + 'head-includes.html')
        .then(response => response.text())
        .then(data => {
            // Get the head element
            const head = document.querySelector('head');
            
            // Create a temporary container
            const temp = document.createElement('div');
            temp.innerHTML = data;
            
            // Skip Google Analytics code (first 8 lines)
            // Starting from the 9th element (index 8), which should be after the Google Analytics scripts
            const startIndex = 8;
            
            // Find where to insert the elements (before the script tag that loads includes.js)
            const includesScript = script;
            
            // Get all child nodes from the temp container
            const nodes = temp.childNodes;
            
            // Insert all nodes except Google Analytics code
            let elementCount = 0;
            for (let i = 0; i < nodes.length; i++) {
                if (nodes[i].nodeType === 1) { // Only count Element nodes
                    if (elementCount >= startIndex) {
                        // Insert elements after Google Analytics
                        head.insertBefore(nodes[i].cloneNode(true), includesScript);
                    }
                    elementCount++;
                }
            }
        })
        .catch(error => {
            console.error('Error loading head includes:', error);
        });

    // Load header
    fetch(basePath + 'header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
            
            // Initialize mobile menu toggle after header is loaded
            const menuToggle = document.querySelector('.menu-toggle');
            const navLinks = document.querySelector('.nav-links');
            
            if (menuToggle) {
                menuToggle.addEventListener('click', function() {
                    navLinks.classList.toggle('active');
                });
            }
        })
        .catch(error => {
            console.error('Error loading header:', error);
        });
    
    // Load footer
    fetch(basePath + 'footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        })
        .catch(error => {
            console.error('Error loading footer:', error);
        });
}); 