class Effect extends EventHandler{
    /**
     * 
     * @param {String} id
     * @param {String} name
     * @param {String} description
     * @param {HTMLImageElement} image
     * @param {number} amount
     */
    constructor(id, name, description, image, amount) {
        super();
        /** @type {String} */
        this.id = id;
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


class PoisonEffect extends Effect {
    /**
     * 
     * @param {number} amount 
     */
    constructor(amount) {
        super('poison', 'Poison', 'Deal 1 damage at the end of your turn.', new Image('img/effect/poison.png'), amount);
    }

    /**
     * 
     * @param {GameEvent} event 
     */
    emit(event) {
        if (event.type === 'turnEnd') {
            event.floor.actionOutcomeStack.push(new PoisonDamageElement(this.amount--, event.target));
            if(this.amount <= 0) {
                event.target.removeEffect(this.id);
            }
        }
    }
}

class StrengthEffect extends Effect {
    /**
     * 
     * @param {number} amount 
     */
    constructor(amount) {
        super('strength', 'Strength', 'Increase your damage by 1.', new Image('img/effect/strength.png'), amount);
    }

    /**
     * 
     * @param {GameEvent} event 
     */
    emit(event) {
        if (event.type === 'beforeAttack' && event.damageSource === event.target) {
            event.damage += this.amount;
        }
    }
}