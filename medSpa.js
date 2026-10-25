document.querySelector('#emojiBtn').addEventListener('click',getBooksWithEmoji)

//document.querySelector('#bookBtn').addEventListener('click',getBook)


// function getEmoji(){
//   let emoji = document.querySelector('#emojiInput').value
//   let url = `https://emoji-api.com/emojis?search=${emoji}&access_key=4ea1d1b8f7428e7564d3dcd03d1f6a36e5863d59`
//   fetch(url)
//       .then(res=>res.json())
//       .then(data => {
//         console.log(data)
//         let emote1=data[0].character
//         // let emote2=data[0].character
//         // let emote3=data[0].character
//         // let emote4=data[0].character
//         // let emote5=data[0].character




//         document.querySelector('p').textContent= emote1
//       })
//       .catch(err => {
//         {`error is ${err}`}
//       })

// }


// function getBook(){
//   let book = document.querySelector('#bookInput').value
//   fetch(`https://openlibrary.org/search.json?q=${book}&limit=5`,{
// method:'GET',
// headers:{
//   'Accept':'application/json'
// }
// })
//     .then(res => res.json())
//     .then(data => {
//       console.log(data)
//     })

//     .catch(err => {
//       {`error is ${err}`}
//     })
//   }


  function getBooksWithEmoji(){
    //let emoji = document.querySelector('#emojiInput').value
   let emoji= document.querySelector('select[name = emojiInput]').value
    let url = `https://emoji-api.com/emojis?search=${emoji}&access_key=4ea1d1b8f7428e7564d3dcd03d1f6a36e5863d59`
    let results = document.querySelector('#placeHere')

    //checks if emoji is an empty string
    if(!emoji) return

    //search emoji api

    fetch(url)
    .then(res=> res.json())
    .then(data => {
      //checks for undefined or empty array
      if (!data || data.length === 0){
        results.innerHtml = 'no emoji match';
        return;
    }
    // grabs slug property and splits the string into an array of words
    let slug = data[0].slug.split('-');
    //selects words keywords from the array
    let word = slug.length > 1 ? slug[1] : slug[0];

    //takes the last word from the unicode name 
    if(!word || !isNaN(word) || word.length < 2){
      word = data[0].unicodeName ? data[0].unicodeName.split(' ').pop(): 'book'
    }


    fetch(`https://openlibrary.org/search.json?q=${word}&limit=5`)
    .then(res=> res.json())
    .then(data => {
      console.log(data)
      console.log('Books for you:',data.docs)
      showBooks(data.docs,emoji)
    })

    .catch(err => {
      console.log(`error is ${err}`)
    });

  })

  
      
    
  }

  function showBooks(books,theEmoji){
    let results = document.querySelector('#placeHere');

    if (!books || books.length === 0){
      results.innerHTML = '<p>no book found</p>'
      return
    }
  
    results.innerHTML = `<h2> Books for you${theEmoji}</h2>` +
    //gives books title
    books.map(book => 
        `<h3> ${book.title} <br> by ${book['author_name']} </h3>`



  ).join('')
}
