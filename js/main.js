document.querySelector('button').addEventListener('click', zipcodeSearch);

function zipcodeSearch() {
    const zipcode = document.querySelector('input').value;

    fetch(`https://api.zippopotam.us/us/${zipcode}`)
        .then(response => response.json())
        .then((data) => {
            console.log(data);
            console.log(data.places);
            /*console.log(data.places[0].latitude)*/

            const currentLat = data.places[0].latitude;
            const currentLong = data.places[0].longitude;
            const urlTwo = `https://currentuvindex.com/api/v1/uvi?latitude=${currentLat}&longitude=${currentLong}`;

            return fetch(urlTwo);
        })
        .then(response => response.json())
        .then((data) => {

            console.log(data);
            const uvIndex = data.now.uvi

            if(uvIndex <= 2){
                document.getElementById("recommendations").innerText = "UV index is low. When the UV index is low, the best medspa services to recieve are treatments that carry higher risk of hyperpigmentation, burns, or scarring when exposed to strong sunlight."
                document.getElementById("title").innerText = "List of Recommended Treatments"
                const item = document.createElement('li')
                item.innerHTML = "<li>Laser Treaments</li>" +
                "<li>Deep Chemical Peels</li>" +
                "<li>Intense Light Therapy</li>"
                document.querySelector('ul').appendChild(item)
            }
            else if (uvIndex <= 5) {
                document.getElementById("recommendations").innerText = "UV index is moderate. When is the UV index is moderate, the best medspa services to receive are treatments that require mild sun protection."
                document.getElementById("title").innerText = "List of Recommended Treatments"
                const item = document.createElement('li')
                item.innerHTML = "<li>Dermaplanning</li>" +
                "<li>Light Chemical Peels</li>" +
                "<li>Microneedling</li>" +
                "<li>HydroFacials</li>" +
                "<li>Comestice Injectables</li>"
                document.querySelector('ul').appendChild(item)

                
            }
            else if (uvIndex >= 6){
                document.getElementById("recommendations").innerText = "UV index is high. When the UV index is high, the best medspa services to recieve are treatments that do not compromise the outer protective layer of your skin or increase light-sensitive."
                document.getElementById("title").innerText = "List of Recommended Treatments"
                const item = document.createElement('li')
                item.innerHTML = "<li>Hydrating & Exfoliating Facials/li>" +
                "<li>Injectables</li>" +
                "<li>Microneedling</li>" +
                "<li>Dermaplanning</li>" +
                "<li>Non-Invasive Body Conturing</li>"
                 document.querySelector('ul').appendChild(item)

            }


            document.querySelector("span").innerText = "UV Index: " + uvIndex
            
        })
        .catch((error) => {
            console.log(error);
        });
}

