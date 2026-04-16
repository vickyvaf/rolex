import { Jimp, loadFont } from 'jimp';
import { SANS_128_WHITE } from 'jimp/fonts';
import path from 'path';

async function processFrames() {
  const font = await loadFont(SANS_128_WHITE);
  const startFrame = 241;
  const endFrame = 299;
  const sequenceDir = '/Users/vickyadifirmansyah/Documents/Projects/rolex/public/sequence';

  for (let i = startFrame; i <= endFrame; i++) {
    const fileName = `frame-${String(i).padStart(3, '0')}.jpg`;
    const filePath = path.join(sequenceDir, fileName);
    
    console.log(`Processing ${fileName}...`);
    
    try {
      const image = await Jimp.read(filePath);
      const width = image.bitmap.width;
      const height = image.bitmap.height;
      const maxWidth = Math.floor(width / 3);
      const x = 100; // Padding from left
      
      // First, "erase" the left 1/3 by filling it with black
      // We assume the background on the left is black
      // We'll use scan to fill it or just composite a black image
      for (let y = 0; y < height; y++) {
        for (let xPos = 0; xPos < maxWidth; xPos++) {
          image.setPixelColor(0x000000FF, xPos, y);
        }
      }

      image.print({
        font,
        x,
        y: 0,
        text: 'Go deeper. Wear legend.',
        maxWidth: maxWidth - x,
        maxHeight: height,
        alignmentX: Jimp.HORIZONTAL_ALIGN_LEFT,
        alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
      });
      
      await image.write(filePath);
    } catch (error) {
      console.error(`Error processing ${fileName}:`, error);
    }
  }
}

processFrames();
