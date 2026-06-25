/* ============================================================
   YULIA GIFT PAGE — main.js
   ============================================================ */

/* ── DATOS ── */
const PRINCIPIOS = [
  { icon: '😊', title: 'Sonríe', desc: 'Una sonrisa genuina abre corazones y rompe barreras mejor que cualquier palabra.' },
  { icon: '👂', title: 'Escucha más', desc: 'Las personas adoran sentirse escuchadas. Tu atención es el regalo más valioso.' },
  { icon: '📛', title: 'Recuerda los nombres', desc: 'El nombre propio es la palabra más dulce para cualquier persona.' },
  { icon: '💛', title: 'Interésate por los demás', desc: 'La curiosidad genuina por la vida de otros crea conexiones profundas.' },
  { icon: '🕊️', title: 'Evita discusiones', desc: 'Nadie cambia su mente por ganar una discusión. Elige la paz sobre la razón.' },
  { icon: '⭐', title: 'Hazlos sentir importantes', desc: 'Haz que cada persona sienta que importa. Porque de verdad importa.' },
  { icon: '🙌', title: 'Elogia honestamente', desc: 'Un cumplido sincero puede cambiar el día de alguien para siempre.' },
  { icon: '🌱', title: 'Habla de sus intereses', desc: 'Conectar desde los intereses del otro es la clave de toda conversación memorable.' },
];

const TIPS = [
  { icon: '🌬️', title: 'Respira profundo', desc: 'Inhala 4 segundos, retén 4, exhala 4. Calma el sistema nervioso al instante.' },
  { icon: '🪞', title: 'Practica frente al espejo', desc: 'Habla contigo misma. Observa tu lenguaje corporal y practica tu sonrisa.' },
  { icon: '🐢', title: 'Habla lentamente', desc: 'La pausa da autoridad. Hablar despacio proyecta confianza y claridad.' },
  { icon: '😄', title: 'Sonríe al hablar', desc: 'Tu sonrisa relaja al público y te relaja a ti. Es magia bidireccional.' },
  { icon: '💜', title: 'Nadie es perfecto', desc: 'El público quiere que lo hagas bien. Te desean éxito desde el primer segundo.' },
  { icon: '⚡', title: 'Miedo = emoción', desc: 'Los nervios y la emoción se sienten igual. Dile a tu mente: "¡Estoy emocionada!"' },
];

const FRASES = [
  'Tu voz importa. 💜',
  '¡Puedes hacerlo! ✨',
  'Cada gran oradora empezó teniendo miedo. 🌸',
  'Confía en ti. 💪',
  'El mundo necesita escuchar tus ideas. 🌍',
  'Eres más valiente de lo que crees. 🦋',
  'Tu historia merece ser contada. 📖',
];

const RETOS = [
  { icon: '👋', text: 'Saludar a alguien nuevo' },
  { icon: '🪞', text: 'Hablar frente al espejo 2 minutos' },
  { icon: '📖', text: 'Contar una historia a un amigo' },
  { icon: '🙋', text: 'Hacer una pregunta en clase' },
  { icon: '🎤', text: 'Dar una pequeña presentación' },
];

const CHIBI_MESSAGES = [
  '¡Ánimo Yulia! 💕',
  '¡Eres increíble! ✨',
  '¡Tú puedes! 🌸',
  '¡Qué valiente! 💪',
  '¡Te admiro! 🦋',
  '¡Sigue adelante! ⭐',
];

/* ── FECHA DE CREACIÓN DEL REGALO (cambia si quieres) ── */
const GIFT_CREATION_DATE = new Date('2025-01-01');

/* ════════════════════════════════════════════
   INICIALIZACIÓN
════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initDarkMode();
  initOpenGift();
  initPrincipios();
  initTips();
  initFrases();
  initChecklist();
  initDaysCounter();
  initScrollReveal();
  initChibi();
  initSakuraCanvas();
  initTypewriter();
});

/* ── PARTÍCULAS FLOTANTES ── */
function initParticles() {
  const container = document.getElementById('particles-container');
  const emojis = ['🌸', '✨', '💕', '🌷', '⭐', '💜', '🌙', '🦋'];
  const count = 22;

  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.className = 'particle';
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.left = Math.random() * 100 + 'vw';
    el.style.animationDuration = (8 + Math.random() * 14) + 's';
    el.style.animationDelay = (Math.random() * 12) + 's';
    el.style.fontSize = (10 + Math.random() * 14) + 'px';
    container.appendChild(el);
  }
}

/* ── MODO OSCURO ── */
function initDarkMode() {
  const btn = document.getElementById('dark-toggle');
  const body = document.body;
  const saved = localStorage.getItem('yulia-dark');

  if (saved === 'true') {
    body.classList.replace('light-mode', 'dark-mode');
    btn.textContent = '☀️';
  }

  btn.addEventListener('click', () => {
    const isDark = body.classList.contains('dark-mode');
    if (isDark) {
      body.classList.replace('dark-mode', 'light-mode');
      btn.textContent = '🌙';
      localStorage.setItem('yulia-dark', 'false');
    } else {
      body.classList.replace('light-mode', 'dark-mode');
      btn.textContent = '☀️';
      localStorage.setItem('yulia-dark', 'true');
    }
  });
}

/* ── BOTÓN ABRIR REGALO ── */
function initOpenGift() {
  document.getElementById('open-gift-btn').addEventListener('click', () => {
    const firstSection = document.getElementById('dedicatoria');
    firstSection.classList.add('visible');
    firstSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => startTypewriter(), 600);
  });
}

/* ── MÁQUINA DE ESCRIBIR ── */
const CARTA = `Yulia, sé que hablar en público\na veces da miedo,\n\npero también sé que tienes\nmuchas cosas bonitas que decir.\n\nEsta página y este libro son\nun pequeño recordatorio\nde que puedes lograr todo\nlo que te propongas. 🌸`;

let typeIndex = 0;
let typeStarted = false;

function startTypewriter() {
  if (typeStarted) return;
  typeStarted = true;
  const el = document.getElementById('typewriter-text');
  el.textContent = '';
  typeIndex = 0;
  typeNext(el);
}

function typeNext(el) {
  if (typeIndex < CARTA.length) {
    el.textContent += CARTA[typeIndex];
    typeIndex++;
    setTimeout(() => typeNext(el), typeIndex < 5 ? 80 : 38);
  } else {
    document.getElementById('type-cursor').style.display = 'none';
  }
}

/* ── CARDS PRINCIPIOS ── */
function initPrincipios() {
  const grid = document.getElementById('principios-grid');
  PRINCIPIOS.forEach((p, i) => {
    const card = document.createElement('div');
    card.className = 'kard';
    card.style.animationDelay = (i * 0.15) + 's';
    card.innerHTML = `
      <span class="kard-icon">${p.icon}</span>
      <p class="kard-title">${p.title}</p>
      <p class="kard-desc">${p.desc}</p>
    `;
    grid.appendChild(card);
  });
}

/* ── CARDS TIPS ── */
function initTips() {
  const grid = document.getElementById('tips-grid');
  TIPS.forEach((t, i) => {
    const card = document.createElement('div');
    card.className = 'kard';
    card.style.animationDelay = (i * 0.15) + 's';
    card.innerHTML = `
      <span class="kard-icon">${t.icon}</span>
      <p class="kard-title">${t.title}</p>
      <p class="kard-desc">${t.desc}</p>
    `;
    grid.appendChild(card);
  });
}

/* ── FRASES ROTATIVAS ── */
function initFrases() {
  const textEl = document.getElementById('quote-text');
  const dotsEl = document.getElementById('quote-dots');
  let current = 0;

  FRASES.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'qdot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => showQuote(i));
    dotsEl.appendChild(dot);
  });

  function showQuote(idx) {
    textEl.style.opacity = '0';
    setTimeout(() => {
      textEl.textContent = FRASES[idx];
      textEl.style.opacity = '1';
      current = idx;
      document.querySelectorAll('.qdot').forEach((d, i) =>
        d.classList.toggle('active', i === idx)
      );
    }, 300);
  }

  showQuote(0);
  setInterval(() => showQuote((current + 1) % FRASES.length), 3500);
}

/* ── CHECKLIST ── */
function initChecklist() {
  const list = document.getElementById('checklist');
  const progressText = document.getElementById('progress-text');
  const progressFill = document.getElementById('progress-fill');
  const congrats = document.getElementById('congrats-msg');

  const saved = JSON.parse(localStorage.getItem('yulia-retos') || '[]');

  RETOS.forEach((reto, i) => {
    const li = document.createElement('li');
    li.className = 'checklist-item' + (saved[i] ? ' done' : '');
    li.innerHTML = `
      <div class="check-box">${saved[i] ? '✓' : ''}</div>
      <span class="check-icon">${reto.icon}</span>
      <span class="check-label">${reto.text}</span>
    `;
    li.addEventListener('click', () => toggle(i, li));
    list.appendChild(li);
  });

  function toggle(idx, el) {
    const state = JSON.parse(localStorage.getItem('yulia-retos') || '[]');
    state[idx] = !state[idx];
    localStorage.setItem('yulia-retos', JSON.stringify(state));

    el.classList.toggle('done', state[idx]);
    el.querySelector('.check-box').textContent = state[idx] ? '✓' : '';

    updateProgress(state);
  }

  function updateProgress(state) {
    const done = state.filter(Boolean).length;
    const total = RETOS.length;
    progressText.textContent = `${done} / ${total} completados`;
    progressFill.style.width = (done / total * 100) + '%';
    if (done === total) {
      congrats.classList.remove('hidden');
    }
  }

  updateProgress(saved);
}

/* ── CONTADOR DE DÍAS ── */
function initDaysCounter() {
  const saved = localStorage.getItem('yulia-gift-date');
  if (!saved) {
    localStorage.setItem('yulia-gift-date', GIFT_CREATION_DATE.toISOString());
  }
  const created = new Date(saved || GIFT_CREATION_DATE);
  const diff = Math.floor((Date.now() - created.getTime()) / 86400000);
  const el = document.getElementById('days-counter');
  if (el) el.textContent = diff;
}

/* ── SCROLL REVEAL ── */
function initScrollReveal() {
  const sections = document.querySelectorAll('.hidden-section');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        const id = entry.target.id;
        if (id === 'dedicatoria' && !typeStarted) {
          setTimeout(startTypewriter, 400);
        }
        if (id === 'final') initSakuraFall();
      }
    });
  }, { threshold: 0.12 });

  sections.forEach(s => observer.observe(s));
}

/* ── CHIBI CHARACTER ── */
function initChibi() {
  const chibi = document.getElementById('chibi-character');
  const bubble = document.getElementById('chibi-bubble');
  let msgIdx = 0;

  chibi.addEventListener('click', () => {
    msgIdx = (msgIdx + 1) % CHIBI_MESSAGES.length;
    bubble.style.animation = 'none';
    bubble.textContent = CHIBI_MESSAGES[msgIdx];
    void bubble.offsetWidth;
    bubble.style.animation = 'bubblePop .4s ease';
  });

  setInterval(() => {
    msgIdx = (msgIdx + 1) % CHIBI_MESSAGES.length;
    bubble.style.animation = 'none';
    bubble.textContent = CHIBI_MESSAGES[msgIdx];
    void bubble.offsetWidth;
    bubble.style.animation = 'bubblePop .4s ease';
  }, 5000);
}

/* ── CANVAS SAKURA (sección final) ── */
let sakuraRunning = false;

function initSakuraCanvas() {
  /* se activa cuando la sección es visible */
}

function initSakuraFall() {
  if (sakuraRunning) return;
  sakuraRunning = true;

  const canvas = document.getElementById('sakura-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const petals = Array.from({ length: 40 }, () => createPetal(canvas));

  function createPetal(c, fromTop = false) {
    return {
      x: Math.random() * c.width,
      y: fromTop ? -20 : Math.random() * c.height,
      size: 6 + Math.random() * 10,
      speed: 0.6 + Math.random() * 1.2,
      drift: (Math.random() - 0.5) * 0.8,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.04,
      opacity: 0.4 + Math.random() * 0.5,
      color: ['#ffb7c5', '#f9a8d4', '#d8b4fe', '#fbcfe8'][Math.floor(Math.random() * 4)],
    };
  }

  function drawPetal(p) {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation);
    ctx.globalAlpha = p.opacity;
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.ellipse(0, 0, p.size, p.size * 0.55, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    petals.forEach(p => {
      p.y += p.speed;
      p.x += p.drift;
      p.rotation += p.rotSpeed;
      if (p.y > canvas.height + 20) {
        Object.assign(p, createPetal(canvas, true));
      }
      drawPetal(p);
    });
    requestAnimationFrame(loop);
  }
  loop();
}
