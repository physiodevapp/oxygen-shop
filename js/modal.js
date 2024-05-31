const modal = document.getElementById("modal");
const closeButton = document.getElementById("modal-close-button");
const isModalShown = () => {
  return !!localStorage.getItem("isModalShown") || false;
}

const showModal = (basedOn) => {
  const currentScrollValue = scrollPercentage();
  let modalTimeout;

  switch (basedOn) {
    case "time":
      modalTimeout = setTimeout(() => {
        clearTimeout(modalTimeout);

        localStorage.setItem("isModalShown", "true");

        modal.classList.add("show-modal");
      }, 5000);


      break;

    case "scroll":
      if (currentScrollValue > 25) {
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

modal.addEventListener("click", hideModal);

closeButton.addEventListener("click", hideModal);
