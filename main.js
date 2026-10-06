//    Provider Search is now live in NetworkWatch. Search by ZIP, then refine by provider name, specialty, or network to confirm exactly who’s in-network — in seconds, with no API calls or code required.
   document.querySelector('button').addEventListener('click', LookUp)
function LookUp(){
    const inputVal = document.querySelector('input').value
    const url =`https://services.leadconnectorhq.com=ECP1Tf1u8JVO7jLzPqAGU5eGCJY6c3IV`

    fetch(url)
        .then(res => res.json())
        .then((data) => {
            console.log(data)
        })