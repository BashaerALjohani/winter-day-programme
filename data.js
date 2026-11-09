const EVENT = {
  name: 'The Winter Day',
  organizer: 'Elevate Events',
  date: '2026-12-17',
  start: '08:00',
  end: '13:45',
  location: { ar: 'الكليات التقنية العالمية – المدينة المنورة', en: 'International Technical Colleges – Madinah' },
  guests: 1300,
  workshopSeats: 10,
  bookingUrl: 'https://script.google.com/macros/s/AKfycbyB_RHUd-5I0OF04tRblD7QzkpB_8ltu6aHdWzMC81d8lU1dfrPwVPvmygXc_P65PptzA/exec',
  vendorsTarget: 15,
  help: {
    ar: 'مكتب الاستقبال عند البوابة الرئيسية، وفريق Elevate Events موجود طوال اليوم.',
    en: 'Go to the welcome desk at the main gate. The Elevate Events team is there all day.',
  },
  about: {
    ar: 'Elevate Events شركة متخصصة في إدارة الفعاليات وتنظيمها، وهي الجهة المنظمة لـ The Winter Day.',
    en: 'Elevate Events is an event management company and the organiser of The Winter Day.',
  },
  values: [
    { ar: 'تنظيم احترافي', en: 'Professional planning' }, { ar: 'إبداع', en: 'Creativity' },
    { ar: 'جودة التنفيذ', en: 'Quality delivery' }, { ar: 'اهتمام بالتفاصيل', en: 'Attention to detail' },
  ],
};

const CATEGORIES = {
  workshop: { label: { ar: 'ورش عمل', en: 'Workshops' }, color: '#1D4F91' },
  activity: { label: { ar: 'أنشطة وترفيه', en: 'Activities' }, color: '#4C8DD6' },
  general:  { label: { ar: 'فقرات عامة', en: 'General' }, color: '#8FA3BF' },
};

const WORKSHOP_SLOTS = [['10:00', '10:45'], ['11:15', '12:00']];
const WORKSHOPS = [
  { id: 'w1', takeaway: { ar: 'كوب بتصميمك', en: 'A mug in your design' }, art: 'mug-paint', photo: 'media/photos/ws-mug.jpg',
    title: { ar: 'تزيين أكواب الشتاء', en: 'Winter mug decorating' },
    location: { ar: 'قاعة الورش 1', en: 'Workshop room 1' },
    description: { ar: 'زيّني كوبًا شتويًا بألوانك وتصميمك الخاص، وخذيه معك.', en: 'Decorate a winter mug in your own colours and design, and take it home.' } },
  { id: 'w2', takeaway: { ar: 'ميدالية بلمستك', en: 'Your own keychain' }, art: 'gift', photo: 'media/photos/ws-keychain.jpg',
    title: { ar: 'تصميم ميدالية', en: 'Keychain design' },
    location: { ar: 'قاعة الورش 2', en: 'Workshop room 2' },
    description: { ar: 'صمّمي ميداليتك بخيوط المكرمية والخرز، وتطلع بلمستك.', en: 'Design your own keychain with macramé cord and beads.' } },
  { id: 'w3', takeaway: { ar: 'لوحة كانفس', en: 'A canvas painting' }, art: 'card', photo: 'media/photos/ws-canvas.jpg',
    title: { ar: 'لوحة التخرج', en: 'Graduation canvas' },
    location: { ar: 'قاعة الورش 3', en: 'Workshop room 3' },
    description: { ar: 'ارسمي لوحة تحتفلين فيها بتخرجك، وتبقى ذكرى حلوة.', en: 'Paint a canvas that celebrates your graduation, a keepsake to remember.' } },
  { id: 'w4', takeaway: { ar: 'حقيبة قماش ملوّنة', en: 'A painted tote bag' }, art: 'scarf', photo: 'media/photos/ws-tote.jpg',
    title: { ar: 'الرسم على الحقائب القماشية', en: 'Tote bag painting' },
    location: { ar: 'قاعة الورش 4', en: 'Workshop room 4' },
    description: { ar: 'لوّني حقيبة قماش بتصميم شتوي، وتطلعين فيها من الورشة.', en: 'Paint a cotton tote with a winter design and leave carrying it.' } },
];

const OTHER_SESSIONS = [
  { id: 's1', start: '08:00', end: '08:30', category: 'general', art: 'flake', photo: 'media/photos/welcome.jpg',
    title: { ar: 'الاستقبال والافتتاح', en: 'Welcome & opening' },
    location: { ar: 'المسرح الرئيسي', en: 'Main stage' },
    description: { ar: 'استقبال الحاضرات وكلمة ترحيبية من فريق Elevate Events.', en: 'A warm welcome from the Elevate Events team.' } },
  { id: 's2', start: '10:00', end: '12:00', category: 'activity', art: 'dice', photo: 'media/photos/games.jpg',
    title: { ar: 'منطقة الألعاب الشتوية', en: 'Winter games zone' },
    location: { ar: 'ساحة الألعاب', en: 'Games area' },
    description: { ar: 'ألعاب جماعية وتحديات سريعة بجوائز.', en: 'Group games and quick challenges with prizes.' } },
  { id: 's3', start: '12:15', end: '13:00', category: 'activity', art: 'trophy', photo: 'media/photos/trophy.jpg',
    title: { ar: 'التجارب الرياضية والترفيهية', en: 'Sports & fun challenge' },
    location: { ar: 'الساحة الخارجية', en: 'Outdoor yard' },
    description: { ar: 'تحديات رياضية خفيفة وممتعة للجميع.', en: 'Light, fun sports challenges for everyone.' } },
  { id: 's4', start: null, end: null, category: 'activity', art: 'film', photo: 'media/photos/popcorn.jpg',
    title: { ar: 'عرض فيلم أو جلسة يوغا', en: 'Movie screening or yoga' },
    location: { ar: 'يُحدد لاحقًا', en: 'To be confirmed' },
    description: { ar: 'فريق الفعالية يختار بين عرض فيلم وجلسة يوغا، وبيتأكد قريبًا.', en: 'The event team is choosing between a movie screening and a yoga session.' } },
  { id: 's5', start: '13:15', end: '13:45', category: 'general', art: 'gift', photo: 'media/photos/gift.jpg',
    title: { ar: 'السحب على الجوائز والختام', en: 'Prize draw & closing' },
    location: { ar: 'المسرح الرئيسي', en: 'Main stage' },
    description: { ar: 'سحب على جوائز بين الحاضرات وكلمة الختام.', en: 'A prize draw for guests and closing words.' } },
];

const MAP_ZONES = [
  { id: 'yard', x: 10, y: 10, w: 380, h: 58, label: { ar: 'الساحة الخارجية', en: 'Outdoor yard' }, sessions: ['s3'] },
  { id: 'stage', x: 120, y: 80, w: 160, h: 70, label: { ar: 'المسرح الرئيسي', en: 'Main stage' }, sessions: ['s1', 's5'] },
  { id: 'games', x: 290, y: 80, w: 100, h: 70, label: { ar: 'ساحة الألعاب', en: 'Games area' }, sessions: ['s2'] },
  { id: 'hall', x: 120, y: 162, w: 270, h: 206, label: { ar: 'الساحة الداخلية', en: 'Indoor hall' }, booths: [4, 5, 6, 7, 8, 9] },
  { id: 'corridor', x: 10, y: 374, w: 380, h: 54, label: { ar: 'الممر الرئيسي', en: 'Main corridor' }, booths: [1, 2, 3] },
  { id: 'gate', x: 150, y: 432, w: 100, h: 30, label: { ar: 'البوابة', en: 'Gate' }, gate: true },
];

const SESSIONS = [
  ...WORKSHOPS.flatMap((w) => WORKSHOP_SLOTS.map(([start, end], i) => ({
    ...w, id: `${w.id}-${i + 1}`, workshop: w.id, slot: i + 1, start, end,
    category: 'workshop', capacity: EVENT.workshopSeats,
  }))),
  ...OTHER_SESSIONS,
];

const BOOTH_CATEGORIES = {
  cafes: { color: '#E8B07A', label: { ar: 'الكوفيهات', en: 'Cafés' }, art: 'latte', photo: 'media/photos/latte.jpg', },
  home: { color: '#F2D27A', label: { ar: 'الأسر المنتجة', en: 'Home businesses' }, art: 'honey', photo: 'media/photos/honey.jpg', },
  accessories: { color: '#B7C0FF', label: { ar: 'أكسسوارات', en: 'Accessories' }, art: 'earrings', photo: 'media/photos/earrings.jpg', },
  clothing: { color: '#7EE7D6', label: { ar: 'ملابس', en: 'Clothing' }, art: 'scarf', photo: 'media/photos/knit-fabric.jpg', },
};

const VENDORS = [
  { id: 'nadfa', category: 'cafes', art: 'latte', photo: 'media/photos/cafe-cover.jpg',
    name: { ar: 'ندفة كافيه', en: 'Nadfa Café' },
    tagline: { ar: 'قهوة مختصة ومشروبات شتوية', en: 'Specialty coffee & winter drinks' },
    description: { ar: 'بوث قهوة بأجواء شتوية، يقدّم مشروبات دافئة تحضّر قدامك.', en: 'A cosy coffee corner serving warm drinks made in front of you.' },
    location: { ar: 'الممر الرئيسي – بوث 1', en: 'Main corridor – Booth 1' },
    products: [
      { id: 'latte', art: 'latte', photo: 'media/photos/latte.jpg', price: 19, name: { ar: 'لاتيه الشتاء', en: 'Winter latte' } },
      { id: 'cocoa', art: 'cocoa', photo: 'media/photos/hot-chocolate.jpg', price: 18, name: { ar: 'هوت شوكليت', en: 'Hot chocolate' } },
      { id: 'cookies', art: 'cookies', photo: 'media/photos/butter-cookies.jpg', price: 9, name: { ar: 'كوكيز', en: 'Cookies' } },
    ] },
  { id: 'cocoa-house', category: 'cafes', art: 'cocoa', photo: 'media/photos/cocoa-house-cover.jpg',
    name: { ar: 'بيت الكاكاو', en: 'Cocoa House' },
    tagline: { ar: 'شوكولاتة ساخنة ومارشميلو', en: 'Hot chocolate & marshmallows' },
    description: { ar: 'مشروبات الكاكاو بنكهات شتوية مع إضافات المارشميلو.', en: 'Cocoa drinks in winter flavours with marshmallow toppings.' },
    location: { ar: 'الممر الرئيسي – بوث 2', en: 'Main corridor – Booth 2' },
    products: [
      { id: 'cocoa', art: 'cocoa', photo: 'media/photos/marshmallow-cocoa.jpg', price: 21, name: { ar: 'كاكاو بالمارشميلو', en: 'Marshmallow cocoa' } },
      { id: 'cake', art: 'cake', photo: 'media/photos/chocolate-cake.jpg', price: 26, name: { ar: 'كيكة الشوكولاتة', en: 'Chocolate cake' } },
      { id: 'cookies', art: 'cookies', photo: 'media/photos/cookies.jpg', price: 10, name: { ar: 'كوكيز بالشوكولاتة', en: 'Chocolate cookies' } },
    ] },
  { id: 'warm-bakery', category: 'cafes', art: 'croissant', photo: 'media/photos/bakery-cover.jpg',
    name: { ar: 'مخبز الدفء', en: 'Warm Bakery' },
    tagline: { ar: 'مخبوزات طازجة كل صباح', en: 'Fresh bakes every morning' },
    description: { ar: 'كرواسون وحلويات طازجة تناسب أجواء اليوم.', en: 'Croissants and fresh sweets for the day.' },
    location: { ar: 'الممر الرئيسي – بوث 3', en: 'Main corridor – Booth 3' },
    products: [
      { id: 'croissant', art: 'croissant', photo: 'media/photos/croissant.jpg', price: 12, name: { ar: 'كرواسون', en: 'Croissant' } },
      { id: 'cake', art: 'cake', photo: 'media/photos/berry-cake.jpg', price: 24, name: { ar: 'كيكة التوت', en: 'Berry cake' } },
      { id: 'cookies', art: 'cookies', photo: 'media/photos/butter-cookies.jpg', price: 8, name: { ar: 'كوكيز الزبدة', en: 'Butter cookies' } },
    ] },
  { id: 'handmade', category: 'home', art: 'candle', photo: 'media/photos/handmade-cover.jpg',
    name: { ar: 'لمسة يدوية', en: 'Handmade Touch' },
    tagline: { ar: 'شموع وصابون يدوي', en: 'Handmade candles & soap' },
    description: { ar: 'منتجات يدوية من أسرة منتجة، بروائح شتوية دافئة.', en: 'Handmade products from a local family, in warm winter scents.' },
    location: { ar: 'الساحة الداخلية – بوث 4', en: 'Indoor hall – Booth 4' },
    products: [
      { id: 'candle', art: 'candle', photo: 'media/photos/candle.jpg', price: 65, name: { ar: 'شمعة معطرة', en: 'Scented candle' } },
      { id: 'soap', art: 'soap', photo: 'media/photos/soap.jpg', price: 22, name: { ar: 'صابون طبيعي', en: 'Natural soap' } },
      { id: 'basket', art: 'basket', photo: 'media/photos/gift-basket.jpg', price: 149, name: { ar: 'سلة هدايا', en: 'Gift basket' } },
    ] },
  { id: 'home-goodness', category: 'home', art: 'honey', photo: 'media/photos/honey-cover.jpg',
    name: { ar: 'خيرات البيت', en: 'Home Goodness' },
    tagline: { ar: 'عسل ومخبوزات منزلية', en: 'Honey & homemade treats' },
    description: { ar: 'عسل طبيعي ومعمول منزلي من أسرة منتجة.', en: 'Natural honey and homemade treats from a local family.' },
    location: { ar: 'الساحة الداخلية – بوث 5', en: 'Indoor hall – Booth 5' },
    products: [
      { id: 'honey', art: 'honey', photo: 'media/photos/honey.jpg', price: 120, name: { ar: 'عسل طبيعي', en: 'Natural honey' } },
      { id: 'baklava', art: 'cookies', photo: 'media/photos/baklava.jpg', price: 55, name: { ar: 'بقلاوة منزلية', en: 'Homemade baklava' } },
      { id: 'basket', art: 'basket', photo: 'media/photos/treats-basket.jpg', price: 95, name: { ar: 'سلة الضيافة', en: 'Treats basket' } },
    ] },
  { id: 'frost', category: 'accessories', art: 'earrings', photo: 'media/photos/frost-cover.jpg',
    name: { ar: 'فروست', en: 'Frost' },
    tagline: { ar: 'أكسسوارات ناعمة بطابع شتوي', en: 'Delicate winter accessories' },
    description: { ar: 'حلق وعقود وإكسسوارات شعر بتصاميم مستوحاة من الثلج.', en: 'Earrings, necklaces and hair accessories inspired by snow.' },
    location: { ar: 'الساحة الداخلية – بوث 6', en: 'Indoor hall – Booth 6' },
    products: [
      { id: 'earrings', art: 'earrings', photo: 'media/photos/earrings.jpg', price: 79, name: { ar: 'حلق الكريستال الأزرق', en: 'Blue crystal earrings' } },
      { id: 'necklace', art: 'necklace', photo: 'media/photos/crystal-necklace.jpg', price: 95, name: { ar: 'عقد الكريستال', en: 'Crystal pendant necklace' } },
      { id: 'hairclip', art: 'hairclip', photo: 'media/photos/hair-clip.jpg', price: 29, name: { ar: 'مشبك شعر', en: 'Hair clip' } },
    ] },
  { id: 'lulua', category: 'accessories', art: 'handbag', photo: 'media/photos/lulua-cover.jpg',
    name: { ar: 'لؤلؤة', en: 'Lulua' },
    tagline: { ar: 'شنط وأساور', en: 'Bags & bracelets' },
    description: { ar: 'شنط يد وأساور بألوان شتوية هادئة.', en: 'Handbags and bracelets in calm winter colours.' },
    location: { ar: 'الساحة الداخلية – بوث 7', en: 'Indoor hall – Booth 7' },
    products: [
      { id: 'handbag', art: 'handbag', photo: 'media/photos/handbag.jpg', price: 229, name: { ar: 'شنطة يد', en: 'Handbag' } },
      { id: 'bracelet', art: 'bracelet', photo: 'media/photos/bracelet.jpg', price: 69, name: { ar: 'أسورة سلسلة ذهبية', en: 'Gold chain bracelet' } },
      { id: 'necklace', art: 'necklace', photo: 'media/photos/silver-necklace.jpg', price: 139, name: { ar: 'عقد فضة', en: 'Silver pendant necklace' } },
    ] },
  { id: 'cozy-knits', category: 'clothing', art: 'sweater', photo: 'media/photos/knits-cover.jpg',
    name: { ar: 'تريكو دافئ', en: 'Cozy Knits' },
    tagline: { ar: 'تريكو وملابس شتوية', en: 'Knitwear & winter clothes' },
    description: { ar: 'سكارفات وطواقي وقفازات وبلوزات تريكو، وتيشيرتات وهوديز للشتاء.', en: 'Scarves, beanies, mittens, knit sweaters, T-shirts and hoodies for winter.' },
    location: { ar: 'الساحة الداخلية – بوث 8', en: 'Indoor hall – Booth 8' },
    products: [
      { id: 'scarf', art: 'scarf', photo: 'media/photos/scarf.jpg', price: 69, name: { ar: 'سكارف مخطط', en: 'Striped scarf' } },
      { id: 'beanie', art: 'beanie', photo: 'media/photos/beanie.jpg', price: 49, name: { ar: 'طاقية شتوية', en: 'Winter beanie' } },
      { id: 'mittens', art: 'mittens', photo: 'media/photos/mittens.jpg', price: 45, name: { ar: 'قفازات', en: 'Mittens' } },
      { id: 'sweater', art: 'sweater', photo: 'media/photos/sweater.jpg', price: 179, name: { ar: 'بلوزة تريكو', en: 'Knit sweater' } },
      { id: 'tshirt', art: 'sweater', photo: 'media/photos/tshirt.jpg', price: 59, name: { ar: 'تيشيرت قطن', en: 'Cotton T-shirt' } },
      { id: 'hoodie', art: 'sweater', photo: 'media/photos/hoodie.jpg', price: 139, name: { ar: 'هودي شتوي', en: 'Winter hoodie' } },
    ] },
  { id: 'winter-abayas', category: 'clothing', art: 'abaya', photo: 'media/photos/abayas-cover.jpg',
    name: { ar: 'عباءات الشتاء', en: 'Winter Abayas' },
    tagline: { ar: 'عباءات وشالات', en: 'Abayas & shawls' },
    description: { ar: 'عباءات بقماش شتوي وتطريز ناعم، مع شالات مناسبة.', en: 'Abayas in winter fabric with soft embroidery, and matching shawls.' },
    location: { ar: 'الساحة الداخلية – بوث 9', en: 'Indoor hall – Booth 9' },
    products: [
      { id: 'abaya', art: 'abaya', photo: 'media/photos/abaya.jpg', price: 450, name: { ar: 'عباءة مطرزة', en: 'Embroidered abaya' } },
      { id: 'shawl', art: 'scarf', photo: 'media/photos/shawl.jpg', price: 89, name: { ar: 'شال شتوي', en: 'Winter shawl' } },
    ] },
];

const FAQ = [
  { q: { ar: 'كم عدد المقاعد في الورش؟', en: 'How many places are in each workshop?' },
    a: { ar: 'كل ورشة لها فترتين، وكل فترة 10 أشخاص بالكثير. احضري قبل الموعد بدقائق.',
         en: 'Each workshop runs twice, with up to 10 people per slot. Arrive a few minutes early.' } },
  { q: { ar: 'كيف أحفظ اللي يعجبني؟', en: 'How do I save what I like?' },
    a: { ar: 'اضغطي على القلب ♡ بجانب أي فقرة أو بوث أو منتج، وتلقينه في «المفضلة». يبقى محفوظ في جوالك.',
         en: 'Tap the heart ♡ next to any session, booth or product and you’ll find it in “Favourites”. It stays saved on your phone.' } },
  { q: { ar: 'هل أدفع من التطبيق؟', en: 'Can I pay in the app?' },
    a: { ar: 'لا، التطبيق يعرض الأسعار فقط، وما فيه دفع.', en: 'No. The app only shows prices. There is no payment in it.' } },
  { q: { ar: 'كيف أعرف الفقرات الجارية الآن؟', en: 'How do I see what’s on now?' },
    a: { ar: 'يوم الفعالية، الصفحة الرئيسية تعرض الفقرة الجارية الآن واللي بعدها، وتتحدث تلقائيًا.',
         en: 'On the event day, the home screen shows what’s on now and next, and updates automatically.' } },
  { q: { ar: 'أحتاج مساعدة، وين أروح؟', en: 'I need help. Where do I go?' }, a: EVENT.help },
];

const FEATURED = ['cozy-knits/hoodie', 'frost/earrings', 'nadfa/latte', 'winter-abayas/abaya', 'home-goodness/honey', 'cocoa-house/cocoa'];

const QUIZ = {
  questions: [
    { q: { ar: 'وش يناسب مزاجك اليوم؟', en: 'What fits your mood today?' }, options: [
      { photo: 'media/photos/ws-mug.jpg', label: { ar: 'ألوان وإبداع', en: 'Colour & creativity' }, workshop: 'w1', persona: 'artist' },
      { photo: 'media/photos/ws-keychain.jpg', label: { ar: 'تفاصيل صغيرة حلوة', en: 'Sweet little details' }, workshop: 'w2', persona: 'joy' },
      { photo: 'media/photos/ws-canvas.jpg', label: { ar: 'ذكرى تبقى', en: 'A lasting memory' }, workshop: 'w3', persona: 'dreamer' },
      { photo: 'media/photos/ws-tote.jpg', label: { ar: 'ستايل يشبهني', en: 'A style like me' }, workshop: 'w4', persona: 'stylish' },
    ] },
    { q: { ar: 'مشروبك الشتوي؟', en: 'Your winter drink?' }, options: [
      { photo: 'media/photos/latte.jpg', label: { ar: 'لاتيه', en: 'Latte' }, product: 'nadfa/latte' },
      { photo: 'media/photos/marshmallow-cocoa.jpg', label: { ar: 'كاكاو بالمارشميلو', en: 'Marshmallow cocoa' }, product: 'cocoa-house/cocoa' },
      { photo: 'media/photos/croissant.jpg', label: { ar: 'شي حالي ومخبوزات', en: 'Something sweet & baked' }, product: 'warm-bakery/croissant' },
    ] },
    { q: { ar: 'وش تدورين في البوثات؟', en: 'What are you shopping for?' }, options: [
      { photo: 'media/photos/earrings.jpg', label: { ar: 'أكسسوارات', en: 'Accessories' }, product: 'frost/earrings' },
      { photo: 'media/photos/hoodie.jpg', label: { ar: 'ملابس شتوية', en: 'Winter clothes' }, product: 'cozy-knits/hoodie' },
      { photo: 'media/photos/honey.jpg', label: { ar: 'منتجات منزلية', en: 'Homemade goods' }, product: 'home-goodness/honey' },
    ] },
  ],
  personas: {
    artist: { title: { ar: 'الفنانة الشتوية', en: 'The Winter Artist' }, text: { ar: 'يومك ألوان وإبداع، وتطلعين بشي من صنع يدك.', en: 'Your day is colour and creativity, and you leave with something you made.' } },
    joy: { title: { ar: 'صانعة البهجة', en: 'The Joy Maker' }, text: { ar: 'تحبين التفاصيل الصغيرة اللي تفرّح، وميداليتك بتكون أحلى هدية.', en: 'You love the little things that bring joy, and your keychain makes the sweetest gift.' } },
    dreamer: { title: { ar: 'الحالمة الطموحة', en: 'The Dreamer' }, text: { ar: 'عينك على المستقبل، ولوحتك بتذكّرك بهاليوم كل ما شفتيها.', en: 'Your eyes are on the future, and your canvas will bring this day back every time you see it.' } },
    stylish: { title: { ar: 'المبدعة الأنيقة', en: 'The Stylish Creator' }, text: { ar: 'ذوقك يسبقك، وحقيبتك بتكون قطعة ما يشبهها شي.', en: 'Your taste leads the way, and your tote will be one of a kind.' } },
  },
};
