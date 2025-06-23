document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.bg-slide');
    let currentSlide = 0;
    let touchStartX = 0;
    let touchEndX = 0;
    let slideInterval;
    
    // Initialize slideshow
    function initSlideshow() {
        // Clear any existing interval
        clearInterval(slideInterval);
        
        // Change slide every 5 seconds
        slideInterval = setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 5000);
    }
    
    // Next slide function
    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
        initSlideshow(); // Reset timer
    }
    
    // Previous slide function
    function prevSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        initSlideshow(); // Reset timer
    }
    
    // Touch events for mobile swipe
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg) {
        heroBg.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
            clearInterval(slideInterval);
        }, { passive: true });
        
        heroBg.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
    }
    
    // Handle swipe gestures
    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            // Swipe left - next slide
            nextSlide();
        } else if (touchEndX > touchStartX + 50) {
            // Swipe right - previous slide
            prevSlide();
        } else {
            // No significant swipe - restart slideshow
            initSlideshow();
        }
    }
    
    // Pause slideshow when hovering (for devices with mouse)
    if (window.matchMedia("(hover: hover)").matches && heroBg) {
        heroBg.addEventListener('mouseenter', function() {
            clearInterval(slideInterval);
        });
        
        heroBg.addEventListener('mouseleave', function() {
            initSlideshow();
        });
    }
    
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.navlist');
    const navOverlay = document.createElement('div');
    navOverlay.classList.add('nav-overlay');
    document.body.appendChild(navOverlay);
    
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navList.classList.toggle('active');
        navOverlay.classList.toggle('active');
        
        // Toggle body scroll when menu is open
        if (navList.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Close menu when clicking on overlay
    navOverlay.addEventListener('click', function() {
        menuToggle.classList.remove('active');
        navList.classList.remove('active');
        this.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Close menu when clicking on a nav link (for single page navigation)
    const navLinks = document.querySelectorAll('.navlist a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                menuToggle.classList.remove('active');
                navList.classList.remove('active');
                navOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    // Make buttons more accessible
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
        
        // Add ripple effect
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            
            const x = e.clientX - e.target.getBoundingClientRect().left;
            const y = e.clientY - e.target.getBoundingClientRect().top;
            
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Start the slideshow
    initSlideshow();
});