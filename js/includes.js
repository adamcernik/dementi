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
    
    // Load head includes
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

    // Fix footer navigation links based on current path
    fixFooterLinks();
});

// Fix footer navigation links based on current path
function fixFooterLinks() {
    // Get the current path
    const path = window.location.pathname;
    const isRoot = path === '/' || path.endsWith('index.html');
    const depth = path.split('/').filter(p => p && !p.includes('.')).length;
    
    // Wait for footer to be loaded
    const footerInterval = setInterval(() => {
        const footerLinks = document.querySelectorAll('.footer-nav a');
        if (footerLinks.length) {
            clearInterval(footerInterval);
            
            footerLinks.forEach(link => {
                let href = link.getAttribute('href');
                
                // Remove any leading ../
                href = href.replace(/^\.\.\//, '');
                
                // If we're not at root, add the right number of ../
                if (!isRoot) {
                    const prefix = depth === 0 ? '' : '../'.repeat(depth);
                    link.setAttribute('href', prefix + href);
                }
            });
        }
    }, 100);
} 