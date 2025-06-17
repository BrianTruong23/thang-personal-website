// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
  
  // Highlight nav link of current section
  window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section');
    const scrollPos = window.scrollY + 100;
  
    sections.forEach(section => {
      const top = section.offsetTop;
      const id = section.getAttribute('id');
      const navLink = document.querySelector(`nav a[href="#${id}"]`);
  
      if (scrollPos >= top && scrollPos < top + section.offsetHeight) {
        navLink?.classList.add('active');
      } else {
        navLink?.classList.remove('active');
      }
    });
  });
  
  // Optional: Button hover interaction
  const contactButton = document.querySelector('button.contact');
  if (contactButton) {
    contactButton.addEventListener('mouseenter', () => {
      contactButton.classList.add('hovered');
    });
    contactButton.addEventListener('mouseleave', () => {
      contactButton.classList.remove('hovered');
    });
  }
  
  // Fade-in sections on scroll
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.2
  });
  
  document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
  });
  