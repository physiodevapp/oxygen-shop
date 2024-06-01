

document.getElementById("contact-form").addEventListener("submit", (event) => {

  event.preventDefault();
  
  const dataObject = formEventToObject(event);
  
  const canSendData = isValidFormObject(dataObject);
  
  if (canSendData) {
    sendFormDataObject(dataObject);
  }

});

