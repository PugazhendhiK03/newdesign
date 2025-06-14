// Mobile Navigation with Close Button
document.addEventListener('DOMContentLoaded', function() {
    // Select elements
    const mobileToggle = document.querySelector('.nav__mobile-toggle');
    const navList = document.querySelector('.nav__list');
    const closeBtn = document.querySelector('.nav__close-btn');
    
    // Function to toggle menu
    function toggleMenu() {
        // Toggle active class on menu
        navList.classList.toggle('active');
        
        // Toggle hamburger icon animation
        if (mobileToggle) {
            mobileToggle.classList.toggle('active');
            const spans = mobileToggle.querySelectorAll('span');
            if (navList.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        }
        
        // Toggle close button visibility
        if (closeBtn) {
            if (navList.classList.contains('active')) {
                closeBtn.style.display = 'flex';
            } else {
                closeBtn.style.display = 'none';
            }
        }
    }
    
    // Event listeners
    if (mobileToggle) {
        mobileToggle.addEventListener('click', toggleMenu);
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', toggleMenu);
    }
    
    // Close menu when clicking on nav links
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navList.classList.contains('active')) {
                toggleMenu();
            }
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (navList.classList.contains('active')) {
            const isClickInsideNav = navList.contains(event.target);
            const isClickOnToggle = mobileToggle && mobileToggle.contains(event.target);
            const isClickOnClose = closeBtn && closeBtn.contains(event.target);
            
            if (!isClickInsideNav && !isClickOnToggle && !isClickOnClose) {
                toggleMenu();
            }
        }
    });
    
    // Prevent scrolling when menu is open
    navList.addEventListener('transitionstart', function() {
        if (navList.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    navList.addEventListener('transitionend', function() {
        if (!navList.classList.contains('active')) {
            document.body.style.overflow = '';
        }
    });
});