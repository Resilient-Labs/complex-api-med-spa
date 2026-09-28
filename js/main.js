// alert('works')
//https://seqbench.com/api/v1
//https://makeup-api.herokuapp.com/
//http://makeup-api.herokuapp.com/api/v1/products.json
//https://developer.woocommerce.com/docs/apis/rest-api/v3/api-reference/
//https://publicapis.io/woocommerce-api
//https://developer.woocommerce.com/docs/apis/rest-api/
//https://api.fda.gov/cosmetic/event.json 
//https://api.fda.gov/cosmetic/event.json?search=report_type:Direct&limit=5
//https://world.openbeautyfacts.org/data
/// flow 


/*
Takes in a string from makeup API 
searches Woo commerce where to find afforsable one? 
take in derm as the name 


*/

/*

Key (medical_v2):

62c9a416-d5af-4b7e-970a-8422950173b5

Key (Dictionary):

86155f68-3114-4271-9282-839d706914f0
*/

document.querySelector("#submit").addEventListener("click", getRec)

function getRec(event) {
    event.preventDefault()

    let input = document.getElementById("Spa").value
   
    const url = `https://world.openbeautyfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(input)}&search_simple=1&action=process&json=1`

    fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data) 
        let OpenBeautyData = data.products
        .filter(product => product.ingredients?.[0]?.text && product.brands)
        .slice(0,5)
        
        let results = document.querySelector("#output") 

        results.innerHTML = ""

        OpenBeautyData.forEach(product => {
/* anwars code to call things in card*/ 
            let card = document.createElement("article") 
        

            let image = document.createElement("img")
            image.src = product.image_url || ""
            image.alt = product.product_name || "Beauty Product: "
            image.width = 100

             let category = document.createElement("p")
             category.textContent =  "Category: " + (product.categories || "Not available")

             let type = document.createElement("p")
            type.textContent = "Product type: " + (product.product_type || "Not available")

            /*let ingredient = document.createElement("p")
            ingredient.textContent = "First Ingredient " + (product.ingredients?.[0].text || "na")*/

            let name = document.createElement("h2")
            name.textContent = product.product_name || "Unnamed product"

            let brandText = document.createElement("p")
            brandText.textContent = "Brand: " + (product.brands || "Not available")

            // let price = document.createElement("p")
            // price.textContent =    `price: ${product.`

            let makeupResult = document.createElement("p")
            makeupResult.textContent = "2nd APi "

            // let key = "62c9a416-d5af-4b7e-kkk-8422950173b5"

            // let ingredientName = "salicylic acid"
            
            // let MeriamDefinition = document.createElement("p")
            // MeriamDefinition.textContent = ""
            
            // const meriamURL = `https://www.dictionaryapi.com/api/v3/references/medical/json/${encodeURIComponent(ingredientName || "")}?key=${key}`
            // fetch(meriamURL)
            //     .then(response => response.json())
            //     .then(data => {
            //         console.log(data)
            //         MeriamDefinition.textContent ="Merriam-Webster definition: " + (data[0]?.shortdef?.[0] || "")
            //     })
            //     .catch(err => {
            //         console.log(`err ${err}`)
            //     })//brands?.split(",")[0].trim() || ""
            let brand = product.brands?.split(",")[0].trim() || ""

            const makeupURL =
                `https://makeup-api.herokuapp.com/api/v1/products.json?brand=${encodeURIComponent(brand)}`

            fetch(makeupURL)
                .then(response => response.json())
                .then(makeupData => {
                    console.log(brand, makeupData)

                    makeupResult.textContent = makeupData.length? "potential Prodcut: " + makeupData[0].name + " | Brand: " +  makeupData[0].brand: "no products found"
                })
                .catch(err => {
                    console.log(`Makeup API error ${err}`)
                })

             if (product.image_url) {card.append(image)}

             card.append(name, brandText, category, type, makeupResult)
            results.append(card)
         }) 

    })     

    .catch(err => {
        console.log(`error ${err}`)
        alert(`error ${err}`)
    })
}

