document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    const sections = document.querySelectorAll('section');
    const backToTopBtn = document.getElementById('backToTop');
  
    // Smooth scroll on nav link click
    for (let link of navLinks) {
      link.addEventListener('click', smoothScroll);
    }
  
    function smoothScroll(event) {
      event.preventDefault();
      const targetId = event.currentTarget.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  
    // Intersection Observer to highlight active section link & reveal sections
    const options = {
      threshold: 0.25
    };
  
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const id = entry.target.getAttribute('id');
        if (entry.isIntersecting) {
          // Highlight active nav link
          document.querySelectorAll('nav a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            }
          });
          // Add in-view class to animate section
          entry.target.classList.add('in-view');
        }
      });
    }, options);
  
    sections.forEach(section => {
      observer.observe(section);
    });
  
    // Back to top button visibility
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    });
  
    // Smooth scroll to top
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });