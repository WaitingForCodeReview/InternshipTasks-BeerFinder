export class BeerItem {
    name
    imageUrl
    description
    buttonAddRemoveId
    titleId

    constructor(beerData) {
        Object.assign(this, { ...beerData });

        this.checkItemIsInFavourites() ? this.isFavourite = true : this.isFavourite = false;
    }

    getInnerHtml() {
        return `
            <div class="itemCard">
                    <div id="itemBtnDiv">
                        ${this.isFavourite ? `<a id="${this.buttonAddRemoveId}" class="removeBtn">Remove</a>` : `<a id="${this.buttonAddRemoveId}" class="addBtn">Add</a>`}
                    </div>
                    <div>
                        <img src=${this.imageUrl}>
                    </div>
                    <div>
                        <h2 id="${this.titleId}">${this.name}</h2>
                        <p>${this.description}</p>
                    </div>
            </div>
        `
    }

    static convertId(stringId) {
       return stringId.split(" ").join('');
    }

    changeFavouriteStatus() {
        this.isFavourite = !this.isFavourite;
    }

    checkItemIsInFavourites() {
        return  Object.favourites["favourites"].some( item => item.name === this.name);
    }
}