// EduNova · Mobile nav (hamburger) toggle for the public site header

const EduNovaNav = (() => {
  function toggle() {
    const links = document.querySelector('.nav-links');
    const btn = document.querySelector('.nav-toggle');
    if (!links || !btn) return;
    const isOpen = links.classList.toggle('is-open');
    btn.classList.toggle('is-active', isOpen);
    btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  }

  function close() {
    const links = document.querySelector('.nav-links');
    const btn = document.querySelector('.nav-toggle');
    if (!links || !btn) return;
    links.classList.remove('is-open');
    btn.classList.remove('is-active');
    btn.setAttribute('aria-expanded', 'false');
  }

  // Close the menu automatically if the viewport is resized back to desktop.
  window.addEventListener('resize', () => {
    if (window.innerWidth > 720) close();
  });

  return { toggle, close };
})();
