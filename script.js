// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // ===== HERO SLIDESHOW =====
    const slides = document.querySelectorAll('.bg-slide');
    let currentSlide = 0;
    let touchStartX = 0;
    let touchEndX = 0;
    let slideInterval;

    // Set appropriate background images based on screen size
    function setResponsiveBackgrounds() {
        const isMobile = window.innerWidth <= 992; // Match your CSS breakpoint
        
        slides.forEach(slide => {
            const desktopImg = slide.getAttribute('data-desktop');
            const mobileImg = slide.getAttribute('data-mobile');
            slide.style.backgroundImage = `url(${isMobile ? mobileImg : desktopImg})`;
        });
    }

    // Initialize slideshow with first slide active
    function initSlideshow() {
        clearInterval(slideInterval); // Clear any existing interval
        setResponsiveBackgrounds(); // Set correct images for current screen size
        
        // Set interval for automatic slideshow
        slideInterval = setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
            setResponsiveBackgrounds(); // Update images on slide change
        }, 5000); // Change slide every 5 seconds
    }

    // Go to next slide
    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
        setResponsiveBackgrounds();
        initSlideshow(); // Reset timer
    }

    // Go to previous slide
    function prevSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        setResponsiveBackgrounds();
        initSlideshow(); // Reset timer
    }

    // Touch events for mobile swipe navigation
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg) {
        heroBg.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
            clearInterval(slideInterval); // Pause autoplay during swipe
        }, { passive: true });
        
        heroBg.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
    }

    // Determine swipe direction and navigate accordingly
    function handleSwipe() {
        if (touchEndX < touchStartX - 50) { // Swipe left
            nextSlide();
        } else if (touchEndX > touchStartX + 50) { // Swipe right
            prevSlide();
        } else { // Not a significant swipe
            initSlideshow(); // Resume autoplay
        }
    }

    // Pause slideshow when hovering (desktop only)
    if (window.matchMedia("(hover: hover)").matches && heroBg) {
        heroBg.addEventListener('mouseenter', function() {
            clearInterval(slideInterval); // Pause on hover
        });
        
        heroBg.addEventListener('mouseleave', function() {
            initSlideshow(); // Resume when mouse leaves
        });
    }

    // ===== MOBILE DROPDOWN MENU =====
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.navlist');
    
    // Toggle menu when hamburger is clicked
    menuToggle.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent event bubbling
        this.classList.toggle('active');
        navList.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navList.classList.contains('active') && 
            !e.target.closest('.navigation') && 
            e.target !== menuToggle) {
            menuToggle.classList.remove('active');
            navList.classList.remove('active');
        }
    });
    
    // Close menu when clicking on a nav link (mobile only)
    const navLinks = document.querySelectorAll('.navlist a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                menuToggle.classList.remove('active');
                navList.classList.remove('active');
            }
        });
    });

    // ===== WINDOW RESIZE HANDLER =====
    window.addEventListener('resize', function() {
        setResponsiveBackgrounds(); // Update images on resize
    });

    // ===== TESTIMONIAL SLIDER =====
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    let currentTestimonialIndex = 0;
    let testimonialInterval;

    // Show specific testimonial
    function showTestimonial(index) {
        testimonialCards.forEach(card => card.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        testimonialCards[index].classList.add('active');
        dots[index].classList.add('active');
        currentTestimonialIndex = index;
    }

    // Go to next testimonial
    function nextTestimonial() {
        let nextIndex = (currentTestimonialIndex + 1) % testimonialCards.length;
        showTestimonial(nextIndex);
    }

    // Start automatic testimonial slider
    function startTestimonialSlider() {
        testimonialInterval = setInterval(nextTestimonial, 5000); // Rotate every 5s
    }

    // Stop automatic sliding
    function stopTestimonialSlider() {
        clearInterval(testimonialInterval);
    }

    // Dot navigation click handlers
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            showTestimonial(index);
            stopTestimonialSlider();
            startTestimonialSlider(); // Reset timer
        });
    });
    
    // Pause on hover (desktop only)
    const testimonialContainer = document.querySelector('.testimonial-container');
    if (testimonialContainer) {
        testimonialContainer.addEventListener('mouseenter', stopTestimonialSlider);
        testimonialContainer.addEventListener('mouseleave', startTestimonialSlider);
    }

    // ===== BUTTON EFFECTS =====
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        // Keyboard accessibility
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
        
        // Ripple effect
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            
            // Position ripple at click location
            const x = e.clientX - e.target.getBoundingClientRect().left;
            const y = e.clientY - e.target.getBoundingClientRect().top;
            
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // ===== INITIALIZE EVERYTHING =====
    setResponsiveBackgrounds(); // Set correct images on load
    initSlideshow(); // Start hero slideshow
    showTestimonial(0); // Show first testimonial
    startTestimonialSlider(); // Start testimonial slider
});