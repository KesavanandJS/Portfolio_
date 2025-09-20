/**
 * Enhanced Portfolio Animations and Interactions
 * This file contains advanced animations for a more attractive portfolio
 */

// Particle background effect for hero section
document.addEventListener('DOMContentLoaded', function() {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;
    
    // Create canvas element for particles
    const canvas = document.createElement('canvas');
    canvas.classList.add('particles-canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = 0;
    canvas.style.left = 0;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '0';
    heroSection.insertBefore(canvas, heroSection.firstChild);
    
    // Particle system
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationFrameId;
    
    function resizeCanvas() {
        canvas.width = heroSection.offsetWidth;
        canvas.height = heroSection.offsetHeight;
        initParticles();
    }
    
    function initParticles() {
        particles = [];
        const particleCount = Math.floor(canvas.width * canvas.height / 10000);
        
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 2 + 1,
                color: 'rgba(74, 107, 255, ' + (Math.random() * 0.3 + 0.2) + ')',
                speedX: Math.random() * 1 - 0.5,
                speedY: Math.random() * 1 - 0.5
            });
        }
    }
    
    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();
            
            // Update particle position
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Boundary check
            if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
        });
        
        // Draw connections between nearby particles
        particles.forEach((particle, i) => {
            for (let j = i + 1; j < particles.length; j++) {
                const otherParticle = particles[j];
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = 'rgba(74, 107, 255, ' + (0.1 - distance / 1000) + ')';
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.stroke();
                }
            }
        });
        
        animationFrameId = requestAnimationFrame(drawParticles);
    }
    
    // Initialize particles and start animation
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    drawParticles();
    
    // Clean up on page leave
    return () => {
        window.removeEventListener('resize', resizeCanvas);
        cancelAnimationFrame(animationFrameId);
    };
});

// Parallax effect for sections
document.addEventListener('DOMContentLoaded', function() {
    const parallaxItems = document.querySelectorAll('.parallax-item');
    
    function handleScroll() {
        const scrollY = window.scrollY;
        
        parallaxItems.forEach(item => {
            const speed = item.getAttribute('data-speed') || 0.1;
            const offset = scrollY * speed;
            item.style.transform = `translateY(${offset}px)`;
        });
    }
    
    window.addEventListener('scroll', handleScroll);
});

// Parallax effect for decorative elements
document.addEventListener('DOMContentLoaded', function() {
    const parallaxEls = document.querySelectorAll('[data-parallax]');
    function parallaxScrollHandler() {
        const scrollY = window.scrollY;
        parallaxEls.forEach(el => {
            const speed = parseFloat(el.getAttribute('data-speed')) || 0.1;
            el.style.transform = `translateY(${scrollY * speed}px)`;
        });
    }
    window.addEventListener('scroll', parallaxScrollHandler, { passive: true });
    parallaxScrollHandler();
});

// Skill progress bars animation
document.addEventListener('DOMContentLoaded', function() {
    const skillBars = document.querySelectorAll('.skill-progress-bar');
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const percentage = progressBar.getAttribute('data-percentage');
                progressBar.style.width = percentage + '%';
                progressBar.classList.add('animated');
            }
        });
    }, { threshold: 0.2 });
    
    skillBars.forEach(bar => observer.observe(bar));
});

// Tilting effect for project cards
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.project-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; 
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const tiltX = (y - centerY) / 10;
            const tiltY = -(x - centerX) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-5px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
        });
    });
});

// Text scramble effect for hero section
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#_';
        this.update = this.update.bind(this);
    }
    
    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise(resolve => this.resolve = resolve);
        this.queue = [];
        
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }
        
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }
    
    update() {
        let output = '';
        let complete = 0;
        
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="dud">${char}</span>`;
            } else {
                output += from;
            }
        }
        
        this.el.innerHTML = output;
        
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }
    
    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const titles = document.querySelectorAll('.scramble-text');
    
    titles.forEach(title => {
        const fx = new TextScramble(title);
        let counter = 0;
        const phrases = JSON.parse(title.getAttribute('data-phrases') || '["Developer", "Designer", "Creator"]');
        
        const next = () => {
            fx.setText(phrases[counter]).then(() => {
                setTimeout(next, 2000);
            });
            counter = (counter + 1) % phrases.length;
        };
        
        next();
    });
});

// Project showcase 3D gallery
document.addEventListener('DOMContentLoaded', function() {
    // Only initialize if the showcase container exists
    const showcaseContainer = document.querySelector('.project-showcase');
    if (!showcaseContainer) return;
    
    const projects = document.querySelectorAll('.showcase-item');
    const totalProjects = projects.length;
    let activeIndex = 0;
    
    function updateShowcase() {
        projects.forEach((project, index) => {
            const offset = ((index - activeIndex) / totalProjects) * 360;
            const zOffset = index === activeIndex ? 50 : 0;
            const opacity = index === activeIndex ? 1 : 0.5;
            project.style.transform = `rotateY(${offset}deg) translateZ(${zOffset}px)`;
            project.style.opacity = opacity;
            project.setAttribute('aria-hidden', index !== activeIndex);
        });
    }
    
    // Navigation buttons
    document.querySelector('.showcase-prev')?.addEventListener('click', () => {
        activeIndex = (activeIndex - 1 + totalProjects) % totalProjects;
        updateShowcase();
    });
    
    document.querySelector('.showcase-next')?.addEventListener('click', () => {
        activeIndex = (activeIndex + 1) % totalProjects;
        updateShowcase();
    });
    
    // Initialize
    updateShowcase();
});

// Interactive skills chart
document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('skillsChart')?.getContext('2d');
    if (!ctx) return;
    
    // Skill data
    const skillData = {
        labels: ['HTML/CSS', 'JavaScript', 'Python', 'React', 'Node.js', 'Database'],
        datasets: [{
            label: 'Skill Level',
            data: [90, 85, 75, 70, 65, 80],
            backgroundColor: 'rgba(74, 107, 255, 0.2)',
            borderColor: 'rgba(74, 107, 255, 1)',
            borderWidth: 2,
            pointBackgroundColor: '#ffffff',
            pointRadius: 5
        }]
    };
    
    // If Chart.js is available, initialize the chart
    if (window.Chart) {
        new Chart(ctx, {
            type: 'radar',
            data: skillData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            display: false
                        }
                    }
                }
            }
        });
    }
});

// Counter animation for placement stats
document.addEventListener('DOMContentLoaded', function() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateCounter = (element) => {
        const target = parseInt(element.getAttribute('data-target'));
        const increment = target / 50;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 30);
    };
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => observer.observe(stat));
});
