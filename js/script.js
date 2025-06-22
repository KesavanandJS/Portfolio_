// Initialize AOS animation library
AOS.init({
    duration: 800,
    once: false,
});

// Navigation menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a menu item
document.querySelectorAll('.nav-menu a').forEach(item => {
    item.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Active menu item based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const scrollPosition = window.scrollY;

    // Sticky navbar
    const navbar = document.getElementById('navbar');
    if (scrollPosition > 50) {
        navbar.classList.add('sticky');
    } else {
        navbar.classList.remove('sticky');
    }

    // Active menu item
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
    
    // Back to top button visibility
    const backToTopButton = document.getElementById('back-to-top');
    if (scrollPosition > 300) {
        backToTopButton.classList.add('active');
    } else {
        backToTopButton.classList.remove('active');
    }
});

// Back to top button click handler
document.getElementById('back-to-top').addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Project filtering
document.querySelectorAll('.project-filter .filter-btn').forEach(button => {
    button.addEventListener('click', () => {
        // Active button
        document.querySelectorAll('.project-filter .filter-btn').forEach(btn => 
            btn.classList.remove('active'));
        button.classList.add('active');

        // Filter projects
        const filterValue = button.getAttribute('data-filter');
        document.querySelectorAll('.project-card').forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Certificate filtering
document.querySelectorAll('.cert-filter .filter-btn').forEach(button => {
    button.addEventListener('click', () => {
        // Active button
        document.querySelectorAll('.cert-filter .filter-btn').forEach(btn => 
            btn.classList.remove('active'));
        button.classList.add('active');

        // Filter certificates
        const filterValue = button.getAttribute('data-filter');
        document.querySelectorAll('.certificate-card').forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// View more certificates functionality
const certificateCards = document.querySelectorAll('.certificate-card');
const viewMoreButton = document.querySelector('.view-more-btn');

// Initially hide certificates beyond 6
for (let i = 6; i < certificateCards.length; i++) {
    certificateCards[i].style.display = 'none';
}

viewMoreButton.addEventListener('click', function() {
    // Toggle certificate visibility
    const isShowingAll = this.classList.contains('showing-all');
    
    for (let i = 6; i < certificateCards.length; i++) {
        certificateCards[i].style.display = isShowingAll ? 'none' : 'block';
    }
    
    // Update button text and state
    if (isShowingAll) {
        this.textContent = 'View More';
        this.classList.remove('showing-all');
    } else {
        this.textContent = 'View Less';
        this.classList.add('showing-all');
    }
});

// Enhanced form submission with validation and animation
const contactForm = document.getElementById('contact-form');
const formResult = document.getElementById('form-result');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic validation
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        if (!validateEmail(email)) {
            showFormResult('Please enter a valid email address.', 'error');
            return;
        }
        
        if (name.length < 2) {
            showFormResult('Please enter your name.', 'error');
            return;
        }
        
        if (message.length < 10) {
            showFormResult('Please enter a message with at least 10 characters.', 'error');
            return;
        }
        
        // Show loading animation
        const submitBtn = contactForm.querySelector('.btn-submit');
        submitBtn.classList.add('loading');
        
        // Simulate form submission (replace with actual AJAX/fetch to your backend)
        setTimeout(() => {
            const formData = { name, email, subject, message };
            console.log('Form submitted with data:', formData);
            
            // Reset form and show success message
            contactForm.reset();
            submitBtn.classList.remove('loading');
            showFormResult('Thank you! Your message has been sent successfully.', 'success');
            
            // Hide the success message after 5 seconds
            setTimeout(() => {
                formResult.style.display = 'none';
            }, 5000);
        }, 1500);
    });
}

function showFormResult(message, type) {
    formResult.textContent = message;
    formResult.className = 'form-result ' + type;
}

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
}

// Add hover effect to social buttons
document.querySelectorAll('.social-btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        const icon = this.querySelector('i');
        if (icon) {
            icon.classList.add('fa-bounce');
            setTimeout(() => {
                icon.classList.remove('fa-bounce');
            }, 1000);
        }
    });
});

// Add animated label effect
document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
    input.addEventListener('focus', function() {
        this.closest('.form-group').classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        if (this.value === '') {
            this.closest('.form-group').classList.remove('focused');
        }
    });
    
    // Check on load if fields are filled
    if (input.value !== '') {
        input.closest('.form-group').classList.add('focused');
    }
});

// Typewriter effect
function typeWriter() {
    const typewriteElement = document.querySelector('.typewrite');
    if (!typewriteElement) return;
    
    const words = JSON.parse(typewriteElement.getAttribute('data-text'));
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;
    
    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typewriteElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typewriteElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 150;
        }
        
        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typeSpeed = 1000; // Wait before starting to delete
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500; // Wait before typing next word
        }
        
        setTimeout(type, typeSpeed);
    }
    
    type();
}

// Initialize typewriter effect
document.addEventListener('DOMContentLoaded', typeWriter);

// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check user preference from localStorage
if (localStorage.getItem('dark-mode') === 'enabled') {
    body.classList.add('dark-theme');
    themeToggle.checked = true;
}

themeToggle.addEventListener('change', () => {
    if (themeToggle.checked) {
        body.classList.add('dark-theme');
        localStorage.setItem('dark-mode', 'enabled');
    } else {
        body.classList.remove('dark-theme');
        localStorage.setItem('dark-mode', 'disabled');
    }
});

// Check system preference for dark mode
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    if (!localStorage.getItem('dark-mode')) {
        body.classList.add('dark-theme');
        themeToggle.checked = true;
    }
}

// Chat functionality
const chatBtn = document.querySelector('.chat-btn');
const floatingChat = document.querySelector('.floating-chat');
const chatInput = document.querySelector('.chat-input input');
const sendBtn = document.querySelector('.chat-input button');
const chatBody = document.querySelector('.chat-body');

chatBtn.addEventListener('click', () => {
    floatingChat.classList.toggle('open');
});

// Simple chat simulation
sendBtn.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const message = chatInput.value.trim();
    if (message !== '') {
        // Create sent message
        const messageElement = document.createElement('p');
        messageElement.classList.add('chat-message');
        messageElement.textContent = message;
        messageElement.style.marginLeft = 'auto';
        messageElement.style.backgroundColor = 'var(--primary-color)';
        messageElement.style.color = 'white';
        messageElement.style.borderTopRightRadius = '0';
        
        chatBody.appendChild(messageElement);
        chatInput.value = '';
        
        // Auto scroll to bottom
        chatBody.scrollTop = chatBody.scrollHeight;
        
        // Simulate reply after 1 second
        setTimeout(() => {
            const replyElement = document.createElement('p');
            replyElement.classList.add('chat-message', 'received');
            replyElement.textContent = "Thanks for your message! I'll get back to you soon.";
            
            chatBody.appendChild(replyElement);
            chatBody.scrollTop = chatBody.scrollHeight;
        }, 1000);
    }
}

// Update all name placeholders with "Kesavanand"
document.addEventListener('DOMContentLoaded', function() {
    // Update the typewriter effect text
    const typewriteElement = document.querySelector('.typewrite');
    if (typewriteElement) {
        typewriteElement.setAttribute('data-text', '["Kesavanand"]');
    }
    
    // Update the footer badge
    const footerBadge = document.querySelector('.footer-badge span:last-child');
    if (footerBadge) {
        footerBadge.textContent = "by Kesavanand";
    }
    
    // Update page title
    document.title = "Portfolio";
    
    // Update logo text if it contains "Portfolio"
    const logoElements = document.querySelectorAll('.logo, .footer-logo h1');
    logoElements.forEach(element => {
        if (element.textContent.includes('Portfolio')) {
            element.textContent = "Portfolio";
        }
    });
    
    // Update copyright text
    const copyrightElement = document.querySelector('.footer-bottom p');
    if (copyrightElement) {
        copyrightElement.textContent = `© ${new Date().getFullYear()} Kesavanand. All rights reserved.`;
    }
});

// Fix Project Modal Functionality - Ensure this runs after DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM loaded, setting up project modals");
    
    // Check if modal container exists
    const modalContainer = document.getElementById('projectModal');
    if (!modalContainer) {
        console.error('Error: Project modal container (#projectModal) not found in the document');
        return;
    }
    
    const modal = modalContainer.querySelector('.project-modal');
    const modalContent = modalContainer.querySelector('.modal-content');
    const modalClose = modalContainer.querySelector('.modal-close');
    
    if (!modalContent) {
        console.error('Error: Modal content element not found inside #projectModal');
        return;
    }
    
    // Project data
    const projectsData = {
        project1: {
            title: "Face and Object Detection",
            image: "./projects/face and object.jpeg",
            description: "This project utilizes YOLOv8, one of the most advanced object detection algorithms, to detect and classify faces and objects in real-time. The system can process both images and video streams with high accuracy.",
            features: [
                "Real-time face detection with high accuracy",
                "Multiple object recognition and classification",
                "Processing speed optimization for live video",
                "Custom model training capability for specific object detection"
            ],
            technologies: ["Python", "YOLOv8", "OpenCV", "Deep Learning", "Computer Vision"],
            demoLink: "#",
            codeLink: "#",
            date: "2023",
            client: "Academic Project",
            category: "AI & Computer Vision"
        },
        project2: {
            title: "Online Quiz Application",
            image: "./projects/quiz.png",
            description: "An interactive online quiz application built with Python that allows users to test their knowledge across various subjects. Features include multiple choice questions, timed quizzes, and instant scoring.",
            features: [
                "Multiple choice questions with automatic scoring",
                "Timer functionality for timed quizzes",
                "User authentication and progress tracking",
                "Admin panel for creating and managing quizzes"
            ],
            technologies: ["Python", "Flask", "SQLite", "HTML/CSS", "JavaScript"],
            demoLink: "#",
            codeLink: "#",
            date: "2023",
            client: "Personal Project",
            category: "Web Application"
        },
        project3: {
            title: "Portfolio Website",
            image: "./projects/portfolio.png",
            description: "A modern and responsive portfolio website built with HTML, CSS, and JavaScript, featuring smooth animations, dark mode support, and a clean, professional design to showcase projects and skills.",
            features: [
                "Responsive design that works on all devices",
                "Light and dark mode themes",
                "Dynamic content filtering",
                "Interactive UI elements and animations"
            ],
            technologies: ["HTML5", "CSS3", "JavaScript", "AOS Animation Library"],
            demoLink: "#",
            codeLink: "#",
            date: "2024",
            client: "Personal Project",
            category: "Web Development"
        },
        project4: {
            title: "Post Disaster Management",
            image: "./projects/disaster management.jpg",
            description: "A comprehensive system designed for Smart Indian Hackathon 2024 to help coordinate disaster relief efforts after natural calamities, connecting victims, volunteers, and government agencies.",
            features: [
                "Real-time resource tracking and allocation",
                "SOS alert system with geo-location",
                "Relief camp management and volunteer coordination",
                "Data analytics for improving response efficiency"
            ],
            technologies: ["React", "Node.js", "MongoDB", "Google Maps API", "Firebase"],
            demoLink: "#",
            codeLink: "#",
            date: "2024",
            client: "Smart Indian Hackathon",
            category: "Web Application"
        },
        project5: {
            title: "Smart Dust Cart",
            image: "./projects/dust cart.jpg",
            description: "An IoT-based smart dust cart that won 1st place in the department level Ideathon. The system includes automated waste segregation, fill-level monitoring, and optimized collection route planning.",
            features: [
                "Automated waste segregation (plastic, metal, organic)",
                "Fill-level monitoring with real-time alerts",
                "Solar-powered with battery backup",
                "Mobile app for route optimization and monitoring"
            ],
            technologies: ["Arduino", "IoT Sensors", "React Native", "Firebase", "Solar Panels"],
            demoLink: "#",
            codeLink: "#",
            date: "2023",
            client: "Ideathon Competition",
            category: "IoT"
        },
        project6: {
            title: "ZestyRoots",
            image: "./projects/ZestyRoots.png",
            description: "A web application that connects farmers directly with customers for the sale of fresh cultivated spices, eliminating middlemen to ensure fair prices for farmers and quality products for customers.",
            features: [
                "Direct farmer-to-consumer marketplace",
                "Quality verification and rating system",
                "Subscription model for regular deliveries",
                "Secure payment and logistics integration"
            ],
            technologies: ["React", "Node.js", "MongoDB", "Express", "Payment Gateway API"],
            demoLink: "#",
            codeLink: "#",
            date: "2023",
            client: "Startup Project",
            category: "E-Commerce"
        },
        project7: {
            title: "E-Waste Management",
            image: "./projects/E-Waste management.jpg",
            description: "A comprehensive system for proper disposal and recycling of electronic waste, connecting e-waste generators with certified recyclers and tracking the recycling process.",
            features: [
                "E-waste collection scheduling and tracking",
                "Recycler verification and certification checking",
                "Reward system for responsible disposal",
                "Dashboard with environmental impact metrics"
            ],
            technologies: ["React", "Node.js", "PostgreSQL", "Docker", "Google Maps API"],
            demoLink: "#",
            codeLink: "#",
            date: "2022",
            client: "Environmental Project",
            category: "Web Application"
        }
    };

    // Get all view details buttons and attach event listeners
    const viewDetailsButtons = document.querySelectorAll('.btn-view-project');
    console.log("Found view details buttons:", viewDetailsButtons.length);
    
    if (viewDetailsButtons.length > 0) {
        viewDetailsButtons.forEach(button => {
            // Remove any existing event listeners to avoid duplicates
            const newButton = button.cloneNode(true);
            button.parentNode.replaceChild(newButton, button);
            
            newButton.addEventListener('click', function(e) {
                e.preventDefault();
                const projectId = this.getAttribute('data-project');
                console.log("View details clicked for project:", projectId);
                openProjectModal(projectId);
            });
        });
    } else {
        console.error("No view details buttons found with class '.btn-view-project'");
    }

    // Function to open modal with project details
    function openProjectModal(projectId) {
        const project = projectsData[projectId];
        if (!project) {
            console.error('Project data not found for ID:', projectId);
            return;
        }
        
        console.log("Opening modal for project:", project.title);

        // Populate modal with project data
        modalContent.innerHTML = `
            <img src="${project.image}" alt="${project.title}" class="project-hero">
            <h2 class="project-title">${project.title}</h2>
            
            <div class="project-meta">
                <div class="meta-item">
                    <i class="fas fa-calendar-alt"></i>
                    <span>${project.date || 'Ongoing'}</span>
                </div>
                <div class="meta-item">
                    <i class="fas fa-user"></i>
                    <span>${project.client || 'Personal Project'}</span>
                </div>
                <div class="meta-item">
                    <i class="fas fa-folder"></i>
                    <span>${project.category || 'Web Development'}</span>
                </div>
            </div>
            
            <div class="project-description">
                <p>${project.description}</p>
            </div>
            
            <div class="project-features">
                <h3>Key Features</h3>
                <ul class="feature-list">
                    ${project.features ? project.features.map(feature => `<li>${feature}</li>`).join('') : ''}
                </ul>
            </div>
            
            <div class="project-tech">
                <h3>Technologies Used</h3>
                <div class="tech-stack">
                    ${project.technologies ? project.technologies.map(tech => `<span class="tech-item">${tech}</span>`).join('') : ''}
                </div>
            </div>
            
            ${(project.demoLink || project.codeLink) ? `
            <div class="project-links">
                ${project.demoLink ? `
                <a href="${project.demoLink}" class="project-btn btn-demo" target="_blank">
                    <i class="fas fa-external-link-alt"></i> Live Demo
                </a>` : ''}
                ${project.codeLink ? `
                <a href="${project.codeLink}" class="project-btn btn-code" target="_blank">
                    <i class="fab fa-github"></i> Source Code
                </a>` : ''}
            </div>` : ''}
        `;

        // Show modal with animation
        modalContainer.style.display = 'flex';
        setTimeout(() => {
            modalContainer.classList.add('show');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }, 10);
    }

    // Close modal functionality
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    } else {
        console.error('Error: Modal close button not found');
    }

    // Close modal when clicking outside
    modalContainer.addEventListener('click', function(e) {
        if (e.target === modalContainer) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modalContainer.classList.contains('show')) {
            closeModal();
        }
    });
    
    // Function to close modal
    function closeModal() {
        modalContainer.classList.remove('show');
        setTimeout(() => {
            if (!modalContainer.classList.contains('show')) {
                modalContainer.style.display = 'none';
            }
        }, 300); // Match this to your CSS transition duration
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    }
});

// Enhance project cards with hover effects
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add subtle floating animation
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.2)';
            
            // Make sibling cards slightly fade
            projectCards.forEach(sibling => {
                if (sibling !== card) {
                    sibling.style.opacity = '0.7';
                }
            });
        });
        
        card.addEventListener('mouseleave', function() {
            // Remove the effects
            this.style.transform = '';
            this.style.boxShadow = '';
            
            // Restore sibling cards
            projectCards.forEach(sibling => {
                sibling.style.opacity = '1';
            });
        });
    });
});

// Floating action button functionality
document.addEventListener('DOMContentLoaded', function() {
    const floatingBtn = document.querySelector('.floating-action-btn');
    
    if (floatingBtn) {
        floatingBtn.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }
});

// Custom cursor effect
document.addEventListener('DOMContentLoaded', function() {
    const cursor = document.querySelector('.custom-cursor');
    const cursorDot = document.querySelector('.cursor-dot');
    
    if (cursor && cursorDot) {
        document.addEventListener('mousemove', function(e) {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            // Add a slight delay to the dot for a trailing effect
            setTimeout(() => {
                cursorDot.style.left = e.clientX + 'px';
                cursorDot.style.top = e.clientY + 'px';
            }, 50);
        });
        
        // Interactive cursor effects
        document.querySelectorAll('a, button, .btn, .project-card').forEach(item => {
            item.addEventListener('mouseenter', () => {
                cursor.style.width = '40px';
                cursor.style.height = '40px';
                cursorDot.style.width = '0px';
                cursorDot.style.height = '0px';
            });
            
            item.addEventListener('mouseleave', () => {
                cursor.style.width = '20px';
                cursor.style.height = '20px';
                cursorDot.style.width = '8px';
                cursorDot.style.height = '8px';
            });
        });
    }
});

// Enhanced contact form handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const formResult = document.getElementById('form-result');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Email validation with regex
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showFormMessage('<i class="fas fa-exclamation-circle"></i> Please enter a valid email address.', 'error');
                return;
            }
            
            if (name.length < 2) {
                showFormMessage('<i class="fas fa-exclamation-circle"></i> Please enter your name.', 'error');
                return;
            }
            
            if (message.length < 10) {
                showFormMessage('<i class="fas fa-exclamation-circle"></i> Please enter a message with at least 10 characters.', 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = contactForm.querySelector('.btn-submit');
            submitBtn.classList.add('loading');
            
            // Simulate form submission (replace with actual form submission logic)
            setTimeout(() => {
                // Form data object for API submission
                const formData = { name, email, subject, message };
                console.log('Form submitted with data:', formData);
                
                // Reset form
                contactForm.reset();
                
                // Hide loading state
                submitBtn.classList.remove('loading');
                
                // Show success message
                showFormMessage('<i class="fas fa-check-circle"></i> Thank you! Your message has been sent successfully.', 'success');
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    formResult.style.display = 'none';
                }, 5000);
            }, 1500);
        });
    }
    
    // Display form messages
    function showFormMessage(message, type) {
        if (!formResult) return;
        
        formResult.className = 'form-result ' + type;
        formResult.innerHTML = message;
        formResult.style.display = 'flex';
    }
    
    // Add focus effects to form inputs
    const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
    formInputs.forEach(input => {
        // Focus handler
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        // Blur handler
        input.addEventListener('blur', function() {
            if (this.value === '') {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Check on load if inputs have values
        if (input.value !== '') {
            input.parentElement.classList.add('focused');
        }
    });
});

// Enhanced responsive functionality
document.addEventListener('DOMContentLoaded', function() {
    // Menu toggle functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
        
        // Close menu when clicking menu items
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navMenu && navMenu.classList.contains('active')) {
            if (!e.target.closest('.nav-menu') && !e.target.closest('.menu-toggle')) {
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        }
    });

    // Fix any duplicate content issues
    const duplicateScripts = document.querySelectorAll('script[src="./js/animations.js"]:not(:first-of-type)');
    duplicateScripts.forEach(script => script.remove());
    
    // Improve image loading with lazy loading
    const images = document.querySelectorAll('img:not([loading])');
    images.forEach(img => {
        img.setAttribute('loading', 'lazy');
    });

    // Ensure touch device compatibility
    document.documentElement.classList.toggle('touch-device', ('ontouchstart' in window) || (navigator.maxTouchPoints > 0));
    
    // Fix any responsiveness issues with modals
    const projectModal = document.getElementById('projectModal');
    if (projectModal) {
        const adjustModalPosition = () => {
            const modalContent = projectModal.querySelector('.project-modal');
            if (modalContent) {
                // Ensure the modal isn't too tall for the viewport
                const maxHeight = window.innerHeight * 0.9;
                modalContent.style.maxHeight = `${maxHeight}px`;
            }
        };
        
        window.addEventListener('resize', adjustModalPosition);
        adjustModalPosition();
    }
    
    // Improve floating chat responsiveness
    const floatingChat = document.querySelector('.floating-chat');
    if (floatingChat) {
        const chatBtn = floatingChat.querySelector('.chat-btn');
        const chatPopup = floatingChat.querySelector('.chat-popup');
        
        if (chatBtn && chatPopup) {
            chatBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                floatingChat.classList.toggle('open');
                
                // Adjust position on small screens
                if (window.innerWidth <= 576) {
                    chatPopup.style.bottom = '70px';
                    
                    if (floatingChat.classList.contains('open')) {
                        document.getElementById('back-to-top').style.opacity = '0';
                    } else {
                        document.getElementById('back-to-top').style.opacity = '1';
                    }
                }
            });
            
            // Close chat when clicking outside
            document.addEventListener('click', function(e) {
                if (!e.target.closest('.chat-popup') && !e.target.closest('.chat-btn')) {
                    floatingChat.classList.remove('open');
                    document.getElementById('back-to-top').style.opacity = '1';
                }
            });
        }
    }

    // Fix HTML duplicate content
    const cleanupDuplicateContent = () => {
        const bodyContent = document.body.innerHTML;
        const endBodyIndex = bodyContent.lastIndexOf('</body>');
        
        if (endBodyIndex !== bodyContent.indexOf('</body>')) {
            // There's duplicate content
            document.body.innerHTML = bodyContent.substring(0, endBodyIndex + 7);
        }
    };
    
    // Run cleanup after a small delay to ensure all content is loaded
    setTimeout(cleanupDuplicateContent, 100);
    
    // Fix viewport issues on mobile
    const viewportMeta = document.querySelector('meta[name="viewport"]');
    if (viewportMeta) {
        viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0');
    }
});
