let results = document.getElementById('results')

let pause_ingredients = ['Retinol', 'Retinyl palmitate', 'Glycolic acid', 'Salicylic acid', 'Lactic acid', 'Benzoyl peroxide']

document.querySelector('button').addEventListener('click', find_ingredients)


function find_ingredients() {
    // clear the screen is anything is on there from the previous query
    document.querySelector('h2').innerHTML = ''
    document.querySelector('#key_ingredient').innerHTML = ''
    document.querySelector('#ingredient_details').innerHTML = ''

    let product = document.querySelector('input').value
    product_query = product.replaceAll(" ", "+")
    console.log(product_query)

    fetch(`https://world.openbeautyfacts.org/cgi/search.pl?search_terms=${product_query}&search_simple=1&json=1&page_size=1&fields=product_name,ingredients_text`)
        .then(res => res.json())
        .then(ingredients => {
            console.log(ingredients)
            if (ingredients.products.length === 0) {
                document.querySelector('h2').innerHTML = `Sorry we could not find ${product}. Try checking the spelling or typing the full product name.`
                return
            }

            let i_list = ingredients.products[0].ingredients_text
            let product_name = ingredients.products[0].product_name
            console.log(i_list)

            //if no ingredients found in the database, say none listed yet
            if (!i_list) {
                document.querySelector('h2').innerHTML = `${product} has no ingredient list as of yet. Please ask your provider`
                return
            }

            let found_ingredients = []
            for (let i = 0; i < pause_ingredients.length; i++){
                if (i_list.toLowerCase().includes(pause_ingredients[i].toLowerCase())) {
                    console.log(pause_ingredients[i])
                    found_ingredients.push(pause_ingredients[i])
                }
            }

            if (found_ingredients.length === 0) {
                document.querySelector('h2').innerHTML = `${product} has no ingredients that should cause you to stop using it before your session.`
                return
            }
            
            // results.innerText = ''

            console.log(found_ingredients)
            document.querySelector('h2').innerHTML = `Product Name: ${product_name}`
            document.querySelector('#key_ingredient').innerHTML = `Key Reason to stop: ${found_ingredients.join(', ')}`
            

            fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${found_ingredients[0]}`)
                .then(res => res.json())
                .then(info => {
                    console.log(info)
                    //log the info for the ingredient
                    //take out the name and information from the wiki page.
                    let name = info.title
                    let ingredient_info = info.extract
                    console.log(name)
                    console.log(ingredient_info)

                    document.querySelector('#ingredient_details').innerHTML = `${ingredient_info}`

        })
        }
        )

    
}