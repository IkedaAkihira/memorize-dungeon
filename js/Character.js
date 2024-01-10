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
            if (this.effects[effect.id].amount <= 0) {
                delete this.effects[effect.id];
            }
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
        if (damageEvent.getDamage() > 0 && !damageEvent.isCancelled) {
            this.health -= damageEvent.getDamage();
            floor.eventHandler.emit(new AttackEvent(source, this, damageEvent.damage, floor));
        }
    }

    heal(amount, floor) {
        this.health = Math.min(this.health + amount, this.maxHealth);
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
    constructor(name, maxHealth, money,  image) {
        super(name, maxHealth, image);
        /** @type {Object} */
        this.actions = {};
        /** @type {number} */
        this.money = money;
        /** @type {Array<Relic>} */
        this.relics = [];
    }

    /**
     * 
     * @param {Action} action 
     */
    addAction(action) {
        this.actions[action.id] = action;
        const actionButton = document.createElement('div');
        actionButton.classList.add('action-item');
        actionButton.innerHTML = action.name;
        actionButton.dataset.actionId = action.id;
        actionButton.dataset.actionName = action.name;
        actionButton.dataset.relatedEffectIds = JSON.stringify(action.relatedEffectIds);
        actionButton.dataset.actionDescription = action.description;
        actionButton.addEventListener('click', onActionButtonClick);
        actionList.appendChild(actionButton);
    }

    addRelic(relic) {
        this.relics.push(relic);
        relic.image.classList.add('relic-item');
        relic.image.addEventListener('mouseenter', (e) => {
            const relicDescription = document.getElementById('relic-description');
            const relicName = document.getElementById('relic-description-name');
            const relicDescriptionText = document.getElementById('relic-description-text');
            relicName.innerHTML = relic.name;
            relicDescriptionText.innerHTML = relic.description;
            relicDescription.style.left = e.pageX + 'px';
            relicDescription.style.top = e.pageY + 'px';
            relicDescription.showPopover();
        });
        relic.image.addEventListener('mouseleave', () => {
            const relicDescription = document.getElementById('relic-description');
            relicDescription.hidePopover();
        });
        relicList.appendChild(relic.image);
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