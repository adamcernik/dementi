document.addEventListener('DOMContentLoaded', function() {
    // Get all links that have a hash (#) in them
    const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    
    // Add click event listener to each anchor link
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Prevent default behavior
            e.preventDefault();
            
            // Get the target element
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Calculate how far to scroll
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition;
                
                // Timing
                const duration = 1000; // ms
                let start = null;
                
                // Animation function
                function animation(currentTime) {
                    if (start === null) start = currentTime;
                    const timeElapsed = currentTime - start;
                    const progress = Math.min(timeElapsed / duration, 1);
                    
                    // Easing function for smooth deceleration
                    const ease = easeOutQuart(progress);
                    
                    window.scrollTo(0, startPosition + distance * ease);
                    
                    if (timeElapsed < duration) {
                        requestAnimationFrame(animation);
                    }
                }
                
                // Easing function: easeOutQuart
                function easeOutQuart(t) {
                    return 1 - Math.pow(1 - t, 4);
                }
                
                // Start the animation
                requestAnimationFrame(animation);
            }
        });
    });
}); 