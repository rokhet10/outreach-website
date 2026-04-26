// Runs synchronously before paint to prevent theme flash
(function () {
  const saved = localStorage.getItem('theme');
  if (saved !== 'light') document.documentElement.setAttribute('data-theme', 'dark');
})();
