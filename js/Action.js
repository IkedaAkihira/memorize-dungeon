class Action {
    /**
     * 
     * @param {String} name
     * @param {String} description
     * @param {HTMLImageElement} image
     */
    constructor(name, description, image) {
        /** @type {String} */
        this.name = name;
        /** @type {String} */
        this.description = description;
        /** @type {HTMLImageElement} */
        this.image = image;
    }

    onUse(player) {
        // Override this method
    }
}