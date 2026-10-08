const url = `https://cors.io/?url=https://data.nasa.gov/docs/legacy/gvk9-iz74.json`
fetch(url)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        let vars = JSON.parse(data.body)
        console.log(vars)
        vars.map(element => {
            let center = element.center
            let city = element.city
            let state = element.state
            let latitude = element.location.latitude
            let longitude = element.location.longitude
            // let output = `The ${center} is located in ${city},${state} with a current temperature of`

            weather(center, city, state, latitude, longitude)
        })
    })

function weather(center, city, state, latitude, longitude) {
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=apparent_temperature`)
        .then(res => res.json())
        .then(data => {
            // console.log(data)
            console.log(data.current.apparent_temperature)
            let temp = data.current.apparent_temperature
            console.log(data.current_units.apparent_temperature)
            let tempUnit = data.current_units.apparent_temperature
            let temperature = `${temp} ${tempUnit}`
            console.log(temperature)
            let output = `The ${center} is located in ${city}, ${state} with a current temperature of ${temperature}`
            console.log(output)
            let headyTwo = document.createElement('h2')
            headyTwo.innerText = output
            // let h2 = document.querySelector('h2').innerText
            // h2 = output
            let messi = document.querySelector('section')
            
            messi.appendChild(headyTwo)
        })

}