const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');

const syncHeader = () => {
  header.classList.toggle('scrolled', window.scrollY > 18);
};

syncHeader();
window.addEventListener('scroll', syncHeader, { passive: true });

menuToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.site-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((item) => revealObserver.observe(item));

const animateCounter = (element) => {
  const target = Number(element.dataset.count || 0);
  const suffix = element.dataset.suffix || '';
  const duration = 1200;
  const start = performance.now();

  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    element.textContent = `${Math.floor(target * eased).toLocaleString()}${suffix}`;
    if (progress < 1) requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
};

const statsPanel = document.querySelector('.stats-panel');
if (statsPanel) {
  const statsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      statsPanel.querySelectorAll('[data-count]').forEach(animateCounter);
      statsObserver.disconnect();
    }
  }, { threshold: 0.35 });
  statsObserver.observe(statsPanel);
}

document.getElementById('year').textContent = new Date().getFullYear();
