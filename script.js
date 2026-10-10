/**
 * Developer's Room - Interactive Lo-Fi Radio & Room Scene
 * Features:
 * - Barber Shop Bangers Complete Songs Audio Player (Full duration, no 30s cutoffs)
 * - Complete responsive support for both Android and iOS
 * - Procedural scene details (lights, motes, skyline, hair texture, clock)
 * - Self-typing monitor code animation
 */
(function () {
  'use strict';

  var $ = function (s) { return document.querySelector(s); };
  var $$ = function (s) { return document.querySelectorAll(s); };
  var NS = 'http://www.w3.org/2000/svg';
  var REDUCED = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var MONO = 'JetBrains Mono,DejaVu Sans Mono,monospace';

  var seed = 11;
  function rnd() {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  }

  function el(name, attrs, parent) {
    var n = document.createElementNS(NS, name);
    for (var k in attrs) n.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(n);
    return n;
  }

  /* ---------- Mobile (Android & iOS) Dynamic SVG Framing ---------- */
  function updateViewBox() {
    var svg = document.querySelector('.stage > svg');
    if (!svg) return;
    var w = window.innerWidth;
    var h = window.innerHeight;
    var aspect = w / h;

    if (aspect < 0.76) {
      // Tall portrait phone (iPhone, Android portrait: ~9:19 to 9:21)
      // Frames the developer at desk, typing hands, Raghab photo, and monitor
      svg.setAttribute('viewBox', '320 110 940 690');
    } else if (aspect < 1.15) {
      // Tablets / Foldables
      svg.setAttribute('viewBox', '200 60 1200 740');
    } else {
      // Desktop / Landscape
      svg.setAttribute('viewBox', '0 0 1600 800');
    }
  }
  window.addEventListener('resize', updateViewBox);
  window.addEventListener('orientationchange', updateViewBox);
  updateViewBox();

  /* ---------- Scene decoration ---------- */
  // Lit windows on skyline
  var bw = $('#bwin');
  if (bw) {
    var bldgs = [
      [1242, 382, 50, 56],
      [1286, 352, 44, 86],
      [1326, 392, 56, 46],
      [1380, 340, 50, 98],
      [1426, 372, 46, 66],
      [1468, 354, 60, 84]
    ];
    bldgs.forEach(function (b) {
      for (var x = b[0] + 7; x < b[0] + b[2] - 8; x += 12) {
        for (var y = b[1] + 8; y < b[1] + b[3] - 8; y += 14) {
          if (rnd() < 0.34) {
            el('rect', { x: x, y: y, width: 6, height: 8, fill: '#fff4cf', opacity: '.9' }, bw);
          }
        }
      }
    });
  }

  // String fairy lights ("lichu lights")
  var lights = $('#lights');
  if (lights) {
    var colors = ['#ffb454', '#ffd9a0', '#ffb454', '#78e0cc', '#ffd9a0', '#e87a90'];
    var n = 0;
    for (var s = 0; s < 4; s++) {
      var x0 = s * 400, x1 = x0 + 400, cx = x0 + 200, y0 = 20, cy = 118;
      el('path', { d: 'M' + x0 + ',' + y0 + ' Q' + cx + ',' + cy + ' ' + x1 + ',' + y0, fill: 'none', stroke: '#3a4660', 'stroke-width': 2 }, lights);
      for (var k = 1; k <= 8; k++) {
        var t = k / 9, u = 1 - t;
        var px = u * u * x0 + 2 * u * t * cx + t * t * x1;
        var py = u * u * y0 + 2 * u * t * cy + t * t * y0 + 8;
        var col = colors[n % colors.length];
        var g = el('g', { 'class': 'tw' }, lights);
        g.style.animationDelay = '-' + ((n * 0.37) % 3.4).toFixed(2) + 's';
        g.style.color = col;
        el('circle', { cx: px.toFixed(1), cy: (py + 3).toFixed(1), r: 14, fill: col, opacity: '.2' }, g);
        el('circle', { cx: px.toFixed(1), cy: (py + 3).toFixed(1), r: 7, fill: col, opacity: '.35' }, g);
        el('ellipse', { cx: px.toFixed(1), cy: (py + 3).toFixed(1), rx: 4, ry: 6, fill: col }, g);
        n++;
      }
    }
  }

  // Twinkling night stars in window sky (visible in Dark Mode)
  var stars = $('#night-stars');
  if (stars) {
    for (var si = 0; si < 46; si++) {
      var sx = 1246 + rnd() * 276;
      var sy = 116 + rnd() * 220;
      var sr = (0.7 + rnd() * 1.5).toFixed(1);
      var sop = (0.35 + rnd() * 0.65).toFixed(2);
      var sDot = el('circle', {
        cx: sx.toFixed(1),
        cy: sy.toFixed(1),
        r: sr,
        fill: '#ffffff',
        opacity: sop
      }, stars);
      sDot.setAttribute('class', 'tw');
      sDot.style.animationDelay = '-' + (rnd() * 3.5).toFixed(2) + 's';
      sDot.style.animationDuration = (1.8 + rnd() * 2.4).toFixed(2) + 's';
    }
  }

  // Dust motes floating in sunbeam
  var motes = $('#motes');
  if (motes) {
    for (var i = 0; i < 34; i++) {
      var tt = rnd(), ss = rnd();
      var bx = 1232 + (560 - 1232) * tt;
      var bt = 150 + (500 - 150) * tt;
      var bb = 450 + (790 - 450) * tt;
      var m = el('circle', {
        cx: bx.toFixed(1),
        cy: (bt + (bb - bt) * ss).toFixed(1),
        r: (0.8 + rnd() * 1.8).toFixed(2),
        fill: '#fffbe6'
      }, motes);
      m.setAttribute('class', 'mote');
      m.style.animationDuration = (6 + rnd() * 8).toFixed(1) + 's';
      m.style.animationDelay = '-' + (rnd() * 8).toFixed(1) + 's';
    }
  }

  // Hair strands for texture
  var strands = $('#strands');
  if (strands) {
    var hc = ['#3b2e27', '#0c0807', '#5a463a', '#241b17', '#70594b'];
    for (var h = 0; h < 90; h++) {
      var ang = Math.PI * (0.02 + rnd() * 0.96);
      var r0 = 4 + rnd() * 26;
      var len = 22 + rnd() * 52;
      var sx = 950 + Math.cos(ang) * r0 * 1.1;
      var sy = 348 + Math.sin(ang) * r0;
      var ex = 950 + Math.cos(ang) * (r0 + len) * 1.05;
      var ey = 348 + Math.sin(ang) * (r0 + len) * 1.15;
      el('path', {
        d: 'M' + sx.toFixed(1) + ',' + sy.toFixed(1) + ' Q' + ((sx + ex) / 2 + (rnd() - 0.5) * 8).toFixed(1) + ',' + ((sy + ey) / 2).toFixed(1) + ' ' + ex.toFixed(1) + ',' + ey.toFixed(1),
        fill: 'none',
        stroke: hc[Math.floor(rnd() * hc.length)],
        'stroke-width': (0.7 + rnd() * 1.1).toFixed(2),
        'stroke-opacity': (0.3 + rnd() * 0.5).toFixed(2),
        'stroke-linecap': 'round'
      }, strands);
    }
  }

  // Real-time analog and digital clock
  function clock() {
    var d = new Date();
    var clk = $('#clk');
    if (clk) clk.textContent = d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false });
    var mi = d.getMinutes(), hr = d.getHours() % 12, se = d.getSeconds();
    var hh = $('#hh'), mm = $('#mm'), ss = $('#ss');
    if (hh) hh.setAttribute('transform', 'rotate(' + ((hr + mi / 60) * 30) + ')');
    if (mm) mm.setAttribute('transform', 'rotate(' + (mi * 6 + se / 10) + ')');
    if (ss) ss.setAttribute('transform', 'rotate(' + (se * 6) + ')');
  }
  clock();
  setInterval(clock, 1000);

  // Parallax interaction on pointer (disabled on touch devices for smoothness)
  var stage = $('#stage');
  if (stage && !REDUCED && window.matchMedia('(hover: hover)').matches) {
    stage.addEventListener('pointermove', function (e) {
      var r = stage.getBoundingClientRect();
      stage.style.setProperty('--mx', (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
      stage.style.setProperty('--my', (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
    });
    stage.addEventListener('pointerleave', function () {
      stage.style.setProperty('--mx', 0);
      stage.style.setProperty('--my', 0);
    });
  }

  /* ---------- Code editor that types itself ---------- */
  var SNIPPETS = [
    { file: 'player.js', code: ['import { Playlist } from "./room";', '', '// 2 AM. Hostel Room 4012. Indian Barber Shop Bangers playing.', 'function playNext(song) {', '  if (!song) return;', '  player.load(song);', '  player.play();', '}'] },
    { file: 'chai.js', code: ['const chai = { temp: 90, sugar: 2 };', '', 'setInterval(() => {', '  chai.temp -= 1;', '  if (chai.temp < 40) {', '    console.log("cold again");', '  }', '}, 60000);'] },
    { file: 'deploy.js', code: ['async function deploy() {', '  await run("npm test");', '  await run("npm run build");', '  console.log("shipped. now sleep.");', '}', '', 'deploy();'] }
  ];
  var COL = { p: '#d7dbe6', kw: '#e87a90', str: '#78e0cc', com: '#6b7694', fn: '#ffb454', num: '#c3a3ff' };
  var X_NUM = 852, X_CODE = 860, Y0 = 262, STEP = 15;
  var codeG = $('#code'), curEl = $('#cur'), stEl = $('#st'), stBg = $('#stbg');

  function tok(line) {
    var out = [], re = /(\/\/.*$)|("(?:[^"\\]|\\.)*")|\b(import|from|function|if|return|const|async|await|new)\b|\b(\d+)\b|\b([A-Za-z_]\w*)(?=\()/g, last = 0, m;
    while ((m = re.exec(line))) {
      if (m.index > last) out.push({ t: line.slice(last, m.index), c: 'p' });
      out.push({ t: m[0], c: m[1] ? 'com' : m[2] ? 'str' : m[3] ? 'kw' : m[4] ? 'num' : 'fn' });
      last = re.lastIndex;
    }
    if (last < line.length) out.push({ t: line.slice(last), c: 'p' });
    return out;
  }

  function sleep(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  function setStatus(msg, color) {
    if (stEl) stEl.textContent = msg;
    if (stBg) stBg.setAttribute('fill', color);
  }

  function buildLines(snip) {
    if (!codeG) return [];
    while (codeG.firstChild) codeG.removeChild(codeG.firstChild);
    var rows = [];
    snip.code.forEach(function (line, i) {
      var y = Y0 + i * STEP;
      var num = el('text', { x: X_NUM, y: y, 'text-anchor': 'end', 'font-family': MONO, 'font-size': 10.5, fill: '#6b7694' }, codeG);
      num.textContent = String(i + 1);
      num.setAttribute('opacity', '0');
      var txt = el('text', { x: X_CODE, y: y, 'font-family': MONO, 'font-size': 10.5, fill: COL.p, style: 'white-space:pre' }, codeG);
      var spans = tok(line).map(function (tk) {
        var sp = el('tspan', { fill: COL[tk.c] }, txt);
        return { sp: sp, full: tk.t };
      });
      rows.push({ num: num, txt: txt, spans: spans, y: y });
    });
    return rows;
  }

  function placeCursor(row) {
    if (!curEl || !row) return;
    var w = 0;
    try { w = row.txt.getComputedTextLength(); } catch (e) {}
    curEl.setAttribute('x', (X_CODE + w + 1).toFixed(1));
    curEl.setAttribute('y', row.y - 10);
  }

  var codeIdx = 0;
  async function codeLoop() {
    if (!codeG) return;
    while (true) {
      var snip = SNIPPETS[codeIdx % SNIPPETS.length];
      codeIdx++;
      var tab = $('#tab'), ttl = $('#ttl');
      if (tab) tab.textContent = snip.file;
      if (ttl) ttl.textContent = snip.file + ' - Hostel Radio';
      var rows = buildLines(snip);
      codeG.style.opacity = '1';
      setStatus('main    typing...', '#3b6fd0');
      for (var r = 0; r < rows.length; r++) {
        var row = rows[r];
        row.num.setAttribute('opacity', '1');
        placeCursor(row);
        for (var s = 0; s < row.spans.length; s++) {
          var part = row.spans[s];
          for (var c = 0; c < part.full.length; c++) {
            part.sp.textContent += part.full[c];
            placeCursor(row);
            await sleep(part.full[c] === ' ' ? 30 : 38 + rnd() * 62);
          }
        }
        await sleep(160 + rnd() * 260);
      }
      setStatus('main    building...', '#c9810f');
      await sleep(1000);
      setStatus('main    0 errors - build passing', '#1f9d7f');
      await sleep(3600);
      codeG.style.opacity = '0';
      await sleep(600);
    }
  }

  if (REDUCED) {
    var sn = SNIPPETS[0], rows0 = buildLines(sn);
    rows0.forEach(function (row) {
      row.num.setAttribute('opacity', '1');
      row.spans.forEach(function (p) { p.sp.textContent = p.full; });
    });
    setStatus('main    0 errors - build passing', '#1f9d7f');
    if (rows0.length > 0) placeCursor(rows0[rows0.length - 1]);
  } else {
    codeLoop();
  }

  /* ---------- Toast notification ---------- */
  var toastTimer = null;
  function flash(msg) {
    var toast = $('#toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      if (toast) toast.classList.remove('show');
    }, 4000);
  }

  function fmt(s) {
    if (!isFinite(s) || s < 0) s = 0;
    var m = Math.floor(s / 60), r = Math.floor(s % 60);
    return m + ':' + (r < 10 ? '0' : '') + r;
  }

  /* ---------- Both Playlists (Barber Shop Bangers & Bast by Raghab Barik) ---------- */
  var PLAYLISTS = [
    {
      id: "barbershop",
      name: "Indian Barber Shop Bangers",
      shortName: "Bast ✨",
      spotifyUrl: "https://open.spotify.com/playlist/2AVjI8Z57bqMJVtU3V9X1Q",
      tracks: [
        { title: "Mujhse Mohabbat Ka", artist: "Kumar Sanu, Alka Yagnik", ytId: "asVkFSVdJPo" },
        { title: "Tumsa Koi Pyaara", artist: "Kumar Sanu, Alka Yagnik", ytId: "HubRXgH0Erc" },
        { title: "Woh Meri Neend Mera Chain", artist: "Sadhana Sargam", ytId: "8gw2Roq-olo" },
        { title: "Saaton Janam Main Tere", artist: "Kumar Sanu, Alka Yagnik", ytId: "f0oiheLlFW4" },
        { title: "Bahut Pyar Karte Hai", artist: "S. P. Balasubrahmanyam", ytId: "mwvZM7KMcHM" },
        { title: "Jeeta Tha Jiske Liye", artist: "Kumar Sanu, Alka Yagnik", ytId: "fa5Yzxdh8e4" },
        { title: "Teri Umeed Tera Intezar", artist: "Kumar Sanu, Sadhana Sargam", ytId: "xvevXfFGPFY" },
        { title: "Tumse Milne Ko Dil", artist: "Alka Yagnik, Kumar Sanu", ytId: "5y_TCKNzAMI" },
        { title: "Ek Sanam Chahiye Aashiqui Ke Liye", artist: "Kumar Sanu", ytId: "fBylcT-TWZw" },
        { title: "Tu Pyar Hai Kisi Aur Ka", artist: "Anuradha Paudwal, Kumar Sanu", ytId: "U0qBRoeQa-g" },
        { title: "Sochenge Tumhe Pyar", artist: "Kumar Sanu", ytId: "lFdSi01tpYM" },
        { title: "Main Duniya Bhula Doonga", artist: "Kumar Sanu, Anuradha Paudwal", ytId: "otQmzlm-s7Q" },
        { title: "Tumhein Apna Banane Ki Kasam", artist: "Kumar Sanu", ytId: "-aMgmlXHoT4" },
        { title: "Tum Dil Ki Dhadkan Mein", artist: "Kumar Sanu", ytId: "ft4nRzX2oqA" },
        { title: "Dulhe Ka Sehra", artist: "Nusrat Fateh Ali Khan", ytId: "7LjT1TwzOd0" },
        { title: "Maine Pyar Tumhi Se Kiya Hai", artist: "Kumar Sanu, Anuradha Paudwal", ytId: "FbCvF0aDgwA" },
        { title: "Ab Tere Bin", artist: "Kumar Sanu", ytId: "rTatsmUgmiA" },
        { title: "Kitna Haseen Chehra", artist: "Kumar Sanu", ytId: "NzZxyWr9OA4" },
        { title: "Tujhko Na Dekhun", artist: "Sunidhi Chauhan, Udit Narayan", ytId: "geaqCxhfP5A" },
        { title: "Dheere Dheere Se Meri Zindagi", artist: "Kumar Sanu, Anuradha Paudwal", ytId: "KeyfUuXPOcY" }
      ]
    },
    {
      id: "bast",
      name: "Bast · Raghab Barik",
      shortName: "Barber Shop 📻",
      spotifyUrl: "https://open.spotify.com/playlist/3FW2n9AV1Ya1GC0zPJd9EW",
      tracks: [
        { title: "Shayar", artist: "Prabhakar Raj, LarkZ, Shubham J", ytId: "E2jRHx1ikCc" },
        { title: "Payal", artist: "faizal, Gravero", ytId: "W89QNDjqHmc" },
        { title: "Takkne", artist: "SARRB, Starboy X, Agaazz", ytId: "YsluzwCD9CQ" },
        { title: "Rehbara", artist: "Abhijeet Srivastava, Shayra Apoorva", ytId: "aTBRK-7fGNU" },
        { title: "Marz - E - Dawa", artist: "maahi, Hansika Pareek, Kalki, Devendra Dangi", ytId: "3jdie4jGQI8" },
        { title: "Dor", artist: "Krtin Kay, Aryann Shabin", ytId: "M9VvmJSmpQA" },
        { title: "Idhar Zara Sa Dekh Lo", artist: "Shikhar, Yashika Sikka", ytId: "M9DC3RximkQ" },
        { title: "Mastana", artist: "Zohaan", ytId: "vkm7tXzMb2U" },
        { title: "Na Hu Tera", artist: "Aryann Shabin", ytId: "k4qP8SWpllk" },
        { title: "Sapne", artist: "Maahir, Suyash", ytId: "sq0_S6mHVBo" },
        { title: "Dil Sukoon", artist: "Third Fret, HAVI", ytId: "CZEQyhxOack" },
        { title: "Mahi", artist: "AviVerse, Abhishek Shukla, Avinash Kumar, ABS", ytId: "Wp_4IY_aXS0" },
        { title: "Bairan 2", artist: "Prashansh", ytId: "5ScnZxCyRtQ" }
      ]
    }
  ];

  var currentPlaylistIdx = 0; // 0 = Barber Shop, 1 = Bast
  var currentIdx = 0;
  var isPlaying = false;
  var isSeeking = false;
  var ytPlayer = null;
  var ytReady = false;

  function getCurrentPlaylist() {
    return PLAYLISTS[currentPlaylistIdx];
  }

  function getCurrentTracks() {
    return PLAYLISTS[currentPlaylistIdx].tracks;
  }

  var els = {
    title: $('#t-title'),
    artist: $('#t-artist'),
    cur: $('#t-cur'),
    tot: $('#t-tot'),
    seek: $('#seek'),
    play: $('#btn-play'),
    icoPlay: $('.ico-play'),
    icoPause: $('.ico-pause'),
    prev: $('#btn-prev'),
    next: $('#btn-next'),
    drawerToggle: $('#btn-playlist-toggle'),
    drawerClose: $('#drawer-close'),
    playerCard: $('#player-card'),
    playlistList: $('#playlist-list'),
    playlistLabel: $('#playlist-btn-label'),
    playlistName: $('#p-playlist-name'),
    switchPlaylistBtn: $('#btn-switch-playlist'),
    switchBtnLabel: $('#switch-btn-label'),
    spCardLink: $('#sp-card-link'),
    spTopLink: $('#sp-top-link'),
    tabPl1: $('#tab-pl-1'),
    tabPl2: $('#tab-pl-2'),
    cassetteImg: $('#cassette-img'),
    cassetteDeck: $('#cassette-deck'),
    themeBtn: $('#btn-theme'),
    themeIcon: $('#theme-icon'),
    themeText: $('#theme-text'),
    deskLamp: $('#desk-lamp'),
    deskLampRight: $('#desk-lamp-right'),
    persistentAudio: $('#persistent-audio'),
    toast: $('#toast')
  };

  /* Render playlist drawer with highlight images for every song in active playlist */
  function renderPlaylist() {
    if (!els.playlistList) return;
    els.playlistList.innerHTML = '';
    var tracks = getCurrentTracks();
    tracks.forEach(function (tr, i) {
      var item = document.createElement('div');
      item.className = 'p-item' + (i === currentIdx ? ' is-active' : '');
      item.dataset.index = i;

      var num = document.createElement('span');
      num.className = 'p-item-num';
      num.textContent = (i + 1 < 10 ? '0' : '') + (i + 1);

      // Highlight thumbnail image for every song
      var thumb = document.createElement('img');
      thumb.className = 'p-item-thumb';
      thumb.src = 'https://img.youtube.com/vi/' + tr.ytId + '/mqdefault.jpg';
      thumb.alt = tr.title;
      thumb.loading = 'lazy';

      var info = document.createElement('div');
      info.className = 'p-item-info';

      var t = document.createElement('span');
      t.className = 'p-item-t';
      t.textContent = tr.title;

      var a = document.createElement('span');
      a.className = 'p-item-a';
      a.textContent = tr.artist;

      info.appendChild(t);
      info.appendChild(a);

      item.appendChild(num);
      item.appendChild(thumb);
      item.appendChild(info);

      item.addEventListener('click', function () {
        selectTrack(i, true);
        if (els.playerCard) els.playerCard.classList.remove('is-drawer-open');
      });

      els.playlistList.appendChild(item);
    });
  }

  function updateMeta() {
    var tracks = getCurrentTracks();
    var tr = tracks[currentIdx];
    if (!tr) return;
    var pl = getCurrentPlaylist();

    if (els.title) els.title.textContent = tr.title;
    if (els.artist) els.artist.textContent = tr.artist;
    if (els.playlistLabel) els.playlistLabel.textContent = '☰ ' + (currentIdx + 1) + '/' + tracks.length;
    if (els.playlistName) els.playlistName.textContent = pl.name;

    // Update the side rolling cassette highlight image
    if (els.cassetteImg) {
      els.cassetteImg.src = 'https://img.youtube.com/vi/' + tr.ytId + '/mqdefault.jpg';
      els.cassetteImg.alt = tr.title + ' - ' + tr.artist;
    }

    // Highlight active in playlist drawer
    if (els.playlistList) {
      var items = els.playlistList.querySelectorAll('.p-item');
      items.forEach(function (it, idx) {
        it.classList.toggle('is-active', idx === currentIdx);
      });
    }
  }

  /* ==========================================================================
     PERSISTENT HTML5 <audio> PLAYER & BACKGROUND PLAYBACK ENGINE
     Keeps audio running continuously while browsing DevRoom or when screen is turned off.
     ========================================================================== */
  var persistentAudio = els.persistentAudio || $('#persistent-audio');
  if (!persistentAudio) {
    persistentAudio = document.createElement('audio');
    persistentAudio.id = 'persistent-audio';
    persistentAudio.preload = 'auto';
    persistentAudio.setAttribute('playsinline', '');
    persistentAudio.setAttribute('webkit-playsinline', '');
    document.body.appendChild(persistentAudio);
    els.persistentAudio = persistentAudio;
  }

  // 1-second clean valid 44.1kHz silent WAV carrier to maintain hardware audio session in iOS Safari & Android Chrome
  var SILENT_AUDIO_URI = 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=';
  var persistentAudioActive = false;

  function ensurePersistentAudioPlaying() {
    if (!persistentAudio) return;
    try {
      if (!persistentAudio.src || persistentAudio.src === '' || persistentAudio.src.indexOf('data:audio') === -1) {
        persistentAudio.src = SILENT_AUDIO_URI;
        persistentAudio.loop = true;
      }
      var p = persistentAudio.play();
      if (p && typeof p.then === 'function') {
        p.then(function () {
          persistentAudioActive = true;
        }).catch(function () {
          // Will unlock on next user gesture
        });
      }
    } catch (e) {}
  }

  function pausePersistentAudio() {
    if (!persistentAudio) return;
    try {
      persistentAudio.pause();
    } catch (e) {}
  }

  /* ---------- Media Session API (System Lock Screen, Dynamic Island, Smartwatch) ---------- */
  function updateMediaSession() {
    if (!('mediaSession' in navigator)) return;
    var tracks = getCurrentTracks();
    var tr = tracks[currentIdx];
    if (!tr) return;
    var pl = getCurrentPlaylist();

    try {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: tr.title,
        artist: tr.artist,
        album: pl.name + ' · DevRoom Lo-Fi Radio',
        artwork: [
          { src: 'https://img.youtube.com/vi/' + tr.ytId + '/hqdefault.jpg', sizes: '480x360', type: 'image/jpeg' },
          { src: 'https://img.youtube.com/vi/' + tr.ytId + '/mqdefault.jpg', sizes: '320x180', type: 'image/jpeg' },
          { src: 'https://img.youtube.com/vi/' + tr.ytId + '/default.jpg', sizes: '120x90', type: 'image/jpeg' }
        ]
      });
      navigator.mediaSession.playbackState = isPlaying ? 'playing' : 'paused';
    } catch (e) {}
  }

  function seekTo(targetSec) {
    if (ytPlayer && ytReady && typeof ytPlayer.seekTo === 'function') {
      ytPlayer.seekTo(targetSec, true);
    }
    if ('mediaSession' in navigator && navigator.mediaSession.setPositionState) {
      try {
        var dur = (ytPlayer && ytReady && ytPlayer.getDuration) ? ytPlayer.getDuration() : 0;
        navigator.mediaSession.setPositionState({
          duration: Math.max(0, dur),
          playbackRate: 1,
          position: Math.min(targetSec, dur)
        });
      } catch (e) {}
    }
  }

  function initMediaSession() {
    if (!('mediaSession' in navigator)) return;

    var handlers = {
      play: function () { if (!isPlaying) togglePlay(); },
      pause: function () { if (isPlaying) togglePlay(); },
      previoustrack: function () { selectTrack(currentIdx - 1, true); },
      nexttrack: function () { selectTrack(currentIdx + 1, true); },
      stop: function () { if (isPlaying) togglePlay(); },
      seekto: function (details) {
        if (details && details.seekTime != null) {
          seekTo(details.seekTime);
        }
      }
    };

    for (var act in handlers) {
      try {
        navigator.mediaSession.setActionHandler(act, handlers[act]);
      } catch (e) {}
    }
  }
  initMediaSession();

  /* ---------- Screen Wake Lock API (keeps screen awake while viewing DevRoom) ---------- */
  var wakeLock = null;
  async function requestWakeLock() {
    if ('wakeLock' in navigator && isPlaying && !wakeLock) {
      try {
        wakeLock = await navigator.wakeLock.request('screen');
        wakeLock.addEventListener('release', function () {
          wakeLock = null;
        });
      } catch (e) {}
    }
  }

  function releaseWakeLock() {
    if (wakeLock) {
      try { wakeLock.release(); } catch (e) {}
      wakeLock = null;
    }
  }

  /* ---------- Background Audio Keepalive (Screen turned off or browsing away) ---------- */
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      // Screen locked/turned off or user switched tab/app:
      // Keep persistent HTML5 audio player alive and ensure YouTube audio engine continues!
      if (isPlaying) {
        ensurePersistentAudioPlaying();
        if (ytPlayer && ytReady && typeof ytPlayer.playVideo === 'function') {
          try { ytPlayer.playVideo(); } catch (e) {}
        }
      }
    } else {
      // User turned screen back on or returned to DevRoom:
      if (isPlaying) {
        requestWakeLock();
        updateMediaSession();
      }
    }
  });

  function setPlayState(playing) {
    isPlaying = playing;
    document.body.classList.toggle('is-playing', playing);
    if (els.icoPlay) els.icoPlay.style.display = playing ? 'none' : 'block';
    if (els.icoPause) els.icoPause.style.display = playing ? 'block' : 'none';
    if (els.play) els.play.setAttribute('aria-label', playing ? 'Pause song' : 'Play song');

    if (playing) {
      ensurePersistentAudioPlaying();
      requestWakeLock();
    } else {
      pausePersistentAudio();
      releaseWakeLock();
    }

    if ('mediaSession' in navigator) {
      try {
        navigator.mediaSession.playbackState = playing ? 'playing' : 'paused';
      } catch (e) {}
    }
  }

  function selectTrack(idx, autoPlay) {
    var tracks = getCurrentTracks();
    currentIdx = (idx + tracks.length) % tracks.length;
    updateMeta();
    updateMediaSession();
    var tr = tracks[currentIdx];

    if (autoPlay) {
      ensurePersistentAudioPlaying();
      requestWakeLock();
    }

    if (ytPlayer && ytReady) {
      if (autoPlay) {
        ytPlayer.loadVideoById(tr.ytId);
        setPlayState(true);
        flash('Now playing: ' + tr.title + ' (Complete)');
      } else {
        ytPlayer.cueVideoById(tr.ytId);
        setPlayState(false);
      }
    } else {
      if (autoPlay) {
        setPlayState(true);
        flash('Playing: ' + tr.title);
      }
    }
  }

  function togglePlay() {
    var tracks = getCurrentTracks();
    if (!ytPlayer || !ytReady) {
      flash('Audio engine initializing...');
      return;
    }
    if (isPlaying) {
      ytPlayer.pauseVideo();
      setPlayState(false);
    } else {
      ensurePersistentAudioPlaying();
      requestWakeLock();
      ytPlayer.playVideo();
      setPlayState(true);
      flash('Playing: ' + tracks[currentIdx].title);
    }
    updateMediaSession();
  }

  /* ---------- Playlist Switcher (Barber Shop vs Bast) ---------- */
  function switchPlaylist(newPlIdx, autoPlay) {
    if (newPlIdx < 0 || newPlIdx >= PLAYLISTS.length) return;
    currentPlaylistIdx = newPlIdx;
    currentIdx = 0;

    try { localStorage.setItem('devroom_playlist_idx', currentPlaylistIdx); } catch (e) {}

    var pl = getCurrentPlaylist();
    var otherPl = PLAYLISTS[(currentPlaylistIdx + 1) % PLAYLISTS.length];

    if (els.playlistName) els.playlistName.textContent = pl.name;
    if (els.switchBtnLabel) els.switchBtnLabel.textContent = otherPl.shortName;
    if (els.spCardLink) els.spCardLink.href = pl.spotifyUrl;
    if (els.spTopLink) els.spTopLink.href = pl.spotifyUrl;

    if (els.tabPl1) els.tabPl1.classList.toggle('is-active', currentPlaylistIdx === 0);
    if (els.tabPl2) els.tabPl2.classList.toggle('is-active', currentPlaylistIdx === 1);

    renderPlaylist();
    updateMeta();

    if (autoPlay || isPlaying) {
      selectTrack(0, true);
    } else {
      selectTrack(0, false);
    }

    flash('📻 Switched to ' + pl.name + ' (' + pl.tracks.length + ' Songs)');
  }

  var advancing = false;

  window.onYouTubeIframeAPIReady = function () {
    var tracks = getCurrentTracks();
    ytPlayer = new YT.Player('yt-player', {
      height: '100%',
      width: '100%',
      videoId: tracks[currentIdx].ytId,
      playerVars: {
        autoplay: 0,
        controls: 0,
        disablekb: 1,
        fs: 0,
        modestbranding: 1,
        rel: 0,
        playsinline: 1, // CRITICAL FOR IOS: keeps audio/video inline without opening fullscreen!
        origin: window.location.origin
      },
      events: {
        onReady: function () {
          ytReady = true;
          updateMeta();
        },
        onStateChange: function (event) {
          // YT.PlayerState: ENDED = 0, PLAYING = 1, PAUSED = 2, BUFFERING = 3
          if (event.data === 1) {
            setPlayState(true);
            advancing = false;
          } else if (event.data === 2) {
            setPlayState(false);
          } else if (event.data === 0) {
            // Song ended naturally! Automatically play the next song!
            if (!advancing) {
              advancing = true;
              selectTrack(currentIdx + 1, true);
            }
          }
        },
        onError: function (e) {
          console.warn('Playback notice, auto-advancing to next track:', e);
          if (!advancing) {
            advancing = true;
            setTimeout(function () {
              selectTrack(currentIdx + 1, true);
            }, 1000);
          }
        }
      }
    });
  };

  // Dynamically load YouTube API script
  var tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';
  var firstScriptTag = document.getElementsByTagName('script')[0];
  if (firstScriptTag && firstScriptTag.parentNode) {
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  } else {
    document.head.appendChild(tag);
  }

  // Live timer tick for progress, scrub bar, and seamless auto-advance fallback
  function tick() {
    if (!ytPlayer || !ytReady || isSeeking) return;
    try {
      var cur = ytPlayer.getCurrentTime() || 0;
      var dur = ytPlayer.getDuration() || 0;

      // When the song is fully completed (at or within 0.5s of the end), advance to next song!
      if (isPlaying && dur > 10 && cur >= (dur - 0.5) && !advancing) {
        advancing = true;
        selectTrack(currentIdx + 1, true);
        return;
      }

      if (els.cur) els.cur.textContent = fmt(cur);
      if (els.tot) els.tot.textContent = dur ? fmt(dur) : '--:--';

      if (els.seek && dur > 0) {
        var pct = (cur / dur) * 100;
        els.seek.value = pct;
        els.seek.style.background = 'linear-gradient(to right, #1DB954 0%, #1DB954 ' + pct + '%, rgba(255,255,255,0.16) ' + pct + '%, rgba(255,255,255,0.16) 100%)';
      }

      // Synchronize Lock Screen, Dynamic Island, and Smartwatch scrubber
      if ('mediaSession' in navigator && navigator.mediaSession.setPositionState && dur > 0) {
        try {
          navigator.mediaSession.setPositionState({
            duration: Math.max(0, dur),
            playbackRate: 1,
            position: Math.min(cur, dur)
          });
        } catch (e) {}
      }
    } catch (e) {}
  }
  setInterval(tick, 250);

  // Seek bar interaction
  if (els.seek) {
    els.seek.addEventListener('pointerdown', function () { isSeeking = true; });
    els.seek.addEventListener('input', function () {
      if (!ytPlayer || !ytReady) return;
      var dur = ytPlayer.getDuration() || 0;
      var cur = (parseFloat(els.seek.value) / 100) * dur;
      if (els.cur) els.cur.textContent = fmt(cur);
      var pct = parseFloat(els.seek.value);
      els.seek.style.background = 'linear-gradient(to right, #1DB954 0%, #1DB954 ' + pct + '%, rgba(255,255,255,0.16) ' + pct + '%, rgba(255,255,255,0.16) 100%)';
    });
    els.seek.addEventListener('change', function () {
      isSeeking = false;
      if (!ytPlayer || !ytReady) return;
      var dur = ytPlayer.getDuration() || 0;
      var targetSec = (parseFloat(els.seek.value) / 100) * dur;
      seekTo(targetSec);
    });
  }
  document.addEventListener('pointerup', function () { if (isSeeking) isSeeking = false; });

  // Buttons
  if (els.play) els.play.addEventListener('click', togglePlay);
  if (els.prev) {
    els.prev.addEventListener('click', function () {
      try {
        if (ytPlayer && ytPlayer.getCurrentTime() > 4) {
          ytPlayer.seekTo(0, true);
          return;
        }
      } catch (e) {}
      selectTrack(currentIdx - 1, isPlaying);
    });
  }
  if (els.next) {
    els.next.addEventListener('click', function () {
      selectTrack(currentIdx + 1, isPlaying);
    });
  }

  // Playlist drawer toggle
  if (els.drawerToggle && els.playerCard) {
    els.drawerToggle.addEventListener('click', function () {
      els.playerCard.classList.toggle('is-drawer-open');
    });
  }
  if (els.drawerClose && els.playerCard) {
    els.drawerClose.addEventListener('click', function () {
      els.playerCard.classList.remove('is-drawer-open');
    });
  }

  // Cassette deck click to toggle play/pause
  if (els.cassetteDeck) {
    els.cassetteDeck.addEventListener('click', togglePlay);
  }

  // Spacebar toggle on desktop
  document.addEventListener('keydown', function (e) {
    if (e.code === 'Space' && (e.target === document.body || e.target === document.documentElement)) {
      e.preventDefault();
      togglePlay();
    }
  });

  /* ---------- Toast Notification ---------- */
  var toastTimer = null;
  function showToast(msg) {
    if (!els.toast) return;
    els.toast.textContent = msg;
    els.toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      els.toast.classList.remove('show');
    }, 2800);
  }

  /* ---------- Dark Mode Theme Manager (Lichu Lights & Lamb Light ON) ---------- */
  function setTheme(dark, notify) {
    if (dark) {
      document.body.classList.add('dark-mode');
      document.documentElement.classList.add('dark-mode');
      if (els.themeIcon) els.themeIcon.textContent = '☀️';
      if (els.themeText) els.themeText.textContent = 'Day';
      if (els.themeBtn) els.themeBtn.title = 'Switch to Day Mode';
      try { localStorage.setItem('devroom_theme', 'dark'); } catch (e) {}
      if (notify) showToast('🌙 Dark Mode ON: Lichu lights & Lamb light illuminated!');
    } else {
      document.body.classList.remove('dark-mode');
      document.documentElement.classList.remove('dark-mode');
      if (els.themeIcon) els.themeIcon.textContent = '🌙';
      if (els.themeText) els.themeText.textContent = 'Night';
      if (els.themeBtn) els.themeBtn.title = 'Switch to Dark/Night Mode';
      try { localStorage.setItem('devroom_theme', 'light'); } catch (e) {}
      if (notify) showToast('☀️ Day Mode ON: Hostel morning ambiance active.');
    }
  }

  function toggleTheme() {
    var isDark = document.body.classList.contains('dark-mode');
    setTheme(!isDark, true);
  }

  if (els.themeBtn) {
    els.themeBtn.addEventListener('click', toggleTheme);
  }

  // Interactive desk lamps ("lamb lights"): Clicking directly on either study lamp toggles the room lights!
  if (els.deskLamp) {
    els.deskLamp.addEventListener('click', function () {
      toggleTheme();
    });
  }
  if (els.deskLampRight) {
    els.deskLampRight.addEventListener('click', function () {
      toggleTheme();
    });
  }

  // Initial theme setup (defaults to Dark Mode so Lichu lights and Lamb light shine immediately!)
  var savedTheme = null;
  try { savedTheme = localStorage.getItem('devroom_theme'); } catch (e) {}
  if (savedTheme === 'light') {
    setTheme(false, false);
  } else {
    // Default to dark mode to fulfill user request directly
    setTheme(true, false);
  }
  if (els.switchPlaylistBtn) {
    els.switchPlaylistBtn.addEventListener('click', function () {
      var nextPl = (currentPlaylistIdx + 1) % PLAYLISTS.length;
      switchPlaylist(nextPl, isPlaying);
    });
  }

  // Drawer playlist tabs
  if (els.tabPl1) {
    els.tabPl1.addEventListener('click', function () {
      if (currentPlaylistIdx !== 0) switchPlaylist(0, isPlaying);
    });
  }
  if (els.tabPl2) {
    els.tabPl2.addEventListener('click', function () {
      if (currentPlaylistIdx !== 1) switchPlaylist(1, isPlaying);
    });
  }

  // Initial playlist setup (load saved preference)
  var savedPlIdx = null;
  try { savedPlIdx = localStorage.getItem('devroom_playlist_idx'); } catch (e) {}
  if (savedPlIdx !== null && (savedPlIdx === '0' || savedPlIdx === '1')) {
    currentPlaylistIdx = parseInt(savedPlIdx, 10);
  }

  var pl = getCurrentPlaylist();
  var otherPl = PLAYLISTS[(currentPlaylistIdx + 1) % PLAYLISTS.length];
  if (els.playlistName) els.playlistName.textContent = pl.name;
  if (els.switchBtnLabel) els.switchBtnLabel.textContent = otherPl.shortName;
  if (els.spCardLink) els.spCardLink.href = pl.spotifyUrl;
  if (els.spTopLink) els.spTopLink.href = pl.spotifyUrl;
  if (els.tabPl1) els.tabPl1.classList.toggle('is-active', currentPlaylistIdx === 0);
  if (els.tabPl2) els.tabPl2.classList.toggle('is-active', currentPlaylistIdx === 1);

  // Initialize UI
  renderPlaylist();
  updateMeta();
})();
