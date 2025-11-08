import {encode} from 'blurhash';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const imagesDir = path.join(process.cwd(), 'public');
const outputFile = path.join(
  process.cwd(),
  'src',
  'constants',
  'images-blurhashes.json',
);

async function getBlurHashFromFile(filePath: string): Promise<string> {
  console.log(`Generating Blur Hash for ${filePath}`);
  const image = sharp(filePath);

  const {data, info} = await image
    .resize(64, 64, {fit: 'inside'})
    .ensureAlpha()
    .raw()
    .toBuffer({resolveWithObject: true});

  const pixels = new Uint8ClampedArray(data);
  const blurHash = encode(pixels, info.width, info.height, 4, 4);
  return blurHash;
}

async function generate() {
  const tasks: Promise<void>[] = [];
  const result: Record<string, string> = {};
  function dirTraverse(dir: string, baseUrl: string) {
    const entries = fs.readdirSync(dir, {withFileTypes: true});
    for (const entry of entries) {
      const entryPath = path.join(dir, entry.name);
      const keyPath = `${baseUrl}/${entry.name}`;
      const ext = path.extname(entry.name).toLowerCase();
      if (entry.isDirectory()) {
        dirTraverse(entryPath, keyPath);
        continue;
      } else if (!['.jpg', '.jpeg', '.png', '.webp', '.avif'].includes(ext)) {
        continue;
      }
      tasks.push(
        getBlurHashFromFile(entryPath).then(blurHashRes => {
          result[keyPath] = blurHashRes;
        }),
      );
    }
  }
  dirTraverse(imagesDir, '');
  await Promise.all(tasks);
  fs.writeFileSync(outputFile, JSON.stringify(result, null, 2));
  console.log(
    `Generated [${
      Object.keys(result).length
    }] recipe BlurHashes to ${outputFile}`,
  );
}

console.log('[!] Generating BlurDataUrl for /public images [!]');

generate().catch(err => {
  console.error(err);
  process.exit(1);
});
