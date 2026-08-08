export function playPlaceholderSound(volume: number, muted: boolean): void {
  if (muted || volume <= 0) {
    return;
  }
  const AudioContextCtor = window.AudioContext;
  const context = new AudioContextCtor();
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.frequency.value = 660;
  gain.gain.value = Math.min(volume / 100, 1) * 0.035;
  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.addEventListener("ended", () => {
    oscillator.disconnect();
    gain.disconnect();
    void context.close();
  }, { once: true });
  oscillator.start();
  oscillator.stop(context.currentTime + 0.08);
}
