//You have been provided with a page containing several instrument cards. 
// You are going to add functionality to this static page so you'll be able 
// to filter the instruments depending on their family.

const instrumentsArr = [{
        category: "woodwinds",
        instrument: "Flute",
        price: 500,
    },
    {
        category: "woodwinds",
        instrument: "Clarinet",
        price: 200,
    },
    {
        category: "woodwinds",
        instrument: "Oboe",
        price: 4000,
    },
    {
        category: "brass",
        instrument: "Trumpet",
        price: 200
    },
    {
        category: "brass",
        instrument: "Trombone",
        price: 300
    },
    {
        category: "brass",
        instrument: "French Horn",
        price: 4300
    },
    {
        category: "percussion",
        instrument: "Drum Set",
        price: 500
    },
    {
        category: "percussion",
        instrument: "Xylophone",
        price: 3000
    },
    {
        category: "percussion",
        instrument: "Cymbals",
        price: 200
    },
    {
        category: "percussion",
        instrument: "Marimba",
        price: 3000
    }
];

function instrumentCards(instrumentCategory) {
    const instrument =
        instrumentCategory === "all" ?
        instrumentsArr :
        instrumentsArr.filter(
            ({
                category
            }) => category === instrumentCategory
        );
    return instrument
        .map(({
            instrument,
            price
        }) => {
            return `
        <div class="card">
          <h2>${instrument}</h2>
          <p>$${price}</p>
        </div>
        `
        }).join("")
}

document.addEventListener("DOMContentLoaded", function () {
    const selectContainer = document.querySelector(".select-container");
    const productsContainer = document.querySelector(".products-container");

    if (selectContainer) {
        selectContainer.addEventListener("change", () => {
            productsContainer.innerHTML = instrumentCards(selectContainer.value);
        });
    } else {
        console.error("select-container not found!");
    }
});