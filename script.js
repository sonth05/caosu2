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

// Dynamically populate the SVR product grid using filenames from the SVR/ folder
// Note: Browsers can't read the server filesystem, so we provide the actual filenames
// found in the project's SVR/ directory. Update this array if you add/remove files.
(() => {
    // map actual filenames => display title and description (user requested exact names)
    const svrFiles = [
        { file: 'svr10 （1）.jpg', title: 'SVR 10', desc: 'SVR 10 rubber' },
        { file: 'SVR 20.jpg', title: 'SVR 20', desc: 'SVR 20 rubber' },
        { file: 'svr 3L .png', title: 'SVR 3L', desc: 'SVR 3L rubber' },
        { file: 'svr 5.jpg', title: 'SVR 5L', desc: 'SVR 5L rubber' },
        { file: 'svr cv 50.jpg', title: 'SVR CV50', desc: 'SVR CV50 rubber' },
        { file: 'svr cv 60.jpg', title: 'SVR CV60', desc: 'SVR CV60 rubber' }
    ];

    const svrGrid = document.querySelector('#svr');
    if (!svrGrid) return;

    // Remove any existing hardcoded cards inside #svr to avoid duplicates
    svrGrid.innerHTML = '';

    svrFiles.forEach(entry => {
        const card = document.createElement('div');
        card.className = 'product-card';

        const imgWrap = document.createElement('div');
        imgWrap.className = 'product-image';

    const img = document.createElement('img');
    img.src = `SVR/${encodeURI(entry.file)}`;
    img.alt = entry.title;
        img.loading = 'lazy';

        imgWrap.appendChild(img);

        const info = document.createElement('div');
        info.className = 'product-info';
    const h3 = document.createElement('h3');
    h3.textContent = entry.title;
    const p = document.createElement('p');
    p.textContent = entry.desc;

        info.appendChild(h3);
        info.appendChild(p);

        card.appendChild(imgWrap);
        card.appendChild(info);

        svrGrid.appendChild(card);
    });

    // Re-run image observer and product animations on newly created nodes
    const newProductImages = document.querySelectorAll('.product-image img');
    newProductImages.forEach(img => {
        img.setAttribute('loading', 'lazy');
        imageObserver.observe(img);
    });

    document.querySelectorAll('.product-card').forEach(el => {
        observer.observe(el);
    });

})();

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
