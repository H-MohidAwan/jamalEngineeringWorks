// Basic interactivity for the single-page site
document.addEventListener('DOMContentLoaded', function () {
  // NAV TOGGLE
  const navToggle = document.getElementById('navToggle');
  const mainNavList = document.querySelector('.nav-list');

  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    mainNavList.classList.toggle('show');
  });

  // SMOOTH SCROLL for nav links (works in all modern browsers)
  document.querySelectorAll('a[data-scroll]').forEach(a => {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      const id = this.getAttribute('href');
      const target = document.querySelector(id);
      if (!target) return;
      // Close mobile nav when clicked
      if (mainNavList.classList.contains('show')) mainNavList.classList.remove('show');
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.pageYOffset - 72,
        behavior: 'smooth'
      });
    });
  });

  // Year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // PRODUCT SLIDER (simple previous / next)
  const slider = document.getElementById('productsSlider');
  const prevBtn = document.getElementById('prodPrev');
  const nextBtn = document.getElementById('prodNext');

  // calculate slide width using first card
  function slideBy(offset) {
    slider.scrollBy({ left: offset, behavior: 'smooth' });
  }

  prevBtn.addEventListener('click', () => {
    const card = slider.querySelector('.product-card');
    if (!card) return;
    slideBy(- (card.offsetWidth + parseInt(getComputedStyle(slider).gap || 16)));
  });
  nextBtn.addEventListener('click', () => {
    const card = slider.querySelector('.product-card');
    if (!card) return;
    slideBy(card.offsetWidth + parseInt(getComputedStyle(slider).gap || 16));
  });



  // CLIENTS slider auto-scroll using JS fallback (in case CSS animation not desired)
  // We'll create a gentle auto-scroll: move left by 1px every 30ms; reset when scrolled far.
  const clientsSlider = document.getElementById('clientsSlider');
  if (clientsSlider) {

    clientsSlider.addEventListener('mouseenter', () => running = false);
    clientsSlider.addEventListener('mouseleave', () => running = true);
  }

  // Accessibility improvement: close mobile nav on outside click
  document.addEventListener('click', (e) => {
    if (!mainNavList.contains(e.target) && !navToggle.contains(e.target)) {
      if (mainNavList.classList.contains('show')) {
        mainNavList.classList.remove('show');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    }
  });
});
