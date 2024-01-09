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
        super('poison', 'Poison', 'Deal 1 damage at the end of your turn.', document.getElementById('effect-poison'), amount, target);
    }

    /**
     * 
     * @param {GameEvent} event 
     */
    emit(event) {
        if (event.type === 'turnEnd' && event.target === this.target) {
            event.floor.actionOutcomeStack.push(new PoisonDamageElement(this.amount, event.target));
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
        super('superPoison', 'Super Poison', 'Deal 1 damage at the end of your turn.', document.getElementById('effect-super-poison'), amount, target);
    }

    /**
     * 
     * @param {GameEvent} event 
     */
    emit(event) {
        if (event.type === 'beforeTurnEnd' && event.target === this.target) {
            event.floor.actionOutcomeStack.push(new SuperPoisonElement(this.amount, event.target));
        }
    }
}

class StrengthEffect extends Effect {
    /**
     * 
     * @param {number} amount 
     * @param {Character} target
     */
    constructor(amount, target) {
        super('strength', 'Strength', 'Increase your damage by 1.', document.getElementById('effect-strength'), amount, target);
    }

    /**
     * 
     * @param {GameEvent} event 
     */
    emit(event) {
        if (event.type === 'beforeAttack' && event.damageSource === this.target) {
            event.damageBoost += this.amount;
        }
    }
}

class StrengthDownEffect extends Effect {
    /**
     * 
     * @param {number} amount 
     * @param {Character} target
     */
    constructor(amount, target) {
        super('strengthDown', 'Strength Down', 'Decrease 1 strength at the end of your turn.', document.getElementById('effect-strength-down'), amount, target);
    }

    /**
     * 
     * @param {GameEvent} event 
     */
    emit(event) {
        if (event.type === 'turnEnd' && event.target === this.target) {
            event.floor.actionOutcomeStack.push(new GainStrengthElement(-this.amount, event.target, false));
            this.target.removeEffect(this.id);
        }
    }
}

class EnergyEffect extends Effect {
    /**
     * 
     * @param {number} amount 
     * @param {Character} target
     */
    constructor(amount, target) {
        super('energy', 'Energy', 'Some actions require and consume this effect.', document.getElementById('effect-energy'), amount, target);
    }
}

class WeakEffect extends Effect {
    /**
     * 
     * @param {number} amount 
     * @param {Character} target
     */
    constructor(amount, target) {
        super('weak', 'Weak', 'You deals 25% less damage.', document.getElementById('effect-weak'), amount, target);
    }

    /**
     * 
     * @param {GameEvent} event 
     */
    emit(event) {
        if (event.type === 'beforeAttack' && event.damageSource === this.target) {
            event.relativeDamageBoost -= 0.25;
        }else if (event.type === 'turnEnd' && event.target === this.target) {
            this.target.effects['weak'].amount -= 1;
            if (this.target.effects['weak'].amount === 0) {
                this.target.removeEffect('weak');
            }
        }
    }
}