// scripts/extract-frames.mjs
// Extracts frames from hero-cinematic.mp4 for the scroll-lock hero component
// Usage: node scripts/extract-frames.mjs
//
// Output: public/hero/frames/frame-001.jpg, frame-002.jpg, ...
// Requires: ffmpeg on PATH
//   macOS:   brew install ffmpeg
//   Windows: https://www.gyan.dev/ffmpeg/builds/ — add bin/ folder to PATH
//   Ubuntu:  sudo apt install ffmpeg

import { execSync } from 'child_process';
import { existsSync, readdirSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const INPUT_PATH = resolve(__dirname, '../public/hero/hero-cinematic.mp4');
const OUTPUT_DIR = resolve(__dirname, '../public/hero/frames');
const FRAME_PATTERN = resolve(OUTPUT_DIR, 'frame-%03d.jpg');

const FFMPEG_COMMAND = `ffmpeg -i "${INPUT_PATH}" -vf "fps=15" -q:v 2 "${FRAME_PATTERN}"`;

function checkFfmpeg() {
  try {
    execSync('ffmpeg -version', { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

function countFrames() {
  return readdirSync(OUTPUT_DIR).filter((f) => /^frame-\d{3}\.jpg$/.test(f)).length;
}

async function main() {
  // 1. Verify ffmpeg is available
  if (!checkFfmpeg()) {
    console.error('ffmpeg not found on PATH.');
    console.error('');
    console.error('Install instructions:');
    console.error('  macOS (Homebrew):  brew install ffmpeg');
    console.error('  Windows:           https://www.gyan.dev/ffmpeg/builds/');
    console.error('                     Download the "essentials" build, unzip, and add the');
    console.error('                     bin\\ folder to your system PATH environment variable.');
    console.error('  Ubuntu/Debian:     sudo apt install ffmpeg');
    console.error('  Fedora/RHEL:       sudo dnf install ffmpeg');
    console.error('');
    console.error('After installing, restart your terminal and re-run this script.');
    process.exit(1);
  }

  // 2. Verify the source video exists
  if (!existsSync(INPUT_PATH)) {
    console.error(`Source video not found: ${INPUT_PATH}`);
    console.error('Run scripts/generate-hero-video.mjs first to generate the cinematic video.');
    process.exit(1);
  }

  // 3. Ensure output directory exists
  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log(`Created output directory: ${OUTPUT_DIR}`);
  }

  console.log(`Extracting frames from: ${INPUT_PATH}`);
  console.log(`Output directory:       ${OUTPUT_DIR}`);
  console.log(`Command: ${FFMPEG_COMMAND}`);
  console.log('');

  // 4. Run ffmpeg
  try {
    execSync(FFMPEG_COMMAND, { stdio: 'inherit' });
  } catch (err) {
    console.error('\nffmpeg exited with an error.');
    console.error(err.message || err);
    process.exit(1);
  }

  // 5. Count and report extracted frames
  const frameCount = countFrames();
  if (frameCount === 0) {
    console.error('\nffmpeg ran but no frames were written to the output directory.');
    console.error(`Check ${OUTPUT_DIR} manually.`);
    process.exit(1);
  }

  const durationEstimate = (frameCount / 15).toFixed(1);
  console.log('');
  console.log(`Frames extracted: ${frameCount}`);
  console.log(`Estimated video duration covered: ~${durationEstimate}s at 15 fps`);
  console.log(`First frame: ${resolve(OUTPUT_DIR, 'frame-001.jpg')}`);
  console.log(`Last frame:  ${resolve(OUTPUT_DIR, `frame-${String(frameCount).padStart(3, '0')}.jpg`)}`);
  console.log('');
  console.log('Done. Frames ready for the scroll-lock hero component.');
}

main().catch((err) => {
  console.error('Unhandled error:', err.message || err);
  process.exit(1);
});
