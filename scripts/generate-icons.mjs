import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..');

const publicDir = path.join(projectRoot, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const svgPath = path.join(publicDir, 'icon.svg');
const svgBuffer = fs.readFileSync(svgPath);

await sharp(svgBuffer)
  .resize(512, 512, {
    fit: 'contain',
    background: { r: 255, g: 255, b: 255, alpha: 0 }
  })
  .extend({
    top: 51,
    bottom: 51,
    left: 51,
    right: 51,
    background: { r: 255, g: 255, b: 255, alpha: 0 }
  })
  .toFile(path.join(publicDir, 'icon-512.png'))
  .catch(err => {
    console.error('Error generating icon:', err);
    process.exit(1);
  });

console.log('✨ Icons generated successfully!');