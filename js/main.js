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

console.log(form)
console.log(input)
console.log(statusMessage)
console.log(results)

form.addEventListener('submit', handleFormSubmit)

function handleFormSubmit(event){
    event.preventDefault()

    //removing any whitespaces before or after the strings that the user enters 
    const userConcern = input.value.trim().toLowerCase()

    //tested this part in the browser, it works 
    if (userConcern === ""){
        statusMessage.textContent = "Please enter your skin concern. Do not leave this field blank."
        return
    }

    console.log("The form was successfully submitted.")
    console.log(userConcern)
}

