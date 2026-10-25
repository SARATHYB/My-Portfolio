/**
 * SARATHY B - PRO PORTFOLIO SCRIPT ENGINE
 * Celestial Galaxy to Earth scrollytelling canvas, interactive carousels,
 * Stark Jarvis HUD easter egg, like button confetti & Apple-grade micro-interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initParticleCanvas();
  initScrollEngine();
  initCardLighting();
  initProjectFilters();
  initJarvisHUD();
  initLikeButtons();
  initGalleryCarousels();
  initGalleryLightbox();
  initContactActions();
  initMobileNav();
});

/* ==========================================================================
   1. CELESTIAL GALAXY TO EARTH LANDING CANVAS
   ========================================================================== */
function initParticleCanvas() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  // Background Starfield (Deep Cosmic Stars)
  const starCount = Math.min(Math.floor((width * height) / 8000), 160);
  const stars = [];

  for (let i = 0; i < starCount; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5 + 0.4,
      baseAlpha: Math.random() * 0.7 + 0.2,
      twinkleSpeed: Math.random() * 0.03 + 0.008,
      phase: Math.random() * Math.PI * 2,
      color: Math.random() > 0.3 ? '#ffffff' : Math.random() > 0.5 ? '#93c5fd' : '#c4b5fd'
    });
  }

  // Foreground Interactive Neural Constellations
  const particles = [];
  const particleCount = Math.min(Math.floor((width * height) / 22000), 55);
  const maxDistance = 115;
  const mouse = { x: null, y: null, radius: 160 };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.radius = Math.random() * 1.6 + 0.8;
      this.color = Math.random() > 0.4 ? 'rgba(0, 240, 255, ' : 'rgba(59, 130, 246, ';
      this.baseAlpha = Math.random() * 0.4 + 0.2;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse gentle repulsion
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.hypot(dx, dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x -= (dx / dist) * force * 1.8;
          this.y -= (dy / dist) * force * 1.8;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color + this.baseAlpha + ')';
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Compute dynamic scroll ratio
    const docHeight = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const scrollRatio = Math.min(1, Math.max(0, window.scrollY / docHeight));

    // 1. Draw Deep Space Celestial Stars
    stars.forEach((star) => {
      star.phase += star.twinkleSpeed;
      const alpha = star.baseAlpha * (0.6 + 0.4 * Math.sin(star.phase));
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = star.color;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });

    // 2. Draw Interactive Constellation Net
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.hypot(dx, dy);

        if (dist < maxDistance) {
          const alpha = (1 - dist / maxDistance) * 0.14;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }
    }

    particles.forEach((p) => {
      p.update();
      p.draw();
    });

    // 3. LANDING ON EARTH: Dynamic Orbital Atmosphere & Curvature (When scrolling toward contact)
    if (scrollRatio > 0.65) {
      const landingProgress = (scrollRatio - 0.65) / 0.35; // 0 to 1 as we reach footer
      const horizonY = height - (landingProgress * 140 - 20);

      ctx.save();

      // Atmospheric Blue Glow Gradient
      const atmosGrad = ctx.createRadialGradient(
        width / 2, height + 350, 200,
        width / 2, height + 350, width * 0.85
      );
      atmosGrad.addColorStop(0, `rgba(5, 20, 58, ${0.85 * landingProgress})`);
      atmosGrad.addColorStop(0.4, `rgba(14, 116, 233, ${0.35 * landingProgress})`);
      atmosGrad.addColorStop(0.7, `rgba(0, 240, 255, ${0.15 * landingProgress})`);
      atmosGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = atmosGrad;
      ctx.fillRect(0, 0, width, height);

      // Earth Horizon Rim Curve
      ctx.beginPath();
      ctx.ellipse(width / 2, height + 240, width * 0.75, 300, 0, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(0, 240, 255, ${0.45 * landingProgress})`;
      ctx.lineWidth = 2.5;
      ctx.shadowColor = '#00f0ff';
      ctx.shadowBlur = 25 * landingProgress;
      ctx.stroke();

      ctx.restore();
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   2. SCROLL ENGINE & SCROLLYTELLING
   ========================================================================== */
function initScrollEngine() {
  const navbar = document.querySelector('.navbar');
  const progressBar = document.querySelector('.scroll-progress-bar');
  const reveals = document.querySelectorAll('.reveal');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;

    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }

    if (navbar) {
      if (scrollTop > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Active Section Spy
    let currentId = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 180;
      const sectionHeight = section.offsetHeight;
      if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });

  const observerOptions = {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px',
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  reveals.forEach((el) => revealObserver.observe(el));
}

/* ==========================================================================
   3. APPLE & LINEAR MOUSE-TRACKING CARD LIGHTING
   ========================================================================== */
function initCardLighting() {
  const cards = document.querySelectorAll('.interactive-card, .patent-spotlight-card, .project-card, .bento-skill-card, .column-card, .cert-card, .interest-card, .inspiration-card, .gallery-card');

  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

/* ==========================================================================
   4. PROJECT FILTERING ENGINE
   ========================================================================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const category = card.getAttribute('data-category') || '';
        if (filter === 'all' || category.includes(filter)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

/* ==========================================================================
   5. JARVIS & IRON MAN HUD EASTER EGG MODAL
   ========================================================================== */
function initJarvisHUD() {
  const triggerBtns = document.querySelectorAll('.trigger-jarvis-hud, .easter-egg-indicator');
  const overlay = document.getElementById('jarvis-hud-modal');
  const closeBtn = document.querySelector('.jarvis-close-btn');

  if (!overlay) return;

  function openHUD() {
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    runTerminalDiagnostics();
  }

  function closeHUD() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  triggerBtns.forEach((btn) => btn.addEventListener('click', (e) => {
    e.preventDefault();
    openHUD();
  }));

  if (closeBtn) closeBtn.addEventListener('click', closeHUD);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeHUD();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
      closeHUD();
    }
  });

  function runTerminalDiagnostics() {
    const terminalEl = document.getElementById('hud-terminal-output');
    if (!terminalEl) return;

    terminalEl.innerHTML = '';
    const logs = [
      '[MARK LXXXV] STARK AI CORE ENGAGED // ONLINE',
      '[OPERATOR] Sarathy Bhaskaran telemetry verified.',
      '[VOLVO GROUP] Purchasing Data Models & Global Logistics: SYNCHRONIZED',
      '[TVS MOTOR CO] BERT + LLM RAG Story Retrieval & VLM Invoicing: DEPLOYED',
      '[PATENT NO. 202641051630] Knowledge Distillation & Edge INT8 Quantization: ACTIVE',
      '[RIVIERA 2026] 200+ International Fest Events Monitored & Delivered',
      '[NSS LEADERSHIP] 3+ Blood Donation Drives & 7-Day Operations Conducted',
      '[ANALYTICS] Looker Studio Smartphone Buying Behaviour Engine: LOADED',
      '[HEISENBERG PROTOCOL] 99.1% Code Purity Confirmed.',
      '[STATUS] ALL SYSTEMS PEAK. READY FOR WORLD-CLASS IMPACT.'
    ];

    let delay = 0;
    logs.forEach((log) => {
      setTimeout(() => {
        const line = document.createElement('div');
        line.textContent = `> ${log}`;
        terminalEl.appendChild(line);
        terminalEl.scrollTop = terminalEl.scrollHeight;
      }, delay);
      delay += 220;
    });
  }
}

/* ==========================================================================
   6. INTERACTIVE LIKE BUTTON & CONFETTI BURST
   ========================================================================== */
function initLikeButtons() {
  const likeButtons = document.querySelectorAll('.like-trigger-btn');
  const likeCounters = document.querySelectorAll('.like-count-num');
  
  const STORAGE_KEY = 'sarathy_portfolio_likes';
  let likes = parseInt(localStorage.getItem(STORAGE_KEY), 10) || 142;

  function updateCounters() {
    likeCounters.forEach((el) => {
      el.textContent = likes.toLocaleString();
    });
  }

  updateCounters();

  function triggerHeartConfetti(e) {
    const count = 7;
    const rect = e.currentTarget.getBoundingClientRect();
    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height / 2;

    const emojis = ['❤️', '💖', '✨', '⚡', '🔥'];

    for (let i = 0; i < count; i++) {
      const particle = document.createElement('span');
      particle.className = 'heart-particle';
      particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      particle.style.left = `${originX + (Math.random() - 0.5) * 40}px`;
      particle.style.top = `${originY + (Math.random() - 0.5) * 20}px`;
      particle.style.fontSize = `${Math.random() * 0.8 + 1}rem`;
      particle.style.animationDuration = `${Math.random() * 0.4 + 0.8}s`;
      document.body.appendChild(particle);

      setTimeout(() => {
        particle.remove();
      }, 1200);
    }
  }

  likeButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      likes++;
      localStorage.setItem(STORAGE_KEY, likes);
      updateCounters();
      btn.classList.add('liked');
      triggerHeartConfetti(e);

      const toast = document.getElementById('toast-notification');
      if (toast) {
        toast.textContent = `Thank you for the love! ❤️ (${likes} Likes)`;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2500);
      }

      setTimeout(() => btn.classList.remove('liked'), 500);
    });
  });
}

/* ==========================================================================
   7. PHOTO GALLERY CAROUSELS (SOLO & SQUAD)
   ========================================================================== */
function initGalleryCarousels() {
  const tabBtns = document.querySelectorAll('.gallery-tab-btn');
  const carouselBlocks = document.querySelectorAll('.gallery-carousel-block');

  // Tab switching
  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      tabBtns.forEach((b) => b.classList.remove('active'));
      carouselBlocks.forEach((block) => block.classList.remove('active'));

      btn.classList.add('active');
      const targetBlock = document.getElementById(targetId);
      if (targetBlock) {
        targetBlock.classList.add('active');
      }
    });
  });

  // Controls for each carousel
  carouselBlocks.forEach((block) => {
    const trackWrapper = block.querySelector('.carousel-track-wrapper');
    const prevBtn = block.querySelector('.carousel-btn.prev');
    const nextBtn = block.querySelector('.carousel-btn.next');
    const dots = block.querySelectorAll('.carousel-dot');

    if (!trackWrapper) return;

    const scrollStep = 340;

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        trackWrapper.scrollBy({ left: -scrollStep, behavior: 'smooth' });
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        trackWrapper.scrollBy({ left: scrollStep, behavior: 'smooth' });
      });
    }

    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        const cards = block.querySelectorAll('.gallery-card');
        if (cards[idx]) {
          cards[idx].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
      });
    });

    trackWrapper.addEventListener('scroll', () => {
      const scrollLeft = trackWrapper.scrollLeft;
      const cardWidth = 340;
      const activeIdx = Math.round(scrollLeft / cardWidth);

      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === activeIdx);
      });
    });
  });
}

/* ==========================================================================
   8. PHOTO GALLERY LIGHTBOX MODAL
   ========================================================================== */
function initGalleryLightbox() {
  const modal = document.getElementById('gallery-lightbox');
  if (!modal) return;

  const lightboxImg = modal.querySelector('.lightbox-img');
  const lightboxTitle = modal.querySelector('.lightbox-caption-title');
  const lightboxSub = modal.querySelector('.lightbox-caption-sub');
  const closeBtn = modal.querySelector('.lightbox-close-btn');
  const prevBtn = modal.querySelector('.lightbox-prev-btn');
  const nextBtn = modal.querySelector('.lightbox-next-btn');

  let currentItems = [];
  let currentIndex = 0;

  function openLightbox(items, index) {
    currentItems = items;
    currentIndex = index;
    updateLightboxContent();
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function updateLightboxContent() {
    if (!currentItems[currentIndex]) return;
    const item = currentItems[currentIndex];
    lightboxImg.src = item.src;
    lightboxImg.alt = item.title;
    lightboxTitle.textContent = item.title;
    lightboxSub.textContent = item.subtitle;
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % currentItems.length;
    updateLightboxContent();
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + currentItems.length) % currentItems.length;
    updateLightboxContent();
  }

  // Bind gallery cards
  document.querySelectorAll('.gallery-card').forEach((card) => {
    card.addEventListener('click', () => {
      const parentBlock = card.closest('.gallery-carousel-block');
      const cardsInBlock = Array.from(parentBlock.querySelectorAll('.gallery-card'));
      const items = cardsInBlock.map((c) => ({
        src: c.querySelector('.gallery-img')?.getAttribute('src') || '',
        title: c.querySelector('.gallery-caption')?.textContent || 'Gallery Photo',
        subtitle: c.querySelector('.gallery-subtext')?.textContent || ''
      }));

      const clickedIndex = cardsInBlock.indexOf(card);
      openLightbox(items, clickedIndex);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (prevBtn) prevBtn.addEventListener('click', showPrev);
  if (nextBtn) nextBtn.addEventListener('click', showNext);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
  });
}

/* ==========================================================================
   9. CONTACT ACTIONS & TOAST FEEDBACK
   ========================================================================== */
function initContactActions() {
  const toast = document.getElementById('toast-notification');

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  const contactForm = document.getElementById('quick-contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('sender-name')?.value || 'Peer';
      const email = document.getElementById('sender-email')?.value || '';
      const message = document.getElementById('sender-msg')?.value || '';

      const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
      const body = encodeURIComponent(`Hi Sarathy,\n\n${message}\n\nFrom: ${name} (${email})`);
      window.location.href = `mailto:bsarathy303@gmail.com?subject=${subject}&body=${body}`;

      showToast('Opening default email client...');
    });
  }
}

/* ==========================================================================
   10. MOBILE NAVIGATION DRAWER
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const drawer = document.querySelector('.mobile-nav-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !drawer) return;

  toggleBtn.addEventListener('click', () => {
    drawer.classList.toggle('open');
  });

  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => {
      drawer.classList.remove('open');
    });
  });

  document.addEventListener('click', (e) => {
    if (!drawer.contains(e.target) && !toggleBtn.contains(e.target) && drawer.classList.contains('open')) {
      drawer.classList.remove('open');
    }
  });
}
