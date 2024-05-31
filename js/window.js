

window.addEventListener("load", () => {

  isModalShown() ? hideModal() : showModal("time");

});

window.addEventListener("keydown", ({key}) => {
  key === "Escape" && isModalShown() && hideModal();
})

window.addEventListener("scroll", () => {

  const currentScrollValue =  scrollPercentage();
   
  showScrollbarStatus(currentScrollValue);

  showTopButton(currentScrollValue, 25);

  isModalShown() ? hideModal() : showModal("scroll");

})