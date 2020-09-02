import {validEnter, loadMoreDiv, recentSearches, beerItemsElem} from "./Variables.js";
import {BeerItem} from "./BeerItem.js";
import {ERROR_BACKGROUND, ERROR_TEXT, ERROR_TITLE, WARNING_BACKGROUND, WARNING_TEXT, WARNING_TITLE, BUTTON_ITEM_STYLES, favouriteCounterDiv} from "./Variables.js";


export function isValidEnter(enter) {
    return enter.match(validEnter);
}

export function markAsInvalid(elem) {
    const elemTextColor = elem.style.color;

    elem.style.outline = '5px solid red';
    elem.style.color = 'red';
    setTimeout(() => {
        elem.style.outline = 'none';
        elem.style.color = elemTextColor;
    }, 1000);
}

export function renderRecentSearches() {
    const recentSearchDiv = document.getElementById('recentSearches');
    recentSearchDiv.innerHTML = "";

    Array.from(recentSearches.values()).forEach( item => {
        const pElem = document.createElement('p');
        pElem.innerText = item;
        recentSearchDiv.append(pElem);
    })
}

export function hideElement(elem) {
    elem.style.display = 'none';
}

export function showElement(elem) {
    elem.style.display = 'block';
}

export function getUrl(beerName, pageCounter) {
    return `https://api.punkapi.com/v2/beers?page=${pageCounter}&per_page=5&beer_name=${beerName}`;
}

export function isEmpty(arr) {
    return arr.length === 0;
}

export function renderElements(url, searchValue) {
    fetch(url)
        .then(response => response.json())
        .then(beers => {
            if (isEmpty(beers) && isEmpty(Object.foundBeers["beerArray"])) {
                // error modal
                showModalUserContent({errorType : ERROR_TITLE, errorText : ERROR_TEXT, backgroundColor : ERROR_BACKGROUND});
            } else if (isEmpty(beers) && !isEmpty(Object.foundBeers["beerArray"])) {
                // warning modal
                showModalUserContent({errorType : WARNING_TITLE, errorText : WARNING_TEXT, backgroundColor : WARNING_BACKGROUND});
            } else {
                recentSearches.add(searchValue);
                renderRecentSearches();
                renderItems(beers);
                showElement(loadMoreDiv);
            }
        });
}

export function renderItems(beers) {
    beers.forEach(item => {
        const beerItem = new BeerItem({
            name : item.name,
            imageUrl : item.image_url,
            description : item.description,
            buttonAddRemoveId : `buttonAddRemoveId${BeerItem.convertId(item.name)}`,
        });
        beerItemsElem.innerHTML += beerItem.getInnerHtml();
        Object.foundBeers['beerArray'].push(beerItem);
    })
}

export function clearItemsArray() {
    Object.foundBeers['beerArray'] = [];
}

export function clearItemsHTML() {
    beerItemsElem.innerHTML = "";
}

export function getItemsFetch(searchValue, pageCounter) {
    const url = getUrl(searchValue, pageCounter);

    renderElements(url, searchValue);
}

export function showModalUserContent({errorType, errorText, backgroundColor}) {
    const modalDiv = document.getElementById('modalError');
    const shadowModal = document.getElementById('shadowModal');

    modalDiv.style.backgroundColor = backgroundColor
    modalDiv.innerHTML = `
        <h1>${errorType}</h1>
        <p>${errorText}</p>
    `
    showElement(shadowModal);
    showElement(modalDiv);
    setTimeout(() => {
        hideElement(shadowModal);
        hideElement(modalDiv);
    }, 2000);
}

export function initializeBeerFull(searchValue, pageCounter) {
    hideElement(loadMoreDiv);
    clearItemsArray();
    clearItemsHTML();
    getItemsFetch(searchValue, pageCounter);
}

export function showModalFavourites() {
    const shadowModal = document.getElementById('shadowModal');

    showElement(shadowModal);
    shadowModal.innerHTML = `
        <div id="crossrow"><img src="images/crossrow.svg" alt=""></div>
        <div id="modalContent">
        </div>
    `

    const modalContent = document.getElementById('modalContent');

    Object.favourites["favourites"].forEach( item => modalContent.innerHTML+= item.getInnerHtml());
    modalContent.addEventListener('click', function removeButtonClicked(event) {
        const target = event.target;

        if (target.classList.contains('removeBtn')) {
            const itemClicked = Object.foundBeers["beerArray"].find( item => item.buttonAddRemoveId === target.id);
            const childItemNode = target.parentNode.parentNode;

            removeFavourites(itemClicked, target);
            modalContent.removeChild(childItemNode);

            const btnItem = document.getElementById(itemClicked.buttonAddRemoveId);

            changeStyleRemoveFavourites(btnItem)
        }
    })
    document.getElementById('crossrow').addEventListener('click', function crossBowClicked() {
        hideElement(shadowModal);
    })
}

export function removeFavourites(itemClicked, target) {
    Object.favourites["favourites"] =  Object.favourites["favourites"].filter(item => item.buttonAddRemoveId !== target.id);
    itemClicked.changeFavouriteStatus();
    favouriteCounterDiv.innerHTML = `<p>${ Object.favourites["favourites"].length}</p>`
}

export function changeStyleRemoveFavourites(btnItem) {
    btnItem.style.background = BUTTON_ITEM_STYLES;
    btnItem.innerText = 'Add';
}
