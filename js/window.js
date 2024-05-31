
window.addEventListener("load", () => {

  showModal("time");

})

window.addEventListener("scroll", () => {

  const currentScrollValue =  scrollPercentage();
   
  showScrollbarStatus(currentScrollValue);

  showTopButton(currentScrollValue, 25);

  showModal("scroll");

})