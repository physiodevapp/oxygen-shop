
const scrollPercentage = () => window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;

window.addEventListener("load", () => {
  wasModalShown() ? hideModal() : showModal("time");
});

window.addEventListener("keydown", ({key}) => {
  key === "Escape" && isModalShowing() && hideModal();
})

window.addEventListener("scroll", () => {

  const currentScrollValue =  scrollPercentage();
   
  showScrollbarStatus(currentScrollValue);

  showTopButton(currentScrollValue, 25);

  !wasModalShown() && showModal("scroll", currentScrollValue, 25);

})

window.addEventListener("click", ({target}) => {

  if ( [selectorButton.id, selectorUnits.id, selectorFlag.id].every((id) => id !== target.id) ) 
    toggleCurrencyOptions("remove");
  
})