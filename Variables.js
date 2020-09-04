export const validEnter = new RegExp("\w*[a-zA-Z]\w*");
export const searchInput = document.getElementById("searchInput");
export const recentSearchesDiv = document.getElementById("recentSearches");
export const searchButton = document.getElementById("searchButton");
export const loadMoreButton = document.getElementById("loadMoreButton");
export const loadMoreDiv = document.getElementById("loadMoreDiv");
export const beerItemsElem = document.getElementById("beerItems");
export const arrowUp = document.getElementById("arrowUp");
export const favouriteCounterDiv = document.getElementById("favouritesCounter");
export const ERROR_TITLE = "ERROR";
export const ERROR_TEXT = "There were no properties found for the given location."
export const ERROR_BACKGROUND = "rgba(255, 0, 0, 0.8)";
export const WARNING_TITLE = "WARNING";
export const WARNING_TEXT = "There are no more beers in this search.";
export const WARNING_BACKGROUND = "rgba(255, 215, 0, 0.9)";
export const BUTTON_ITEM_STYLES = "rgb(255,212,3) linear-gradient(rgb(255,212,3), rgb(248,157,23))";
export const BUTTON_ADD_TEXT = 'Add';
export const BUTTON_REMOVE_TEXT = 'Remove';
export const BUTTON_REMOVE_BG = 'red';
export const MODAL_INNER_HTML = `
        <div id="crossrow"><img src="images/crossrow.svg" alt=""></div>
        <div id="modalContent">
        </div>
    `
export const favouritesButton = document.getElementById("btnFavourites");
export const recentSearches = new Set();
Object.foundBeers = {
    'beerArray' : [],
}
Object.favourites = {
    'favourites' : [],
}