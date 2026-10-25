document.querySelector('#check').addEventListener('click', getAftercare)

function getAftercare() {

    const city = document.querySelector('#cityInput').value
    const treatment = document.querySelector('#treatment').value

    const geoUrl =
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`

    fetch(geoUrl)
    .then(response => response.json())
    .then(data => {

        console.log('Location data:', data)

        const latitude = data.results[0].latitude
        const longitude = data.results[0].longitude
        const cityName = data.results[0].name

        document.querySelector('#cityName').innerText = cityName
        document.querySelector('#treatmentTitle').innerText = treatment

        const uvUrl =
            `https://api.openuv.io/api/v1/uv?lat=${latitude}&lng=${longitude}`

        return fetch(uvUrl, {
            headers: {
                'x-access-token': 'openuv-9gis2ihrmuhs9bz1-io'
            }
        })

    })
    .then(response => response.json())
    .then(data => {

        console.log('OpenUV data:', data)

        const uv = data.result.uv_max

        document.querySelector('#uv').innerText = uv

        if (uv <= 2) {

            document.querySelector('#risk').innerText = 'Low'

            document.querySelector('#advice').innerText =
                'UV exposure is low today. Continue following your normal aftercare instructions.'

        } else if (uv <= 5) {

            document.querySelector('#risk').innerText = 'Moderate'

            document.querySelector('#advice').innerText =
                'UV exposure is moderate. Use sun protection and avoid unnecessary direct sun after treatment.'

        } else if (uv <= 7) {

            document.querySelector('#risk').innerText = 'High'

            document.querySelector('#advice').innerText =
                'UV levels are high today. Limit direct sun exposure and protect recently treated skin.'

        } else {

            document.querySelector('#risk').innerText = 'Very High'

            document.querySelector('#advice').innerText =
                'UV levels are very high today. Take extra sun precautions after your med spa treatment.'
        }

    })
    .catch(error => {
        console.log(error)
    })
}