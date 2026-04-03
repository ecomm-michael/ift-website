// scripts/generate-hero-image.mjs
// Generates the hero frame image using Google's Imagen model
// Usage: node scripts/generate-hero-image.mjs

import { GoogleGenAI } from '@google/genai';
import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = resolve(__dirname, '../public/hero/hero-frame.png');

const PROMPT = `high-quality photorealistic, blue marlin leaping from Caribbean waters at golden hour, Puerto Rico coastline in background, dramatic lighting, luxury sport fishing aesthetic, no text, cinematic composition`;

async function main() {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  console.log('Generating hero image with Imagen...');

  const response = await ai.models.generateImages({
    model: 'imagen-4.0-generate-001',
    prompt: PROMPT,
    config: {
      numberOfImages: 1,
      aspectRatio: '16:9',
    },
  });

  if (!response.generatedImages || response.generatedImages.length === 0) {
    console.error('No images generated. Response:', JSON.stringify(response, null, 2));
    process.exit(1);
  }

  const imageBytes = response.generatedImages[0].image.imageBytes;
  const buffer = Buffer.from(imageBytes, 'base64');
  writeFileSync(OUTPUT_PATH, buffer);
  console.log(`Hero image saved to ${OUTPUT_PATH} (${buffer.length} bytes)`);
}

main().catch(err => {
  console.error('Error generating image:', err.message || err);
  process.exit(1);
});
