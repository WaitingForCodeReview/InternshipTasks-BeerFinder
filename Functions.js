import {validEnter} from "./Variables.js";
import {recentSearches} from "./Variables.js";
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

export function hideElement(id) {
    document.getElementById(id).style.display = 'none';
}

export function showElement(id) {
    document.getElementById(id).style.display = 'block';
}

export function getUrl(beerName) {
    return `https://api.punkapi.com/v2/beers?page=1&per_page=5&beer_name=${beerName}`;
}

export function isEmpty(arr) {
    return arr.length === 0;
}

export function renderElements(url, searchValue) {
    fetch(url)
        .then(response => response.json())
        .then(beers => {
            if (isEmpty(beers)) {
                showModalUserContent('ERROR', 'There were no properties found for the given location.')
            } else {
                recentSearches.add(searchValue);
                renderRecentSearches();
                renderItems(beers);
            }
        });
}

export function renderItems(beers) {
    const beerItemsElem = document.getElementById('beerItems');

    beerItemsElem.innerHTML = "";
    Object.foundBeers['beerArray'] = [];
    beers.forEach(item => {
        const beerItem = new BeerItem({
            name : item.name,
            imageUrl : item.image_url,
            description : item.description
        });
        beerItemsElem.innerHTML += beerItem.getInnerHtml();
        Object.foundBeers['beerArray'].push(beerItem);
    })
}

export function getItemsFetch(searchValue) {
    const url = getUrl(searchValue);

    renderElements(url, searchValue);
}

export function showModalUserContent(errorType, errorText) {
    const modalDiv = document.getElementById('modalError');

    modalDiv.innerHTML = `
        <h1>${errorType}</h1>
        <p>${errorText}</p>
    `
    modalDiv.style.display = 'block';
    setTimeout(() => {
        modalDiv.style.display = 'none';
    }, 2000);
}