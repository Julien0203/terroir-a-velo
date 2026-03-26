/* ══════════════════════════════
   TERROIR À VÉLO — JS partagé
══════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Nav scroll ── */
  const nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });
  }

  /* ── Hamburger / Mobile menu ── */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileClose = document.getElementById('mobileClose');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
    mobileClose?.addEventListener('click', () => mobileMenu.classList.remove('open'));
    document.querySelectorAll('.mobile-link').forEach(l =>
      l.addEventListener('click', () => mobileMenu.classList.remove('open'))
    );
  }

  /* ── Active nav link ── */
  const path = window.location.pathname;
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
    if (a.getAttribute('href') === path ||
        (path !== '/' && path !== '/index.html' && a.getAttribute('href') && a.getAttribute('href').includes(path.split('/')[1]))) {
      a.classList.add('active');
    }
  });

  /* ── Scroll reveal ── */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  /* ── Smooth anchors ── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });

  /* ── Contact form ── */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('.form-submit');
      const prenom = form.prenom?.value.trim();
      const email  = form.email?.value.trim();
      if (!prenom || !email) {
        btn.textContent = '⚠ Prénom et email requis';
        btn.style.background = '#c0392b';
        setTimeout(() => { btn.textContent = 'Envoyer ma demande →'; btn.style.background = ''; }, 2600);
        return;
      }
      const circuit   = form.circuit?.value   || 'Non précisé';
      const personnes = form.personnes?.value || 'Non précisé';
      const date      = form.date?.value       || 'Non précisée';
      const msg       = form.message?.value    || '';
      const body = encodeURIComponent(
        `Bonjour Pierre & Boris,\n\nJe souhaite réserver une balade à vélo en Provence.\n\nNom : ${prenom} ${form.nom?.value || ''}\nEmail : ${email}\nCircuit : ${circuit}\nDate : ${date}\nPersonnes : ${personnes}\nMessage : ${msg}\n\nMerci !`
      );
      window.location.href = `mailto:terroiravelo@gmail.com?subject=Demande%20de%20r%C3%A9servation%20%E2%80%94%20Terroir%20%C3%A0%20V%C3%A9lo&body=${body}`;
      btn.textContent = '✓ Demande envoyée !';
      btn.style.background = '#2d6a4f';
      form.reset();
      setTimeout(() => { btn.textContent = 'Envoyer ma demande →'; btn.style.background = ''; }, 3200);
    });
  }

});
