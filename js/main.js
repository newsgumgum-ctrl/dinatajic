// Switches between My Work, About Me and the project pages, fades images in once
// they have loaded, and opens images full size. Everything else is plain HTML.
(() => {
  const views = new Map([...document.querySelectorAll('[data-view]')].map(v => [v.dataset.view, v]));
  const navLinks = document.querySelectorAll('[data-nav]');
  const baseTitle = 'Dina Tajić';
  let current = null;
  let workScroll = 0;

  function show(name, fromNav) {
    if (!views.has(name)) name = 'work';
    if (current === 'work') workScroll = window.scrollY;
    const view = views.get(name);
    views.forEach(v => v.classList.toggle('is-active', v === view));
    navLinks.forEach(a => {
      const on = a.dataset.nav === name || (a.dataset.nav === 'work' && name !== 'about');
      if (on) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
    const h1 = view.querySelector('h1');
    document.title = name === 'work' ? `${baseTitle} · Graphic design, photography, art`
      : `${h1 ? h1.textContent : ''} · ${baseTitle}`;
    const previous = current;
    current = name;
    if (!fromNav) return;
    window.scrollTo(0, name === 'work' && previous && previous !== 'about' && previous !== 'work' ? workScroll : 0);
    if (h1) { h1.setAttribute('tabindex', '-1'); h1.focus({ preventScroll: true }); }
  }

  const route = fromNav => show(decodeURIComponent(location.hash.slice(1)) || 'work', fromNav);
  window.addEventListener('hashchange', () => route(true));
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  route(false);

  // Fade each image in when it is ready.
  document.querySelectorAll('.row img').forEach(img => {
    const done = () => img.classList.add('is-loaded');
    if (img.complete && img.naturalWidth) done();
    else { img.addEventListener('load', done, { once: true }); img.addEventListener('error', done, { once: true }); }
  });

  // Full-size viewer.
  const lb = document.getElementById('lightbox');
  const lbImg = lb.querySelector('img');
  let set = [], at = 0, opener = null;

  function paint() {
    const btn = set[at];
    const thumb = btn.querySelector('img');
    lbImg.src = btn.dataset.full;
    lbImg.alt = thumb.alt;
    lb.querySelector('.lb-prev').hidden = set.length < 2;
    lb.querySelector('.lb-next').hidden = set.length < 2;
  }
  function open(btn) {
    set = [...btn.closest('[data-view]').querySelectorAll('.zoom')];
    at = set.indexOf(btn);
    opener = btn;
    paint();
    lb.hidden = false;
    document.body.style.overflow = 'hidden';
    lb.querySelector('.lb-close').focus();
  }
  function close() {
    lb.hidden = true;
    lbImg.removeAttribute('src');
    document.body.style.overflow = '';
    if (opener) opener.focus({ preventScroll: true });
  }
  const step = d => { at = (at + d + set.length) % set.length; paint(); };

  document.addEventListener('click', e => {
    const btn = e.target.closest('.zoom');
    if (btn) open(btn);
  });
  lb.querySelector('.lb-close').addEventListener('click', close);
  lb.querySelector('.lb-prev').addEventListener('click', () => step(-1));
  lb.querySelector('.lb-next').addEventListener('click', () => step(1));
  lb.addEventListener('click', e => { if (e.target === lb) close(); });
  document.addEventListener('keydown', e => {
    if (lb.hidden) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowRight') step(1);
    else if (e.key === 'ArrowLeft') step(-1);
    else if (e.key === 'Tab') {
      const f = [...lb.querySelectorAll('button:not([hidden])')];
      const i = f.indexOf(document.activeElement);
      e.preventDefault();
      f[(i + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus();
    }
  });
})();
