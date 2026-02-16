// Reveal Animation on Scroll
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// Typing Effect for Hero Section
const typingText = document.getElementById('typingText');
const phrases = [
    'Full-Stack Developer',
    'Digital Creative',
    'UI/UX Designer',
    'Video Editor',
    'Tech Innovator'
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 500; // Pause before typing
    }

    setTimeout(typeEffect, typingSpeed);
}

// Start typing effect
setTimeout(typeEffect, 1000);

// Skill Bar Animation
const skillBars = document.querySelectorAll('.skill-bar');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target;
            const width = bar.getAttribute('data-width');
            setTimeout(() => {
                bar.style.width = width + '%';
            }, 200);
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => skillObserver.observe(bar));

// Portfolio Filter
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => {
            b.classList.remove('active', 'bg-accent-cyan', 'text-dark-900');
            b.classList.add('glass-card');
        });

        // Add active class to clicked button
        btn.classList.add('active', 'bg-accent-cyan', 'text-dark-900');
        btn.classList.remove('glass-card');

        const filter = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');

            if (filter === 'all' || category === filter) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0) scale(1)';
                }, 50);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px) scale(0.95)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Custom Cursor Glow Effect (Desktop Only)
const cursorGlow = document.getElementById('cursorGlow');
let mouseX = 0;
let mouseY = 0;
let currentX = 0;
let currentY = 0;

if (window.matchMedia('(pointer: fine)').matches && cursorGlow) {
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        const dx = mouseX - currentX;
        const dy = mouseY - currentY;

        currentX += dx * 0.1;
        currentY += dy * 0.1;

        cursorGlow.style.left = currentX + 'px';
        cursorGlow.style.top = currentY + 'px';

        requestAnimationFrame(animateCursor);
    }

    animateCursor();

    // Hide cursor glow when leaving window
    document.addEventListener('mouseleave', () => {
        cursorGlow.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
        cursorGlow.style.opacity = '1';
    });
}

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.classList.add('shadow-lg', 'shadow-black/20');
    } else {
        navbar.classList.remove('shadow-lg', 'shadow-black/20');
    }

    lastScroll = currentScroll;
});

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    const icon = mobileMenuBtn.querySelector('i');
    if (mobileMenu.classList.contains('hidden')) {
        icon.setAttribute('data-lucide', 'menu');
    } else {
        icon.setAttribute('data-lucide', 'x');
    }
    lucide.createIcons();
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            mobileMenu.classList.add('hidden');
        }
    });
});

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Show success message (in production, this would send data to server)
    const btn = contactForm.querySelector('button[type="submit"]');
    const originalContent = btn.innerHTML;

    btn.innerHTML = '<span class="flex items-center gap-2">Message Sent! <i data-lucide="check" class="w-5 h-5"></i></span>';
    btn.classList.remove('from-accent-cyan', 'to-accent-blue');
    btn.classList.add('bg-green-500', 'text-white');
    lucide.createIcons();

    setTimeout(() => {
        btn.innerHTML = originalContent;
        btn.classList.add('from-accent-cyan', 'to-accent-blue');
        btn.classList.remove('bg-green-500', 'text-white');
        lucide.createIcons();
        contactForm.reset();
    }, 3000);
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.animate-float');

    parallaxElements.forEach((el, index) => {
        const speed = 0.5 + (index * 0.1);
        el.style.transform = `translateY(${scrolled * speed}px)`;
    });
});