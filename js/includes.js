document.addEventListener('DOMContentLoaded', function() {
    // Get the script tag to determine path
    const script = document.querySelector('script[src$="includes.js"]');
    const scriptSrc = script.getAttribute('src');
    const isSubdirectory = scriptSrc.includes('../');
    
    // Set the base path for includes
    const basePath = isSubdirectory ? '../includes/' : 'includes/';
    
    // Load head includes (only if not already loaded manually)
    if (!document.querySelector('head').innerHTML.includes('head-includes loaded')) {
        fetch(basePath + 'head-includes.html')
            .then(response => response.text())
            .then(data => {
                // Get the head element
                const head = document.querySelector('head');
                
                // Create a temporary container
                const temp = document.createElement('div');
                temp.innerHTML = data;
                
                // Get all child nodes from the fetched content
                const nodes = temp.childNodes;
                
                // Find where to insert the elements (before the script tag that loads includes.js)
                const includesScript = script;
                
                // Insert all nodes before the includes.js script
                for (let i = 0; i < nodes.length; i++) {
                    if (nodes[i].nodeType === 1) { // Only insert Element nodes
                        head.insertBefore(nodes[i].cloneNode(true), includesScript);
                    }
                }
                
                // Add a marker to indicate head-includes have been loaded
                const marker = document.createElement('meta');
                marker.setAttribute('name', 'head-includes-loaded');
                marker.setAttribute('content', 'true');
                head.appendChild(marker);
            })
            .catch(error => {
                console.error('Error loading head includes:', error);
            });
    }

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