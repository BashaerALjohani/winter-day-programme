/* The Winter Day – البرنامج التفاعلي. المحتوى كله في data.js */
(function () {
  'use strict';

  const $ = (sel) => document.querySelector(sel);
  const FAV_KEY = 'winterday-favs';
  const state = { view: 'all', cat: 'all', q: '', favs: loadFavs() };
  let lastSig = '';

  // ---------- الوقت ----------
  const toMin = (t) => { const [h, m] = t.split(':').map(Number); return h * 60 + m; };
  const fmt = (t) => {
    let [h, m] = t.split(':').map(Number);
    const ap = h < 12 ? 'ص' : 'م';
    h = h % 12 || 12;
    return `${h}:${String(m).padStart(2, '0')} ${ap}`;
  };
  function at(time) {
    const [y, mo, d] = EVENT.date.split('-').map(Number);
    const [h, m] = time.split(':').map(Number);
    return new Date(y, mo - 1, d, h, m);
  }

  // الوقت الحقيقي، أو ?now=10:45 في الرابط لتجربة يوم الفعالية (مفيد للعرض والتدريب)
  function now() {
    const demo = new URLSearchParams(location.search).get('now');
    if (demo && /^\d{1,2}:\d{2}$/.test(demo)) return at(demo);
    return new Date();
  }
  const isEventDay = (n) => n.toDateString() === at('00:00').toDateString();
  const minutesOf = (n) => n.getHours() * 60 + n.getMinutes();

  function statusOf(s, n) {
    if (!isEventDay(n)) return null;
    const m = minutesOf(n);
    if (m >= toMin(s.end)) return 'past';
    if (m >= toMin(s.start)) return 'live';
    return 'soon';
  }

  const dateLabel = new Intl.DateTimeFormat('ar-u-ca-gregory-nu-latn',
    { weekday: 'long', day: 'numeric', month: 'long' }).format(at('00:00'));
  const byTime = (a, b) => toMin(a.start) - toMin(b.start) || toMin(a.end) - toMin(b.end);
  const sorted = [...SESSIONS].sort(byTime);

  // ---------- أدوات ----------
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const norm = (s) => s.toLowerCase()
    .replace(/[أإآ]/g, 'ا').replace(/ة/g, 'ه').replace(/ى/g, 'ي').replace(/[ً-ْ]/g, '');

  function loadFavs() {
    try { return new Set(JSON.parse(localStorage.getItem(FAV_KEY)) || []); } catch (e) { return new Set(); }
  }
  function saveFavs() {
    try { localStorage.setItem(FAV_KEY, JSON.stringify([...state.favs])); } catch (e) { /* التخزين مقفل: الجدول يبقى لهذه الزيارة فقط */ }
  }
  function toggleFav(id) {
    if (state.favs.has(id)) state.favs.delete(id); else state.favs.add(id);
    saveFavs();
    renderProgramme(true);
    if (dialog.open) fillDialog(id);
  }

  // ---------- العد التنازلي ----------
  function renderCountdown() {
    const n = now(), el = $('#countdown');
    if (n < at(EVENT.start)) {
      const mins = Math.ceil((at(EVENT.start) - n) / 60000);
      const parts = [[Math.floor(mins / 1440), 'أيام'], [Math.floor((mins % 1440) / 60), 'ساعات'], [mins % 60, 'دقائق']];
      el.innerHTML = parts.map(([v, l]) =>
        `<div class="cd-box"><span class="cd-num">${v}</span><span class="cd-label">${l}</span></div>`).join('');
    } else if (n < at(EVENT.end)) {
      el.innerHTML = '<p class="cd-msg"><span class="pulse"></span>الفعالية جارية الآن</p>';
    } else {
      el.innerHTML = '<p class="cd-msg">شكرًا لحضوركن، نلقاكن في فعاليات قادمة</p>';
    }
  }

  // ---------- الآن والتالي ----------
  function nnItem(s, note) {
    return `<button type="button" class="nn-item" data-open="${s.id}">
      <strong>${esc(s.title)}</strong>
      <small>${fmt(s.start)} – ${fmt(s.end)} · ${esc(s.location)}${note ? ` · ${note}` : ''}</small></button>`;
  }
  function renderNowNext() {
    const n = now(), box = $('#now-next');
    if (n >= at(EVENT.end)) {
      box.innerHTML = `<div class="nn-card"><p class="nn-label">انتهت الفعالية</p>
        <p class="nn-text">شكرًا لكل الحاضرات، ونتمنى إن اليوم كان ممتع.</p></div>`;
      return;
    }
    if (!isEventDay(n)) {
      box.innerHTML = `<div class="nn-card"><p class="nn-label"><svg class="icon" aria-hidden="true"><use href="#i-clock"/></svg>موعدنا</p>
        <p class="nn-text">يبدأ البرنامج يوم <strong>${dateLabel}</strong> الساعة <strong>${fmt(EVENT.start)}</strong>.
        احفظي الفقرات اللي تهمك من الآن في «جدولي».</p></div>`;
      return;
    }
    const live = sorted.filter((s) => statusOf(s, n) === 'live');
    const next = sorted.find((s) => statusOf(s, n) === 'soon');
    const wait = next ? toMin(next.start) - minutesOf(n) : 0;
    const waitText = wait >= 60 ? `بعد ${Math.floor(wait / 60)} س ${wait % 60} د` : `بعد ${wait} دقيقة`;
    box.innerHTML = `<div class="nn-card two">
      <div><p class="nn-label"><span class="pulse"></span>الآن</p>
        ${live.length ? live.map((s) => nnItem(s)).join('') : '<p class="nn-text">ما فيه فقرة جارية الآن.</p>'}</div>
      <div><p class="nn-label"><svg class="icon" aria-hidden="true"><use href="#i-clock"/></svg>التالي</p>
        ${next ? nnItem(next, waitText) : '<p class="nn-text">هذي آخر فقرات اليوم.</p>'}</div>
    </div>`;
  }

  // ---------- البرنامج ----------
  function renderChips() {
    const cats = [['all', { label: 'الكل' }], ...Object.entries(CATEGORIES)];
    $('#chips').innerHTML = cats.map(([key, c]) =>
      `<button type="button" class="chip" data-cat="${key}" aria-pressed="${state.cat === key}">
        ${c.color ? `<span class="dot" style="--dot:${c.color}"></span>` : ''}${esc(c.label)}</button>`).join('');
  }

  function cardHTML(s, st) {
    const cat = CATEGORIES[s.category];
    const fav = state.favs.has(s.id);
    const badge = st === 'live' ? '<span class="badge live"><span class="pulse"></span>جارية الآن</span>'
      : st === 'past' ? '<span class="badge past">انتهت</span>' : '';
    return `<li class="card${st ? ' is-' + st : ''}">
      <div class="time"><span>${fmt(s.start)}</span><span class="time-end">${fmt(s.end)}</span></div>
      <div class="card-body">
        <div class="meta"><span class="tag" style="--dot:${cat.color}">${esc(cat.label)}</span>${badge}</div>
        <h3><button type="button" class="open" data-open="${s.id}">${esc(s.title)}</button></h3>
        <p class="loc"><svg class="icon" aria-hidden="true"><use href="#i-pin"/></svg>${esc(s.location)}</p>
      </div>
      <button type="button" class="fav" data-fav="${s.id}" aria-pressed="${fav}"
        aria-label="${fav ? 'إزالة' : 'إضافة'} «${esc(s.title)}» ${fav ? 'من' : 'إلى'} جدولي">
        <svg aria-hidden="true"><use href="#i-star"/></svg></button>
    </li>`;
  }

  function renderProgramme(force) {
    const n = now();
    const q = norm(state.q.trim());
    const list = sorted.filter((s) =>
      (state.view === 'all' || state.favs.has(s.id)) &&
      (state.cat === 'all' || s.category === state.cat) &&
      (!q || norm(`${s.title} ${s.location} ${s.description}`).includes(q)));

    // إعادة الرسم فقط إذا تغيّر شيء (حتى ما يضيع مكان المستخدمة في الصفحة)
    const sig = JSON.stringify([state, [...state.favs], list.map((s) => s.id + statusOf(s, n))]);
    if (!force && sig === lastSig) return;
    lastSig = sig;

    $('#mine-count').textContent = state.favs.size;
    $('#timeline').innerHTML = list.map((s) => cardHTML(s, statusOf(s, n))).join('');
    $('#result-count').textContent = list.length ? `${list.length} فقرة` : '';

    const empty = $('#empty');
    empty.hidden = list.length > 0;
    if (!list.length) {
      empty.innerHTML = state.view === 'mine' && !state.favs.size
        ? '<strong>جدولك فاضي</strong><span>اضغطي على النجمة بجانب أي فقرة عشان تنضاف هنا.</span>'
        : `<strong>ما فيه نتائج</strong><span>جربي كلمة ثانية أو اختاري «الكل».</span>`;
    }
  }

  // ---------- نافذة التفاصيل ----------
  const dialog = $('#details');
  function fillDialog(id) {
    const s = SESSIONS.find((x) => x.id === id);
    const cat = CATEGORIES[s.category];
    const st = statusOf(s, now());
    const fav = state.favs.has(id);
    const tag = $('#d-tag');
    tag.textContent = cat.label;
    tag.style.setProperty('--dot', cat.color);
    $('#d-title').textContent = s.title;
    $('#d-time').textContent = `${fmt(s.start)} – ${fmt(s.end)}`;
    $('#d-loc').textContent = s.location;
    $('#d-desc').textContent = s.description;
    const status = $('#d-status');
    status.hidden = !st || st === 'soon';
    status.textContent = st === 'live' ? 'جارية الآن' : 'انتهت هذي الفقرة';
    status.className = 'd-status ' + (st || '');
    const btn = $('#d-fav');
    btn.dataset.fav = id;
    btn.setAttribute('aria-pressed', fav);
    btn.querySelector('span').textContent = fav ? 'إزالة من جدولي' : 'أضيفي إلى جدولي';
  }
  function openDialog(id) {
    fillDialog(id);
    dialog.showModal();
  }
  dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); });

  // ---------- الأركان والمعلومات ----------
  function renderStatic() {
    $('#hero-date').textContent = dateLabel;
    $('#help-text').textContent = EVENT.help;
    $('#zones-grid').innerHTML = ZONES.map((z) => `<article class="zone">
      <div class="zone-icon" aria-hidden="true">${z.icon}</div>
      <h3>${esc(z.name)}</h3><p>${esc(z.description)}</p>
      <div class="zone-meta"><span><svg class="icon" aria-hidden="true"><use href="#i-pin"/></svg>${esc(z.location)}</span>
        <span><svg class="icon" aria-hidden="true"><use href="#i-clock"/></svg>طوال اليوم</span></div>
    </article>`).join('');
    const info = [
      ['التاريخ', dateLabel],
      ['الوقت', `${fmt(EVENT.start)} – ${fmt(EVENT.end)}`],
      ['المكان', EVENT.location],
      ['الحضور المتوقع', EVENT.expected],
    ];
    $('#info-grid').innerHTML = info.map(([k, v]) =>
      `<div class="info"><small>${k}</small><strong>${esc(v)}</strong></div>`).join('');
    $('#faq').innerHTML = FAQ.map((f) =>
      `<details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join('');
  }

  function makeSnow() {
    const box = $('#snow');
    for (let i = 0; i < 26; i++) {
      const f = document.createElement('span');
      const size = 3 + Math.random() * 5;
      f.style.cssText = `left:${Math.random() * 100}%;width:${size}px;height:${size}px;` +
        `animation-duration:${8 + Math.random() * 10}s;animation-delay:${-Math.random() * 18}s;` +
        `--drift:${(Math.random() - 0.5) * 80}px;opacity:${0.35 + Math.random() * 0.5}`;
      box.appendChild(f);
    }
  }

  // ---------- التفاعل ----------
  document.addEventListener('click', (e) => {
    const fav = e.target.closest('[data-fav]');
    if (fav) { toggleFav(fav.dataset.fav); return; }
    const open = e.target.closest('[data-open]');
    if (open) { openDialog(open.dataset.open); return; }
    const chip = e.target.closest('[data-cat]');
    if (chip) { state.cat = chip.dataset.cat; renderChips(); renderProgramme(); return; }
    const view = e.target.closest('[data-view]');
    if (view) {
      state.view = view.dataset.view;
      document.querySelectorAll('[data-view]').forEach((b) => b.setAttribute('aria-pressed', b === view));
      renderProgramme();
    }
  });
  $('#search').addEventListener('input', (e) => { state.q = e.target.value; renderProgramme(); });

  function tick() { renderCountdown(); renderNowNext(); renderProgramme(); }

  renderStatic();
  renderChips();
  makeSnow();
  tick();
  setInterval(tick, 30000);
})();
