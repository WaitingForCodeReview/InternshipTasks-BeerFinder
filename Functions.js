import {validEnter, loadMoreDiv, recentSearches, beerItemsElem} from "./Variables.js";
import {BeerItem} from "./BeerItem.js";
import {ERROR_BACKGROUND, ERROR_TEXT, ERROR_TITLE, WARNING_BACKGROUND, WARNING_TEXT, WARNING_TITLE, BUTTON_ITEM_STYLES, favouriteCounterDiv} from "./Variables.js";
import {BUTTON_ADD_TEXT, BUTTON_REMOVE_BG, BUTTON_REMOVE_TEXT, MODAL_INNER_HTML} from "./Variables.js";

export function initializeDefaultLocalStorage() {
    try {
        JSON.parse(localStorage["recentSearches"]).forEach(item => initializeLocalStRecentSearches(item));
        JSON.parse(localStorage["favourites"]).forEach(item => initializeLocalStFavourites(item));
    } catch (e) { }
    renderRecentSearches();
}

export function initializeLocalStFavourites(item) {
    const beerInstance = parseToBeerInstance(item);
    addItemToFoundBeers(beerInstance);
    addItemToFavourites(beerInstance);
}

export function initializeLocalStRecentSearches(item) {
    recentSearches.add(item);
}

export function parseToBeerInstance(toParse) {
    return new BeerItem({
        ...Object.assign({}, toParse)
    });
}

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
                localStorage.setItem("recentSearches", JSON.stringify(Array.from(recentSearches.values())));
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
            titleId : `titleId${BeerItem.convertId(item.name)}`,
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
    addInnerHtml(shadowModal, MODAL_INNER_HTML)

    const modalContent = document.getElementById('modalContent');

    Object.favourites["favourites"].forEach( item => modalContent.innerHTML+= item.getInnerHtml());

    modalContent.addEventListener('click', function removeButtonClicked(event) {
        const target = event.target;

        if (target.classList.contains('removeBtn')) {
            const itemClicked = Object.foundBeers["beerArray"].find( item => item.buttonAddRemoveId === target.id);

            removeFavourites(itemClicked, target);
            removeHtml(target, modalContent);

            try {
                const btnItem = document.getElementById(itemClicked.buttonAddRemoveId);
                changeStyleRemoveFavourites(btnItem)
            } catch (e) {}
        }
    })

    crossRowHandler(shadowModal, modalContent);
}

export function removeFavourites(itemClicked, target) {
    Object.favourites["favourites"] =  Object.favourites["favourites"].filter(item => item.buttonAddRemoveId !== target.id);
    localStorage.setItem("favourites", JSON.stringify(Object.favourites["favourites"]));
    try {
        itemClicked.changeFavouriteStatus();
    } catch (e) {}
    favouriteCounterDiv.innerHTML = `<p>${ Object.favourites["favourites"].length}</p>`
}

export function changeStyleRemoveFavourites(btnItem) {
    const elem = document.getElementById(btnItem.id);

    elem.style.background = BUTTON_ITEM_STYLES;
    elem.innerText = BUTTON_ADD_TEXT;
}

export function showModalItem(target) {
    const shadowModal = document.getElementById('shadowModal');
    const itemClicked = Object.foundBeers["beerArray"].find( item => item.titleId === target.id);

    showElement(shadowModal);
    addInnerHtml(shadowModal, MODAL_INNER_HTML)

    const modalContent = document.getElementById('modalContent');

    modalContent.innerHTML = itemClicked.getInnerHtml();

    modalContent.addEventListener('click', function btnAddRemoveClicked(event) {
        const target = event.target;
        if (isNeededTarget(target) && (!itemClicked.isFavourite)) {
            addItemToFavourites(itemClicked);
            refactorAddButton(target, modalContent);
        } else if (isNeededTarget(target) && (itemClicked.isFavourite)){
                removeFavourites(itemClicked, target);
                refactorRemoveButton(target, modalContent);
        }
    })

    crossRowHandler(shadowModal, modalContent)
}

export function removeHtml(toRemove, modalContent) {
    const childItemNode = toRemove.parentNode.parentNode;

    modalContent.removeChild(childItemNode);
}

export function changeRemove(target) {
    document.getElementById(target.id).style.background = BUTTON_REMOVE_BG;
    document.getElementById(target.id).innerText = BUTTON_REMOVE_TEXT;
}

export function addHtml(target, modalContent) {
    const childItemNode = target.parentNode.parentNode;

    modalContent.append(childItemNode);
}

export function crossRowHandler(shadowModal, modalContent) {
    document.getElementById('crossrow').addEventListener('click', function crossRowClicked() {
        hideElement(shadowModal);
        modalContent.innerHTML = "";
    })
}

export function addInnerHtml(node, innerHtml) {
    node.innerHTML = innerHtml;
}

export function refactorRemoveButton(target, modalContent) {
    changeStyleRemoveFavourites(target);
    removeHtml(target, modalContent);
    changeStyleRemoveFavourites(target);
    addHtml(target, modalContent);
}

export function refactorAddButton(target, modalContent) {
    changeRemove(target);
    removeHtml(target, modalContent);
    changeRemove(target);
    addHtml(target, modalContent);
}

export function addItemToFavourites(itemClicked) {
    itemClicked.changeFavouriteStatus();
    Object.favourites["favourites"].push(itemClicked);
    localStorage.setItem("favourites", JSON.stringify(Object.favourites["favourites"]));
    favouriteCounterDiv.innerHTML = `<p>${Object.favourites["favourites"].length}</p>`
}

export function addItemToFoundBeers(item) {
    Object.foundBeers['beerArray'].push(item);
}

export function isNeededTarget(target) {
    return (target.classList.contains('addBtn') || target.classList.contains('removeBtn'));
}