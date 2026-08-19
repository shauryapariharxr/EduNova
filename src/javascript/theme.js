// EduNova · Light / dark theme toggle
//
// Applies the saved theme before the page paints (called from an inline
// <script> placed early in <head>), and exposes a toggle for the button
// in the topbar.

const EduNovaTheme = (() => {
  const KEY = 'edunova_theme';

  function getSaved() {
    try {
      return localStorage.getItem(KEY);
    } catch {
      return null;
    }
  }

  function apply(theme) {
    document.documentElement.setAttribute('data-theme', theme);
  }

  // Runs immediately when the script loads (before body renders) so there's
  // no flash of the wrong theme.
  function init() {
    const saved = getSaved();
    const theme = saved === 'dark' ? 'dark' : 'light';
    apply(theme);
    return theme;
  }

  function toggle() {
    const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    apply(next);
    try {
      localStorage.setItem(KEY, next);
    } catch {
      /* ignore */
    }
    return next;
  }

  init();

  return { toggle };
})();
