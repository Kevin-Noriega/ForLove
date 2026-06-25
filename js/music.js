/* ============================================================
   YULIA GIFT PAGE — music.js
   Reproductor de música elegante con playlist
   ============================================================ */

/* ──────────────────────────────────────────────
   PLAYLIST — edita aquí para agregar canciones

   title  : nombre de la canción
   artist : artista
   src    : ruta al archivo de audio (ej. "assets/music/cancion.mp3")
   cover  : ruta a imagen de portada O emoji
            Si usas emoji escribe "emoji:🎵"
            Si usas imagen escribe "assets/images/cover1.jpg"
────────────────────────────────────────────── */
const songs = [
  {
    title:  'Agrega tus canciones',
    artist: 'En music.js → const songs',
    src:    '',
    cover:  'emoji:🎵',
  },
  /* Ejemplo con archivo real:
  {
    title:  'A Sky Full of Stars',
    artist: 'Coldplay',
    src:    'assets/music/sky.mp3',
    cover:  'assets/images/sky-cover.jpg',
  },
  */
];

/* ════════════════════════════════════════════
   ESTADO
════════════════════════════════════════════ */
let currentIndex = 0;
let isPlaying = false;

const audio    = document.getElementById('audio-player');
const playBtn  = document.getElementById('play-btn');
const prevBtn  = document.getElementById('prev-btn');
const nextBtn  = document.getElementById('next-btn');
const progress = document.getElementById('player-progress');
const volSlider= document.getElementById('volume-slider');
const titleEl  = document.getElementById('player-title');
const artistEl = document.getElementById('player-artist');
const coverEl  = document.getElementById('player-cover');
const coverEmojiEl = document.getElementById('cover-emoji');
const timeCurrent  = document.getElementById('time-current');
const timeTotal    = document.getElementById('time-total');
const playlist = document.getElementById('playlist');
const vinylRing= document.getElementById('vinyl-ring');

/* ── RENDER PLAYLIST ── */
function renderPlaylist() {
  playlist.innerHTML = '';
  songs.forEach((song, i) => {
    const item = document.createElement('div');
    item.className = 'playlist-item' + (i === currentIndex ? ' active' : '');
    item.dataset.index = i;

    const coverHTML = buildCoverHTML(song.cover, 'plist-cover');

    item.innerHTML = `
      ${coverHTML}
      <div class="plist-info">
        <p class="plist-title">${song.title}</p>
        <p class="plist-artist">${song.artist}</p>
      </div>
      <span class="plist-playing">${i === currentIndex && isPlaying ? '♪' : ''}</span>
    `;
    item.addEventListener('click', () => loadSong(i, true));
    playlist.appendChild(item);
  });
}

/* ── PORTADA DINÁMICA ── */
function buildCoverHTML(cover, className) {
  if (!cover || cover.startsWith('emoji:')) {
    const emoji = cover ? cover.replace('emoji:', '') : '🎵';
    return `<div class="${className}"><span>${emoji}</span></div>`;
  }
  return `<div class="${className}"><img src="${cover}" alt="portada" loading="lazy" /></div>`;
}

function updateMainCover(cover) {
  if (!cover || cover.startsWith('emoji:')) {
    const emoji = cover ? cover.replace('emoji:', '') : '🎵';
    coverEl.innerHTML = `<span id="cover-emoji">${emoji}</span>`;
    coverEl.style.background = '';
  } else {
    coverEl.innerHTML = `<img src="${cover}" alt="portada" />`;
    coverEl.style.background = 'none';
  }
}

/* ── CARGAR CANCIÓN ── */
function loadSong(index, autoPlay = false) {
  currentIndex = index;
  const song = songs[index];

  titleEl.textContent  = song.title;
  artistEl.textContent = song.artist;
  updateMainCover(song.cover);

  if (song.src) {
    audio.src = song.src;
    audio.volume = parseFloat(volSlider.value);
    if (autoPlay) {
      audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    } else {
      setPlaying(false);
      audio.load();
    }
  } else {
    setPlaying(false);
    titleEl.textContent = song.title;
    artistEl.textContent('Agrega el archivo de audio en assets/music/');
  }

  progress.value = 0;
  timeCurrent.textContent = '0:00';
  timeTotal.textContent   = '0:00';
  renderPlaylist();
}

/* ── ESTADO PLAY/PAUSE ── */
function setPlaying(state) {
  isPlaying = state;
  playBtn.textContent = state ? '⏸' : '▶';
  if (state) {
    vinylRing.classList.add('spinning');
  } else {
    vinylRing.classList.remove('spinning');
  }
}

/* ── FORMATEAR TIEMPO ── */
function fmtTime(s) {
  if (!isFinite(s)) return '0:00';
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60).toString().padStart(2, '0');
  return `${m}:${sec}`;
}

/* ── EVENTOS DE AUDIO ── */
audio.addEventListener('timeupdate', () => {
  if (!audio.duration) return;
  const pct = (audio.currentTime / audio.duration) * 100;
  progress.value = pct;
  timeCurrent.textContent = fmtTime(audio.currentTime);
});

audio.addEventListener('loadedmetadata', () => {
  timeTotal.textContent = fmtTime(audio.duration);
});

audio.addEventListener('ended', () => {
  const next = (currentIndex + 1) % songs.length;
  loadSong(next, true);
});

audio.addEventListener('play',  () => { setPlaying(true);  renderPlaylist(); });
audio.addEventListener('pause', () => { setPlaying(false); renderPlaylist(); });

/* ── CONTROLES ── */
playBtn.addEventListener('click', () => {
  if (!audio.src && songs[currentIndex].src) {
    loadSong(currentIndex, true);
    return;
  }
  if (isPlaying) {
    audio.pause();
  } else {
    if (audio.src) {
      audio.play().catch(() => {});
    }
  }
});

prevBtn.addEventListener('click', () => {
  if (audio.currentTime > 3) {
    audio.currentTime = 0;
  } else {
    const prev = (currentIndex - 1 + songs.length) % songs.length;
    loadSong(prev, isPlaying);
  }
});

nextBtn.addEventListener('click', () => {
  const next = (currentIndex + 1) % songs.length;
  loadSong(next, isPlaying);
});

progress.addEventListener('input', () => {
  if (audio.duration) {
    audio.currentTime = (progress.value / 100) * audio.duration;
  }
});

volSlider.addEventListener('input', () => {
  audio.volume = parseFloat(volSlider.value);
});

/* ── INICIALIZAR ── */
(function init() {
  if (songs.length > 0) {
    loadSong(0, false);
  }
  volSlider.value = 0.7;
  audio.volume = 0.7;
})();
