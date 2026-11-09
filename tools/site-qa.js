/*
 * Statischer Seiten-Check. Aufruf: node tools/site-qa.js
 *  - jeder lokale Link (href/src) in den HTML-Seiten zeigt auf eine vorhandene Datei
 *  - Anker auf derselben Seite existieren
 *  - keine Ressource wird von fremden Servern geladen (Skripte, Styles, Schriften, Bilder)
 */
const fs = require("fs"), path = require("path");
const root = path.join(__dirname, "..");
const pages = ["index.html", "schulen.html", "datenschutz.html"].concat(fs.readdirSync(path.join(root, "app")).filter(f => f.endsWith(".html")).map(f => "app/" + f));
const errors = [];
let links = 0;
for (const page of pages) {
    const html = fs.readFileSync(path.join(root, page), "utf8"), dir = path.dirname(page);
    const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map(m => m[1]));
    for (const m of html.matchAll(/<(script|link|img|iframe|source|audio|video)\b[^>]*?\s(?:src|href)="(https?:)?\/\/[^"]*"/g)) {
        if (!/rel="(canonical|noopener)"/.test(m[0])) errors.push(`${page}: lädt fremde Ressource: ${m[0].slice(0, 110)}`);
    }
    if (/url\(\s*['"]?https?:/.test(html)) errors.push(`${page}: CSS lädt fremde Ressource`);
    for (const m of html.matchAll(/<(?:a|link|script)\b[^>]*?\s(?:href|src)="([^"]+)"/g)) {
        const url = m[1];
        if (/^(https?:|mailto:|tel:|data:|javascript:)/.test(url) || url.includes("${") || url.includes("'+") || url.includes("' +") || url.includes('" +')) continue;
        links += 1;
        const [file, hash] = url.split("#"), clean = file.split("?")[0];
        if (!clean) { if (hash && !ids.has(hash) && !["kontakt", "registrieren"].includes(hash)) errors.push(`${page}: Anker #${hash} fehlt`); continue; }
        const target = path.normalize(path.join(root, dir, clean));
        if (!fs.existsSync(target)) errors.push(`${page}: Ziel fehlt: ${url}`);
    }
}
const css = fs.readFileSync(path.join(root, "app/vendor/fonts/fonts.css"), "utf8");
for (const m of css.matchAll(/url\('\.\/([^']+)'\)/g)) if (!fs.existsSync(path.join(root, "app/vendor/fonts", m[1]))) errors.push("Schriftdatei fehlt: " + m[1]);
console.log(`site-qa: ${pages.length} Seiten, ${links} lokale Links geprüft`);
if (errors.length) { errors.forEach(e => console.log(" - " + e)); console.log("\nResult: FAILED"); process.exit(1); }
console.log("Result: OK");
