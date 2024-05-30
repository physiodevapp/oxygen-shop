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

function validateFormObject(dataObject) {

  for (const key in dataObject) {
  
    switch (key) {
      case "name":
        if (dataObject[key].length < 3 || dataObject[key].length >= 100) {
          document.getElementById("name").classList.add("invalid-field");
        } else {
          document.getElementById("name").classList.remove("invalid-field");
        }

        break;

      case "email":
        const regex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

        if (!regex.test(dataObject[key])) {
          document.getElementById("email").classList.add("invalid-field");
        } else {
          document.getElementById("email").classList.remove("invalid-field");
        }

        break;

      case "consent":
        if (!dataObject[key]) {
          document.getElementById("consent-label").classList.add("invalid-field");
        } else {
          document.getElementById("consent-label").classList.remove("invalid-field");
        }

        break;

      default:
        break;
    }
  }
}


document.getElementById("contact-form").onsubmit = handleForm;

function handleForm(event) {
  event.preventDefault();

  const dataObject = formEventToObject(event);

  validateFormObject(dataObject);
}
