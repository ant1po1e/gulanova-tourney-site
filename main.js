document.addEventListener("DOMContentLoaded", () => {
    const heroText = document.querySelector("#home h1");
    const heroButton = document.querySelector("#home a");
  
    heroText.classList.add("animate__fadeInDown");
    heroButton.classList.add("animate__fadeInUp");
    
    window.addEventListener('scroll', () => {
      const navbar = document.querySelector("#navbar");
      if (window.scrollY > 100) {
        navbar.classList.add("navbar-shrink");
      } else {
        navbar.classList.remove("navbar-shrink");
      }
    });
  });
  