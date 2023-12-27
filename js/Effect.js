class Effect {
    /**
     * 
     * @param {String} name
     * @param {String} description
     * @param {HTMLImageElement} image
     * @param {number} amount
     */
    constructor(name, description, image, amount) {
        /** @type {String} */
        this.name = name;
        /** @type {String} */
        this.description = description;
        /** @type {HTMLImageElement} */
        this.image = image;
        /** @type {number} */
        this.amount = amount;
    }
}