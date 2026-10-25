document.querySelector("button").addEventListener("click", searchCity)

function searchCity(){
    const zipCode=document.querySelector("input").value.toLowerCase()

    const zipUrl=`https://api.zippopotam.us/us/${zipCode}`;

    fetch(zipUrl)
    .then(res => res.json())
    .then(data => {
        
        console.log(data)

        document.querySelector('h2').textContent="City: "+data.places[0]["place name"]; //Data with a space needs square brackets and quotes

        const latitude=data.places[0].latitude;
        const longitude=data.places[0].longitude;

        const forecastUrl=`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=uv_index_max&current=relative_humidity_2m`;

        fetch(forecastUrl)
        .then(res => res.json())
        .then(info => {
        
        console.log(info)

        const uv=info.daily.uv_index_max[0]
        const humidity=info.current.relative_humidity_2m

        document.querySelector(".uv").textContent="UV Index: "+uv
        document.querySelector(".humidity").textContent="Humidity: "+humidity+"%"

        //Googled all the tips for the high risk and low risk: uv index and humidity percentage.

        if(uv>=6){
            document.querySelector(".uvTip").textContent="High UV: You must generously apply a broad-spectrum mineral sunscreen of SPF 30 or higher, wear protective clothing and a wide-brimmed hat, and strictly stay in the shade."
        }
        else{
            document.querySelector(".uvTip").textContent="Low UV: Apply a gentle, fragrance-free moisturizer followed by a broad-spectrum mineral sunscreen of at least SPF 30 before heading outside."
        }
3
        if(humidity<30){
            document.querySelector(".humidityTip").textContent="Apply a gentle, barrier-repairing moisturizer followed by a broad-spectrum mineral sunscreen."
        }
        else{
            document.querySelector(".humidityTip").textContent="Apply a lightweight, non-comedogenic moisturizer and a broad-spectrum sunscreen."
        }
        })
        
    .catch(err => {
        console.log(`error ${err}`)
    })
    })
}