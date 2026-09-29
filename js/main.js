// Open Beauty Facts API: https://world.openbeautyfacts.org/cgi/search.pl

// ChEBI API: https://www.ebi.ac.uk/chebi/backend/api/public/es_search/

// CeraVe Hydrating Facial Cleanser
// Cetaphil Gentle Skin Cleanser
// Neutrogena Hydro Boost Water Gel
// Dove Beauty Bar
// La Roche-Posay Toleriane Hydrating Gentle Cleanser

const getBeautyFactsAPI_URL = 'https://world.openbeautyfacts.org/cgi/search.pl';

const getChEBI_API_URL = 'https://www.ebi.ac.uk/chebi/backend/api/public/es_search/';

document.querySelector('button').addEventListener('click', getBeautyProduct);

function getBeautyProduct() {

    document.querySelector('#informationProduct').replaceChildren();
    document.querySelector('#informationIngredients').replaceChildren();

    const productName = document.querySelector('#productName').value;
    console.log(productName);

    if (productName === '') {
        return alert('Please enter a beauty product name.');
    };

    const formatProductName = productName.replaceAll(' ', '+');
    console.log(formatProductName);

    const getBeautyProductURL = getBeautyFactsAPI_URL + `?search_terms=${formatProductName}&search_simple=1&action=process&json=1&page_size=1`;
    console.log(getBeautyProductURL);

    getBeautyProductInformation(getBeautyProductURL);
};

function getBeautyProductInformation(beautyProductURL) {
    console.log(beautyProductURL);

    return fetch(beautyProductURL)

        .then(function (response) {
            console.log(response);
            return response.json();
        })

        .then(function (data) {
            console.log(data);

            const beautyProducts = data.products;
            console.log(beautyProducts);

            if (beautyProducts.length < 1) {
                return alert('No beauty product was found.');
            };

            const beautyProduct = beautyProducts[0];
            console.log(beautyProduct);

            buildBeautyProductInformation(beautyProduct);

            return getBeautyProductIngredients(beautyProduct);

        });
};


function buildBeautyProductInformation(beautyProduct) {
    console.log(beautyProduct);

    const informationProduct = document.querySelector('#informationProduct');

    let sectionBeautyProduct = document.createElement('section');

    let headingBeautyProduct = document.createElement('h3');
    headingBeautyProduct.innerText = beautyProduct.product_name;
    sectionBeautyProduct.appendChild(headingBeautyProduct);

    let divBrand = document.createElement('div');

    let nameBrand = document.createElement('span');
    nameBrand.innerText = 'BRAND: ';
    divBrand.appendChild(nameBrand);

    let valueBrand = document.createElement('span');
    valueBrand.innerText = beautyProduct.brands;
    divBrand.appendChild(valueBrand);

    sectionBeautyProduct.appendChild(divBrand);

    let divIngredients = document.createElement('div');

    let nameIngredients = document.createElement('span');
    nameIngredients.innerText = 'INGREDIENTS: ';
    divIngredients.appendChild(nameIngredients);

    let valueIngredients = document.createElement('span');
    valueIngredients.innerText = beautyProduct.ingredients_text;
    divIngredients.appendChild(valueIngredients);

    sectionBeautyProduct.appendChild(divIngredients);

    informationProduct.appendChild(sectionBeautyProduct);
};

function getBeautyProductIngredients(beautyProduct) {
    console.log(beautyProduct);

    const beautyProductIngredients = beautyProduct.ingredients;
    console.log(beautyProductIngredients);

    if (beautyProductIngredients == null) {

        let sectionIngredient = document.createElement('section');

        let spanIngredient = document.createElement('span');
        spanIngredient.innerText = 'No ingredient information was found.';
        sectionIngredient.appendChild(spanIngredient);

        document.querySelector('#informationIngredients').appendChild(sectionIngredient);

        return;

    };

    beautyProductIngredients.forEach(function (ingredient) {
        console.log(ingredient);

        let ingredientName = '';

        ingredientName = ingredient.text;
        console.log(ingredientName);

        if (ingredientName !== '') {
            getIngredientInformation(ingredientName);
        };

    });
};


function getIngredientInformation(ingredientName) {
    console.log(ingredientName);

    const formatIngredientName = ingredientName.replaceAll(' ', '+');
    console.log(formatIngredientName);

    const getIngredientURL = getChEBI_API_URL + `?term=${formatIngredientName}&size=1`;
    console.log(getIngredientURL);

    return fetch(getIngredientURL)

        .then(function (response) {
            console.log(response);
            return response.json();
        })

        .then(function (data) {
            console.log(data);

            const informationIngredients = data.results;
            console.log(informationIngredients);

            if (informationIngredients === undefined || informationIngredients.length < 1) {
                return data;
            };

            const ingredientResult = informationIngredients[0];
            console.log(ingredientResult);

            const ingredientChemical = ingredientResult._source;
            console.log(ingredientChemical);

            let chemicalName = '';
            chemicalName = ingredientChemical.name;
            console.log(chemicalName);

            let chemicalID = '';
            chemicalID = ingredientChemical.chebi_accession;
            console.log(chemicalID);

            let chemicalDefinition = '';
            chemicalDefinition = ingredientChemical.definition;
            console.log(chemicalDefinition);

            buildIngredientInformation(ingredientName, chemicalName, chemicalID, chemicalDefinition);

            return data;

        });
};


function buildIngredientInformation(ingredientName, chemicalName, chemicalID, chemicalDefinition) {
    console.log(ingredientName);
    console.log(chemicalName);
    console.log(chemicalID);
    console.log(chemicalDefinition);

    const informationIngredients = document.querySelector('#informationIngredients');

    let sectionIngredient = document.createElement('section');

    let headingIngredient = document.createElement('h3');
    headingIngredient.innerText = ingredientName;
    sectionIngredient.appendChild(headingIngredient);

    let divIngredientName = document.createElement('div');

    let nameIngredientName = document.createElement('span');
    nameIngredientName.innerText = 'INGREDIENT: ';
    divIngredientName.appendChild(nameIngredientName);

    let valueIngredientName = document.createElement('span');
    valueIngredientName.innerText = ingredientName;
    divIngredientName.appendChild(valueIngredientName);

    sectionIngredient.appendChild(divIngredientName);

    let divChemicalName = document.createElement('div');

    let nameChemicalName = document.createElement('span');
    nameChemicalName.innerText = 'CHEMICAL NAME: ';
    divChemicalName.appendChild(nameChemicalName);

    let valueChemicalName = document.createElement('span');
    valueChemicalName.innerText = chemicalName;
    divChemicalName.appendChild(valueChemicalName);

    sectionIngredient.appendChild(divChemicalName);

    let divChemicalID = document.createElement('div');

    let nameChemicalID = document.createElement('span');
    nameChemicalID.innerText = 'CHEBI ID: ';
    divChemicalID.appendChild(nameChemicalID);

    let valueChemicalID = document.createElement('span');
    valueChemicalID.innerText = chemicalID;
    divChemicalID.appendChild(valueChemicalID);

    sectionIngredient.appendChild(divChemicalID);

    let divChemicalDefinition = document.createElement('div');

    let nameChemicalDefinition = document.createElement('span');
    nameChemicalDefinition.innerText = 'DESCRIPTION: ';
    divChemicalDefinition.appendChild(nameChemicalDefinition);

    let valueChemicalDefinition = document.createElement('span');
    valueChemicalDefinition.innerText = chemicalDefinition;
    divChemicalDefinition.appendChild(valueChemicalDefinition);

    sectionIngredient.appendChild(divChemicalDefinition);

    informationIngredients.appendChild(sectionIngredient);
};