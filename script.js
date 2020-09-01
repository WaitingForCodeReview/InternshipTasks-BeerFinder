import {searchInput, recentSearchesDiv, searchButton, loadMoreButton, loadMoreDiv, arrowUp} from "./Variables.js";
import {isValidEnter, markAsInvalid, getItemsFetch, clearItemsArray, clearItemsHTML, hideElement, showElement, initializeBeerFull} from "./Functions.js";

let pageCounter = 1;
searchInput.addEventListener('keydown', function inputEnterPressed(event) {
    const searchValue = searchInput.value;
    const code = event.code;

    if (code === 'Enter' && isValidEnter(searchValue)) {
        pageCounter = 1;
        initializeBeerFull(searchValue, pageCounter);
    } else if (code === 'Enter' && !isValidEnter(searchValue)){
        markAsInvalid(searchInput);
    }
})

searchButton.addEventListener('click', function searchClicked() {
    const searchValue = searchInput.value;

    if (isValidEnter(searchValue)) {
        pageCounter = 1;
        initializeBeerFull(searchValue, pageCounter);
    } else {
        markAsInvalid(searchInput);
    }
})

recentSearchesDiv.addEventListener('click', function pClicked(event) {
    const target = event.target;

    if(target.tagName === 'P') {
        searchInput.value = target.innerText;
        pageCounter = 1;
        initializeBeerFull(searchInput.value, pageCounter);
    }
})

loadMoreButton.addEventListener('click', function loadMore() {
    const searchValue = searchInput.value;

    pageCounter++;
    getItemsFetch(searchValue, pageCounter);
})

arrowUp.addEventListener('click', function arrowUpClicked() {
    setTimeout(() => hideElement(arrowUp), 1);
})

window.addEventListener('scroll', function scrolled() {
    showElement(arrowUp);
})
