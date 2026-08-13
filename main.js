/* ═══════════════════════════════════════
   CURSO DE CLAUDE · main.js
═══════════════════════════════════════ */

/* ── Datos de los 17 vídeos ── */
const VIDEOS_BEGINNER = [
  { id: "XE8umqpgKxg", title: "Curso gratis: Claude para todos (2026)", channel: "EDteam", duration: "31:03" },
  { id: "tdjMFxaZo-E", title: "Claude de 0 a Experto: La Guía Completa 2026", channel: "Ruva IA", duration: "54:26" },
  { id: "EZoBKg_HA6I", title: "Cómo usar Claude AI - Desde cero (en español 2026)", channel: "Raquel Vázquez · Digital OS", duration: "1:17:34" },
  { id: "imAjmQy8p8c", title: "Cómo Utilizar Claude Para Principiantes | Tutorial 2026", channel: "Adrián Sáenz", duration: "6:32:34" },
  { id: "qth5wFHKDV8", title: "Cómo Usar Claude AI | Tutorial Español (2026)", channel: "Juan & Lucia", duration: "20:11" },
  { id: "nMEHOXT8gYg", title: "Cómo usar Claude gratis 2026 — Tutorial español", channel: "Susan Gorbina", duration: "36:13" },
  { id: "eNcWAoj_sRI", title: "How to use Claude Anthropic - Spanish Tutorial 2026", channel: "Valeria Digital", duration: "19:11" },
  { id: "8X957B8mu6o", title: "CLAUDE AI 2026: Complete Step-by-Step Tutorial", channel: "Daxus Latam", duration: "36:20" },
];

const VIDEOS_ADVANCED = [
  { id: "h49d1-d_fYk", title: "CLAUDE CODE 2026: Curso Completo en Español (actualizado)", channel: "Benjamín Cordero", duration: "6:17:22" },
  { id: "73eFWU-edO4", title: "CLAUDE CODE 2026: Curso Completo en Español", channel: "Benjamín Cordero", duration: "3:24:50" },
  { id: "GcsB5QrpMl0", title: "Claude Code Course: The Ultimate Guide from Scratch", channel: "render2web", duration: "1:17:14" },
  { id: "NCSf3iowOkY", title: "Claude Code Course in Spanish: Agent Skills", channel: "Daniel Ávila", duration: "52:56" },
  { id: "4obL9MvCtuE", title: "Curso GRATIS de Agentes IA: Clase 2 — MCP, Inspector, Mem0", channel: "Surfeando la nube", duration: "1:21:31" },
  { id: "UKPPhlikD0g", title: "Cómo Usar los Agentes Claude - Guía para Principiantes 2026", channel: "TechGuide Pro Español", duration: "1:39" },
  { id: "LG2pUYSZfNQ", title: "Claude Code Crea Agentes de n8n al INSTANTE", channel: "Juan Gabriel Gomila", duration: "41:32" },
  { id: "GT2Pv2rduCI", title: "Cómo Usar Claude para Crear Agentes de IA al Instante", channel: "racks", duration: "11:34" },
  { id: "The8LX-D5lY", title: "Crea tu primer Agente de IA (100% Autónomo) con Claude Code", channel: "MR. Grow", duration: "13:04" },
];

function renderVideos(containerId, videos) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = videos.map(v => `
    <div class="video-card">
      <div class="video-thumb" onclick="playVideo(this,'${v.id}')">
        <img src="https://img.youtube.com/vi/${v.id}/hqdefault.jpg" alt="${v.title}" loading="lazy">
        <div class="video-play"><span><i class="fa-solid fa-play"></i></span></div>
      </div>
      <div class="video-meta">
        <div class="video-title">${v.title}</div>
        <div class="video-info"><span>${v.channel}</span><span>${v.duration}</span></div>
      </div>
    </div>
  `).join('');
}

function playVideo(thumbEl, videoId) {
  thumbEl.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1" title="YouTube video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
}

renderVideos('videosBeginner', VIDEOS_BEGINNER);
renderVideos('videosAdvanced', VIDEOS_ADVANCED);

/* ── Pull-up word wrap ── */
function wrapWordsPullUp(el, baseDelay = 0, stagger = 0.08) {
  const text = el.textContent.trim();
  const words = text.split(/\s+/);
  el.innerHTML = words.map((w, i) =>
    `<span class="word" style="animation-delay:${(baseDelay + i * stagger).toFixed(2)}s">${w}${i < words.length - 1 ? '&nbsp;' : ''}</span>`
  ).join('');
}

function wrapWordsMultiStyle(el, stagger = 0.08) {
  const segs = el.querySelectorAll('.seg');
  let globalIndex = 0;
  segs.forEach(seg => {
    const style = seg.dataset.style;
    const words = seg.textContent.trim().split(/\s+/);
    seg.innerHTML = words.map(w => {
      const delay = (globalIndex++ * stagger).toFixed(2);
      return `<span class="word" style="animation-delay:${delay}s" data-style="${style}">${w}</span>`;
    }).join(' ');
  });
}

const heroTitle = document.getElementById('pullTitle');
if (heroTitle) wrapWordsPullUp(heroTitle, 0.15, 0.1);

const aboutHeading = document.getElementById('aboutHeading');
if (aboutHeading) wrapWordsMultiStyle(aboutHeading, 0.05);

/* ── Scroll-linked character reveal for about paragraph ── */
function wrapCharsScroll(el) {
  const text = el.textContent;
  el.innerHTML = text.split('').map(c => `<span class="ch">${c === ' ' ? '&nbsp;' : c}</span>`).join('');
}
const scrollText = document.getElementById('scrollText');
if (scrollText) {
  wrapCharsScroll(scrollText);
  const chars = scrollText.querySelectorAll('.ch');
  const total = chars.length;

  function updateCharOpacity() {
    const rect = scrollText.getBoundingClientRect();
    const vh = window.innerHeight;
    // progress: 0 when element top at 80% of viewport, 1 when bottom at 20%
    const start = vh * 0.8;
    const end = vh * 0.2;
    const progress = Math.min(Math.max((start - rect.top) / (start - end), 0), 1);
    chars.forEach((ch, i) => {
      const charProgress = i / total;
      const range = 0.15;
      let charOpacity = (progress - (charProgress - range/2)) / range;
      charOpacity = Math.min(Math.max(charOpacity, 0.2), 1);
      ch.style.opacity = charOpacity;
    });
  }
  window.addEventListener('scroll', updateCharOpacity, { passive: true });
  updateCharOpacity();
}

/* ── Section scrolling ── */
function scrollToCourse() { document.getElementById('coursePage').scrollIntoView({ behavior: 'smooth' }); }
function scrollToHero() { document.getElementById('heroPage').scrollIntoView({ behavior: 'smooth' }); }

/* ── Module navigation ── */
let currentModule = 0;
const TOTAL = 10;

function gotoModule(idx) {
  document.querySelectorAll('.module-section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.mod-nav').forEach(b => b.classList.remove('active'));
  const target = document.getElementById('mod' + idx);
  if (target) { target.classList.add('active'); document.querySelector('.module-content').scrollTop = 0; }
  const navBtns = document.querySelectorAll('.mod-nav');
  if (navBtns[idx]) navBtns[idx].classList.add('active');
  currentModule = idx;
  updateProgress();
  scrollToCourse();
}

function jumpToModule(idx) { gotoModule(idx); }

function updateProgress() {
  const pct = Math.round(((currentModule + 1) / TOTAL) * 100);
  const fill = document.getElementById('progressFill');
  const label = document.getElementById('progressLabel');
  if (fill) fill.style.width = pct + '%';
  if (label) label.textContent = pct + '%';
}

/* ── Quiz handler ── */
function doQuiz(quizId, btn, result) {
  const block = document.getElementById(quizId);
  const opts = block.querySelectorAll('.qopt');
  const fb = document.getElementById(quizId + '-fb');
  opts.forEach(o => o.disabled = true);
  if (result === 'correct') {
    btn.classList.add('correct');
    fb.className = 'quiz-fb show correct';
    fb.textContent = '✅ ¡Correcto!';
  } else {
    btn.classList.add('wrong');
    opts.forEach(o => { if (o.getAttribute('onclick')?.includes("'correct'")) o.classList.add('correct'); });
    fb.className = 'quiz-fb show wrong';
    fb.textContent = '❌ No exactamente. Revisa la explicación del módulo.';
  }
}

/* ── Init ── */
updateProgress();
