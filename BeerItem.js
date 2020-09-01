export class BeerItem {
    name
    imageUrl
    description
    buttonAddRemoveId

    constructor(beerData) {
        Object.assign(this, { ...beerData });

        this.isFavourite = false;
    }

    getInnerHtml() {
        return `
            <div class="itemCard">
                    <div style="position: relative; top: 1%; left: 40%;">
                        <a id="${this.buttonAddRemoveId}" class="addRemoveBtn">Add</a>
                    </div>
                    <div>
                        <img src=${this.imageUrl} style="width: 250px; height: 550px">
                    </div>
                    <div>
                        <p>${this.name}</p>
                        <p>${this.description}</p>
                    </div>
            </div>
        `
    }

    static getUniqueId() {
        return Math.random();
    }
}