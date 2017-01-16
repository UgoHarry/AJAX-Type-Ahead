const places = [];

//CALL USING FETCH API AND SAVE DATA TO ARRAY
fetch('https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json')
  .then (response => response.json())
  .then (data => places.push(...data));


//FILTER FUNCTION TO RETRIEVE PLACES MATCHING WITH SEARCH TERM
function findMatches(keyword) {
   return places.filter( (places) => { //FILTER FUNCTION TO RETURN ARRAY ITEMS THAT MATCH WITH KEYWORD
    var regEx = new RegExp(keyword, "gi");
    //console.log(regEx);
    return places.city.match(regEx) || places.state.match(regEx); //RETURN CITIES OR STATES THAT MATCH WITH KEYWORD
  })
}

function displayMatches() {
  //console.log(this.value);
  const matched = findMatches(this.value); // RUN THE FINDMATCH FUNCTION AND PASS VALUE TO THE VARIABLE
  //console.log(matched);
  const listr = matched.map((item) => { // USE MAP FUNCTION ON NEW ARRAY TO ADD ITEMS TO PAGE MARKUP
    return `<li>
              <span class="name">${item.city}, ${item.state}</span>
              <span class="population">${item.population}</span>
            </li>
    `
  }).join(""); // USE JOIN FUNCTION TO CLEAR OUT SPACE AND COMMAS FROM NEW ARRAY PRIOR TO ADDING TO MARKUP
  matchList.innerHTML = listr;
}


const matchList = document.querySelector(".match-list")

// ON CHANGING THE VALUE OR ON TYPING KEY, RUN THE THE DISPLAYMATCH FUNCTION
const searchBox = document.querySelector("#search-box");
searchBox.addEventListener("change", displayMatches);
searchBox.addEventListener("keyup", displayMatches);
