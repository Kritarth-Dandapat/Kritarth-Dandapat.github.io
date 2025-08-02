// Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Mobile Navigation Toggle with Accessibility
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navOverlay = document.querySelector('.nav-overlay');

function closeMobileMenu() {
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    navMenu.classList.remove('active');
    navOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
    const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', !isExpanded);
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    navOverlay.classList.toggle('active');
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', closeMobileMenu));

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target) && !navOverlay.contains(e.target)) {
        closeMobileMenu();
    }
});

// Close mobile menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        closeMobileMenu();
    }
});

// Close mobile menu when clicking the overlay
navOverlay.addEventListener('click', closeMobileMenu);

// Smooth scrolling for navigation links with accessibility
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Update active navigation link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.removeAttribute('aria-current');
            });
            this.setAttribute('aria-current', 'page');

            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            // Announce to screen readers
            const sectionTitle = target.querySelector('.section-title') || target.querySelector('h1') || target.querySelector('h2');
            if (sectionTitle) {
                announceToScreenReader(`Navigated to ${sectionTitle.textContent}`);
            }
        }
    });
});

// Screen reader announcement function
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    document.body.appendChild(announcement);

    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    }
});

// Matrix Rain Effect
function createMatrixRain() {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        opacity: 0.1;
    `;
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
    const matrixArray = matrix.split("");

    const fontSize = 10;
    const columns = canvas.width / fontSize;
    const drops = [];

    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }

    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#0F0';
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    setInterval(draw, 35);
}

// Particle System
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    `;
    document.body.appendChild(particlesContainer);

    function createParticle() {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: ${['#00d4ff', '#00ff88', '#8b5cf6'][Math.floor(Math.random() * 3)]};
            border-radius: 50%;
            pointer-events: none;
            animation: particleFloat ${Math.random() * 3 + 2}s linear infinite;
        `;

        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = '100%';

        particlesContainer.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 5000);
    }

    setInterval(createParticle, 300);
}

// Glitch Effect for Text
function addGlitchEffect(element) {
    const originalText = element.textContent;
    let glitchInterval;

    element.addEventListener('mouseenter', () => {
        glitchInterval = setInterval(() => {
            const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
            const glitchText = originalText.split('').map(char =>
                Math.random() > 0.9 ? glitchChars[Math.floor(Math.random() * glitchChars.length)] : char
            ).join('');
            element.textContent = glitchText;
        }, 50);
    });

    element.addEventListener('mouseleave', () => {
        clearInterval(glitchInterval);
        element.textContent = originalText;
    });
}

// Enhanced Hover Effects
function addHoverEffects() {
    // Project cards hover effect
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', x + 'px');
            card.style.setProperty('--mouse-y', y + 'px');
        });
    });

    // Skill bars animation
    const skillBars = document.querySelectorAll('.skill-bar');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 200);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
}

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.project-card, .honor-card, .contact-item, .timeline-item');
    animateElements.forEach(el => {
        el.classList.add('scroll-animate');
        observer.observe(el);
    });

    // Add glitch effect to important text
    document.querySelectorAll('.hero-title, .section-title').forEach(addGlitchEffect);

    // Initialize effects
    createMatrixRain();
    createParticles();
    addHoverEffects();

    // Add about section enhancements
    enhanceAboutSection();

    // Load recent blog posts
    loadRecentBlogPosts();

    // Add scroll observer for about section
    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');

                // Trigger floating icons animation
                const icons = entry.target.querySelectorAll('.tech-icon');
                icons.forEach((icon, index) => {
                    setTimeout(() => {
                        icon.style.animation = 'float 3s ease-in-out infinite';
                    }, index * 200);
                });
            }
        });
    }, { threshold: 0.3 });

    const aboutSection = document.querySelector('.about');
    if (aboutSection) {
        aboutObserver.observe(aboutSection);
    }
});

// Enhanced form handling with accessibility
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);

        // Add form validation feedback
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearFieldError);
        });
    }

    // Initialize accessibility features
    initializeAccessibility();

    // Initialize performance optimizations
    initializePerformanceOptimizations();
});

// Initialize EmailJS
(function () {
    emailjs.init("sAOSf-TD2UxQdqPWX"); // Your EmailJS public key
    console.log('EmailJS initialized with public key:', "sAOSf-TD2UxQdqPWX");
})();

// Test function for EmailJS (you can call this from browser console)
window.testEmailJS = async function () {
    try {
        console.log('Testing EmailJS...');
        const testParams = {
            from_name: 'Test User',
            from_email: 'test@example.com',
            subject: 'Test Message',
            message: 'This is a test message from EmailJS',
            to_name: 'Kritarth Dandapat',
            to_email: 'kritarth@buffalo.edu',
            reply_to: 'test@example.com'
        };

        const response = await emailjs.send(
            'service_wz071t4',
            'template_8da12zr',
            testParams
        );

        console.log('Test email sent successfully:', response);
        alert('Test email sent! Check your inbox.');
    } catch (error) {
        console.error('Test email failed:', error);
        alert('Test email failed: ' + error.message);
    }
};

// Form submission handler
async function handleFormSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const submitButton = document.getElementById('submitBtn');
    const btnText = submitButton.querySelector('.btn-text');
    const btnLoading = submitButton.querySelector('.btn-loading');
    const formMessage = document.getElementById('formMessage');

    // Validate form
    if (!validateForm(form)) {
        return;
    }

    // Show loading state
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline-flex';
    submitButton.disabled = true;
    formMessage.style.display = 'none';

    try {
        // Prepare template parameters
        const templateParams = {
            from_name: form.name.value,
            from_email: form.email.value,
            subject: form.subject.value,
            message: form.message.value,
            to_name: 'Kritarth Dandapat',
            to_email: 'kritarth@buffalo.edu', // Recipient email
            reply_to: form.email.value // This allows you to reply directly to the sender
        };

        // Send email to you (the website owner)
        console.log('Sending email to website owner...');
        const response1 = await emailjs.send(
            'service_wz071t4', // Your EmailJS service ID
            'template_8da12zr', // Your main template ID
            templateParams
        );
        console.log('Email to owner sent successfully:', response1);

        // Send confirmation email to the sender
        console.log('Sending confirmation email to sender...');
        const confirmationParams = {
            to_name: form.name.value,
            to_email: form.email.value,
            from_name: 'Kritarth Dandapat',
            subject: form.subject.value,
            message: form.message.value,
            response_time: '48 hours',
            reply_to: 'kritarth@buffalo.edu'
        };

        const response2 = await emailjs.send(
            'service_wz071t4', // Same service ID
            'template_p7tl4id', // Confirmation template ID
            confirmationParams
        );
        console.log('Confirmation email sent successfully:', response2);

        // Show success message
        formMessage.style.display = 'block';
        formMessage.style.backgroundColor = 'rgba(0, 191, 255, 0.1)';
        formMessage.style.border = '1px solid var(--accent-primary)';
        formMessage.style.color = 'var(--accent-primary)';
        formMessage.innerHTML = '<i class="fas fa-check-circle"></i> Message sent successfully! You\'ll receive a confirmation email shortly, and I\'ll get back to you within 48 hours.';

        form.reset();
        announceToScreenReader('Message sent successfully');

    } catch (error) {
        console.error('EmailJS Error:', error);
        console.error('Error details:', {
            message: error.message,
            status: error.status,
            text: error.text
        });

        // Show error message
        formMessage.style.display = 'block';
        formMessage.style.backgroundColor = 'rgba(220, 53, 69, 0.1)';
        formMessage.style.border = '1px solid #dc3545';
        formMessage.style.color = '#dc3545';

        let errorMessage = 'Failed to send message. ';
        if (error.message) {
            errorMessage += error.message;
        } else {
            errorMessage += 'Please try again or contact me directly at kritarth@buffalo.edu';
        }

        formMessage.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${errorMessage}`;

        announceToScreenReader('Failed to send message');
    } finally {
        // Reset button state
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
        submitButton.disabled = false;
    }
}

// Form validation
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!validateField({ target: input })) {
            isValid = false;
        }
    });

    return isValid;
}

// Field validation
function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    const fieldName = field.name;

    // Remove existing error
    clearFieldError(e);

    let isValid = true;
    let errorMessage = '';

    switch (fieldName) {
        case 'name':
            if (value.length < 2) {
                isValid = false;
                errorMessage = 'Name must be at least 2 characters long';
            }
            break;
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
            break;
        case 'subject':
            if (value.length < 5) {
                isValid = false;
                errorMessage = 'Subject must be at least 5 characters long';
            }
            break;
        case 'message':
            if (value.length < 10) {
                isValid = false;
                errorMessage = 'Message must be at least 10 characters long';
            }
            break;
    }

    if (!isValid) {
        showFieldError(field, errorMessage);
        field.setAttribute('aria-invalid', 'true');
    } else {
        field.setAttribute('aria-invalid', 'false');
    }

    return isValid;
}

// Show field error
function showFieldError(field, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.setAttribute('role', 'alert');
    errorDiv.setAttribute('aria-live', 'polite');

    field.parentNode.appendChild(errorDiv);
    field.classList.add('error');
}

// Clear field error
function clearFieldError(e) {
    const field = e.target;
    const errorDiv = field.parentNode.querySelector('.field-error');

    if (errorDiv) {
        errorDiv.remove();
    }

    field.classList.remove('error');
}

// Initialize accessibility features
function initializeAccessibility() {
    // Add keyboard navigation for interactive elements
    const interactiveElements = document.querySelectorAll('.project-card, .timeline-content, .learn-more-btn');

    interactiveElements.forEach(element => {
        element.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                element.click();
            }
        });
    });

    // Add focus management for modals
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        const closeBtn = modal.querySelector('.close');
        const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];

        // Trap focus in modal
        modal.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusable) {
                        e.preventDefault();
                        lastFocusable.focus();
                    }
                } else {
                    if (document.activeElement === lastFocusable) {
                        e.preventDefault();
                        firstFocusable.focus();
                    }
                }
            }
        });
    });

    // Add loading states for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.classList.add('loaded');
        });

        img.addEventListener('error', () => {
            img.classList.add('error');
            img.alt = 'Image failed to load';
        });
    });
}

// Initialize performance optimizations
function initializePerformanceOptimizations() {
    // Lazy load images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            updateActiveNavLink();
        }, 100);
    });

    // Preload critical resources
    const criticalLinks = document.querySelectorAll('a[href^="#"]');
    criticalLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('preload');
            }
        });
    });
}

// Enhanced Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

    // Add enhanced styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'rgba(16, 185, 129, 0.9)' : type === 'error' ? 'rgba(239, 68, 68, 0.9)' : 'rgba(59, 130, 246, 0.9)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
        backdrop-filter: blur(10px);
        border: 1px solid ${type === 'success' ? 'rgba(16, 185, 129, 0.3)' : type === 'error' ? 'rgba(239, 68, 68, 0.3)' : 'rgba(59, 130, 246, 0.3)'};
    `;

    // Add to page
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Enhanced Typing animation for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    element.style.borderRight = '2px solid var(--neon-blue)';

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            // Add cursor blink effect
            element.style.animation = 'blink 1s infinite';
        }
    }

    type();
}

// Initialize typing animation when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 50);
        }, 500);
    }
});

// Enhanced Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Active navigation link highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// Add active class styles to CSS
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #3b82f6 !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
    
    /* Enhanced hover effects */
    .project-card:hover {
        transform: translateY(-10px) scale(1.02);
        box-shadow: 0 20px 40px rgba(59, 130, 246, 0.3);
    }
    
    .honor-card:hover {
        transform: translateY(-10px) scale(1.02);
        box-shadow: 0 20px 40px rgba(0, 255, 136, 0.3);
    }
    
    /* Particle animation */
    @keyframes particleFloat {
        0% {
            transform: translateY(0px) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-1000px) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Lazy loading for images (if any are added later)
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));

// Add some interactive hover effects
document.addEventListener('DOMContentLoaded', () => {
    // Add hover effects to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add hover effects to honor cards
    const honorCards = document.querySelectorAll('.honor-card');
    honorCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    updateActiveNavLink();
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Enhanced timeline animations
const timelineItems = document.querySelectorAll('.timeline-item');
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add staggered animation delay
            entry.target.style.animationDelay = `${index * 0.2}s`;
            entry.target.style.animation = 'slideInLeft 0.8s ease-out forwards';

            // Add floating effect to timeline dots
            const dot = entry.target.querySelector('.timeline-content::after');
            if (dot) {
                dot.style.animation = 'bounce 0.6s ease-out';
            }
        }
    });
}, { threshold: 0.3 });

timelineItems.forEach(item => {
    timelineObserver.observe(item);
});

// Add hover sound effect simulation (visual feedback)
document.addEventListener('DOMContentLoaded', () => {
    const timelineCards = document.querySelectorAll('.timeline-content');

    timelineCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Add ripple effect
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                width: 0;
                height: 0;
                background: rgba(59, 130, 246, 0.2);
                border-radius: 50%;
                transform: translate(-50%, -50%);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
                z-index: 0;
            `;
            card.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add CSS for ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        0% {
            width: 0;
            height: 0;
            opacity: 1;
        }
        100% {
            width: 300px;
            height: 300px;
            opacity: 0;
        }
    }
    
    @keyframes bounce {
        0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
        }
        40% {
            transform: translateY(-10px);
        }
        60% {
            transform: translateY(-5px);
        }
    }
    
    /* Enhanced scroll animations */
    .scroll-animate {
        opacity: 0;
        transform: translateY(50px);
        transition: all 0.8s ease;
    }
    
    .scroll-animate.animate {
        opacity: 1;
        transform: translateY(0);
    }
    
    /* Floating animation for cards */
    .project-card, .honor-card, .certificate-card {
        animation: float 6s ease-in-out infinite;
    }
    
    .project-card:nth-child(2) {
        animation-delay: 1s;
    }
    
    .project-card:nth-child(3) {
        animation-delay: 2s;
    }
    
    .honor-card:nth-child(2) {
        animation-delay: 1.5s;
    }
    
    .honor-card:nth-child(3) {
        animation-delay: 3s;
    }
    
    /* Neon text effect */
    .neon-text {
        text-shadow: 
            0 0 5px var(--neon-blue),
            0 0 10px var(--neon-blue),
            0 0 15px var(--neon-blue),
            0 0 20px var(--neon-blue);
        animation: neonGlow 2s ease-in-out infinite alternate;
    }
    
    /* Enhanced button hover */
    .btn:hover {
        transform: translateY(-3px) scale(1.05);
        box-shadow: 0 15px 35px rgba(59, 130, 246, 0.4);
    }
    
    /* Skill bar enhancement */
    .skill-bar {
        position: relative;
        overflow: hidden;
    }
    
    .skill-bar::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
        animation: holographic 2s ease infinite;
    }
    
    /* Tech tag enhancement */
    .tech-tag {
        position: relative;
        overflow: hidden;
    }
    
    .tech-tag span {
        position: relative;
        z-index: 1;
    }
    
    /* Profile card enhancement */
    .profile-card {
        position: relative;
        overflow: hidden;
    }
    
    .profile-card::before {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: conic-gradient(from 0deg, transparent, var(--neon-blue), transparent, var(--neon-green), transparent);
        animation: rotate 4s linear infinite;
        opacity: 0.1;
    }
    
    .profile-card::after {
        content: '';
        position: absolute;
        inset: 2px;
        background: rgba(30, 41, 59, 0.9);
        border-radius: 18px;
        z-index: 1;
    }
    
    .profile-info {
        position: relative;
        z-index: 2;
    }
`;
document.head.appendChild(rippleStyle);

// Add neon text effect to important elements
document.addEventListener('DOMContentLoaded', () => {
    // Add neon effect to section titles
    document.querySelectorAll('.section-title').forEach(title => {
        title.classList.add('neon-text');
    });

    // Add floating animation to cards
    document.querySelectorAll('.project-card, .honor-card, .certificate-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.5}s`;
    });

    // Enhanced skill bar animations
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        item.classList.add('scroll-animate');
        observer.observe(item);
    });

    // Add tech tag span elements
    document.querySelectorAll('.tech-tag').forEach(tag => {
        const text = tag.textContent;
        tag.innerHTML = `<span>${text}</span>`;
    });
});

// Enhanced window resize handling
window.addEventListener('resize', debounce(() => {
    // Recalculate canvas size for matrix rain
    const canvas = document.querySelector('canvas');
    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
}, 250));

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 1s ease';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Enhanced mouse trail effect
let mouseTrail = [];
const maxTrailLength = 20;

document.addEventListener('mousemove', (e) => {
    mouseTrail.push({ x: e.clientX, y: e.clientY });

    if (mouseTrail.length > maxTrailLength) {
        mouseTrail.shift();
    }

    // Create trail effect
    if (mouseTrail.length > 5) {
        const trailDot = document.createElement('div');
        trailDot.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: var(--neon-blue);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            opacity: 0.7;
            animation: fadeOut 0.5s ease-out forwards;
        `;

        document.body.appendChild(trailDot);

        setTimeout(() => {
            trailDot.remove();
        }, 500);
    }
});

// Add fadeOut animation
const fadeOutStyle = document.createElement('style');
fadeOutStyle.textContent = `
    @keyframes fadeOut {
        to {
            opacity: 0;
            transform: scale(0.5);
        }
    }
`;
document.head.appendChild(fadeOutStyle);

// Enhanced About Section Animations
function enhanceAboutSection() {
    const aboutSection = document.querySelector('.about');
    const aboutText = document.querySelector('.about-text');
    const educationCard = document.querySelector('.education-card');

    if (aboutSection) {
        // Add floating tech icons
        const techIcons = ['💻', '🚀', '⚡', '🎯', '🔧', '📊'];
        for (let i = 0; i < 6; i++) {
            const icon = document.createElement('div');
            icon.textContent = techIcons[i];
            icon.style.cssText = `
                position: absolute;
                font-size: 1.5rem;
                opacity: 0.3;
                pointer-events: none;
                z-index: 0;
                animation: float ${3 + i * 0.5}s ease-in-out infinite;
                animation-delay: ${i * 0.5}s;
            `;
            icon.style.left = Math.random() * 100 + '%';
            icon.style.top = Math.random() * 100 + '%';
            aboutSection.appendChild(icon);
        }

        // Add typing effect to about text
        if (aboutText) {
            const paragraphs = aboutText.querySelectorAll('p');
            paragraphs.forEach((p, index) => {
                const originalText = p.textContent;
                p.textContent = '';
                p.style.borderRight = '2px solid var(--neon-green)';

                setTimeout(() => {
                    typeWriter(p, originalText, 30, () => {
                        p.style.borderRight = 'none';
                        p.style.animation = 'blink 1s infinite';
                    });
                }, 1000 + index * 500);
            });
        }

        // Add interactive education card
        if (educationCard) {
            const educationItems = educationCard.querySelectorAll('.education-item');
            educationItems.forEach((item, index) => {
                item.addEventListener('mouseenter', () => {
                    item.style.transform = 'translateY(-5px) scale(1.02)';
                    item.style.boxShadow = '0 10px 25px rgba(59, 130, 246, 0.3)';

                    // Add particle effect
                    createEducationParticles(item);
                });

                item.addEventListener('mouseleave', () => {
                    item.style.transform = 'translateY(0) scale(1)';
                    item.style.boxShadow = '0 5px 15px rgba(59, 130, 246, 0.2)';
                });

                // Staggered animation
                item.style.animationDelay = `${index * 0.2}s`;
            });
        }
    }
}

// Create particles for education items
function createEducationParticles(element) {
    const rect = element.getBoundingClientRect();
    const colors = ['#00d4ff', '#00ff88', '#8b5cf6'];

    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            left: ${rect.left + Math.random() * rect.width}px;
            top: ${rect.top + Math.random() * rect.height}px;
            animation: educationParticle 1s ease-out forwards;
        `;

        document.body.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 1000);
    }
}

// Enhanced typing function with callback
function typeWriter(element, text, speed = 100, callback = null) {
    let i = 0;
    element.innerHTML = '';

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            if (callback) callback();
        }
    }

    type();
}

// Add education particle animation
const educationParticleStyle = document.createElement('style');
educationParticleStyle.textContent = `
    @keyframes educationParticle {
        0% {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-50px) scale(0);
        }
    }
    
    /* Enhanced about section animations */
    .about-text p {
        position: relative;
        overflow: hidden;
    }
    
    .about-text p::after {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.1), transparent);
        transition: left 0.5s;
    }
    
    .about-text p:hover::after {
        left: 100%;
    }
    
    /* Floating tech icons */
    .about .tech-icon {
        position: absolute;
        font-size: 1.5rem;
        opacity: 0.3;
        pointer-events: none;
        z-index: 0;
        animation: float 3s ease-in-out infinite;
    }
    
    /* Enhanced education card interactions */
    .education-item {
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .education-item:hover {
        transform: translateY(-5px) scale(1.02);
        box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3);
    }
    
    .education-item:hover h4 {
        color: var(--neon-blue);
        text-shadow: 0 0 10px var(--neon-blue);
    }
    
    .education-item:hover .degree {
        color: var(--text-primary);
        text-shadow: 0 0 5px rgba(255, 255, 255, 0.3);
    }
    
    .education-item:hover .dates {
        color: var(--neon-green);
        text-shadow: 0 0 10px var(--neon-green);
    }
`;
document.head.appendChild(educationParticleStyle);

// Load Recent Blog Posts
async function loadRecentBlogPosts() {
    const recentBlogsGrid = document.getElementById('recent-blogs-grid');

    if (!recentBlogsGrid) return;

    // Show loading state
    recentBlogsGrid.innerHTML = `
        <div class="recent-blogs-loading" style="grid-column: 1 / -1;">
            <i class="fas fa-spinner"></i>
            <p>Loading recent blog posts...</p>
        </div>
    `;

    try {
        const response = await fetch('./blog/data.json');
        const data = await response.json();

        // Get the 3 most recent posts
        const recentPosts = data.posts
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 3);

        if (recentPosts.length > 0) {
            const postsHTML = recentPosts.map(post => createRecentBlogCard(post)).join('');
            recentBlogsGrid.innerHTML = postsHTML;

            // Add click listeners to blog cards
            addRecentBlogCardListeners();
        } else {
            recentBlogsGrid.innerHTML = `
                <div class="error-message" style="text-align: center; padding: 2rem; color: var(--text-muted); grid-column: 1 / -1;">
                    <i class="fas fa-newspaper" style="font-size: 2rem; margin-bottom: 1rem;"></i>
                    <p>No blog posts available yet. Check back soon!</p>
                </div>
            `;
        }
    } catch (error) {
        console.error('Error loading recent blog posts:', error);
        recentBlogsGrid.innerHTML = `
            <div class="error-message" style="text-align: center; padding: 2rem; color: var(--text-muted); grid-column: 1 / -1;">
                <i class="fas fa-exclamation-triangle" style="font-size: 2rem; margin-bottom: 1rem;"></i>
                <p>Unable to load recent blog posts. Please visit the blog page to see all posts.</p>
            </div>
        `;
    }
}

function createRecentBlogCard(post) {
    const tagsHTML = post.tags.slice(0, 3).map(tag =>
        `<span class="recent-blog-tag">${tag}</span>`
    ).join('');

    const featuredImageHTML = post.featuredImage ?
        `<div class="recent-blog-image">
            <img src="${post.featuredImage}" alt="${post.title}" loading="lazy">
        </div>` : '';

    return `
        <div class="recent-blog-card" data-post-id="${post.id}">
            ${featuredImageHTML}
            <div class="recent-blog-category">${post.category}</div>
            <h3 class="recent-blog-title">${post.title}</h3>
            <p class="recent-blog-excerpt">${post.excerpt}</p>
            <div class="recent-blog-meta">
                <span class="recent-blog-date">
                    <i class="fas fa-calendar"></i>
                    ${formatDate(post.date)}
                </span>
                <span class="recent-blog-read-time">
                    <i class="fas fa-clock"></i>
                    ${post.readTime}
                </span>
            </div>
            <div class="recent-blog-tags">
                ${tagsHTML}
            </div>
        </div>
    `;
}

function addRecentBlogCardListeners() {
    const blogCards = document.querySelectorAll('.recent-blog-card');
    blogCards.forEach(card => {
        card.addEventListener('click', () => {
            const postId = parseInt(card.dataset.postId);
            // Open the blog post in the blog page
            window.open(`./blog/index.html?post=${postId}`, '_blank');
        });
    });
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Modal functionality for experience section
function openModal(modalId) {
    const modal = document.getElementById(modalId + '-modal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId + '-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    }
}

// Project modal functionality (aliases for compatibility)
function openProjectModal(modalId) {
    openModal(modalId);
}

function closeProjectModal(modalId) {
    const modal = document.getElementById(modalId + '-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Close modal when clicking outside of it (updated to handle both experience and project modals)
window.onclick = function (event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// Close modal with Escape key (updated to handle both experience and project modals)
document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (modal.style.display === 'block') {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
});

// Toggle functions for projects and certificates
function toggleProjects() {
    const hiddenProjects = document.querySelectorAll('.hidden-project');
    const button = document.getElementById('show-more-projects');
    const icon = button.querySelector('i');

    hiddenProjects.forEach(project => {
        if (project.style.display === 'none' || project.style.display === '') {
            project.style.display = 'block';
            button.innerHTML = '<i class="fas fa-chevron-up"></i> Show Less Projects';
            button.classList.add('expanded');
        } else {
            project.style.display = 'none';
            button.innerHTML = '<i class="fas fa-chevron-down"></i> Show More Projects';
            button.classList.remove('expanded');
        }
    });
}

function toggleCertificates() {
    const hiddenCertificates = document.querySelectorAll('.hidden-certificate');
    const button = document.getElementById('show-more-certificates');
    const icon = button.querySelector('i');

    hiddenCertificates.forEach(certificate => {
        if (certificate.style.display === 'none' || certificate.style.display === '') {
            certificate.style.display = 'block';
            button.innerHTML = '<i class="fas fa-chevron-up"></i> Show Less Certificates';
            button.classList.add('expanded');
        } else {
            certificate.style.display = 'none';
            button.innerHTML = '<i class="fas fa-chevron-down"></i> Show More Certificates';
            button.classList.remove('expanded');
        }
    });
}

function toggleExperiences() {
    const hiddenExperiences = document.querySelectorAll('.hidden-experience');
    const button = document.getElementById('show-more-experiences');

    hiddenExperiences.forEach(experience => {
        if (experience.style.display === 'none' || experience.style.display === '') {
            experience.style.display = 'block';
            button.innerHTML = '<i class="fas fa-chevron-up"></i> Show Less Experience';
            button.classList.add('expanded');
        } else {
            experience.style.display = 'none';
            button.innerHTML = '<i class="fas fa-chevron-down"></i> Show More Experience';
            button.classList.remove('expanded');
        }
    });
}

function toggleSkills() {
    const hiddenSkills = document.querySelectorAll('.hidden-skill');
    const button = document.getElementById('show-more-skills');
    const icon = button.querySelector('i');

    hiddenSkills.forEach(skill => {
        skill.style.display = skill.style.display === 'inline-flex' ? 'none' : 'inline-flex';
    });

    if (hiddenSkills[0].style.display === 'inline-flex') {
        button.innerHTML = '<i class="fas fa-chevron-up"></i> Show Less Skills';
        button.classList.add('expanded');
    } else {
        button.innerHTML = '<i class="fas fa-chevron-down"></i> Show More Skills';
        button.classList.remove('expanded');
    }
} 