const navLinks = document.querySelectorAll('.nav-links .link');

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    // Reset all icons back to "regular"
    navLinks.forEach(l => {
      const img = l.querySelector('.icon');
      img.src = img.src.replace('_filled', '_regular');
      });

    // Change clicked one to "filled"
    const clickedImg = link.querySelector('.icon');
    clickedImg.src = clickedImg.src.replace('_regular', '_filled');
    });
});