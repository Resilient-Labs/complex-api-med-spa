document.querySelector('button').addEventListener('click', lookUpFact)

const makeupbrand = document.querySelector('input').value 
function lookUpFact(){
    
    const productName = document.querySelector('input').value 
    const url = `https://world.openbeautyfacts.org/cgi/search.pl?search_terms=${productName}&json=1`

    fetch(url)
        .then ( res => res.json())
        .then ( data => {
            console.log(data)  
            console.log(data.products[0].ingredients_text_en)
            document.querySelector('img').src = data.products[0].image_front_small_url
            document.querySelector('.ingredients').textContent = data.products[0].ingredients_text_en

              //const productIngredient = data.products[0].ingredients_text_en[3]
              const code = data.products[0].code
              const url2 = `https://inciapi.com/v1/products/${code}/safety`
              //const url2 = `https://cors.io/?url=https://api.bdapi.app/api/public/cosing/search?q=${productIngredient}`
              
              fetch(url2,{
                    method:'GET',
                    headers:{
                    'x-api-key': apiKey

                    }
                    })
                    .then ( res => res.json())
                    .then (data => {
                        console.log(data)
                        console.log(data.safety.cleanBeautyScore)
                        document.querySelector('.cleanBeautyLevel').textContent = data.safety.cleanBeautyScore

                        //const dataFormat =  JSON.parse(data.body)
                        //console.log(dataFormat)
                    
                        
                    })   
                

        })
    .catch( err => {
        console.log( `error ${err}`)
    });

}