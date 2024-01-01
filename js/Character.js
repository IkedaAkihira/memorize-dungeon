class Character extends EventHandler {
    /**
     * 
     * @param {String} name 
     * @param {number} maxHealth
     * @param {HTMLImageElement} image 
     */
    constructor(name, maxHealth, image) {
        super();
        /** @type {String} */
        this.name = name;
        /** @type {number} */
        this.maxHealth = maxHealth;
        /** @type {number} */
        this.health = maxHealth;
        /** @type {HTMLImageElement} */
        this.image = image;
        /** @type {Object} */
        this.effects = {};
        /** @type {number} */
        this.x = 0;
        /** @type {number} */
        this.y = 0;
    }

    addEffect(effect) {
        if (this.effects.hasOwnProperty(effect.id)) {
            this.effects[effect.id].amount += effect.amount;
        }else {
            this.effects[effect.id] = effect;
        }
    }

    removeEffect(id) {
        if (this.effects.hasOwnProperty(id)) {
            delete this.effects[id];
        }
    }

    /**
     * 
     * @param {number} amount
     * @param {Character} source
     * @param {DungeonFloor} floor
     */
    damage(amount, source, floor) {
        const damageEvent = new BeforeAttackEvent(source, this, amount, floor);
        floor.eventHandler.emit(damageEvent);
        if (damageEvent.damage > 0 && !damageEvent.isCancelled) {
            this.health -= damageEvent.damage;
            floor.eventHandler.emit(new AttackEvent(source, this, damageEvent.damage, floor));
        }
    }

    emit(event) {
        for (const effect of Object.values(this.effects)) {
            effect.emit(event);
        }
    }

    /**
     * 
     * @param {BattleFloor} floor
     */
    action(floor) {
        floor.actionOutcomeStack.push(new EnemyAttackElement(this));
    }
}

class Player extends Character {
    constructor(name, maxHealth, actions, money,  image) {
        super(name, maxHealth, image);
        /** @type {Array<Action>} */
        this.actions = actions;
        /** @type {number} */
        this.money = money;
        /** @type {Array<Relic>} */
        this.relics = [];
    }

    addAction(action) {
        this.actions.push(action);
    }

    addRelic(relic) {
        this.relics.push(relic);
        relic.onEquip(this);
    }

    emit(event) {
        super.emit(event);
        for (const relic of this.relics) {
            relic.emit(event);
        }
    }

    /**
     * 
     * @param {BattleFloor} floor
     */
    action(floor) {
        floor.actionOutcomeStack.push(new PlayerInteractionElement());
    }
    
}