(() => {
  'use strict';

  const INITIAL_VOLUME = 5;
  const audio = document.getElementById('bgmAudio');
  const slider = document.getElementById('bgmVolume');
  const valueText = document.getElementById('bgmVolumeText');
  if (!audio || !slider || !valueText) return;

  audio.loop = true;
  audio.volume = INITIAL_VOLUME / 100;
  slider.value = String(INITIAL_VOLUME);
  valueText.textContent = `${INITIAL_VOLUME}%`;

  function applyVolume(raw) {
    const value = Math.max(0, Math.min(100, Math.round(Number(raw) || 0)));
    slider.value = String(value);
    audio.volume = value / 100;
    valueText.textContent = `${value}%`;
  }

  async function startBgm() {
    if (!audio.paused) return true;
    try {
      await audio.play();
      return true;
    } catch {
      return false;
    }
  }

  slider.addEventListener('input', () => {
    applyVolume(slider.value);
    startBgm();
  });

  // Most browsers block sound autoplay until the first user gesture.
  // Try immediately, then unlock playback on the first click/tap/key press.
  startBgm();
  const unlock = () => { startBgm(); };
  window.addEventListener('pointerdown', unlock, { once:true, capture:true });
  window.addEventListener('keydown', unlock, { once:true, capture:true });
})();
