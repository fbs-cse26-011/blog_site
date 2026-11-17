/* Viola's Journal — small helpers */
(function () {
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  /* Active navigation item */
  let page = location.pathname.split('/').pop() || 'index.html';
  if (page === '' || page === '/') page = 'index.html';
  document.querySelectorAll('[data-nav]').forEach(function (link) {
    if (link.getAttribute('data-nav') === page) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

  /* Mobile menu */
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* Copy-to-clipboard for email templates */
  document.querySelectorAll('[data-copy]').forEach(function (button) {
    button.addEventListener('click', function () {
      const target = document.querySelector(button.dataset.copy);
      const status = button.parentElement.querySelector('.copy-status');
      if (!target) return;
      const text = target.textContent.trim();
      const done = function () {
        const original = button.textContent;
        button.textContent = 'Copied!';
        if (status) status.textContent = 'Copied to clipboard';
        setTimeout(function () {
          button.textContent = original;
          if (status) status.textContent = '';
        }, 1800);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () { fallbackCopy(text, done); });
      } else {
        fallbackCopy(text, done);
      }
    });
  });

  function fallbackCopy(text, done) {
    const area = document.createElement('textarea');
    area.value = text;
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    try { document.execCommand('copy'); done(); } catch (e) { /* ignore */ }
    document.body.removeChild(area);
  }
})();
