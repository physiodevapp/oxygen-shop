const selectorButton = document.getElementById("currency-selector-button");
const selectorUnits = document.getElementById("selector-button-units");
const selectorFlag = document.getElementById("selector-button-img");
const currencyOptions = document.getElementById("currency-selector-list");
let isCurrencyOptionsVisible = false;

const toggleCurrencyOptions = (action) => {
  if (action !== "add" && action !== "remove") return;

  currencyOptions.classList[action]("show-currencies");
  selectorButton.classList[action]("selector-expanded");

  isCurrencyOptionsVisible = action === "add" ? true : false;
};

const getCurrencyCode = (target) => {
  let currencyCode;

  if (target.nodeName === "IMG") {
    currencyCode = target.parentElement.dataset.ref?.toLowerCase();
  } else {
    currencyCode = target.dataset.ref?.toLowerCase();
  }

  return currencyCode;
};

const getPriceElements = (className) => {
  return new Array(
    ...document.getElementsByClassName(className)
  );
}

const getExchangedValues = (currencyExchange) => {
  const priceElements = getPriceElements("pricing__article__pack__value");

  return priceElements.map((priceElement) => {
    const oldValue = Number(priceElement.dataset.value);
    const newValue = Math.round(oldValue * currencyExchange); 

    return newValue;
  });
};

const getExchangedUnits = (currencyCode) => {
  let units = null;

  switch (currencyCode) {
    case "eur":
      units = "€";
      break;
    
    case "usd":
      units = "$";
    break;

    case "gbp":
      units = "£";
      break;
  
    default:
      units = "";
      break;
  }

  return units;
}

const exchangePrices = (currencyCode, currencyExchange) => {
  const priceElements = getPriceElements("pricing__article__pack__value");

  const exchangedValues = getExchangedValues(currencyExchange);
  const exchangedUnits = getExchangedUnits(currencyCode);

  priceElements.forEach((element, index) => {
    
    switch (exchangedUnits) {
      case "€":
        element.innerHTML = `${exchangedValues[index]}${exchangedUnits}`;
        break;
    
      default:
        element.innerHTML = `${exchangedUnits}${exchangedValues[index]}`;
        break;
    }

  });

}

const updateSelectorValue = (currencyCode) => {

  let flag = '';
  
  switch (currencyCode) {
    case "eur":
      flag = "union-europea.png";
      break;

    case "usd":
      flag = "estados-unidos.png";
      break;

    case "gbp":
      flag = "reino-unido.png"
      break;
  
    default:
      break;
  }

  selectorUnits.innerText = currencyCode.toUpperCase();
  selectorFlag.src = `./assets/images/${flag}`;

}
 
selectorButton.addEventListener("click", () => {
  console.log('object');
  isCurrencyOptionsVisible
    ? toggleCurrencyOptions("remove")
    : toggleCurrencyOptions("add");
});

currencyOptions.addEventListener("click", ({ target }) => {
  const currencyCode = getCurrencyCode(target);

  updateSelectorValue(currencyCode);

  fetch(
    "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json"
  )
    .then((response) => response.json())
    .then(({ usd }) => exchangePrices(currencyCode, usd[currencyCode]))
    .catch((error) => console.log(error));
});
