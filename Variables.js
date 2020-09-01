export const validEnter = new RegExp("\w*[a-zA-Z]\w*");
export const searchInput = document.getElementById("searchInput");
export const recentSearchesDiv = document.getElementById("recentSearches");
export const searchButton = document.getElementById("searchButton");
export const loadMoreButton = document.getElementById("loadMoreButton");
export const loadMoreDiv = document.getElementById("loadMoreDiv");
export const beerItemsElem = document.getElementById('beerItems');
export const arrowUp = document.getElementById("arrowUp");
export const recentSearches = new Set();
Object.foundBeers = {
    'beerArray' : [],
}