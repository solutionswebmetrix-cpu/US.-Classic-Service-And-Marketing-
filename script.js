// Mobile Navigation Toggle
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');

menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
});

// Navigation and Page Switching Logic
const navLinks = document.querySelectorAll('a[href^="#"]');
const sections = document.querySelectorAll('.page-section');

function triggerRevealAnimations() {
    const cards = document.querySelectorAll('.service-card, .product-card, .about-card, .feature-item');
    cards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        if (cardTop < window.innerHeight - 50) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    });
}

function showSection(targetId) {
    // Check if targetId points to a sub-section on the home page
    let sectionId = targetId;
    let scrollToSub = null;
    
    if (targetId === '#home-products') {
        sectionId = '#home';
        scrollToSub = '#home-products';
    } else if (targetId === '#home-services') {
        sectionId = '#home';
        scrollToSub = '#home-services';
    }

    // Hide all sections
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Update active nav link
    navLinks.forEach(link => {
        link.classList.remove('active');
        // Handle products and services link specifically
        const href = link.getAttribute('href');
        if (href === targetId || 
           (targetId === '#home-products' && href === '#home-products') ||
           (targetId === '#home-services' && href === '#home-services')) {
            link.classList.add('active');
        }
    });

    // Show the targeted section
    const targetSection = document.querySelector(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        
        // Scroll logic
        if (scrollToSub) {
            const subElement = document.querySelector(scrollToSub);
            if (subElement) {
                setTimeout(() => {
                    window.scrollTo({
                        top: subElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }, 100);
            }
        } else {
            window.scrollTo(0, 0);
        }
        
        // Update URL hash without jumping the page
        if (window.location.hash !== targetId) {
            history.pushState(null, null, targetId);
        }

        // Trigger animations for the newly visible section
        setTimeout(triggerRevealAnimations, 100);
    }
}

navLinks.forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        
        if (targetId.startsWith('#')) {
            e.preventDefault();
            nav.classList.remove('active');
            showSection(targetId);
        }
    });
});

// Handle browser back/forward buttons
window.addEventListener('popstate', () => {
    const hash = window.location.hash || '#home';
    showSection(hash);
});

// Initial Setup
document.addEventListener('DOMContentLoaded', () => {
    // Set initial state for reveal animation
    const cards = document.querySelectorAll('.service-card, .product-card, .about-card, .feature-item');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease-out';
    });

    // Show initial section
    const hash = window.location.hash || '#home';
    showSection(hash);
});

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = contactForm.querySelector('input[type="text"]').value;
        if (name) {
            alert(`Thank you, ${name}! Your message has been sent successfully.`);
            contactForm.reset();
        }
    });
}

// Still listen to scroll for animations within a long section (like Services)
window.addEventListener('scroll', triggerRevealAnimations);
