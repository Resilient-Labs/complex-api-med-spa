

//const url = 'https://dailymed.nlm.nih.gov/dailymed/services/v2'

document.querySelector('.treatmentInfo').addEventListener('click', getTreatmentInfo)

function getTreatmentInfo() {

    let treatmentEntered = document.querySelector('input').value

    fetch(`https://dailymed.nlm.nih.gov/dailymed/services/v2/drugnames.json?drug_name=${treatmentEntered}&pagesize=25&page=1`)
        .then(res => res.json()) // parse response as JSON
        .then(data => {
            console.log(data)

            let Injection = data.data[0].drug_name


            fetch(`https://api.fda.gov/drug/label.json?search=openfda.brand_name:${Injection}&limit=1`)
                .then(res => res.json()) // parse response as JSON
                .then(data => {
                    console.log(data)
                    document.querySelector('.brandName').innerText = data.results[0].openfda.brand_name
                    document.querySelector('.genericName').innerText = data.results[0].openfda.generic_name
                    document.querySelector('.manufacturer').innerText = data.results[0].openfda.manufacturer_name
                    document.querySelector('.route').innerText = data.results[0].openfda.route
                    document.querySelector('.purpose').innerText = data.results[0].indications_and_usage
                    document.querySelector('.dosage').innerText = data.results[0].dosage_forms_and_strengths

                    document.querySelector('.pregnacy').innerText = data.results[0].pregnacy
                    document.querySelector('.warnings').innerText = data.results[0].warnings_and_cautions





                })



        })

        .catch(err => {
            console.log(`error ${err}`)

        })

}




// base url ? apikey & search = fieldterm" variable "& limit (openfda)
/* search=openfda.brand_name:"FOO+BAR"
Searches for records where either FOO or BAR appear anywhere in this field.*/