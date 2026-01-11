/**
 * Navigation & Scroll Interactions
 * Handles Smooth scroll, scrollspy, and click events.
 */
document.addEventListener('DOMContentLoaded', () => {

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
            if (window.pageYOffset >= (sectionTop - sectionHeight / 3)) {
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
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- SMOOTH SCROLL FOR SCROLL DOWN ARROW ---
    const scrollDownArrow = document.querySelector('.scroll-down');
    if (scrollDownArrow) {
        scrollDownArrow.addEventListener('click', () => {
            // Priority 1: projects section (home)
            const projectsSection = document.getElementById('projects');
            // Priority 2: project-details (project pages)
            const projectDetails = document.getElementById('project-details');

            if (projectsSection) {
                projectsSection.scrollIntoView({ behavior: 'smooth' });
            } else if (projectDetails) {
                projectDetails.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

});
