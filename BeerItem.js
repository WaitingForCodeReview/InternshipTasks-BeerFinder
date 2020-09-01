export class BeerItem {
    name
    imageUrl
    description

    constructor(beerData) {
        Object.assign(this, { ...beerData });

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