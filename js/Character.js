class Character {
    /**
     * 
     * @param {String} name 
     * @param {number} maxHealth 
     * @param {Array<Action>} actions 
     * @param {number} money
     * @param {HTMLImageElement} image 
     */
    constructor(name, maxHealth, actions, money, image) {
        /** @type {String} */
        this.name = name;
        /** @type {number} */
        this.maxHealth = maxHealth;
        /** @type {number} */
        this.health = maxHealth;
        /** @type {number} */
        this.money = money;
        /** @type {Array<Action>} */
        this.actions = actions;
        /** @type {HTMLImageElement} */
        this.image = image;
        /** @type {Array<Relic>} */
        this.relics = [];
        /** @type {Array<Effect>} */
        this.effects = [];
    }

    addAction(action) {
        this.actions.push(action);
    }
}