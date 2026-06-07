document.addEventListener('DOMContentLoaded', () => {
  const selectors = ['.hero-content', '.card', 'section', '.hotel-info', '.slider img', '#experiencias'];
  const items = document.querySelectorAll(selectors.join(','));

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        // unobserve after in view to avoid repeated triggers
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12
  });

  items.forEach(el => {
    // skip elements already visible
    obs.observe(el);
  });

  // small stagger on cards
  const cards = document.querySelectorAll('.card');
  cards.forEach((c, i) => {
    c.style.transitionDelay = (i * 80) + 'ms';
  });

  // subtle loader for hero content
  const hero = document.querySelector('.hero-content');
  if (hero) setTimeout(() => hero.classList.add('in-view'), 120);

  // enhance slider images: fade in when changed
  const sliderImg = document.querySelector('#slider-img');
  if (sliderImg) {
    const swap = (newSrc) => {
      sliderImg.classList.remove('in-view');
      setTimeout(() => { sliderImg.src = newSrc; sliderImg.classList.add('in-view'); }, 140);
    };
    // attach to existing next/prev if present
    const next = document.querySelector('.next');
    const prev = document.querySelector('.prev');
    if (next) next.addEventListener('click', () => sliderImg.classList.remove('in-view'));
    if (prev) prev.addEventListener('click', () => sliderImg.classList.remove('in-view'));
  }
});
