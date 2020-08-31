import {searchInput, recentSearchesDiv, searchButton} from "./Variables.js";
import {isValidEnter, markAsInvalid, getItemsFetch} from "./Functions.js";

searchInput.addEventListener('keydown', function inputEnterPressed(event) {
    const searchValue = searchInput.value;
    const code = event.code;

    if (code === 'Enter' && isValidEnter(searchValue)) {
        getItemsFetch(searchValue)
    } else if (code === 'Enter' && !isValidEnter(searchValue)){
        markAsInvalid(searchInput);
    }
})

searchButton.addEventListener('click', function searchClicked() {
    const searchValue = searchInput.value;

    if (isValidEnter(searchValue)) {
        getItemsFetch(searchValue)
    } else {
        markAsInvalid(searchInput);
    }
})

recentSearchesDiv.addEventListener('click', function pClicked(event) {
    const target = event.target;

    if(target.tagName === 'P') {
        searchInput.value = target.innerText;
    }
})




