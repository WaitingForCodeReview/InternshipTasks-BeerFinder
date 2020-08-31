import {foundBeers} from "./Variables.js";

export class BeerItem {
    name
    imageUrl
    description

    constructor(BeerData) {
        Object.assign(this, { ...BeerData });

        foundBeers.push(this);
    }

    getInnerHtml() {
        return `
            <div class="itemCard">
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
}