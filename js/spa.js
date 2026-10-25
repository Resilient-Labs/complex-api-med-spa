
document.querySelector('button').addEventListener('click', medSpa)



//////////////////////
// API 1 Artists API
//////////////////////
function medSpa() {
    const inputValOne = document.querySelector('#one').value

    const url = `https://www.theaudiodb.com/api/v1/json/123/search.php?s=${inputValOne}
`

    console.log("INPUT:", inputValOne)
    console.log("URL:", url)

    fetch(url)
        .then(res => res.json())
        .then((data) => {
            console.log(data)

            //////////////////////
            // DISPLAY API 1 RESULTS
            //////////////////////
            document.querySelector('#name').innerText = data.artists[0].strArtist
            document.querySelector('#dob').innerText = data.artists[0].intBornYear


            //////////////////////
            // GET INFO FOR API 2
            //////////////////////
            const publish = data.artists[0].intBornYear

            console.log('DOB:', publish)

            // Call API 2 from inside API 1
            medSpa2(publish)

        })
        .catch(err => {
            console.log(`error ${err}`)
        })
}


//////////////////////
// API 2 - COUNTRIES
//////////////////////

function medSpa2(publish) {
    console.log('Published from API 1:', publish)

    const key = '2836ee4985e64d9fb875661404e88ee9'

    const year = parseInt(publish);
    const url = `https://api.bigbookapi.com/search-books?api-key=${key}&earliest-publish-year=${year - 1}&latest-publish-year=${year + 1}&number=5`

    fetch(url)
        .then(res => res.json())
        .then((data) => {
            console.log('API 2 DATA:', data)
            const publishDate = data;
            console.log('PDATE:', publishDate)

            /// Book 0 = Card Zero
            document.querySelector('#title0').innerText = data.books[0][0].title;
            document.querySelector('#publishDate0').innerText = data.books[0][0].publish_date;
            document.querySelector('#image0').src = data.books[0][0].image;
            document.querySelector('#author0').innerText = data.books[0][0].authors[0].name;

            /// Book 1 = Card One
            document.querySelector('#title1').innerText = data.books[1][0].title;
            document.querySelector('#publishDate1').innerText = data.books[1][0].publish_date;
            document.querySelector('#image1').src = data.books[1][0].image;
            document.querySelector('#author1').innerText = data.books[1][0].authors[0].name;

            /// Book 2 = Card Two
            document.querySelector('#title2').innerText = data.books[2][0].title;
            document.querySelector('#publishDate2').innerText = data.books[2][0].publish_date;
            document.querySelector('#image2').src = data.books[2][0].image;
            document.querySelector('#author2').innerText = data.books[2][0].authors[0].name;

            /// Book 3 = Card Three
            document.querySelector('#title3').innerText = data.books[3][0].title;
            document.querySelector('#publishDate3').innerText = data.books[3][0].publish_date;
            document.querySelector('#image3').src = data.books[3][0].image;
            document.querySelector('#author3').innerText = data.books[3][0].authors[0].name;

            /// Book 4 = Card Four
            document.querySelector('#title4').innerText = data.books[4][0].title;
            document.querySelector('#publishDate4').innerText = data.books[4][0].publish_date;
            document.querySelector('#image4').src = data.books[4][0].image;
            document.querySelector('#author4').innerText = data.books[4][0].authors[0].name;


        })
        .catch(err => {
            console.log(`error ${err}`)
        })
}



// AudioDB - https://www.theaudiodb.com/free_music_api?ref=freepublicapis.com?ref=freepublicapis.com#base_url