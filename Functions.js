import {validEnter, loadMoreDiv, recentSearches, beerItemsElem} from "./Variables.js";
import {BeerItem} from "./BeerItem.js";


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
                showModalUserContent('ERROR', 'There were no properties found for the given location.', 'rgba(255, 0, 0, 0.8)');
            } else if(isEmpty(beers) && !isEmpty(Object.foundBeers["beerArray"])) {
                // warning modal
                showModalUserContent('WARNING', 'There are no more beers in this search.', 'rgba(255, 215, 0, 0.9)');
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
            buttonAddRemoveId : `buttonAddRemoveId${BeerItem.getUniqueId()}`,
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

export function showModalUserContent(errorType, errorText, backgroundColor) {
    const modalDiv = document.getElementById('modalError');
    const shadowModal = document.getElementById('shadowModal');

    modalDiv.style.backgroundColor = backgroundColor
    modalDiv.innerHTML = `
        <h1>${errorType}</h1>
        <p>${errorText}</p>
    `
    shadowModal.style.display = 'block';
    modalDiv.style.display = 'block';
    setTimeout(() => {
        shadowModal.style.display = 'none';
        modalDiv.style.display = 'none';
    }, 2000);
}

export function initializeBeerFull(searchValue, pageCounter) {
    hideElement(loadMoreDiv);
    clearItemsArray();
    clearItemsHTML();
    getItemsFetch(searchValue, pageCounter);
}