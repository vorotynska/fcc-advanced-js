// Apply the functional programming concepts to build an ingredient converter app.
const conversionTable = {
    cup: {
        gram: 240,
        ounce: 8.0,
        teaspoon: 48
    },
    gram: {
        cup: 1 / 240,
        ounce: 0.0353,
        teaspoon: 0.2
    },
    ounce: {
        cup: 0.125,
        gram: 28.35,
        teaspoon: 6
    },
    teaspoon: {
        cup: 1 / 48,
        gram: 5,
        ounce: 0.167
    },
};

const units = ["cup", "gram", "ounce", "teaspoon"];

const ingredientName = document.getElementById("ingredient");
const ingredientQuantity = document.getElementById("quantity");
const unitToConvert = document.getElementById("unit");
const numberOfServings = document.getElementById("servings");
const recipeForm = document.getElementById("recipe-form");
const resultList = document.getElementById("result-list");

const convertQuantity = (fromUnit) => (toUnit) => (quantity) => {
    const conversionRate = conversionTable[fromUnit][toUnit];
    return quantity * conversionRate;
};


// adjust for the number of servings being calculated
const adjustForServings = (baseQuantity) => (newServings) =>
    (baseQuantity / 1) * newServings;

const processIngredient = (baseQuantity, baseUnit, newUnit, newServings) => {
    const quantity = adjustForServings(baseQuantity)(newServings);
    const convert = convertQuantity(baseUnit)(newUnit)(quantity);
    return convert.toFixed(2);
};

const updateResultsList = () => {
    resultList.innerHTML = "";

    units.forEach((newUnit) => {
        if (newUnit !== unitToConvert.value) {
            const convertedQuantity = processIngredient(
                parseFloat(ingredientQuantity.value),
                unitToConvert.value,
                newUnit,
                parseFloat(numberOfServings.value)
            );

            resultList.innerHTML += `<li>${ingredientName.value}: ${convertedQuantity} ${newUnit}</li>`;
        }
    });
};

recipeForm.addEventListener("submit", (event) => {
    event.preventDefault();
    updateResultsList();
});

const gramsResult = convertQuantity("cup")("gram")(2);
console.log(gramsResult);

const servingsResult = adjustForServings(4)(6);
console.log(servingsResult);