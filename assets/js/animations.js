/**
 * Parallax and Scroll Animations
 * Handles Intersection Observer, parallax mouse movement, and hero fade effects.
 */
document.addEventListener('DOMContentLoaded', () => {

    // --- SCROLL REVEAL ANIMATION ---
    const observeElements = document.querySelectorAll('.project-card, .glass-card, h2, .hero-content');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
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

    // --- PARALLAX BACKGROUND EFFECT (Mouse Movement) ---
    document.addEventListener('mousemove', (e) => {
        const shapes = document.querySelectorAll('.parallax-shape');

        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 2;

            const x = (window.innerWidth - e.pageX * speed) / 100;
            const y = (window.innerHeight - e.pageY * speed) / 100;

            shape.style.transform = `translateX(${x}px) translateY(${y}px)`;
        });
    });

    // --- HERO FADE & FLOATING SOCIALS ON SCROLL ---
    const heroContent = document.querySelector('.hero-content');
    const floatingSocials = document.querySelector('.floating-socials');
    const scrollDown = document.querySelector('.scroll-down');

    if (heroContent) {
        window.addEventListener('scroll', () => {
            const scrollPos = window.scrollY;
            const windowHeight = window.innerHeight;

            // --- Hero Fade ---
            if (scrollPos < windowHeight) {
                const opacity = 1 - (scrollPos / (windowHeight * 0.6));
                const translateY = scrollPos * 0.5;

                heroContent.style.opacity = Math.max(0, opacity);
                heroContent.style.transform = `translateY(${translateY}px)`;

                // --- Scroll Down Arrow Fade ---
                const arrowOpacity = 1 - (scrollPos / (windowHeight * 0.3));
                if (scrollDown) {
                    scrollDown.style.opacity = Math.max(0, arrowOpacity);
                }
            }

            // --- Floating Socials Toggle ---
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

            // --- Banner Effects (Parallax for project details) ---
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
});
