/* ============================================================
   nav.js — Injects shared nav + footer into every page
   To change site name/links: edit NAV_HTML and FOOTER_HTML below
   ============================================================ */

const SITE_NAME = "CodeReach";

const NAV_HTML = `
<a href="learn.html#signup" class="announce-bar">
  <span class="pulse-dot"></span>
  <span><strong>AI &amp; CS Summer Camp</strong> — Free, beginner-friendly, starts June. Reserve your spot&nbsp;→</span>
</a>
<nav>
  <div class="nav-inner">
    <a href="index.html" class="nav-logo">⚡ ${SITE_NAME}</a>
    <ul class="nav-links" id="nav-links">
      <li><a href="index.html"    class="nav-link" data-page="index">Home</a></li>
      <li><a href="about.html"   class="nav-link" data-page="about">About</a></li>
      <li><a href="learn.html"   class="nav-link" data-page="learn">Learn</a></li>
      <li><a href="teach.html"   class="nav-link" data-page="teach">Teach</a></li>
      <li><a href="learn.html"   class="nav-link nav-cta">Get Started →</a></li>
    </ul>
    <button class="hamburger" id="hamburger" aria-label="Open menu">
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>`;

const FOOTER_HTML = `
<footer>
  <div class="footer-inner">
    <div class="footer-brand">
      <a href="index.html" class="nav-logo">⚡ ${SITE_NAME}</a>
      <p>Empowering the next generation of AI and CS innovators through hands-on learning, mentorship, and community.</p>
    </div>
    <div class="footer-col">
      <h4>Learn</h4>
      <ul>
        <li><a href="learn.html">Sign Up</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Get Involved</h4>
      <ul>
        <li><a href="teach.html">Teach / Mentor</a></li>
        <li><a href="teach.html">Create Lessons</a></li>
        <li><a href="about.html">Our Mission</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Connect</h4>
      <ul>
        <li><a href="mailto:rohankhetan10@gmail.com">Email Us</a></li>
        <li><a href="#">Instagram</a></li>
        <li><a href="#">LinkedIn</a></li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <span>© ${new Date().getFullYear()} ${SITE_NAME}. All rights reserved.</span>
    <span>Built to inspire the next generation.</span>
  </div>
</footer>`;

document.addEventListener('DOMContentLoaded', () => {
  // Inject nav before <main>, footer after
  const main = document.querySelector('main');
  if (main) {
    main.insertAdjacentHTML('beforebegin', NAV_HTML);
    main.insertAdjacentHTML('afterend', FOOTER_HTML);
  }

  // Highlight active nav link
  const page = document.body.dataset.page || '';
  document.querySelectorAll('.nav-link[data-page]').forEach(link => {
    if (link.dataset.page === page) link.classList.add('active');
  });

  // Mobile hamburger toggle
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');

  hamburger?.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const isOpen = navLinks.classList.contains('open');
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // Close mobile nav when a link is clicked
  navLinks?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
  });

  // Follow system color scheme automatically
  const mq = window.matchMedia('(prefers-color-scheme: dark)');
  mq.addEventListener('change', e => {
    document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
  });
});
