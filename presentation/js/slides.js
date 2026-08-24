// ============================================================
// Gamification Pitch — reveal.js initializer
//
// All slides are inlined directly in start.html as <section>
// elements, so this script only initializes reveal.js. No
// fetch() is used, which means the deck works from file://
// (double-click start.html) without a server or an IDE.
//
// To change the deck order, move or delete the <section>
// elements inside start.html.
// ============================================================

// Initialize reveal.js with standard settings.
// PDF export is supported via the ?print-pdf query param (built into reveal.js).
function initReveal() {
  Reveal.initialize({
    hash: true,
    controls: true,
    progress: true,
    center: true,
    transition: 'slide',
    slideNumber: true,
  });

  initFullscreen();
}

// Fullscreen toggle for any live demo iframe.
function initFullscreen() {
  const frame = document.getElementById('demo-frame');
  const btn = document.getElementById('fullscreen-btn');

  if (!frame || !btn) return;

  function isFullscreen() {
    return (
      document.fullscreenElement === frame ||
      document.webkitFullscreenElement === frame
    );
  }

  function toggleFullscreen() {
    if (isFullscreen()) {
      if (document.exitFullscreen) document.exitFullscreen();
      else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
    } else {
      if (frame.requestFullscreen) frame.requestFullscreen();
      else if (frame.webkitRequestFullscreen) frame.webkitRequestFullscreen();
    }
  }

  btn.addEventListener('click', toggleFullscreen);

  function updateLabel() {
    btn.textContent = isFullscreen() ? '✕ Exit Fullscreen' : '⛶ Fullscreen';
  }

  document.addEventListener('fullscreenchange', updateLabel);
  document.addEventListener('webkitfullscreenchange', updateLabel);
}

// Start reveal.js once the DOM is ready.
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initReveal);
} else {
  initReveal();
}
