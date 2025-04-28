//To represent each plant in your catalog, you'll use objects, 
// each with three properties:
//   -- commonName, the common name of the plant
//   -- scientificName, the scientific name (or latin name) of the plant
//   -- cultivar, the variety of the plant

const ballerina = {
    commonName: "Spanish lavender",
    scientificName: "Lavandula stoechas",
    cultivar: "Ballerina"
}

const prettyPolly = {
    commonName: "Spanish lavender",
    scientificName: "Lavandula stoechas",
    cultivar: "Pretty Polly"
}

const willowVale = {
    commonName: "Spanish lavender",
    scientificName: "Lavandula stoechas",
    cultivar: "Willow Vale"
}

const hidcote = {
    commonName: "English lavender",
    scientificName: "Lavandula angustifolia",
    cultivar: "Hidcote"
}

const imperialGem = {
    commonName: "English lavender",
    scientificName: "Lavandula angustifolia",
    cultivar: "Imperial Gem"
}

const royalCrown = {
    commonName: "French lavender",
    scientificName: "Lavandula dentata",
    cultivar: "Royal Crown"
}

const catalog = new Map();
catalog.set(ballerina, {
    small: 20,
    medium: 15,
    large: 12
});
catalog.set(prettyPolly, {
    small: 31,
    medium: 14,
    large: 24
});
catalog.set(willowVale, {
    small: 32,
    medium: 14,
    large: 25
});
catalog.set(hidcote, {
    small: 20,
    medium: 15,
    large: 12
});
catalog.set(imperialGem, {
    small: 20,
    medium: 15,
    large: 12
});
catalog.set(royalCrown, {
    small: 20,
    medium: 15,
    large: 12
});

const removePlant = (plant) => catalog.delete(plant);

//function that will allow you to update the catalog when you sell plants
const sellPlants = (plant, size, potsNo) => {
    if (!catalog.has(plant)) return "Item not found.";
    const name = `${plant.scientificName} '${plant.cultivar}'`
    const pots = catalog.get(plant);
    if (pots[size] - potsNo < 0) {
        return `Not enough ${size} size pots for ${name}. Only ${pots[size]} left.`
    }
    pots[size] -= potsNo
    return `Catalog successfully updated.`
}

const displayCatalog = () => {
    let catalogString = "";
    catalog.forEach((val, key) => {
        catalogString += `${key.scientificName} '${key.cultivar}': ${val.small} S, ${val.medium} M, ${val.large} L
  `
    })
    return catalogString
}

const displayPlantsSet = () => {
    const catalogSet = new Set();
    catalogSet.add(ballerina);
    catalogSet.add(prettyPolly);
    const commonNamesArray = [...catalog.keys()].map(plant => plant.commonName);
    const uniqueCommonNames = new Set(commonNamesArray);
    return uniqueCommonNames;
};


console.log(plantsSet);
console.log(plantsSet.has(ballerina));