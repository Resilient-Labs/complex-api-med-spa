// Goal: Build a simple front-end app that uses data returned from one api to make a request to another api to create something that would be beneficial to a Med Spa.
// FLOW: user seraches ingredient --> CosIng API --> Find exact ingredient --> pass CosIng data into prompt --> OpenRouter receives it --> SkinSplain AI explains + display results on page

document.querySelector('button').addEventListener('click', getIngredients)

function getIngredients(){
    const ingredient = document.querySelector('input').value

    const url = `https://cosingchecker.com/api/v1/ingredients/?q=${ingredient}`

    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data)

            // Looking through the results array to find the item whose inci_name matches what the user typed
            // - item.inci_name && means only compare if the result has an inci_name
            const selectedIngredient = data.results.find(item =>
                item.inci_name && item.inci_name.toLowerCase() === ingredient.toLowerCase()
            )

            console.log(selectedIngredient)

            if(selectedIngredient){
                askOpenRouter(selectedIngredient, ingredient)
            }else{
                document.querySelector('#results').innerHTML = 
                `<p>Ingredient not found. Try another search.</p>`
            }
        })

        .catch(err => {
            console.log(`error ${err}`)
        })
}

function askOpenRouter(selectedIngredient, ingredient){
    const apiKey = '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'

    // console.log(apiKey.startsWith('sk-or-v1'))
    // console.log(apiKey.length)

    const prompt = `
    Explain this cosmetic ingredient in simple language for a med spa client.

    Ingredient searched: ${ingredient}
    INCI name: ${selectedIngredient.inci_name}
    Description: ${selectedIngredient.description}
    Function: ${selectedIngredient.function}

    Briefly explain:
    1. What the ingredient is
    2. What it does in skincare
    3. Why someone might use it
    4.One simple caution or consideration

    Keep the explanation concise and easy for a non-expert to understand.
    Do not use Markdown, asterisks, or special formatting.
    `

    fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'openrouter/free',
            messages: [
                {
                    role: 'user',
                    content: prompt
                }
            ]
        })
    })

    .then(res => res.json())
    .then(aiData => {
        console.log(aiData)

        const explanation = aiData.choices[0].message.content

        document.querySelector('#results').innerHTML = `

        <h2>${selectedIngredient.inci_name}</h2>

        <p><strong>CosIng Description:</strong>
        ${selectedIngredient.description || 'No description available.'}</p>

        <p><strong>Cosmetic Function:</strong>
        ${selectedIngredient.function || 'No function listed.'}</p>

        <h3>SkinSplain AI</h3>

        <p>${explanation}</p>
        `
    })

    .catch(err => {
        console.log(`error ${err}`)
    })
}