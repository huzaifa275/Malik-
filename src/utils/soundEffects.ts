// Web Audio API Synthesizer for soft dreamy music & sound effects

let audioCtx: AudioContext | null = null;
let musicGainNode: GainNode | null = null;
let isMusicActive = false;
let musicTimer: number | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Gentle button click pop / chime sound
export function playSoftPopSound() {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    // Gentle soft pentatonic note
    osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
    osc.frequency.exponentialRampToValueAtTime(783.99, ctx.currentTime + 0.12); // G5

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.2);
  } catch {
    // Ignore audio autoplay policy restrictions if silenced
  }
}

// Playful giggle sound for reaction
export function playPlayfulSound() {
  try {
    const ctx = getAudioContext();
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.06);

      gain.gain.setValueAtTime(0.06, ctx.currentTime + idx * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.06 + 0.15);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + idx * 0.06);
      osc.stop(ctx.currentTime + idx * 0.06 + 0.15);
    });
  } catch {
    // Silently ignore
  }
}

// Dreamy sparkle arpeggio for Final Reveal
export function playSparkleSound() {
  try {
    const ctx = getAudioContext();
    const freqs = [523.25, 659.25, 783.99, 987.77, 1046.5, 1318.51, 1567.98];
    freqs.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.08);

      gain.gain.setValueAtTime(0.05, ctx.currentTime + i * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + i * 0.08 + 0.3);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + i * 0.08);
      osc.stop(ctx.currentTime + i * 0.08 + 0.35);
    });
  } catch {
    // Ignore
  }
}

// Soft Lofi / Dreamy Lullaby background melody synthesizer
const PENTATONIC_SCALE = [
  261.63, // C4
  293.66, // D4
  329.63, // E4
  392.00, // G4
  440.00, // A4
  523.25, // C5
  587.33, // D5
  659.25, // E5
  783.99, // G5
];

export function startDreamyMusic(volume: number = 0.3) {
  try {
    const ctx = getAudioContext();
    if (isMusicActive) return;
    isMusicActive = true;

    musicGainNode = ctx.createGain();
    musicGainNode.gain.setValueAtTime(volume * 0.15, ctx.currentTime);
    musicGainNode.connect(ctx.destination);

    // Warm ambient pad drone in C major
    const pad1 = ctx.createOscillator();
    const pad2 = ctx.createOscillator();
    const padGain = ctx.createGain();
    const padFilter = ctx.createBiquadFilter();

    pad1.type = 'triangle';
    pad2.type = 'sine';
    pad1.frequency.setValueAtTime(130.81, ctx.currentTime); // C3
    pad2.frequency.setValueAtTime(196.00, ctx.currentTime); // G3

    padFilter.type = 'lowpass';
    padFilter.frequency.setValueAtTime(400, ctx.currentTime);

    padGain.gain.setValueAtTime(0.08, ctx.currentTime);

    pad1.connect(padFilter);
    pad2.connect(padFilter);
    padFilter.connect(padGain);
    if (musicGainNode) padGain.connect(musicGainNode);

    pad1.start();
    pad2.start();

    // Gentle random arpeggio notes
    let step = 0;
    const playNextNote = () => {
      if (!isMusicActive || !audioCtx || !musicGainNode) return;

      const now = audioCtx.currentTime;
      const noteIdx = Math.floor(Math.random() * PENTATONIC_SCALE.length);
      const freq = PENTATONIC_SCALE[noteIdx];

      const osc = audioCtx.createOscillator();
      const noteGain = audioCtx.createGain();

      osc.type = step % 3 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      noteGain.gain.setValueAtTime(0.001, now);
      noteGain.gain.linearRampToValueAtTime(0.04, now + 0.1);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

      osc.connect(noteGain);
      noteGain.connect(musicGainNode);

      osc.start(now);
      osc.stop(now + 2.0);

      step++;
      const nextDelay = 800 + Math.random() * 1200;
      musicTimer = window.setTimeout(playNextNote, nextDelay);
    };

    playNextNote();
  } catch {
    isMusicActive = false;
  }
}

export function stopDreamyMusic() {
  isMusicActive = false;
  if (musicTimer !== null) {
    clearTimeout(musicTimer);
    musicTimer = null;
  }
  if (musicGainNode && audioCtx) {
    try {
      musicGainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.5);
      setTimeout(() => {
        musicGainNode?.disconnect();
        musicGainNode = null;
      }, 500);
    } catch {
      musicGainNode = null;
    }
  }
}

export function setMusicVolume(vol: number) {
  if (musicGainNode && audioCtx) {
    musicGainNode.gain.setValueAtTime(vol * 0.15, audioCtx.currentTime);
  }
}
