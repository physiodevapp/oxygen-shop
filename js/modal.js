
const modal = document.getElementById("modal");

const showModal = (basedOn) => {
  const currentScrollValue =  scrollPercentage();

  switch (basedOn) {
    case "time":
      const modalTimeout = setTimeout(() => {
    
        clearTimeout(modalTimeout);
    
        modal.classList.add("show-modal");
    
      }, 5000);
      
      break;
  
    case "scroll":
      if (currentScrollValue > 25) {
        modal.classList.add("show-modal");
      }

      break;

    default:
      break;
  }



}