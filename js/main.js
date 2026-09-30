document.querySelector('button').addEventListener('click', getWeather)

function getWeather(){
    let city = document.querySelector('input').value
    let state = document.querySelector('#state').value
   
    
    emailjs.init("ouboFratIKN_Ifmdc")

    const UV = 6; 

    const url = `https://data.epa.gov/dmapservice/getEnvirofactsUVDAILY/CITY/${city}/STATE/${state}/JSON`


        fetch(url)


        .then(res =>res.json())
        .then(data =>{
            console.log(data)
            document.querySelector('h2').textContent = data[0].CITY; 
           let uv =  document.querySelector('h3').textContent = data[0].UV_INDEX; 
        
        if(uv >= UV){
            sendEmail(data[0].CITY, data[0].UV_INDEX)
            console.log(data[0].UV_INDEX)

            } else {
                document.querySelector('#status').textContent = 'UV is Low, so no email'
            
            }

        })

    
}

function sendEmail(city,uv){
   let email = document.querySelector('#emailInput').value
   if (!email){
        console.log('no email entered')
        return
   }
   
    emailjs.send('service_z2fegnb', 'template_44lz55f',{ 
        to_email: email, 
        message: `UV index in ${city} is ${uv} today, get our physical SPF!`

    })
    .then(res => console.log('Email sent!', res.status))
    .catch(err => console.log('Email failed!', err))
}

