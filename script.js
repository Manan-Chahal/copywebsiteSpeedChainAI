// ========================================
// Mentrix Website - JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initHeroCanvas();
    initSphereAnimation();
    initVideoCarousel();
    initScrollAnimations();
    initMobileMenu();
    initSmoothScrolling();
});

// ========================================
// Navbar scroll behavior
// ========================================
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Update active nav link based on scroll position
        const sections = ['hero', 'resources', 'pricing'];
        let current = '';
        sections.forEach(id => {
            const section = document.getElementById(id);
            if (section) {
                const rect = section.getBoundingClientRect();
                if (rect.top <= 150) {
                    current = id;
                }
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === '#' + current || (current === 'hero' && href === '#hero')) {
                link.classList.add('active');
            }
        });
    });
}

// ========================================
// Hero Background Canvas (particle field)
// ========================================
function initHeroCanvas() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const particles = [];
    const particleCount = 80;

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            size: Math.random() * 1.5 + 0.5,
            alpha: Math.random() * 0.3 + 0.1
        });
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw subtle radial gradient background
        const gradient = ctx.createRadialGradient(
            canvas.width / 2, canvas.height * 0.6, 0,
            canvas.width / 2, canvas.height * 0.6, canvas.width * 0.6
        );
        gradient.addColorStop(0, 'rgba(20, 20, 60, 0.3)');
        gradient.addColorStop(0.5, 'rgba(15, 15, 40, 0.15)');
        gradient.addColorStop(1, 'rgba(10, 10, 15, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0) p.x = canvas.width;
            if (p.x > canvas.width) p.x = 0;
            if (p.y < 0) p.y = canvas.height;
            if (p.y > canvas.height) p.y = 0;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(150, 150, 255, ${p.alpha})`;
            ctx.fill();
        });

        // Draw connections between close particles
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 150) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(100, 100, 200, ${0.05 * (1 - dist / 150)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animateParticles);
    }
    animateParticles();
}

// ========================================
// 3D Sphere Animation
// ========================================
function initSphereAnimation() {
    const canvas = document.getElementById('sphere-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    const dpr = window.devicePixelRatio || 1;
    
    function resize() {
        const rect = canvas.parentElement.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        canvas.style.width = rect.width + 'px';
        canvas.style.height = rect.height + 'px';
        ctx.scale(dpr, dpr);
    }
    resize();
    window.addEventListener('resize', resize);

    const centerX = 350;
    const centerY = 350;
    const radius = 250;
    let rotation = 0;

    function drawSphere() {
        const rect = canvas.parentElement.getBoundingClientRect();
        const w = rect.width;
        const h = rect.height;
        const cx = w / 2;
        const cy = h / 2;
        const r = Math.min(w, h) * 0.35;

        ctx.clearRect(0, 0, w, h);

        // Sphere glow
        const glowGrad = ctx.createRadialGradient(cx, cy, r * 0.3, cx, cy, r * 1.5);
        glowGrad.addColorStop(0, 'rgba(60, 20, 30, 0.3)');
        glowGrad.addColorStop(0.5, 'rgba(30, 10, 40, 0.15)');
        glowGrad.addColorStop(1, 'rgba(10, 10, 15, 0)');
        ctx.fillStyle = glowGrad;
        ctx.fillRect(0, 0, w, h);

        // Draw sphere body (dark circle)
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        const sphereGrad = ctx.createRadialGradient(cx - r * 0.2, cy - r * 0.2, 0, cx, cy, r);
        sphereGrad.addColorStop(0, '#1a1a25');
        sphereGrad.addColorStop(0.7, '#0a0a12');
        sphereGrad.addColorStop(1, '#050508');
        ctx.fillStyle = sphereGrad;
        ctx.fill();

        // Draw longitude lines (rotating)
        ctx.save();
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.clip();

        const numLongitudes = 12;
        for (let i = 0; i < numLongitudes; i++) {
            const angle = (i / numLongitudes) * Math.PI + rotation;
            const xScale = Math.cos(angle);
            
            ctx.beginPath();
            ctx.ellipse(cx + xScale * r * 0.0, cy, Math.abs(xScale) * r, r, 0, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(180, 60, 60, ${0.15 + Math.abs(xScale) * 0.15})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
        }

        // Draw latitude lines
        const numLatitudes = 8;
        for (let i = 1; i < numLatitudes; i++) {
            const lat = (i / numLatitudes) * Math.PI;
            const latR = r * Math.sin(lat);
            const latY = cy + r * Math.cos(lat);

            ctx.beginPath();
            ctx.ellipse(cx, latY, latR, latR * 0.25, 0, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(180, 60, 60, 0.12)`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
        }

        ctx.restore();

        // Sphere edge highlight
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(100, 50, 50, 0.2)';
        ctx.lineWidth = 1;
        ctx.stroke();

        rotation += 0.003;
        requestAnimationFrame(drawSphere);
    }
    drawSphere();
}

// ========================================
// Video Carousel
// ========================================
function initVideoCarousel() {
    const track = document.getElementById('video-track');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    const dotsContainer = document.getElementById('carousel-dots');
    if (!track || !prevBtn || !nextBtn) return;

    const cards = track.querySelectorAll('.video-card');
    const cardWidth = 280; // card width + gap
    let currentIndex = 0;
    const maxIndex = Math.max(0, cards.length - 4);

    function updateCarousel() {
        track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        
        // Update dots
        if (dotsContainer) {
            const dots = dotsContainer.querySelectorAll('.dot');
            const activeDot = Math.floor(currentIndex / Math.max(1, maxIndex / (dots.length - 1)));
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === Math.min(activeDot, dots.length - 1));
            });
        }
    }

    prevBtn.addEventListener('click', () => {
        currentIndex = Math.max(0, currentIndex - 1);
        updateCarousel();
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = Math.min(maxIndex, currentIndex + 1);
        updateCarousel();
    });

    // Dot clicks
    if (dotsContainer) {
        const dots = dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                currentIndex = Math.floor((i / (dots.length - 1)) * maxIndex);
                updateCarousel();
            });
        });
    }

    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].clientX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                currentIndex = Math.min(maxIndex, currentIndex + 1);
            } else {
                currentIndex = Math.max(0, currentIndex - 1);
            }
            updateCarousel();
        }
    }, { passive: true });
}

// ========================================
// Scroll Animations (Intersection Observer)
// ========================================
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add fade-up class to sections
    const sections = document.querySelectorAll('.section-title, .pricing-card, .social-card, .video-card');
    sections.forEach((el, i) => {
        el.classList.add('fade-up');
        el.style.transitionDelay = `${i * 0.05}s`;
        observer.observe(el);
    });
}

// ========================================
// Mobile Menu Toggle
// ========================================
function initMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    if (!btn || !navLinks) return;

    btn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        btn.classList.toggle('open');
    });

    // Close menu on link click
    navLinks.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            btn.classList.remove('open');
        });
    });
}

// ========================================
// Smooth Scrolling for anchor links
// ========================================
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const navHeight = document.getElementById('navbar').offsetHeight;
                const targetPos = target.getBoundingClientRect().top + window.scrollY - navHeight;
                window.scrollTo({
                    top: targetPos,
                    behavior: 'smooth'
                });
            }
        });
    });
}
