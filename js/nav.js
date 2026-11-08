/* ============================================================
   nav.js — Injects shared nav + footer into every page
   To change site name/links: edit NAV_HTML and FOOTER_HTML below
   ============================================================ */

const SITE_NAME = "CodeReach";

const NAV_HTML = `
<div class="announce-bar" id="announce-bar">
  <a href="learn.html#summer-camp" class="announce-bar-link">
    <span class="pulse-dot"></span>
    <span><strong>AI &amp; CS Summer Camp (6 Weeks)</strong> — Free, beginner-friendly, starts June. Join the waitlist&nbsp;→</span>
  </a>
  <button class="announce-close" id="announce-close" aria-label="Dismiss">✕</button>
</div>
<nav>
  <div class="nav-inner">
    <a href="index.html" class="nav-logo">⚡ ${SITE_NAME}</a>
    <ul class="nav-links" id="nav-links">
      <li><a href="index.html"    class="nav-link" data-page="index">Home</a></li>
      <li class="nav-has-dropdown">
        <a href="about.html" class="nav-link" data-page="about">About ▾</a>
        <div class="nav-dropdown">
          <a href="about.html" class="nav-dropdown-item">About CodeReach</a>
          <a href="leadership.html" class="nav-dropdown-item">Leadership</a>
          <a href="chapters.html" class="nav-dropdown-item">Chapters</a>
        </div>
      </li>
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
      <p>A free, student-led educational organization providing AI and computer science education to middle and high school students in Northville, Michigan and beyond.</p>
    </div>
    <div class="footer-col">
      <h4>Learn</h4>
      <ul>
        <li><a href="learn.html">Sign Up</a></li>
        <li><a href="learn.html#summer-camp">Summer Camp</a></li>
        <li><a href="sessions.html">Sessions</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Get Involved</h4>
      <ul>
        <li><a href="teach.html">Teach / Mentor</a></li>
        <li><a href="about.html">Our Mission</a></li>
        <li><a href="leadership.html">Leadership</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Connect</h4>
      <ul>
        <li><a href="contact.html">Contact Us</a></li>
        <li><a href="mailto:rohankhetan10@gmail.com">Email Us</a></li>
        <li><a href="https://www.instagram.com/codereachofficial/" target="_blank" rel="noopener">Instagram</a></li>
        <li><a href="https://twitter.com/rohan__khetan" target="_blank" rel="noopener">Twitter / X</a></li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <span>© ${new Date().getFullYear()} ${SITE_NAME}. All rights reserved. · <a href="rohan-khetan.html" style="color:inherit;text-decoration:none;">Rohan Khetan</a> ·<a href="privacy.html" style="color:inherit;text-decoration:none;">Privacy Policy</a></span>
    <span>Free educational organization — no fees, no gatekeeping.</span>
  </div>
</footer>`;

document.addEventListener('DOMContentLoaded', () => {
  // Inject nav before <main>, footer after
  const main = document.querySelector('main');
  if (main) {
    main.insertAdjacentHTML('beforebegin', NAV_HTML);
    main.insertAdjacentHTML('afterend', FOOTER_HTML);
  }

  // Announcement bar dismiss
  document.getElementById('announce-close')?.addEventListener('click', () => {
    const bar = document.getElementById('announce-bar');
    bar.style.display = 'none';
    document.documentElement.style.setProperty('--announce-h', '0px');
  });

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

  // Dropdown: toggle on click (for touch devices), close on outside click
  document.querySelectorAll('.nav-has-dropdown > a').forEach(trigger => {
    trigger.addEventListener('click', e => {
      const li = trigger.parentElement;
      const isOpen = li.classList.contains('dropdown-open');
      document.querySelectorAll('.nav-has-dropdown').forEach(el => el.classList.remove('dropdown-open'));
      if (!isOpen) { e.preventDefault(); li.classList.add('dropdown-open'); }
    });
  });
  document.addEventListener('click', e => {
    if (!e.target.closest('.nav-has-dropdown')) {
      document.querySelectorAll('.nav-has-dropdown').forEach(el => el.classList.remove('dropdown-open'));
    }
  });

  // Follow system color scheme automatically
  const mq = window.matchMedia('(prefers-color-scheme: dark)');
  mq.addEventListener('change', e => {
    document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
  });
});
