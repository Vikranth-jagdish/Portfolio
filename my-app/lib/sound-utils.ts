"use client";

let audioCtx: AudioContext | null = null;

/**
 * Initializes the AudioContext if it doesn't exist.
 * This should ideally be called after a user interaction to comply with browser policies.
 */
const getAudioContext = () => {
    if (typeof window === 'undefined') return null;

    if (!audioCtx) {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContextClass) return null;
        audioCtx = new AudioContextClass();
    }
    return audioCtx;
};

/**
 * Resumes the AudioContext if it's in a suspended state.
 * Most browsers require a user gesture to resume the context.
 */
export const resumeAudioContext = async () => {
    const ctx = getAudioContext();
    if (ctx && ctx.state === 'suspended') {
        await ctx.resume();
    }
};

/**
 * Plays the "mechanical" hover sound.
 */
export const playHoverSound = async () => {
    try {
        const ctx = getAudioContext();
        if (!ctx) return;

        // Force resume if suspended - browsers often suspend even after interaction
        if (ctx.state === 'suspended') {
            await ctx.resume();
        }

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        // Exact same sound parameters as original code
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1200, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.1);

        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 0.1);
    } catch (e) { }
};

/**
 * Plays a "bigger" version of the mechanical sound for clicks.
 * Added more low-end and a second "thump" layer.
 */
export const playClickSound = async () => {
    try {
        const ctx = getAudioContext();
        if (!ctx) return;

        if (ctx.state === 'suspended') {
            await ctx.resume();
        }

        const now = ctx.currentTime;

        // Thump layer (Bass)
        const bassOsc = ctx.createOscillator();
        const bassGain = ctx.createGain();
        bassOsc.type = 'sine';
        bassOsc.frequency.setValueAtTime(150, now);
        bassOsc.frequency.exponentialRampToValueAtTime(0.01, now + 0.3);
        bassGain.gain.setValueAtTime(0.2, now);
        bassGain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        bassOsc.connect(bassGain);
        bassGain.connect(ctx.destination);

        // Mechanical layer (Mid-High)
        const midOsc = ctx.createOscillator();
        const midGain = ctx.createGain();
        midOsc.type = 'triangle';
        midOsc.frequency.setValueAtTime(600, now);
        midOsc.frequency.exponentialRampToValueAtTime(100, now + 0.15);
        midGain.gain.setValueAtTime(0.1, now);
        midGain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        midOsc.connect(midGain);
        midGain.connect(ctx.destination);

        // Click layer (High/Static)
        const clickOsc = ctx.createOscillator();
        const clickGain = ctx.createGain();
        clickOsc.type = 'square';
        clickOsc.frequency.setValueAtTime(1200, now);
        clickOsc.frequency.exponentialRampToValueAtTime(800, now + 0.05);
        clickGain.gain.setValueAtTime(0.02, now);
        clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        clickOsc.connect(clickGain);
        clickGain.connect(ctx.destination);

        bassOsc.start(now);
        midOsc.start(now);
        clickOsc.start(now);

        bassOsc.stop(now + 0.3);
        midOsc.stop(now + 0.15);
        clickOsc.stop(now + 0.05);
    } catch (e) { }
};

// Global interaction listener to wake up the AudioContext immediately
if (typeof window !== 'undefined') {
    const interactionEvents = ['mousedown', 'touchstart', 'keydown', 'pointerdown'];

    let keepAliveStarted = false;

    const wakeAudio = () => {
        const ctx = getAudioContext();
        if (ctx && ctx.state === 'suspended') {
            ctx.resume();
        }

        // Start a silent keep-alive oscillator on the first interaction
        // to prevent the browser from suspending the context again.
        if (ctx && !keepAliveStarted && ctx.state === 'running') {
            const silentOsc = ctx.createOscillator();
            const silentGain = ctx.createGain();
            silentGain.gain.value = 0;
            silentOsc.connect(silentGain);
            silentGain.connect(ctx.destination);
            silentOsc.start();
            keepAliveStarted = true;
        }
    };

    interactionEvents.forEach(event => {
        window.addEventListener(event, wakeAudio, { capture: true, passive: true });
    });

    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
            wakeAudio();
        }
    });
}
