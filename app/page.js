'use client';

import { useEffect, useRef, useState } from 'react';

const CALENDLY_URL = 'https://calendly.com/mentrix/clone';

/* ============================================================
   SVG Icons (inline, no external icon lib needed)
   ============================================================ */
const CheckIcon = () => (
    <svg className="check-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
);
const ChevronLeft = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
);
const ChevronRight = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
);
const PlayIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3" /></svg>
);
const InstagramIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
);
const LinkedInIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
);
const YoutubeIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.13C5.12 19.58 12 19.58 12 19.58s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" /><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" /></svg>
);
const GraduationIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c0 1 2 3 6 3s6-2 6-3v-5" /></svg>
);
const MailIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
);
const PhoneIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
);

/* ============================================================
   Logo Component
   ============================================================ */
function Logo({ size = 50, color = '#3b82f6' }) {
    return (
        <svg viewBox="0 0 80 80" width={size} height={size}>
            <defs>
                <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: color, stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#2563eb', stopOpacity: 1 }} />
                </linearGradient>
            </defs>
            <path d="M25 70 Q10 55 15 35 Q18 20 30 12 Q38 7 45 10 Q55 5 60 15 Q68 22 65 35 Q70 50 55 65 Q45 72 35 70 Z"
                fill="none" stroke="url(#logoGrad)" strokeWidth="2" />
            <circle cx="30" cy="30" r="3" fill={color} />
            <circle cx="45" cy="25" r="3" fill={color} />
            <circle cx="55" cy="35" r="3" fill={color} />
            <circle cx="50" cy="50" r="3" fill={color} />
            <circle cx="35" cy="45" r="3" fill={color} />
            <circle cx="25" cy="15" r="2" fill={color} />
            <circle cx="18" cy="22" r="1.5" fill={color} />
            <circle cx="15" cy="12" r="1.5" fill={color} />
            <line x1="30" y1="30" x2="45" y2="25" stroke={color} strokeWidth="1" opacity="0.6" />
            <line x1="45" y1="25" x2="55" y2="35" stroke={color} strokeWidth="1" opacity="0.6" />
            <line x1="55" y1="35" x2="50" y2="50" stroke={color} strokeWidth="1" opacity="0.6" />
            <line x1="50" y1="50" x2="35" y2="45" stroke={color} strokeWidth="1" opacity="0.6" />
            <line x1="35" y1="45" x2="30" y2="30" stroke={color} strokeWidth="1" opacity="0.6" />
            <line x1="30" y1="30" x2="55" y2="35" stroke={color} strokeWidth="0.5" opacity="0.3" />
            <line x1="45" y1="25" x2="35" y2="45" stroke={color} strokeWidth="0.5" opacity="0.3" />
            <line x1="25" y1="15" x2="30" y2="30" stroke={color} strokeWidth="0.8" opacity="0.5" />
            <line x1="18" y1="22" x2="30" y2="30" stroke={color} strokeWidth="0.8" opacity="0.5" />
            <line x1="15" y1="12" x2="25" y2="15" stroke={color} strokeWidth="0.8" opacity="0.5" />
        </svg>
    );
}

/* ============================================================
   NAVBAR
   ============================================================ */
function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 50);
            const sections = ['hero', 'resources', 'pricing'];
            let current = 'hero';
            sections.forEach(id => {
                const el = document.getElementById(id);
                if (el && el.getBoundingClientRect().top <= 150) current = id;
            });
            setActiveSection(current);
        };
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const scrollTo = (id) => {
        const el = document.getElementById(id);
        if (el) {
            const navH = document.getElementById('navbar')?.offsetHeight || 70;
            window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - navH, behavior: 'smooth' });
        }
        setMobileOpen(false);
    };

    return (
        <nav className={`navbar${scrolled ? ' scrolled' : ''}`} id="navbar">
            <div className="nav-container">
                <a href="#" className="nav-logo" onClick={e => { e.preventDefault(); scrollTo('hero'); }}>
                    <Logo size={50} />
                </a>
                <ul className={`nav-links${mobileOpen ? ' active' : ''}`}>
                    <li>
                        <button className={`nav-link${activeSection === 'hero' ? ' active' : ''}`} onClick={() => scrollTo('hero')}>
                            HOME
                        </button>
                    </li>
                    <li>
                        <button className={`nav-link${activeSection === 'resources' ? ' active' : ''}`} onClick={() => scrollTo('resources')}>
                            RESOURCES
                        </button>
                    </li>
                    <li>
                        <button className={`nav-link${activeSection === 'pricing' ? ' active' : ''}`} onClick={() => scrollTo('pricing')}>
                            PRICING
                        </button>
                    </li>
                </ul>
                <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="nav-cta" id="nav-get-started">
                    GET STARTED
                </a>
                <button className="mobile-menu-btn" onClick={() => setMobileOpen(v => !v)} aria-label="Toggle menu">
                    <span /><span /><span />
                </button>
            </div>
        </nav>
    );
}

/* ============================================================
   HERO
   ============================================================ */
function Hero() {
    const canvasRef = useRef(null);
    const sphereRef = useRef(null);

    // Particle canvas
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animId;

        const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
        resize();
        window.addEventListener('resize', resize);

        const particles = Array.from({ length: 80 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            size: Math.random() * 1.5 + 0.5,
            alpha: Math.random() * 0.3 + 0.1,
        }));

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const g = ctx.createRadialGradient(canvas.width / 2, canvas.height * 0.6, 0, canvas.width / 2, canvas.height * 0.6, canvas.width * 0.6);
            g.addColorStop(0, 'rgba(59, 130, 246, 0.08)');
            g.addColorStop(0.5, 'rgba(59, 130, 246, 0.03)');
            g.addColorStop(1, 'rgba(255, 255, 255, 0)');
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            particles.forEach(p => {
                p.x += p.vx; p.y += p.vy;
                if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(59, 130, 246, ${p.alpha})`;
                ctx.fill();
            });

            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 150) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(59, 130, 246, ${0.06 * (1 - dist / 150)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }
            animId = requestAnimationFrame(animate);
        };
        animate();
        return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
    }, []);

    // Sphere canvas
    useEffect(() => {
        const canvas = sphereRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        let animId, rotation = 0;

        const resize = () => {
            const rect = canvas.parentElement.getBoundingClientRect();
            canvas.width = rect.width * dpr; canvas.height = rect.height * dpr;
            canvas.style.width = rect.width + 'px'; canvas.style.height = rect.height + 'px';
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };
        resize();
        window.addEventListener('resize', resize);

        const draw = () => {
            const rect = canvas.parentElement.getBoundingClientRect();
            const w = rect.width, h = rect.height, cx = w / 2, cy = h / 2, r = Math.min(w, h) * 0.35;
            ctx.clearRect(0, 0, w, h);

            const glowG = ctx.createRadialGradient(cx, cy, r * 0.3, cx, cy, r * 1.5);
            glowG.addColorStop(0, 'rgba(59, 130, 246, 0.12)');
            glowG.addColorStop(0.5, 'rgba(59, 130, 246, 0.04)');
            glowG.addColorStop(1, 'rgba(255, 255, 255, 0)');
            ctx.fillStyle = glowG;
            ctx.fillRect(0, 0, w, h);

            ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
            const sG = ctx.createRadialGradient(cx - r * 0.2, cy - r * 0.2, 0, cx, cy, r);
            sG.addColorStop(0, '#e8f4fd');
            sG.addColorStop(0.7, '#dbeafe');
            sG.addColorStop(1, '#bfdbfe');
            ctx.fillStyle = sG; ctx.fill();

            ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.clip();
            for (let i = 0; i < 12; i++) {
                const angle = (i / 12) * Math.PI + rotation;
                const xScale = Math.cos(angle);
                ctx.beginPath();
                ctx.ellipse(cx, cy, Math.abs(xScale) * r, r, 0, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(59, 130, 246, ${0.12 + Math.abs(xScale) * 0.15})`;
                ctx.lineWidth = 0.8; ctx.stroke();
            }
            for (let i = 1; i < 8; i++) {
                const lat = (i / 8) * Math.PI;
                ctx.beginPath();
                ctx.ellipse(cx, cy + r * Math.cos(lat), r * Math.sin(lat), r * Math.sin(lat) * 0.25, 0, 0, Math.PI * 2);
                ctx.strokeStyle = 'rgba(59, 130, 246, 0.1)'; ctx.lineWidth = 0.6; ctx.stroke();
            }
            ctx.restore();

            ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(59, 130, 246, 0.2)'; ctx.lineWidth = 1; ctx.stroke();

            rotation += 0.003;
            animId = requestAnimationFrame(draw);
        };
        draw();
        return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
    }, []);

    return (
        <section className="hero" id="hero">
            <canvas id="hero-canvas" ref={canvasRef} />
            <div className="hero-content">
                <h1 className="hero-title">Scale Your Personal Brand With Our Done For You AI Avatar</h1>
                <p className="hero-subtitle">DigiDoppel helps you build your personal brand, generate warm leads, and create high-quality content—all without spending hours recording videos.</p>
                <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="btn-primary hero-cta" id="hero-get-started">
                    GET STARTED
                </a>
            </div>
            <div className="hero-sphere" id="hero-sphere">
                <canvas id="sphere-canvas" ref={sphereRef} />
            </div>
        </section>
    );
}

/* ============================================================
   CLIENTS CAROUSEL
   ============================================================ */
const clients = [
    { text: 'uxds', cls: 'client-uxds' },
    { text: 'Dr. Ronnie\nGladden', cls: 'client-gladden' },
    { text: 'ecomempire', cls: 'client-ecom' },
    { text: 'FUNDING VAULT', cls: 'client-funding', dark: true },
    { text: 'GoodService', cls: 'client-good' },
    { text: 'H2K Infosys', cls: 'client-h2k' },
    { text: 'iT WORKFORCE', cls: 'client-it' },
    { text: 'LASSO', cls: 'client-lasso' },
    { text: 'NOMADS CAST', cls: 'client-nomads' },
    { text: 'trendify', cls: 'client-trendify', dark: true },
];

function ClientsCarousel() {
    const renderCard = (c, i) => (
        <div key={i} className={`client-logo-card${c.dark ? ' dark-card' : ''}`}>
            <span className={`client-text ${c.cls}`} dangerouslySetInnerHTML={{ __html: c.text.replace('\n', '<br/>') }} />
        </div>
    );

    return (
        <section className="clients" id="clients">
            <h2 className="section-title">Our Trusted Clients</h2>
            <div className="clients-carousel">
                <div className="clients-track">
                    {clients.map((c, i) => renderCard(c, i))}
                    {clients.map((c, i) => renderCard(c, i + clients.length))}
                </div>
            </div>
        </section>
    );
}

/* ============================================================
   VIDEO CAROUSEL
   ============================================================ */
const videos = [
    { src: '/videos/1st-demo.mp4', title: 'Demo 1' },
    { src: '/videos/2nd-demo.mp4', title: 'Demo 2' },
    { src: '/videos/3rd-demo.mp4', title: 'Demo 3' },
    { src: '/videos/4th-demo.mp4', title: 'Demo 4' },
];

function VideoCard({ src, title }) {
    const videoRef = useRef(null);
    const [playing, setPlaying] = useState(false);

    const togglePlay = () => {
        const v = videoRef.current;
        if (!v) return;
        if (v.paused) { v.play(); setPlaying(true); }
        else { v.pause(); setPlaying(false); }
    };

    return (
        <div className="video-card" onClick={togglePlay}>
            <div className="ai-badge">Entirely AI Generated</div>
            <video
                ref={videoRef}
                className="video-el"
                src={src}
                loop
                playsInline
                preload="metadata"
                onEnded={() => setPlaying(false)}
            />
            {!playing && (
                <div className="play-btn-overlay">
                    <div className="play-btn"><PlayIcon /></div>
                    <div className="video-overlay-text">{title}</div>
                </div>
            )}
        </div>
    );
}

function VideoCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const cardWidth = 280;
    const totalCards = videos.length; // 4
    const visibleCards = 3;
    const maxIndex = Math.max(0, totalCards - visibleCards);

    const prev = () => setCurrentIndex(i => Math.max(0, i - 1));
    const next = () => setCurrentIndex(i => Math.min(maxIndex, i + 1));

    return (
        <section className="examples" id="resources">
            <h2 className="section-title">Real Client Examples</h2>
            <div className="video-carousel-wrapper">
                <button className="carousel-arrow carousel-prev" onClick={prev} aria-label="Previous" disabled={currentIndex === 0}>
                    <ChevronLeft />
                </button>
                <div className="video-carousel">
                    <div className="video-track" style={{ transform: `translateX(-${currentIndex * cardWidth}px)` }}>
                        {videos.map((v, i) => (
                            <VideoCard key={i} src={v.src} title={v.title} />
                        ))}
                    </div>
                </div>
                <button className="carousel-arrow carousel-next" onClick={next} aria-label="Next" disabled={currentIndex === maxIndex}>
                    <ChevronRight />
                </button>
            </div>
            <div className="carousel-dots">
                {videos.map((_, i) => (
                    <button
                        key={i}
                        className={`dot${currentIndex === i ? ' active' : ''}`}
                        onClick={() => setCurrentIndex(Math.min(i, maxIndex))}
                        aria-label={`Go to video ${i + 1}`}
                    />
                ))}
            </div>
        </section>
    );
}

/* ============================================================
   PRICING
   ============================================================ */
function Pricing() {
    return (
        <section className="pricing" id="pricing">
            <h2 className="section-title">Pricing</h2>
            <div className="pricing-grid">
                {/* Plan 1 */}
                <div className="pricing-card">
                    <div className="pricing-card-inner">
                        <h3 className="plan-name">DigiDoppel<br />Buildout</h3>
                        <p className="plan-price">Let&apos;s talk</p>
                        <ul className="plan-features">
                            <li><CheckIcon /> Full AI Video and Audio Digital Clone Buildout</li>
                            <li><CheckIcon /> Completely Done For You Content Strategy</li>
                            <li><CheckIcon /> Full Manychat Funnel Setup</li>
                            <li><CheckIcon /> 3 Month System Support</li>
                        </ul>
                        <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="btn-plan" id="plan-buy-now">BUY NOW</a>
                    </div>
                </div>
                {/* Plan 2 - Featured */}
                <div className="pricing-card featured">
                    <div className="pricing-card-inner">
                        <h3 className="plan-name">DigiDoppel<br />Done For You</h3>
                        <p className="plan-price">Custom</p>
                        <ul className="plan-features">
                            <li><CheckIcon /> DigiDoppel Buildout</li>
                            <li><CheckIcon /> 30 DFY DigiDoppel Videos</li>
                            <li><CheckIcon /> Market Research &amp; Competitive Analysis, Content Strategy, Scripting, Video Creation, Editing, Posting, and Social Media Management</li>
                        </ul>
                        <p className="plan-note">*3 Month Commitment</p>
                        <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="btn-plan" id="plan-sign-up">SIGN UP</a>
                    </div>
                </div>
                {/* Plan 3 */}
                <div className="pricing-card">
                    <div className="pricing-card-inner">
                        <h3 className="plan-name">Video Packages</h3>
                        <p className="plan-price">Custom</p>
                        <ul className="plan-features">
                            <li><CheckIcon /> Custom</li>
                            <li><CheckIcon /> 30 Video Package</li>
                            <li><CheckIcon /> 60 Video Package</li>
                            <li><CheckIcon /> 90 Video Package</li>
                            <li><CheckIcon /> Youtube Video Add-Ons</li>
                            <li><CheckIcon /> Includes fully scripted, generated, edited, and finalized videos</li>
                        </ul>
                        <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="btn-plan" id="plan-addon">ADD-ON</a>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ============================================================
   SOCIAL SECTION
   ============================================================ */
const socialLinks = [
    { icon: <InstagramIcon />, label: 'Instagram', href: 'https://www.instagram.com/harshathementor/', external: true },
    { icon: <LinkedInIcon />, label: 'LinkedIn', href: '#', external: false },
    { icon: <YoutubeIcon />, label: 'Youtube', href: '#', external: false },
    { icon: <GraduationIcon />, label: 'Mentrix Academy', href: '#', external: false },
    { icon: <MailIcon />, label: 'Contact Us', href: '/contact', external: false },
    { icon: <PhoneIcon />, label: 'Schedule a call', href: CALENDLY_URL, external: true },
];

function SocialSection() {
    return (
        <section className="social-section" id="social">
            <div className="social-grid">
                {socialLinks.map((s, i) => (
                    <a
                        key={i}
                        href={s.href}
                        className="social-card"
                        id={`social-${s.label.toLowerCase().replace(/\s/g, '-')}`}
                        {...(s.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    >
                        <span className="social-icon">{s.icon}</span>
                        <span>{s.label}</span>
                    </a>
                ))}
            </div>
        </section>
    );
}

/* ============================================================
   FOOTER
   ============================================================ */
function Footer() {
    return (
        <footer className="footer" id="footer">
            <div className="footer-container">
                <div className="footer-top">
                    <div className="footer-logo">
                        <Logo size={60} />
                    </div>
                    <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="btn-primary footer-cta" id="footer-get-started">
                        GET STARTED
                    </a>
                    <div className="footer-social-icons">
                        <a href="https://www.instagram.com/harshathementor/" target="_blank" rel="noopener noreferrer" id="footer-ig" aria-label="Instagram">
                            <InstagramIcon />
                        </a>
                        <a href="#" id="footer-li" aria-label="LinkedIn">
                            <LinkedInIcon />
                        </a>
                        <a href="#" id="footer-yt" aria-label="YouTube">
                            <YoutubeIcon />
                        </a>
                    </div>
                </div>
                <div className="footer-links">
                    <a href="/terms-and-conditions" id="footer-terms">TERMS AND CONDITIONS</a>
                    <a href="/privacy-policy" id="footer-privacy">PRIVACY POLICY</a>
                    <a href="/contact" id="footer-contact">CONTACT US</a>
                </div>
                <div className="footer-copyright">
                    <p>&copy; 2025 Mentrix, LLC. 5450 McGinnis Village Pl Suite #103, Alpharetta, GA 30005. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

/* ============================================================
   SCROLL ANIMATIONS
   ============================================================ */
function useScrollAnimations() {
    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
            { rootMargin: '0px 0px -80px 0px', threshold: 0.1 }
        );
        const els = document.querySelectorAll('.section-title, .pricing-card, .social-card, .video-card');
        els.forEach((el, i) => {
            el.classList.add('fade-up');
            el.style.transitionDelay = `${i * 0.05}s`;
            observer.observe(el);
        });
        return () => observer.disconnect();
    }, []);
}

/* ============================================================
   MAIN PAGE COMPONENT
   ============================================================ */
export default function HomePage() {
    useScrollAnimations();

    return (
        <>
            <Navbar />
            <Hero />
            <ClientsCarousel />
            <VideoCarousel />
            <Pricing />
            <SocialSection />
            <Footer />
        </>
    );
}
