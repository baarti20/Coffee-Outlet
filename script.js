// DOM Elements
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const navLinks = document.querySelectorAll('.nav__link');
const header = document.getElementById('header');
const menuTabs = document.querySelectorAll('.menu__tab');
const menuCategories = document.querySelectorAll('.menu__category');
const contactForm = document.getElementById('contact-form');

// Mobile Navigation Toggle
function toggleMobileMenu() {
    navMenu.classList.toggle('show');
    navToggle.clascsList.toggle('active');
}

// Close Mobile Menu
function closeMobileMenu() {
    navMenu.classList.remove('show');
    navToggle.classList.remove('active');
}

// Event Listeners for Navigation
navToggle.addEventListener('click', toggleMobileMenu);
navClose.addEventListener('click', closeMobileMenu);

// Close menu when clicking on nav links
navLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        closeMobileMenu();
    }
});

// Header Scroll Effect
function handleScroll() {
    const scrollY = window.scrollY;
    
    if (scrollY >= 80) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', handleScroll);

// Active Navigation Link on Scroll
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 150;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            // Remove active class from all links
            navLinks.forEach(link => link.classList.remove('active-link'));
            // Add active class to current link
            if (navLink) {
                navLink.classList.add('active-link');
            }
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// Menu Tab Functionality
function switchMenuTab(targetTab) {
    // Remove active class from all tabs and categories
    menuTabs.forEach(tab => tab.classList.remove('active'));
    menuCategories.forEach(category => category.classList.remove('active'));
    
    // Add active class to clicked tab
    const clickedTab = document.querySelector(`.menu__tab[data-tab="${targetTab}"]`);
    clickedTab.classList.add('active');
    
    // Show corresponding category
    const targetCategory = document.getElementById(targetTab);
    targetCategory.classList.add('active');
}

// Event listeners for menu tabs
menuTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const targetTab = tab.getAttribute('data-tab');
        switchMenuTab(targetTab);
    });
});

// Form Validation
function validateForm() {
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');
    
    let isValid = true;
    
    // Clear previous errors
    clearErrors();
    
    // Validate name
    if (!name.value.trim()) {
        showError('name-error', 'Name is required');
        isValid = false;
    } else if (name.value.trim().length < 2) {
        showError('name-error', 'Name must be at least 2 characters');
        isValid = false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
        showError('email-error', 'Email is required');
        isValid = false;
    } else if (!emailRegex.test(email.value.trim())) {
        showError('email-error', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate subject
    if (!subject.value.trim()) {
        showError('subject-error', 'Subject is required');
        isValid = false;
    } else if (subject.value.trim().length < 5) {
        showError('subject-error', 'Subject must be at least 5 characters');
        isValid = false;
    }
    
    // Validate message
    if (!message.value.trim()) {
        showError('message-error', 'Message is required');
        isValid = false;
    } else if (message.value.trim().length < 10) {
        showError('message-error', 'Message must be at least 10 characters');
        isValid = false;
    }
    
    return isValid;
}

function showError(errorId, message) {
    const errorElement = document.getElementById(errorId);
    errorElement.textContent = message;
    errorElement.classList.add('show');
}

function clearErrors() {
    const errorElements = document.querySelectorAll('.form__error');
    errorElements.forEach(error => {
        error.classList.remove('show');
        error.textContent = '';
    });
}

function showSuccessMessage() {
    const successElement = document.getElementById('form-success');
    successElement.classList.add('show');
    
    // Hide success message after 5 seconds
    setTimeout(() => {
        successElement.classList.remove('show');
    }, 5000);
}

// Handle form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (validateForm()) {
        // Simulate form submission
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        // Show loading state
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Reset form
            contactForm.reset();
            
            // Show success message
            showSuccessMessage();
            
            // Reset button
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            
            // Clear any remaining errors
            clearErrors();
        }, 2000);
    }
});

// Smooth Scrolling for Navigation Links
function smoothScroll(target) {
    const targetElement = document.querySelector(target);
    if (targetElement) {
        const headerHeight = header.offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Add smooth scrolling to all navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = link.getAttribute('href');
        smoothScroll(target);
    });
});

// Add smooth scrolling to hero buttons
const heroButtons = document.querySelectorAll('.hero__buttons .btn');
heroButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const target = button.getAttribute('href');
        smoothScroll(target);
    });
});

// Newsletter Form Handler
const newsletterForm = document.querySelector('.newsletter__form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('.newsletter__input');
        const submitButton = newsletterForm.querySelector('.newsletter__btn');
        
        if (emailInput.value.trim()) {
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Subscribed!';
            submitButton.style.backgroundColor = 'var(--success)';
            
            // Reset after 3 seconds
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.style.backgroundColor = '';
                emailInput.value = '';
            }, 3000);
        }
    });
}

// Intersection Observer for Animation on Scroll
function observeElements() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate on scroll
    const animatedElements = document.querySelectorAll(
        '.menu__item, .about__content, .contact__card, .value'
    );
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(element);
    });
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    observeElements();
});

// Handle window resize for responsive adjustments
function handleResize() {
    // Close mobile menu on resize to larger screen
    if (window.innerWidth > 768) {
        closeMobileMenu();
    }
}

window.addEventListener('resize', handleResize);

// Preload hero image for better performance
function preloadHeroImage() {
    const heroImg = document.querySelector('.hero__img');
    if (heroImg) {
        const img = new Image();
        img.src = heroImg.src;
    }
}

// Initialize preloading
preloadHeroImage();

// Add loading animation for menu items
function addMenuItemAnimations() {
    const menuItems = document.querySelectorAll('.menu__item');
    
    menuItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        item.classList.add('menu-item-animate');
    });
}

// Initialize menu animations when menu tab is clicked
menuTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        setTimeout(addMenuItemAnimations, 100);
    });
});

// Add CSS for menu item animation
const style = document.createElement('style');
style.textContent = `
    .menu-item-animate {
        opacity: 0;
        transform: translateY(20px);
        animation: menuItemFadeIn 0.5s ease-out forwards;
    }
    
    @keyframes menuItemFadeIn {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Add initial menu item animations
    addMenuItemAnimations();
    
    // Update active nav link on initial load
    updateActiveNavLink();
});

console.log('Roasted Bliss Coffee Shop website loaded successfully! ☕');