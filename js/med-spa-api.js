console.log('Med Spa')
// GOAL use the supplement API to get ingredients and food with that compound in it
// API UV Index - https://currentuvindex.com/api/v1/uvi?latitude=40.6943&longitude=-73.9249
// Secondary API - https://currentuvindex.com/api?ref=freepublicapis.com
// By the index determine if patients can get a skin treatment or not
// Desired API - https://verifiedsupplementdata.com/api/v1/recommend/{supplement}/all.json

// `https://api.geocod.io/v2/geocode?api_key=ad26dd29ad9fba7ef761c1fbd11173132d36db9&q=${zipCode}`
// KEY - ad26dd29ad9fba7ef761c1fbd11173132d36db9
document.querySelector('button').addEventListener('click', getCity)

function getCity() {
    const zipCode = document.querySelector("#cityInput").value

    fetch(`https://api.geocod.io/v2/geocode?api_key=ad26dd29ad9fba7ef761c1fbd11173132d36db9&q=${zipCode}`)
        .then(res => res.json())
        .then((data) => {
            console.log(data)

            let latt = data.results[0].location.lat
            let lon = data.results[0].location.lng


            fetch(`https://currentuvindex.com/api/v1/uvi?latitude=${latt}&longitude=${lon}`)
                .then(res => res.json())
                .then((protection) => {
                    console.log(protection)

                    let uv = protection.now.uvi

                    if (uv <= 2) {
                        document.querySelector('#placeToSee').innerText = "No protection needed. You can safely stay outside using minimal sun protection. Feel free to schedule any appointment"
                        document.querySelector('#uv').innerText = `UV Index is currently ${uv}`;
                        document.querySelector('#uvImg').innerHTML = '<img src ="images/uvGreen.png" alt="green uv range">';
                    } else if (uv <= 7) {
                        document.querySelector('#placeToSee').innerText = "Protection needed. It's recommended to not schedule an evening skin treatment. Risk of reaction moderate."
                        document.querySelector('#uv').innerText = `UV Index is currently ${uv}`
                        document.querySelector('#uvImg').innerHTML = '<img src ="images/uvYellow.png" alt="yellow uv range">';

                    } else if (uv <= 10) {
                        document.querySelector('#placeToSee').innerText = "Extra protection needed. It's recommended to not schedule an evening skin treatment. Risk of reaction is very high. Be careful outside, especially during late morning through mid-afternoon."
                        document.querySelector('#uv').innerText = `UV Index is currently ${uv}`
                        document.querySelector('#uvImg').innerHTML = '<img src ="images/uvRed.png" alt="red uv range">';


                    }
                })
        })
}