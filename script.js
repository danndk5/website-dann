// ===== SMOOTH SCROLLING & NAVIGATION =====

// Function untuk scroll ke section tertentu
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const offsetTop = element.offsetTop - 70; // Account for fixed navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// ===== NAVBAR SCROLL EFFECT =====
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const scrollY = window.scrollY;
    
    if (scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
});

// ===== ACTIVE NAVIGATION HIGHLIGHT =====
window.addEventListener('scroll', function() {
    const sections = ['home', 'about', 'skills', 'projects', 'contact'];
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    let currentSection = '';
    
    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = sectionId;
            }
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});

// ===== SKILLS PROGRESS BAR ANIMATION =====
function animateSkillBars() {
    const skillSection = document.querySelector('.skills');
    const progressBars = document.querySelectorAll('.progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                progressBars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0%';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 500);
                });
                observer.unobserve(entry.target);
            }
        });
    });
    
    if (skillSection) {
        observer.observe(skillSection);
    }
}

// ===== TYPING ANIMATION FOR HERO TEXT =====
function typeWriter() {
    const texts = ['Web Developer', 'Problem Solver', 'Creative Thinker', 'Tech Enthusiast'];
    const heroSubtitle = document.querySelector('.hero-text h2');
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            heroSubtitle.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            heroSubtitle.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500; // Pause before next word
        }
        
        setTimeout(type, typeSpeed);
    }
    
    if (heroSubtitle) {
        type();
    }
}

// ===== SCROLL REVEAL ANIMATION =====
function revealOnScroll() {
    const reveals = document.querySelectorAll('.skill-item, .project-card, .contact-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    });
    
    reveals.forEach(reveal => {
        reveal.style.opacity = '0';
        reveal.style.transform = 'translateY(30px)';
        reveal.style.transition = 'all 0.6s ease';
        observer.observe(reveal);
    });
}

// ===== INTERACTIVE PROJECT CARDS =====
function setupProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// ===== BACK TO TOP BUTTON =====
function createBackToTopButton() {
    // Create button element
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #3498db;
        color: white;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3);
    `;
    
    document.body.appendChild(backToTopBtn);
    
    // Show/hide button based on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.transform = 'translateY(0)';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.transform = 'translateY(10px)';
        }
    });
    
    // Scroll to top on click
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effects
    backToTopBtn.addEventListener('mouseenter', () => {
        backToTopBtn.style.background = '#2980b9';
        backToTopBtn.style.transform = 'translateY(-2px) scale(1.1)';
    });
    
    backToTopBtn.addEventListener('mouseleave', () => {
        backToTopBtn.style.background = '#3498db';
        backToTopBtn.style.transform = 'translateY(0) scale(1)';
    });
}

// ===== CONTACT FORM FUNCTIONALITY =====
function setupContactInteractions() {
    const contactItems = document.querySelectorAll('.contact-item');
    
    contactItems.forEach(item => {
        item.addEventListener('click', function() {
            const link = this.querySelector('a');
            if (link) {
                // Add click animation
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            }
        });
    });
}

// ===== EASTER EGG - KONAMI CODE =====
function setupEasterEgg() {
    const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up Up Down Down Left Right Left Right B A
    let userInput = [];
    
    document.addEventListener('keydown', function(e) {
        userInput.push(e.keyCode);
        userInput.splice(-konamiCode.length - 1, userInput.length - konamiCode.length);
        
        if (userInput.join('').indexOf(konamiCode.join('')) >= 0) {
            // Easter egg activated!
            document.body.style.transform = 'rotate(1turn)';
            document.body.style.transition = 'transform 4s ease';
            
            setTimeout(() => {
                document.body.style.transform = 'rotate(0turn)';
                alert('🎉 Konami Code activated! You found the easter egg!');
            }, 4000);
            
            userInput = [];
        }
    });
}

// ===== MOBILE MENU TOGGLE (Simple version) =====
function setupMobileMenu() {
    // Add mobile menu button if screen is small
    if (window.innerWidth <= 768) {
        const navbar = document.querySelector('.nav-container');
        const menuToggle = document.createElement('button');
        menuToggle.innerHTML = '☰';
        menuToggle.className = 'mobile-menu-toggle';
        menuToggle.style.cssText = `
            display: block;
            background: none;
            border: none;
            font-size: 1.5rem;
            color: #333;
            cursor: pointer;
        `;
        
        navbar.appendChild(menuToggle);
        
        const navMenu = document.querySelector('.nav-menu');
        menuToggle.addEventListener('click', () => {
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        });
    }
}

// ===== INITIALIZE ALL FUNCTIONS =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    animateSkillBars();
    typeWriter();
    revealOnScroll();
    setupProjectCards();
    createBackToTopButton();
    setupContactInteractions();
    setupEasterEgg();
    setupMobileMenu();
    
    // Add CSS for active navigation
    const style = document.createElement('style');
    style.textContent = `
        .nav-menu a.active {
            color: #3498db !important;
            font-weight: 600;
        }
        .nav-menu a.active:after {
            content: '';
            position: absolute;
            bottom: -5px;
            left: 50%;
            transform: translateX(-50%);
            width: 20px;
            height: 2px;
            background: #3498db;
        }
        .nav-menu a {
            position: relative;
        }
    `;
    document.head.appendChild(style);
    
    // Welcome message
    setTimeout(() => {
        console.log('🚀 Welcome to my portfolio! Try the Konami Code: ↑↑↓↓←→←→BA');
    }, 2000);
});

// ===== PERFORMANCE OPTIMIZATION =====
// Throttle scroll events for better performance
function throttle(func, wait) {
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

// Apply throttling to scroll events
const throttledScroll = throttle(() => {
    // Scroll-based animations here
}, 16); // ~60fps

window.addEventListener('scroll', throttledScroll);