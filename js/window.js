

window.addEventListener("load", () => {

  !isModalShown() && showModal("time");

})

window.addEventListener("scroll", () => {

  const currentScrollValue =  scrollPercentage();
   
  showScrollbarStatus(currentScrollValue);

  showTopButton(currentScrollValue, 25);

  !isModalShown() && showModal("scroll");

})