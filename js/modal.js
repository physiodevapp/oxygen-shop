const modal = document.getElementById("modal");
const closeButton = document.getElementById("modal-close-button");
const subscriptionForm = document.getElementById("subscription-form");
let modalTimeout;

const isModalShown = () => {
  const value = (!!localStorage.getItem("isModalShown") && !modal.classList.contains("show-modal")) 
    || false;
  
  return value
}

const showModal = (basedOn, currentScrollValue = null, threshold = null) => {

  modal.classList.remove("display-none");

  switch (basedOn) {
    case "time":
      modalTimeout = setTimeout(() => {
        clearTimeout(modalTimeout);

        localStorage.setItem("isModalShown", "true");

        modal.classList.add("show-modal");
      }, 5000);


      break;

    case "scroll":
      if (currentScrollValue > threshold) {

        modal.classList.add("show-modal");

        clearTimeout(modalTimeout);

        localStorage.setItem("isModalShown", "true");

      }

      break;

    default:
      break;
  }
};

const hideModal = () => {
  modal.classList.remove("show-modal");

  const modalTimeout = setTimeout(() => {
    clearTimeout(modalTimeout);

    modal.classList.add("display-none");
  }, 200);
};

modal.addEventListener("click", ({target}) => {
  target.id === "modal" && hideModal();
});

closeButton.addEventListener("click", () => {
  hideModal();
});

subscriptionForm.addEventListener("submit", (event) => {

  event.preventDefault();
  
  const dataObject = formEventToObject(event);
  
  const canSendData = isValidFormObject(dataObject);
  
  if (canSendData) {
    sendFormDataObject(dataObject);
  }

});
