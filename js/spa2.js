
document.querySelector('button').addEventListener('click', medSpa2)


function medSpa2() {
    const inputValTwo = document.querySelector('#two').value

    const key = '2836ee4985e64d9fb875661404e88ee9'

    const year = parseInt(inputValTwo);
    const url = `https://api.bigbookapi.com/search-books?api-key=${key}&earliest-publish-year=${year - 1}&latest-publish-year=${year + 1}&number=5`

    console.log("INPUT:", inputValTwo)
    console.log("URL:", url)

    fetch(url)
        .then(res => res.json())
        .then((data) => {
            console.log(data)
        })
        .catch(err => {
            console.log(`error ${err}`)
        })
}

//example:  api-key and query: https://api.bigbookapi.com/search-books?api-key=YOUR-API-KEY&query=romance.