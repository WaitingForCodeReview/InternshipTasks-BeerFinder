import {validEnter, loadMoreDiv, recentSearches, beerItemsElem} from "./Variables.js";
import {BeerItem} from "./BeerItem.js";
import {ERROR_BACKGROUND, ERROR_TEXT, ERROR_TITLE, WARNING_BACKGROUND, WARNING_TEXT, WARNING_TITLE} from "./Variables.js";


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
            } else if(isEmpty(beers) && !isEmpty(Object.foundBeers["beerArray"])) {
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