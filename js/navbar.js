
window.addEventListener("scroll", (event) => {
  const scrollPercentage = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100
  document.getElementById("navbar-scroll-indicator").style.width = `${scrollPercentage}%`;

})

document.getElementById("navbar-menu-button")
  .addEventListener("click", () => {
    document.getElementById("navbar-menu").classList.toggle("show-mobile-menu");
  })
