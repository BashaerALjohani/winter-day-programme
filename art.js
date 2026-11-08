const ART = (() => {
  const N = '#0B2447', W = '#1D4F91', M = '#4C8DD6', I = '#CFE6F7', S = '#FFFFFF';
  const G = '#E9B872', B = '#8A5A3B', C1 = '#E3B07A', C2 = '#C98E55';
  const shadow = (y = 98, rx = 32) => `<ellipse cx="60" cy="${y}" rx="${rx}" ry="6" fill="${N}" opacity=".13"/>`;
  const flake = (x, y, r, c, w = 3) => `<g stroke="${c}" stroke-width="${w}" stroke-linecap="round">
    <path d="M${x} ${y - r}V${y + r}M${x - r * .87} ${y - r / 2}L${x + r * .87} ${y + r / 2}M${x - r * .87} ${y + r / 2}L${x + r * .87} ${y - r / 2}"/></g>`;

  return {
    flake: `${flake(60, 60, 34, S, 6)}<circle cx="60" cy="60" r="9" fill="none" stroke="${S}" stroke-width="5"/>`,

    latte: `${shadow(97, 36)}<ellipse cx="60" cy="90" rx="34" ry="8" fill="${S}"/>
      <path d="M86 52a12 12 0 0 1 0 24" fill="none" stroke="${S}" stroke-width="7"/>
      <path d="M33 46h54v24c0 14-12 22-27 22S33 84 33 70z" fill="${S}"/>
      <path d="M36 62h48" stroke="${I}" stroke-width="4"/>
      <ellipse cx="60" cy="46" rx="27" ry="6.5" fill="${B}"/>
      <path d="M51 46c4-4 14-4 18 0c-4 3-14 3-18 0z" fill="#EAD7C3"/>
      <path d="M48 36c-5-6 5-9 0-16M60 36c-5-6 5-9 0-16M72 36c-5-6 5-9 0-16" fill="none" stroke="${S}" stroke-width="3" stroke-linecap="round" opacity=".9"/>`,

    cocoa: `${shadow(99, 30)}<path d="M84 56a13 13 0 0 1 0 26" fill="none" stroke="${W}" stroke-width="7"/>
      <rect x="34" y="46" width="52" height="52" rx="11" fill="${W}"/>
      <circle cx="46" cy="44" r="10" fill="${S}"/><circle cx="60" cy="38" r="13" fill="${S}"/><circle cx="74" cy="44" r="10" fill="${S}"/>
      <rect x="44" y="26" width="9" height="9" rx="2" fill="${I}" transform="rotate(-18 48 30)"/>
      <rect x="66" y="27" width="9" height="9" rx="2" fill="${I}" transform="rotate(14 70 31)"/>
      ${flake(60, 74, 10, I, 3)}`,

    croissant: `${shadow(90, 38)}
      <path d="M20 76c4-26 22-40 40-40s36 14 40 40c-7-5-14-6-20-4c-4-12-11-18-20-18s-16 6-20 18c-6-2-13-1-20 4z" fill="${C1}"/>
      <path d="M41 50c3 9 4 17 2 25M60 42v31M79 50c-3 9-4 17-2 25" fill="none" stroke="${C2}" stroke-width="4" stroke-linecap="round"/>`,

    cookies: `${shadow(98, 34)}<circle cx="50" cy="62" r="25" fill="${C1}"/><circle cx="80" cy="76" r="20" fill="${C2}"/>
      <g fill="${B}"><circle cx="42" cy="54" r="3.5"/><circle cx="56" cy="50" r="3"/><circle cx="50" cy="66" r="3.5"/>
      <circle cx="62" cy="70" r="3"/><circle cx="38" cy="70" r="3"/><circle cx="78" cy="70" r="3"/><circle cx="86" cy="82" r="3"/><circle cx="74" cy="84" r="2.5"/></g>`,

    cake: `<ellipse cx="60" cy="90" rx="40" ry="8" fill="${S}"/>
      <path d="M26 84h68V58L26 44z" fill="${C1}"/><path d="M26 66l68 8" stroke="${S}" stroke-width="5"/>
      <path d="M26 44l68 14v-7L26 37z" fill="${S}"/><circle cx="80" cy="46" r="6" fill="${W}"/><circle cx="66" cy="43" r="4" fill="${M}"/>`,

    candle: `${shadow(99, 28)}<rect x="36" y="46" width="48" height="52" rx="10" fill="${S}" opacity=".6"/>
      <rect x="40" y="54" width="40" height="40" rx="7" fill="${S}"/><rect x="40" y="70" width="40" height="15" fill="${W}"/>
      ${flake(60, 77.5, 5, I, 2)}<path d="M60 54v-8" stroke="${N}" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M60 26c7 9 8 15 0 21c-8-6-7-12 0-21z" fill="${G}"/><path d="M60 35c3 4 3 7 0 9c-3-2-3-5 0-9z" fill="${S}"/>`,

    honey: `${shadow(99, 28)}<rect x="36" y="44" width="48" height="54" rx="14" fill="${G}"/>
      <rect x="38" y="31" width="44" height="15" rx="4" fill="${W}"/><path d="M38 46q3 8 0 13" stroke="${G}" stroke-width="5" stroke-linecap="round"/>
      <rect x="45" y="60" width="30" height="22" rx="4" fill="${S}"/>
      <path d="M60 64l6 3.5v7L60 78l-6-3.5v-7z" fill="none" stroke="${G}" stroke-width="2.5"/>`,

    soap: `${shadow(94, 36)}<rect x="22" y="58" width="50" height="32" rx="10" fill="${M}"/><rect x="48" y="44" width="50" height="32" rx="10" fill="${W}"/>
      ${flake(73, 60, 8, S, 2.5)}<g fill="none" stroke="${W}" stroke-width="2.5"><circle cx="34" cy="40" r="6"/><circle cx="24" cy="50" r="3.5"/><circle cx="96" cy="32" r="4"/></g>`,

    basket: `${shadow(99, 36)}<path d="M38 50c0-22 44-22 44 0" fill="none" stroke="${N}" stroke-width="5"/>
      <circle cx="52" cy="48" r="11" fill="${M}"/><circle cx="70" cy="46" r="9" fill="${G}"/>
      <path d="M24 52h72l-8 44H32z" fill="${W}"/><path d="M28 64h64M30 78h60M44 52l-2 44M60 52v44M76 52l2 44" stroke="${I}" stroke-width="2.5" opacity=".8"/>`,

    scarf: `<path d="M30 38c0-10 60-10 60 0v12c0 10-60 10-60 0z" fill="${M}"/>
      <path d="M46 54h18v42H46z" fill="${M}"/><path d="M66 54h16v36H66z" fill="${W}"/>
      <path d="M46 68h18M46 80h18M66 64h16M66 76h16M36 40h48" stroke="${S}" stroke-width="3"/>
      <path d="M48 96v7M53 96v7M58 96v7M63 96v7M68 90v7M73 90v7M78 90v7" stroke="${M}" stroke-width="2.2" stroke-linecap="round"/>`,

    beanie: `${shadow(98, 32)}<path d="M28 78c0-24 14-40 32-40s32 16 32 40z" fill="${W}"/>
      <rect x="25" y="76" width="70" height="18" rx="6" fill="${I}"/><path d="M36 78v14M46 78v14M56 78v14M66 78v14M76 78v14M86 78v14" stroke="${W}" stroke-width="2" opacity=".5"/>
      <circle cx="60" cy="34" r="11" fill="${S}"/>${flake(60, 60, 9, I, 2.5)}`,

    sweater: `<path d="M40 30l-18 12 9 20 9-5v42h40V57l9 5 9-20-18-12c-4 6-10 9-20 9s-16-3-20-9z" fill="${M}"/>
      <path d="M40 30c4 6 10 9 20 9s16-3 20-9" fill="none" stroke="${I}" stroke-width="5"/>
      <path d="M40 96h40M27 58l9-4M93 58l-9-4" stroke="${I}" stroke-width="4"/>${flake(60, 64, 10, S, 3)}`,

    mittens: `<g transform="translate(22 30) rotate(-8)">
        <path d="M6 18c0-12 6-20 15-20s15 8 15 20v26H6z" fill="${W}"/><path d="M6 24c-9-3-13 4-11 11l11 6z" fill="${W}"/>
        <rect x="4" y="44" width="34" height="14" rx="4" fill="${S}"/>${flake(21, 22, 6, I, 2)}</g>
      <g transform="translate(62 34) rotate(8)">
        <path d="M6 18c0-12 6-20 15-20s15 8 15 20v26H6z" fill="${M}"/><path d="M36 24c9-3 13 4 11 11l-11 6z" fill="${M}"/>
        <rect x="4" y="44" width="34" height="14" rx="4" fill="${S}"/>${flake(21, 22, 6, S, 2)}</g>`,

    abaya: `<path d="M60 18a5 5 0 1 1 5 5v5" fill="none" stroke="${N}" stroke-width="3" stroke-linecap="round"/>
      <path d="M60 28L30 44h60z" fill="none" stroke="${N}" stroke-width="3" stroke-linejoin="round"/>
      <path d="M38 44l-14 58h72L82 44c-6 5-13 7-22 7s-16-2-22-7z" fill="${N}"/>
      <path d="M38 44l-16 30 8 4 10-16M82 44l16 30-8 4-10-16" fill="${N}"/>
      <path d="M60 51v51" stroke="${G}" stroke-width="2"/><path d="M26 96h68" stroke="${I}" stroke-width="3"/>
      <path d="M54 58l6 4 6-4M54 68l6 4 6-4" fill="none" stroke="${G}" stroke-width="2"/>`,

    earrings: `<g fill="none" stroke="${G}" stroke-width="3" stroke-linecap="round"><path d="M42 26a7 7 0 1 1 0 14v8"/><path d="M78 26a7 7 0 1 1 0 14v8"/></g>
      <path d="M42 50c9 11 11 20 0 30c-11-10-9-19 0-30z" fill="${I}"/><path d="M78 50c9 11 11 20 0 30c-11-10-9-19 0-30z" fill="${I}"/>
      <path d="M38 62c1-4 3-6 5-8M74 62c1-4 3-6 5-8" stroke="${S}" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="42" cy="86" r="4" fill="${G}"/><circle cx="78" cy="86" r="4" fill="${G}"/>`,

    necklace: `<path d="M22 26c4 44 72 44 76 0" fill="none" stroke="${G}" stroke-width="3"/>
      <circle cx="60" cy="74" r="14" fill="${I}"/>${flake(60, 74, 9, W, 2.5)}<circle cx="60" cy="58" r="3" fill="${G}"/>`,

    bracelet: `<ellipse cx="54" cy="62" rx="30" ry="22" fill="none" stroke="${G}" stroke-width="7"/>
      <ellipse cx="68" cy="68" rx="28" ry="20" fill="none" stroke="${I}" stroke-width="5"/>
      <circle cx="40" cy="44" r="5" fill="${S}"/><circle cx="94" cy="66" r="4" fill="${G}"/>`,

    handbag: `${shadow(99, 34)}<path d="M44 50c0-20 32-20 32 0" fill="none" stroke="${G}" stroke-width="5"/>
      <path d="M28 50h64l-7 46H35z" fill="${I}"/><path d="M28 50h64v12c-20 11-44 11-64 0z" fill="${S}"/>
      <circle cx="60" cy="66" r="5" fill="${G}"/>`,

    hairclip: `<path d="M26 52c10-20 58-20 68 0" fill="none" stroke="${I}" stroke-width="10" stroke-linecap="round"/>
      <path d="M32 58l-4 26M44 54l-2 30M56 52v32M68 52l1 32M80 54l3 30M90 58l5 24" stroke="${I}" stroke-width="5" stroke-linecap="round"/>
      <circle cx="60" cy="40" r="6" fill="${G}"/>`,

    'mug-paint': `${shadow(99, 30)}<path d="M80 54a12 12 0 0 1 0 24" fill="none" stroke="${S}" stroke-width="7"/>
      <rect x="30" y="44" width="52" height="54" rx="10" fill="${S}"/>${flake(56, 70, 12, W, 3.5)}
      <path d="M78 22l18 18" stroke="${G}" stroke-width="6" stroke-linecap="round"/><path d="M74 18l8 8-6 6-8-8z" fill="${M}"/>`,

    camera: `${shadow(96, 38)}<rect x="22" y="40" width="76" height="52" rx="12" fill="${N}"/><rect x="44" y="30" width="24" height="14" rx="4" fill="${N}"/>
      <circle cx="60" cy="66" r="19" fill="${I}"/><circle cx="60" cy="66" r="12" fill="${W}"/><circle cx="55" cy="61" r="4" fill="${S}"/>
      <rect x="80" y="48" width="10" height="6" rx="2" fill="${G}"/>`,

    card: `${shadow(98, 38)}<rect x="22" y="50" width="76" height="46" rx="6" fill="${I}"/>
      <rect x="32" y="22" width="56" height="56" rx="6" fill="${S}"/>${flake(60, 50, 14, W, 3.5)}
      <path d="M22 54l38 26 38-26v42H22z" fill="${M}"/><circle cx="60" cy="80" r="6" fill="${G}"/>`,

    dice: `${shadow(98, 38)}<rect x="22" y="44" width="40" height="40" rx="9" fill="${W}" transform="rotate(-12 42 64)"/>
      <rect x="58" y="50" width="40" height="40" rx="9" fill="${S}" transform="rotate(10 78 70)"/>
      <g fill="${S}"><circle cx="34" cy="58" r="4"/><circle cx="44" cy="66" r="4"/><circle cx="52" cy="74" r="4"/></g>
      <g fill="${W}"><circle cx="70" cy="62" r="4"/><circle cx="86" cy="64" r="4"/><circle cx="68" cy="78" r="4"/><circle cx="84" cy="80" r="4"/></g>`,

    trophy: `${shadow(100, 26)}<path d="M40 26h40v22c0 12-9 20-20 20s-20-8-20-20z" fill="${G}"/>
      <path d="M40 32H28c0 14 6 20 14 20M80 32h12c0 14-6 20-14 20" fill="none" stroke="${G}" stroke-width="5"/>
      <rect x="54" y="66" width="12" height="16" fill="${G}"/><rect x="40" y="82" width="40" height="12" rx="3" fill="${W}"/>${flake(60, 44, 8, S, 2.5)}`,

    gift: `${shadow(99, 34)}<rect x="28" y="52" width="64" height="44" rx="6" fill="${W}"/><rect x="24" y="42" width="72" height="14" rx="4" fill="${M}"/>
      <path d="M60 42v54" stroke="${G}" stroke-width="8"/><path d="M60 42c-8-14-24-10-18 0zM60 42c8-14 24-10 18 0z" fill="none" stroke="${G}" stroke-width="5"/>
      ${flake(42, 76, 7, I, 2)}${flake(78, 76, 7, I, 2)}`,

    film: `${shadow(98, 36)}<rect x="24" y="36" width="72" height="56" rx="8" fill="${N}"/>
      <g fill="${I}"><rect x="28" y="40" width="6" height="6" rx="1"/><rect x="28" y="54" width="6" height="6" rx="1"/><rect x="28" y="68" width="6" height="6" rx="1"/><rect x="28" y="82" width="6" height="6" rx="1"/>
      <rect x="86" y="40" width="6" height="6" rx="1"/><rect x="86" y="54" width="6" height="6" rx="1"/><rect x="86" y="68" width="6" height="6" rx="1"/><rect x="86" y="82" width="6" height="6" rx="1"/></g>
      <path d="M54 54v20l18-10z" fill="${S}"/>`,
  };
})();

function artHTML(key, label, photo) {
  const alt = label || '';
  if (!photo) return `<svg viewBox="0 0 120 120" role="img" aria-label="${alt}">${ART[key] || ART.flake}</svg>`;
  return `<svg viewBox="0 0 120 120" aria-hidden="true">${ART[key] || ART.flake}</svg>`
    + `<img class="photo" src="${photo}" alt="${alt}" loading="lazy" onerror="this.remove()">`;
}
