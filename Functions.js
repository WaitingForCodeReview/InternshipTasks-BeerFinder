import {validEnter} from "./Variables.js";
import {foundBeers, NO_ITEM_FOUND, recentSearches, searchInput} from "./Variables.js";
import {BeerItem} from "./BeerItem.js";

export function isValidEnter(enter) {
    return enter.match(validEnter);
}

export function markAsInvalid(elem) {
    const elementDefaultColor = elem.style.color;
    const elementDefaultBackgroundColor = elem.style.backgroundColor;

    elem.style.color = 'red';
    elem.style.backgroundColor = ' rgba(255, 0, 0, 0.4)';
    setTimeout(() => {
        elem.style.color = elementDefaultColor;
        elem.style.backgroundColor = elementDefaultBackgroundColor;
    }, 2000);
}

export function addInputToRecentSearches(input) {
    const recentSearchDiv = document.getElementById("recentSearches");
    const p = document.createElement('p');

    p.innerText = input;
    recentSearchDiv.append(p);
}

export function hideElement(id) {
    document.getElementById(id).style.display = 'none';
}

export function showElement(id) {
    document.getElementById(id).style.display = 'block';
}

export function getUrl(beerName) {
    let url = `https://api.punkapi.com/v2/beers?page=1&per_page=5&beer_name=${beerName}`;

    return url;
}

export function isEmpty(arr) {
    return arr.length === 0;
}

export function renderElements(url, searchValue) {
    fetch(url)
        .then(response => response.json())
        .then(beers => {
            if (isEmpty(beers)) {
                alert(NO_ITEM_FOUND);
            } else {
                if (recentSearches.indexOf(searchValue) === -1) {
                    addInputToRecentSearches(searchValue);
                    recentSearches.push(searchValue);
                }
                refactorItems(beers);
            }
        });
}

export function refactorItems(beers) {
    const beerItemsElem = document.getElementById('beerItems');

    foundBeers.length = 0;
    beers.forEach(item => {
        const beerItem = new BeerItem({
            name : item.name,
            imageUrl : item.image_url,
            description : item.description
        });
    })
    beerItemsElem.innerHTML = "";
    foundBeers.forEach( item => {
        beerItemsElem.innerHTML += item.getInnerHtml();
    })
}

export function getItemsFetch(searchValue) {
    let url = getUrl(searchValue);

    renderElements(url, searchValue);
}