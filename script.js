
document.addEventListener('DOMContentLoaded', function() {
    // Form submission handling
    const trialForm = document.getElementById('trial-form');
    if (trialForm) {
        trialForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const email = this.querySelector('input[type="email"]').value;
            const password = this.querySelector('input[type="password"]').value;
            
            // Simple validation
            if (!email || !password) {
                alert('Mohon isi semua kolom');
                return;
            }
            
            // Success message
            alert('Terima kasih telah mendaftar! Ini hanya demo.');
            
            // Reset form
            this.reset();
        });
    }
    
    // Animate stats counter
    animateStats();
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-links a, .footer-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the target section (in a real site, this would scroll to the section)
            const targetId = this.getAttribute('href');
            if (targetId === '#') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Add scroll animations
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Run once on page load
});

// Function to animate stats counters
function animateStats() {
    const stats = [
        { id: 'stat-installations', target: 5000, duration: 2000 },
        { id: 'stat-co2', target: 250000, duration: 2500, suffix: '+' },
        { id: 'stat-customers', target: 10000, duration: 2200, suffix: '+' },
        { id: 'stat-energy', target: 750000, duration: 2800, suffix: '+' }
    ];
    
    stats.forEach(stat => {
        const element = document.getElementById(stat.id);
        if (!element) return;
        
        let current = 0;
        const increment = stat.target / (stat.duration / 16); // 60fps
        const suffix = stat.suffix || '';
        
        const updateCounter = () => {
            current += increment;
            if (current >= stat.target) {
                current = stat.target;
                element.textContent = formatNumber(current) + suffix;
                clearInterval(timer);
            } else {
                element.textContent = formatNumber(Math.floor(current)) + suffix;
            }
        };
        
        const timer = setInterval(updateCounter, 16);
    });
}

// Format numbers with commas
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Reveal elements on scroll
function revealOnScroll() {
    const sections = document.querySelectorAll('section');
    const windowHeight = window.innerHeight;
    const revealPoint = 150;
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        
        if (sectionTop < windowHeight - revealPoint) {
            section.classList.add('active');
            
            // Add a subtle animation to the section
            if (!section.style.animation) {
                section.style.animation = 'fadeIn 1s ease forwards';
                section.style.opacity = '1';
            }
            
            // Animate children elements with a delay
            const children = section.querySelectorAll('.feature-card, .stat-item, .highlight-image, .highlight-content');
            children.forEach((child, index) => {
                if (!child.style.animation) {
                    child.style.animation = `fadeInUp 0.5s ease forwards ${index * 0.1}s`;
                    child.style.opacity = '0';
                }
            });
        }
    });
}

// Mobile menu toggle (for smaller screens)
const setupMobileMenu = () => {
    const header = document.querySelector('header');
    const logo = document.querySelector('.logo');
    
    // Change header background on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
            header.style.padding = '10px 0';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            header.style.padding = '15px 0';
        }
    });
    
    // Add hover effect to logo
    if (logo) {
        logo.addEventListener('mouseover', () => {
            logo.style.transform = 'scale(1.05)';
            logo.style.transition = 'transform 0.3s ease';
        });
        
        logo.addEventListener('mouseout', () => {
            logo.style.transform = 'scale(1)';
        });
    }
};

// Call the mobile menu setup
setupMobileMenu();

