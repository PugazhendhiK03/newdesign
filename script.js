document.addEventListener('DOMContentLoaded', function() {
    // Hero Image Slideshow
    const slides = document.querySelectorAll('.bg-slide');
    let currentSlide = 0;
    let touchStartX = 0;
    let touchEndX = 0;
    let slideInterval;
    
    function initSlideshow() {
        clearInterval(slideInterval);
        
        slideInterval = setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 5000);
    }
    
    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
        initSlideshow();
    }
    
    function prevSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        initSlideshow();
    }
    
    // Touch events for hero slider
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
    
    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            nextSlide();
        } else if (touchEndX > touchStartX + 50) {
            prevSlide();
        } else {
            initSlideshow();
        }
    }
    
    // Pause slideshow when hovering
    if (window.matchMedia("(hover: hover)").matches && heroBg) {
        heroBg.addEventListener('mouseenter', function() {
            clearInterval(slideInterval);
        });
        
        heroBg.addEventListener('mouseleave', function() {
            initSlideshow();
        });
    }
    
    // Mobile Dropdown Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.navlist');
    
    menuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
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
    
    // Close menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.navlist a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                menuToggle.classList.remove('active');
                navList.classList.remove('active');
            }
        });
    });
    
    // Button accessibility and effects
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
    
    // Testimonial Slider Functionality
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    let currentTestimonialIndex = 0;
    let testimonialInterval;
    
    function showTestimonial(index) {
        testimonialCards.forEach(card => card.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        testimonialCards[index].classList.add('active');
        dots[index].classList.add('active');
        currentTestimonialIndex = index;
    }
    
    function nextTestimonial() {
        let nextIndex = (currentTestimonialIndex + 1) % testimonialCards.length;
        showTestimonial(nextIndex);
    }
    
    function startTestimonialSlider() {
        testimonialInterval = setInterval(nextTestimonial, 5000);
    }
    
    function stopTestimonialSlider() {
        clearInterval(testimonialInterval);
    }
    
    // Dot navigation for testimonials
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            showTestimonial(index);
            stopTestimonialSlider();
            startTestimonialSlider();
        });
    });
    
    // Pause testimonial slider on hover
    const testimonialContainer = document.querySelector('.testimonial-container');
    if (testimonialContainer) {
        testimonialContainer.addEventListener('mouseenter', stopTestimonialSlider);
        testimonialContainer.addEventListener('mouseleave', startTestimonialSlider);
    }
    
    // Initialize all sliders
    initSlideshow();
    showTestimonial(0);
    startTestimonialSlider();
});