document.querySelector('#search-button').addEventListener('click', findFood)

async function findFood() {
    const apiKey = `sk_gCO5emDiCWVeHeBKOyrtgp8GjhYG6eqi`
    const foodQuery = document.querySelector('#food-input').value

    const res = await fetch(
        `https://api.getdietly.com/search?q=${foodQuery}&limit=3`,
        { headers: { Authorization: `Bearer ${apiKey}` } }
    );
    const results = await res.json();
    console.log(results[0]);

    const food = results[0]

    document.querySelector('img').src = results[0].image_url

    const foodInfo = {
        foodName: food.name,
        calories: food.calories_kcal,
        carbs: food.carbs_g,
        fat: food.fat_g,
        fiber: food.fiber_g,
        potassium: food.potassium_mg,
        protein: food.protein_g,
        satFat: food.saturated_fat_g
    }

    // api 2
    const apiKey2 = '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'
    const aiResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${apiKey2}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: 'openrouter/free',
            messages: [
                {
                    role: 'user',
                    content: `Give me nutrition information about ${JSON.stringify(foodInfo)} that would be helpful for maintaining general skin wellness. Provide 3 reasons as to why it's relevant to skin wellness. Avoid medical recommendations. Write all of this in plain text. Style it informationally and make it consumer facing, as it is part of an informational product for med spa patients.`,
                },
            ],
        }),
    });
    const aiData = await aiResponse.json()
    console.log(aiData)

    const recommendation = aiData.choices[0].message.content
    console.log(recommendation)

    const resultsSection = document.createElement('section')

    const foodHeading = document.createElement('h2')
    foodHeading.innerText = food.name

    const calories = document.createElement('p')
    calories.innerText = 'Calories: ' + food.calories_kcal

    const protein = document.createElement('p')
    protein.innerText = 'Protein: ' + food.protein_g + 'g'

    const carbs = document.createElement('p')
    carbs.innerText = 'Carbs: ' + food.carbs_g + 'g'

    const recommendationHeading = document.createElement('h3')
    recommendationHeading.innerText = 'Skin Wellness'

    const recommendationText = document.createElement('p')
    recommendationText.innerText = recommendation

    resultsSection.appendChild(foodHeading)
    resultsSection.appendChild(calories)
    resultsSection.appendChild(protein)
    resultsSection.appendChild(carbs)
    resultsSection.appendChild(recommendationHeading)
    resultsSection.appendChild(recommendationText)

    document.body.appendChild(resultsSection)
}

