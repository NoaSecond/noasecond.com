document.addEventListener('DOMContentLoaded', () => {

    // --- CUSTOM CURSOR ---
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (!isTouchDevice) {
        const cursorDot = document.createElement('div');
        const cursorOutline = document.createElement('div');

        cursorDot.className = 'cursor-dot';
        cursorOutline.className = 'cursor-outline';

        document.body.appendChild(cursorDot);
        document.body.appendChild(cursorOutline);

        let cursorTimeout;

        window.addEventListener('mousemove', (e) => {
            // Show cursor on first move and wake it up from idle
            if (!document.body.classList.contains('cursor-visible')) {
                document.body.classList.add('cursor-visible');
            }
            document.body.classList.remove('cursor-idle');

            const posX = e.clientX;
            const posY = e.clientY;

            // Dot follows instantly
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            // Outline follows (CSS transition handles smoothing)
            cursorOutline.style.left = `${posX}px`;
            cursorOutline.style.top = `${posY}px`;

            // Reset inactivity timer
            clearTimeout(cursorTimeout);
            cursorTimeout = setTimeout(() => {
                document.body.classList.add('cursor-idle');
            }, 3000); // Hide after 3 seconds of inactivity
        });

        // Hover effects for cursor
        const interactiveElements = document.querySelectorAll('a, button, .btn, .project-card, input, textarea, select, .social-icon');

        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                document.body.classList.add('hovering');
            });
            el.addEventListener('mouseleave', () => {
                document.body.classList.remove('hovering');
            });
        });
    }

    // --- SCROLL REVEAL ANIMATION ---
    const observeElements = document.querySelectorAll('.project-card, .glass-card, h2, .hero-content');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once visible if you don't want it to re-animate
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    observeElements.forEach(el => {
        el.classList.add('hidden-reveal');
        observer.observe(el);
    });

    // --- PARALLAX BACKGROUND EFFECT ---
    document.addEventListener('mousemove', (e) => {
        const shapes = document.querySelectorAll('.parallax-shape');

        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 2; // Factor for movement range

            // Calculate movement based on mouse position relative to center
            const x = (window.innerWidth - e.pageX * speed) / 100;
            const y = (window.innerHeight - e.pageY * speed) / 100;

            shape.style.transform = `translateX(${x}px) translateY(${y}px)`;
        });
    });

    // --- HERO FADE & FLOATING SOCIALS ON SCROLL ---
    // --- HERO FADE & FLOATING SOCIALS ON SCROLL ---
    const heroContent = document.querySelector('.hero-content');
    const floatingSocials = document.querySelector('.floating-socials');
    const scrollDown = document.querySelector('.scroll-down');

    if (heroContent) {
        window.addEventListener('scroll', () => {
            const scrollPos = window.scrollY;
            const windowHeight = window.innerHeight;

            // --- Hero Fade ---
            // Only apply effect if we are still within the first screen's height
            if (scrollPos < windowHeight) {
                // Calculate opacity: starts at 1, goes to 0 as you scroll down 60% of screen
                const opacity = 1 - (scrollPos / (windowHeight * 0.6));

                // Add a slight translation for parallax feel
                const translateY = scrollPos * 0.5;

                heroContent.style.opacity = Math.max(0, opacity);
                heroContent.style.transform = `translateY(${translateY}px)`;

                // --- Scroll Down Arrow Fade ---
                // Fade out faster than content (by 30% of scroll)
                const arrowOpacity = 1 - (scrollPos / (windowHeight * 0.3));
                if (scrollDown) {
                    scrollDown.style.opacity = Math.max(0, arrowOpacity);
                }
            }

            // --- Floating Socials Toggle ---
            // Show only after scrolling past 300px (when hero socials start fading out)
            if (floatingSocials) {
                if (scrollPos > 300) {
                    floatingSocials.classList.add('visible');
                } else {
                    floatingSocials.classList.remove('visible');
                }
            }

            // --- Back to Top Button Toggle ---
            const backToTop = document.getElementById('back-to-top');
            if (backToTop) {
                if (scrollPos > 600) {
                    backToTop.classList.add('visible');
                } else {
                    backToTop.classList.remove('visible');
                }
            }

            // --- Banner Effects (Parallax, Zoom) ---
            const heroBg = document.querySelector('.hero-bg');
            if (heroBg) {
                if (scrollPos < windowHeight) {
                    const velocity = 0.5;
                    const offset = scrollPos * velocity;
                    const zoom = 1 + (scrollPos / windowHeight) * 0.1;

                    heroBg.style.transform = `translateY(${offset}px) scale(${zoom})`;
                }
            }
        });
    }

    // --- Back to Top Click Event ---
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // --- NAVIGATION SCROLL SPY ---
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateNav() {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Adjust offset for better triggering
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateNav);
    updateNav(); // Initial check

    // --- SMOOTH SCROLL FOR ANCHORS ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // --- SMOOTH SCROLL FOR SCROLL DOWN ARROW ---
    const scrollDownArrow = document.querySelector('.scroll-down');
    if (scrollDownArrow) {
        scrollDownArrow.addEventListener('click', () => {
            const projectsSection = document.getElementById('projects');
            if (projectsSection) {
                projectsSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

});
