

// product informations
const productImage = document.querySelector("img")
const productInput = document.querySelector("input")
const productName = document.querySelector("#product-name")
const brandQuantity = document.querySelector("#brandName")
const barCode = document.querySelector("#barcode")
const ingredientsContainer = document.querySelector(".ingredient-wrapper")
const allergenContainer = document.querySelector(".allergen-result")


// Common Allergies 
const ingredientsToWatch = [
    "retinol", "retinal", "retinyl palmitate", "salicylic acid", "glycolic acid",
    "lactic acid", "benzoyl peroxide"
]


document.querySelector("button").addEventListener("click",getAllergenCheck)
 

function getAllergenCheck(){
    // get the value of the input
    const productNameInp = productInput.value

    // passed all query i need to reduce the load of fetch rather than getting unnecessary details
    const url = `https://world.openbeautyfacts.org/api/v2/product/${productNameInp}?fields=product_name,brands,image_url,ingredients_text,quantity`

    fetch(url)
    .then(res=>res.json())
    .then((data)=>{

        // correct barcode checker to be displayed
        if(data.status===1){

    

        // left side information
      productImage.src = data.product?.image_url ?? "image/images.jpeg"
      productName.textContent = `Product: ${data.product.product_name || "Product Name doesnt exist"}`
      brandQuantity.innerHTML = `<strong>Brand</strong>: ${data.product.brands || "Unknown"} <strong>Quantity</strong> : ${data.product.quantity ?? "Unknown"} ml`
      barCode.textContent = `BarCode:${data.code}`

        // clear the old container( make the old being appended on the new )
            ingredientsContainer.innerHTML = ""
            allergenContainer.innerHTML = ""

        // store the ingredient and added safety incase the ingredients dont exist
        const ingredients = data.product.ingredients_text || ""
        
        // convert them to array

        const ingridi = ingredients.split(",").map(list=>list.trim().toLowerCase())

     
          // create empty array to store the new flagged ingridents
          const flaggedIngredient = []
        ingridi.forEach((ingredient)=>{
            // create span for each ingredients
            const ingredientSpan = document.createElement("span")

            // text content assignment
            ingredientSpan.textContent = ingredient

            // some method to check if the ingredient match any item in the list
            const checkIfIngredientIsRed = ingredientsToWatch.find(ingri=>ingredient.includes(ingri))

            
          // check if there is a match and adds the red pills in each fllaged ingredients
          // also add call the function to get the chemical rxn details
            if(checkIfIngredientIsRed){
                flaggedIngredient.push(checkIfIngredientIsRed)
                ingredientSpan.classList.add("red-tag")

                //pass the ingredient which is bascially the red/flagged 
                getChemicalReaction(checkIfIngredientIsRed)
            }
            
            else {
            // if not this will be displayed
             ingredientSpan.classList.add("gray-tag")
            }
        //     // appending the child to parent
           ingredientsContainer.append(ingredientSpan)
        })      
        
        }
    else{
        alert("Product not found!! Wrong Barcode")
    }
    })
    .catch(error=>console.error("error",error))

}

function getChemicalReaction(ingredient){
    // used encodeURI incase query has space
    const url = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${encodeURIComponent(ingredient)}/property/MolecularFormula,IUPACName/JSON`

    // create the card for the flagged Ingredients
    const newCard = document.createElement("div")
    newCard.classList.add("card")

      const ingredientName = document.createElement("h1")
        ingredientName.textContent = `Ingredient: ${ingredient}`
        newCard.append(ingredientName)
        // append to the main wrapper
        allergenContainer.append(newCard)
    
     fetch(url)
    .then(res=>res.json())
    .then(data=>{

        const{MolecularFormula,IUPACName}= data.PropertyTable.Properties[0]

                // create molecule  elements
                const molecurlar = document.createElement("p")
                molecurlar.textContent = `Molecular Formula : ${MolecularFormula}`

                // create iupac element 
                const iupacName = document.createElement("p")
                iupacName.textContent = `IUPACName Formula : ${IUPACName}`

                // append all this to there parent
                newCard.append(molecurlar,iupacName)

    })
    .catch(error=>console.log("error",error))


}