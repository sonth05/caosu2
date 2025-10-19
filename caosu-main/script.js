// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Product Category Tabs
const tabBtns = document.querySelectorAll('.tab-btn');
const productGrids = document.querySelectorAll('.product-grid');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all tabs and grids
        tabBtns.forEach(tab => tab.classList.remove('active'));
        productGrids.forEach(grid => grid.classList.remove('active'));
        
        // Add active class to clicked tab
        btn.classList.add('active');
        
        // Show corresponding product grid
        const category = btn.getAttribute('data-category');
        const targetGrid = document.getElementById(category);
        if (targetGrid) {
            targetGrid.classList.add('active');
        }
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed header
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Header background change on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.product-card, .app-item, .market-item, .stat-item').forEach(el => {
    observer.observe(el);
});

// Form submission handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const phone = contactForm.querySelector('input[type="tel"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Simple validation
        if (!name || !email || !phone || !message) {
            alert('Please fill in all required information!');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address!');
            return;
        }
        
        // Phone validation (basic)
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
        if (!phoneRegex.test(phone)) {
            alert('Please enter a valid phone number!');
            return;
        }
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('Thank you for contacting us! We will respond as soon as possible.');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Product image lazy loading + fade-in safety for cached images
const productImages = document.querySelectorAll('.product-image img');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const img = entry.target;
        img.style.transition = 'opacity 0.3s ease';

        // If the image is already loaded (from cache), reveal immediately
        if (img.complete && img.naturalWidth > 0) {
            img.style.opacity = '1';
        } else {
            // Otherwise, start hidden and fade in on load (once)
            img.style.opacity = '0';
            img.addEventListener('load', () => {
                img.style.opacity = '1';
            }, { once: true });
        }

        imageObserver.unobserve(img);
    });
});

productImages.forEach(img => {
    // Hint the browser to lazy-load natively as well
    img.setAttribute('loading', 'lazy');
    imageObserver.observe(img);
});

// Counter animation for stats
const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        element.textContent = Math.floor(start) + '+';
        
        if (start >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        }
    }, 16);
};

// Animate stats when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-item h3');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.textContent);
                animateCounter(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.about-stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-background img');
    
    if (heroImage && scrolled < window.innerHeight) {
        heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});


// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Error handling for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', (e) => {
        console.warn('Image failed to load:', e.target.src);
        e.target.style.background = '#f8f9fa';
        e.target.style.border = '2px dashed #dee2e6';
        // ensure parent is the positioning context for overlay text
        if (e.target.parentElement) {
            e.target.parentElement.style.position = 'relative';
        }
        
        // Add error text
        const errorText = document.createElement('div');
        errorText.textContent = 'Image not found';
        errorText.style.position = 'absolute';
        errorText.style.top = '50%';
        errorText.style.left = '50%';
        errorText.style.transform = 'translate(-50%, -50%)';
        errorText.style.color = '#6c757d';
        errorText.style.fontSize = '0.9rem';
        errorText.style.textAlign = 'center';
        errorText.style.pointerEvents = 'none';
        
        e.target.parentElement.appendChild(errorText);
    });
    
    img.addEventListener('load', (e) => {
        console.log('Image loaded successfully:', e.target.src);
    });
});

// Keyboard navigation for tabs
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        const activeTab = document.querySelector('.tab-btn.active');
        if (activeTab && document.activeElement === activeTab) {
            const tabs = Array.from(tabBtns);
            const currentIndex = tabs.indexOf(activeTab);
            
            if (e.shiftKey) {
                // Shift + Tab - go to previous tab
                const prevTab = tabs[currentIndex - 1] || tabs[tabs.length - 1];
                prevTab.focus();
            } else {
                // Tab - go to next tab
                const nextTab = tabs[currentIndex + 1] || tabs[0];
                nextTab.focus();
            }
            e.preventDefault();
        }
    }
});

// Add focus styles for accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// Add CSS for keyboard navigation
const style = document.createElement('style');
style.textContent = `
    .keyboard-navigation *:focus {
        outline: 2px solid #2c5530 !important;
        outline-offset: 2px !important;
    }
`;
document.head.appendChild(style);
