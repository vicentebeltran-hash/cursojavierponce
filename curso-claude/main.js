/* ═══════════════════════════════════════
   CURSO DE CLAUDE · main.js
═══════════════════════════════════════ */

/* ── Scroll between hero and course ── */
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

/* ── Module navigation ── */
let currentModule = 0;
const TOTAL = 9;

function gotoModule(idx) {
  // Hide all sections
  document.querySelectorAll('.module-section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.mod-nav').forEach(b => b.classList.remove('active'));

  // Show target
  const target = document.getElementById('mod' + idx);
  if (target) {
    target.classList.add('active');
    document.querySelector('.module-content').scrollTop = 0;
  }

  // Update sidebar
  const navBtns = document.querySelectorAll('.mod-nav');
  if (navBtns[idx]) navBtns[idx].classList.add('active');

  currentModule = idx;
  updateProgress();
  scrollToSection('coursePage');
}

function jumpToModule(idx) {
  gotoModule(idx);
  scrollToSection('coursePage');
}

function updateProgress() {
  const pct = Math.round(((currentModule + 1) / TOTAL) * 100);
  const fill = document.getElementById('progressFill');
  const label = document.getElementById('progressLabel');
  if (fill) fill.style.width = pct + '%';
  if (label) label.textContent = pct + '%';
}

/* ── Mobile menu ── */
const burger = document.getElementById('burger');
const overlay = document.getElementById('overlay');
const mobileMenu = document.getElementById('mobileMenu');

function openMobileMenu() {
  burger.setAttribute('aria-expanded', 'true');
  overlay.hidden = false;
  mobileMenu.hidden = false;
  document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
  burger.setAttribute('aria-expanded', 'false');
  overlay.hidden = true;
  mobileMenu.hidden = true;
  document.body.style.overflow = '';
}

burger?.addEventListener('click', () => {
  const expanded = burger.getAttribute('aria-expanded') === 'true';
  expanded ? closeMobileMenu() : openMobileMenu();
});

overlay?.addEventListener('click', closeMobileMenu);

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeMobileMenu();
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 720) closeMobileMenu();
});

/* ── Stats count-up ── */
function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

function animateCountUp(el) {
  const target = parseFloat(el.dataset.target);
  const decimals = parseInt(el.dataset.decimals) || 0;
  const suffix = el.dataset.suffix || '';
  const duration = 1500 + (parseInt(el.dataset.index) || 0) * 80;
  const start = performance.now();

  function tick(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const value = target * easeOutCubic(progress);
    el.textContent = value.toFixed(decimals) + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

// Intersection Observer for stats
const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statValues = entry.target.querySelectorAll('.stat-value');
      statValues.forEach((el, i) => {
        el.dataset.index = i;
        setTimeout(() => animateCountUp(el), 480 + i * 90);
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.25 });

const statsGrid = document.querySelector('.stats-grid');
if (statsGrid) statsObserver.observe(statsGrid);

/* ── Quiz handler ── */
function doQuiz(quizId, btn, result) {
  const block = document.getElementById(quizId);
  const opts = block.querySelectorAll('.qopt');
  const fb = document.getElementById(quizId + '-fb');

  // Disable all
  opts.forEach(o => o.disabled = true);

  if (result === 'correct') {
    btn.classList.add('correct');
    fb.className = 'quiz-fb show correct';
    fb.textContent = '✅ ¡Correcto!';
  } else {
    btn.classList.add('wrong');
    // Highlight correct one
    opts.forEach(o => {
      if (o.getAttribute('onclick')?.includes("'correct'")) o.classList.add('correct');
    });
    fb.className = 'quiz-fb show wrong';
    fb.textContent = '❌ No exactamente. Revisa la explicación del módulo.';
  }
}

/* ── Init ── */
updateProgress();
