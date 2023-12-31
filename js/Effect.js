class Effect extends EventHandler{
    /**
     * 
     * @param {String} id
     * @param {String} name
     * @param {String} description
     * @param {HTMLImageElement} image
     * @param {number} amount
     * @param {Character} target
     */
    constructor(id, name, description, image, amount, target) {
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
        /** @type {Character} */
        this.target = target;
    }
}


class PoisonEffect extends Effect {
    /**
     * 
     * @param {number} amount 
     * @param {Character} target
     */
    constructor(amount, target) {
        super('poison', 'Poison', 'Deal 1 damage at the end of your turn.', new Image('img/effect/poison.png'), amount, target);
    }

    /**
     * 
     * @param {GameEvent} event 
     */
    emit(event) {
        if (event.type === 'turnEnd' && event.target === this.target) {
            event.floor.actionOutcomeStack.push(new PoisonDamageElement(this.amount--, event.target));
            if(this.amount <= 0) {
                event.target.removeEffect(this.id);
            }
        }
    }
}

class SuperPoisonEffect extends Effect {
    /**
     * 
     * @param {number} amount 
     * @param {Character} target
     */
    constructor(amount, target) {
        super('superPoison', 'Super Poison', 'Deal 1 damage at the end of your turn.', new Image('img/effect/super_poison.png'), amount, target);
    }

    /**
     * 
     * @param {GameEvent} event 
     */
    emit(event) {
        if (event.type === 'beforeTurnEnd' && event.target === this.target) {
            event.floor.actionOutcomeStack.push(new SuperPoisonElement(this.amount--, event.target));
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
     * @param {Character} target
     */
    constructor(amount) {
        super('strength', 'Strength', 'Increase your damage by 1.', new Image('img/effect/strength.png'), amount, target);
    }

    /**
     * 
     * @param {GameEvent} event 
     */
    emit(event) {
        if (event.type === 'beforeAttack' && event.damageTarget === this.target) {
            event.damage += this.amount;
        }
    }
}