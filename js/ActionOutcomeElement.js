class ActionOutcomeElement {
    constructor() {
        /** @type {boolean} */
        this.isRunning = false;
    }

    /**
     * 
     * @param {number} delta
     * @param {DungeonFloor} floor
     */
    update(delta, floor) {
        // Override this method
    }
}

class PoisonDamageElement extends ActionOutcomeElement {
    constructor(damage, target) {
        super();
        /** @type {number} */
        this.damage = damage;
        /** @type {Character} */
        this.target = target;
        /** @type {boolean} */
        this.hasDealtDamage = false;
    }

    update(delta, floor) {
        if (!this.hasDealtDamage) {
            this.hasDealtDamage = true;
            this.target.damage(this.damage, null, floor);
            this.isRunning = false;
        }
    }
}