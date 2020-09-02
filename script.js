import {searchInput, recentSearchesDiv, searchButton, loadMoreButton, arrowUp, beerItemsElem, favouriteCounterDiv, BUTTON_ITEM_STYLES} from "./Variables.js";
import {isValidEnter, markAsInvalid, getItemsFetch, hideElement, showElement, initializeBeerFull} from "./Functions.js";

let pageCounter = 1;
export let favourites = [];

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

beerItemsElem.addEventListener('click', function addButtonClicked(event) {
    const target = event.target;

    if(target.classList.contains('addBtn') || target.classList.contains('removeBtn')) {
        const itemClicked = Object.foundBeers["beerArray"].find( item => item.buttonAddRemoveId === target.id);
        if(!itemClicked.isFavourite) {
            itemClicked.changeFavouriteStatus();

            favourites.push(itemClicked);
            favouriteCounterDiv.innerHTML = `<p>${favourites.length}</p>`

            target.style.background = 'red';
            target.innerText = 'Remove';
        } else {
            favourites = favourites.filter(item => item.buttonAddRemoveId !== target.id);
            itemClicked.changeFavouriteStatus();
            favouriteCounterDiv.innerHTML = `<p>${favourites.length}</p>`

            target.style.background = BUTTON_ITEM_STYLES;
            target.innerText = 'Add';
        }
    }
})
