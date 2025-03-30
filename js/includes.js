document.addEventListener('DOMContentLoaded', function() {
    // Load head includes
    fetch('includes/head-includes.html')
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
            const includesScript = document.querySelector('script[src="js/includes.js"]');
            
            // Insert all nodes before the includes.js script
            for (let i = 0; i < nodes.length; i++) {
                if (nodes[i].nodeType === 1) { // Only insert Element nodes
                    head.insertBefore(nodes[i].cloneNode(true), includesScript);
                }
            }
        })
        .catch(error => {
            console.error('Error loading head includes:', error);
        });

    // Load header
    fetch('includes/header.html')
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
    fetch('includes/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        })
        .catch(error => {
            console.error('Error loading footer:', error);
        });
}); 