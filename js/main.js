/**
 * SARATHY B - PRO PORTFOLIO SCRIPT ENGINE
 * Apple-grade scrollytelling, interactive canvas, card lighting & micro-interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initParticleCanvas();
  initScrollEngine();
  initCardLighting();
  initProjectFilters();
  initJarvisHUD();
  initContactActions();
  initMobileNav();
});

/* ==========================================================================
   1. HIGH-PERFORMANCE NEURAL CANVAS BACKGROUND
   ========================================================================== */
function initParticleCanvas() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const particles = [];
  const particleCount = Math.min(Math.floor((width * height) / 18000), 75);
  const maxDistance = 120;

  const mouse = { x: null, y: null, radius: 150 };

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
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
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
          this.x -= (dx / dist) * force * 2;
          this.y -= (dy / dist) * force * 2;
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

    // Draw connecting lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.hypot(dx, dy);

        if (dist < maxDistance) {
          const alpha = (1 - dist / maxDistance) * 0.15;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    // Update and draw particles
    particles.forEach((p) => {
      p.update();
      p.draw();
    });

    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   2. SCROLL ENGINE & APPLE-STYLE SCROLLYTELLING
   ========================================================================== */
function initScrollEngine() {
  const navbar = document.querySelector('.navbar');
  const progressBar = document.querySelector('.scroll-progress-bar');
  const reveals = document.querySelectorAll('.reveal');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Scroll Progress Bar & Navbar transformation
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

  // IntersectionObserver for elements revealing on scroll
  const observerOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px',
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Once revealed, unobserve for performance
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
  const cards = document.querySelectorAll('.interactive-card, .patent-spotlight-card, .project-card, .bento-skill-card, .column-card, .cert-card, .interest-card');

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
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter || category.includes(filter)) {
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
   5. JARVIS & IRON MAN HUD EASTER EGG
   ========================================================================== */
function initJarvisHUD() {
  const triggerBtns = document.querySelectorAll('.trigger-jarvis-hud');
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

  triggerBtns.forEach((btn) => btn.addEventListener('click', openHUD));
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
      '[INIT] MARK LXXXV PROTOCOL ENGAGED...',
      '[SECURE] Sarathy B - AI & Systems Architecture loaded.',
      '[VOLVO GROUP] Purchasing Data Models & Analytics: SYNCHRONIZED',
      '[TVS MOTOR CO] BERT + LLM RAG & VLM Invoicing: DEPLOYED',
      '[PATENT VERIFIED] Indian Patent No. 202641051630 (Distillation & Quantization)',
      '[DL ACCURACY] Multi-Architecture Retinal CNN Ensembles: 97.8% PEAK',
      '[HEISENBERG PROTOCOL] 99.1% Pure Code Purity Verified.',
      '[STATUS] ALL SYSTEMS NOMINAL. READY FOR PRODUCTION IMPACT.'
    ];

    let delay = 0;
    logs.forEach((log) => {
      setTimeout(() => {
        const line = document.createElement('div');
        line.textContent = `> ${log}`;
        terminalEl.appendChild(line);
        terminalEl.scrollTop = terminalEl.scrollHeight;
      }, delay);
      delay += 250;
    });
  }
}

/* ==========================================================================
   6. CONTACT ACTIONS & TOAST FEEDBACK
   ========================================================================== */
function initContactActions() {
  const copyBtns = document.querySelectorAll('.copy-email-btn');
  const toast = document.getElementById('toast-notification');

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  copyBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = 'bsarathy303@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast('✓ Email copied: bsarathy303@gmail.com');
      }).catch(() => {
        showToast('Direct Mail: bsarathy303@gmail.com');
      });
    });
  });

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
   7. MOBILE NAVIGATION DRAWER
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
