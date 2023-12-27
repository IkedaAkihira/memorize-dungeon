class Relic extends EventHandler{
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

    /**
     * Called when the player picks up the relic
     * @param {Character} player 
     */
    onEquip(player) {
        // Override this method
    }

    
}