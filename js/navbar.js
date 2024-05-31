

window.addEventListener("scroll", () => {
  const navbarTopButton = document.getElementById("navbar-top-button");
  const currentScrollValue =  scrollPercentage();
  
  if (currentScrollValue > 25) {
    navbarTopButton.classList.add("show-top-button");
  } else {
    navbarTopButton.classList.remove("show-top-button");
  }

  document.getElementById("navbar-scroll-indicator").style.width = `${currentScrollValue}%`;

})

document.getElementById("navbar-menu-button")
  .addEventListener("click", () => {
    document.getElementById("navbar-menu").classList.toggle("show-mobile-menu");
  })

document.getElementById("navbar-top-button").addEventListener("click", () => {
  const topButtonTimeout = setTimeout(() => {

    clearTimeout(topButtonTimeout);

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
    
  }, 200);

});
