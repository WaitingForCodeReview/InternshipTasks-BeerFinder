import {searchInput, recentSearchesDiv, searchButton, loadMoreButton, arrowUp, beerItemsElem, favourites, favouriteCounterDiv} from "./Variables.js";
import {isValidEnter, markAsInvalid, getItemsFetch, hideElement, showElement, initializeBeerFull} from "./Functions.js";

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

beerItemsElem.addEventListener('click', function addButtonClicked(event) {
    const target = event.target;

    if(target.classList.contains('addRemoveBtn')) {
        const itemClicked = Object.foundBeers["beerArray"].find( item => item.buttonAddRemoveId === target.id);
        if(!itemClicked.isFavourite) {
            itemClicked.isFavourite = true;
            favourites.push(itemClicked);
            favouriteCounterDiv.innerHTML = `<p>${favourites.length}</p>`
            target.style.background = 'red';
            target.innerText = 'Remove';
        } else {
            const removeElemIndex = favourites.findIndex(item => item.buttonAddRemoveId === target.id);

            itemClicked.isFavourite = false;
            favourites.splice(removeElemIndex, 1);
            favouriteCounterDiv.innerHTML = `<p>${favourites.length}</p>`
            target.style.background = 'rgb(255,212,3) linear-gradient(rgb(255,212,3), rgb(248,157,23))';
            target.innerText = 'Add';
            console.log(favourites)
        }
    }
})
