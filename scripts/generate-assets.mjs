import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "..");
const publicDir = path.join(root, "public");
const frontDir = path.join(publicDir, "images", "products", "front");
const backDir = path.join(publicDir, "images", "products", "back");
const detailsDir = path.join(publicDir, "images", "products", "details");
const editorialDir = path.join(publicDir, "images", "editorial");
const collectionsDir = path.join(publicDir, "images", "collections");
const appDir = path.join(root, "src", "app");

const products = [
  ["TS-01", "not-of-this-world-tee", "Not Of This World Tee", "tee", "NOT OF THIS WORLD", "FAITH IN FORM"],
  ["TS-02", "sacred-textiles-tee", "Sacred Textiles Tee", "tee", "SACRED TEXTILES", "WASHED SIGNAL"],
  ["LS-01", "faith-archive-long-sleeve", "Faith Archive Long Sleeve", "longsleeve", "FAITH ARCHIVE", "LONG FORM"],
  ["HD-01", "crown-of-thorns-hoodie", "Crown of Thorns Hoodie", "hoodie", "CROWN OF THORNS", "HEAVY FLEECE"],
  ["CR-01", "washed-cross-crewneck", "Washed Cross Crewneck", "crewneck", "WASHED CROSS", "ARCHIVE FLEECE"],
  ["CP-01", "archive-cap", "Archive Cap", "cap", "ARCHIVE CAP", "HEADWEAR"],
  ["BG-01", "utility-tote", "Utility Tote", "tote", "UTILITY TOTE", "CARRY LINE"],
  ["JK-01", "heavy-washed-jacket", "Heavy Washed Jacket", "jacket", "HEAVY WASHED", "OUTER FORM"],
];

const silhouettes = {
  tee: "M250 190 L320 190 L352 238 L385 238 L370 278 L347 272 L344 500 L156 500 L153 272 L130 278 L115 238 L148 238 Z",
  longsleeve:
    "M246 190 L324 190 L366 232 L420 246 L400 288 L360 274 L348 500 L152 500 L140 274 L100 288 L80 246 L134 232 Z",
  hoodie:
    "M208 172 L238 146 L362 146 L392 172 L416 232 L392 248 L372 500 L128 500 L108 248 L84 232 L108 172 L150 198 L182 174 L208 214 Z",
  crewneck:
    "M230 182 Q256 156 288 156 Q320 156 346 182 L374 214 L420 240 L400 286 L360 272 L346 500 L154 500 L140 272 L100 286 L80 240 L126 214 Z",
  cap: "M160 276 Q186 210 290 210 Q394 210 420 276 Q420 324 290 324 Q160 324 160 276 Z M208 324 L370 324 Q344 398 266 398 Q224 398 194 382 Q170 366 156 342 Z",
  tote: "M174 192 H406 L382 488 H198 Z M228 192 V154 Q228 112 290 112 Q352 112 352 154 V192",
  jacket:
    "M224 172 L250 136 H330 L356 172 L394 224 L434 246 L414 298 L380 286 L364 500 H310 V318 H270 V500 H216 L200 286 L166 298 L146 246 L186 224 Z",
};

const texture = Array.from({ length: 18 }, (_, index) => {
  const y = 110 + index * 34;
  const opacity = (0.03 + (index % 4) * 0.018).toFixed(3);
  return `<line x1="74" y1="${y}" x2="726" y2="${y + 22}" stroke="rgba(255,255,255,${opacity})" stroke-width="1" />`;
}).join("");

const grain = Array.from({ length: 44 }, (_, index) => {
  const x = 90 + (index * 29) % 600;
  const y = 96 + (index * 53) % 760;
  const radius = 0.8 + (index % 3) * 0.35;
  return `<circle cx="${x}" cy="${y}" r="${radius}" fill="rgba(255,255,255,0.12)" />`;
}).join("");

function defs(id) {
  return `
<defs>
  <linearGradient id="${id}-bg" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" stop-color="#040404" />
    <stop offset="50%" stop-color="#0e0e0e" />
    <stop offset="100%" stop-color="#030303" />
  </linearGradient>
  <radialGradient id="${id}-glow" cx="50%" cy="28%" r="74%">
    <stop offset="0%" stop-color="rgba(240,229,214,0.14)" />
    <stop offset="60%" stop-color="rgba(173,158,140,0.05)" />
    <stop offset="100%" stop-color="rgba(0,0,0,0)" />
  </radialGradient>
  <linearGradient id="${id}-garment" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" stop-color="#454545" />
    <stop offset="48%" stop-color="#222222" />
    <stop offset="100%" stop-color="#101010" />
  </linearGradient>
  <linearGradient id="${id}-wash" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" stop-color="rgba(232,224,212,0.16)" />
    <stop offset="100%" stop-color="rgba(255,255,255,0)" />
  </linearGradient>
  <filter id="${id}-blur" x="-20%" y="-20%" width="140%" height="140%">
    <feGaussianBlur stdDeviation="34" />
  </filter>
</defs>`;
}

function shell(product, mode) {
  const slugId = `${product[1]}-${mode}`;
  const scale = mode === "detail" ? 0.72 : mode === "back" ? 1.02 : 1;
  const translateX = mode === "detail" ? 146 : 130;
  const translateY = mode === "detail" ? 224 : 188;
  const label = mode === "front" ? product[4] : mode === "back" ? product[5] : "SURFACE / DETAIL";
  const productPath = silhouettes[product[3]];
  return `
<svg width="1200" height="1500" viewBox="0 0 800 1000" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${product[2]} ${mode}">
  ${defs(slugId)}
  <rect width="800" height="1000" fill="url(#${slugId}-bg)" />
  <rect width="800" height="1000" fill="url(#${slugId}-glow)" />
  <g opacity="0.48">${texture}${grain}</g>
  <rect x="64" y="64" width="672" height="872" rx="36" stroke="rgba(255,255,255,0.10)" />
  <ellipse cx="400" cy="304" rx="220" ry="126" fill="rgba(255,255,255,0.08)" filter="url(#${slugId}-blur)" />
  <g transform="translate(${translateX} ${translateY}) scale(${scale})">
    <path d="${productPath}" fill="url(#${slugId}-garment)" stroke="rgba(242,238,230,0.18)" stroke-width="2" />
    <path d="${productPath}" fill="url(#${slugId}-wash)" opacity="0.34" />
  </g>
  ${
    mode === "detail"
      ? `<rect x="184" y="260" width="432" height="296" rx="28" fill="rgba(255,255,255,0.04)" />
         <rect x="220" y="296" width="360" height="224" rx="22" fill="rgba(255,255,255,0.03)" />
         <text x="220" y="610" font-family="Arial, Helvetica, sans-serif" font-size="16" letter-spacing="6" fill="rgba(238,232,222,0.72)">WASH / PRINT / WEIGHT</text>`
      : `<text x="400" y="728" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="17" letter-spacing="7" fill="rgba(238,232,222,0.82)">${label}</text>`
  }
  <text x="84" y="124" font-family="Arial, Helvetica, sans-serif" font-size="18" letter-spacing="8" fill="rgba(238,232,222,0.70)">${product[0]}</text>
  <text x="84" y="866" font-family="Arial, Helvetica, sans-serif" font-size="60" font-weight="700" letter-spacing="8" fill="rgba(238,232,222,0.92)">${mode === "front" ? product[4] : mode === "back" ? product[5] : "DETAIL"}</text>
  <text x="84" y="914" font-family="Arial, Helvetica, sans-serif" font-size="16" letter-spacing="6" fill="rgba(238,232,222,0.50)">${product[2].toUpperCase()}</text>
</svg>`;
}

function editorialCard(name, title, subtitle) {
  return `
<svg width="1600" height="1200" viewBox="0 0 1200 900" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${title}">
  ${defs(name)}
  <rect width="1200" height="900" fill="url(#${name}-bg)" />
  <rect width="1200" height="900" fill="url(#${name}-glow)" />
  <g opacity="0.5">${texture}${grain}</g>
  <rect x="96" y="86" width="1008" height="728" rx="42" stroke="rgba(255,255,255,0.10)" />
  <rect x="146" y="142" width="908" height="348" rx="30" fill="rgba(255,255,255,0.03)" />
  <text x="146" y="596" font-family="Arial, Helvetica, sans-serif" font-size="18" letter-spacing="8" fill="rgba(241,237,228,0.62)">NOT OF THIS WORLD / COLLECTION 01</text>
  <text x="146" y="678" font-family="Arial, Helvetica, sans-serif" font-size="88" font-weight="700" letter-spacing="8" fill="rgba(241,237,228,0.94)">${title}</text>
  <text x="146" y="742" font-family="Arial, Helvetica, sans-serif" font-size="20" letter-spacing="6" fill="rgba(220,213,200,0.62)">${subtitle}</text>
</svg>`;
}

function productEditorial(product) {
  return editorialCard(
    `${product[1]}-editorial`,
    product[4],
    `${product[2].toUpperCase()} / ${product[0]} / COLLECTION 01`,
  );
}

function iconSvg() {
  return `
<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" rx="128" fill="#070707" />
  <rect x="82" y="82" width="348" height="348" rx="88" stroke="rgba(245,236,222,0.18)" stroke-width="2" />
  <path d="M256 118L289 190H360L304 236L326 312L256 266L186 312L208 236L152 190H223L256 118Z" fill="#EEE8DE" fill-opacity="0.88" />
  <text x="256" y="404" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="24" letter-spacing="10" fill="rgba(245,236,222,0.72)">NTW</text>
</svg>`;
}

await Promise.all([
  mkdir(frontDir, { recursive: true }),
  mkdir(backDir, { recursive: true }),
  mkdir(detailsDir, { recursive: true }),
  mkdir(editorialDir, { recursive: true }),
  mkdir(collectionsDir, { recursive: true }),
]);

await Promise.all(
  products.flatMap((product) => [
    writeFile(path.join(frontDir, `${product[1]}-front.svg`), shell(product, "front"), "utf8"),
    writeFile(path.join(backDir, `${product[1]}-back.svg`), shell(product, "back"), "utf8"),
    writeFile(path.join(detailsDir, `${product[1]}-detail.svg`), shell(product, "detail"), "utf8"),
    writeFile(
      path.join(editorialDir, `${product[1]}-editorial.svg`),
      productEditorial(product),
      "utf8",
    ),
  ]),
);

await Promise.all([
  writeFile(
    path.join(editorialDir, "archive-signal.svg"),
    editorialCard(
      "archive-signal",
      "ARCHIVE SIGNAL",
      "WASHED BLACK / MESSAGE / RESTRAINT",
    ),
    "utf8",
  ),
  writeFile(
    path.join(editorialDir, "brand-story.svg"),
    editorialCard(
      "brand-story",
      "WEARABLE CONVICTION",
      "DARK WASHED GARMENTS WITH A CLEANER SIGNAL",
    ),
    "utf8",
  ),
  writeFile(
    path.join(editorialDir, "newsletter-altar.svg"),
    editorialCard(
      "newsletter-altar",
      "ENTER THE ARCHIVE",
      "RELEASE NOTES / RESTOCKS / FUTURE CAPSULES",
    ),
    "utf8",
  ),
  writeFile(
    path.join(collectionsDir, "collection-01-cover.svg"),
    editorialCard(
      "collection-01-cover",
      "COLLECTION 01",
      "HEAVY WASH / QUIET TYPOGRAPHY / SHARPER LINE",
    ),
    "utf8",
  ),
  writeFile(
    path.join(collectionsDir, "collection-01-grid.svg"),
    editorialCard(
      "collection-01-grid",
      "ARCHIVE 01",
      "A TIGHTER FIRST RELEASE OF TEES, FLEECE, ACCESSORIES, AND OUTERWEAR",
    ),
    "utf8",
  ),
]);

await writeFile(path.join(appDir, "icon.svg"), iconSvg(), "utf8");
