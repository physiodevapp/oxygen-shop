

const navbarTopButton = document.getElementById("navbar-top-button");
const navbarScrollIndicator = document.getElementById("navbar-scroll-indicator");
const navbarMenuButton = document.getElementById("navbar-menu-button");
const navbarMenu = document.getElementById("navbar-menu");

const showScrollbarStatus = (currentScrollValue) => {
  navbarScrollIndicator.style.width = `${currentScrollValue}%`;
}

const showTopButton = (currentScrollValue, threshold) => {
  if (currentScrollValue > threshold) {
    navbarTopButton.classList.add("show-top-button");
  } else {
    navbarTopButton.classList.remove("show-top-button");
  }
}

navbarMenuButton.addEventListener("click", () => {
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
