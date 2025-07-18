// Load components dynamically
document.addEventListener('DOMContentLoaded', function() {
    // Load all components
    loadComponent('header-component', 'components/header.html');
    loadComponent('hero-component', 'components/hero.html');
    loadComponent('skills-component', 'components/skills.html');
    loadComponent('projects-component', 'components/projects.html');
    loadComponent('experience-component', 'components/experience.html');
    loadComponent('contact-component', 'components/contact.html');
    loadComponent('footer-component', 'components/footer.html');
    
    // Initialize scripts after components are loaded
    setTimeout(initializeScripts, 300);
});

function loadComponent(componentId, filePath) {
    fetch(filePath)
        .then(response => response.text())
        .then(data => {
            document.getElementById(componentId).innerHTML = data;
        })
        .catch(error => console.error('Error loading component:', error));
}

function initializeScripts() {
    // Header scroll effect
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Mobile menu toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileToggle.innerHTML = navLinks.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                if (mobileToggle) {
                    mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        // Create a success message element
        let successMsg = document.createElement('div');
        successMsg.className = 'form-success-msg';
        successMsg.style.display = 'none';
        successMsg.style.margin = '16px 0';
        successMsg.style.color = 'var(--primary, #2563eb)';
        successMsg.style.fontWeight = 'bold';
        contactForm.parentNode.insertBefore(successMsg, contactForm);

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Remove previous error highlights
            contactForm.querySelectorAll('.form-input').forEach(input => {
                input.style.borderColor = '';
            });
            successMsg.style.display = 'none';
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            let hasError = false;
            // Simple validation with inline feedback
            if (!name) {
                document.getElementById('name').style.borderColor = 'red';
                hasError = true;
            }
            if (!email) {
                document.getElementById('email').style.borderColor = 'red';
                hasError = true;
            }
            if (!subject) {
                document.getElementById('subject').style.borderColor = 'red';
                hasError = true;
            }
            if (!message) {
                document.getElementById('message').style.borderColor = 'red';
                hasError = true;
            }
            if (hasError) {
                successMsg.style.display = 'block';
                successMsg.style.color = 'red';
                successMsg.textContent = 'Please fill in all fields.';
                return;
            }
            // Show loading state
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            // Simulate network request
            setTimeout(() => {
                successMsg.style.display = 'block';
                successMsg.style.color = 'var(--primary, #2563eb)';
                successMsg.textContent = `Thank you, ${name}! Your message has been sent. I'll get back to you soon.`;
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';
            }, 1200);
        });
    }

    // Active link highlighting
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}