import {searchInput, recentSearchesDiv, searchButton, loadMoreButton, arrowUp, beerItemsElem, favouritesButton} from "./Variables.js";
import {isValidEnter, markAsInvalid, getItemsFetch, hideElement, showElement, initializeBeerFull, showModalFavourites, removeFavourites, changeStyleRemoveFavourites, showModalItem} from "./Functions.js";
import {changeRemove, addItemToFavourites, initializeDefaultLocalStorage} from "./Functions.js";

let pageCounter = 1;

initializeDefaultLocalStorage();

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

    if (target.tagName === 'P') {
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

beerItemsElem.addEventListener('click', function addButtonClicked(event) {
    const target = event.target;

    if (target.classList.contains('addBtn') || target.classList.contains('removeBtn')) { // if button clicked
        const itemClicked = Object.foundBeers["beerArray"].find( item => item.buttonAddRemoveId === target.id);

        if (!itemClicked.isFavourite) {
            addItemToFavourites(itemClicked);
            changeRemove(target);
        } else {
            removeFavourites(itemClicked, target);
            changeStyleRemoveFavourites(target);
        }
    } else if (target.nodeName === 'H2') {  // if item-title clicked
        showModalItem(target);
    }
})

favouritesButton.addEventListener('click', function favouritesClicked() {
    showModalFavourites();
})

document.addEventListener('keydown', function escPressed(event) {
    if(event.code === 'Escape') {
        try {
            hideElement(document.getElementById('shadowModal'));
            document.getElementById('modalContent').innerHTML = "";
        } catch (e) { }
    }
})