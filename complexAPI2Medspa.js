const calendarAPI =
    "https://calendarific.com/api/v2/holidays?api_key=r1rhwtaVvgOZgPXawGDi2j6ISKw8V7af&country=US&year=2026"

document.getElementById("holidayButton").onclick = function(){
    let holiday =
        document.getElementById("holidayInput").value;

    fetch(calendarAPI)
        .then(response => response.json())
        .then(data => {
      let found = false;
        for (let item of data.response.holidays) {
         if (item.name == holiday) {
            document.getElementById("holidayName").innerHTML =item.name
            document.getElementById("holidayDate").innerHTML =item.date.iso
            document.getElementById("offer").innerHTML ="30% Off Your Next Service!"
            found = true;
            }
            }

            if (found == false) {
            document.getElementById("promotion").innerHTML ="No promotion found"
        }
    });
};


document.getElementById("verifyButton").onclick = function() {
    let email = document.getElementById("email").value

    let emailAPI ="https://apilayer.net/api/check?access_key=2a7944bc9ad1b09921e3956c0c83cb6e&email=" + email

    fetch(emailAPI)
        .then(response => response.json())
        .then(data => {

            if (data.format_valid == true) {
            document.getElementById("result").innerHTML ="Email verified. Promotion above claimed!"
            } else {
            document.getElementById("result").innerHTML ="Invalid email."
        }
    });
};