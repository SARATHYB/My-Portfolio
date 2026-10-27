/**
 * SARATHY B - PRO PORTFOLIO SCRIPT ENGINE
 * Celestial Galaxy to Earth scrollytelling canvas, interactive carousels,
 * Stark Jarvis HUD easter egg, like button confetti & Apple-grade micro-interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initParticleCanvas();
  initScrollEngine();
  initCardLighting();
  initProjectsStackedCarousel();
  initJarvisHUD();
  initLikeButtons();
  initGalleryCarousels();
  initGalleryLightbox();
  initContactActions();
  initMobileNav();
  initHeroAvatarReactor();
});

/* ==========================================================================
   1. CELESTIAL GALAXY, PLANETS, SATELLITE TO EARTH LANDING CANVAS ENGINE
   ========================================================================== */
function initParticleCanvas() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  // 1. Multi-Layered Celestial Stars (with parallax depth)
  const starCount = Math.min(Math.floor((width * height) / 5000), 280);
  const stars = [];
  const starColors = ['#ffffff', '#ffffff', '#e0f2fe', '#bae6fd', '#c4b5fd', '#fef08a', '#fbcfe8'];

  for (let i = 0; i < starCount; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      baseY: Math.random() * height,
      radius: Math.random() < 0.85 ? Math.random() * 1.2 + 0.4 : Math.random() * 2.2 + 1.2,
      baseAlpha: Math.random() * 0.7 + 0.3,
      twinkleSpeed: Math.random() * 0.04 + 0.01,
      phase: Math.random() * Math.PI * 2,
      speedZ: Math.random() * 0.6 + 0.2,
      color: starColors[Math.floor(Math.random() * starColors.length)]
    });
  }

  // 2. Spiral Milky Way Galaxy Particles at the Start
  const galaxyStars = [];
  const galaxyArms = 2;
  const starsPerArm = 110;
  for (let arm = 0; arm < galaxyArms; arm++) {
    const armAngle = (arm * Math.PI * 2) / galaxyArms;
    for (let i = 0; i < starsPerArm; i++) {
      const t = i / starsPerArm;
      const angle = armAngle + t * 4.4;
      const dist = 16 + Math.pow(t, 1.4) * Math.min(width * 0.38, 330);
      const scatter = (Math.random() - 0.5) * (dist * 0.34);
      galaxyStars.push({
        baseAngle: angle,
        dist: dist + scatter,
        size: Math.random() < 0.75 ? Math.random() * 1.3 + 0.5 : Math.random() * 2.2 + 1.2,
        color: Math.random() < 0.4 ? '#ffffff' : (Math.random() < 0.7 ? '#38bdf8' : '#c084fc'),
        alpha: Math.random() * 0.75 + 0.25,
        twinkleSpeed: Math.random() * 0.04 + 0.01,
        phase: Math.random() * Math.PI * 2
      });
    }
  }

  // 3. Cosmic Shooting Stars (Meteors)
  const shootingStars = [];
  function spawnShootingStar() {
    if (shootingStars.length < 2 && Math.random() < 0.4) {
      shootingStars.push({
        x: Math.random() * width * 0.8 + width * 0.1,
        y: Math.random() * (height * 0.4),
        length: Math.random() * 90 + 70,
        speed: Math.random() * 12 + 14,
        angle: (Math.PI / 4) + (Math.random() - 0.5) * 0.2,
        alpha: 1,
        life: 0,
        maxLife: Math.random() * 35 + 25
      });
    }
  }

  setInterval(spawnShootingStar, 2400);

  // 4. Procedural Earth City Lights (Twinkling gold dots on the night side of Earth)
  const cityLights = [];
  const cityCount = 65;
  for (let i = 0; i < cityCount; i++) {
    cityLights.push({
      angleOffset: (Math.random() - 0.5) * 0.85,
      yOffset: Math.random() * 70 + 20,
      radius: Math.random() * 1.6 + 0.6,
      baseAlpha: Math.random() * 0.7 + 0.3,
      twinkleSpeed: Math.random() * 0.05 + 0.02,
      phase: Math.random() * Math.PI * 2
    });
  }

  // 5. Foreground Interactive Constellation Net
  const particles = [];
  const particleCount = Math.min(Math.floor((width * height) / 24000), 45);
  const maxDistance = 110;
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
      this.vx = (Math.random() - 0.5) * 0.35;
      this.vy = (Math.random() - 0.5) * 0.35;
      this.radius = Math.random() * 1.4 + 0.8;
      this.color = Math.random() > 0.4 ? 'rgba(0, 240, 255, ' : 'rgba(168, 85, 247, ';
      this.baseAlpha = Math.random() * 0.4 + 0.2;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.hypot(dx, dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x -= (dx / dist) * force * 1.5;
          this.y -= (dy / dist) * force * 1.5;
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

    const docHeight = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const scrollY = window.scrollY;
    const scrollRatio = Math.min(1, Math.max(0, scrollY / docHeight));

    // A. Cosmic Galaxy Nebula Clouds (Deep Space Ambience)
    const galaxyAlpha = Math.max(0, 1 - scrollRatio * 3.2);
    if (galaxyAlpha > 0.04) {
      ctx.save();
      ctx.globalAlpha = galaxyAlpha;

      // Nebula 1: Deep Cyan / Teal
      const neb1 = ctx.createRadialGradient(width * 0.75, height * 0.28, 40, width * 0.75, height * 0.28, width * 0.48);
      neb1.addColorStop(0, 'rgba(0, 240, 255, 0.12)');
      neb1.addColorStop(0.5, 'rgba(14, 116, 233, 0.05)');
      neb1.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = neb1;
      ctx.fillRect(0, 0, width, height);

      // Nebula 2: Deep Violet / Cosmic Magenta
      const neb2 = ctx.createRadialGradient(width * 0.2, height * 0.4, 50, width * 0.2, height * 0.4, width * 0.45);
      neb2.addColorStop(0, 'rgba(168, 85, 247, 0.10)');
      neb2.addColorStop(0.6, 'rgba(236, 72, 153, 0.04)');
      neb2.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = neb2;
      ctx.fillRect(0, 0, width, height);

      // B. Spiral Milky Way Galaxy (Rotating logarithmic spiral arms)
      const gx = width * 0.72;
      const gy = height * 0.28 - scrollY * 0.3;

      // Radiant Galactic Nucleus
      const coreGrad = ctx.createRadialGradient(gx, gy, 0, gx, gy, 190);
      coreGrad.addColorStop(0, 'rgba(254, 240, 138, 0.28)');
      coreGrad.addColorStop(0.2, 'rgba(0, 240, 255, 0.15)');
      coreGrad.addColorStop(0.5, 'rgba(168, 85, 247, 0.07)');
      coreGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(gx, gy, 190, 0, Math.PI * 2);
      ctx.fill();

      // Rotating Stars in Spiral Arms
      const rot = Date.now() * 0.00012;
      galaxyStars.forEach((star) => {
        star.phase += star.twinkleSpeed;
        const a = star.alpha * (0.6 + 0.4 * Math.sin(star.phase));
        const curAngle = star.baseAngle + rot;
        const sx = gx + Math.cos(curAngle) * star.dist;
        const sy = gy + Math.sin(curAngle) * (star.dist * 0.62); // Perspective angle
        ctx.fillStyle = star.color;
        ctx.globalAlpha = a * galaxyAlpha;
        ctx.beginPath();
        ctx.arc(sx, sy, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.restore();
    }

    // C. Twinkling Celestial Background Stars with Parallax Shift
    const scrollDelta = scrollY * 0.18;
    stars.forEach((star) => {
      star.phase += star.twinkleSpeed;
      const alpha = star.baseAlpha * (0.55 + 0.45 * Math.sin(star.phase));

      let drawY = (star.baseY - scrollDelta * star.speedZ) % height;
      if (drawY < 0) drawY += height;

      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = star.color;
      ctx.beginPath();
      ctx.arc(star.x, drawY, star.radius, 0, Math.PI * 2);
      ctx.fill();

      if (star.radius > 2.0) {
        ctx.strokeStyle = star.color;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(star.x - star.radius * 2, drawY);
        ctx.lineTo(star.x + star.radius * 2, drawY);
        ctx.moveTo(star.x, drawY - star.radius * 2);
        ctx.lineTo(star.x, drawY + star.radius * 2);
        ctx.stroke();
      }
      ctx.restore();
    });

    // D. Shooting Stars Animation
    for (let i = shootingStars.length - 1; i >= 0; i--) {
      const s = shootingStars[i];
      s.life++;
      s.x += Math.cos(s.angle) * s.speed;
      s.y += Math.sin(s.angle) * s.speed;
      s.alpha = Math.max(0, 1 - (s.life / s.maxLife));

      const tailX = s.x - Math.cos(s.angle) * s.length;
      const tailY = s.y - Math.sin(s.angle) * s.length;

      ctx.save();
      const grad = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
      grad.addColorStop(0, 'rgba(255, 255, 255, 0)');
      grad.addColorStop(0.7, `rgba(0, 240, 255, ${0.4 * s.alpha})`);
      grad.addColorStop(1, `rgba(255, 255, 255, ${s.alpha})`);

      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.moveTo(tailX, tailY);
      ctx.lineTo(s.x, s.y);
      ctx.stroke();
      ctx.restore();

      if (s.life >= s.maxLife) {
        shootingStars.splice(i, 1);
      }
    }

    // E. PLANET 1: MARS (Rust-red planet drifting as user scrolls to Experience/Patent)
    if (scrollRatio >= 0.16 && scrollRatio <= 0.44) {
      const p = (scrollRatio - 0.16) / 0.28;
      const mAlpha = Math.sin(p * Math.PI);
      const mx = width * 0.14;
      const my = height * (0.86 - p * 0.72);
      const mRadius = Math.min(36, width * 0.04);

      ctx.save();
      ctx.globalAlpha = mAlpha * 0.88;

      // Glow
      const mGlow = ctx.createRadialGradient(mx, my, mRadius * 0.75, mx, my, mRadius * 1.4);
      mGlow.addColorStop(0, 'rgba(239, 68, 68, 0.25)');
      mGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = mGlow;
      ctx.beginPath();
      ctx.arc(mx, my, mRadius * 1.4, 0, Math.PI * 2);
      ctx.fill();

      // Sphere
      const mGrad = ctx.createRadialGradient(mx - mRadius * 0.3, my - mRadius * 0.3, mRadius * 0.1, mx, my, mRadius);
      mGrad.addColorStop(0, '#f87171');
      mGrad.addColorStop(0.45, '#dc2626');
      mGrad.addColorStop(0.85, '#991b1b');
      mGrad.addColorStop(1, '#450a0a');
      ctx.fillStyle = mGrad;
      ctx.beginPath();
      ctx.arc(mx, my, mRadius, 0, Math.PI * 2);
      ctx.fill();

      // Polar Ice Cap
      ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.beginPath();
      ctx.ellipse(mx, my - mRadius * 0.75, mRadius * 0.35, mRadius * 0.14, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }

    // F. PLANET 2: JUPITER (Gas Giant with Banded Atmospheric Stripes & Great Red Spot)
    if (scrollRatio >= 0.32 && scrollRatio <= 0.62) {
      const p = (scrollRatio - 0.32) / 0.30;
      const jAlpha = Math.sin(p * Math.PI);
      const jx = width * 0.87;
      const jy = height * (0.85 - p * 0.7);
      const jRadius = Math.min(68, width * 0.075);

      ctx.save();
      ctx.globalAlpha = jAlpha * 0.85;

      // Atmosphere rim glow
      const jGlow = ctx.createRadialGradient(jx, jy, jRadius * 0.8, jx, jy, jRadius * 1.4);
      jGlow.addColorStop(0, 'rgba(251, 191, 36, 0.22)');
      jGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = jGlow;
      ctx.beginPath();
      ctx.arc(jx, jy, jRadius * 1.4, 0, Math.PI * 2);
      ctx.fill();

      // Clipped sphere
      ctx.beginPath();
      ctx.arc(jx, jy, jRadius, 0, Math.PI * 2);
      ctx.clip();

      // Base shading
      const jBase = ctx.createLinearGradient(jx - jRadius, jy, jx + jRadius, jy);
      jBase.addColorStop(0, '#d97706');
      jBase.addColorStop(0.35, '#fef3c7');
      jBase.addColorStop(0.7, '#b45309');
      jBase.addColorStop(1, '#451a03');
      ctx.fillStyle = jBase;
      ctx.fillRect(jx - jRadius, jy - jRadius, jRadius * 2, jRadius * 2);

      // Stripes
      const bands = [-0.7, -0.45, -0.2, 0.05, 0.3, 0.55, 0.8];
      bands.forEach((bY, bi) => {
        ctx.fillStyle = bi % 2 === 0 ? 'rgba(180, 83, 9, 0.45)' : 'rgba(254, 243, 199, 0.45)';
        ctx.fillRect(jx - jRadius, jy + bY * jRadius, jRadius * 2, jRadius * 0.22);
      });

      // Great Red Spot
      ctx.fillStyle = '#dc2626';
      ctx.beginPath();
      ctx.ellipse(jx + jRadius * 0.25, jy + jRadius * 0.35, jRadius * 0.22, jRadius * 0.12, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }

    // G. PLANET 3: SATURN WITH TILTED GLOWING RINGS
    if (scrollRatio >= 0.46 && scrollRatio <= 0.74) {
      const p = (scrollRatio - 0.46) / 0.28;
      const sAlpha = Math.sin(p * Math.PI);
      const sx = width * 0.12;
      const sy = height * (0.85 - p * 0.7);
      const sRadius = Math.min(46, width * 0.05);

      ctx.save();
      ctx.globalAlpha = sAlpha * 0.88;

      // Saturn Back Ring Arc
      ctx.save();
      ctx.translate(sx, sy);
      ctx.rotate(-0.4);
      ctx.strokeStyle = 'rgba(252, 211, 77, 0.65)';
      ctx.lineWidth = 14;
      ctx.beginPath();
      ctx.ellipse(0, 0, sRadius * 2.1, sRadius * 0.65, 0, Math.PI, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Saturn Sphere
      const sGrad = ctx.createRadialGradient(sx - sRadius * 0.3, sy - sRadius * 0.3, sRadius * 0.1, sx, sy, sRadius);
      sGrad.addColorStop(0, '#fef08a');
      sGrad.addColorStop(0.5, '#eab308');
      sGrad.addColorStop(0.85, '#a16207');
      sGrad.addColorStop(1, '#422006');
      ctx.fillStyle = sGrad;
      ctx.beginPath();
      ctx.arc(sx, sy, sRadius, 0, Math.PI * 2);
      ctx.fill();

      // Saturn Front Ring Arc
      ctx.save();
      ctx.translate(sx, sy);
      ctx.rotate(-0.4);
      ctx.strokeStyle = 'rgba(253, 224, 71, 0.75)';
      ctx.lineWidth = 12;
      ctx.beginPath();
      ctx.ellipse(0, 0, sRadius * 2.1, sRadius * 0.65, 0, 0, Math.PI);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(254, 240, 138, 0.45)';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.ellipse(0, 0, sRadius * 1.5, sRadius * 0.45, 0, 0, Math.PI);
      ctx.stroke();
      ctx.restore();

      ctx.restore();
    }

    // H. ORBITAL SATELLITE (Solar Panels, Chassis & Blinking Beacon)
    if (scrollRatio >= 0.54 && scrollRatio <= 0.82) {
      const p = (scrollRatio - 0.54) / 0.28;
      const satAlpha = Math.sin(p * Math.PI);
      const satX = width * (0.2 + p * 0.58);
      const satY = height * (0.16 + p * 0.32);

      ctx.save();
      ctx.globalAlpha = satAlpha * 0.95;
      ctx.translate(satX, satY);
      ctx.rotate(0.35 + p * 0.15);

      // Chassis
      ctx.fillStyle = '#f59e0b';
      ctx.fillRect(-12, -8, 24, 16);
      ctx.strokeStyle = '#d97706';
      ctx.lineWidth = 1;
      ctx.strokeRect(-12, -8, 24, 16);

      // Solar Panel Wings
      ctx.fillStyle = '#1e3a8a';
      ctx.fillRect(-46, -11, 30, 22);
      ctx.strokeStyle = '#60a5fa';
      ctx.strokeRect(-46, -11, 30, 22);
      ctx.beginPath();
      ctx.moveTo(-31, -11); ctx.lineTo(-31, 11);
      ctx.moveTo(-46, 0); ctx.lineTo(-16, 0);
      ctx.stroke();

      ctx.fillRect(16, -11, 30, 22);
      ctx.strokeRect(16, -11, 30, 22);
      ctx.beginPath();
      ctx.moveTo(31, -11); ctx.lineTo(31, 11);
      ctx.moveTo(16, 0); ctx.lineTo(46, 0);
      ctx.stroke();

      // Antenna Dish
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, -14, 10, Math.PI * 0.2, Math.PI * 0.8);
      ctx.stroke();

      // Beacon Flash
      if (Math.sin(Date.now() * 0.009) > 0.05) {
        ctx.fillStyle = '#ef4444';
        ctx.shadowColor = '#ef4444';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(8, -8, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }

    // I. Foreground Constellation Net (Responsive to mouse)
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.hypot(dx, dy);

        if (dist < maxDistance) {
          const alpha = (1 - dist / maxDistance) * 0.12;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }

    particles.forEach((p) => {
      p.update();
      p.draw();
    });

    // J. TOUCHDOWN ON EARTH: Atmosphere Glow & Rising Planet Curvature (At Contact Section)
    if (scrollRatio > 0.65) {
      const landingProgress = Math.min(1, (scrollRatio - 0.65) / 0.32);
      const earthCenterX = width / 2;
      const earthCenterY = height + (320 - landingProgress * 230);
      const earthRadiusX = width * 0.88;
      const earthRadiusY = 320;

      ctx.save();

      // 1. Rayleigh Scattering Atmospheric Glow Dome
      const atmosGrad = ctx.createRadialGradient(
        earthCenterX, earthCenterY, earthRadiusY * 0.5,
        earthCenterX, earthCenterY, earthRadiusX * 1.15
      );
      atmosGrad.addColorStop(0, `rgba(4, 24, 75, ${0.90 * landingProgress})`);
      atmosGrad.addColorStop(0.35, `rgba(14, 116, 233, ${0.48 * landingProgress})`);
      atmosGrad.addColorStop(0.65, `rgba(0, 240, 255, ${0.28 * landingProgress})`);
      atmosGrad.addColorStop(0.9, `rgba(59, 130, 246, ${0.10 * landingProgress})`);
      atmosGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = atmosGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Earth Planet Silhouette (Curved dark surface)
      ctx.beginPath();
      ctx.ellipse(earthCenterX, earthCenterY, earthRadiusX, earthRadiusY, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#01030a';
      ctx.fill();

      // 3. Glowing Atmospheric Rim Curve
      ctx.beginPath();
      ctx.ellipse(earthCenterX, earthCenterY, earthRadiusX, earthRadiusY, 0, Math.PI * 1.05, Math.PI * 1.95);
      ctx.strokeStyle = `rgba(0, 240, 255, ${0.85 * landingProgress})`;
      ctx.lineWidth = 3.5;
      ctx.shadowColor = '#00f0ff';
      ctx.shadowBlur = 30 * landingProgress;
      ctx.stroke();

      ctx.lineWidth = 8;
      ctx.strokeStyle = `rgba(59, 130, 246, ${0.4 * landingProgress})`;
      ctx.shadowBlur = 50 * landingProgress;
      ctx.stroke();

      // 4. Golden City Lights on Earth's Night Side
      cityLights.forEach((city) => {
        city.phase += city.twinkleSpeed;
        const alpha = city.baseAlpha * (0.6 + 0.4 * Math.sin(city.phase)) * landingProgress;
        const cityX = earthCenterX + city.angleOffset * (earthRadiusX * 0.7);
        const cityY = earthCenterY - Math.sqrt(Math.max(0, 1 - Math.pow((cityX - earthCenterX) / earthRadiusX, 2))) * (earthRadiusY * 0.85) + city.yOffset;

        ctx.beginPath();
        ctx.arc(cityX, cityY, city.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(253, 224, 71, ${alpha})`;
        ctx.shadowColor = '#f59e0b';
        ctx.shadowBlur = 8 * alpha;
        ctx.fill();
      });

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
   4. 3D STACKED CARDS INFINITE CAROUSEL ENGINE (PROJECTS)
   ========================================================================== */
function initProjectsStackedCarousel() {
  const stage = document.getElementById('projects-stack-stage');
  const cards = Array.from(document.querySelectorAll('.project-stack-card'));
  const prevBtn = document.querySelector('.stack-nav-btn.prev');
  const nextBtn = document.querySelector('.stack-nav-btn.next');
  const dotsContainer = document.getElementById('stack-dots-row');
  const filterBtns = document.querySelectorAll('.filter-btn');

  if (!stage || cards.length === 0) return;

  let activeFilter = 'all';
  let filteredCards = [...cards];
  let currentIndex = 0;

  function updateFilteredCards() {
    filteredCards = cards.filter((card) => {
      const category = card.getAttribute('data-category') || '';
      return activeFilter === 'all' || category.includes(activeFilter);
    });

    if (currentIndex >= filteredCards.length) {
      currentIndex = 0;
    }

    renderDots();
    updateCardStack();
  }

  function renderDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    filteredCards.forEach((_, idx) => {
      const dot = document.createElement('span');
      dot.className = `stack-dot ${idx === currentIndex ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Go to project ${idx + 1}`);
      dot.addEventListener('click', () => {
        currentIndex = idx;
        updateCardStack();
      });
      dotsContainer.appendChild(dot);
    });
  }

  function updateCardStack() {
    const total = filteredCards.length;
    if (total === 0) return;

    // Reset and hide all cards
    cards.forEach((card) => {
      card.className = 'project-stack-card is-hidden';
      card.style.display = 'none';
      card.onclick = null;
    });

    filteredCards.forEach((card, idx) => {
      card.style.display = 'flex';

      // Circular distance modulo
      let diff = idx - currentIndex;
      if (diff > total / 2) diff -= total;
      if (diff < -total / 2) diff += total;

      card.className = 'project-stack-card';

      if (diff === 0) {
        card.classList.add('is-active');
        card.onclick = null;
      } else if (diff === 1) {
        card.classList.add('is-next');
        card.onclick = () => {
          currentIndex = (currentIndex + 1) % total;
          updateCardStack();
        };
      } else if (diff === -1) {
        card.classList.add('is-prev');
        card.onclick = () => {
          currentIndex = (currentIndex - 1 + total) % total;
          updateCardStack();
        };
      } else if (diff === 2) {
        card.classList.add('is-far-next');
      } else if (diff === -2) {
        card.classList.add('is-far-prev');
      } else {
        card.classList.add('is-hidden');
      }
    });

    // Update dots
    const dots = dotsContainer ? dotsContainer.querySelectorAll('.stack-dot') : [];
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentIndex);
    });
  }

  function nextCard() {
    if (filteredCards.length <= 1) return;
    currentIndex = (currentIndex + 1) % filteredCards.length;
    updateCardStack();
  }

  function prevCard() {
    if (filteredCards.length <= 1) return;
    currentIndex = (currentIndex - 1 + filteredCards.length) % filteredCards.length;
    updateCardStack();
  }

  if (nextBtn) nextBtn.addEventListener('click', nextCard);
  if (prevBtn) prevBtn.addEventListener('click', prevCard);

  // Filter Buttons
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.getAttribute('data-filter') || 'all';
      currentIndex = 0;
      updateFilteredCards();
    });
  });

  // Touch Swipe
  let touchStartX = 0;
  stage.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  stage.addEventListener('touchend', (e) => {
    const diff = e.changedTouches[0].screenX - touchStartX;
    if (Math.abs(diff) > 40) {
      if (diff < 0) nextCard();
      else prevCard();
    }
  }, { passive: true });

  // Mouse Drag on Stage
  let isDragging = false;
  let dragStartX = 0;
  stage.addEventListener('mousedown', (e) => {
    isDragging = true;
    dragStartX = e.clientX;
  });

  window.addEventListener('mouseup', (e) => {
    if (!isDragging) return;
    isDragging = false;
    const diff = e.clientX - dragStartX;
    if (Math.abs(diff) > 50) {
      if (diff < 0) nextCard();
      else prevCard();
    }
  });

  // Initialize
  updateFilteredCards();
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
   7. PHOTO GALLERY CAROUSELS (SOLO & SQUAD - INFINITE LOOP & SYNCED NAVIGATOR)
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
    const dotsContainer = block.querySelector('.carousel-dots-row');
    const cards = Array.from(block.querySelectorAll('.gallery-card'));

    if (!trackWrapper || cards.length === 0) return;

    let currentIndex = 0;
    const total = cards.length;

    function renderDots() {
      if (!dotsContainer) return;
      dotsContainer.innerHTML = '';
      cards.forEach((_, idx) => {
        const dot = document.createElement('span');
        dot.className = 'carousel-dot';
        dot.setAttribute('role', 'button');
        dot.setAttribute('tabindex', '0');
        dot.setAttribute('aria-label', `Show photo ${idx + 1} of ${total}`);
        dot.addEventListener('click', () => showCard(idx));
        dot.addEventListener('keydown', (event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            showCard(idx);
          }
        });
        dotsContainer.appendChild(dot);
      });
    }

    function updateCarousel() {
      cards.forEach((card, idx) => {
        let distance = idx - currentIndex;
        if (distance > total / 2) distance -= total;
        if (distance < -total / 2) distance += total;

        card.classList.remove('is-active', 'is-prev', 'is-next', 'is-hidden');
        if (distance === 0) {
          card.classList.add('is-active');
          card.setAttribute('aria-hidden', 'false');
          card.tabIndex = 0;
        } else if (distance === -1) {
          card.classList.add('is-prev');
          card.setAttribute('aria-hidden', 'false');
          card.tabIndex = 0;
        } else if (distance === 1) {
          card.classList.add('is-next');
          card.setAttribute('aria-hidden', 'false');
          card.tabIndex = 0;
        } else {
          card.classList.add('is-hidden');
          card.setAttribute('aria-hidden', 'true');
          card.tabIndex = -1;
        }
      });

      if (dotsContainer) {
        Array.from(dotsContainer.children).forEach((dot, idx) => {
          dot.classList.toggle('active', idx === currentIndex);
          dot.setAttribute('aria-current', idx === currentIndex ? 'true' : 'false');
        });
      }
    }

    function showCard(idx) {
      currentIndex = (idx + total) % total;
      updateCarousel();
    }

    // Infinite loop next / prev
    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showCard(currentIndex - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showCard(currentIndex + 1);
      });
    }

    cards.forEach((card) => {
      card.addEventListener('click', (event) => {
        if (card.classList.contains('is-prev')) {
          event.stopImmediatePropagation();
          showCard(currentIndex - 1);
        } else if (card.classList.contains('is-next')) {
          event.stopImmediatePropagation();
          showCard(currentIndex + 1);
        }
      });
    });

    let touchX = 0;
    trackWrapper.addEventListener('touchstart', (event) => {
      touchX = event.changedTouches[0].screenX;
    }, { passive: true });

    trackWrapper.addEventListener('touchend', (event) => {
      const difference = event.changedTouches[0].screenX - touchX;
      if (Math.abs(difference) > 40) {
        showCard(currentIndex + (difference < 0 ? 1 : -1));
      }
    }, { passive: true });

    cards.forEach((card) => {
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', card.querySelector('.gallery-img')?.alt || 'Gallery photo');
      card.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft') {
          event.preventDefault();
          showCard(currentIndex - 1);
        } else if (event.key === 'ArrowRight') {
          event.preventDefault();
          showCard(currentIndex + 1);
        } else if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          if (card.classList.contains('is-prev')) showCard(currentIndex - 1);
          else if (card.classList.contains('is-next')) showCard(currentIndex + 1);
          else card.click();
        }
      });
    });

    renderDots();
    updateCarousel();
  });
}

/* ==========================================================================
   8. PHOTO GALLERY LIGHTBOX MODAL
   ========================================================================== */
function initGalleryLightbox() {
  const modal = document.getElementById('gallery-lightbox');
  if (!modal) return;

  const lightboxImg = modal.querySelector('.lightbox-img');
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
    lightboxImg.alt = item.alt;
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
      if (!card.classList.contains('is-active')) return;
      const cardsInBlock = Array.from(parentBlock.querySelectorAll('.gallery-card'));
      const items = cardsInBlock.map((c) => ({
        src: c.querySelector('.gallery-img')?.getAttribute('src') || '',
        alt: c.querySelector('.gallery-img')?.alt || 'Gallery photo'
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

function initHeroAvatarReactor() {
  const avatar = document.querySelector('.hero-avatar-ring');
  if (!avatar) return;

  let resetTimer;
  avatar.addEventListener('click', () => {
    window.clearTimeout(resetTimer);
    avatar.classList.add('is-reactor');
    avatar.setAttribute('aria-pressed', 'true');
    resetTimer = window.setTimeout(() => {
      avatar.classList.remove('is-reactor');
      avatar.setAttribute('aria-pressed', 'false');
    }, 2200);
  });
}
