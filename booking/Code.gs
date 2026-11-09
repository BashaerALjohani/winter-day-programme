const CAP = 10;
const SLOTS = {
  'w1-1': '10:00', 'w1-2': '11:15',
  'w2-1': '10:00', 'w2-2': '11:15',
  'w3-1': '10:00', 'w3-2': '11:15',
  'w4-1': '10:00', 'w4-2': '11:15',
};
const EVENT_DATE = '2026-12-17';
const TZ_OFFSET = '+03:00';

function sheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName('Bookings');
  if (!sh) {
    sh = ss.insertSheet('Bookings');
    sh.appendRow(['Time', 'Slot', 'Name', 'Device', 'Status']);
    sh.setFrozenRows(1);
  }
  return sh;
}

function rows_(sh) {
  const n = sh.getLastRow();
  return n < 2 ? [] : sh.getRange(2, 1, n - 1, 5).getValues();
}

function state_(rows, device) {
  const booked = {};
  Object.keys(SLOTS).forEach(function (s) { booked[s] = 0; });
  const mine = [];
  rows.forEach(function (r) {
    if (r[4] !== 'booked' || !(r[1] in booked)) return;
    booked[r[1]]++;
    if (device && r[3] === device) mine.push(r[1]);
  });
  return { cap: CAP, booked: booked, mine: mine };
}

function out_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function device_(v) {
  v = String(v || '');
  return /^WD-[A-Z0-9]{4,12}$/.test(v) ? v : '';
}

function doGet(e) {
  const device = device_(e && e.parameter && e.parameter.device);
  return out_(state_(rows_(sheet_()), device));
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(15000);
  try {
    let d = {};
    try { d = JSON.parse(e.postData.contents); } catch (err) { d = {}; }
    const slot = String(d.slot || '');
    const device = device_(d.device);
    const sh = sheet_();
    const rows = rows_(sh);
    if (!(slot in SLOTS) || !device) return out_(Object.assign({ ok: false, error: 'bad' }, state_(rows, device)));
    if (d.action === 'cancel') {
      rows.forEach(function (r, i) {
        if (r[1] === slot && r[3] === device && r[4] === 'booked') sh.getRange(i + 2, 5).setValue('cancelled');
      });
      return out_(Object.assign({ ok: true }, state_(rows_(sh), device)));
    }
    const st = state_(rows, device);
    if (st.mine.indexOf(slot) >= 0) return out_(Object.assign({ ok: true }, st));
    let name = String(d.name || '').replace(/\s+/g, ' ').trim().slice(0, 60);
    if (!name) return out_(Object.assign({ ok: false, error: 'name' }, st));
    if (/^[=+\-@]/.test(name)) name = "'" + name;
    if (new Date() >= new Date(EVENT_DATE + 'T' + SLOTS[slot] + ':00' + TZ_OFFSET)) return out_(Object.assign({ ok: false, error: 'closed' }, st));
    const ws = slot.split('-')[0];
    if (st.mine.some(function (s) { return s.split('-')[0] === ws; })) return out_(Object.assign({ ok: false, error: 'same' }, st));
    if (st.mine.some(function (s) { return SLOTS[s] === SLOTS[slot]; })) return out_(Object.assign({ ok: false, error: 'clash' }, st));
    if (st.booked[slot] >= CAP) return out_(Object.assign({ ok: false, error: 'full' }, st));
    sh.appendRow([new Date(), slot, name, device, 'booked']);
    return out_(Object.assign({ ok: true }, state_(rows_(sh), device)));
  } finally {
    lock.releaseLock();
  }
}
