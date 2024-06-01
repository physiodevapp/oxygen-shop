

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

  !isModalShown() && showModal("scroll", currentScrollValue, 25);

})

window.addEventListener("click", ({target}) => {

  if ( [selectorButton.id, selectorUnits.id, selectorFlag.id].every((id) => id !== target.id) ) 
    toggleCurrencyOptions("remove");
  
})