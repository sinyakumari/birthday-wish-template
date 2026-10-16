document.addEventListener('DOMContentLoaded', () => {
  /* ==========================================================================
     PAGE 1 & COMMON ELEMENTS
     ========================================================================== */
  const page1 = document.getElementById('page1');
  const dotButton = document.getElementById('dot-button');
  const bgMusic = document.getElementById('bg-music');
  const page2 = document.getElementById('page-2');
  const page3 = document.getElementById('page-3');
  const page4 = document.getElementById('page-4');
  const page5 = document.getElementById('page-5');
  const nextPage4Btn = document.getElementById('next-page-4');
  const prevPage5Btn = document.getElementById('prev-page-5');
  const musicToggle = document.getElementById('music-toggle');
  const musicIcon = musicToggle ? musicToggle.querySelector('.music-icon') : null;

  // Check if reduced motion is preferred by user
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ==========================================================================
     PAGE 1: FLOATING HEARTS SYSTEM
     ========================================================================== */
  const heartsLayer = document.getElementById('hearts-layer');
  let heartsInterval = null;
  const MAX_HEARTS = 60;

  function stopHearts() {
    if (heartsInterval) {
      clearInterval(heartsInterval);
      heartsInterval = null;
    }
    if (heartsLayer) {
      heartsLayer.innerHTML = '';
    }
  }

  function spawnSingleHeart() {
    if (!heartsLayer || !page1.classList.contains('active')) return;
    if (heartsLayer.childElementCount >= MAX_HEARTS) return;

    const heart = document.createElement('span');
    heart.className = 'floating-heart';
    heart.textContent = '❤';

    const leftPercent = Math.random() * 100;
    const size = Math.floor(Math.random() * (40 - 14 + 1)) + 14;
    const duration = (Math.random() * (7 - 3.5) + 3.5).toFixed(2);
    const sway = (Math.random() * 80 - 40).toFixed(0);
    const color = Math.random() < 0.5 ? 'var(--accent)' : 'var(--gold)';

    heart.style.left = `${leftPercent}%`;
    heart.style.fontSize = `${size}px`;
    heart.style.color = color;
    heart.style.animationDuration = `${duration}s`;
    heart.style.setProperty('--sway-x', `${sway}px`);

    heart.addEventListener('animationend', () => {
      heart.remove();
    });

    heartsLayer.appendChild(heart);
  }

  function spawnHearts() {
    if (!heartsLayer || !page1.classList.contains('active')) return;
    const count = Math.random() < 0.35 ? 2 : 1;
    for (let i = 0; i < count; i++) {
      spawnSingleHeart();
    }
  }

  if (!prefersReducedMotion && heartsLayer) {
    heartsInterval = setInterval(spawnHearts, 180);
  }

  /* ==========================================================================
     PAGE 2: CELEBRATION CONFIGURATION
     ========================================================================== */
  /**
   * EDIT HERE: WISH TEXT
   * Modify the strings below to customize the birthday greeting.
   * Note: The ghost text in index.html will automatically match these strings
   * so the card dimensions stay perfectly reserved without jumping.
   */
  const WISH_HEADING = 'Happy Birthday, BB! 🎉';
  const WISH_TEXT = 'Happy Birthday BB 🥳🎂 May you get everything you ever desire for. God bless you with lots of success and happiness ✨🎈';
  const WISH_SIGN = 'Yours truly, Pree';

  /**
   * EDIT HERE: STICKER EMOJIS
   * Modify the emojis in this array to change the stickers displayed on Page 2.
   */
  const STICKER_EMOJIS = ['🎂', '🎈', '🎁', '🎉', '🥳', '🧁', '✨', '🎊'];

  // Page 2 DOM references
  const heartsLayerPage2 = document.getElementById('hearts-layer-page2');
  const confettiLayerPage2 = document.getElementById('confetti-layer');
  const stickers = Array.from(document.querySelectorAll('.sticker'));

  const wishHeadingElem = document.getElementById('wish-heading');
  const wishBodyElem = document.getElementById('wish-body');
  const wishSignElem = document.getElementById('wish-sign');

  const wishHeadingText = document.getElementById('wish-heading-text');
  const wishBodyText = document.getElementById('wish-body-text');
  const wishSignText = document.getElementById('wish-sign-text');

  const headingGhost = document.getElementById('heading-ghost');
  const bodyGhost = document.getElementById('body-ghost');
  const signGhost = document.getElementById('sign-ghost');

  const nextPage2Btn = document.getElementById('next-page-2');

  // Synchronize ghost text with configured strings so height reservation is always exact
  if (headingGhost) headingGhost.textContent = WISH_HEADING;
  if (bodyGhost) bodyGhost.textContent = WISH_TEXT;
  if (signGhost) signGhost.textContent = WISH_SIGN;

  // Synchronize sticker emojis from configuration
  stickers.forEach((sticker, idx) => {
    if (STICKER_EMOJIS[idx]) {
      sticker.textContent = STICKER_EMOJIS[idx];
    }
  });

  // Dynamic handwriting cursor element
  const cursor = document.createElement('span');
  cursor.className = 'type-cursor';
  cursor.setAttribute('aria-hidden', 'true');
  cursor.textContent = '|';

  // Writing state variables
  let isTyping = false;
  let skipRequested = false;
  let activeSleepTimeout = null;
  let stickerPopTimeouts = [];
  let heartsIntervalPage2 = null;

  /* ==========================================================================
     PAGE 2: FLOATING HEARTS SYSTEM (Capped at 60, --accent and --gold only)
     ========================================================================== */
  function stopPage2Hearts() {
    if (heartsIntervalPage2) {
      clearInterval(heartsIntervalPage2);
      heartsIntervalPage2 = null;
    }
    if (heartsLayerPage2) {
      heartsLayerPage2.innerHTML = '';
    }
  }

  function spawnSingleHeartPage2() {
    if (!heartsLayerPage2 || !page2.classList.contains('active')) return;
    if (heartsLayerPage2.childElementCount >= MAX_HEARTS) return;

    const heart = document.createElement('span');
    heart.className = 'floating-heart';
    heart.textContent = '❤';

    const leftPercent = Math.random() * 100;
    const size = Math.floor(Math.random() * (40 - 14 + 1)) + 14;
    const duration = (Math.random() * (7 - 3.5) + 3.5).toFixed(2);
    const sway = (Math.random() * 80 - 40).toFixed(0);
    const color = Math.random() < 0.5 ? 'var(--accent)' : 'var(--gold)';

    heart.style.left = `${leftPercent}%`;
    heart.style.fontSize = `${size}px`;
    heart.style.color = color;
    heart.style.animationDuration = `${duration}s`;
    heart.style.setProperty('--sway-x', `${sway}px`);

    heart.addEventListener('animationend', () => {
      heart.remove();
    });

    heartsLayerPage2.appendChild(heart);
  }

  function spawnHeartsPage2() {
    if (!heartsLayerPage2 || !page2.classList.contains('active')) return;
    const count = Math.random() < 0.35 ? 2 : 1;
    for (let i = 0; i < count; i++) {
      spawnSingleHeartPage2();
    }
  }

  function startPage2Hearts() {
    if (!prefersReducedMotion && heartsLayerPage2 && !heartsIntervalPage2) {
      heartsIntervalPage2 = setInterval(spawnHeartsPage2, 180);
    }
  }

  /* ==========================================================================
     SLEEP / PAUSE HELPER
     ========================================================================== */
  function sleep(ms) {
    return new Promise((resolve) => {
      if (skipRequested) {
        resolve();
        return;
      }
      activeSleepTimeout = setTimeout(() => {
        activeSleepTimeout = null;
        resolve();
      }, ms);
    });
  }

  /* ==========================================================================
     PAGE 2: HANDWRITING LIVE TYPING EFFECT
     ========================================================================== */
  async function typeWriterString(targetSpan, textString) {
    const chars = Array.from(textString);
    for (let i = 0; i < chars.length; i++) {
      if (skipRequested) break;

      targetSpan.textContent += chars[i];

      let delay = 55;
      if (chars[i] === ',') {
        delay += 250;
      } else if (chars[i] === '.') {
        delay += 500;
      }

      await sleep(delay);
    }
  }

  async function runHandwritingEffect() {
    isTyping = true;
    skipRequested = false;

    // Reset visible texts
    wishHeadingText.textContent = '';
    wishBodyText.textContent = '';
    wishSignText.textContent = '';

    // 1. Write Heading
    wishHeadingElem.appendChild(cursor);
    await typeWriterString(wishHeadingText, WISH_HEADING);
    if (!skipRequested) await sleep(250);

    // 2. Write Wish Paragraph
    wishBodyElem.appendChild(cursor);
    await typeWriterString(wishBodyText, WISH_TEXT);
    if (!skipRequested) await sleep(300);

    // 3. Write Sign-off
    wishSignElem.appendChild(cursor);
    await typeWriterString(wishSignText, WISH_SIGN);

    // Finished writing
    finishWriting();
  }

  function finishWriting() {
    if (cursor && cursor.parentNode) {
      cursor.remove();
    }

    wishHeadingText.textContent = WISH_HEADING;
    wishBodyText.textContent = WISH_TEXT;
    wishSignText.textContent = WISH_SIGN;

    isTyping = false;

    if (!prefersReducedMotion) {
      triggerTopConfetti(confettiLayerPage2);
      animateStickersIn();
    } else {
      stickers.forEach((sticker) => {
        sticker.classList.remove('popping', 'bobbing');
        sticker.style.opacity = '1';
        sticker.style.transform = 'scale(1) rotate(var(--sticker-rot, 0deg))';
      });
    }

    // Reveal and pulse next-page arrow fixed on the right of Page 2
    if (nextPage2Btn) {
      nextPage2Btn.classList.remove('hidden');
      if (!prefersReducedMotion) {
        nextPage2Btn.classList.add('pulse');
      }
    }
  }

  /* ==========================================================================
     PAGE 2: STICKERS ANIMATIONS & INTERACTIVITY
     ========================================================================== */
  function clearStickerTimeouts() {
    stickerPopTimeouts.forEach((t) => clearTimeout(t));
    stickerPopTimeouts = [];
  }

  function animateStickersIn() {
    clearStickerTimeouts();

    stickers.forEach((sticker, index) => {
      const timeoutId = setTimeout(() => {
        sticker.classList.remove('bobbing', 'bouncing');
        sticker.classList.add('popping');

        const bobTimeoutId = setTimeout(() => {
          sticker.classList.remove('popping');
          sticker.classList.add('bobbing');

          const bobDuration = (Math.random() * (6 - 3) + 3).toFixed(2);
          const bobDelay = (Math.random() * 2).toFixed(2);
          sticker.style.setProperty('--bob-speed', `${bobDuration}s`);
          sticker.style.setProperty('--bob-delay', `${bobDelay}s`);
        }, 450);

        stickerPopTimeouts.push(bobTimeoutId);
      }, index * 150);

      stickerPopTimeouts.push(timeoutId);
    });
  }

  stickers.forEach((sticker) => {
    sticker.addEventListener('click', () => {
      sticker.classList.remove('bouncing');
      void sticker.offsetWidth;
      sticker.classList.add('bouncing');
      spawnStickerConfetti(sticker, confettiLayerPage2);
    });

    sticker.addEventListener('animationend', (e) => {
      if (e.animationName === 'stickerBounceOnce') {
        sticker.classList.remove('bouncing');
      }
    });
  });

  /* ==========================================================================
     COMMON CONFETTI SYSTEM
     ========================================================================== */
  const CONFETTI_COLORS = ['var(--accent)', 'var(--gold)', 'var(--text)'];

  function triggerTopConfetti(targetContainer) {
    if (prefersReducedMotion || !targetContainer) return;
    const count = 40;

    for (let i = 0; i < count; i++) {
      const piece = document.createElement('span');
      piece.className = 'confetti-piece';

      const color = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
      const leftPercent = Math.random() * 94 + 3;
      const duration = (Math.random() * 0.8 + 2.2).toFixed(2);
      const delay = (Math.random() * 0.35).toFixed(2);
      const drift = (Math.random() * 120 - 60).toFixed(0);
      const rot = (Math.random() * 720 - 360).toFixed(0);
      const width = Math.floor(Math.random() * 5) + 8;
      const height = Math.floor(Math.random() * 4) + 6;
      const isCircle = Math.random() < 0.35;

      piece.style.width = `${width}px`;
      piece.style.height = `${height}px`;
      piece.style.backgroundColor = color;
      piece.style.borderRadius = isCircle ? '50%' : '2px';
      piece.style.left = `${leftPercent}%`;
      piece.style.top = '-20px';
      piece.style.setProperty('--drift-x', `${drift}px`);
      piece.style.setProperty('--rot-end', `${rot}deg`);
      piece.style.animation = `confettiFall ${duration}s linear ${delay}s forwards`;

      piece.addEventListener('animationend', () => {
        piece.remove();
      });

      targetContainer.appendChild(piece);
    }

    setTimeout(() => {
      if (targetContainer) {
        const lingering = targetContainer.querySelectorAll('.confetti-piece');
        lingering.forEach((p) => {
          if (p.style.animationName === 'confettiFall' || p.style.top === '-20px') {
            p.remove();
          }
        });
      }
    }, 3200);
  }

  function spawnStickerConfetti(sticker, targetContainer) {
    if (prefersReducedMotion || !targetContainer) return;
    const count = Math.floor(Math.random() * 5) + 8;

    const rect = sticker.getBoundingClientRect();
    const layerRect = targetContainer.getBoundingClientRect();
    const originX = rect.left + rect.width / 2 - layerRect.left;
    const originY = rect.top + rect.height / 2 - layerRect.top;

    for (let i = 0; i < count; i++) {
      const piece = document.createElement('span');
      piece.className = 'confetti-piece';

      const color = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
      const angle = (i / count) * 360 + (Math.random() * 26 - 13);
      const distance = Math.random() * 45 + 35;
      const rad = (angle * Math.PI) / 180;
      const burstX = (Math.cos(rad) * distance).toFixed(0);
      const burstY = (Math.sin(rad) * distance).toFixed(0);
      const duration = (Math.random() * 0.2 + 0.55).toFixed(2);
      const rot = (Math.random() * 360 - 180).toFixed(0);
      const size = Math.floor(Math.random() * 3) + 6;

      piece.style.width = `${size}px`;
      piece.style.height = `${size}px`;
      piece.style.backgroundColor = color;
      piece.style.borderRadius = Math.random() < 0.5 ? '50%' : '2px';
      piece.style.left = `${originX}px`;
      piece.style.top = `${originY}px`;
      piece.style.setProperty('--burst-x', `${burstX}px`);
      piece.style.setProperty('--burst-y', `${burstY}px`);
      piece.style.setProperty('--burst-rot', `${rot}deg`);
      piece.style.animation = `stickerBurst ${duration}s cubic-bezier(0.25, 1, 0.5, 1) forwards`;

      piece.addEventListener('animationend', () => {
        piece.remove();
      });

      targetContainer.appendChild(piece);
    }
  }

  /* ==========================================================================
     PAGE 3: BOUQUET OF HEART REASONS CONFIGURATION & LOGIC
     ========================================================================== */
  /**
   * EDIT HERE: REASONS LIST (supports up to 8 reasons)
   */
  const REASONS = [
    "The way you always show care for your loved ones",
    "You always finds a way to make me laugh.",
    "Your kindness is the most favourite thing of mine.",
    "Being there for me, even when life gets tough with you as well.",
    "You make the worst days even more lighter.",
    "The way you used to sing for me every year on my birthday.",
    "Every simple moment with you feel like so much of peace.",
    "The way you listens, the way you always try not to show your anger to me."
  ];

  /**
   * EDIT HERE: HEART POSITIONS & BASE ROTATIONS
   */
  const HEART_POSITIONS = [
    { x: 95, y: 150, rot: -18 },
    { x: 200, y: 85, rot: -4 },
    { x: 305, y: 135, rot: 16 },
    { x: 150, y: 235, rot: -8 },
    { x: 255, y: 230, rot: 8 },
    { x: 60, y: 255, rot: -22 },
    { x: 340, y: 250, rot: 20 },
    { x: 200, y: 165, rot: 0 },
  ];

  // Page 3 DOM references
  const prevPage3Btn = document.getElementById('prev-page-3');
  const nextPage3Btn = document.getElementById('next-page-3');
  const heartsLayerPage3 = document.getElementById('hearts-layer-page3');
  const confettiLayerPage3 = document.getElementById('confetti-layer-page3');
  const bouquetTitle = document.getElementById('bouquet-title');
  const reasonOverlay = document.getElementById('reason-overlay');
  const reasonCard = document.getElementById('reason-card');
  const reasonCardTitle = document.getElementById('reason-card-title');
  const reasonCardText = document.getElementById('reason-card-text');
  const reasonCardClose = document.getElementById('reason-card-close');

  const openedReasons = new Set();
  let heartsIntervalPage3 = null;
  let activeHeartElement = null;
  let allOpenedCelebrated = false;

  /* ==========================================================================
     PAGE 3: FLOATING HEARTS SYSTEM
     ========================================================================== */
  function stopPage3Hearts() {
    if (heartsIntervalPage3) {
      clearInterval(heartsIntervalPage3);
      heartsIntervalPage3 = null;
    }
    if (heartsLayerPage3) {
      heartsLayerPage3.innerHTML = '';
    }
  }

  function spawnSingleHeartPage3() {
    if (!heartsLayerPage3 || !page3.classList.contains('active')) return;
    if (heartsLayerPage3.childElementCount >= MAX_HEARTS) return;

    const heart = document.createElement('span');
    heart.className = 'floating-heart';
    heart.textContent = '❤';

    const leftPercent = Math.random() * 100;
    const size = Math.floor(Math.random() * (40 - 14 + 1)) + 14;
    const duration = (Math.random() * (7 - 3.5) + 3.5).toFixed(2);
    const sway = (Math.random() * 80 - 40).toFixed(0);
    const color = Math.random() < 0.5 ? 'var(--accent)' : 'var(--gold)';

    heart.style.left = `${leftPercent}%`;
    heart.style.fontSize = `${size}px`;
    heart.style.color = color;
    heart.style.animationDuration = `${duration}s`;
    heart.style.setProperty('--sway-x', `${sway}px`);

    heart.addEventListener('animationend', () => {
      heart.remove();
    });

    heartsLayerPage3.appendChild(heart);
  }

  function spawnHeartsPage3() {
    if (!heartsLayerPage3 || !page3.classList.contains('active')) return;
    const count = Math.random() < 0.35 ? 2 : 1;
    for (let i = 0; i < count; i++) {
      spawnSingleHeartPage3();
    }
  }

  function startPage3Hearts() {
    if (!prefersReducedMotion && heartsLayerPage3 && !heartsIntervalPage3) {
      heartsIntervalPage3 = setInterval(spawnHeartsPage3, 180);
    }
  }

  /* ==========================================================================
     BOUQUET INITIALIZATION (Dynamic Stems & Heart Groups)
     ========================================================================== */
  function initBouquet() {
    const totalReasons = Math.min(REASONS.length, HEART_POSITIONS.length);
    const stemsContainer = document.getElementById('bouquet-stems');

    // 1. Generate curved stems dynamically
    if (stemsContainer) {
      while (stemsContainer.firstChild) {
        stemsContainer.removeChild(stemsContainer.firstChild);
      }

      for (let i = 0; i < totalReasons; i++) {
        const { x, y, rot } = HEART_POSITIONS[i];

        const rad = (rot * Math.PI) / 180;
        const tipX = x - 28 * Math.sin(rad);
        const tipY = y + 28 * Math.cos(rad);

        const coneBaseX = 175 + ((x - 60) / (340 - 60)) * 50;
        const coneBaseY = 305;

        const ctrlX = coneBaseX + (tipX - coneBaseX) * 0.25;
        const ctrlY = coneBaseY - (coneBaseY - tipY) * 0.55;

        const stem = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        stem.setAttribute('d', `M ${coneBaseX.toFixed(1)} ${coneBaseY} Q ${ctrlX.toFixed(1)} ${ctrlY.toFixed(1)} ${tipX.toFixed(1)} ${tipY.toFixed(1)}`);
        stem.setAttribute('stroke', 'var(--stem-green)');
        stem.setAttribute('stroke-width', '6');
        stem.setAttribute('stroke-linecap', 'round');
        stem.setAttribute('fill', 'none');
        stemsContainer.appendChild(stem);
      }
    }

    // 2. Configure Heart Groups
    for (let i = 1; i <= 8; i++) {
      const posGroup = document.getElementById(`heart-pos-${i}`);
      const animGroup = document.getElementById(`heart-anim-${i}`);

      if (i <= totalReasons) {
        if (posGroup) posGroup.style.display = '';
        if (animGroup) {
          animGroup.setAttribute('aria-label', `Open reason ${i}`);
          animGroup.setAttribute('data-index', i - 1);

          if (!prefersReducedMotion) {
            const swayDur = (Math.random() * 2 + 3.2).toFixed(2);
            const swayDelay = (Math.random() * 2).toFixed(2);
            animGroup.style.setProperty('--sway-dur', `${swayDur}s`);
            animGroup.style.setProperty('--sway-delay', `${swayDelay}s`);
            animGroup.classList.add('swaying');
          }
        }
      } else {
        if (posGroup) posGroup.style.display = 'none';
      }
    }
  }

  /* ==========================================================================
     HEART BURST PARTICLES (Mini hearts & sparkles)
     ========================================================================== */
  function spawnHeartBurst(heartElement) {
    if (prefersReducedMotion) return;
    const count = Math.floor(Math.random() * 5) + 8;
    const rect = heartElement.getBoundingClientRect();
    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height / 2;
    const symbols = ['❤', '✦', '✨'];

    for (let i = 0; i < count; i++) {
      const particle = document.createElement('span');
      particle.className = 'heart-burst-particle';
      particle.textContent = symbols[Math.floor(Math.random() * symbols.length)];

      const color = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
      const angle = (i / count) * 360 + (Math.random() * 30 - 15);
      const distance = Math.random() * 55 + 40;
      const rad = (angle * Math.PI) / 180;
      const burstX = (Math.cos(rad) * distance).toFixed(0);
      const burstY = (Math.sin(rad) * distance).toFixed(0);
      const duration = (Math.random() * 0.25 + 0.55).toFixed(2);
      const rot = (Math.random() * 360 - 180).toFixed(0);

      particle.style.color = color;
      particle.style.left = `${originX}px`;
      particle.style.top = `${originY}px`;
      particle.style.setProperty('--burst-x', `${burstX}px`);
      particle.style.setProperty('--burst-y', `${burstY}px`);
      particle.style.setProperty('--burst-rot', `${rot}deg`);
      particle.style.setProperty('--burst-dur', `${duration}s`);

      particle.addEventListener('animationend', () => {
        particle.remove();
      });

      document.body.appendChild(particle);
    }
  }

  /* ==========================================================================
     OPEN & CLOSE REASON CARD MODAL
     ========================================================================== */
  function openReason(index, heartAnimEl) {
    if (typeof index !== 'number' || index < 0 || index >= REASONS.length) {
      console.warn('Invalid reason index:', index);
      return;
    }
    activeHeartElement = heartAnimEl;

    if (!prefersReducedMotion && heartAnimEl) {
      heartAnimEl.classList.remove('heart-popping');
      void heartAnimEl.getBoundingClientRect();
      heartAnimEl.classList.add('heart-popping');
      spawnHeartBurst(heartAnimEl);
    }

    let reasonText = REASONS[index];
    if (!reasonText || !reasonText.trim()) {
      console.warn('Missing reason for heart ' + (index + 1));
      reasonText = 'Add your reason here';
    }

    reasonCardTitle.textContent = `Reason ${index + 1}`;
    reasonCardText.textContent = reasonText;

    reasonOverlay.classList.remove('hidden');
    void reasonOverlay.offsetHeight;
    reasonOverlay.classList.add('active');
    reasonOverlay.removeAttribute('aria-hidden');

    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      reasonCardClose.focus();
    }, 100);

    openedReasons.add(index);
    if (heartAnimEl) {
      heartAnimEl.classList.add('opened');
    }
  }

  function closeReason() {
    if (!reasonOverlay.classList.contains('active')) return;

    reasonOverlay.classList.remove('active');
    reasonOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    setTimeout(() => {
      reasonOverlay.classList.add('hidden');
    }, 300);

    if (activeHeartElement) {
      activeHeartElement.focus();
    }

    const totalReasons = Math.min(REASONS.length, HEART_POSITIONS.length);
    if (openedReasons.size === totalReasons && !allOpenedCelebrated) {
      allOpenedCelebrated = true;
      triggerTopConfetti(confettiLayerPage3);

      if (bouquetTitle) {
        bouquetTitle.style.opacity = '0';
        setTimeout(() => {
          bouquetTitle.textContent = "That's just the beginning, BB";
          bouquetTitle.classList.add('title-glow');
          bouquetTitle.style.opacity = '1';
        }, 400);
      }
    }
  }

  // Bind click & keyboard handlers to each heart animation element
  for (let i = 1; i <= 8; i++) {
    const animEl = document.getElementById(`heart-anim-${i}`);
    if (animEl) {
      const idx = i - 1;
      animEl.addEventListener('click', () => {
        openReason(idx, animEl);
      });

      animEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openReason(idx, animEl);
        }
      });
    }
  }

  // Close modal event bindings
  reasonCardClose.addEventListener('click', closeReason);

  reasonOverlay.addEventListener('click', (e) => {
    if (e.target === reasonOverlay) {
      closeReason();
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && reasonOverlay.classList.contains('active')) {
      closeReason();
    }
  });

  /* ==========================================================================
     PAGE 4: PHOTO WALL CONFIGURATION
     ========================================================================== */
  /**
   * EDIT HERE: PHOTOS LIST
   * src: relative path from index.html. File names must match exactly.
   */
  const PHOTOS = [
    { src: "images/photos/photo1.jpeg",    caption: "" },
    { src: "images/photos/photo 2.jpeg",   caption: "" },
    { src: "images/photos/photo 3.jpeg",   caption: "" },
    { src: "images/photos/photo 4.jpeg",   caption: "" },
    { src: "images/photos/photo 5.jpeg",   caption: "" },
    { src: "images/photos/photo 6.jpeg",   caption: "" },
    { src: "images/photos/photo 7.jpeg",   caption: "" },
    { src: "images/photos/photo 8.jpeg",   caption: "" },
    { src: "images/photos/photo 9.jpeg",   caption: "" },
    { src: "images/photos/photo 10.jpeg",  caption: "" },
    { src: "images/photos/photo 11.jpeg",  caption: "" },
    { src: "images/photos/photo 12.jpeg",  caption: "" },
    { src: "images/photos/photo 13.jpeg",  caption: "" },
    { src: "images/photos/photo 14.jpeg",  caption: "" },
    { src: "images/photos/photo 15.jpeg",  caption: "" },
    { src: "images/photos/photo 16.jpeg",  caption: "" },
    { src: "images/photos/photo 17.jpeg",  caption: "" },
    { src: "images/photos/photo 18.jpeg",  caption: "" },
    { src: "images/photos/photo 19.jpeg",  caption: "" },
    { src: "images/photos/photo 20.jpeg",  caption: "" },
    { src: "images/photos/photo 21.jpeg",  caption: "" },
    { src: "images/photos/photo 22.jpeg",  caption: "" },
    { src: "images/photos/photo 23.jpeg",  caption: "" },
    { src: "images/photos/photo 24.jpeg",  caption: "" },
    { src: "images/photos/photo 25.jpeg",  caption: "" },
  ];

  // Page 4 DOM references
  const prevPage4Btn = document.getElementById('prev-page-4');
  const heartsLayerPage4 = document.getElementById('hearts-layer-page4');
  const wallStage = document.getElementById('wall-stage');
  const wallHeader = document.getElementById('wall-header');

  // Photo viewer DOM references
  const photoViewerOverlay = document.getElementById('photo-viewer-overlay');
  const photoViewerClose = document.getElementById('photo-viewer-close');
  const photoViewerPrev = document.getElementById('photo-viewer-prev');
  const photoViewerNext = document.getElementById('photo-viewer-next');
  const viewerImg = document.getElementById('viewer-img');
  const viewerCaption = document.getElementById('viewer-caption');
  const viewerCounter = document.getElementById('viewer-counter');

  let heartsIntervalPage4 = null;
  let currentPhotoIndex = 0;
  let activePhotoButton = null;
  let dropInTimeouts = [];

  // Touch swipe tracking
  let touchStartX = 0;
  let touchStartY = 0;

  /* ==========================================================================
     PAGE 4: FLOATING HEARTS SYSTEM
     ========================================================================== */
  function stopPage4Hearts() {
    if (heartsIntervalPage4) {
      clearInterval(heartsIntervalPage4);
      heartsIntervalPage4 = null;
    }
    if (heartsLayerPage4) {
      heartsLayerPage4.innerHTML = '';
    }
  }

  function spawnSingleHeartPage4() {
    if (!heartsLayerPage4 || !page4.classList.contains('active')) return;
    if (heartsLayerPage4.childElementCount >= MAX_HEARTS) return;

    const heart = document.createElement('span');
    heart.className = 'floating-heart';
    heart.textContent = '❤';

    const leftPercent = Math.random() * 100;
    const size = Math.floor(Math.random() * (40 - 14 + 1)) + 14;
    const duration = (Math.random() * (7 - 3.5) + 3.5).toFixed(2);
    const sway = (Math.random() * 80 - 40).toFixed(0);
    const color = Math.random() < 0.5 ? 'var(--accent)' : 'var(--gold)';

    heart.style.left = `${leftPercent}%`;
    heart.style.fontSize = `${size}px`;
    heart.style.color = color;
    heart.style.animationDuration = `${duration}s`;
    heart.style.setProperty('--sway-x', `${sway}px`);

    heart.addEventListener('animationend', () => {
      heart.remove();
    });

    heartsLayerPage4.appendChild(heart);
  }

  function spawnHeartsPage4() {
    if (!heartsLayerPage4 || !page4.classList.contains('active')) return;
    const count = Math.random() < 0.35 ? 2 : 1;
    for (let i = 0; i < count; i++) {
      spawnSingleHeartPage4();
    }
  }

  function startPage4Hearts() {
    if (!prefersReducedMotion && heartsLayerPage4 && !heartsIntervalPage4) {
      heartsIntervalPage4 = setInterval(spawnHeartsPage4, 180);
    }
  }

  /* ==========================================================================
     PHOTO WALL: GEOMETRY HELPERS
     ========================================================================== */
  function bezierPoint(p0, p1, p2, t) {
    const mt = 1 - t;
    return {
      x: mt * mt * p0.x + 2 * mt * t * p1.x + t * t * p2.x,
      y: mt * mt * p0.y + 2 * mt * t * p1.y + t * t * p2.y,
    };
  }

  function bezierTangentAngle(p0, p1, p2, t) {
    const mt = 1 - t;
    const dx = 2 * mt * (p1.x - p0.x) + 2 * t * (p2.x - p1.x);
    const dy = 2 * mt * (p1.y - p0.y) + 2 * t * (p2.y - p1.y);
    return Math.atan2(dy, dx) * (180 / Math.PI);
  }

  /**
   * Build/rebuild the entire photo wall in wallStage.
   * Called on page-4 show and on resize/orientation-change.
   */
  function buildPhotoWall() {
    if (!wallStage || !wallHeader) return;

    dropInTimeouts.forEach(clearTimeout);
    dropInTimeouts = [];
    wallStage.innerHTML = '';

    const stageW = wallStage.offsetWidth;
    const stageH = wallStage.offsetHeight;
    const isMobile = window.innerWidth <= 700;
    const totalPhotos = PHOTOS.length;
    const svgNS = 'http://www.w3.org/2000/svg';

    let allInnerEls = [];
    let globalPhotoIdx = 0;

    if (isMobile) {
      /* MOBILE PORTRAIT LAYOUT (width <= 700px): 4 strings */
      const polaroidW = Math.max(44, Math.min(0.15 * window.innerWidth, 110));
      const numStrings = 4;

      const photosPerString = [];
      const base = Math.floor(totalPhotos / numStrings);
      const extra = totalPhotos % numStrings;
      for (let s = 0; s < numStrings; s++) {
        photosPerString.push(base + (s < extra ? 1 : 0));
      }

      const svgEl = document.createElementNS(svgNS, 'svg');
      svgEl.setAttribute('class', 'wall-strings-svg');
      svgEl.setAttribute('aria-hidden', 'true');
      wallStage.appendChild(svgEl);

      const marginX = 10;
      const sagFraction = 0.08;
      const bandH = stageH / numStrings;

      for (let s = 0; s < numStrings; s++) {
        const count = photosPerString[s];
        const bandTop = s * bandH;
        const bandBot = s === numStrings - 1 ? stageH - 70 : (s + 1) * bandH;
        const bandCenter = (bandTop + bandBot) / 2;

        const p0 = { x: marginX, y: bandCenter };
        const p2 = { x: stageW - marginX, y: bandCenter };
        const p1 = {
          x: (p0.x + p2.x) / 2,
          y: bandCenter + stageSag(stageH, sagFraction, true),
        };

        const path = document.createElementNS(svgNS, 'path');
        const d = `M ${p0.x} ${p0.y} Q ${p1.x} ${p1.y} ${p2.x} ${p2.y}`;
        path.setAttribute('d', d);
        path.setAttribute('stroke', 'var(--string-tan)');
        path.setAttribute('stroke-width', '2');
        path.setAttribute('stroke-linecap', 'round');
        path.setAttribute('fill', 'none');
        svgEl.appendChild(path);

        [p0, p2].forEach((endPt) => {
          const nail = document.createElementNS(svgNS, 'circle');
          nail.setAttribute('cx', endPt.x);
          nail.setAttribute('cy', endPt.y);
          nail.setAttribute('r', '3.5');
          nail.setAttribute('fill', 'var(--gold)');
          svgEl.appendChild(nail);
        });

        if (count === 0) continue;

        const tStart = 0.04;
        const tEnd = 0.96;
        const tStep = count > 1 ? (tEnd - tStart) / (count - 1) : 0;

        for (let j = 0; j < count; j++) {
          const photoIdx = globalPhotoIdx++;
          const t = count === 1 ? 0.5 : tStart + j * tStep;

          const pt = bezierPoint(p0, p1, p2, t);
          const tangentDeg = bezierTangentAngle(p0, p1, p2, t);
          const randomTilt = (Math.random() * 12 - 6).toFixed(1);
          const totalRot = (tangentDeg + parseFloat(randomTilt)).toFixed(1);
          const zIndex = (j % 2 === 0) ? 2 : 3;

          const wrap = document.createElement('div');
          wrap.className = 'polaroid-wrap';
          wrap.style.left = `${pt.x}px`;
          wrap.style.top = `${pt.y}px`;
          wrap.style.transform = `translate(-50%, 0) rotate(${totalRot}deg)`;
          wrap.style.zIndex = zIndex;

          const inner = document.createElement('button');
          inner.type = 'button';
          inner.className = 'polaroid-inner';
          inner.setAttribute('aria-label', `Open photo ${photoIdx + 1}`);
          inner.style.width = `${polaroidW}px`;

          if (polaroidW < 44) {
            inner.style.minWidth = '44px';
          }

          const pinW = Math.max(16, polaroidW * 0.22);
          const pinH = pinW * 1.4;
          inner.appendChild(buildClothespin(pinW, pinH));

          const img = document.createElement('img');
          img.className = 'polaroid-photo';
          img.src = PHOTOS[photoIdx].src;
          img.alt = `Memory photo ${photoIdx + 1}`;
          img.loading = 'lazy';
          img.decoding = 'async';
          img.onerror = function () {
            const placeholder = document.createElement('div');
            placeholder.className = 'polaroid-photo-placeholder';
            placeholder.textContent = '❤';
            inner.replaceChild(placeholder, img);
          };
          inner.appendChild(img);

          (function (idx, btn) {
            btn.addEventListener('click', () => openPhotoViewer(idx, btn));
            btn.addEventListener('keydown', (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openPhotoViewer(idx, btn);
              }
            });
          })(photoIdx, inner);

          wrap.appendChild(inner);
          wallStage.appendChild(wrap);
          allInnerEls.push(inner);

          if (!prefersReducedMotion) {
            const swayAmp = 1.5;
            const swayDur = (Math.random() * 3 + 3).toFixed(2);
            const swayDelay = (Math.random() * 2.5).toFixed(2);
            inner.style.setProperty('--sway-from', `-${swayAmp}deg`);
            inner.style.setProperty('--sway-to', `${swayAmp}deg`);
            inner.style.setProperty('--sway-dur', `${swayDur}s`);
            inner.style.setProperty('--sway-delay', `${swayDelay}s`);
          }
        }
      }
    } else {
      /* DESKTOP & LANDSCAPE LAYOUT (width > 700px): 3 strings */
      const numStrings = 3;

      const photosPerString = [];
      const base = Math.floor(totalPhotos / numStrings);
      const extra = totalPhotos % numStrings;
      if (extra === 0) {
        photosPerString.push(base, base, base);
      } else if (extra === 1) {
        photosPerString.push(base, base + 1, base);
      } else {
        photosPerString.push(base + 1, base, base + 1);
      }

      const polaroidW = Math.max(66, Math.min(0.07 * window.innerWidth, 104));
      const polaroidH = polaroidW * 1.355;

      const gap = polaroidW * 0.10;
      const stepX = polaroidW + gap;

      const pinW = Math.round(polaroidW * 0.22);
      const pinH = Math.round(pinW * 1.4);

      const dvh = window.innerHeight / 100;
      const safeMarginBottom = 6 * dvh;
      const remainingH = 84 * dvh;
      const bandsTotalH = remainingH - safeMarginBottom;
      const bandH = bandsTotalH / numStrings;
      const sagAtMiddle = 5 * dvh;

      const svgEl = document.createElementNS(svgNS, 'svg');
      svgEl.setAttribute('class', 'wall-strings-svg');
      svgEl.setAttribute('aria-hidden', 'true');
      wallStage.appendChild(svgEl);

      const marginX = 24;

      for (let s = 0; s < numStrings; s++) {
        const count = photosPerString[s];

        const bandTop = s * bandH;
        const anchorOffset = Math.max(2.5 * dvh, (bandH - sagAtMiddle - polaroidH) * 0.4);
        const stringY = bandTop + anchorOffset;

        const p0 = { x: marginX, y: stringY };
        const p2 = { x: stageW - marginX, y: stringY };
        const p1 = {
          x: (p0.x + p2.x) / 2,
          y: stringY + 2 * sagAtMiddle,
        };

        const path = document.createElementNS(svgNS, 'path');
        const d = `M ${p0.x} ${p0.y} Q ${p1.x} ${p1.y} ${p2.x} ${p2.y}`;
        path.setAttribute('d', d);
        path.setAttribute('stroke', 'var(--string-tan)');
        path.setAttribute('stroke-width', '2.5');
        path.setAttribute('stroke-linecap', 'round');
        path.setAttribute('fill', 'none');
        svgEl.appendChild(path);

        [p0, p2].forEach((endPt) => {
          const nail = document.createElementNS(svgNS, 'circle');
          nail.setAttribute('cx', endPt.x);
          nail.setAttribute('cy', endPt.y);
          nail.setAttribute('r', '4.5');
          nail.setAttribute('fill', 'var(--gold)');
          svgEl.appendChild(nail);
        });

        if (count === 0) continue;

        const spanX = (count - 1) * stepX;
        const startX = (stageW - spanX) / 2;

        for (let j = 0; j < count; j++) {
          const photoIdx = globalPhotoIdx++;
          const centerX = count === 1 ? stageW / 2 : startX + j * stepX;
          const t = (centerX - p0.x) / (p2.x - p0.x);

          const pt = bezierPoint(p0, p1, p2, t);
          const tangentDeg = bezierTangentAngle(p0, p1, p2, t);
          const randomTilt = (Math.random() * 4 - 2).toFixed(1);
          const totalRot = (tangentDeg + parseFloat(randomTilt)).toFixed(1);

          const wrap = document.createElement('div');
          wrap.className = 'polaroid-wrap';
          wrap.style.left = `${pt.x}px`;
          wrap.style.top = `${pt.y}px`;
          wrap.style.transform = `translate(-50%, 0) rotate(${totalRot}deg)`;
          wrap.style.zIndex = '2';

          const inner = document.createElement('button');
          inner.type = 'button';
          inner.className = 'polaroid-inner';
          inner.setAttribute('aria-label', `Open photo ${photoIdx + 1}`);
          inner.style.width = `${polaroidW}px`;

          inner.appendChild(buildClothespin(pinW, pinH));

          const img = document.createElement('img');
          img.className = 'polaroid-photo';
          img.src = PHOTOS[photoIdx].src;
          img.alt = `Memory photo ${photoIdx + 1}`;
          img.loading = 'lazy';
          img.decoding = 'async';
          img.onerror = function () {
            const placeholder = document.createElement('div');
            placeholder.className = 'polaroid-photo-placeholder';
            placeholder.textContent = '❤';
            inner.replaceChild(placeholder, img);
          };
          inner.appendChild(img);

          (function (idx, btn) {
            btn.addEventListener('click', () => openPhotoViewer(idx, btn));
            btn.addEventListener('keydown', (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openPhotoViewer(idx, btn);
              }
            });
          })(photoIdx, inner);

          wrap.appendChild(inner);
          wallStage.appendChild(wrap);
          allInnerEls.push(inner);

          if (!prefersReducedMotion) {
            const swayAmp = 2;
            const swayDur = (Math.random() * 3 + 3).toFixed(2);
            const swayDelay = (Math.random() * 2.5).toFixed(2);
            inner.style.setProperty('--sway-from', `-${swayAmp}deg`);
            inner.style.setProperty('--sway-to', `${swayAmp}deg`);
            inner.style.setProperty('--sway-dur', `${swayDur}s`);
            inner.style.setProperty('--sway-delay', `${swayDelay}s`);
          }
        }
      }
    }

    // Staggered drop-in animation (~80ms apart)
    allInnerEls.forEach((el, i) => {
      if (prefersReducedMotion) {
        el.style.opacity = '1';
        el.classList.add('swaying');
        return;
      }
      const tid = setTimeout(() => {
        el.classList.add('dropped');
        el.addEventListener('animationend', function onEnd(ev) {
          if (ev.animationName === 'polaroidDropIn') {
            el.removeEventListener('animationend', onEnd);
            el.style.opacity = '1';
            el.classList.remove('dropped');
            el.classList.add('swaying');
          }
        });
      }, i * 80);
      dropInTimeouts.push(tid);
    });

    preloadAdjacentPhotos(currentPhotoIndex);
  }

  function stageSag(stageH, fraction, isMobile) {
    return stageH * fraction * (isMobile ? 0.9 : 1);
  }

  function buildClothespin(w, h) {
    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('class', 'polaroid-pin');
    svg.setAttribute('width', w);
    svg.setAttribute('height', h);
    svg.setAttribute('viewBox', '0 0 20 28');
    svg.setAttribute('aria-hidden', 'true');

    const leftJaw = document.createElementNS(svgNS, 'path');
    leftJaw.setAttribute('d', 'M 4 14 Q 2 10 3 4 Q 5 0 10 1 Q 10 1 10 14 Z');
    leftJaw.setAttribute('fill', 'var(--pin-wood)');
    leftJaw.setAttribute('stroke', 'var(--pin-dark)');
    leftJaw.setAttribute('stroke-width', '0.8');
    svg.appendChild(leftJaw);

    const rightJaw = document.createElementNS(svgNS, 'path');
    rightJaw.setAttribute('d', 'M 16 14 Q 18 10 17 4 Q 15 0 10 1 Q 10 1 10 14 Z');
    rightJaw.setAttribute('fill', 'var(--pin-wood)');
    rightJaw.setAttribute('stroke', 'var(--pin-dark)');
    rightJaw.setAttribute('stroke-width', '0.8');
    svg.appendChild(rightJaw);

    const coil = document.createElementNS(svgNS, 'circle');
    coil.setAttribute('cx', '10');
    coil.setAttribute('cy', '18');
    coil.setAttribute('r', '4.5');
    coil.setAttribute('fill', 'none');
    coil.setAttribute('stroke', 'var(--pin-dark)');
    coil.setAttribute('stroke-width', '2.2');
    svg.appendChild(coil);

    const lClip = document.createElementNS(svgNS, 'rect');
    lClip.setAttribute('x', '3'); lClip.setAttribute('y', '14');
    lClip.setAttribute('width', '5'); lClip.setAttribute('height', '2.5');
    lClip.setAttribute('rx', '1');
    lClip.setAttribute('fill', 'var(--pin-dark)');
    svg.appendChild(lClip);

    const rClip = document.createElementNS(svgNS, 'rect');
    rClip.setAttribute('x', '12'); rClip.setAttribute('y', '14');
    rClip.setAttribute('width', '5'); rClip.setAttribute('height', '2.5');
    rClip.setAttribute('rx', '1');
    rClip.setAttribute('fill', 'var(--pin-dark)');
    svg.appendChild(rClip);

    return svg;
  }

  /* ==========================================================================
     PHOTO VIEWER
     ========================================================================== */
  function preloadAdjacentPhotos(idx) {
    const total = PHOTOS.length;
    [-1, 1].forEach((offset) => {
      const adjIdx = (idx + offset + total) % total;
      const preImg = new Image();
      preImg.src = PHOTOS[adjIdx].src;
    });
  }

  function openPhotoViewer(idx, triggerBtn) {
    currentPhotoIndex = idx;
    activePhotoButton = triggerBtn || null;
    updateViewerContent(idx);

    if (nextPage4Btn) nextPage4Btn.classList.add('hidden');
    if (prevPage4Btn) prevPage4Btn.classList.add('hidden');

    photoViewerOverlay.classList.remove('hidden');
    void photoViewerOverlay.offsetHeight;
    photoViewerOverlay.classList.add('active');
    photoViewerOverlay.removeAttribute('aria-hidden');

    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      photoViewerClose.focus();
    }, 120);

    preloadAdjacentPhotos(idx);
  }

  function updateViewerContent(idx) {
    const total = PHOTOS.length;
    const photo = PHOTOS[idx];

    viewerImg.src = '';
    viewerImg.alt = `Memory photo ${idx + 1}`;
    viewerImg.src = photo.src;

    viewerCaption.textContent = photo.caption || '';
    viewerCounter.textContent = `${idx + 1} / ${total}`;

    preloadAdjacentPhotos(idx);
  }

  function navigateViewer(direction) {
    const total = PHOTOS.length;
    currentPhotoIndex = (currentPhotoIndex + direction + total) % total;
    updateViewerContent(currentPhotoIndex);
  }

  function closePhotoViewer() {
    if (!photoViewerOverlay.classList.contains('active')) return;

    photoViewerOverlay.classList.remove('active');
    photoViewerOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    if (nextPage4Btn) nextPage4Btn.classList.remove('hidden');
    if (prevPage4Btn) prevPage4Btn.classList.remove('hidden');

    setTimeout(() => {
      photoViewerOverlay.classList.add('hidden');
      viewerImg.src = '';
    }, 350);

    if (activePhotoButton) {
      activePhotoButton.focus();
      activePhotoButton = null;
    }
  }

  if (photoViewerClose) {
    photoViewerClose.addEventListener('click', closePhotoViewer);
  }
  if (photoViewerPrev) {
    photoViewerPrev.addEventListener('click', () => navigateViewer(-1));
  }
  if (photoViewerNext) {
    photoViewerNext.addEventListener('click', () => navigateViewer(1));
  }

  if (photoViewerOverlay) {
    photoViewerOverlay.addEventListener('click', (e) => {
      if (e.target === photoViewerOverlay) closePhotoViewer();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (!photoViewerOverlay || !photoViewerOverlay.classList.contains('active')) return;
    if (e.key === 'Escape')      { e.preventDefault(); closePhotoViewer(); }
    if (e.key === 'ArrowLeft')   { e.preventDefault(); navigateViewer(-1); }
    if (e.key === 'ArrowRight')  { e.preventDefault(); navigateViewer(1); }
  });

  if (photoViewerOverlay) {
    photoViewerOverlay.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }, { passive: true });

    photoViewerOverlay.addEventListener('touchend', (e) => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      const dy = e.changedTouches[0].clientY - touchStartY;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
        navigateViewer(dx < 0 ? 1 : -1);
      }
    }, { passive: true });
  }

  /* ==========================================================================
     PAGE TRANSITIONS (helper)
     ========================================================================== */
  function transitionTo(fromPage, toPage, onAfterHide, onAfterShow) {
    if (prefersReducedMotion) {
      fromPage.classList.remove('active');
      fromPage.classList.add('hidden');
      fromPage.setAttribute('aria-hidden', 'true');

      toPage.classList.remove('hidden');
      toPage.classList.add('active');
      toPage.removeAttribute('aria-hidden');

      if (onAfterHide) onAfterHide();
      if (onAfterShow) onAfterShow();
    } else {
      fromPage.style.opacity = '0';
      setTimeout(() => {
        fromPage.classList.remove('active');
        fromPage.classList.add('hidden');
        fromPage.setAttribute('aria-hidden', 'true');
        fromPage.style.opacity = '';

        toPage.style.opacity = '0';
        toPage.classList.remove('hidden');
        toPage.classList.add('active');
        toPage.removeAttribute('aria-hidden');

        if (onAfterHide) onAfterHide();

        void toPage.offsetHeight;
        toPage.style.opacity = '1';

        setTimeout(() => {
          toPage.style.opacity = '';
          if (onAfterShow) onAfterShow();
        }, 800);
      }, 800);
    }
  }

  /* ==========================================================================
     PAGE 2: INIT
     ========================================================================== */
  function initPage2Celebration() {
    startPage2Hearts();
    if (prefersReducedMotion) {
      finishWriting();
    } else {
      runHandwritingEffect();
    }
  }

  /* ==========================================================================
     MUSIC: helper to keep the play/pause button in sync
     ========================================================================== */
  function setMusicButtonState(isPlaying) {
    if (!musicToggle) return;
    if (musicIcon) musicIcon.textContent = isPlaying ? '⏸' : '▶';
    musicToggle.setAttribute('aria-label', isPlaying ? 'Pause background music' : 'Play background music');
    musicToggle.setAttribute('title', isPlaying ? 'Pause music' : 'Play music');
  }

  // Page 1 -> Page 2 (Red dot click) + START MUSIC
  dotButton.addEventListener('click', () => {
    stopHearts();

    // Music starts here, because a click is a valid user action for browsers
    bgMusic.play().then(() => {
      setMusicButtonState(true);
    }).catch((err) => {
      console.warn('Playback error or permissions issue:', err);
      setMusicButtonState(false);
    });

    transitionTo(page1, page2, null, initPage2Celebration);
  });

  // Page 2 -> Page 3 (Next Arrow click)
  if (nextPage2Btn) {
    nextPage2Btn.addEventListener('click', () => {
      stopPage2Hearts();
      clearStickerTimeouts();

      transitionTo(page2, page3,
        () => { /* nothing extra on hide */ },
        () => {
          initBouquet();
          startPage3Hearts();
        }
      );
    });
  }

  // Page 3 -> Page 2 (Back Arrow click)
  if (prevPage3Btn) {
    prevPage3Btn.addEventListener('click', () => {
      if (reasonOverlay && reasonOverlay.classList.contains('active')) return;

      stopPage3Hearts();
      transitionTo(page3, page2, null, startPage2Hearts);
    });
  }

  // Page 3 -> Page 4 (Next Arrow click)
  if (nextPage3Btn) {
    nextPage3Btn.addEventListener('click', () => {
      if (reasonOverlay && reasonOverlay.classList.contains('active')) return;

      stopPage3Hearts();
      transitionTo(page3, page4, null, () => {
        buildPhotoWall();
        startPage4Hearts();
      });
    });
  }

  // Page 4 -> Page 3 (Back Arrow click)
  if (prevPage4Btn) {
    prevPage4Btn.addEventListener('click', () => {
      if (photoViewerOverlay && photoViewerOverlay.classList.contains('active')) return;

      stopPage4Hearts();
      dropInTimeouts.forEach(clearTimeout);
      dropInTimeouts = [];

      transitionTo(page4, page3, null, () => {
        initBouquet();
        startPage3Hearts();
      });
    });
  }

  /* ==========================================================================
     PAGE 5: VINTAGE PARCHMENT WISH CONFIGURATION
     ========================================================================== */
  const PARCHMENT_HEADING = "Mandatory thing from my side since beginning (Virtually)🤗";

  const PARCHMENT_BODY = [
    "Happy birthday Sahil❤️🎊",
    "Wishing you a day filled with most memorable moments and generous people around 💗May you get everything you ever wished for, may your hard work never gets wasted, may you always stay happy wherever you are💕Having a man like you as my best friend is not less than universe's precious gift❤️🧿you are so kind and calm towards me since beginning, and I never ever owe you anything in return of it🌸Thank you for bringing shine to my dark, thank you for bringing laughters at my worst days, thank you for being that human I never wanted to lose🫶🏻May life always stays kind to you the way you are with everyone💙May life never fades your smile. Another of you, another year of us being together with lots of argues, forgiveness, consolations, yet completing another year with you felt like most beautiful thing ever🥰❤️",
    "God bless you always🫠",
    "Enjoy your day🎊, once again,",
    "Happiest 25th, BB🌸❤️IMY:)"
  ];

  const PARCHMENT_SIGNOFF = [
    "Yours truly,",
    "Pree.."
  ];

  const MIN_BODY_FONT_SIZE = 11;
  const MAX_BODY_FONT_SIZE = 34;

  // Page 5 DOM references
  const heartsLayerPage5 = document.getElementById('hearts-layer-page5');
  const confettiLayerPage5 = document.getElementById('confetti-layer-page5');
  const wishText = document.getElementById('wish-text');

  let heartsIntervalPage5 = null;

  function stopPage5Hearts() {
    if (heartsIntervalPage5) {
      clearInterval(heartsIntervalPage5);
      heartsIntervalPage5 = null;
    }
    if (heartsLayerPage5) {
      heartsLayerPage5.innerHTML = '';
    }
  }

  function spawnSingleHeartPage5() {
    if (!heartsLayerPage5 || !page5.classList.contains('active')) return;
    if (heartsLayerPage5.childElementCount >= MAX_HEARTS) return;

    const heart = document.createElement('span');
    heart.className = 'floating-heart';
    heart.textContent = '❤';

    const leftPercent = Math.random() * 100;
    const size = Math.floor(Math.random() * (40 - 14 + 1)) + 14;
    const duration = (Math.random() * (7 - 3.5) + 3.5).toFixed(2);
    const sway = (Math.random() * 80 - 40).toFixed(0);
    const color = Math.random() < 0.5 ? 'var(--accent)' : 'var(--gold)';

    heart.style.left = `${leftPercent}%`;
    heart.style.fontSize = `${size}px`;
    heart.style.color = color;
    heart.style.animationDuration = `${duration}s`;
    heart.style.setProperty('--sway-x', `${sway}px`);

    heart.addEventListener('animationend', () => {
      heart.remove();
    });

    heartsLayerPage5.appendChild(heart);
  }

  function spawnHeartsPage5() {
    if (!heartsLayerPage5 || !page5.classList.contains('active')) return;
    const count = Math.random() < 0.35 ? 2 : 1;
    for (let i = 0; i < count; i++) {
      spawnSingleHeartPage5();
    }
  }

  function startPage5Hearts() {
    if (!prefersReducedMotion && heartsLayerPage5 && !heartsIntervalPage5) {
      heartsIntervalPage5 = setInterval(spawnHeartsPage5, 180);
    }
  }

  function renderWishText() {
    if (!wishText) return;
    wishText.innerHTML = '';

    const headingEl = document.createElement('h2');
    headingEl.className = 'parchment-heading';
    headingEl.textContent = PARCHMENT_HEADING;
    wishText.appendChild(headingEl);

    PARCHMENT_BODY.forEach((paraText) => {
      const pEl = document.createElement('p');
      pEl.className = 'parchment-para';
      pEl.textContent = paraText;
      wishText.appendChild(pEl);
    });

    const signEl = document.createElement('div');
    signEl.className = 'parchment-sign';
    PARCHMENT_SIGNOFF.forEach((lineText) => {
      const lineEl = document.createElement('p');
      lineEl.className = 'parchment-sign-line';
      lineEl.textContent = lineText;
      signEl.appendChild(lineEl);
    });
    wishText.appendChild(signEl);
  }

  function applyParchmentFontSize(bodySize) {
    if (!wishText) return;
    wishText.style.setProperty('--parchment-body-size', `${bodySize}px`);
    wishText.style.setProperty(
      '--parchment-heading-size',
      `${(bodySize * 1.5).toFixed(1)}px`
    );
    wishText.style.setProperty(
      '--parchment-sign-size',
      `${(bodySize * 1.15).toFixed(1)}px`
    );
  }

  function autoFitParchmentText() {
    if (!wishText) return;
    const clientHeight = wishText.clientHeight;
    const clientWidth = wishText.clientWidth;
    if (clientHeight <= 0 || clientWidth <= 0) return;

    let low = MIN_BODY_FONT_SIZE;
    let high = MAX_BODY_FONT_SIZE;
    let best = MIN_BODY_FONT_SIZE;

    for (let i = 0; i < 14; i++) {
      const mid = (low + high) / 2;
      applyParchmentFontSize(mid);
      if (wishText.scrollHeight <= clientHeight && wishText.scrollWidth <= clientWidth) {
        best = mid;
        low = mid;
      } else {
        high = mid;
      }
    }

    best = Math.max(MIN_BODY_FONT_SIZE, Math.floor(best * 10) / 10);
    applyParchmentFontSize(best);

    while (best > MIN_BODY_FONT_SIZE && (wishText.scrollHeight > clientHeight || wishText.scrollWidth > clientWidth)) {
      best = Math.max(MIN_BODY_FONT_SIZE, best - 0.2);
      applyParchmentFontSize(best);
    }
  }

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
      if (page5 && page5.classList.contains('active')) {
        autoFitParchmentText();
      }
    });
  }

  function startPage5() {
    startPage5Hearts();
    renderWishText();
    autoFitParchmentText();

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        autoFitParchmentText();
      });
    }

    if (!prefersReducedMotion) {
      triggerTopConfetti(confettiLayerPage5);
    }
  }

  function stopPage5() {
    stopPage5Hearts();
    if (confettiLayerPage5) {
      confettiLayerPage5.innerHTML = '';
    }
  }

  // Page 4 -> Page 5 (Next Arrow click)
  if (nextPage4Btn) {
    nextPage4Btn.addEventListener('click', () => {
      if (photoViewerOverlay && photoViewerOverlay.classList.contains('active')) return;

      stopPage4Hearts();
      dropInTimeouts.forEach(clearTimeout);
      dropInTimeouts = [];

      transitionTo(page4, page5,
        () => {
          startPage5();
        },
        () => {
          autoFitParchmentText();
        }
      );
    });
  }

  // Page 5 -> Page 4 (Back Arrow click)
  if (prevPage5Btn) {
    prevPage5Btn.addEventListener('click', () => {
      stopPage5();
      transitionTo(page5, page4, null, () => {
        buildPhotoWall();
        startPage4Hearts();
      });
    });
  }

  /* ==========================================================================
     REBUILD WALL ON RESIZE / ORIENTATION CHANGE
     ========================================================================== */
  let resizeDebounce = null;
  window.addEventListener('resize', () => {
    if (page4 && page4.classList.contains('active')) {
      clearTimeout(resizeDebounce);
      resizeDebounce = setTimeout(() => {
        buildPhotoWall();
      }, 200);
    } else if (page5 && page5.classList.contains('active')) {
      autoFitParchmentText();
    }
  });

  window.addEventListener('orientationchange', () => {
    if (page4 && page4.classList.contains('active')) {
      clearTimeout(resizeDebounce);
      resizeDebounce = setTimeout(() => {
        buildPhotoWall();
      }, 300);
    } else if (page5 && page5.classList.contains('active')) {
      setTimeout(() => {
        autoFitParchmentText();
      }, 150);
    }
  });

  /* ==========================================================================
     FLOATING PLAY / PAUSE MUSIC TOGGLE (Fixed Bottom Right across all pages)
     ========================================================================== */
  if (musicToggle) {
    musicToggle.addEventListener('click', () => {
      if (bgMusic.paused) {
        bgMusic.play().then(() => {
          setMusicButtonState(true);
        }).catch((err) => {
          console.warn('Playback error:', err);
        });
      } else {
        bgMusic.pause();
        setMusicButtonState(false);
      }
    });
  }

  // Keep the button icon correct if the audio state changes for any reason
  if (bgMusic) {
    bgMusic.addEventListener('play', () => setMusicButtonState(true));
    bgMusic.addEventListener('pause', () => setMusicButtonState(false));
  }

  // Pre-initialize bouquet structure on load
  initBouquet();
});

/* ==================================================================
   PAGE 6: THE CHIT (folded note that opens into a love note)
   ================================================================== */
(function () {
  'use strict';

  const SETTINGS = {
    pageFadeMs: 800,
    flapMs: 600,
    noteInMs: 700,
    pauseBeforeArmsMs: 400,
    armsMs: 2400,
    heartEveryMs: 180,
    maxHearts: 60,
    burstCount: 16
  };

  const ARMS = { leftStart: 228, leftEnd: 38, rightStart: 296, rightEnd: 482, y: 218 };
  const MAX_I = 11;

  const $ = (id) => document.getElementById(id);
  const page5 = $('page-5');
  const page6 = $('page-6');
  const nextBtn = $('next-page-5');
  const prevBtn = $('prev-page-6');
  const chit = $('chit-closed');
  const noteBox = $('note-container');
  const armLine = $('arm-line');
  const wordThi = $('word-thi');
  const wordMuch = $('word-much');
  const replayBtn = $('replay-note');
  const heartsLayer = $('hearts-layer-page6');

  if (!page5 || !page6 || !chit || !noteBox || !armLine || !wordThi || !wordMuch || !replayBtn || !heartsLayer) {
    console.warn('Page 6: some elements are missing in index.html, page 6 script not started.');
    return;
  }

  const svg = noteBox.querySelector('.love-note-svg');
  const girl = svg.querySelector('.note-girl');
  const paper = svg.querySelector('.note-paper');
  const SVG_NS = 'http://www.w3.org/2000/svg';
  const reduce = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1) Torn paper edge
  function tornPath() {
    let seed = 7;
    const rnd = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
    const W = 520, H = 380, m = 8, step = 14, j = 4;
    const pts = [];
    for (let x = m; x <= W - m; x += step) pts.push([x, m + (rnd() * 2 - 1) * j]);
    for (let y = m; y <= H - m; y += step) pts.push([W - m + (rnd() * 2 - 1) * j, y]);
    for (let x = W - m; x >= m; x -= step) pts.push([x, H - m + (rnd() * 2 - 1) * j]);
    for (let y = H - m; y >= m; y -= step) pts.push([m + (rnd() * 2 - 1) * j, y]);
    return 'M' + pts.map((p) => p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' L ') + ' Z';
  }
  if (paper) {
    paper.setAttribute('d', tornPath());
    paper.style.stroke = 'var(--kraft-dark)';
    paper.style.strokeWidth = '1.5';
    paper.style.strokeLinejoin = 'round';
  }

  // 2) Hands that move with the arms
  girl.querySelectorAll('path').forEach((p) => {
    const d = p.getAttribute('d') || '';
    if (d.indexOf('M228 218') === 0 || d.indexOf('M296 218') === 0) p.remove();
  });
  function makeHand(isLeft) {
    const g = document.createElementNS(SVG_NS, 'g');
    g.setAttribute('stroke-width', '3.5');
    [[-10, -7], [-12, 0], [-10, 7]].forEach(([dx, dy]) => {
      const l = document.createElementNS(SVG_NS, 'line');
      l.setAttribute('x1', '0');
      l.setAttribute('y1', '0');
      l.setAttribute('x2', String(isLeft ? dx : -dx));
      l.setAttribute('y2', String(dy));
      g.appendChild(l);
    });
    girl.appendChild(g);
    return g;
  }
  const handL = makeHand(true);
  const handR = makeHand(false);

  // 3) "much" position
  wordMuch.setAttribute('text-anchor', 'start');
  wordMuch.setAttribute('x', '330');
  wordMuch.setAttribute('y', '348');

  function setArms(p) {
    const left = ARMS.leftStart + (ARMS.leftEnd - ARMS.leftStart) * p;
    const right = ARMS.rightStart + (ARMS.rightEnd - ARMS.rightStart) * p;
    armLine.setAttribute('x1', left.toFixed(1));
    armLine.setAttribute('x2', right.toFixed(1));
    handL.setAttribute('transform', 'translate(' + left.toFixed(1) + ' ' + ARMS.y + ')');
    handR.setAttribute('transform', 'translate(' + right.toFixed(1) + ' ' + ARMS.y + ')');
    const n = Math.round(1 + (MAX_I - 1) * p);
    wordThi.textContent = 'th' + 'i'.repeat(n) + 's';
  }
  const ease = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

  let state = 'closed';
  let rafId = 0;
  let timers = [];
  let navLock = false;
  let heartTimer = null;

  function later(fn, ms) { const id = setTimeout(fn, ms); timers.push(id); return id; }
  function clearTimers() {
    timers.forEach(clearTimeout);
    timers = [];
    cancelAnimationFrame(rafId);
  }

  function spawnHeart() {
    if (heartsLayer.children.length >= SETTINGS.maxHearts) return;
    const h = document.createElement('span');
    h.className = 'p6-heart';
    h.textContent = '\u2764';
    h.style.left = Math.random() * 100 + '%';
    h.style.fontSize = 14 + Math.random() * 26 + 'px';
    h.style.animationDuration = 3.5 + Math.random() * 3.5 + 's';
    h.style.setProperty('--sway', Math.random() * 60 - 30 + 'px');
    h.style.color = Math.random() < 0.5 ? 'var(--accent)' : 'var(--gold)';
    h.addEventListener('animationend', () => h.remove());
    heartsLayer.appendChild(h);
  }
  function startHearts() {
    if (reduce() || heartTimer) return;
    heartTimer = setInterval(spawnHeart, SETTINGS.heartEveryMs);
  }
  function stopHearts() {
    clearInterval(heartTimer);
    heartTimer = null;
    heartsLayer.textContent = '';
  }

  function heartBurst() {
    if (reduce()) return;
    const r = girl.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 3;
    const colors = ['var(--accent)', 'var(--gold)', 'var(--text)'];
    for (let i = 0; i < SETTINGS.burstCount; i++) {
      const h = document.createElement('span');
      h.className = 'p6-burst';
      h.textContent = '\u2764';
      h.style.color = colors[i % 3];
      h.style.left = cx + 'px';
      h.style.top = cy + 'px';
      h.style.fontSize = 14 + Math.random() * 16 + 'px';
      h.style.setProperty('--dx', Math.random() * 240 - 120 + 'px');
      h.style.setProperty('--dy', -(80 + Math.random() * 180) + 'px');
      h.addEventListener('animationend', () => h.remove());
      page6.appendChild(h);
    }
  }

  function showNote() {
    noteBox.classList.remove('hidden', 'closing');
    noteBox.setAttribute('aria-hidden', 'false');
    void noteBox.offsetWidth;
    noteBox.classList.add('show');
  }

  function finishArms(withBurst) {
    state = 'open';
    wordMuch.style.transition = 'opacity 0.5s ease';
    wordMuch.style.opacity = '1';
    if (withBurst) {
      girl.classList.add('hop');
      later(() => girl.classList.remove('hop'), 600);
      heartBurst();
    }
    later(() => replayBtn.classList.add('show'), withBurst ? 600 : 0);
  }

  function runArms() {
    const start = performance.now();
    function frame(now) {
      const t = Math.min(1, (now - start) / SETTINGS.armsMs);
      setArms(ease(t));
      if (t < 1) rafId = requestAnimationFrame(frame);
      else finishArms(true);
    }
    rafId = requestAnimationFrame(frame);
  }

  function openNote() {
    if (state !== 'closed') return;
    state = 'opening';
    if (reduce()) {
      chit.classList.add('gone');
      showNote();
      setArms(1);
      finishArms(false);
      return;
    }
    chit.classList.add('opening');
    later(() => {
      chit.classList.add('gone');
      showNote();
      later(runArms, SETTINGS.noteInMs + SETTINGS.pauseBeforeArmsMs);
    }, SETTINGS.flapMs);
  }

  function resetNote() {
    clearTimers();
    page6.querySelectorAll('.p6-burst').forEach((e) => e.remove());
    girl.classList.remove('hop');
    setArms(0);
    wordMuch.style.transition = 'none';
    wordMuch.style.opacity = '0';
    replayBtn.classList.remove('show');
    noteBox.classList.remove('show', 'closing');
    noteBox.classList.add('hidden');
    noteBox.setAttribute('aria-hidden', 'true');
    chit.classList.remove('opening', 'gone');
    state = 'closed';
  }

  chit.addEventListener('click', openNote);

  replayBtn.addEventListener('click', () => {
    if (state !== 'open') return;
    state = 'closing';
    replayBtn.classList.remove('show');
    noteBox.classList.remove('show');
    noteBox.classList.add('closing');
    later(resetNote, 500);
  });

  /* NAVIGATION: page 5 <-> page 6 */
  function goNext() {
    if (navLock || page6.classList.contains('active')) return;
    navLock = true;
    const ms = reduce() ? 0 : SETTINGS.pageFadeMs;
    page5.style.opacity = '0';
    setTimeout(() => {
      page5.classList.remove('active');
      page5.classList.add('hidden');
      page5.setAttribute('aria-hidden', 'true');
      page5.style.opacity = '';

      resetNote();
      page6.classList.remove('hidden');
      page6.classList.add('active');
      page6.removeAttribute('aria-hidden');
      page6.style.opacity = '0';
      void page6.offsetHeight;
      page6.style.opacity = '1';
      startHearts();

      setTimeout(() => { page6.style.opacity = ''; navLock = false; }, ms);
    }, ms);
  }

  function goPrev() {
    if (navLock || !page6.classList.contains('active')) return;
    navLock = true;
    const ms = reduce() ? 0 : SETTINGS.pageFadeMs;
    page6.style.opacity = '0';
    setTimeout(() => {
      stopHearts();
      resetNote();
      page6.classList.remove('active');
      page6.classList.add('hidden');
      page6.setAttribute('aria-hidden', 'true');
      page6.style.opacity = '';

      page5.classList.remove('hidden');
      page5.classList.add('active');
      page5.removeAttribute('aria-hidden');
      page5.style.opacity = '0';
      void page5.offsetHeight;
      page5.style.opacity = '1';
      window.dispatchEvent(new Event('resize'));
      setTimeout(() => { page5.style.opacity = ''; navLock = false; }, ms);
    }, ms);
  }

  if (nextBtn) nextBtn.addEventListener('click', goNext);
  if (prevBtn) prevBtn.addEventListener('click', goPrev);

  setArms(0);
})();

/* ==================================================================
   PAGE 7: THE GIFT BOX (opens, and the surprise pops out)
   ================================================================== */
(function () {
  'use strict';

  const SURPRISE_CAPTION = 'Surprise! \uD83C\uDF81';

  const SETTINGS = {
    pageFadeMs: 800,
    shakeMs: 500,
    riseDelayMs: 250,
    riseMs: 950,
    heartEveryMs: 180,
    maxHearts: 60,
    confettiCount: 40,
    popCount: 10,
    sparkCount: 8
  };

  const $ = (id) => document.getElementById(id);
  const page6 = $('page-6');
  const page7 = $('page-7');
  const nextBtn = $('next-page-6');
  const prevBtn = $('prev-page-7');
  const wrap = $('gift-wrap');
  const stage = $('gift-stage');
  const charAnim = $('gift-char-anim');
  const charImg = $('gift-char-img');
  const caption = $('gift-caption');
  const replayBtn = $('gift-replay');
  const heartsLayer = $('hearts-layer-page7');
  const confettiLayer = $('confetti-layer-page7');

  if (!page6 || !page7 || !wrap || !stage || !charAnim || !charImg || !caption || !replayBtn || !heartsLayer || !confettiLayer) {
    console.warn('Page 7: some elements are missing in index.html, page 7 script not started.');
    return;
  }

  const reduce = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const COLORS = ['var(--accent)', 'var(--gold)', 'var(--text)'];

  function useFallback() {
    if (charImg.dataset.fallback) return;
    charImg.dataset.fallback = '1';
    const f = document.createElement('div');
    f.className = 'gift-char-fallback';
    f.textContent = '\u2764';
    charImg.replaceWith(f);
  }
  charImg.addEventListener('error', useFallback);
  if (charImg.complete && charImg.naturalWidth === 0) useFallback();

  let state = 'closed';
  let timers = [];
  let navLock = false;
  let heartTimer = null;

  function later(fn, ms) { const id = setTimeout(fn, ms); timers.push(id); return id; }
  function clearTimers() { timers.forEach(clearTimeout); timers = []; }
  const currentChar = () => stage.querySelector('.gift-char-img, .gift-char-fallback');

  function spawnHeart() {
    if (heartsLayer.children.length >= SETTINGS.maxHearts) return;
    const h = document.createElement('span');
    h.className = 'p7-heart';
    h.textContent = '\u2764';
    h.style.left = Math.random() * 100 + '%';
    h.style.fontSize = 14 + Math.random() * 26 + 'px';
    h.style.animationDuration = 3.5 + Math.random() * 3.5 + 's';
    h.style.setProperty('--sway', Math.random() * 60 - 30 + 'px');
    h.style.color = Math.random() < 0.5 ? 'var(--accent)' : 'var(--gold)';
    h.addEventListener('animationend', () => h.remove());
    heartsLayer.appendChild(h);
  }
  function startHearts() {
    if (reduce() || heartTimer) return;
    heartTimer = setInterval(spawnHeart, SETTINGS.heartEveryMs);
  }
  function stopHearts() {
    clearInterval(heartTimer);
    heartTimer = null;
    heartsLayer.textContent = '';
  }

  function confetti() {
    if (reduce()) return;
    const r = stage.getBoundingClientRect();
    const ox = r.left + r.width / 2;
    const oy = r.top + r.height * 0.45;
    const spread = Math.min(window.innerWidth, 520) * 0.5;
    for (let i = 0; i < SETTINGS.confettiCount; i++) {
      const s = document.createElement('span');
      const w = 6 + Math.random() * 7;
      s.className = 'p7-confetti';
      s.style.left = ox + 'px';
      s.style.top = oy + 'px';
      s.style.width = w + 'px';
      s.style.height = w * (0.5 + Math.random() * 0.8) + 'px';
      s.style.background = COLORS[i % 3];
      s.style.animationDuration = 1.8 + Math.random() * 1.2 + 's';
      s.style.setProperty('--dx', (Math.random() * 2 - 1) * spread + 'px');
      s.style.setProperty('--up', -(120 + Math.random() * 220) + 'px');
      s.style.setProperty('--down', 80 + Math.random() * 260 + 'px');
      s.style.setProperty('--rot', Math.random() * 720 - 360 + 'deg');
      s.addEventListener('animationend', () => s.remove());
      confettiLayer.appendChild(s);
    }
  }

  function sparkles() {
    if (reduce()) return;
    const el = currentChar();
    if (!el) return;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const rad = Math.max(r.width, r.height) * 0.55;
    for (let i = 0; i < SETTINGS.sparkCount; i++) {
      const a = (Math.PI * 2 * i) / SETTINGS.sparkCount + Math.random() * 0.4;
      const s = document.createElement('span');
      s.className = 'p7-spark';
      s.textContent = i % 2 ? '\u2726' : '\u2764';
      s.style.left = cx + Math.cos(a) * rad + 'px';
      s.style.top = cy + Math.sin(a) * rad + 'px';
      s.style.fontSize = 14 + Math.random() * 12 + 'px';
      s.style.color = COLORS[i % 3];
      s.style.animationDelay = Math.random() * 0.3 + 's';
      s.addEventListener('animationend', () => s.remove());
      page7.appendChild(s);
    }
  }

  function tapChar() {
    charAnim.classList.remove('tap');
    void charAnim.offsetWidth;
    charAnim.classList.add('tap');
    later(() => charAnim.classList.remove('tap'), 500);
    if (reduce()) return;
    const el = currentChar();
    const r = (el || charAnim).getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    for (let i = 0; i < SETTINGS.popCount; i++) {
      const h = document.createElement('span');
      h.className = 'p7-pop';
      h.textContent = '\u2764';
      h.style.color = COLORS[i % 3];
      h.style.left = cx + 'px';
      h.style.top = cy + 'px';
      h.style.fontSize = 14 + Math.random() * 16 + 'px';
      h.style.setProperty('--dx', Math.random() * 240 - 120 + 'px');
      h.style.setProperty('--dy', -(80 + Math.random() * 180) + 'px');
      h.addEventListener('animationend', () => h.remove());
      page7.appendChild(h);
    }
  }

  function showEnd() {
    caption.textContent = SURPRISE_CAPTION;
    caption.classList.add('show');
    replayBtn.classList.add('show');
    state = 'open';
  }

  function openGift() {
    if (state !== 'closed') return;
    state = 'opening';
    wrap.classList.add('opened');

    if (reduce()) {
      stage.classList.add('is-open', 'is-out', 'settled');
      showEnd();
      return;
    }

    stage.classList.add('shaking');
    later(() => {
      stage.classList.remove('shaking');
      stage.classList.add('is-open');
      confetti();
      later(() => {
        stage.classList.add('is-out');
        later(() => {
          stage.classList.add('settled');
          sparkles();
          showEnd();
        }, SETTINGS.riseMs);
      }, SETTINGS.riseDelayMs);
    }, SETTINGS.shakeMs);
  }

  function resetGift() {
    clearTimers();
    stage.classList.remove('shaking', 'is-open', 'is-out', 'settled', 'closing');
    charAnim.classList.remove('tap');
    wrap.classList.remove('opened');
    caption.classList.remove('show');
    replayBtn.classList.remove('show');
    confettiLayer.textContent = '';
    page7.querySelectorAll('.p7-spark, .p7-pop').forEach((e) => e.remove());
    state = 'closed';
  }

  stage.addEventListener('click', () => {
    if (state === 'closed') openGift();
    else if (state === 'open') tapChar();
  });

  replayBtn.addEventListener('click', () => {
    if (state !== 'open') return;
    state = 'closing';
    replayBtn.classList.remove('show');
    caption.classList.remove('show');
    stage.classList.remove('is-out', 'settled');
    later(() => {
      stage.classList.remove('is-open');
      stage.classList.add('closing');
      later(() => {
        stage.classList.remove('closing');
        wrap.classList.remove('opened');
        state = 'closed';
      }, 650);
    }, 600);
  });

  /* NAVIGATION: page 6 <-> page 7 */
  function goNext() {
    if (navLock || page7.classList.contains('active')) return;
    navLock = true;
    const ms = reduce() ? 0 : SETTINGS.pageFadeMs;
    page6.style.opacity = '0';
    setTimeout(() => {
      page6.classList.remove('active');
      page6.classList.add('hidden');
      page6.setAttribute('aria-hidden', 'true');
      page6.style.opacity = '';

      resetGift();
      page7.classList.remove('hidden');
      page7.classList.add('active');
      page7.removeAttribute('aria-hidden');
      page7.style.opacity = '0';
      void page7.offsetHeight;
      page7.style.opacity = '1';
      startHearts();

      setTimeout(() => { page7.style.opacity = ''; navLock = false; }, ms);
    }, ms);
  }

  function goPrev() {
    if (navLock || !page7.classList.contains('active')) return;
    navLock = true;
    const ms = reduce() ? 0 : SETTINGS.pageFadeMs;
    page7.style.opacity = '0';
    setTimeout(() => {
      stopHearts();
      resetGift();
      page7.classList.remove('active');
      page7.classList.add('hidden');
      page7.setAttribute('aria-hidden', 'true');
      page7.style.opacity = '';

      page6.classList.remove('hidden');
      page6.classList.add('active');
      page6.removeAttribute('aria-hidden');
      page6.style.opacity = '0';
      void page6.offsetHeight;
      page6.style.opacity = '1';
      setTimeout(() => { page6.style.opacity = ''; navLock = false; }, ms);
    }, ms);
  }

  if (nextBtn) nextBtn.addEventListener('click', goNext);
  if (prevBtn) prevBtn.addEventListener('click', goPrev);
})();