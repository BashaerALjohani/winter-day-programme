(function () {
  'use strict';

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const FAV_KEY = 'winterday-favs-v2';
  const LANG_KEY = 'winterday-lang';
  const PLAN_KEY = 'winterday-plan';
  const NAME_KEY = 'winterday-card-name';
  const CHECK_KEY = 'winterday-checklist';
  const SNOW_KEY = 'winterday-snow';
  const calm = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

  const arCount = (n, [one, two, few, many]) =>
    (n === 1 ? one : n === 2 ? two : n <= 10 ? `${n} ${few}` : `${n} ${many}`);
  const enCount = (n, one, many) => `${n} ${n === 1 ? one : many}`;

  const UI = {
    ar: {
      pageTitle: 'The Winter Day | برنامج الفعالية',
      langBtn: 'EN', langName: 'en', langAria: 'Switch to English',
      navAria: 'التنقل', navHome: 'الرئيسية', navProgramme: 'البرنامج', navBooths: 'البوثات',
      navFavourites: 'المفضلة', navInfo: 'معلومات',
      kicker: 'Elevate Events تقدّم', tagline: 'يوم مفتوح بطابع شتوي',
      ctaQuiz: 'اكتشفي يومك', ctaProgramme: 'البرنامج', snowHint: 'المسي الثلج',
      daysS: 'يوم', hoursS: 'ساعة', minsS: 'دقيقة',
      liveNow: 'جارية الآن', thanks: 'شكرًا لحضوركن، نلقاكن في فعاليات قادمة',
      videoFallback: 'المتصفح ما يدعم تشغيل المقطع.', tileVideo: 'شاهدي اليوم',
      tileWs: 'ورش عمل', tileWsNote: (n) => `فترتين · ${n} مقاعد`, tileBooths: 'بوث مشارك',
      tileQuizT: 'وش يومك الشتوي؟', tileQuizD: '3 أسئلة، وتطلع لك شخصيتك وخطة يومك.',
      tileCardT: 'بطاقتي الشتوية', tileCardD: 'صمّمي بطاقتك وشاركيها مع صاحباتك.',
      tileGuests: 'زائرة متوقعة', guests: (n) => `+${n.toLocaleString('en')}`,
      featuredTitle: 'مختارات شتوية', seeAll: 'عرض الكل',
      boothsLead: (c, t) => `${arCount(c, ['بوث واحد', 'بوثين', 'بوثات', 'بوث'])} مؤكدة للحين، والهدف ${t} بوث.`,
      vendorsIn: (n) => arCount(n, ['بوث واحد', 'بوثين', 'بوثات', 'بوث']),
      infoVendors: 'البوثات', vendorsInfo: (c, t) => `${c} بوثات مؤكدة · الهدف ${t}`,
      progTitle: 'برنامج اليوم', progLead: 'اضغطي على أي فقرة لتفاصيلها، وعلى القلب لحفظها في المفضلة.',
      searchProg: 'ابحثي عن فقرة أو مكان…', searchProgAria: 'بحث في البرنامج', filterAria: 'تصفية', all: 'الكل',
      sessionsCount: (n) => arCount(n, ['فقرة واحدة', 'فقرتين', 'فقرات', 'فقرة']),
      badgeLive: 'جارية الآن', badgePast: 'انتهت', seats: (n) => `${n} مقاعد`,
      seatsLong: (n) => `${n} أشخاص بالكثير في كل فترة`, tbc: 'يُعلن قريبًا',
      slotLabel: (n) => (n === 1 ? 'الفترة الأولى' : 'الفترة الثانية'), slotsTitle: 'فترات الورشة',
      favAdd: (t) => `إضافة «${t}» للمفضلة`, favRemove: (t) => `إزالة «${t}» من المفضلة`,
      emptyT: 'ما فيه نتائج', emptyD: 'جربي كلمة ثانية أو اختاري «الكل».',
      sheetAdd: 'أضيفي للمفضلة', sheetRemove: 'محفوظة في المفضلة', pastNote: 'انتهت هذي الفقرة', close: 'إغلاق',
      boothsPageTitle: 'البوثات والمتاجر', searchBooth: 'ابحثي عن بوث أو منتج…', searchBoothAria: 'بحث في البوثات',
      moreSoonT: (n) => `${arCount(n, ['بوث جديد', 'بوثين جداد', 'بوثات جديدة', 'بوث جديد'])} قريبًا`,
      moreSoonD: 'نضيفها هنا أول ما تتأكد.', found: 'فيه:',
      productsCount: (n) => arCount(n, ['منتج واحد', 'منتجين', 'منتجات', 'منتج']),
      back: 'كل البوثات', productsTitle: 'المنتجات', similar: 'بوثات مشابهة',
      pricesNote: 'الأسعار للعرض فقط، وما فيه دفع في التطبيق.', money: (n) => `${n} ر.س`,
      favTitle: 'المفضلة', favLead: 'كل اللي عجبك في مكان واحد.',
      favSessions: 'الفقرات', favVendors: 'البوثات', favProducts: 'المنتجات',
      favEmptyT: 'ما حفظتي شي للحين', favEmptyD: 'اضغطي على القلب بجانب أي فقرة أو بوث أو منتج، ويوصل هنا.',
      browseProg: 'تصفحي البرنامج', browseBooths: 'تصفحي البوثات', from: (v) => `من ${v}`,
      infoTitle: 'معلومات مهمة', infoDate: 'التاريخ', infoTime: 'الوقت', infoPlace: 'المكان',
      infoWorkshops: 'الورش', infoGuests: 'الحضور المتوقع',
      workshopsInfo: (w, n) => `${w} ورش · فترتين · ${n} مقاعد لكل فترة`, guestsLong: (n) => `+${n.toLocaleString('en')} طالبة`,
      aboutTitle: 'عن المنظّم', faqTitle: 'أسئلة شائعة', helpTitle: 'تحتاجين مساعدة؟',
      share: 'مشاركة', addCal: 'أضيفي للتقويم', openBooth: 'زيارة البوث', linkCopied: 'انسخ الرابط',
      savedToast: 'انحفظ في المفضلة', removedToast: 'انشال من المفضلة', calToast: 'نزل ملف التقويم',
      qrTitle: 'افتحي التطبيق في جوالك', qrText: 'امسحي الكود بكاميرا الجوال، وكل شي معك يوم الفعالية.',
      installTitle: 'ثبّتي التطبيق', installText: 'يفتح من الشاشة الرئيسية مثل أي تطبيق، ويشتغل حتى بدون نت.',
      installBtn: 'تثبيت التطبيق', installed: 'التطبيق مثبّت على جهازك',
      iosHint: 'على الآيفون: اضغطي زر المشاركة ثم «إضافة إلى الشاشة الرئيسية».',
      quizTitle: 'اكتشفي يومك الشتوي', qBack: 'رجوع', yourPersona: 'شخصيتك في The Winter Day',
      planWorkshop: 'ورشتك', planDrink: 'مشروبك', planShop: 'من البوثات',
      savePlan: 'احفظي خطتي', planSaved: 'انحفظت خطتك في المفضلة', makeCard: 'سوّي بطاقتي', retake: 'من جديد',
      makerTitle: 'بطاقتي الشتوية', makerLead: 'بطاقة باسمك وخطة يومك، جاهزة تشاركينها.',
      namePh: 'اسمك (اختياري)', nameAria: 'الاسم على البطاقة', shareCard: 'شاركي البطاقة', saveCard: 'حفظ الصورة',
      cardMy: 'يومي في', cardDefault: 'يومي الشتوي', cardScan: 'امسحي الكود وافتحي التطبيق',
      cardHint: 'جاوبي «اكتشفي يومك» عشان تطلع خطتك وشخصيتك في البطاقة.',
      smAria: 'رجل الثلج يسلّم عليك', smHello: ['أهلًا فيكِ! نلقاكِ 17 ديسمبر', 'المسي الثلج حولي ✨', 'جربي «اكتشفي يومك»!'], smDance: 'أرقص من الوناسة 🎶', smSneeze: 'هاتشو! ❄️',
      secWsK: 'الورش', secWsT: 'ورش تطلعين منها بشي من صنع يدك', secWsS: (n, s) => `${n} ورش · كل ورشة فترتين · ${s} مقاعد بالفترة`,
      secProgK: 'البرنامج', secProgT: 'يومك من البداية للختام', secProgS: 'رجل الثلج يمشي على مواعيد اليوم. اضغطي أي وقت لتفاصيله.',
      fullProg: 'البرنامج كامل', stops: ['الافتتاح', 'الورش (1)', 'الورش (2)', 'التحديات', 'الجوائز', 'الختام'],
      secBoothsK: 'البوثات', secBoothsT: 'بوثات وكوفيهات بنكهة الشتاء',
      wsSteps: [['اختاري ورشتك', '4 ورش يدوية'], ['اختاري الفترة', 'الأولى أو الثانية'], ['تطلعين بقطعتك', 'من صنع يدك']],
      wsTake: 'تطلعين بـ', wsMins: '45 دقيقة', slotShort: (n) => (n === 1 ? 'الفترة الأولى' : 'الفترة الثانية'),
      boothTabsAria: 'أقسام البوثات', allInCat: (c) => `كل ${c}`,
      mapK: 'خريطة اليوم', mapT: 'اعرفي وين كل شي', mapS: 'اضغطي على أي بوث أو قاعة أو مكان لتفاصيله.',
      mapNote: 'الخريطة توضيحية، وتتحدث أول ما تتأكد الأماكن.', mapStartT: 'ابدئي من البوابة', mapRoom: (n) => `قاعة ${n}`,
      mapHere: 'الفقرات هنا', mapBoothsHere: 'البوثات هنا', mapPick: 'أو اختاري مكان:', boothNo: (n) => `بوث ${n}`,
      checkT: 'جهّزي نفسك للشتاء', checkS: 'قائمة صغيرة قبل تجين، تنحفظ في جوالك.',
      checkItems: ['شال أو جاكيت خفيف للجو البارد', 'جوال مشحون عشان الصور', 'وصول بدري لو تبين ورشة (10 مقاعد بس)', 'كيس صغير لمشترياتك من البوثات'],
      checkDone: 'جاهزة للشتاء! نلقاكِ 17 ديسمبر', snowOn: 'خلّيها تثلج', snowOff: 'وقّفي الثلج',
      secYouK: 'تجربتك', secYouT: 'خلّي اليوم يشبهك',
      secVisitK: 'زيارتك', secVisitT: 'كل اللي تحتاجينه قبل تجين', moreInfo: 'معلومات وأسئلة شائعة',
      viewTimeline: 'خط زمني', viewTable: 'جدول', viewAria: 'طريقة العرض',
      colTime: 'الوقت', colSession: 'الفقرة', colPlace: 'المكان',
      nowAt: (x) => `الآن ${x}`, meltedMsg: 'ذاب الثلج… شكرًا لكن!',
      am: 'ص', pm: 'م', locale: 'ar-u-ca-gregory-nu-latn',
    },
    en: {
      pageTitle: 'The Winter Day | Event Programme',
      langBtn: 'ع', langName: 'ar', langAria: 'التبديل إلى العربية',
      navAria: 'Navigation', navHome: 'Home', navProgramme: 'Programme', navBooths: 'Booths',
      navFavourites: 'Favourites', navInfo: 'Info',
      kicker: 'Elevate Events presents', tagline: 'A winter-themed open day',
      ctaQuiz: 'Discover your day', ctaProgramme: 'Programme', snowHint: 'Touch the snow',
      daysS: 'days', hoursS: 'hrs', minsS: 'min',
      liveNow: 'On now', thanks: 'Thank you for coming. See you at future events!',
      videoFallback: 'Your browser can’t play this video.', tileVideo: 'Watch the day',
      tileWs: 'Workshops', tileWsNote: (n) => `2 slots · ${n} places`, tileBooths: 'Booths',
      tileQuizT: 'What’s your winter day?', tileQuizD: '3 questions reveal your persona and your plan for the day.',
      tileCardT: 'My winter card', tileCardD: 'Design your card and share it with friends.',
      tileGuests: 'Expected guests', guests: (n) => `${n.toLocaleString('en')}+`,
      featuredTitle: 'Winter picks', seeAll: 'See all',
      boothsLead: (c, t) => `${enCount(c, 'booth', 'booths')} confirmed so far, aiming for ${t}.`,
      vendorsIn: (n) => enCount(n, 'booth', 'booths'),
      infoVendors: 'Booths', vendorsInfo: (c, t) => `${c} confirmed · aiming for ${t}`,
      progTitle: 'Today’s programme', progLead: 'Tap a session for details, and the heart to save it.',
      searchProg: 'Search sessions or places…', searchProgAria: 'Search the programme', filterAria: 'Filter', all: 'All',
      sessionsCount: (n) => enCount(n, 'session', 'sessions'),
      badgeLive: 'On now', badgePast: 'Ended', seats: (n) => `${n} places`,
      seatsLong: (n) => `Up to ${n} people per slot`, tbc: 'Coming soon',
      slotLabel: (n) => `Slot ${n}`, slotsTitle: 'Workshop slots',
      favAdd: (t) => `Add “${t}” to favourites`, favRemove: (t) => `Remove “${t}” from favourites`,
      emptyT: 'No results', emptyD: 'Try another word or choose “All”.',
      sheetAdd: 'Add to favourites', sheetRemove: 'Saved in favourites', pastNote: 'This session has ended', close: 'Close',
      boothsPageTitle: 'Booths & shops', searchBooth: 'Search booths or products…', searchBoothAria: 'Search the booths',
      moreSoonT: (n) => `${enCount(n, 'more booth', 'more booths')} coming soon`,
      moreSoonD: 'We’ll add them here once they’re confirmed.', found: 'Has:',
      productsCount: (n) => enCount(n, 'product', 'products'),
      back: 'All booths', productsTitle: 'Products', similar: 'Similar booths',
      pricesNote: 'Prices are for information only. No payment in the app.', money: (n) => `${n} SAR`,
      favTitle: 'Favourites', favLead: 'Everything you liked, in one place.',
      favSessions: 'Sessions', favVendors: 'Booths', favProducts: 'Products',
      favEmptyT: 'Nothing saved yet', favEmptyD: 'Tap the heart next to any session, booth or product to see it here.',
      browseProg: 'Browse the programme', browseBooths: 'Browse the booths', from: (v) => `at ${v}`,
      infoTitle: 'Good to know', infoDate: 'Date', infoTime: 'Time', infoPlace: 'Location',
      infoWorkshops: 'Workshops', infoGuests: 'Expected guests',
      workshopsInfo: (w, n) => `${w} workshops · 2 slots · ${n} places each`, guestsLong: (n) => `${n.toLocaleString('en')}+ students`,
      aboutTitle: 'About the organiser', faqTitle: 'FAQs', helpTitle: 'Need help?',
      share: 'Share', addCal: 'Add to calendar', openBooth: 'Visit the booth', linkCopied: 'Link copied',
      savedToast: 'Saved to favourites', removedToast: 'Removed from favourites', calToast: 'Calendar file downloaded',
      qrTitle: 'Open the app on your phone', qrText: 'Scan the code with your phone camera and take the day with you.',
      installTitle: 'Install the app', installText: 'Open it from your home screen like any app, even without internet.',
      installBtn: 'Install the app', installed: 'The app is installed on this device',
      iosHint: 'On iPhone: tap Share, then “Add to Home Screen”.',
      quizTitle: 'Discover your winter day', qBack: 'Back', yourPersona: 'Your Winter Day persona',
      planWorkshop: 'Your workshop', planDrink: 'Your drink', planShop: 'From the booths',
      savePlan: 'Save my plan', planSaved: 'Your plan is saved to favourites', makeCard: 'Make my card', retake: 'Start again',
      makerTitle: 'My winter card', makerLead: 'A card with your name and your plan, ready to share.',
      namePh: 'Your name (optional)', nameAria: 'Name on the card', shareCard: 'Share the card', saveCard: 'Save image',
      cardMy: 'My day at', cardDefault: 'My winter day', cardScan: 'Scan to open the app',
      cardHint: 'Take “Discover your day” to put your persona and plan on the card.',
      smAria: 'Say hi to the snowman', smHello: ['Hi! See you on 17 December', 'Touch the snow around me ✨', 'Try “Discover your day”!'], smDance: 'Dancing for joy 🎶', smSneeze: 'Achoo! ❄️',
      secWsK: 'Workshops', secWsT: 'Make something of your own', secWsS: (n, s) => `${n} workshops · 2 slots each · ${s} places per slot`,
      secProgK: 'Programme', secProgT: 'Your day, start to finish', secProgS: 'Our snowman walks through the day. Tap any time for details.',
      fullProg: 'Full programme', stops: ['Opening', 'Workshops 1', 'Workshops 2', 'Challenges', 'Prizes', 'Closing'],
      secBoothsK: 'Booths', secBoothsT: 'Booths & cafés with a winter flavour',
      wsSteps: [['Pick a workshop', '4 hands-on workshops'], ['Pick a slot', 'First or second'], ['Take it home', 'Made by you']],
      wsTake: 'You leave with', wsMins: '45 min', slotShort: (n) => (n === 1 ? 'Slot 1' : 'Slot 2'),
      boothTabsAria: 'Booth categories', allInCat: (c) => `All ${c.toLowerCase()}`,
      mapK: 'Map', mapT: 'Find your way around', mapS: 'Tap any booth, room or area for details.',
      mapNote: 'Illustrative map, updated once locations are confirmed.', mapStartT: 'Start at the gate', mapRoom: (n) => `Room ${n}`,
      mapHere: 'Happening here', mapBoothsHere: 'Booths here', mapPick: 'Or pick a place:', boothNo: (n) => `Booth ${n}`,
      checkT: 'Get ready for winter', checkS: 'A little list before you come, saved on your phone.',
      checkItems: ['A light scarf or jacket for the cool air', 'A charged phone for photos', 'Arrive early for a workshop (only 10 places)', 'A small bag for your booth finds'],
      checkDone: 'Ready for winter! See you on 17 December', snowOn: 'Let it snow', snowOff: 'Stop the snow',
      secYouK: 'Your experience', secYouT: 'Make the day yours',
      secVisitK: 'Your visit', secVisitT: 'Everything you need before you come', moreInfo: 'Info & FAQs',
      viewTimeline: 'Timeline', viewTable: 'Table', viewAria: 'View',
      colTime: 'Time', colSession: 'Session', colPlace: 'Location',
      nowAt: (x) => `Now ${x}`, meltedMsg: 'The snow has melted… thank you!',
      am: 'AM', pm: 'PM', locale: 'en-GB',
    },
  };

  const VENDOR_BY_ID = Object.fromEntries(VENDORS.map((v) => [v.id, v]));
  const ROUTES = ['home', 'programme', 'booths', 'favourites', 'info'];
  const state = {
    lang: initialLang(), route: { name: 'home' },
    progCat: 'all', progQ: '', progView: 'timeline', boothCat: 'all', boothQ: '', favTab: 'all',
    favs: loadFavs(), plan: load(PLAN_KEY, null), cardName: load(NAME_KEY, ''),
    homeBoothCat: 'cafes', mapSel: null, checks: load(CHECK_KEY, []),
  };
  let progSig = '', progWalkerUpdate = null;
  const cleanups = [];
  const T = () => UI[state.lang];
  const L = (obj) => (typeof obj === 'string' ? obj : obj[state.lang] || obj.ar);

  function initialLang() {
    const param = new URLSearchParams(location.search).get('lang');
    if (param === 'en' || param === 'ar') return param;
    try { const saved = localStorage.getItem(LANG_KEY); if (saved === 'en' || saved === 'ar') return saved; } catch (e) { }
    return 'ar';
  }
  function load(key, fallback) {
    try { const v = localStorage.getItem(key); return v === null ? fallback : JSON.parse(v); } catch (e) { return fallback; }
  }
  function store(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { }
  }

  const toMin = (t) => { const [h, m] = t.split(':').map(Number); return h * 60 + m; };
  const fmt = (t) => {
    let [h, m] = t.split(':').map(Number);
    const ap = h < 12 ? T().am : T().pm;
    h = h % 12 || 12;
    return `${h}:${String(m).padStart(2, '0')} ${ap}`;
  };
  function at(time) {
    const [y, mo, d] = EVENT.date.split('-').map(Number);
    const [h, m] = time.split(':').map(Number);
    return new Date(y, mo - 1, d, h, m);
  }

  function now() {
    const demo = new URLSearchParams(location.search).get('now');
    if (demo && /^\d{1,2}:\d{2}$/.test(demo)) return at(demo);
    return new Date();
  }
  const isEventDay = (n) => n.toDateString() === at('00:00').toDateString();
  const minutesOf = (n) => n.getHours() * 60 + n.getMinutes();
  function statusOf(s, n) {
    if (!s.start || !isEventDay(n)) return null;
    const m = minutesOf(n);
    if (m >= toMin(s.end)) return 'past';
    if (m >= toMin(s.start)) return 'live';
    return 'soon';
  }
  const dateLabel = () => new Intl.DateTimeFormat(T().locale,
    { weekday: 'long', day: 'numeric', month: 'long' }).format(at('00:00'));
  const byTime = (a, b) => toMin(a.start) - toMin(b.start) || toMin(a.end) - toMin(b.end);

  const sorted = [...SESSIONS.filter((s) => s.start).sort(byTime), ...SESSIONS.filter((s) => !s.start)];
  const timeRange = (s) => (s.start ? `${fmt(s.start)} – ${fmt(s.end)}` : T().tbc);

  const esc = (s) => String(s).replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const norm = (s) => s.toLowerCase()
    .replace(/[أإآ]/g, 'ا').replace(/ة/g, 'ه').replace(/ى/g, 'ي').replace(/[ً-ْ]/g, '');
  const both = (obj) => `${obj.ar} ${obj.en}`;
  const icon = (id, cls = 'icon') => `<svg class="${cls}" aria-hidden="true"><use href="#${id}"/></svg>`;
  const productOf = (key) => {
    const [vid, pid] = key.split('/');
    const v = VENDOR_BY_ID[vid];
    return [v, v.products.find((p) => p.id === pid)];
  };

  function loadFavs() {
    try { return new Set(JSON.parse(localStorage.getItem(FAV_KEY)) || []); } catch (e) { return new Set(); }
  }
  function saveFavs() { store(FAV_KEY, [...state.favs]); }
  function heart(key, title, cls = '') {
    const on = state.favs.has(key);
    return `<button type="button" class="heart ${cls}" data-fav="${key}" data-title="${esc(title)}" aria-pressed="${on}"
      aria-label="${esc(on ? T().favRemove(title) : T().favAdd(title))}">${icon('i-heart', '')}</button>`;
  }
  function syncHearts(key) {
    const on = state.favs.has(key);
    $$(`[data-fav="${key}"]`).forEach((b) => {
      b.setAttribute('aria-pressed', on);
      if (b.dataset.title) b.setAttribute('aria-label', on ? T().favRemove(b.dataset.title) : T().favAdd(b.dataset.title));
    });
  }
  function toggleFav(key) {
    if (state.favs.has(key)) state.favs.delete(key); else state.favs.add(key);
    saveFavs();
    syncHearts(key);
    if (navigator.vibrate) navigator.vibrate(12);
    if (sheet.open) refreshSheet();
    renderFavCounts();
    toast(state.favs.has(key) ? T().savedToast : T().removedToast);
    if (state.route.name === 'favourites') renderView();
  }
  function renderFavCounts() {
    $$('.fav-count').forEach((el) => { el.textContent = state.favs.size; el.hidden = !state.favs.size; });
  }

  let toastTimer;
  function toast(msg) {
    const el = $('#toast');
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 2200);
  }

  function applyLanguage() {
    const t = T();
    document.documentElement.lang = state.lang;
    document.documentElement.dir = state.lang === 'ar' ? 'rtl' : 'ltr';
    document.title = t.pageTitle;
    $$('[data-i18n]').forEach((el) => { el.textContent = t[el.dataset.i18n]; });
    $$('[data-i18n-aria]').forEach((el) => el.setAttribute('aria-label', t[el.dataset.i18nAria]));
    const btn = $('#lang-btn');
    btn.textContent = t.langBtn;
    btn.lang = t.langName;
    btn.setAttribute('aria-label', t.langAria);
    const sb = $('#snow-btn'), lbl = globalSnowOn ? t.snowOff : t.snowOn;
    sb.setAttribute('aria-label', lbl);
    sb.title = lbl;
  }
  function setLanguage(lang) {
    state.lang = lang;
    store(LANG_KEY, lang);
    applyLanguage();
    renderView();
    if (sheet.open) refreshSheet();
    if (quizEl.open) renderQuiz();
    if (makerEl.open) openMaker();
  }

  function parseHash() {
    const [name, a, b] = location.hash.replace(/^#\/?/, '').split('/');
    if (name === 'booth' && VENDOR_BY_ID[a]) return { name: 'booth', id: a };
    if (name === 'session' && SESSIONS.some((s) => s.id === a)) return { name: 'programme', sheet: ['session', a] };
    if (name === 'product' && VENDOR_BY_ID[a] && VENDOR_BY_ID[a].products.some((p) => p.id === b)) {
      return { name: 'booth', id: a, sheet: ['product', `${a}/${b}`] };
    }
    return { name: ROUTES.includes(name) ? name : 'home' };
  }
  function onRoute() {
    state.route = parseHash();
    [sheet, quizEl, makerEl].forEach((d) => d.open && d.close());
    renderView();
    const view = $('#view');
    view.classList.remove('enter');
    void view.offsetWidth;
    view.classList.add('enter');
    window.scrollTo(0, 0);
    if (state.route.sheet) openSheet(...state.route.sheet);
  }
  function renderView() {
    const r = state.route;
    const active = r.name === 'booth' ? 'booths' : r.name;
    $$('[data-route]').forEach((a) => {
      const on = a.dataset.route === active;
      a.classList.toggle('active', on);
      if (on) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
    cleanups.splice(0).forEach((fn) => fn());
    const view = $('#view');
    view.innerHTML = { home: viewHome, programme: viewProgramme, booths: viewBooths,
      booth: () => viewBooth(r.id), favourites: viewFavourites, info: viewInfo }[r.name]();
    startSnow($('.snow-canvas', view));
    if (r.name === 'home') {
      setupHeroVideo($('.hero-video', view));
      renderCountdown();
      startWalker($('#day-track', view));
    }
    if (r.name === 'programme') { progSig = ''; renderProgList(); setupProgWalker(); }
    if (r.name === 'home' && state.mapSel) selectMap(state.mapSel[0], state.mapSel[1], false);
    watchHero();
    if (r.name === 'booths') renderBoothList();
    setupReveal(view);
  }

  function productCard(v, p, cls = '') {
    const pn = L(p.name);
    return `<article class="p-card tilt ${cls}">
      <div class="art-tile tile-${v.category}">${artHTML(p.art, pn, p.photo)}</div>
      <div class="p-body"><h3><button type="button" class="open" data-product="${v.id}/${p.id}">${esc(pn)}</button></h3>
        <p class="p-from">${esc(L(v.name))}</p><p class="price">${T().money(p.price)}</p></div>
      ${heart(`p:${v.id}/${p.id}`, pn, 'on-art')}
    </article>`;
  }

  function secHead(num, kicker, title, sub, cls = '') {
    return `<header class="sec-head reveal ${cls}"><p class="sec-kicker"><span class="sec-num">${num}</span>${kicker}</p>
      <h2>${title}</h2>${sub ? `<p class="sec-sub">${sub}</p>` : ''}</header>`;
  }

  function snowman(cls = '') {
    return `<svg class="snowman ${cls}" viewBox="0 0 120 160" aria-hidden="true">${snowmanBody()}</svg>`;
  }

  const WS_SCENE = { w1: 'mug', w2: 'keychain', w3: 'grad', w4: 'tote' };
  const CAT_SCENE = { cafes: 'cocoa', home: 'honey', accessories: 'earrings', clothing: 'scarf' };
  const SCENES = {
    mug: {
      arm: 'M81 72 L102 88 M96 83 L101 77',
      held: '<path class="brush" d="M102 88 L114 98"/><circle class="brush-tip" cx="115.5" cy="99.5" r="3"/>',
      ground: `<rect class="mug-body" x="112" y="106" width="30" height="32" rx="6"/><path class="mug-handle" d="M142 114 q10 0 10 9 q0 9 -10 9"/>
        <circle class="pdot d1" cx="120" cy="116" r="3.2"/><circle class="pdot d2" cx="131" cy="122" r="3"/>
        <circle class="pdot d3" cx="122" cy="129" r="2.6"/><circle class="pdot d4" cx="135" cy="112" r="2.6"/>`,
    },
    keychain: {
      held: `<g class="charm"><circle class="ring" cx="104" cy="56" r="5"/><path class="chain" d="M104 61 V80"/>
        <circle class="bead b1" cx="104" cy="68" r="3"/><circle class="bead b2" cx="104" cy="76" r="3"/>
        <path class="gem" d="M104 81 L115 94 L104 109 L93 94 Z"/><path class="gem-cut" d="M93 94 H115 M99 94 L104 81 L109 94 L104 109"/>
        <path class="spark s1" d="M119 82 l2 4.5 4.5 2 -4.5 2 -2 4.5 -2 -4.5 -4.5 -2 4.5 -2z"/>
        <path class="spark s2" d="M90 102 l1.4 3.2 3.2 1.4 -3.2 1.4 -1.4 3.2 -1.4 -3.2 -3.2 -1.4 3.2 -1.4z"/></g>`,
    },
    grad: {
      held: '<path class="brush" d="M104 56 L112 62"/><circle class="brush-tip" cx="113" cy="63" r="2.6"/>',
      extra: `<g class="grad-cap"><path class="cap-top" d="M38 22 L60 12 L82 22 L60 32 Z"/>
        <path class="cap-base" d="M47 25 V32 Q60 38 73 32 V25 L60 31 Z"/><path class="tassel" d="M60 22 L78 26 V36"/>
        <circle class="tassel-end" cx="78" cy="37" r="2"/></g>`,
      ground: `<path class="easel-leg" d="M120 70 L110 150 M140 70 L150 150 M130 66 V150"/>
        <rect class="canvas" x="108" y="58" width="44" height="52" rx="2"/>
        <path class="stroke s1" d="M114 98 C122 80 132 96 146 72"/><path class="stroke s2" d="M114 70 C124 76 132 66 146 86"/>`,
    },
    tote: {
      arm: 'M81 72 L100 82 M95 80 L99 74',
      held: `<g class="tote"><path class="tote-handle" d="M93 94 Q100 76 107 94"/><rect class="tote-bag" x="86" y="92" width="28" height="32" rx="3"/>
        <path class="tote-art" d="M100 99 V117 M92 103 L108 113 M92 113 L108 103"/></g>`,
    },
    cocoa: {
      arm: 'M81 70 L94 58 M90 61 L88 55',
      held: `<g class="cup"><path class="steam st1" d="M93 39 q-3 -4 0 -8 q3 -4 0 -8"/><path class="steam st2" d="M99 39 q-3 -4 0 -8 q3 -4 0 -8"/>
        <path class="steam st3" d="M105 39 q-3 -4 0 -8 q3 -4 0 -8"/><path class="cup-body" d="M88 44 H110 L107 63 H91 Z"/>
        <ellipse class="cocoa" cx="99" cy="44" rx="11" ry="3"/><path class="cup-heart" d="M99 57 c-3 -2 -4.5 -3.5 -4.5 -5 a2.2 2.2 0 0 1 4.5 -0.6 a2.2 2.2 0 0 1 4.5 0.6 c0 1.5 -1.5 3 -4.5 5z"/>
        <path class="cup-handle" d="M110 47 q6 1 5 6.5 q-1 5 -6.5 4.5"/></g>`,
    },
    honey: {
      arm: 'M81 72 L102 90 M96 85 L101 79',
      held: '<path class="dipper" d="M102 90 L120 106"/><ellipse class="dipper-head" cx="122" cy="109" rx="4" ry="5"/><circle class="drip" cx="122" cy="115" r="2"/>',
      ground: `<rect class="jar-body" x="112" y="112" width="34" height="34" rx="8"/><rect class="jar-rim" x="113" y="108" width="32" height="6" rx="2"/>
        <rect class="jar-label" x="118" y="122" width="22" height="12" rx="2"/><path class="jar-shine" d="M116 118 V140"/>`,
    },
    earrings: {
      held: `<g class="mirror"><path class="mirror-handle" d="M104 56 L109 53"/><ellipse class="mirror-frame" cx="113" cy="42" rx="9" ry="11"/>
        <ellipse class="mirror-glass" cx="113" cy="42" rx="6.5" ry="8.5"/><path class="mirror-shine" d="M109 37 L116 47"/></g>`,
      extra: `<path class="ear-hook" d="M43 44 V50 M77 44 V50"/><circle class="ear-gem e1" cx="43" cy="53" r="2.8"/><circle class="ear-gem e2" cx="77" cy="53" r="2.8"/>`,
    },
    scarf: {
      extra: `<path class="hat-stripe" d="M46 24 Q60 18 74 24"/>
        <g class="scarf-wind"><path class="scarf-long" d="M68 60 L74 98 L84 95 L76 59 Z"/><path class="scarf-stripe" d="M71 74 L79 72 M72 84 L81 82"/></g>`,
    },
  };
  function sceneSnowman(name) {
    const s = SCENES[name];
    return `<svg class="snowman scene scene-${name}" viewBox="0 0 160 160" aria-hidden="true">${s.ground || ''}${snowmanBody(s.arm, s.held, s.extra)}</svg>`;
  }
  const sceneTag = (name, cls = '') => (name ? `<span class="scene-sm ${cls}" aria-hidden="true">${sceneSnowman(name)}</span>` : '');

  function snowmanBody(armR = 'M81 70 L104 56 M98 60 L102 50', held = '', extra = '') {
    return `<ellipse class="sm-puddle" cx="60" cy="150" rx="46" ry="7"/>
      <ellipse class="sm-shadow" cx="60" cy="151" rx="30" ry="5"/>
      <g class="sm-body">
        <path class="sm-arm sm-arm-l" d="M39 70 L16 56 M22 60 L18 50"/>
        <path class="sm-arm sm-arm-r" d="${armR}"/>
        <circle class="sm-snow" cx="60" cy="118" r="32"/>
        <circle class="sm-snow" cx="60" cy="75" r="23"/>
        <circle class="sm-btn" cx="60" cy="72" r="2.6"/><circle class="sm-btn" cx="60" cy="83" r="2.6"/>
        <circle class="sm-btn" cx="60" cy="108" r="2.8"/><circle class="sm-btn" cx="60" cy="121" r="2.8"/>
        <circle class="sm-snow" cx="60" cy="40" r="17"/>
        <path class="sm-scarf" d="M43 54 Q60 63 77 54 L77 60 Q60 69 43 60 Z"/>
        <path class="sm-scarf-tail" d="M66 61 L71 80 L78 77 L73 60 Z"/>
        <circle class="sm-eye" cx="54" cy="38" r="2.2"/><circle class="sm-eye" cx="66" cy="38" r="2.2"/>
        <path class="sm-nose" d="M60 42 L77 45.5 L60 48 Z"/>
        <circle class="sm-cheek" cx="49.5" cy="45" r="3"/><circle class="sm-cheek" cx="70.5" cy="45" r="3"/>
        <path class="sm-smile" d="M53 51 Q60 56 67 51"/>
        <path class="sm-hat" d="M43 31 Q44 13 60 12 Q76 13 77 31 Z"/>
        <rect class="sm-brim" x="41" y="27" width="38" height="7" rx="3.5"/>
        <circle class="sm-pom" cx="60" cy="11" r="5"/>
        ${extra}
        ${held ? `<g class="sm-hand">${held}</g>` : ''}
      </g>`;
  }

  function landscape(cls, front) {
    const pine = (x, y, s) => `<use href="#pine" transform="translate(${x} ${y}) scale(${s})"/>`;
    return `<svg class="land ${cls}" viewBox="0 0 1440 260" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <path fill="url(#hill-far)" d="M0 140 C200 84 380 118 560 96 S900 64 1100 106 S1340 86 1440 112 V260 H0Z"/>
      <g class="pines">${pine(70, 132, .62)}${pine(118, 128, .78)}${pine(610, 104, .6)}${pine(655, 100, .74)}${pine(1170, 112, .7)}${pine(1215, 108, .56)}${pine(1330, 104, .66)}</g>
      <path fill="url(#hill-mid)" d="M0 186 C180 146 360 172 520 158 S860 128 1060 162 S1320 146 1440 166 V260 H0Z"/>
      <g class="pines">${pine(250, 172, 1.05)}${pine(300, 175, .85)}${pine(1090, 170, 1)}${pine(1395, 172, 1.1)}</g>
      <path fill="${front}" d="M0 222 C240 192 480 212 720 202 S1200 186 1440 212 V260 H0Z"/>
    </svg>`;
  }

  function viewHome() {
    const t = T();
    const workshops = WORKSHOPS.map((w, i) => `<article class="ws-card tilt reveal">
        <div class="art-tile">${artHTML(w.art, L(w.title), w.photo)}<span class="ws-num">0${i + 1}</span>${sceneTag(WS_SCENE[w.id])}</div>
        <div class="ws-body">
          <h3><button type="button" class="open" data-open="${w.id}-1">${esc(L(w.title))}</button></h3>
          <p class="ws-desc">${esc(L(w.description))}</p>
          <p class="ws-take">${icon('i-gift')}<span>${t.wsTake}</span><b>${esc(L(w.takeaway))}</b></p>
          <p class="ws-meta"><span>${icon('i-clock')}${t.wsMins}</span><span>${icon('i-pin')}${esc(L(w.location))}</span><span>${icon('i-users')}${EVENT.workshopSeats}</span></p>
          <div class="ws-slots">${WORKSHOP_SLOTS.map(([a], k) => `<button type="button" class="ws-slot" data-open="${w.id}-${k + 1}">
            <small>${t.slotShort(k + 1)}</small><b>${fmt(a)}</b></button>`).join('')}</div>
        </div>
      </article>`).join('');
    const steps = t.wsSteps.map(([a, b], i) => `<li><span class="st-n">${i + 1}</span><span><b>${a}</b><small>${b}</small></span></li>`).join('');
    const tabs = Object.entries(BOOTH_CATEGORIES).map(([k, c]) => `<button type="button" class="chip" role="tab" data-btab="${k}"
      aria-selected="${state.homeBoothCat === k}" aria-pressed="${state.homeBoothCat === k}"><span class="dot" style="--dot:${c.color}"></span>${esc(L(c.label))}</button>`).join('');
    const facts = [['i-pin', t.infoPlace, L(EVENT.location)], ['i-clock', t.infoTime, `${fmt(EVENT.start)} – ${fmt(EVENT.end)}`],
      ['i-users', t.infoGuests, t.guestsLong(EVENT.guests)]]
      .map(([ic, k, v]) => `<div class="fact crystal reveal">${icon(ic, 'icon fact-icon')}<small>${k}</small><strong>${esc(v)}</strong></div>`).join('');
    return `
      <section class="hero" id="hero">
        <video class="hero-video" muted loop playsinline preload="none" poster="media/hero-poster.jpg" aria-hidden="true">
          <source src="media/hero-loop.mp4" type="video/mp4">
        </video>
        <div class="hero-shade" aria-hidden="true"></div>
        <div class="moon" aria-hidden="true"></div>
        <canvas class="snow-canvas" aria-hidden="true"></canvas>
        <div class="hero-inner">
          <p class="hero-pill">${t.kicker}</p>
          <h1 class="hero-title" dir="ltr">The Winter Day</h1>
          <p class="hero-sub">${t.tagline}</p>
          <div class="hero-strip">
            <span class="hs-date">${icon('i-calendar')}${dateLabel()}</span>
            <span class="hs-sep" aria-hidden="true"></span>
            <span class="hs-count" id="countdown"></span>
          </div>
          <div class="hero-actions">
            <button type="button" class="btn btn-primary" data-quiz>${icon('i-spark')}${t.ctaQuiz}</button>
            <a class="btn btn-ghost" href="#/programme">${t.ctaProgramme}</a>
          </div>
        </div>
        ${landscape('hero-land', '#F3F8FD')}
        <button type="button" class="hero-sm" data-hello aria-label="${t.smAria}">${snowman('waving')}<span class="sm-say"></span></button>
        <p class="snow-hint" aria-hidden="true">${icon('flake')}${t.snowHint}</p>
      </section>

      <section class="sec sec-snow first" id="workshops">
        <div class="wrap">
          ${secHead('01', t.secWsK, t.secWsT, t.secWsS(WORKSHOPS.length, EVENT.workshopSeats))}
          <ol class="ws-steps reveal">${steps}</ol>
          <div class="ws-grid">${workshops}</div>
        </div>
      </section>

      <section class="sec sec-night">
        <div class="wrap">
          ${secHead('02', t.secProgK, t.secProgT, t.secProgS)}
          ${dayTrack()}
          <div class="sec-cta reveal"><a class="btn btn-ghost" href="#/programme">${icon('i-calendar')}${t.fullProg}</a></div>
        </div>
      </section>

      <section class="sec sec-snow">
        <div class="wrap">
          ${secHead('03', t.secBoothsK, t.secBoothsT, t.boothsLead(VENDORS.length, EVENT.vendorsTarget))}
          <div class="booth-tabs reveal" role="tablist" aria-label="${t.boothTabsAria}">${tabs}</div>
          <div class="booth-panel reveal" id="booth-panel">${boothPanel(state.homeBoothCat)}</div>
          <div class="block-head reveal"><h3>${icon('flake')}${t.featuredTitle}</h3><a class="link" href="#/booths" data-goto-bcat="all">${t.seeAll}</a></div>
          <div class="scroller reveal">${FEATURED.map((k) => productCard(...productOf(k))).join('')}</div>
        </div>
      </section>

      <section class="sec sec-night" id="map">
        <div class="wrap">
          ${secHead('04', t.mapK, t.mapT, t.mapS)}
          <div class="map-wrap reveal">
            <div class="map-box crystal">${venueMap()}
              <div class="map-legend">${Object.values(BOOTH_CATEGORIES).map((c) => `<span><i style="--dot:${c.color}"></i>${esc(L(c.label))}</span>`).join('')}</div>
            </div>
            <div class="map-info crystal" id="map-info" aria-live="polite">${mapInfo(state.mapSel)}</div>
          </div>
          <p class="map-note reveal">${icon('i-info')}${t.mapNote}</p>
        </div>
      </section>

      <section class="sec sec-snow">
        <div class="wrap">
          ${secHead('05', t.secYouK, t.secYouT)}
          <div class="exp-grid">
            <article class="exp-card reveal">
              <div class="exp-art exp-quiz">${QUIZ.questions[0].options.map((o) => `<img src="${o.photo}" alt="" loading="lazy">`).join('')}
                <span class="exp-badge">${icon('i-spark')}</span></div>
              <div class="exp-body"><h3>${t.tileQuizT}</h3><p>${t.tileQuizD}</p>
                <button type="button" class="btn btn-dark" data-quiz>${icon('i-spark')}${t.ctaQuiz}</button></div>
            </article>
            <article class="exp-card reveal">
              <div class="exp-art exp-cardart"><div class="mini-card"><small>${t.cardMy}</small><b dir="ltr">The Winter Day</b>
                <i></i><i></i><i></i><span class="mini-qr"></span></div></div>
              <div class="exp-body"><h3>${t.tileCardT}</h3><p>${t.tileCardD}</p>
                <button type="button" class="btn btn-dark" data-maker>${icon('i-card')}${t.makeCard}</button></div>
            </article>
          </div>
        </div>
      </section>

      <section class="sec sec-night">
        <div class="wrap">
          ${secHead('06', t.secVisitK, t.secVisitT)}
          <div class="visit-grid">
            <div class="facts-row">${facts}</div>
            ${qrCard('reveal')}
          </div>
          ${checklist()}
          <div class="sec-cta reveal"><a class="btn btn-ghost" href="#/info">${icon('i-info')}${t.moreInfo}</a></div>
        </div>
      </section>`;
  }

  const boothNum = (v) => Number((v.location.en.match(/\d+/) || [0])[0]);
  function boothPanel(cat) {
    const t = T(), c = BOOTH_CATEGORIES[cat];
    const vs = VENDORS.filter((v) => v.category === cat);
    return `<a class="bp-intro" href="#/booths" data-goto-bcat="${cat}">
        <span class="art-tile">${artHTML(c.art, '', c.photo)}</span>${sceneTag(CAT_SCENE[cat], 'bp-sm')}
        <span class="bp-over"><small>${t.vendorsIn(vs.length)}</small><strong>${esc(L(c.label))}</strong>
          <span class="bp-all">${t.allInCat(L(c.label))}${icon('i-arrow')}</span></span>
      </a>
      <div class="bp-list">${vs.map((v) => `<a class="bp-row" href="#/booth/${v.id}">
        <span class="art-tile sm">${artHTML(v.art, '', v.photo)}</span>
        <span class="bp-text"><b>${esc(L(v.name))}</b><small>${esc(L(v.tagline))}</small>
          <em>${icon('i-pin')}${t.boothNo(boothNum(v))} · ${t.productsCount(v.products.length)}</em></span>
        <span class="bp-go">${icon('i-arrow')}</span></a>`).join('')}</div>`;
  }

  const ROOMS = WORKSHOPS.map((w, i) => ({ id: `room${i + 1}`, x: 10, y: 80 + i * 74, w: 100, h: 66, workshop: w.id, n: i + 1 }));
  const zoneById = (id) => MAP_ZONES.find((z) => z.id === id) || ROOMS.find((r) => r.id === id);
  function pinSpots() {

    const spots = {};
    MAP_ZONES.filter((z) => z.booths).forEach((z) => {
      const cols = z.booths.length > 3 ? 3 : z.booths.length, rows = Math.ceil(z.booths.length / cols);
      z.booths.forEach((n, i) => {
        const c = i % cols, r = Math.floor(i / cols);
        spots[n] = [z.x + z.w * (c + .5) / cols, rows > 1 ? z.y + 34 + (z.h - 44) * (r + .5) / rows : z.y + z.h - 17];
      });
    });
    return spots;
  }
  function venueMap() {
    const t = T(), spots = pinSpots();
    const zone = (z, label, cls = '') => `<g class="mz ${cls}" data-zone="${z.id}" role="button" tabindex="0" aria-label="${esc(label)}">
      <rect x="${z.x}" y="${z.y}" width="${z.w}" height="${z.h}" rx="14"/>
      <text x="${z.x + z.w / 2}" y="${z.booths ? z.y + (z.booths.length > 3 ? 20 : 15) : z.y + z.h / 2 + 4}">${esc(label)}</text></g>`;
    const zones = MAP_ZONES.map((z) => zone(z, L(z.label), z.gate ? 'gate' : z.booths ? 'booths' : 'place')).join('')
      + ROOMS.map((r) => zone(r, t.mapRoom(r.n), 'room')).join('');
    const pins = VENDORS.map((v) => {
      const [x, y] = spots[boothNum(v)] || [0, 0];
      return `<g class="mp" data-pin="${v.id}" role="button" tabindex="0" aria-label="${esc(L(v.name))}" transform="translate(${x} ${y})" style="--c:${BOOTH_CATEGORIES[v.category].color}">
        <circle r="13"/><text y="4.5">${boothNum(v)}</text></g>`;
    }).join('');

    const empty = Object.keys(spots).filter((n) => !VENDORS.some((v) => boothNum(v) === Number(n)))
      .map((n) => `<g class="mp empty" transform="translate(${spots[n][0]} ${spots[n][1]})"><circle r="10"/></g>`).join('');
    const flakes = [[60, 40], [200, 36], [340, 44], [395, 300], [6, 300]].map(([x, y]) => `<use href="#flake" x="${x - 6}" y="${y - 6}" width="12" height="12" class="mflake"/>`).join('');
    return `<svg class="venue" viewBox="0 0 400 470" role="group" aria-label="${t.mapK}">${zones}${flakes}${empty}${pins}
      <g class="you" transform="translate(166 447)"><circle r="5"/><circle r="5" class="you-ring"/></g>
      <g class="map-walker" id="map-walker" style="transform: translate(238px, 458px)"><svg class="snowman mini waving" x="-16" y="-43" width="32" height="43" viewBox="0 0 120 160">${snowmanBody()}</svg></g></svg>`;
  }
  function mapInfo(sel) {
    const t = T();
    const sessionRow = (s) => `<button type="button" class="mi-row" data-open="${s.id}"><span class="mi-time">${s.start ? fmt(s.start) : t.tbc}</span>
      <span>${esc(L(s.title))}</span>${icon('i-arrow')}</button>`;
    if (!sel) {
      return `<p class="eyebrow">${icon('i-pin')}${t.mapStartT}</p><p class="mi-text">${esc(L(EVENT.help))}</p>
        <p class="mi-pick">${t.mapPick}</p><div class="mi-chips">${[...MAP_ZONES.filter((z) => !z.gate), ...ROOMS.slice(0, 1)].map((z) =>
          `<button type="button" class="chip" data-zone="${z.id}">${esc(z.label ? L(z.label) : t.mapRoom(z.n))}</button>`).join('')}</div>`;
    }
    const [kind, id] = sel;
    if (kind === 'pin') {
      const v = VENDOR_BY_ID[id], name = L(v.name), c = BOOTH_CATEGORIES[v.category];
      return `<div class="mi-booth"><span class="art-tile">${artHTML(v.art, name, v.photo)}</span>
        <div><span class="tag" style="--dot:${c.color}">${esc(L(c.label))}</span><h3>${esc(name)}</h3>
          <p class="mi-text">${esc(L(v.tagline))}</p><p class="loc">${icon('i-pin')}${esc(L(v.location))}</p></div></div>
        <div class="mi-actions"><a class="btn btn-primary" href="#/booth/${v.id}">${icon('i-bag')}${t.openBooth}</a>${heart('v:' + v.id, name)}</div>`;
    }
    const z = zoneById(id);
    if (z.workshop) {
      const w = WORKSHOPS.find((x) => x.id === z.workshop);
      return `<p class="eyebrow">${icon('i-pin')}${esc(L(w.location))}</p>
        <div class="mi-booth"><span class="art-tile">${artHTML(w.art, '', w.photo)}</span>
        <div><h3>${esc(L(w.title))}</h3><p class="mi-text">${esc(L(w.description))}</p></div></div>
        <div class="mi-list">${SESSIONS.filter((s) => s.workshop === w.id).map(sessionRow).join('')}</div>`;
    }
    if (z.booths) {
      const vs = VENDORS.filter((v) => z.booths.includes(boothNum(v)));
      return `<p class="eyebrow">${icon('i-pin')}${esc(L(z.label))}</p><p class="mi-sub">${t.mapBoothsHere}</p>
        <div class="mi-list">${vs.map((v) => `<button type="button" class="mi-row" data-pin="${v.id}"><span class="mi-num" style="--c:${BOOTH_CATEGORIES[v.category].color}">${boothNum(v)}</span>
          <span>${esc(L(v.name))}</span>${icon('i-arrow')}</button>`).join('')}</div>`;
    }
    if (z.gate) return `<p class="eyebrow">${icon('i-pin')}${esc(L(z.label))}</p><p class="mi-text">${esc(L(EVENT.help))}</p>`;
    return `<p class="eyebrow">${icon('i-pin')}${esc(L(z.label))}</p><p class="mi-sub">${t.mapHere}</p>
      <div class="mi-list">${z.sessions.map((sid) => sessionRow(SESSIONS.find((s) => s.id === sid))).join('')}</div>`;
  }
  let walkTimer = 0;
  function walkTo(kind, id) {
    const walker = $('#map-walker');
    if (!walker) return;
    let tx, ty;
    if (kind === 'pin') {
      const [x, y] = pinSpots()[boothNum(VENDOR_BY_ID[id])] || [238, 458];
      tx = x + 30; ty = y + 18;
    } else {
      const z = zoneById(id);
      tx = z.x + z.w - 17; ty = z.y + z.h - 4;
    }
    const sm = $('.snowman', walker);
    sm.classList.remove('waving');
    sm.classList.add('walking');
    walker.style.transform = `translate(${tx}px, ${ty}px)`;
    clearTimeout(walkTimer);
    walkTimer = setTimeout(() => { sm.classList.remove('walking'); sm.classList.add('waving'); }, calm() ? 0 : 1150);
  }

  function selectMap(kind, id, scroll = true) {
    state.mapSel = [kind, id];
    $$('.venue .sel').forEach((el) => el.classList.remove('sel'));
    const el = $(`.venue [data-${kind === 'pin' ? 'pin' : 'zone'}="${id}"]`);
    if (el) el.classList.add('sel');
    if (kind === 'pin') {
      const n = boothNum(VENDOR_BY_ID[id]);
      const z = MAP_ZONES.find((x) => x.booths && x.booths.includes(n));
      if (z) $(`.venue [data-zone="${z.id}"]`).classList.add('sel');
    }
    walkTo(kind, id);
    const box = $('#map-info');
    box.innerHTML = mapInfo(state.mapSel);
    box.classList.remove('pop'); void box.offsetWidth; box.classList.add('pop');
    if (scroll && matchMedia('(max-width: 759px)').matches && box.getBoundingClientRect().top > innerHeight * .7) {
      box.scrollIntoView({ behavior: calm() ? 'auto' : 'smooth', block: 'nearest' });
    }
  }

  function checklist() {
    const t = T(), done = state.checks;
    const n = t.checkItems.filter((_, i) => done[i]).length;
    return `<div class="checklist crystal reveal">
      <div class="cl-head"><div><h3>${icon('flake')}${t.checkT}</h3><p class="muted small">${t.checkS}</p></div>
        <span class="cl-count"><b>${n}</b>/${t.checkItems.length}</span></div>
      <div class="cl-bar"><span style="width:${(n / t.checkItems.length) * 100}%"></span></div>
      <ul>${t.checkItems.map((item, i) => `<li><label><input type="checkbox" data-check="${i}" ${done[i] ? 'checked' : ''}>
        <span class="cl-box">${icon('i-check')}</span><span>${esc(item)}</span></label></li>`).join('')}</ul>
    </div>`;
  }
  function toggleCheck(i, on) {
    state.checks[i] = on;
    store(CHECK_KEY, state.checks);
    const t = T(), n = t.checkItems.filter((_, k) => state.checks[k]).length;
    $('.cl-count b').textContent = n;
    $('.cl-bar span').style.width = `${(n / t.checkItems.length) * 100}%`;
    if (n === t.checkItems.length && on) { toast(t.checkDone); if (navigator.vibrate) navigator.vibrate([10, 40, 10]); }
  }

  const startOf = (id) => SESSIONS.find((s) => s.id === id).start;
  const DAY_STOPS = [[startOf('s1'), 's1'], [startOf('w1-1'), 'w1-1'], [startOf('w1-2'), 'w1-2'],
    [startOf('s3'), 's3'], [startOf('s5'), 's5'], [EVENT.end, 's5']];
  const hm = (m) => `${Math.floor(m / 60)}:${String(m % 60).padStart(2, '0')}`;
  function dayTrack() {
    const t = T();
    const stops = DAY_STOPS.map(([time, id], i) => `<li class="dt-stop"><button type="button" data-open="${id}">
      <span class="dt-dot"></span><b>${fmt(time)}</b><span>${t.stops[i]}</span></button></li>`).join('');
    return `<div class="day-track reveal" id="day-track" style="--n:${DAY_STOPS.length - 1};--p:0">
      <div class="dt-stage"><div class="dt-walker"><span class="dt-bubble"></span>${snowman()}</div></div>
      <div class="dt-ground" aria-hidden="true"></div>
      <div class="dt-line" aria-hidden="true"><span class="dt-fill"></span></div>
      <ol class="dt-stops">${stops}</ol>
    </div>`;
  }
  function startWalker(track) {
    if (!track) return;
    const t = T();
    const sm = $('.snowman', track), bubble = $('.dt-bubble', track), stops = $$('.dt-stop', track);
    const times = DAY_STOPS.map(([x]) => toMin(x)), n = times.length - 1;
    const place = (p) => {
      track.style.setProperty('--p', p.toFixed(4));
      const x = p * n, i = Math.min(n - 1, Math.floor(x));
      bubble.textContent = fmt(hm(Math.round(times[i] + (times[i + 1] - times[i]) * (x - i))));
      stops.forEach((s, k) => s.classList.toggle('passed', k <= x + 1e-6));
    };
    const mode = (cls) => {
      sm.classList.remove('walking', 'melting', 'melted', 'reform', 'waving');
      if (cls) sm.classList.add(cls);
      track.classList.toggle('melt', cls === 'melting' || cls === 'melted');
    };

    const n0 = now();
    if (isEventDay(n0) && minutesOf(n0) >= times[0]) {
      const m = minutesOf(n0);
      if (m >= times[n]) { place(1); mode('melted'); bubble.textContent = t.meltedMsg; track.classList.add('done'); return; }
      let i = 0;
      while (i < n - 1 && m >= times[i + 1]) i++;
      place((i + (m - times[i]) / (times[i + 1] - times[i])) / n);
      mode('waving');
      bubble.textContent = t.nowAt(fmt(hm(m)));
      return;
    }
    if (calm()) { place(0); mode('waving'); return; }
    const WALK = 15000, MELT = 2300, GONE = 700, BACK = 1100, LOOP = WALK + MELT + GONE + BACK;
    let raf = 0, t0 = performance.now(), phase = '', visible = true, pausedAt = 0;
    const frame = (ts) => {
      const e = (ts - t0) % LOOP;
      let ph;
      if (e < WALK) { place(e / WALK); ph = 'walking'; }
      else if (e < WALK + MELT) ph = 'melting';
      else if (e < WALK + MELT + GONE) ph = 'melted';
      else { place(0); ph = 'reform'; }
      if (ph !== phase) { phase = ph; mode(ph); }
      raf = requestAnimationFrame(frame);
    };
    const io = new IntersectionObserver(([en]) => {
      if (en.isIntersecting && !visible) { visible = true; t0 += performance.now() - pausedAt; raf = requestAnimationFrame(frame); }
      else if (!en.isIntersecting && visible) { visible = false; pausedAt = performance.now(); cancelAnimationFrame(raf); }
    });
    io.observe(track);
    raf = requestAnimationFrame(frame);
    cleanups.push(() => { cancelAnimationFrame(raf); io.disconnect(); });
  }

  function setupProgWalker() {
    const wrap = $('.tl-wrap');
    if (!wrap) return;
    const walker = $('.tl-walker', wrap), sm = $('.snowman', walker), bubble = $('.dt-bubble', walker);
    let raf = 0, idle = 0, melted = false;
    const update = () => {
      raf = 0;
      const r = wrap.getBoundingClientRect(), h = walker.offsetHeight, room = Math.max(0, r.height - h);

      const left = document.documentElement.scrollHeight - innerHeight - scrollY;
      const line = innerHeight * (.42 + .58 * Math.min(1, Math.max(0, 1 - left / innerHeight)));
      const p = room ? Math.min(1, Math.max(0, (line - r.top) / room)) : 0;
      const y = p * room;
      walker.style.transform = `translateY(${y.toFixed(1)}px)`;

      let label = '';
      $$('.tg-head', wrap).forEach((head) => { if (head.offsetTop <= y + h * .6) label = head.querySelector('.tg-time').textContent; });
      bubble.textContent = label;
      if (p >= .995 && !melted) { melted = true; sm.classList.remove('walking', 'reform'); sm.classList.add('melting'); }
      else if (p < .97 && melted) { melted = false; sm.classList.remove('melting'); sm.classList.add('reform'); }
      else if (!melted && !calm()) {
        sm.classList.add('walking');
        clearTimeout(idle);
        idle = setTimeout(() => sm.classList.remove('walking'), 220);
      }
      walker.classList.toggle('melt', melted);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    progWalkerUpdate = onScroll;
    update();
    sm.classList.remove('walking');
    cleanups.push(() => {
      removeEventListener('scroll', onScroll); removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf); clearTimeout(idle); progWalkerUpdate = null;
    });
  }

  let helloIdx = 0, helloTimer = 0;
  function sayHello(btn) {
    const say = $('.sm-say', btn), t = T();
    const step = helloIdx % 3, msg = Math.floor(helloIdx / 3) % t.smHello.length;
    helloIdx++;
    btn.classList.remove('hop', 'dance', 'sneeze');
    void btn.offsetWidth;
    if (step === 0) { say.textContent = t.smHello[msg]; btn.classList.add('hop'); }
    if (step === 1) { say.textContent = t.smDance; btn.classList.add('dance'); }
    if (step === 2) { say.textContent = t.smSneeze; btn.classList.add('sneeze'); sneeze(btn); }
    btn.classList.add('talk');
    clearTimeout(helloTimer);
    helloTimer = setTimeout(() => btn.classList.remove('talk'), 2600);
    if (navigator.vibrate) navigator.vibrate(step === 2 ? [20, 30, 40] : 10);
  }
  function sneeze(btn) {
    if (calm()) return;
    const dir = document.documentElement.dir === 'rtl' ? -1 : 1;
    for (let i = 0; i < 16; i++) {
      const f = document.createElement('span');
      f.className = 'sneeze-flake';
      f.style.setProperty('--dx', `${dir * (40 + Math.random() * 80)}px`);
      f.style.setProperty('--dy', `${(Math.random() - .6) * 70}px`);
      f.style.setProperty('--s', (.5 + Math.random()).toFixed(2));
      f.style.animationDelay = `${(Math.random() * 120).toFixed(0)}ms`;
      btn.appendChild(f);
      setTimeout(() => f.remove(), 1200);
    }
  }

  function favPop(el) {
    if (calm() || !el) return;
    const r = el.getBoundingClientRect();
    const pop = document.createElement('div');
    pop.className = 'fav-pop';
    pop.style.left = `${r.left + r.width / 2}px`;
    pop.style.top = `${r.top + 4}px`;
    pop.innerHTML = snowman('throw') + [-2, -1, 0, 1, 2].map((k, i) =>
      `<span class="fav-heart" style="--dx:${k * 24}px;--d:${200 + i * 70}ms">${icon('i-heart', '')}</span>`).join('');
    (el.closest('dialog') || document.body).appendChild(pop);
    setTimeout(() => pop.remove(), 1700);
  }

  function renderCountdown() {
    const el = $('#countdown');
    if (!el) return;
    const n = now(), t = T();
    if (n < at(EVENT.start)) {
      const mins = Math.ceil((at(EVENT.start) - n) / 60000);
      el.innerHTML = [[Math.floor(mins / 1440), t.daysS], [Math.floor((mins % 1440) / 60), t.hoursS], [mins % 60, t.minsS]]
        .map(([v, l]) => `<span class="hc"><b>${v}</b>${l}</span>`).join('');
    } else if (n < at(EVENT.end)) {
      const live = sorted.find((s) => statusOf(s, n) === 'live');
      el.innerHTML = `<span class="pulse"></span>${t.liveNow}${live ? `: <button type="button" class="hs-live" data-open="${live.id}">${esc(L(live.title))}</button>` : ''}`;
    } else {
      el.textContent = t.thanks;
    }
  }

  function setupHeroVideo(video) {
    if (!video || calm() || (navigator.connection && navigator.connection.saveData)) return;
    video.preload = 'auto';
    video.play().catch(() => { });
  }

  function startSnow(canvas) {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const hero = canvas.parentElement;
    let W = 0, H = 0, raf = 0, running = true;
    const flakes = [];
    const pointer = { x: -999, y: -999, on: false };
    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas.clientWidth; H = canvas.clientHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const flake = (x, y, burst) => {
      const a = Math.random() * Math.PI * 2, sp = burst ? 2 + Math.random() * 4 : 0;
      return { x, y, r: .8 + Math.random() * 2.6, fall: .35 + Math.random() * .9, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp,
        sway: Math.random() * 6.28, o: .35 + Math.random() * .6, burst };
    };
    size();
    const count = Math.round(Math.min(170, (W * H) / 5200));
    for (let i = 0; i < count; i++) flakes.push(flake(Math.random() * W, Math.random() * H, false));
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#fff';
      for (const f of flakes) {
        ctx.globalAlpha = f.o;
        ctx.beginPath(); ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2); ctx.fill();
      }
    };
    const step = () => {
      for (let i = flakes.length - 1; i >= 0; i--) {
        const f = flakes[i];
        f.sway += .012;
        f.vx += Math.sin(f.sway) * .012;
        if (pointer.on) {
          const dx = f.x - pointer.x, dy = f.y - pointer.y, d2 = dx * dx + dy * dy;
          if (d2 < 120 * 120) {
            const d = Math.sqrt(d2) || 1, k = ((120 - d) / 120) * 1.4;
            f.vx += (dx / d) * k; f.vy += (dy / d) * k * .7;
          }
        }
        f.vx *= .95;
        f.vy += (f.fall - f.vy) * .03;
        f.x += f.vx; f.y += f.vy;
        if (f.y > H + 10 || f.x < -30 || f.x > W + 30 || f.y < -60) {
          if (f.burst) flakes.splice(i, 1);
          else Object.assign(f, flake(Math.random() * W, -8, false));
        }
      }
      draw();
      if (running) raf = requestAnimationFrame(step);
    };
    const local = (e) => { const r = canvas.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };
    const move = (e) => { [pointer.x, pointer.y] = local(e); pointer.on = true; };
    const leave = () => { pointer.on = false; };
    const tap = (e) => {
      if (e.target.closest('a, button')) return;
      const [x, y] = local(e);
      for (let i = 0; i < 26; i++) flakes.push(flake(x, y, true));
    };
    hero.addEventListener('pointermove', move);
    hero.addEventListener('pointerleave', leave);
    hero.addEventListener('pointerdown', tap);
    window.addEventListener('resize', size);

    const io = new IntersectionObserver(([en]) => {
      const vis = en.isIntersecting;
      if (vis && !running && !calm()) { running = true; raf = requestAnimationFrame(step); }
      if (!vis) { running = false; cancelAnimationFrame(raf); }
    });
    io.observe(hero);
    if (calm()) { running = false; draw(); } else raf = requestAnimationFrame(step);
    cleanups.push(() => { running = false; cancelAnimationFrame(raf); io.disconnect(); window.removeEventListener('resize', size); });
  }

  function pageBand(title, lead = '') {
    return `<section class="page-band">
      <canvas class="snow-canvas" aria-hidden="true"></canvas>
      <header class="wrap page-head"><h1>${title}</h1>${lead ? `<p class="muted">${lead}</p>` : ''}</header>
      ${landscape('band-land', '#0A1B3A')}
    </section>`;
  }

  function chips(attr, current, entries) {
    return [['all', T().all], ...entries].map(([key, label, color]) =>
      `<button type="button" class="chip" ${attr}="${key}" aria-pressed="${current === key}">
        ${color ? `<span class="dot" style="--dot:${color}"></span>` : ''}${esc(label)}</button>`).join('');
  }
  function viewProgramme() {
    const t = T();
    const cats = Object.entries(CATEGORIES).map(([k, c]) => [k, L(c.label), c.color]);
    const table = state.progView === 'table';
    return `${pageBand(t.progTitle, t.progLead)}<div class="wrap page">
      <div class="tools">
        <label class="search">${icon('i-search')}<input type="search" id="prog-search" value="${esc(state.progQ)}"
          placeholder="${t.searchProg}" aria-label="${t.searchProgAria}" autocomplete="off"></label>
        <div class="tools-row">
          <div class="chips" id="prog-chips" role="group" aria-label="${t.filterAria}">${chips('data-cat', state.progCat, cats)}</div>
          <div class="seg" role="group" aria-label="${t.viewAria}">
            <button type="button" data-view="timeline" aria-pressed="${!table}">${icon('i-clock')}${t.viewTimeline}</button>
            <button type="button" data-view="table" aria-pressed="${table}">${icon('i-calendar')}${t.viewTable}</button>
          </div>
        </div>
      </div>
      <p class="result-count" id="prog-count" aria-live="polite"></p>
      <div class="tl-wrap${table ? ' is-table' : ''}">
        <div class="tl-walker" aria-hidden="true"><span class="dt-bubble"></span>${snowman()}</div>
        <div id="prog-list" class="timeline"></div>
      </div>
    </div>`;
  }
  function sessionCard(s, n) {
    const t = T();
    const st = statusOf(s, n);
    const cat = CATEGORIES[s.category];
    const title = L(s.title);
    const badges = (st === 'live' ? `<span class="badge live"><span class="pulse"></span>${t.badgeLive}</span>` : '')
      + (st === 'past' ? `<span class="badge past">${t.badgePast}</span>` : '')
      + (s.capacity ? `<span class="badge seats">${icon('i-users')}${t.seats(s.capacity)}</span>` : '')
      + (s.start ? '' : `<span class="badge soon">${t.tbc}</span>`);
    return `<li class="s-card${st ? ' is-' + st : ''}${s.start ? '' : ' is-tbc'}">
      <span class="art-tile sm">${artHTML(s.art, '', s.photo)}</span>
      <div class="s-body">
        <div class="meta"><span class="tag" style="--dot:${cat.color}">${esc(L(cat.label))}</span>${badges}</div>
        <h3><button type="button" class="open" data-open="${s.id}">${esc(title)}</button></h3>
        <p class="loc">${icon('i-clock')}${timeRange(s)}<span class="sep">·</span>${icon('i-pin')}${esc(L(s.location))}</p>
      </div>
      ${heart('s:' + s.id, title)}
    </li>`;
  }
  function renderProgList() {
    const list = $('#prog-list');
    if (!list) return;
    const n = now(), t = T();
    const q = norm(state.progQ.trim());
    const items = sorted.filter((s) =>
      (state.progCat === 'all' || s.category === state.progCat) &&
      (!q || norm([s.title, s.location, s.description].map(both).join(' ')).includes(q)));
    const table = state.progView === 'table';
    const sig = JSON.stringify([state.lang, state.progCat, state.progView, q, items.map((s) => s.id + statusOf(s, n))]);
    if (sig === progSig) return;
    progSig = sig;
    $('#prog-count').textContent = items.length ? t.sessionsCount(items.length) : '';
    list.parentElement.classList.toggle('is-table', table);
    list.className = table ? 'prog-table-wrap' : 'timeline';
    if (!items.length) {
      list.innerHTML = `<div class="empty"><strong>${t.emptyT}</strong><span>${t.emptyD}</span></div>`;
      if (progWalkerUpdate) progWalkerUpdate();
      return;
    }
    if (table) {
      list.innerHTML = `<table class="prog-table"><thead><tr><th>${t.colTime}</th><th>${t.colSession}</th>
        <th class="pt-loc">${t.colPlace}</th><th class="pt-fav"></th></tr></thead><tbody>${items.map((s) => {
        const st = statusOf(s, n), cat = CATEGORIES[s.category], title = L(s.title);
        return `<tr class="${st ? 'is-' + st : ''}">
          <td class="pt-time">${s.start ? `${fmt(s.start)}<small>${fmt(s.end)}</small>` : `<small>${t.tbc}</small>`}</td>
          <td class="pt-title"><span class="pt-name"><span class="dot" style="--dot:${cat.color}"></span>
            <button type="button" class="open" data-open="${s.id}">${esc(title)}</button></span>
            ${st === 'live' ? `<span class="badge live"><span class="pulse"></span>${t.badgeLive}</span>` : ''}
            ${s.capacity ? `<span class="badge seats">${icon('i-users')}${t.seats(s.capacity)}</span>` : ''}
            <small class="pt-sub">${icon('i-pin')}${esc(L(s.location))}</small></td>
          <td class="pt-loc">${esc(L(s.location))}</td>
          <td class="pt-fav">${heart('s:' + s.id, title)}</td></tr>`;
      }).join('')}</tbody></table>`;
      return;
    }
    const groups = [];
    items.forEach((s) => {
      const key = s.start || 'tbc';
      const g = groups[groups.length - 1];
      if (g && g.key === key) g.items.push(s); else groups.push({ key, items: [s] });
    });
    list.innerHTML = groups.map((g) => `<section class="time-group">
      <h2 class="tg-head"><span class="tg-dot" aria-hidden="true"></span><span class="tg-time">${g.key === 'tbc' ? t.tbc : fmt(g.key)}</span>
        <span class="tg-count">${t.sessionsCount(g.items.length)}</span></h2>
      <ul class="session-list">${g.items.map((s) => sessionCard(s, n)).join('')}</ul></section>`).join('');
    if (progWalkerUpdate) progWalkerUpdate();
  }

  function viewBooths() {
    const t = T();
    const cats = Object.entries(BOOTH_CATEGORIES).map(([k, c]) => [k, L(c.label)]);
    return `${pageBand(t.boothsPageTitle, t.boothsLead(VENDORS.length, EVENT.vendorsTarget))}<div class="wrap page">
      <div class="tools">
        <label class="search">${icon('i-search')}<input type="search" id="booth-search" value="${esc(state.boothQ)}"
          placeholder="${t.searchBooth}" aria-label="${t.searchBoothAria}" autocomplete="off"></label>
        <div class="chips" id="booth-chips" role="group" aria-label="${t.filterAria}">${chips('data-bcat', state.boothCat, cats)}</div>
      </div>
      <p class="result-count" id="booth-count" aria-live="polite"></p>
      <div id="booth-list"></div>
    </div>`;
  }
  function vendorCard(v, matched) {
    const t = T();
    const name = L(v.name);
    return `<article class="v-card tilt">
      <div class="art-tile tile-${v.category}">${artHTML(v.art, name, v.photo)}</div>
      <div class="v-over">
        <span class="tag plain">${esc(L(BOOTH_CATEGORIES[v.category].label))}</span>
        <h3><a class="v-link" href="#/booth/${v.id}">${esc(name)}</a></h3>
        <p class="v-tagline">${esc(L(v.tagline))}</p>
        ${matched && matched.length ? `<p class="found">${t.found} ${esc(matched.join(state.lang === 'ar' ? '، ' : ', '))}</p>` : ''}
        <p class="loc">${icon('i-pin')}${esc(L(v.location))}</p>
      </div>
      ${heart('v:' + v.id, name, 'on-art')}
    </article>`;
  }
  function renderBoothList() {
    const list = $('#booth-list');
    if (!list) return;
    const t = T();
    const q = norm(state.boothQ.trim());
    const results = [];
    VENDORS.forEach((v) => {
      if (state.boothCat !== 'all' && v.category !== state.boothCat) return;
      if (!q) { results.push([v, null]); return; }
      const matched = v.products.filter((p) => norm(both(p.name)).includes(q)).map((p) => L(p.name));
      if (matched.length || norm([v.name, v.tagline, v.description].map(both).join(' ')).includes(q)) results.push([v, matched]);
    });
    $('#booth-count').textContent = results.length ? t.vendorsIn(results.length) : '';
    const missing = EVENT.vendorsTarget - VENDORS.length;
    const more = state.boothCat === 'all' && !q && missing > 0
      ? `<div class="v-card more-card">${icon('flake', 'more-flake')}<strong>${t.moreSoonT(missing)}</strong><span class="muted small">${t.moreSoonD}</span></div>` : '';
    if (!results.length) { list.innerHTML = `<div class="empty"><strong>${t.emptyT}</strong><span>${t.emptyD}</span></div>`; return; }
    if (state.boothCat === 'all' && !q) {

      list.innerHTML = Object.entries(BOOTH_CATEGORIES).map(([k, c]) => {
        const vs = results.filter(([v]) => v.category === k);
        return vs.length ? `<section class="booth-group"><h2 class="group-head"><span class="dot" style="--dot:${c.color}"></span>${esc(L(c.label))}
          <span class="gh-count">${t.vendorsIn(vs.length)}</span></h2><div class="vendor-grid">${vs.map(([v, m]) => vendorCard(v, m)).join('')}</div></section>` : '';
      }).join('') + (more ? `<div class="vendor-grid more-row">${more}</div>` : '');
      return;
    }
    list.innerHTML = `<div class="vendor-grid">${results.map(([v, m]) => vendorCard(v, m)).join('')}</div>`;
  }

  function viewBooth(id) {
    const t = T();
    const v = VENDOR_BY_ID[id];
    const name = L(v.name);
    const similar = VENDORS.filter((o) => o.category === v.category && o.id !== v.id);
    return `<div class="wrap page">
      <a class="back" href="#/booths">${icon('i-back')}${t.back}</a>
      <section class="vendor-hero">
        <div class="art-tile tile-${v.category} xl">${artHTML(v.art, name, v.photo)}</div>
        ${sceneTag(CAT_SCENE[v.category], 'vh-sm')}
        <div class="vh-over">
          <span class="tag plain">${esc(L(BOOTH_CATEGORIES[v.category].label))}</span>
          <h1>${esc(name)}</h1>
          <p class="lead">${esc(L(v.tagline))}</p>
        </div>
      </section>
      <div class="vh-bar">
        <div class="vh-facts">
          <span>${icon('i-pin')}${esc(L(v.location))}</span>
          <span>${icon('i-bag')}${t.productsCount(v.products.length)}</span>
        </div>
        <div class="vh-actions">${shareBtn('booth/' + v.id, name)}${heart('v:' + v.id, name, 'lg')}</div>
      </div>
      <p class="vh-desc">${esc(L(v.description))}</p>
      <h2 class="sub-head">${t.productsTitle}</h2>
      <div class="product-grid">${v.products.map((p) => productCard(v, p)).join('')}</div>
      <p class="note">${t.pricesNote}</p>
      ${similar.length ? `<h2 class="sub-head">${t.similar}</h2><div class="vendor-grid">${similar.map((o) => vendorCard(o)).join('')}</div>` : ''}
    </div>`;
  }

  function viewFavourites() {
    const t = T();
    const n = now();
    const sessions = sorted.filter((s) => state.favs.has('s:' + s.id));
    const vendors = VENDORS.filter((v) => state.favs.has('v:' + v.id));
    const products = VENDORS.flatMap((v) => v.products.filter((p) => state.favs.has(`p:${v.id}/${p.id}`)).map((p) => [v, p]));
    const total = sessions.length + vendors.length + products.length;
    const head = pageBand(t.favTitle, t.favLead);
    if (!total) {
      return `${head}<div class="wrap page"><div class="empty big">
        <span class="empty-heart">${icon('i-heart', '')}</span><strong>${t.favEmptyT}</strong><span>${t.favEmptyD}</span>
        <div class="empty-actions"><button type="button" class="btn btn-primary" data-quiz>${icon('i-spark')}${t.ctaQuiz}</button>
        <a class="btn btn-outline" href="#/booths">${t.browseBooths}</a></div></div></div>`;
    }
    const tabs = [['all', t.all, total], ['sessions', t.favSessions, sessions.length],
      ['vendors', t.favVendors, vendors.length], ['products', t.favProducts, products.length]]
      .map(([k, l, c]) => `<button type="button" class="chip" data-ftab="${k}" aria-pressed="${state.favTab === k}">${l} <span class="chip-count">${c}</span></button>`).join('');
    const show = (k) => state.favTab === 'all' || state.favTab === k;
    const section = (title, html) => (state.favTab === 'all' ? `<h2 class="sub-head">${title}</h2>${html}` : html);
    let body = '';
    if (show('sessions') && sessions.length) {
      body += section(t.favSessions, `<ul class="session-list">${sessions.map((s) => sessionCard(s, n)).join('')}</ul>`);
    }
    if (show('vendors') && vendors.length) {
      body += section(t.favVendors, `<div class="vendor-grid">${vendors.map((v) => vendorCard(v)).join('')}</div>`);
    }
    if (show('products') && products.length) {
      body += section(t.favProducts, `<div class="product-grid">${products.map(([v, p]) => productCard(v, p)).join('')}</div>`);
    }
    if (!body) body = `<div class="empty"><strong>${t.emptyT}</strong></div>`;
    return `${head}<div class="wrap page"><div class="chips fav-tabs" role="group" aria-label="${t.filterAria}">${tabs}</div>${body}
      <button type="button" class="tile t-card crystal fav-card" data-maker><span class="t-icon">${icon('i-card')}</span>
        <strong>${t.tileCardT}</strong><small>${t.tileCardD}</small></button></div>`;
  }

  function viewInfo() {
    const t = T();
    const info = [
      ['i-calendar', t.infoDate, dateLabel()],
      ['i-clock', t.infoTime, `${fmt(EVENT.start)} – ${fmt(EVENT.end)}`],
      ['i-pin', t.infoPlace, L(EVENT.location)],
      ['i-bag', t.infoVendors, t.vendorsInfo(VENDORS.length, EVENT.vendorsTarget)],
      ['i-users', t.infoWorkshops, t.workshopsInfo(WORKSHOPS.length, EVENT.workshopSeats)],
      ['i-heart', t.infoGuests, t.guestsLong(EVENT.guests)],
    ].map(([ic, k, v]) => `<div class="info crystal">${icon(ic, 'icon info-icon')}<small>${k}</small><strong>${esc(v)}</strong></div>`).join('');
    return `${pageBand(t.infoTitle)}<div class="wrap page">
      <div class="info-grid">${info}</div>
      <section class="about crystal">
        <h2>${t.aboutTitle}</h2><p>${esc(L(EVENT.about))}</p>
        <div class="values">${EVENT.values.map((x) => `<span>${esc(L(x))}</span>`).join('')}</div>
      </section>
      <h2 class="sub-head">${t.faqTitle}</h2>
      <div class="faq">${FAQ.map((f) => `<details><summary>${esc(L(f.q))}</summary><p>${esc(L(f.a))}</p></details>`).join('')}</div>
      <div class="help">${icon('flake', 'help-flake')}<p><strong>${t.helpTitle}</strong> ${esc(L(EVENT.help))}</p></div>
      <div class="app-cards">${installCard()}${qrCard()}</div>
    </div>`;
  }
  function qrCard(cls = '') {
    const t = T();
    return `<div class="qr-card crystal ${cls}"><img src="media/qr.png" alt="QR" width="112" height="112">
      <div><strong>${t.qrTitle}</strong><p class="muted small">${t.qrText}</p></div></div>`;
  }

  let installPrompt = null;
  const standalone = () => matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
  function installCard() {
    const t = T();
    if (standalone()) {
      return `<div class="install-card crystal">${icon('i-download', 'icon install-icon')}<div><strong>${t.installed}</strong></div></div>`;
    }
    const ios = /iphone|ipad|ipod/i.test(navigator.userAgent);
    return `<div class="install-card crystal">${icon('i-download', 'icon install-icon')}
      <div><strong>${t.installTitle}</strong><p class="muted small">${t.installText}</p>
      ${installPrompt ? `<button type="button" class="btn btn-primary" data-install>${t.installBtn}</button>` : ''}
      ${ios ? `<p class="small hint">${t.iosHint}</p>` : ''}</div></div>`;
  }
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    installPrompt = e;
    if (state.route.name === 'info') renderView();
  });

  function shareBtn(path, title) {
    return `<button type="button" class="icon-btn share-btn" data-share="${path}" data-title="${esc(title)}"
      aria-label="${T().share}: ${esc(title)}">${icon('i-share')}</button>`;
  }
  async function share(path, title) {
    const url = `${location.origin}${location.pathname}#/${path}`;
    if (navigator.share) {
      try { await navigator.share({ title: `${title} – The Winter Day`, url }); } catch (e) { }
      return;
    }
    try { await navigator.clipboard.writeText(url); toast(T().linkCopied); } catch (e) { window.prompt(T().share, url); }
  }

  function downloadICS(id) {
    const s = SESSIONS.find((x) => x.id === id);
    const [y, mo, d] = EVENT.date.split('-').map(Number);
    const utc = (time) => {
      const [h, m] = time.split(':').map(Number);
      return new Date(Date.UTC(y, mo - 1, d, h - 3, m)).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
    };
    const txt = (v) => String(v).replace(/([,;\\])/g, '\\$1');
    const ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Elevate Events//The Winter Day//EN', 'BEGIN:VEVENT',
      `UID:${s.id}@the-winter-day`, `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')}`,
      `DTSTART:${utc(s.start)}`, `DTEND:${utc(s.end)}`,
      `SUMMARY:${txt(L(s.title))} – The Winter Day`, `LOCATION:${txt(L(s.location))} – ${txt(L(EVENT.location))}`,
      `DESCRIPTION:${txt(L(s.description))}`, 'BEGIN:VALARM', 'TRIGGER:-PT15M', 'ACTION:DISPLAY',
      `DESCRIPTION:${txt(L(s.title))}`, 'END:VALARM', 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }));
    a.download = `winter-day-${s.id}.ics`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
    toast(T().calToast);
  }

  const sheet = $('#sheet');
  function favButton(key, title) {
    const on = state.favs.has(key);
    return `<button type="button" class="btn btn-primary sh-fav" data-fav="${key}" data-title="${esc(title)}" aria-pressed="${on}">
      ${icon('i-heart')}<span>${on ? T().sheetRemove : T().sheetAdd}</span></button>`;
  }
  function sessionSheet(id) {
    const t = T();
    const s = SESSIONS.find((x) => x.id === id);
    const cat = CATEGORIES[s.category];
    const st = statusOf(s, now());
    const title = L(s.title);
    const slots = s.workshop ? SESSIONS.filter((x) => x.workshop === s.workshop) : [];
    return `<div class="sh-art"><div class="art-tile">${artHTML(s.art, title, s.photo)}</div>${sceneTag(WS_SCENE[s.workshop])}</div>
      <div class="sh-body">
        <span class="tag" style="--dot:${cat.color}">${esc(L(cat.label))}</span>
        <h2 id="sh-title">${esc(title)}</h2>
        <div class="facts">
          <p>${icon('i-clock')}${timeRange(s)}${s.slot ? ` · ${t.slotLabel(s.slot)}` : ''}</p>
          <p>${icon('i-pin')}${esc(L(s.location))}</p>
          ${s.capacity ? `<p>${icon('i-users')}${t.seatsLong(s.capacity)}</p>` : ''}
        </div>
        ${st === 'live' || st === 'past' ? `<p class="status-pill ${st}">${st === 'live' ? t.badgeLive : t.pastNote}</p>` : ''}
        <p class="sh-desc">${esc(L(s.description))}</p>
        ${slots.length ? `<div class="sh-slots"><p class="sh-slots-title">${t.slotsTitle}</p>${slots.map((x) =>
          `<button type="button" class="chip" data-open="${x.id}" aria-pressed="${x.id === id}">${t.slotLabel(x.slot)} · ${timeRange(x)}</button>`).join('')}</div>` : ''}
        <div class="sh-actions">
          ${favButton('s:' + s.id, title)}
          <div class="sh-more">
            ${s.start ? `<button type="button" class="btn btn-outline" data-ics="${s.id}">${icon('i-cal-add')}${t.addCal}</button>` : ''}
            <button type="button" class="btn btn-outline" data-share="session/${s.id}" data-title="${esc(title)}">${icon('i-share')}${t.share}</button>
          </div>
        </div>
      </div>`;
  }
  function productSheet(key) {
    const t = T();
    const [v, p] = productOf(key);
    const name = L(p.name);
    return `<div class="sh-art"><div class="art-tile tile-${v.category}">${artHTML(p.art, name, p.photo)}</div>${sceneTag(CAT_SCENE[v.category])}</div>
      <div class="sh-body">
        <span class="tag plain">${esc(L(BOOTH_CATEGORIES[v.category].label))}</span>
        <h2 id="sh-title">${esc(name)}</h2>
        <p class="sh-price">${t.money(p.price)}</p>
        <div class="facts">
          <p>${icon('i-bag')}${esc(t.from(L(v.name)))}</p>
          <p>${icon('i-pin')}${esc(L(v.location))}</p>
        </div>
        <p class="note">${t.pricesNote}</p>
        <div class="sh-actions">
          ${favButton(`p:${v.id}/${p.id}`, name)}
          <div class="sh-more">
            <a class="btn btn-outline" href="#/booth/${v.id}">${icon('i-bag')}${t.openBooth}</a>
            <button type="button" class="btn btn-outline" data-share="product/${v.id}/${p.id}" data-title="${esc(name)}">${icon('i-share')}${t.share}</button>
          </div>
        </div>
      </div>`;
  }
  function openSheet(kind, id) {
    sheet.dataset.kind = kind;
    sheet.dataset.id = id;
    $('#sh-content').innerHTML = kind === 'product' ? productSheet(id) : sessionSheet(id);
    if (!sheet.open) sheet.showModal();
    sheet.scrollTop = 0;
  }
  function refreshSheet() {
    const top = sheet.scrollTop;
    openSheet(sheet.dataset.kind, sheet.dataset.id);
    sheet.scrollTop = top;
  }

  const quizEl = $('#quiz');
  let quizStep = 0, quizPicks = [];
  function openQuiz() {
    quizStep = 0; quizPicks = [];
    renderQuiz();
    if (!quizEl.open) quizEl.showModal();
  }
  function planItems(plan) {
    return plan.items.map(({ kind, id }) => {
      if (kind === 'session') {
        const s = SESSIONS.find((x) => x.id === id);
        return { kind, id, title: L(s.title), sub: timeRange(s), photo: s.photo, attr: `data-open="${id}"` };
      }
      const [v, p] = productOf(id);
      return { kind, id, title: L(p.name), sub: L(v.name), photo: p.photo, attr: `data-product="${id}"` };
    });
  }
  function renderQuiz() {
    const t = T();
    const total = QUIZ.questions.length;
    const box = $('#quiz-content');
    if (quizStep < total) {
      const q = QUIZ.questions[quizStep];
      box.innerHTML = `<div class="quiz-body">
        <p class="eyebrow">${icon('i-spark')}${t.quizTitle}</p>
        <div class="q-progress" aria-hidden="true">${QUIZ.questions.map((_, i) => `<span class="${i <= quizStep ? 'on' : ''}"></span>`).join('')}</div>
        <h2 id="quiz-title">${esc(L(q.q))}</h2>
        <div class="q-options n${q.options.length}">${q.options.map((o, i) => `<button type="button" class="q-opt tilt" data-qopt="${i}">
          <span class="art-tile"><img class="photo" src="${o.photo}" alt=""></span><span class="q-label">${esc(L(o.label))}</span></button>`).join('')}</div>
        ${quizStep ? `<button type="button" class="link q-back" data-qback>${icon('i-back')}${t.qBack}</button>` : ''}
      </div>`;
      return;
    }
    const persona = QUIZ.personas[state.plan.persona];
    box.innerHTML = `<div class="quiz-body q-result">
      <p class="eyebrow">${icon('i-spark')}${t.yourPersona}</p>
      <h2 id="quiz-title" class="q-persona">${esc(L(persona.title))}</h2>
      <p class="muted">${esc(L(persona.text))}</p>
      <div class="plan">${planItems(state.plan).map((it, i) => `<button type="button" class="plan-item" ${it.attr}>
        <span class="art-tile sm"><img class="photo" src="${it.photo}" alt=""></span>
        <span><small>${[t.planWorkshop, t.planDrink, t.planShop][i]}</small><strong>${esc(it.title)}</strong><em>${esc(it.sub)}</em></span>
      </button>`).join('')}</div>
      <div class="sh-actions">
        <button type="button" class="btn btn-primary" data-saveplan>${icon('i-heart')}${t.savePlan}</button>
        <div class="sh-more">
          <button type="button" class="btn btn-outline" data-maker>${icon('i-card')}${t.makeCard}</button>
          <button type="button" class="btn btn-outline" data-quiz>${t.retake}</button>
        </div>
      </div>
    </div>`;
  }
  function pickOption(i) {
    quizPicks[quizStep] = QUIZ.questions[quizStep].options[i];
    quizStep++;
    if (quizStep === QUIZ.questions.length) {
      const [mood, drink, shop] = quizPicks;
      state.plan = { persona: mood.persona,
        items: [{ kind: 'session', id: `${mood.workshop}-1` }, { kind: 'product', id: drink.product }, { kind: 'product', id: shop.product }] };
      store(PLAN_KEY, state.plan);
    }
    renderQuiz();
  }
  function savePlan() {
    state.plan.items.forEach(({ kind, id }) => {
      const key = (kind === 'session' ? 's:' : 'p:') + id;
      state.favs.add(key);
      syncHearts(key);
    });
    saveFavs();
    renderFavCounts();
    if (navigator.vibrate) navigator.vibrate([10, 40, 10]);
    toast(T().planSaved);
  }

  const makerEl = $('#maker');
  let cardBlob = null, cardTimer = 0, cardDraw = 0;
  function openMaker() {
    const t = T();
    $('#maker-content').innerHTML = `<div class="maker-body">
      <p class="eyebrow">${icon('i-card')}${t.makerTitle}</p>
      <h2 id="maker-title">${t.makerTitle}</h2>
      <p class="muted">${state.plan ? t.makerLead : t.cardHint}</p>
      <label class="search name-field">${icon('i-spark')}<input id="card-name" maxlength="22" autocomplete="off"
        placeholder="${t.namePh}" aria-label="${t.nameAria}" value="${esc(state.cardName)}"></label>
      <div class="card-preview"><img id="card-img" alt="${t.makerTitle}"></div>
      <div class="sh-actions">
        <button type="button" class="btn btn-primary" data-sharecard>${icon('i-share')}${t.shareCard}</button>
        <div class="sh-more">
          <a class="btn btn-outline" id="card-dl" download="my-winter-day.png">${icon('i-download')}${t.saveCard}</a>
          ${state.plan ? '' : `<button type="button" class="btn btn-outline" data-quiz>${icon('i-spark')}${t.ctaQuiz}</button>`}
        </div>
      </div>
    </div>`;
    if (quizEl.open) quizEl.close();
    if (!makerEl.open) makerEl.showModal();
    drawCard();
  }
  const loadImg = (src) => new Promise((ok) => {
    const i = new Image();
    i.onload = () => ok(i); i.onerror = () => ok(null); i.src = src;
  });
  function cardPlan() {
    if (state.plan) return state.plan;

    const favItems = [...state.favs].filter((k) => k.startsWith('s:') || k.startsWith('p:'))
      .map((k) => ({ kind: k.startsWith('s:') ? 'session' : 'product', id: k.slice(2) }));
    const items = [...favItems, { kind: 'session', id: 'w1-1' }, { kind: 'product', id: 'nadfa/latte' }, { kind: 'product', id: 'frost/earrings' }];
    return { persona: null, items: items.slice(0, 3) };
  }
  async function drawCard() {
    const t = T(), rtl = state.lang === 'ar', id = ++cardDraw;
    const W = 1080, H = 1350, c = document.createElement('canvas');
    c.width = W; c.height = H;
    const g = c.getContext('2d');
    await Promise.all(['700 80px "Cormorant Garamond"', '700 60px "El Messiri"', '500 40px Tajawal', '800 40px Tajawal']
      .map((f) => document.fonts.load(f).catch(() => null)));
    const plan = cardPlan();
    const items = planItems(plan);

    const photos = location.protocol.startsWith('http') ? await Promise.all(items.map((it) => loadImg(it.photo))) : [];
    const qr = location.protocol.startsWith('http') ? await loadImg('media/qr.png') : null;
    if (id !== cardDraw) return;

    const bg = g.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, '#0B2447'); bg.addColorStop(1, '#040B1C');
    g.fillStyle = bg; g.fillRect(0, 0, W, H);
    [[W * .85, 120, 'rgba(94,234,212,.28)'], [W * .1, 420, 'rgba(165,180,252,.26)'], [W * .6, H * .95, 'rgba(29,79,145,.7)']].forEach(([x, y, col]) => {
      const r = g.createRadialGradient(x, y, 0, x, y, 620);
      r.addColorStop(0, col); r.addColorStop(1, 'rgba(0,0,0,0)');
      g.fillStyle = r; g.fillRect(0, 0, W, H);
    });
    let seed = 9; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    g.fillStyle = '#fff';
    for (let i = 0; i < 140; i++) { g.globalAlpha = .25 + rnd() * .6; g.beginPath(); g.arc(rnd() * W, rnd() * H, .8 + rnd() * 2.4, 0, 7); g.fill(); }
    g.globalAlpha = 1;

    g.strokeStyle = 'rgba(207,230,247,.35)'; g.lineWidth = 2;
    g.beginPath(); g.roundRect(40, 40, W - 80, H - 80, 44); g.stroke();

    const crystal = (y0, y1) => {
      const cg = g.createLinearGradient(0, y0, 0, y1);
      cg.addColorStop(0, '#FFFFFF'); cg.addColorStop(.55, '#CFE6F7'); cg.addColorStop(1, '#8FB8E8');
      return cg;
    };
    const text = (s, x, y, font, color, align = 'center') => {
      g.font = font; g.fillStyle = color; g.textAlign = align; g.textBaseline = 'middle';
      g.direction = rtl ? 'rtl' : 'ltr'; g.fillText(s, x, y);
    };
    text(t.cardMy, W / 2, 130, '500 38px Tajawal', '#CFE6F7');
    g.direction = 'ltr';
    g.font = '700 124px "Cormorant Garamond"'; g.fillStyle = crystal(170, 290); g.textAlign = 'center'; g.fillText('The Winter Day', W / 2, 228);
    text(dateLabel(), W / 2, 310, '500 34px Tajawal', '#A3B8D6');

    const name = state.cardName.trim();
    const persona = plan.persona ? L(QUIZ.personas[plan.persona].title) : t.cardDefault;
    if (name) text(name, W / 2, 400, '700 74px "El Messiri"', '#FFFFFF');
    text(persona, W / 2, name ? 475 : 425, `700 ${name ? 46 : 66}px "El Messiri"`, name ? '#9FD4F5' : '#FFFFFF');

    const labels = plan.persona ? [t.planWorkshop, t.planDrink, t.planShop] : ['', '', ''];
    const top = 540, rowH = 150, gap = 18, x0 = 110, w = W - 220, ph = 110;
    items.forEach((it, i) => {
      const y = top + i * (rowH + gap);
      g.fillStyle = 'rgba(255,255,255,.07)'; g.strokeStyle = 'rgba(207,230,247,.25)'; g.lineWidth = 2;
      g.beginPath(); g.roundRect(x0, y, w, rowH, 30); g.fill(); g.stroke();
      const px = rtl ? x0 + w - 20 - ph : x0 + 20;
      g.save(); g.beginPath(); g.roundRect(px, y + 20, ph, ph, 24); g.clip();
      if (photos[i]) g.drawImage(photos[i], px, y + 20, ph, ph);
      else { g.fillStyle = '#1D4F91'; g.fillRect(px, y + 20, ph, ph); }
      g.restore();
      const tx = rtl ? px - 30 : px + ph + 30, al = rtl ? 'right' : 'left';
      if (labels[i]) text(labels[i], tx, y + 38, '700 26px Tajawal', '#9FD4F5', al);
      text(it.title, tx, y + (labels[i] ? 80 : 62), '800 38px Tajawal', '#FFFFFF', al);
      text(it.sub, tx, y + (labels[i] ? 120 : 104), '500 27px Tajawal', '#A3B8D6', al);
    });

    if (qr) {
      g.fillStyle = '#fff'; g.beginPath(); g.roundRect(W / 2 - 66, 1060, 132, 132, 20); g.fill();
      g.drawImage(qr, W / 2 - 56, 1070, 112, 112);
    }
    text(t.cardScan, W / 2, qr ? 1226 : 1150, '500 28px Tajawal', '#CFE6F7');
    g.direction = 'ltr'; g.font = '600 30px "Cormorant Garamond"'; g.fillStyle = '#7F95B6'; g.textAlign = 'center';
    g.fillText('Elevate Events', W / 2, qr ? 1270 : 1200);

    try {
      cardBlob = await new Promise((ok, no) => c.toBlob((b) => (b ? ok(b) : no()), 'image/png'));
    } catch (e) { cardBlob = null; }
    const img = $('#card-img'), dl = $('#card-dl');
    if (!img || id !== cardDraw) return;
    if (cardBlob) {
      const url = URL.createObjectURL(cardBlob);
      img.src = url; dl.href = url;
    } else {
      img.src = c.toDataURL('image/png'); dl.href = img.src;
    }
  }
  async function shareCard() {
    if (!cardBlob) return;
    const file = new File([cardBlob], 'my-winter-day.png', { type: 'image/png' });
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try { await navigator.share({ files: [file], title: 'The Winter Day' }); } catch (e) { }
    } else {
      $('#card-dl').click();
    }
  }

  const fineHover = matchMedia('(hover: hover) and (pointer: fine)');
  let tilted = null;
  document.addEventListener('pointermove', (e) => {
    if (!fineHover.matches || calm()) return;
    const el = e.target.closest('.tilt');
    if (tilted && tilted !== el) { tilted.style.removeProperty('--rx'); tilted.style.removeProperty('--ry'); tilted.classList.remove('tilting'); }
    tilted = el;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - .5, py = (e.clientY - r.top) / r.height - .5;
    el.style.setProperty('--rx', `${(-py * 7).toFixed(2)}deg`);
    el.style.setProperty('--ry', `${(px * 9).toFixed(2)}deg`);
    el.style.setProperty('--mx', `${((px + .5) * 100).toFixed(1)}%`);
    el.style.setProperty('--my', `${((py + .5) * 100).toFixed(1)}%`);
    el.classList.add('tilting');
  });
  let revealer = null;
  function setupReveal(root) {
    const els = $$('.reveal', root);
    if (!('IntersectionObserver' in window) || calm()) { els.forEach((el) => el.classList.add('in')); return; }
    if (revealer) revealer.disconnect();
    revealer = new IntersectionObserver((entries) => entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add('in'); revealer.unobserve(en.target); }
    }), { rootMargin: '0px 0px -6% 0px' });
    els.forEach((el, i) => { el.style.setProperty('--d', `${(i % 6) * 70}ms`); revealer.observe(el); });
  }

  [sheet, quizEl, makerEl].forEach((d) => d.addEventListener('click', (e) => { if (e.target === d) d.close(); }));
  document.addEventListener('click', (e) => {
    if (e.target.closest('#lang-btn')) { setLanguage(state.lang === 'ar' ? 'en' : 'ar'); return; }
    if (e.target.closest('dialog a[href^="#"]')) [sheet, quizEl, makerEl].forEach((d) => d.open && d.close());
    const fav = e.target.closest('[data-fav]');
    if (fav) { if (!state.favs.has(fav.dataset.fav)) favPop(fav); toggleFav(fav.dataset.fav); return; }
    const open = e.target.closest('[data-open]');
    if (open) { if (quizEl.open) quizEl.close(); openSheet('session', open.dataset.open); return; }
    const product = e.target.closest('[data-product]');
    if (product) { if (quizEl.open) quizEl.close(); openSheet('product', product.dataset.product); return; }
    if (e.target.closest('[data-quiz]')) { if (makerEl.open) makerEl.close(); openQuiz(); return; }
    const opt = e.target.closest('[data-qopt]');
    if (opt) { pickOption(Number(opt.dataset.qopt)); return; }
    if (e.target.closest('[data-qback]')) { quizStep = Math.max(0, quizStep - 1); renderQuiz(); return; }
    if (e.target.closest('[data-saveplan]')) { favPop(e.target.closest('[data-saveplan]')); savePlan(); return; }
    if (e.target.closest('[data-maker]')) { openMaker(); return; }
    if (e.target.closest('[data-sharecard]')) { shareCard(); return; }
    const shareEl = e.target.closest('[data-share]');
    if (shareEl) { share(shareEl.dataset.share, shareEl.dataset.title); return; }
    const ics = e.target.closest('[data-ics]');
    if (ics) { downloadICS(ics.dataset.ics); return; }
    if (e.target.closest('[data-install]') && installPrompt) {
      installPrompt.prompt();
      installPrompt.userChoice.finally(() => { installPrompt = null; renderView(); });
      return;
    }
    const cat = e.target.closest('[data-cat]');
    if (cat) { state.progCat = cat.dataset.cat; refreshChips('data-cat', state.progCat); renderProgList(); return; }
    const bcat = e.target.closest('[data-bcat]');
    if (bcat) { state.boothCat = bcat.dataset.bcat; refreshChips('data-bcat', state.boothCat); renderBoothList(); return; }
    const btab = e.target.closest('[data-btab]');
    if (btab) {
      state.homeBoothCat = btab.dataset.btab;
      $$('[data-btab]').forEach((b) => { const on = b === btab; b.setAttribute('aria-selected', on); b.setAttribute('aria-pressed', on); });
      const panel = $('#booth-panel');
      panel.innerHTML = boothPanel(state.homeBoothCat);
      panel.classList.remove('swap'); void panel.offsetWidth; panel.classList.add('swap');
      return;
    }
    const pin = e.target.closest('[data-pin]');
    if (pin) { selectMap('pin', pin.dataset.pin); return; }
    const zone = e.target.closest('[data-zone]');
    if (zone) { selectMap('zone', zone.dataset.zone); return; }
    if (e.target.closest('#snow-btn')) { setGlobalSnow(!globalSnowOn); return; }
    const view = e.target.closest('[data-view]');
    if (view) { state.progView = view.dataset.view; refreshChips('data-view', state.progView); renderProgList(); return; }
    const hello = e.target.closest('[data-hello]');
    if (hello) { sayHello(hello); return; }
    const ftab = e.target.closest('[data-ftab]');
    if (ftab) { state.favTab = ftab.dataset.ftab; renderView(); return; }

    const go = e.target.closest('[data-goto-cat], [data-goto-bcat]');
    if (go) {
      if (go.dataset.gotoCat) { state.progCat = go.dataset.gotoCat; state.progQ = ''; }
      if (go.dataset.gotoBcat) { state.boothCat = go.dataset.gotoBcat; state.boothQ = ''; }
      if (location.hash === go.getAttribute('href')) onRoute();
    }
  });
  function refreshChips(attr, current) {
    $$(`[${attr}]`).forEach((b) => b.setAttribute('aria-pressed', b.getAttribute(attr) === current));
  }

  document.addEventListener('keydown', (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && e.target.closest && e.target.closest('.venue [data-zone], .venue [data-pin]')) {
      e.preventDefault();
      e.target.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    }
  });
  document.addEventListener('change', (e) => {
    if (e.target.matches('[data-check]')) toggleCheck(Number(e.target.dataset.check), e.target.checked);
  });
  document.addEventListener('input', (e) => {
    if (e.target.id === 'prog-search') { state.progQ = e.target.value; renderProgList(); }
    if (e.target.id === 'booth-search') { state.boothQ = e.target.value; renderBoothList(); }
    if (e.target.id === 'card-name') {
      state.cardName = e.target.value;
      store(NAME_KEY, state.cardName);
      clearTimeout(cardTimer);
      cardTimer = setTimeout(drawCard, 250);
    }
  });
  window.addEventListener('hashchange', onRoute);

  let globalSnowOn = false, gsRaf = 0;
  function setGlobalSnow(on) {
    globalSnowOn = on;
    store(SNOW_KEY, on);
    const btn = $('#snow-btn'), t = T();
    btn.setAttribute('aria-pressed', on);
    btn.setAttribute('aria-label', on ? t.snowOff : t.snowOn);
    btn.title = on ? t.snowOff : t.snowOn;
    document.body.classList.toggle('snowing', on);
    cancelAnimationFrame(gsRaf);
    const c = $('#global-snow'), g = c.getContext('2d');
    if (!on) { g.clearRect(0, 0, c.width, c.height); return; }
    const dpr = Math.min(devicePixelRatio || 1, 2);
    let W = 0, H = 0;
    const size = () => { W = innerWidth; H = innerHeight; c.width = W * dpr; c.height = H * dpr; g.setTransform(dpr, 0, 0, dpr, 0, 0); };
    size();
    const flakes = Array.from({ length: Math.round(Math.min(90, W / 9)) }, () => ({
      x: Math.random() * W, y: Math.random() * H, r: .7 + Math.random() * 2, s: .3 + Math.random() * .8, w: Math.random() * 6.28, o: .3 + Math.random() * .5 }));
    const draw = () => {
      if (c.width !== Math.round(innerWidth * dpr)) size();
      g.clearRect(0, 0, W, H);
      g.fillStyle = '#fff';
      flakes.forEach((f) => {
        f.w += .01; f.y += f.s; f.x += Math.sin(f.w) * .4;
        if (f.y > H + 5) { f.y = -5; f.x = Math.random() * W; }
        g.globalAlpha = f.o; g.beginPath(); g.arc(f.x, f.y, f.r, 0, 6.29); g.fill();
      });
    };
    if (calm()) { draw(); return; }
    const step = () => {
      if (!globalSnowOn) return;
      if (!document.hidden && !document.body.classList.contains('hero-in')) draw();
      gsRaf = requestAnimationFrame(step);
    };
    gsRaf = requestAnimationFrame(step);
  }

  let heroWatch = null;
  function watchHero() {
    if (heroWatch) heroWatch.disconnect();
    document.body.classList.remove('hero-in');
    const hero = $('#hero');
    if (!hero) return;
    heroWatch = new IntersectionObserver(([en]) => document.body.classList.toggle('hero-in', en.intersectionRatio > .35), { threshold: [0, .35, .7] });
    heroWatch.observe(hero);
  }

  function tick() { renderCountdown(); renderProgList(); }

  function hideSplash() {
    const splash = $('#splash');
    let seen = false;
    try { seen = sessionStorage.getItem('winterday-splash') === '1'; sessionStorage.setItem('winterday-splash', '1'); } catch (e) { }
    if (seen || calm()) { splash.remove(); return; }
    setTimeout(() => {
      splash.classList.add('hide');
      splash.addEventListener('transitionend', () => splash.remove(), { once: true });
    }, 900);
  }

  if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
    navigator.serviceWorker.register('sw.js').catch(() => { });
  }

  applyLanguage();
  setGlobalSnow(load(SNOW_KEY, !calm()));
  renderFavCounts();
  onRoute();
  hideSplash();
  setInterval(tick, 30000);
})();
