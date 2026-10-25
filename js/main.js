// Project: Complex API 1 - Med Spa
// GitHub: https://github.com/Resilient-Labs/complex-api-med-spa
// APIs used:
// https://apiverve.com/marketplace/currencysymbols this needs a currency code to give a currency symbol character, that can then be displayed
// https://www.exchangerate-api.com/docs/authentication this can give a currency code based on country

// global variable, so I can store a value and then use it as value for next API call
let currencyCode = {}

// When the user clicks to submit, the function should run:
document.querySelector('#submit').addEventListener('click', getCurrencyCode)

// function takes country input and returns that country's currency code
function getCurrencyCode() {
    // Employee enters amount of currency and country that the client is from
    const currencyAmountReceivedFromClient = document.querySelector('#amountReceived').value
    const countryCurrencyIsFrom = document.querySelector('#country').value
    console.log(currencyAmountReceivedFromClient)
    console.log(countryCurrencyIsFrom)
    //Empty Array/variable to property value I get back from API to then use in 2nd Fetch:
    let refinedArray = []

    fetch(
        `https://countries-api.davegarvey.workers.dev/countries`,
    )
        .then(response => response.json())
        .then(data => {
            console.log(data)
            data.forEach(country => {
                if (country.name == `${countryCurrencyIsFrom}`) {
                    currencyCode = country.currency
                    console.log(currencyCode)
                    //display currency code and amount:
                    document.querySelector('#currencyCode').innerText = currencyCode
                    document.querySelector('#currencyAmountReceived').innerText = currencyAmountReceivedFromClient
                    return currencyCode
                }
            })
            secondAPIRuns(currencyCode, currencyAmountReceivedFromClient)
        })
        .catch(error => {
            console.log(error)
            alert('Error')
        })
}
// function gets currency conversion factor to USD
function secondAPIRuns(passedInValueFromFirstAPI, howMuchWasReceivedFromClient) {
    fetch(
        `https://v6.exchangerate-api.com/v6/ca1686371cf7e8315a6b8e2b/latest/${passedInValueFromFirstAPI}`,
    )
        .then(response => response.json())
        .then(data => {
            console.log(data)
            // one of the currency = this many US dollars:
            let conversionFactor = data.conversion_rates.USD
            console.log(conversionFactor)
            //do math to calculate 
            let inUSD = (howMuchWasReceivedFromClient * conversionFactor).toFixed(2) // show rounded to 2 decimal places
            console.log(inUSD)
            // display the amount converted to US dollars
            document.querySelector('#displayUSD').innerText = `$ ${inUSD}`
        })
        .catch(error => {
            console.log(error)
            alert('Error')
        })
}
