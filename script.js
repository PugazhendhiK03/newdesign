document.addEventListener('DOMContentLoaded', function() {
    // ===== HERO SLIDESHOW =====
    const slides = document.querySelectorAll('.hero-bg .bg-slide');
    const aboutSlide = document.querySelector('.about-hero-bg .bg-slide');
    const servicesSlide = document.querySelector('.services-hero-bg .bg-slide');

    let currentSlide = 0;
    let touchStartX = 0;
    let touchEndX = 0;
    let slideInterval;

    // Set appropriate background images based on screen size
    function setResponsiveBackgrounds() {
        const isMobile = window.innerWidth <= 992;
        
        // Home page slides
        slides.forEach(slide => {
            const desktopImg = slide.getAttribute('data-desktop');
            const mobileImg = slide.getAttribute('data-mobile');
            slide.style.backgroundImage = `url(${isMobile ? mobileImg : desktopImg})`;
        });
        
        // About page slide
        if (aboutSlide) {
            const desktopImg = aboutSlide.getAttribute('data-desktop');
            const mobileImg = aboutSlide.getAttribute('data-mobile');
            aboutSlide.style.backgroundImage = `url(${isMobile ? mobileImg : desktopImg})`;
        }
        // Services page slide
        const servicesSlide = document.querySelector('.services-hero-bg .bg-slide');
        if (servicesSlide) {
            const desktopImg = servicesSlide.getAttribute('data-desktop');
            const mobileImg = servicesSlide.getAttribute('data-mobile');
            servicesSlide.style.backgroundImage = `url(${isMobile ? mobileImg : desktopImg})`;
        }
        // Contact page slide
        const contactSlide = document.querySelector('.contact-hero-bg .bg-slide');
        if (contactSlide) {
            const desktopImg = contactSlide.getAttribute('data-desktop');
            const mobileImg = contactSlide.getAttribute('data-mobile');
            contactSlide.style.backgroundImage = `url(${isMobile ? mobileImg : desktopImg})`;
        }
        // Booking page slide
        const bookingSlide = document.querySelector('.booking-hero-bg .bg-slide');
        if (bookingSlide) {
            const desktopImg = bookingSlide.getAttribute('data-desktop');
            const mobileImg = bookingSlide.getAttribute('data-mobile');
            bookingSlide.style.backgroundImage = `url(${window.innerWidth <= 992 ? mobileImg : desktopImg})`;
        }
    }

    // Initialize slideshow
    function initSlideshow() {
        clearInterval(slideInterval);
        setResponsiveBackgrounds();
        
        if (slides.length > 0) {
            slideInterval = setInterval(() => {
                slides[currentSlide].classList.remove('active');
                currentSlide = (currentSlide + 1) % slides.length;
                slides[currentSlide].classList.add('active');
                setResponsiveBackgrounds();
            }, 5000);
        }
    }

    // Next slide
    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
        setResponsiveBackgrounds();
        initSlideshow();
    }

    // Previous slide
    function prevSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        setResponsiveBackgrounds();
        initSlideshow();
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

    // Handle swipe gesture
    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            nextSlide();
        } else if (touchEndX > touchStartX + 50) {
            prevSlide();
        } else {
            initSlideshow();
        }
    }

    // Pause slideshow on hover (desktop)
    if (window.matchMedia("(hover: hover)").matches && heroBg) {
        heroBg.addEventListener('mouseenter', function() {
            clearInterval(slideInterval);
        });
        
        heroBg.addEventListener('mouseleave', function() {
            initSlideshow();
        });
    }

    // ===== HEADER SCROLL EFFECT =====
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (!header) return;
        
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Force header to update on page load
    window.dispatchEvent(new Event('scroll'));

    // ===== MOBILE MENU =====
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.navlist');
    
    if (menuToggle && navList) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('active');
            navList.classList.toggle('active');
        });
        
        document.addEventListener('click', function(e) {
            if (navList.classList.contains('active') && 
                !e.target.closest('.navigation') && 
                e.target !== menuToggle) {
                menuToggle.classList.remove('active');
                navList.classList.remove('active');
            }
        });
        
        const navLinks = document.querySelectorAll('.navlist a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    menuToggle.classList.remove('active');
                    navList.classList.remove('active');
                }
            });
        });
    }

    // ===== TESTIMONIAL SLIDER =====
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    let currentTestimonialIndex = 0;
    let testimonialInterval;

    // Show testimonial
    function showTestimonial(index) {
        testimonialCards.forEach(card => card.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        testimonialCards[index].classList.add('active');
        dots[index].classList.add('active');
        currentTestimonialIndex = index;
    }

    // Next testimonial
    function nextTestimonial() {
        let nextIndex = (currentTestimonialIndex + 1) % testimonialCards.length;
        showTestimonial(nextIndex);
    }

    // Start testimonial slider
    function startTestimonialSlider() {
        if (testimonialCards.length > 0) {
            testimonialInterval = setInterval(nextTestimonial, 5000);
        }
    }

    // Stop testimonial slider
    function stopTestimonialSlider() {
        clearInterval(testimonialInterval);
    }

    // Dot navigation
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            showTestimonial(index);
            stopTestimonialSlider();
            startTestimonialSlider();
        });
    });
    
    // Pause on hover
    const testimonialContainer = document.querySelector('.testimonial-container');
    if (testimonialContainer) {
        testimonialContainer.addEventListener('mouseenter', stopTestimonialSlider);
        testimonialContainer.addEventListener('mouseleave', startTestimonialSlider);
    }

    // ===== SERVICE MODAL =====
    const modalOverlay = document.getElementById('serviceModal');
    if (modalOverlay) {
        const modalContainer = modalOverlay.querySelector('.modal-container');
        const closeModal = modalOverlay.querySelector('.close-modal');
        const detailBtns = document.querySelectorAll('.details-btn');
        
        // Service data
        const services = {
            1: {
                title: "Signature Massage",
                price: "$120",
                duration: "60 mins",
                rating: "★★★★½",
                description: "Our premier massage combining Balinese and Swedish techniques for deep relaxation and muscle relief. This therapeutic treatment helps to relieve stress, improve circulation, and promote overall well-being.",
                benefits: [
                    "Relieves muscle tension and pain",
                    "Reduces stress and anxiety",
                    "Improves blood circulation",
                    "Enhances flexibility and range of motion",
                    "Promotes better sleep quality"
                ],
                image: "img/hero1.jpg"
            },
            2: {
                title: "Hot Stone Therapy",
                price: "$150",
                duration: "75 mins",
                rating: "★★★★★",
                description: "Heated volcanic stones melt away tension, improve circulation, and promote deep relaxation. The warmth of the stones penetrates deep into muscles, providing a uniquely soothing experience.",
                benefits: [
                    "Deep muscle relaxation",
                    "Improved blood flow and circulation",
                    "Relief from chronic pain",
                    "Reduced stress and tension",
                    "Enhanced detoxification"
                ],
                image: "img/hero2.png"
            },
            3: {
                title: "Detox Facial",
                price: "$90",
                duration: "45 mins",
                rating: "★★★★½",
                description: "Deep cleansing facial treatment with natural ingredients to rejuvenate and refresh your skin. This treatment removes impurities and leaves your skin glowing and revitalized.",
                benefits: [
                    "Deep pore cleansing",
                    "Improved skin texture and tone",
                    "Reduced appearance of pores",
                    "Increased hydration",
                    "Brighter, more radiant complexion"
                ],
                image: "img/hero3.png"
            },
            4: {
                title: "Aromatherapy Massage",
                price: "$110",
                duration: "60 mins",
                rating: "★★★★★",
                description: "A soothing massage using essential oils tailored to your needs, promoting relaxation and emotional balance. The combination of therapeutic touch and aromatic oils creates a deeply relaxing experience.",
                benefits: [
                    "Reduces stress and anxiety",
                    "Improves mood and emotional well-being",
                    "Relieves muscle tension",
                    "Enhances mental clarity",
                    "Boosts immune system"
                ],
                image: "img/hero2.png"
            }
        };

        // Open modal with service details
        detailBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const serviceId = this.getAttribute('data-service');
                const service = services[serviceId];
                
                document.getElementById('modalServiceTitle').textContent = service.title;
                document.getElementById('modalServicePrice').textContent = service.price;
                document.getElementById('modalServiceDuration').textContent = service.duration;
                document.getElementById('modalServiceRating').innerHTML = `
                    ${service.rating} <span>(${service.rating === "★★★★★" ? "5.0" : service.rating === "★★★★½" ? "4.5" : "4.3"})</span>
                `;
                document.getElementById('modalServiceDescription').textContent = service.description;
                
                const benefitsList = document.getElementById('modalServiceBenefits');
                benefitsList.innerHTML = '';
                service.benefits.forEach(benefit => {
                    const li = document.createElement('li');
                    li.textContent = benefit;
                    benefitsList.appendChild(li);
                });
                
                document.getElementById('modalServiceImage').src = service.image;
                document.getElementById('modalServiceImage').alt = service.title;
                
                modalOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        // Close modal
        closeModal.addEventListener('click', function() {
            modalOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        });

        // Close modal when clicking outside
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) {
                modalOverlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });

        // Close modal with ESC key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
                modalOverlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // ===== INITIALIZE COMPONENTS =====
    setResponsiveBackgrounds();
    initSlideshow();
    
    if (testimonialCards.length > 0) {
        showTestimonial(0);
        startTestimonialSlider();
    }
    
    // Update backgrounds on resize
    window.addEventListener('resize', setResponsiveBackgrounds);

    // Update copyright year automatically
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});




 // Contact Form Submission
        // Show a custom thank you message after Formspree submission
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(form);
            fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            }).then(response => {
                if (response.ok) {
                    form.reset();
                    form.innerHTML = '<div class="form-success">Thank you for contacting us! We will get back to you soon.</div>';
                } else {
                    form.innerHTML = '<div class="form-error">Sorry, there was a problem sending your message. Please try again later.</div>';
                }
            }).catch(() => {
                form.innerHTML = '<div class="form-error">Sorry, there was a problem sending your message. Please try again later.</div>';
            });
        });
    }
});
        
        // FAQ Accordion
        const faqQuestions = document.querySelectorAll('.faq-question');
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const answer = question.nextElementSibling;
                const icon = question.querySelector('i');
                
                // Toggle the answer
                answer.classList.toggle('active');
                
                // Toggle the icon
                if (answer.classList.contains('active')) {
                    icon.classList.remove('fa-chevron-down');
                    icon.classList.add('fa-chevron-up');
                } else {
                    icon.classList.remove('fa-chevron-up');
                    icon.classList.add('fa-chevron-down');
                }
                
                // Close other open answers
                faqQuestions.forEach(otherQuestion => {
                    if (otherQuestion !== question) {
                        const otherAnswer = otherQuestion.nextElementSibling;
                        const otherIcon = otherQuestion.querySelector('i');
                        
                        otherAnswer.classList.remove('active');
                        otherIcon.classList.remove('fa-chevron-up');
                        otherIcon.classList.add('fa-chevron-down');
                    }
                });
            });
        });