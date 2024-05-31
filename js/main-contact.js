function formEventToObject({ target }) {
  const fields = new Array(...target.elements);

  const dataObject = fields
    .filter((field) => field.name)
    .reduce((object, field) => {
      return {
        ...object,
        [field.name]:
          field["type"] === "checkbox" ? field["checked"] : field["value"],
      };
    }, {});

  return dataObject;
}

function isValidFormObject(dataObject) {

  let formValidated = true;

  for (const key in dataObject) {

    switch (key) {
      case "name":
        if (dataObject[key].length < 3 || dataObject[key].length >= 100) {
          document.getElementById("name").classList.add("invalid-field");
          formValidated = false;
        } else {
          document.getElementById("name").classList.remove("invalid-field");
        }

        break;

      case "email":
        const regex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

        if (!regex.test(dataObject[key])) {
          document.getElementById("email").classList.add("invalid-field");
          formValidated = false;
        } else {
          document.getElementById("email").classList.remove("invalid-field");
        }

        break;

      case "consent":
        if (!dataObject[key]) {
          document.getElementById("consent-label").classList.add("invalid-field");
          formValidated = false;
        } else {
          document.getElementById("consent-label").classList.remove("invalid-field");
        }

        break;

      default:
        break;
    }
  }

  return formValidated;
}

function sendFormDataObject(dataObject) {

  fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify(dataObject),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
  }


document.getElementById("contact-form").addEventListener("submit", (event) => {

  event.preventDefault();
  
  const dataObject = formEventToObject(event);
  
  const canSendData = isValidFormObject(dataObject);
  
  if (canSendData) {
    sendFormDataObject(dataObject);
  }

});

