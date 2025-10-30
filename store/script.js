// Simple UI enhancements: preloader, mobile menu, filtering, counters, reveal animations

document.addEventListener('DOMContentLoaded', () => {
  // Preloader hide
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.setTimeout(() => {
      preloader.style.opacity = '0';
      preloader.style.pointerEvents = 'none';
      setTimeout(()=>preloader.remove(),400);
    }, 700);
  }

  // year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile menu toggle
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  menuToggle?.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    menuToggle.classList.toggle('open');
  });

  // Filter buttons for collections
  const filterBtns = document.querySelectorAll('.filter-btn');
  const grid = document.getElementById('collections-grid');
  if (filterBtns && grid) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.dataset.cat;
        const cards = grid.querySelectorAll('.card');
        cards.forEach(card => {
          const itemCat = card.dataset.category;
          if (cat === 'all' || itemCat === cat) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // Add to cart / wishlist counters (demo only)
  let cartCount = 0, wishCount = 0;
  document.querySelectorAll('.action.add').forEach(btn=>{
    btn.addEventListener('click', (e)=>{
      e.preventDefault();
      cartCount++;
      document.getElementById('cart-count').textContent = cartCount;
      btn.classList.add('added');
      btn.innerHTML = '<i class="fas fa-check"></i>';
      setTimeout(()=> btn.innerHTML = '<i class="fas fa-shopping-bag"></i>', 900);
    });
  });
  document.querySelectorAll('.action.wish').forEach(btn=>{
    btn.addEventListener('click', (e)=>{
      e.preventDefault();
      wishCount++;
      document.getElementById('wish-count').textContent = wishCount;
      btn.classList.add('wish-added');
      btn.innerHTML = '<i class="fas fa-heart"></i>';
    });
  });

  // Quick reveal on scroll (IntersectionObserver)
  const reveals = document.querySelectorAll('.card, .story, .artisan-card, .feature');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('inview');
        observer.unobserve(entry.target);
      }
    });
  }, {threshold: 0.12});
  reveals.forEach(r => observer.observe(r));

  // Contact & subscribe demo
  const contactForm = document.getElementById('contact-form');
  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thanks — your message has been received (demo).');
    contactForm.reset();
  });

  const subscribe = document.getElementById('subscribe-form');
  subscribe?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thanks for subscribing (demo).');
    subscribe.reset();
  });

  // simple load more (demo)
  const loadMore = document.getElementById('load-more');
  loadMore?.addEventListener('click', () => {
    loadMore.textContent = 'Loading...';
    setTimeout(() => {
      loadMore.textContent = 'No more items (demo)';
      loadMore.disabled = true;
    }, 800);
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor=>{
    anchor.addEventListener('click', function(e){
      const href = this.getAttribute('href');
      if(href.length>1){
        e.preventDefault();
        document.querySelector(href)?.scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  });
});
