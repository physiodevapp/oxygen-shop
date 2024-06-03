

const formEventToObject = ({ target }) => {

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

const isValidFormObject = (dataObject) => {

  let isFormValidated = true;
  const invalidHTMLFields = new Array( ...document.getElementsByClassName("invalid-field") );
  
  invalidHTMLFields.forEach((htmlElement) => {
    htmlElement.classList.remove("invalid-field");
  });

  const regex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

  for (const key in dataObject) {

    switch (key) {
      case "name":
        if (dataObject[key].length < 3 || dataObject[key].length >= 100) {
          document.getElementById("name").classList.toggle("invalid-field");
          isFormValidated = false;
        } 

        break;

      case "email":

        if (!regex.test(dataObject[key])) {
          document.getElementById("email").classList.toggle("invalid-field");
          isFormValidated = false;
        } 

        break;

      case "email-subscription":

        if (!regex.test(dataObject[key])) {
          document.getElementById("email-subscription").classList.toggle("invalid-field");
          isFormValidated = false;
        } 

        break;

      case "consent":
        if (!dataObject[key]) {
          document.getElementById("consent-label").classList.toggle("invalid-field");
          isFormValidated = false;
        } 

        break;

      default:
        break;
    }
  }

  return isFormValidated;
}

const sendFormDataObject = (dataObject) => {

  fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify(dataObject),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .catch((error) => {
      alert(`An error occurred while trying to get the response to the API`)
      console.error(error);
    })
    .then((json) => {
      alert(JSON.stringify(json))
    })
    .catch((error) => {
      alert(`An error occurred while trying to get the data`);
      console.error(error);
    });
  }