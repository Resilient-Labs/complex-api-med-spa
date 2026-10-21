/////////////////////////////////////////
/**PsuedoCode 
 * What i want to happen and what this app should do 
 * this is a medspa app that is supposed to help the staff determine what self reported conditions the potential customer has. the app is supposed to help the staff suggest a treatment plan for the client. 
 * 
 * what the app should do technically
 * 
 * the user should submit the form 
 * when the user submits the form, what should happen next? 
 * the browser should not refresh the page 
 * it should be connected to the dom or something to help it read what the user wrote in the input field 
 * it should remove formatting form the text that the user entered (in case they entered spaces, etc. 
 * it should account for if the user did not enter anything at all
 * there should be a loading message so the user knows that something is happening while they wait 
 *it should send the text inputted by the user to the Clinical Tables API 
 * There should be an error message if the first API message fails 
 * the first API response should be convered 
 * then it should find the condition that matched the users entry
 * it should get the name of the condition and then the code 
 * 
 * what about if there is no condition? 
 * there should be an error then 
 * 
 * the FDA API is the second one btw
 * the second API should get the actual product informatino what it does and any warnings that are attached to tit so the doctor/staff member can be aware of any side effectrs
 */ 
//////////////////////////////////////////


//selects the form
const form = document.querySelector('#skinConcernsForm')
//selects input
const input = document.querySelector('#inputForUserConcerns')
//selects the status message
const statusMessage = document.querySelector('#status-message')

//selects the results portion 
const results = document.querySelector('#results')

const conditionNameResult = document.querySelector('#conditionNameResult') 

const icd10Result = document.querySelector('#icd10Result')

//my FDA selectors and their console.logs

const fdaBrandResult = document.querySelector('#fdaBrandResult')
console.log(fdaBrandResult)

const fdaPurposeResult = document.querySelector('#fdaPurposeResult')
console.log(fdaPurposeResult)

const fdaWarningsResult = document.querySelector('#fdaWarningsResult')
console.log(fdaWarningsResult)

 const serviceRecommendationResult = document.querySelector('#serviceRecommendationResult')


console.log(form)
console.log(input)
console.log(statusMessage)
console.log(results)

form.addEventListener('submit', handleFormSubmit)

function getServiceRecommendation (icd10Code){
    if (icd10Code.startsWith("L70")) {
        return "Consider scheduling an acne-focused consultation with a qualified professional."
    }

    if (icd10Code.startsWith("L71")){
        return "Consider scheduling a sensitive skin consultation with a qualified professional."
    }

    return "Consider scheduling a professional consultation to discuss appropriate options."
}




function handleFormSubmit(event){
    event.preventDefault()

    //removing any whitespaces before or after the strings that the user enters 
    const userConcern = input.value.trim().toLowerCase()

    //tested this part in the browser, it works 
    if (userConcern === ""){
        statusMessage.textContent = "Please enter your skin concern. Do not leave this field blank."
        return
    }

    conditionNameResult.textContent = ""
    icd10Result.textContent = ""
    serviceRecommendationResult.textContent = ""
    fdaBrandResult.textContent = ""
    fdaPurposeResult.textContent = ""
    fdaWarningsResult.textContent = ""



    const clinicalTablesUrl = "https://clinicaltables.nlm.nih.gov/api/conditions/v3/search"

    const parametersWeAreSearchingFor = new URLSearchParams()

    parametersWeAreSearchingFor.append("terms", userConcern)
    parametersWeAreSearchingFor.append("maxList", "5")
    parametersWeAreSearchingFor.append("df", "consumer_name")
    parametersWeAreSearchingFor.append("ef", "icd10cm,primary_name")

    const requestUrl = `${clinicalTablesUrl}?${parametersWeAreSearchingFor}`
    console.log(requestUrl)

    results.hidden = true
    statusMessage.textContent = "Searching..."

    //first fetch
    fetch(requestUrl)
    .then(res => {
        if (!res.ok) {
            throw new Error("Clinical Tables request failed.")
        }
        return res.json()
    })

    .then(data => {

        if(data[0] === 0) {
            statusMessage.textContent = "A matching condition could not be found."
            return
        }

        results.hidden = false

        //console.log everything 
        console.log(data)
        console.log("Number of the results:", data[0])
        console.log("Matching names:", data[3])
        console.log("The ICD-10 data:", data[2].icd10cm)

        //when it goes according to plan, this runs 
        const conditionName = data[3][0][0]
        console.log("Condition name:", conditionName)

        const icd10Code = data[2].icd10cm[0][0].code
        console.log("The ICD-10-CM code:", icd10Code)

        const serviceRecommendation = getServiceRecommendation(icd10Code)

        serviceRecommendationResult.textContent = serviceRecommendation

        conditionNameResult.textContent = `Possible concern: ${conditionName}`
        icd10Result.textContent = `ICD-10-CM code: ${icd10Code}`

        const fdaUrl = "https://api.fda.gov/drug/label.json"

        const fdaParameters = new URLSearchParams()

        fdaParameters.append("search", `indications_and_usage:${conditionName}`)
        fdaParameters.append("limit", "5")

        const fdaRequestUrl = `${fdaUrl}?${fdaParameters}`
        console.log("FDA request URL:", fdaRequestUrl)

        statusMessage.textContent = "Searching for FDA information..."//hashtag SHADE

       // statusMessage.textContent = "Information found."

       //second fetch 
        fetch(fdaRequestUrl)
        .then(fdaResponse => {
            if (!fdaResponse.ok) {
                throw new Error("FDA request failed.")
            }
            return fdaResponse.json()
        })

        .then(fdaData => {
            console.log("FDA response:", fdaData)
            const fdaResults = fdaData.results || []
            
            if (fdaResults.length === 0){ //Leon always says it is better to be strict.
                fdaBrandResult.textContent = "Unable to find information for the FDA product label."
                fdaPurposeResult.textContent = ""
                fdaWarningsResult.textContent = ""
                statusMessage.textContent = "Information on the condition was found but there was no FDA label information available."
                return 
            }

            const firstFDAResult = fdaResults[0]

            const brandName = firstFDAResult.openfda?.brand_name?.[0] || "The brand name was not provided."

            const purpose = firstFDAResult.purpose?.[0] || "Purpose info was not provided/available."

            const warnings = firstFDAResult.warnings?.[0] || "No warnings were provided/available."

            fdaBrandResult.textContent = `Brand: ${brandName}`
            fdaPurposeResult.textContent = `Purpose: ${purpose}`
            fdaWarningsResult.textContent = `Warning(s): ${warnings}`

            statusMessage.textContent = "Information found."
        })

        .catch(fdaError => {
             console.log(`FDA error: ${fdaError}`)

             fdaBrandResult.textContent = "Could not find any FDA information."
             fdaPurposeResult.textContent = ""
             fdaWarningsResult.textContent = ""

             statusMessage.textContent = "Found information for the Condition but unable to retrieve any FDA information."
            
        })
    }) 

    .catch(err => {
        console.log(`Error: ${err}`)
        statusMessage.textContent = "Information for the condition you entered, could not be retrieved."
    })

    console.log("The form was successfully submitted.")
    console.log(userConcern)
}

