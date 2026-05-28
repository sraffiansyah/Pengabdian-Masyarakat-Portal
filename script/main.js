/* ============================================= */
/* main.js — Kelompok 2 Pengabdian Masyarakat   */
/* Full Animation System v2.0                   */
/* ============================================= */
 
/* ============================================= */
/* 1. DOM REFERENCES                             */
/* ============================================= */
const navbar          = document.getElementById('navbar');
const dropdownToggle  = document.getElementById('dropdown-toggle');
const dropdownPanel   = document.getElementById('dropdown-panel');
const hamburger       = document.getElementById('hamburger');
const mobileOverlay   = document.getElementById('mobile-overlay');
const mobileDropdownToggle = document.getElementById('mobile-dropdown-toggle');
const mobileDropdownPanel  = document.getElementById('mobile-dropdown-panel');
const heroBg          = document.getElementById('hero-bg');
const heroShapes      = document.getElementById('hero-shapes');
const heroTitle       = document.getElementById('hero-title');
const heroHighlight   = document.getElementById('hero-highlight');
const heroSubtitle    = document.getElementById('hero-subtitle');
const heroActions     = document.getElementById('hero-actions');
const scrollIndicator = document.getElementById('scroll-indicator');
const magneticButtons = document.querySelectorAll('[data-magnetic]');
const navbarLinks     = document.querySelectorAll('.navbar__link');
 
/* ============================================= */
/* 2. NAVBAR SCROLL EFFECT                       */
/* ============================================= */
let lastScrollY = 0;
let ticking = false;
 
function handleNavbarScroll() {
  const scrollY = window.scrollY || window.pageYOffset;
  navbar.classList.toggle('navbar--scrolled', scrollY > 60);
  lastScrollY = scrollY;
  ticking = false;
}
 
window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(handleNavbarScroll);
    ticking = true;
  }
}, { passive: true });
 
handleNavbarScroll();
 
/* ============================================= */
/* 3. DROPDOWN INTERACTION (DESKTOP)             */
/* ============================================= */
let dropdownVisible = false;
 
function toggleDropdown(event) {
  event.preventDefault();
  dropdownVisible = !dropdownVisible;
  dropdownPanel.classList.toggle('navbar__dropdown--visible', dropdownVisible);
  dropdownToggle.querySelector('.navbar__dropdown-icon').classList.toggle('navbar__dropdown-icon--active', dropdownVisible);
}
 
dropdownToggle.addEventListener('click', toggleDropdown);
 
document.addEventListener('click', (e) => {
  if (dropdownVisible && !dropdownPanel.contains(e.target) && !dropdownToggle.contains(e.target)) {
    dropdownVisible = false;
    dropdownPanel.classList.remove('navbar__dropdown--visible');
    dropdownToggle.querySelector('.navbar__dropdown-icon').classList.remove('navbar__dropdown-icon--active');
  }
});
 
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && dropdownVisible) {
    dropdownVisible = false;
    dropdownPanel.classList.remove('navbar__dropdown--visible');
    dropdownToggle.querySelector('.navbar__dropdown-icon').classList.remove('navbar__dropdown-icon--active');
  }
});
 
/* ============================================= */
/* 4. MOBILE MENU TOGGLE                         */
/* ============================================= */
let mobileMenuOpen = false;
 
function toggleMobileMenu() {
  mobileMenuOpen = !mobileMenuOpen;
  mobileOverlay.classList.toggle('navbar__mobile-overlay--visible', mobileMenuOpen);
  hamburger.classList.toggle('navbar__hamburger--active', mobileMenuOpen);
  document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
}
 
hamburger.addEventListener('click', toggleMobileMenu);
 
mobileOverlay.addEventListener('click', (e) => {
  if (e.target === mobileOverlay) toggleMobileMenu();
});
 
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mobileMenuOpen) toggleMobileMenu();
});
 
mobileOverlay.querySelectorAll('.navbar__mobile-link, .navbar__mobile-dropdown-link').forEach(link => {
  link.addEventListener('click', () => { if (mobileMenuOpen) toggleMobileMenu(); });
});
 
/* ============================================= */
/* 5. MOBILE DROPDOWN                            */
/* ============================================= */
let mobileDropdownOpen = false;
 
function toggleMobileDropdown(event) {
  event.preventDefault();
  mobileDropdownOpen = !mobileDropdownOpen;
  mobileDropdownPanel.classList.toggle('navbar__mobile-dropdown--visible', mobileDropdownOpen);
  const arrow = mobileDropdownToggle.querySelector('.navbar__dropdown-icon');
  arrow.style.transform = mobileDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)';
}
 
mobileDropdownToggle.addEventListener('click', toggleMobileDropdown);
 
/* ============================================= */
/* 6. SMOOTH SCROLL                              */
/* ============================================= */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (id === '#') { e.preventDefault(); return; }
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        const offset = navbar.querySelector('.navbar__inner').offsetHeight + 16;
        window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
        if (dropdownVisible) toggleDropdown(e);
      }
    });
  });
}
initSmoothScroll();
 
/* ============================================= */
/* 7. ACTIVE NAV LINK ON SCROLL                  */
/* ============================================= */
function initActiveNavLinks() {
  const sections = document.querySelectorAll('section[id]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      document.querySelectorAll('.navbar__link, .navbar__mobile-link').forEach(l => l.classList.remove('navbar__link--active', 'navbar__mobile-link--active'));
      const active = document.querySelector(`.navbar__link[href="#${id}"]`);
      if (active) active.classList.add('navbar__link--active');
      const mActive = document.querySelector(`.navbar__mobile-link[href="#${id}"]`);
      if (mActive) mActive.classList.add('navbar__mobile-link--active');
    });
  }, { threshold: 0.3, rootMargin: '-72px 0px 0px 0px' });
  sections.forEach(s => observer.observe(s));
}
initActiveNavLinks();
 
/* ============================================= */
/* 8. PARALLAX + SCROLL INDICATOR               */
/* ============================================= */
function handleParallax() {
  const scrollY = window.scrollY;
  const hero = document.querySelector('.hero');
  if (!hero) return;
  const heroH = hero.offsetHeight;
  if (scrollY < heroH) {
    const bgImage = heroBg?.querySelector('.hero__bg-image');
    if (bgImage) bgImage.style.transform = `translateY(${scrollY * 0.18}px) scale(1.05)`;
    heroShapes?.querySelectorAll('.hero__shape').forEach((s, i) => {
      s.style.transform = `translateY(${scrollY * (0.12 + i * 0.04)}px)`;
    });
  }
}
 
window.addEventListener('scroll', () => {
  if (!ticking) requestAnimationFrame(handleParallax);
}, { passive: true });
 
// Scroll indicator
function initScrollIndicator() {
  setTimeout(() => {
    if (scrollIndicator) {
      scrollIndicator.style.opacity = '1';
      scrollIndicator.style.transform = 'translateY(0)';
    }
  }, 2000);
}
initScrollIndicator();
 
/* ============================================= */
/* 9. HERO TITLE HOVER TILT                      */
/* ============================================= */
if (heroHighlight) {
  heroHighlight.addEventListener('mousemove', (e) => {
    const rect = heroHighlight.getBoundingClientRect();
    const dx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const dy = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    heroHighlight.style.transform = `perspective(600px) rotateX(${dy * -5}deg) rotateY(${dx * 5}deg) scale(1.05)`;
  });
  heroHighlight.addEventListener('mouseleave', () => {
    heroHighlight.style.transform = '';
  });
}
 
/* ============================================= */
/* 10. MAGNETIC BUTTON                           */
/* ============================================= */
function initMagneticButton(btn, strength = 0.3, radius = 80) {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    const dist = Math.hypot(dx, dy);
    if (dist < radius) {
      const f = 1 - dist / radius;
      btn.style.transform = `translate(${dx * strength * f}px, ${dy * strength * f}px)`;
    }
  });
  btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
}
 
if (window.matchMedia('(min-width: 768px)').matches) {
  magneticButtons.forEach(btn => initMagneticButton(btn));
}
 
/* ============================================= */
/* 11. VIDEO SECTION                             */
/* ============================================= */
function playVideo() {
  const thumbnail = document.getElementById('videoThumbnail');
  const embed     = document.getElementById('videoEmbed');
  const iframe    = document.getElementById('youtubeIframe');
  const videoId   = 'RkB_HFYtyrA';
  if (thumbnail && embed && iframe) {
    thumbnail.style.display = 'none';
    embed.hidden = false;
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
    embed.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

const videoThumbnail = document.getElementById('videoThumbnail');
if (videoThumbnail) {
  videoThumbnail.addEventListener('click', playVideo);
  videoThumbnail.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); playVideo(); }
  });
}
 
/* ============================================= */
/* 12. IG BUTTON RIPPLE                          */
/* ============================================= */
function createRipple(event) {
  const btn = event.currentTarget;
  const ripple = document.createElement('span');
  const rect = btn.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  ripple.style.cssText = `
    width:${size}px; height:${size}px;
    left:${event.clientX - rect.left - size/2}px;
    top:${event.clientY - rect.top - size/2}px;
  `;
  ripple.classList.add('ripple');
  btn.appendChild(ripple);
  setTimeout(() => ripple.remove(), 600);
}
 
document.querySelectorAll('.ig-button').forEach(btn => {
  btn.addEventListener('click', (e) => {
    createRipple(e);
    const link = btn.getAttribute('data-ig-link');
    if (link) window.open(link, '_blank');
  });
});
 
/* ============================================= */
/* 13. RESIZE HANDLER                            */
/* ============================================= */
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    if (window.matchMedia('(min-width: 768px)').matches && mobileMenuOpen) toggleMobileMenu();
    if (window.matchMedia('(min-width: 768px)').matches) {
      magneticButtons.forEach(btn => initMagneticButton(btn));
    }
  }, 250);
});
 
/* ============================================= */
/* 14. FOOTER YEAR                               */
/* ============================================= */
document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
 
/* ============================================= */
/* 15. FULL SCROLL-TRIGGERED ANIMATION SYSTEM   */
/* ============================================= */
 
/* --- CSS: inject animation keyframes + base states --- */
const animStyles = document.createElement('style');
animStyles.textContent = `
  /* === KEYFRAMES === */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(48px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeDown {
    from { opacity: 0; transform: translateY(-32px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeLeft {
    from { opacity: 0; transform: translateX(48px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes fadeRight {
    from { opacity: 0; transform: translateX(-48px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes zoomIn {
    from { opacity: 0; transform: scale(0.85); }
    to   { opacity: 1; transform: scale(1); }
  }
  @keyframes flipUp {
    from { opacity: 0; transform: perspective(600px) rotateX(25deg) translateY(30px); }
    to   { opacity: 1; transform: perspective(600px) rotateX(0deg) translateY(0); }
  }
  @keyframes slideReveal {
    from { opacity: 0; transform: translateY(60px) scale(0.96); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }
  @keyframes glowPulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(148,137,121,0); }
    50%       { box-shadow: 0 0 28px 6px rgba(148,137,121,0.18); }
  }
  @keyframes heroTitleIn {
    from { opacity: 0; transform: translateY(40px) skewY(4deg); }
    to   { opacity: 1; transform: translateY(0) skewY(0deg); }
  }
  @keyframes underlineGrow {
    from { width: 0; }
    to   { width: 100%; }
  }
 
  /* === BASE HIDDEN STATE (before animation) === */
  [data-anim] {
    opacity: 0;
    will-change: opacity, transform;
  }
 
  /* === ANIMATED STATE === */
  [data-anim].anim--done {
    animation-fill-mode: both;
    animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
    animation-duration: 0.75s;
  }
 
  [data-anim="fade-up"].anim--done    { animation-name: fadeUp; }
  [data-anim="fade-down"].anim--done  { animation-name: fadeDown; }
  [data-anim="fade-left"].anim--done  { animation-name: fadeLeft; }
  [data-anim="fade-right"].anim--done { animation-name: fadeRight; }
  [data-anim="zoom-in"].anim--done    { animation-name: zoomIn; }
  [data-anim="flip-up"].anim--done    { animation-name: flipUp; }
  [data-anim="slide-reveal"].anim--done { animation-name: slideReveal; animation-duration: 0.9s; }
  [data-anim="hero-title"].anim--done { animation-name: heroTitleIn; animation-duration: 0.9s; }
 
  /* Stagger delays */
  [data-delay="100"].anim--done { animation-delay: 0.1s; }
  [data-delay="200"].anim--done { animation-delay: 0.2s; }
  [data-delay="300"].anim--done { animation-delay: 0.3s; }
  [data-delay="400"].anim--done { animation-delay: 0.4s; }
  [data-delay="500"].anim--done { animation-delay: 0.5s; }
  [data-delay="600"].anim--done { animation-delay: 0.6s; }
  [data-delay="700"].anim--done { animation-delay: 0.7s; }
  [data-delay="800"].anim--done { animation-delay: 0.8s; }
  [data-delay="900"].anim--done { animation-delay: 0.9s; }
 
  /* After anim done, make sure element stays visible */
  [data-anim].anim--done.anim--finished {
    opacity: 1 !important;
    transform: none !important;
    animation: none !important;
  }
 
  /* === HERO specific — always visible after load === */
  .hero__content [data-anim].anim--done { opacity: 1; }
 
  /* Section title underline accent */
  .anim-section-title {
    position: relative;
    display: block;
  }
  .anim-section-title::after {
    content: '';
    position: absolute;
    bottom: -6px;
    left: 50%;
    transform: translateX(-50%);
    height: 3px;
    width: 0;
    background: var(--primary);
    border-radius: 999px;
    transition: width 0.8s cubic-bezier(0.22,1,0.36,1);
  }
  .anim-section-title.anim--done::after {
    width: 60px;
  }
 
  /* === CARD 3D TILT (Desktop only) === */
  @media (min-width: 769px) {
    .proposal-card {
      transition: transform 0.35s cubic-bezier(0.23,1,0.32,1),
                  box-shadow 0.35s cubic-bezier(0.23,1,0.32,1),
                  border-color 0.35s ease;
    }
    .team-card {
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
  }
 
  /* === REDUCE MOTION === */
  @media (prefers-reduced-motion: reduce) {
    [data-anim] { opacity: 1 !important; transform: none !important; }
    [data-anim].anim--done { animation: none !important; }
  }
`;
document.head.appendChild(animStyles);
 
/* --- Assign data-anim attributes to all section elements --- */
function assignAnimAttributes() {
 
  /* HERO */
  const heroContent = document.querySelector('.hero__content');
  if (heroContent) {
    const titleLine = heroContent.querySelector('.hero__title-line');
    const highlight = heroContent.querySelector('.hero__title-highlight');
    const subtitle  = heroContent.querySelector('.hero__subtitle, .hero__theme-badge, p');
    const actions   = heroContent.querySelector('.hero__actions');
 
    if (titleLine)  { titleLine.setAttribute('data-anim','hero-title'); }
    if (highlight)  { highlight.setAttribute('data-anim','hero-title'); highlight.setAttribute('data-delay','150'); }
    if (subtitle)   { subtitle.setAttribute('data-anim','fade-up');     subtitle.setAttribute('data-delay','300'); }
    if (actions)    { actions.setAttribute('data-anim','fade-up');      actions.setAttribute('data-delay','450'); }
  }
 
  /* ABOUT SECTION */
  const aboutCard = document.querySelector('.about-section__card');
  if (aboutCard) {
    aboutCard.setAttribute('data-anim', 'zoom-in');
    const title    = aboutCard.querySelector('.about-section__title');
    const badge    = aboutCard.querySelector('.about-section__badge');
    const texts    = aboutCard.querySelectorAll('p');
    const features = aboutCard.querySelectorAll('.about-section__feature');
 
    if (title) { title.setAttribute('data-anim','fade-up'); title.setAttribute('data-delay','100'); title.classList.add('anim-section-title'); }
    if (badge) { badge.setAttribute('data-anim','fade-up'); badge.setAttribute('data-delay','150'); }
    texts.forEach((t, i) => { t.setAttribute('data-anim','fade-up'); t.setAttribute('data-delay', String(200 + i*100)); });
    features.forEach((f, i) => { f.setAttribute('data-anim','flip-up'); f.setAttribute('data-delay', String(300 + i*100)); });
  }
 
  /* PROPOSAL & BANNER SECTION TITLES */
  document.querySelectorAll('.placeholder-section').forEach(sec => {
    const title = sec.querySelector('.placeholder-section__title');
    const desc  = sec.querySelector('.placeholder-section__text');
    if (title) { title.setAttribute('data-anim','fade-up'); title.classList.add('anim-section-title'); }
    if (desc)  { desc.setAttribute('data-anim','fade-up');  desc.setAttribute('data-delay','150'); }
  });
 
  /* PROPOSAL CARDS */
  document.querySelectorAll('.proposal-card').forEach((card, i) => {
    card.setAttribute('data-anim', 'slide-reveal');
    card.setAttribute('data-delay', String(i * 150));
  });
 
  /* VIDEOS SECTION */
  const videosSec = document.querySelector('.videos-section');
  if (videosSec) {
    const title  = videosSec.querySelector('.videos-title');
    const desc   = videosSec.querySelector('.videos-desc');
    const player = videosSec.querySelector('.video-thumbnail-wrapper, #videoThumbnail, .video-embed-wrapper');
    const ytBtn  = videosSec.querySelector('.button-yt');
 
    if (title)  { title.setAttribute('data-anim','fade-up'); title.classList.add('anim-section-title'); }
    if (desc)   { desc.setAttribute('data-anim','fade-up'); desc.setAttribute('data-delay','150'); }
    if (player) { player.setAttribute('data-anim','zoom-in'); player.setAttribute('data-delay','250'); }
    if (ytBtn)  { ytBtn.setAttribute('data-anim','fade-up'); ytBtn.setAttribute('data-delay','400'); }
  }
 
  /* TEAMS SECTION */
  const teamsSec = document.querySelector('.teams-section');
  if (teamsSec) {
    const title = teamsSec.querySelector('.teams-title');
    const desc  = teamsSec.querySelector('.teams-desc');
    if (title) { title.setAttribute('data-anim','fade-up'); title.classList.add('anim-section-title'); }
    if (desc)  { desc.setAttribute('data-anim','fade-up'); desc.setAttribute('data-delay','150'); }
  }
 
  document.querySelectorAll('.team-card').forEach((card, i) => {
    card.setAttribute('data-anim', 'zoom-in');
    card.setAttribute('data-delay', String(i * 100));
  });
 
  /* DOCUMENTATION SECTION */
  const docSec = document.querySelector('.documentation-section');
  if (docSec) {
    const title = docSec.querySelector('.documentation-title');
    const desc  = docSec.querySelector('.documentation-desc');
    if (title) { title.setAttribute('data-anim','fade-up'); title.classList.add('anim-section-title'); }
    if (desc)  { desc.setAttribute('data-anim','fade-up'); desc.setAttribute('data-delay','100'); }
  }
 
  document.querySelectorAll('.documentation-item').forEach((item, i) => {
    item.setAttribute('data-anim', 'fade-up');
    item.setAttribute('data-delay', String(i * 150));
  });
 
  /* FOOTER */
  const footer = document.querySelector('.footer');
  if (footer) {
    footer.querySelectorAll('.footer__brand, .footer__column').forEach((col, i) => {
      col.setAttribute('data-anim', 'fade-up');
      col.setAttribute('data-delay', String(i * 100));
    });
  }
}
 
/* --- Intersection Observer for scroll animations --- */
function initScrollAnimations() {
  assignAnimAttributes();
 
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      el.classList.add('anim--done');
 
      // After animation ends, freeze the final state
      el.addEventListener('animationend', () => {
        el.classList.add('anim--finished');
      }, { once: true });
 
      observer.unobserve(el);
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  });
 
  // Hero — trigger immediately on load (no wait for scroll)
  const heroAnimEls = document.querySelectorAll('.hero__content [data-anim]');
  heroAnimEls.forEach(el => {
    el.classList.add('anim--done');
    setTimeout(() => el.classList.add('anim--finished'), 1200);
  });
 
  // Everything else — observe
  document.querySelectorAll('[data-anim]:not(.hero__content [data-anim])').forEach(el => {
    observer.observe(el);
  });
}
 
/* Run after DOM is ready */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initScrollAnimations);
} else {
  initScrollAnimations();
}
 
/* ============================================= */
/* 16. PROPOSAL CARD 3D TILT (Desktop)          */
/* ============================================= */
function initCardTilt() {
  if (!window.matchMedia('(min-width: 769px)').matches) return;
 
  document.querySelectorAll('.proposal-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `
        translateY(-10px) scale(1.02)
        rotateX(${-y * 8}deg) rotateY(${x * 8}deg)
        perspective(800px)
      `;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}
initCardTilt();
 
/* ============================================= */
/* 17. SECTION ENTRANCE HIGHLIGHT (glow line)   */
/* ============================================= */
function initSectionGlow() {
  const glowStyles = document.createElement('style');
  glowStyles.textContent = `
    section {
      position: relative;
    }
    section::before {
      content: '';
      position: absolute;
      top: 0; left: 50%;
      transform: translateX(-50%) scaleX(0);
      width: 80%; max-width: 600px;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(148,137,121,0.35), transparent);
      transition: transform 0.9s cubic-bezier(0.22,1,0.36,1);
      pointer-events: none;
      z-index: 2;
    }
    section.section--entered::before {
      transform: translateX(-50%) scaleX(1);
    }
    /* skip hero and footer */
    .hero::before, footer::before { display: none !important; }
  `;
  document.head.appendChild(glowStyles);
 
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('section--entered');
        sectionObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
 
  document.querySelectorAll('section:not(.hero)').forEach(s => sectionObserver.observe(s));
}
initSectionGlow();
 
/* ============================================= */
/* 18. CUSTOM CURSOR + TRAIL (Desktop only)     */
/* ============================================= */
function initCustomCursor() {
  if (!window.matchMedia('(min-width: 1024px)').matches) return;
  if (window.matchMedia('(pointer: coarse)').matches) return; // no touch
 
  /* --- Inject CSS --- */
  const cursorCSS = document.createElement('style');
  cursorCSS.textContent = `
    *, *::before, *::after { cursor: none !important; }
 
    /* Outer ring */
    #cur-ring {
      position: fixed;
      pointer-events: none;
      z-index: 99999;
      width: 36px; height: 36px;
      border-radius: 50%;
      border: 1.5px solid rgba(148, 137, 121, 0.75);
      transform: translate(-50%, -50%);
      transition: width 0.25s ease, height 0.25s ease,
                  border-color 0.25s ease, background 0.25s ease,
                  opacity 0.25s ease;
      will-change: left, top;
      mix-blend-mode: normal;
      box-shadow: 0 0 12px rgba(148,137,121,0.18);
    }
 
    /* Inner dot */
    #cur-dot {
      position: fixed;
      pointer-events: none;
      z-index: 99999;
      width: 5px; height: 5px;
      border-radius: 50%;
      background: rgba(148, 137, 121, 1);
      transform: translate(-50%, -50%);
      will-change: left, top;
      transition: width 0.15s ease, height 0.15s ease, opacity 0.15s ease;
      box-shadow: 0 0 6px rgba(148,137,121,0.8);
    }
 
    /* Trail dot */
    .cur-trail {
      position: fixed;
      pointer-events: none;
      z-index: 99998;
      border-radius: 50%;
      background: rgba(148, 137, 121, 0.55);
      transform: translate(-50%, -50%);
      will-change: left, top, opacity, width, height;
    }
 
    /* Hover over clickables — ring expands + fills slightly */
    #cur-ring.cur--hover {
      width: 56px; height: 56px;
      background: rgba(148, 137, 121, 0.08);
      border-color: rgba(148, 137, 121, 1);
      box-shadow: 0 0 24px rgba(148,137,121,0.3);
    }
    #cur-dot.cur--hover {
      width: 4px; height: 4px;
      opacity: 0.6;
    }
 
    /* Click burst */
    #cur-ring.cur--click {
      width: 28px; height: 28px;
      background: rgba(148, 137, 121, 0.2);
      border-color: rgba(148, 137, 121, 1);
      transition: width 0.1s ease, height 0.1s ease, background 0.1s ease;
    }
 
    /* Hide when leaving window */
    #cur-ring.cur--hidden, #cur-dot.cur--hidden { opacity: 0; }
  `;
  document.head.appendChild(cursorCSS);
 
  /* --- Create elements --- */
  const ring = document.createElement('div'); ring.id = 'cur-ring';
  const dot  = document.createElement('div'); dot.id  = 'cur-dot';
  document.body.appendChild(ring);
  document.body.appendChild(dot);
 
  /* --- Trail pool --- */
  const TRAIL_COUNT = 10;
  const trails = [];
  for (let i = 0; i < TRAIL_COUNT; i++) {
    const t = document.createElement('div');
    t.className = 'cur-trail';
    const frac = (i + 1) / TRAIL_COUNT;       // 0.1 … 1.0 (oldest=large, newest=small)
    const size = 2 + (1 - frac) * 10;         // 2–12px, newest dots smallest
    t.style.width  = size + 'px';
    t.style.height = size + 'px';
    t.style.opacity = String(frac * 0.55);     // newest faintest relative to order
    t.style.left = '-999px';
    t.style.top  = '-999px';
    document.body.appendChild(t);
    trails.push({ el: t, x: -999, y: -999 });
  }
 
  /* --- State --- */
  let mouseX = -999, mouseY = -999;
  let ringX  = -999, ringY  = -999;
 
  // History of last N positions for trail
  const history = Array(TRAIL_COUNT).fill({ x: -999, y: -999 });
 
  /* --- RAF loop --- */
  function cursorLoop() {
    // Smooth ring follows mouse with lag
    ringX += (mouseX - ringX) * 0.14;
    ringY += (mouseY - ringY) * 0.14;
 
    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';
 
    // Dot snaps instantly
    dot.style.left = mouseX + 'px';
    dot.style.top  = mouseY + 'px';
 
    // Shift history
    history.unshift({ x: mouseX, y: mouseY });
    history.pop();
 
    // Update trail positions (spaced back in time)
    trails.forEach((trail, i) => {
      // Pick every 2nd history entry for spacing
      const h = history[Math.min(i * 2, history.length - 1)];
      trail.el.style.left = h.x + 'px';
      trail.el.style.top  = h.y + 'px';
    });
 
    requestAnimationFrame(cursorLoop);
  }
  requestAnimationFrame(cursorLoop);
 
  /* --- Mouse events --- */
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    ring.classList.remove('cur--hidden');
    dot.classList.remove('cur--hidden');
  }, { passive: true });
 
  document.addEventListener('mouseleave', () => {
    ring.classList.add('cur--hidden');
    dot.classList.add('cur--hidden');
    trails.forEach(t => { t.el.style.opacity = '0'; });
  });
  document.addEventListener('mouseenter', () => {
    ring.classList.remove('cur--hidden');
    dot.classList.remove('cur--hidden');
    trails.forEach((t, i) => {
      t.el.style.opacity = String(((i + 1) / TRAIL_COUNT) * 0.55);
    });
  });
 
  /* Hover effect on interactive elements */
  const hoverTargets = 'a, button, [data-magnetic], .proposal-card, .team-card, .ig-button, input, textarea, select, label, [role="button"]';
  document.querySelectorAll(hoverTargets).forEach(el => {
    el.addEventListener('mouseenter', () => { ring.classList.add('cur--hover'); dot.classList.add('cur--hover'); });
    el.addEventListener('mouseleave', () => { ring.classList.remove('cur--hover'); dot.classList.remove('cur--hover'); });
  });
 
  /* Also handle dynamic elements (proposal cards added via script) */
  const hoverObs = new MutationObserver(() => {
    document.querySelectorAll(hoverTargets).forEach(el => {
      if (el.dataset.cursorBound) return;
      el.dataset.cursorBound = '1';
      el.addEventListener('mouseenter', () => { ring.classList.add('cur--hover'); dot.classList.add('cur--hover'); });
      el.addEventListener('mouseleave', () => { ring.classList.remove('cur--hover'); dot.classList.remove('cur--hover'); });
    });
  });
  hoverObs.observe(document.body, { childList: true, subtree: true });
 
  /* Click burst */
  document.addEventListener('mousedown', () => ring.classList.add('cur--click'));
  document.addEventListener('mouseup',   () => ring.classList.remove('cur--click'));
}

initCustomCursor();

/* ============================================= */
/* 19. DOC FAN CARD — Spread on hover           */
/* ============================================= */
(function initDocFan() {
  const fanContainer = document.getElementById('doc-fan-container');
  if (!fanContainer) return;
 
  let spreadTimeout = null;
 
  // Hover masuk ke container → spread
  fanContainer.addEventListener('mouseenter', () => {
    clearTimeout(spreadTimeout);
    fanContainer.classList.add('is-spread');
  });
 
  // Hover keluar dari container → collapse (dengan delay kecil biar ga gak sengaja)
  fanContainer.addEventListener('mouseleave', () => {
    spreadTimeout = setTimeout(() => {
      fanContainer.classList.remove('is-spread');
    }, 300);
  });
 
  // Touch support — tap container untuk spread/collapse
  fanContainer.addEventListener('click', (e) => {
    // Kalau udah spread dan nge-klik card (link) — biarkan link berjalan normal
    if (fanContainer.classList.contains('is-spread')) {
      // Cek apakah target atau parent-nya adalah .doc-glass-card
      const card = e.target.closest('.doc-glass-card');
      if (card) return; // biarkan link jalan
    }
    fanContainer.classList.toggle('is-spread');
  });
})();
 
/* ============================================= */
/* 20. DOCUMENTATION 3D CAROUSEL                 */
/* ============================================= */
(function initDocCarousel() {
  const wrapper = document.getElementById('doc-carousel-wrapper');
  const scene   = document.getElementById('doc-carousel-scene');
  if (!wrapper || !scene) return;
 
  const cards   = Array.from(scene.querySelectorAll('.doc-carousel-card'));
  const dots    = Array.from(document.querySelectorAll('.doc-carousel-dot'));
  const btnPrev = document.getElementById('doc-prev');
  const btnNext = document.getElementById('doc-next');
  const TOTAL   = cards.length;
  const INTERVAL_MS = 2400;
 
  let current  = 0;
  let timer    = null;
  let paused   = false;
 
  /* ----- Layout config per position offset ----- */
  /*
    offset: 0  = center (active)
    offset: 1  = right 1
    offset: 2  = far right
    offset:-1  = left 1
    offset:-2  = far left
  */
  function getConfig(offset) {
    const abs = Math.abs(offset);
    const sign = offset >= 0 ? 1 : -1;
    if (abs === 0) {
      return { tx: 0, tz: 0, ry: 0, scale: 1, opacity: 1, zIndex: 10 };
    } else if (abs === 1) {
      return { tx: sign * 280, tz: -120, ry: sign * -28, scale: 0.78, opacity: 0.68, zIndex: 7 };
    } else {
      return { tx: sign * 480, tz: -280, ry: sign * -42, scale: 0.58, opacity: 0.32, zIndex: 4 };
    }
  }
 
  function applyLayout() {
    cards.forEach((card, i) => {
      // Calculate offset from current (modular, wrapping)
      let raw = i - current;
      // Wrap to range [-floor(TOTAL/2), floor(TOTAL/2)]
      if (raw > Math.floor(TOTAL / 2))  raw -= TOTAL;
      if (raw < -Math.floor(TOTAL / 2)) raw += TOTAL;
 
      // Only show up to 2 positions each side, hide the rest
      const visible = Math.abs(raw) <= 2;
      const cfg = getConfig(raw);
 
      card.style.transform = visible
        ? `translateX(${cfg.tx}px) translateZ(${cfg.tz}px) rotateY(${cfg.ry}deg) scale(${cfg.scale})`
        : `translateX(${raw > 0 ? 600 : -600}px) translateZ(-400px) scale(0.4)`;
 
      card.style.opacity  = visible ? String(cfg.opacity) : '0';
      card.style.zIndex   = String(cfg.zIndex);
      card.style.pointerEvents = raw === 0 ? 'auto' : 'none';
      card.classList.toggle('is-active', raw === 0);
    });
 
    // Dots
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }
 
  function goTo(index) {
    current = ((index % TOTAL) + TOTAL) % TOTAL;
    applyLayout();
  }
 
  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }
 
  function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => { if (!paused) next(); }, INTERVAL_MS);
  }
 
  function stopTimer()  { clearInterval(timer); }
 
  // Init
  applyLayout();
  startTimer();
 
  // Nav buttons
  btnNext?.addEventListener('click', () => { next(); startTimer(); });
  btnPrev?.addEventListener('click', () => { prev(); startTimer(); });
 
  // Dots
  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      goTo(Number(dot.dataset.dot));
      startTimer();
    });
  });
 
  // Pause on hover
  wrapper.addEventListener('mouseenter', () => { paused = true; });
  wrapper.addEventListener('mouseleave', () => { paused = false; });
 
  // Touch/swipe support
  let touchStartX = 0;
  wrapper.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });
  wrapper.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 40) {
      dx < 0 ? next() : prev();
      startTimer();
    }
  }, { passive: true });
 
  // Responsive: recalculate on resize
  window.addEventListener('resize', applyLayout, { passive: true });
})();

/* ============================================= */
/* 21. TEAM CARDS — DOM Render                   */
/* ============================================= */
(function initTeamCards() {
  const members = [
    {
      name : 'Aditya Romadhoni',
      nim  : '15250261',
      photo: '/src/card-1.jpeg',
      ig   : 'https://instagram.com/Don1ee',
      igUser: '@Don1ee',
    },
    {
      name : 'Syukron Raffiansyah',
      nim  : '15250408',
      photo: '/src/card-2.jpeg',
      ig   : 'https://instagram.com/sykrn_rffii',
      igUser: '@sykrn_rffii',
    },
    {
      name : 'Yasmine Sheilana Syahida',
      nim  : '15250571',
      photo: '/src/card-7.jpeg',
      ig   : 'https://instagram.com/yasminehlna',
      igUser: '@yasminehlna',
    },
    {
      name : "Sayyid Ja'far Shodiq",
      nim  : '15250510',
      photo: '/src/card-4.jpeg',
      ig   : 'https://instagram.com/sayidjafarrr',
      igUser: '@sayidjafarrr',
    },
    {
      name : 'Ahmad Ridho Aryaguna',
      nim  : '15250610',
      photo: '/src/card-3.jpeg',
      ig   : 'https://instagram.com/ridhooo747_',
      igUser: '@ridhooo747_',
    },
    {
      name : 'Lulu Cahya Pertiwi',
      nim  : '15250887',
      photo: '/src/card-6.jpeg',
      ig   : 'https://instagram.com/alaamalazgue',
      igUser: '@alaamalazgue',
    },
    {
      name : 'Ridho Fakhar Septian',
      nim  : '15250446',
      photo: '/src/card-5.jpeg',
      ig   : 'https://instagram.com/ridho_f_s_',
      igUser: '@ridho_f_s_',
    },
  ];

  // SVG Instagram icon — didefinisikan satu kali, di-reuse tiap card
  const igSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/>
  </svg>`;

  const grid = document.getElementById('team-grid');
  if (!grid) return;

  members.forEach(({ name, nim, photo, ig, igUser }) => {
    const card = document.createElement('div');
    card.className = 'team-card';
    card.innerHTML = `
      <img src="${photo}" alt="${name}" class="team-photo">
      <div class="team-overlay">
        <div class="team-info-container">
          <h3 class="team-name">${name}</h3>
          <span class="team-nim">NIM: ${nim}</span>
        </div>
        <div class="team-ig-wrapper">
          <button class="ig-button" data-ig-link="${ig}">
            <div class="icon-wrapper">${igSVG}</div>
            <div class="separator"></div>
            <span class="username">${igUser}</span>
          </button>
        </div>
      </div>`;

    // Ripple — addEventListener, bukan inline onclick
    card.querySelector('.ig-button').addEventListener('click', createRipple);

    grid.appendChild(card);
  });
})();

/* ============================================= */
/* 22. CONSOLE WELCOME                           */
/* ============================================= */
console.log('%c Kelompok 2 — Pengabdian Masyarakat ', 'background:#948979;color:#222831;font-size:14px;font-weight:bold;padding:8px 16px;border-radius:4px;');
console.log('✨ Animation System v2.0 loaded');
/* ============================================= */
/* 22. THEME TOGGLE — Dark / Light Mode         */
/* FIX: unchecked = dark/malam, checked = light/siang */
/* ============================================= */
(function initThemeToggle() {
  const checkbox    = document.getElementById('theme-checkbox');
  const body        = document.body;
  const STORAGE_KEY = 'kelompok2-theme';

  // unchecked → dark mode (default, malam)
  // checked   → light mode (siang)
  function applyTheme(isLight) {
    if (isLight) {
      body.classList.add('light-mode');
      if (checkbox) checkbox.checked = true;
    } else {
      body.classList.remove('light-mode');
      if (checkbox) checkbox.checked = false;
    }
  }

  // Load saved preference — default dark
  const saved = localStorage.getItem(STORAGE_KEY);
  applyTheme(saved === 'light');

  // Listen toggle
  checkbox?.addEventListener('change', () => {
    const isLight = checkbox.checked;
    applyTheme(isLight);
    localStorage.setItem(STORAGE_KEY, isLight ? 'light' : 'dark');
  });
})();