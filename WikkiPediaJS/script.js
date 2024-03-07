let searchInputEl = document.getElementById("searchInput");
let searchResultEl = document.getElementById("searchResults");
let spinnerEl= document.getElementById("spinner");

searchInputEl.addEventListener("keydown", searchWikipedia);

function createAndAppendSearchResults(result) {
    //Creating result Item 
    let resultItemEl = document.createElement("div");
    resultItemEl.classList.add("result-item");
    searchInputEl.appendChild(resultItemEl);

    //Creating Title Element 
    let {
        link,
        title,
        description
    } = result;
    let resultTitleEl = document.createElement("a");
    resultTitleEl.href = link;
    resultTitleEl.target = "_blank";
    resultTitleEl.textContent = title;
    resultTitleEl.classList.add("result-title");
    resultItemEl.appendChild(resultTitleEl);

    //Creating Break Element 
    let titleBreakEl = document.createElement("br");
    resultItemEl.appendChild(titleBreakEl);

    //Creating URL Element 
    let urlEl = document.createElement("a");
    urlEl.href = link;
    urlEl.target = "_blank";
    urlEl.textContent = link;
    urlEl.classList.add("result-url");
    resultItemEl.appendChild(urlEl);

    //Creating Break Element 
    let lineBreakEl = document.createElement("br");
    resultItemEl.appendChild(lineBreakEl);

    //Creating Description Element
    let descriptionEl = document.createElement("p");
    descriptionEl.textContent = description;
    descriptionEl.classList.add("link-description");
    resultItemEl.appendChild(descriptionEl);

    searchResultEl.appendChild(resultItemEl);
}

function displayResults(searchResults) {
    for (let result of searchResults) {
        spinnerEl.classList.add("d-none");   //Hide
        createAndAppendSearchResults(result);
    }
}

function searchWikipedia(event) {
    if (event.key === 'Enter') {
        searchResultEl.textContent= "";
        spinnerEl.classList.remove("d-none");  //Add
        let searchInput = searchInputEl.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;
        let options = {
            method: "GET"
        };
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displayResults(search_results)
            });
    }
}