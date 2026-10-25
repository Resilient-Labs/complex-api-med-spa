
document.querySelector('button').addEventListener('click', getCoord);

function getCoord(){

    const city = document.querySelector('.city').value;
    const state = document.querySelector('.state').value;

    const apiOne = `https://nominatim.openstreetmap.org/search?q=${city},${state}&format=json&limit=1`; // https://photon.komoot.io/

    fetch(apiOne)
        .then(res => res.json())
        .then(coord => {
            console.log(coord)          

            const lati = coord[0].lat
            const long = coord[0].lon

            uvIndex(lati, long)
          
        })
        .catch(err => {
            console.log(`error ${err}`)
        })

}

function uvIndex(lati, long){

    const apiTwo = `https://api.open-meteo.com/v1/forecast?latitude=${lati}&longitude=${long}&daily=uv_index_max&timezone=America/New_York&forecast_days=7` // https://open-meteo.com/ 

    fetch(apiTwo)
        .then(res => res.json())
        .then(data => {
            console.log(data)

            const sunIndex = data.daily.uv_index_max[0];

            document.querySelector('.uvIndex').innerHTML = sunIndex;

        })
        .catch(err => {
            console.log(`error ${err}`)
        })
}