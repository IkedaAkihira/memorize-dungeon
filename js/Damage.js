class Damage {
    /**
     * 
     * @param {number} amount 
     * @param {Character} parent 
     */
    constructor(amount, parent) {
        /** @type {number} */
        this.amount = amount;
        /** @type {Character} */
        this.parent = parent;
    }
}