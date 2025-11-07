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

  // SEE ALL PRODUCTS toggle: shows full grid and hides slider
  const toggleBtn = document.getElementById('toggleAllProducts');
  const allGrid = document.getElementById('allProductsGrid');
  const productsSection = document.getElementById('products');
  toggleBtn.addEventListener('click', () => {
    const isHidden = allGrid.classList.contains('hidden');
    if (isHidden) {
      // show grid, hide slider controls
      allGrid.classList.remove('hidden');
      document.querySelector('.products-slider-wrap').classList.add('hidden');
      toggleBtn.textContent = 'Show Slider';
      // scroll to expanded grid
      allGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      allGrid.classList.add('hidden');
      document.querySelector('.products-slider-wrap').classList.remove('hidden');
      toggleBtn.textContent = 'See All Products';
      productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

  // CLIENTS slider auto-scroll using JS fallback (in case CSS animation not desired)
  // We'll create a gentle auto-scroll: move left by 1px every 30ms; reset when scrolled far.
  const clientsSlider = document.getElementById('clientsSlider');
  if (clientsSlider) {
    clientsSlider.innerHTML += clientsSlider.innerHTML;
    // let scrollSpeed = 0.5; // px per frame
    // let running = true;

    // let lastFrame = performance.now();
    // function step(now) {
    //   const dt = now - lastFrame;
    //   lastFrame = now;
    //   if (running) {
    //     clientsSlider.scrollLeft += scrollSpeed * dt / 16; // normalized
    //     // If scrolled near end, reset to 0 to create loop effect
    //     if (clientsSlider.scrollLeft > clientsSlider.scrollWidth / 2) {
    //       clientsSlider.scrollLeft = 0;
    //     }
    //   }
    //   requestAnimationFrame(step);
    // }
    // requestAnimationFrame(step);

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
