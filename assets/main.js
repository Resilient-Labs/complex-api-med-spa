//API1: turns zip code into lat and long --> https://api.geocod.io/v2/geocode?api_key=692689a26a2dfffbf3d22a2989d9f222b982b4f&q=18018

//API2: uses lat and long to 
//GOAL: Build a front-end app that is useful for a med spa practice that uses two apis that work with each other. The output for one api should be the input for the second api!

//PROJECT DESCRIPTION: 
//This Air Quality Checker will help med spa staff run a quick check for the daily  air quality of the zipcode they're based in to determine whether or not to suggest to a client that they should reschedule. Outdoor air quality it a lower risk factor for med spas but with wildfires, pollution, and an uptick in skin irritants on the rise  about the dog breed of choice for new pet owners.

//LOGIC BREAKDOWN:
//The user will input their zip code. We will use a click event to fetch the API1 data that turns the zip code into a latitude and longitude. We will call API2 with the latitude and longitude values from API1 to get the Air Quality Index(AQI) information for the area. We'll print the AQI and then share a recmmendation for how to speak with clients about rescheduling if necessary. 

document.querySelector('#submit').addEventListener('click', getCoordAndAQI);

function getCoordAndAQI(){
    const zipCode = document.querySelector('#zipCode').value
    const url1 = `https://api.geocod.io/v2/geocode?api_key=692689a26a2dfffbf3d22a2989d9f222b982b4f&q=${zipCode}`
    
    fetch(url1)
        .then (res => res.json())
        .then (data => {
            console.log(data) //testing url1 works by checking if it prints to the console

            //Below is a test to ensure we're grabbing the correct information from the array of objects that prints in the console when we input a zip code
            // document.querySelector('#lat').innerText = `Latitude is: ${data.results[0].location.lat}`
            // document.querySelector('#long').innerText = `Longitude is: ${data.results[0].location.lng}`

            //Now that the above works, we can comment it out and create a variable for the latitude and longitude that we are going to pass into url2 as well as creating a variable for url2!
            const lat = data.results[0].location.lat
            const long = data.results[0].location.lng

            const url2 = `https://api.waqi.info/feed/geo:${lat};${long}/?token=eb06c6c0b6611fc6ff29bb6a62802115066e53fb`

            fetch(url2)
                .then(res => res.json())
                .then(data2 =>{
                    console.log(data2) //testing to see if url2 works
                    
                    document.querySelector('#airQuality').innerText = `Today's Air Quality Index is: ${data2.data.aqi}`

                    if(data2.data.aqi <= 50){
                        document.querySelector('#level').innerText = "Air pollution level is: Good"
                        document.querySelector('#recs').innerText = "Recommendation: No potential for adverse reaction. Treatments can proceed as scheduled."
                    }else if(data2.data.aqi > 50 && data2.data.aqi <= 100){
                        document.querySelector('#level').innerText = "Air pollution level is: Moderate"
                        document.querySelector('#recs').innerText = "Recommendation: Air quality may only affect individuals who are unusuall sensitive to air pollution. If a client has expressed this sensitivty, send client a note and offer priority rescheduling. Otherwise, treatments can proceed as scheduled."
                    }else if(data2.data.aqi > 100 && data2.data.aqi <= 150){
                        document.querySelector('#level').innerText = "Air pollution level is: Unhealthy for sensitive groups"
                        document.querySelector('#recs').innerText = "Recommendation: Only individuals who have sensitive skin may react. If a client has expressed or been found to have sensitive skin, send client a note and offer priority rescheduling. Otherwis, treatments can proceed as scheduled."
                    }else if(data2.data.aqi > 150 && data2.data.aqi <= 200){
                        document.querySelector('#level').innerText = "Air pollution level is: Unhealthy"
                        document.querySelector('#recs').innerText = "Immediate Action: Individuals may experience negative air pollution health effects including asthma, eye and skin irritation. Send a note to all scheduled clients that rescheduling is highly recommended. If a client has expressed or been found to have sensitive skin, send client a note stating that rescheduling is necessary."
                    }else if(data2.data.aqi > 200 && data2.data.aqi <= 300){
                        document.querySelector('#level').innerText = "Air pollution level is: Very unhealthy"
                        document.querySelector('#recs').innerText = "Immediate Action: Air quality is raised to the level of an emergency. Cancel all client treatments and work to reschedule them. Close office down and allow for remote work until the air quality improves. If necessary to come into the office, take proper precautions."
                    }else{
                        document.querySelector('#level').innerText = "Air pollution level is: Hazardous"
                        document.querySelector('#recs').innerText = "Immediate Action: Air quality is unsafe for ALL individuals. Cancel all client treatments and follow expert advice about when to expect air quality to return to a safer level. Close office down and allow for remote work until the air quality improves."
                    }
                
                })
                .catch(error => {
                    console.log(`error ${error}`)
                })

        })
        .catch(err => {
            console.log(`error ${err}`)
        })

}
