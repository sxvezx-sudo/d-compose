#!/usr/bin/env node
// Converts all JPGs in assets/wardwai-images to WebP (quality 80, max 1600px).
// Deletes the original JPG after successful conversion.

const sharp = require('sharp');
const fs    = require('fs');
const path  = require('path');

const ROOT = path.join(__dirname, '..', 'assets', 'wardwai-images');

function walk(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    let files = [];
    for (const e of entries) {
        const full = path.join(dir, e.name);
        if (e.isDirectory())  files = files.concat(walk(full));
        else if (/\.jpg$/i.test(e.name)) files.push(full);
    }
    return files;
}

async function main() {
    const jpgs = walk(ROOT);
    console.log(`Found ${jpgs.length} JPG files`);
    let ok = 0, fail = 0;
    for (const src of jpgs) {
        const dest = src.replace(/\.jpg$/i, '.webp');
        try {
            await sharp(src)
                .resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true })
                .webp({ quality: 80 })
                .toFile(dest);
            fs.unlinkSync(src);
            ok++;
            process.stdout.write(`\r  converted ${ok}/${jpgs.length}`);
        } catch (e) {
            console.error(`\nFAIL: ${src} — ${e.message}`);
            fail++;
        }
    }
    console.log(`\nDone: ${ok} converted, ${fail} failed`);
}

main();
