// scripts/generate-hero-video.mjs
// Generates a cinematic hero video from hero-frame.png using Google Veo
// Usage: node scripts/generate-hero-video.mjs

import { GoogleGenAI } from '@google/genai';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';

const __dirname = dirname(fileURLToPath(import.meta.url));
const INPUT_PATH = resolve(__dirname, '../public/hero/hero-frame.png');
const OUTPUT_PATH = resolve(__dirname, '../public/hero/hero-cinematic.mp4');

const VIDEO_MODEL = 'veo-2.0-generate-001';

const PROMPT =
  'camera slowly zooms toward the marlin as it leaps, water droplets in slow motion, golden light catches the scales, epic cinematic feel';

async function pollUntilDone(ai, operation) {
  process.stdout.write('Polling for completion');
  let current = operation;
  while (!current.done) {
    await new Promise((r) => setTimeout(r, 5000));
    process.stdout.write('.');
    current = await ai.operations.getVideosOperation({ operation: current });
  }
  process.stdout.write('\n');
  return current;
}

async function main() {
  if (!existsSync(INPUT_PATH)) {
    console.error(`Source image not found: ${INPUT_PATH}`);
    console.error('Run scripts/generate-hero-image.mjs first to create the hero frame.');
    process.exit(1);
  }

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  // Verify the generateVideos method is available on this SDK version
  if (typeof ai.models.generateVideos !== 'function') {
    console.error('ai.models.generateVideos is not available in this version of @google/genai.');
    console.error('Installed SDK version may not yet expose the Veo video generation API.');
    console.error('\nAvailable ai.models methods:', Object.keys(ai.models).filter((k) => typeof ai.models[k] === 'function'));
    console.error('\nTo fix: upgrade the SDK — npm install @google/genai@latest');
    process.exit(1);
  }

  const imageBytes = readFileSync(INPUT_PATH).toString('base64');

  console.log(`Submitting video generation request (model: ${VIDEO_MODEL})...`);
  console.log(`Input image: ${INPUT_PATH}`);

  let operation;
  try {
    operation = await ai.models.generateVideos({
      model: VIDEO_MODEL,
      prompt: PROMPT,
      image: {
        imageBytes,
        mimeType: 'image/png',
      },
      config: {
        aspectRatio: '16:9',
        numberOfVideos: 1,
        durationSeconds: 8,
        personGeneration: 'dont_allow',
      },
    });
  } catch (err) {
    console.error('\nFailed to submit video generation request.');
    console.error('Error:', err.message || err);

    // Surface available Veo models for diagnostics
    try {
      console.error('\nAttempting to list available models for diagnostics...');
      const models = await ai.models.list();
      const videoModels = [];
      for await (const m of models) {
        if (m.name && m.name.toLowerCase().includes('veo')) {
          videoModels.push(m.name);
        }
      }
      if (videoModels.length > 0) {
        console.error('Veo models available on your account:', videoModels);
      } else {
        console.error('No Veo models found — your API key may not have Veo access yet.');
        console.error('Request access at: https://ai.google.dev/gemini-api/docs/video');
      }
    } catch (listErr) {
      console.error('Could not list models:', listErr.message || listErr);
    }

    process.exit(1);
  }

  if (!operation || !operation.name) {
    console.error('Unexpected response — no operation name returned. Full response:');
    console.error(JSON.stringify(operation, null, 2));
    process.exit(1);
  }

  console.log(`Operation started: ${operation.name}`);

  let result;
  try {
    result = await pollUntilDone(ai, operation);
  } catch (err) {
    console.error('Error while polling for operation result:', err.message || err);
    console.error('Raw error:', err);
    process.exit(1);
  }

  // Check for API-level error inside the completed operation
  if (result.error) {
    console.error('Operation completed with an error:');
    console.error(JSON.stringify(result.error, null, 2));
    process.exit(1);
  }

  // Defensive: log full response if shape is unexpected
  const videos = result?.response?.generatedVideos;
  if (!videos || videos.length === 0) {
    console.error('Operation completed but no videos found in response. Full result:');
    console.error(JSON.stringify(result, null, 2));
    process.exit(1);
  }

  const videoMeta = videos[0]?.video;
  if (!videoMeta) {
    console.error('generatedVideos[0].video is missing. Full response:');
    console.error(JSON.stringify(result.response, null, 2));
    process.exit(1);
  }

  // The Gemini API may return videoBytes (base64) or a GCS uri (Vertex AI)
  if (videoMeta.videoBytes) {
    const buffer = Buffer.from(videoMeta.videoBytes, 'base64');
    writeFileSync(OUTPUT_PATH, buffer);
    console.log(`Hero video saved to ${OUTPUT_PATH} (${(buffer.length / 1024 / 1024).toFixed(2)} MB)`);
  } else if (videoMeta.uri) {
    // Vertex AI path — download from GCS URI
    console.log(`Video available at GCS URI: ${videoMeta.uri}`);
    console.log('Downloading...');
    const downloadUrl = videoMeta.uri.includes('?')
      ? `${videoMeta.uri}&key=${process.env.GEMINI_API_KEY}`
      : `${videoMeta.uri}?key=${process.env.GEMINI_API_KEY}`;
    const response = await fetch(downloadUrl);
    if (!response.ok) {
      console.error(`Failed to download video from URI: ${response.status} ${response.statusText}`);
      process.exit(1);
    }
    const arrayBuffer = await response.arrayBuffer();
    writeFileSync(OUTPUT_PATH, Buffer.from(arrayBuffer));
    console.log(`Hero video saved to ${OUTPUT_PATH} (${(arrayBuffer.byteLength / 1024 / 1024).toFixed(2)} MB)`);
  } else {
    console.error('No videoBytes or uri found in the video response. Full video object:');
    console.error(JSON.stringify(videoMeta, null, 2));
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('Unhandled error:', err.message || err);
  process.exit(1);
});
