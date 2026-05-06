// SCENTRA — Scroll Animations

document.addEventListener('DOMContentLoaded', () => {

  // Intersection Observer for fade-up
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  // Auto-observe fade-up elements
  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

  // Stagger animation for grids
  const cardGroups = document.querySelectorAll('.fragrance-grid, .podium-container');
  cardGroups.forEach(group => {
    const cards = group.querySelectorAll('.frag-card, .podium-item');
    cards.forEach((card, i) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(24px)';
      card.style.transition = `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`;
    });

    const groupObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          cards.forEach(card => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          });
          groupObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05 });

    groupObs.observe(group);
  });

  // FAQ accordion
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  // Filter buttons
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      const cards = document.querySelectorAll('.product-card, .frag-card');

      cards.forEach(card => {
        if (filter === 'all' || card.dataset.house === filter) {
          card.style.display = '';
          setTimeout(() => { 
            card.style.opacity = '1'; 
            card.style.transform = 'translateY(0)'; 
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => { card.style.display = 'none'; }, 400);
        }
      });
    });
  });

  // Smooth scroll for hash links
  if (window.location.hash) {
    setTimeout(() => {
      const el = document.querySelector(window.location.hash);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 300);
  }

  // Parallax effect on hero
  const hero = document.querySelector('.hero-pattern');
  if (hero) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      if (scrolled < 800) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
      }
    });
  }

});
