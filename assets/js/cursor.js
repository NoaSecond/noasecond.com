/**
 * Custom Cursor Logic
 * Handles dot, outline, inactivity fade-out, and hover states.
 */
document.addEventListener('DOMContentLoaded', () => {
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
            }, 1000); // Hide after 1 second of inactivity
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
});
