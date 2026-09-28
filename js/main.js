


const baseURL = "https://api.thebeautyapi.com";
//let product = document.querySelector('#product-name').innervalue


const BEAUTY_API_KEY = "uI91OQTX6K8yKL9EcSSTI4KFqw9gAuM28c3nUDwS"
document.getElementById('search-btn').addEventListener('click', searchProducts)

function searchProducts(){
let productName = document.getElementById('input-product').value
let productEndPt = "/v1/products/search?q=" + encodeURIComponent(productName) + "&page=1"
fetch(baseURL + productEndPt,{headers: { "x-api-key": BEAUTY_API_KEY }})
.then(res =>res.json())
.then(data=>{
//console.log(data)
document.getElementById('container-product-btns').innerHTML =''
let results = data.results.slice(0,10)
results.forEach(product =>{
let productnameBtn = document.createElement('button')
productnameBtn.innerText = product.name
//console.log(product.id)
productnameBtn.addEventListener('click', ()=> getIngredients(product.id))

document.getElementById('container-product-btns').appendChild(productnameBtn)
})
})
.catch(err => console.log(err))
}
 function getIngredients(id){
  fetch(`${baseURL}/v1/products/${id}`,{headers: { "x-api-key": BEAUTY_API_KEY }})
  .then(res => res.json())
  .then(data => {
let ingredients = data.ingredients.slice(0,6)
ingredients = ingredients.map(ingredient => ingredient.name)
//console.log(ingredients)
document.getElementById('container-ingredient-btns').innerHTML=''
ingredients.forEach(ingredient=>{
let ingredientBtn = document.createElement('button')
ingredientBtn.innerText = ingredient
ingredientBtn.addEventListener('click',()=> cosi(ingredient))
document.getElementById('container-ingredient-btns').appendChild(ingredientBtn)
})

})
.catch(err => console.log(err))
}  
function cosi(ingredient){
  let url = "https://api.bdapi.app/api/public/cosing/search?q=" + encodeURIComponent(ingredient) + "&limit=1"
  fetch(url)
  .then(res => res.json())
  .then(data =>{
  console.log(data)
let info = document.getElementById('ingredient-details')
info.innerHTML =''
if (data.rows.length === 0){
  info.innerText = "No information found for this ingredient."
return
}
let result = data.rows[0]
let name = document.createElement('h3')
name.innerText = result.inci_name
let functions = document.createElement('p')
if (result.function_names.length > 0){
  functions.innerText = "Functions: " + result.function_names.join(', ')
} else {
  functions.innerText = "Functions: None listed"
}
let cas = document.createElement('p')
if (result.cas_no){
  cas.innerText = "CAS Number: " + result.cas_no
} else {
  cas.innerText = "CAS Number: Not listed"
}
let restriction = document.createElement('p')
if(result.cosmetic_restriction){
restriction.innerText = "EU Cosmetic Restriction: "+ result.cosmetic_restriction
}else { 
  restriction.innerText= "EU Cosemetic Restriction: None Listed"
}
info.appendChild(name)
info.appendChild(functions)
info.appendChild(cas)
info.appendChild(restriction)

  if(result.regulatory && result.regulatory.annexes.length >0){
    let regulation = result.regulatory.annexes[0]
  if( regulation.product_type){
    let productType = document.createElement('p')
    productType.innerText = "Product Type: "+ regulation.product_type
  info.appendChild(productType)
  }
  if(regulation.warnings){
    let warning = document.createElement('p')
    warning.innerText = "Required Warning: "+ regulation.warnings
  info.appendChild(warning)
  }
  }
})
.catch(err => console.log(err))

}