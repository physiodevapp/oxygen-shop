const modal = document.getElementById("modal");
const closeButton = document.getElementById("modal-close-button");
let isModalShown = false;

const showModal = (basedOn) => {
  const currentScrollValue = scrollPercentage();

  switch (basedOn) {
    case "time":
      const modalTimeout = setTimeout(() => {
        clearTimeout(modalTimeout);

        modal.classList.add("show-modal");
      }, 5000);

      isModalShown = true;

      break;

    case "scroll":
      if (currentScrollValue > 25) {
        modal.classList.add("show-modal");

        isModalShown = true;
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
