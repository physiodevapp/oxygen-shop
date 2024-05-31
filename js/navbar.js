

const navbarTopButton = document.getElementById("navbar-top-button");
const navbarScrollIndicator = document.getElementById("navbar-scroll-indicator");
const navbarMenu = document.getElementById("navbar-menu");

const showScrollbarStatus = () => {
  const currentScrollValue =  scrollPercentage();
  
  if (currentScrollValue > 25) {
    navbarTopButton.classList.add("show-top-button");
  } else {
    navbarTopButton.classList.remove("show-top-button");
  }

  navbarScrollIndicator.style.width = `${currentScrollValue}%`;
}

navbarTopButton.addEventListener("click", () => {
    navbarMenu.classList.toggle("show-mobile-menu");
  })

navbarTopButton.addEventListener("click", () => {
  const topButtonTimeout = setTimeout(() => {

    clearTimeout(topButtonTimeout);

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
    
  }, 200);

});
