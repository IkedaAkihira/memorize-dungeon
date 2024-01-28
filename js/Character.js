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

class Fighter extends Character {
    constructor(power) {
        const image = new Image(240, 240);
        image.src = 'img/characters/fighter.png';
        super('Fighter', 100, image);
        this.power = power;
    }

    action(floor) {
        this.slash(floor, this.power, floor.player);
    }

    slash(floor, damage, target, shouldInvert = true) {
        floor.actionOutcomeStack.push(new QuizElement(
            () => {
                floor.actionOutcomeStack.push(new SlashElement(damage, target, this));
            },
            () => {},
            shouldInvert
        ));
    }
}

class Stinky extends Character {
    /**
     * 
     * @param {number} power
     * @param {number} quizCount
     * @param {number} poisonAmount
     */
    constructor(power, quizCount, poisonAmount) {
        const image = new Image(240, 240);
        image.src = 'img/characters/stinky.png';
        super('Stinky', 130, image);
        this.power = power;
        this.quizCount = quizCount;
        this.poisonAmount = poisonAmount;
    }

    action(floor) {
        const rand = Math.floor(Math.random() * 3);
        if (rand <= 1) {
            this.punch(floor, this.power, floor.player)
        } else {
            this.stinkySpray(floor, this.quizCount, this.poisonAmount, floor.player)
        }
    }

    punch(floor, damage, target, shouldInvert = true) {
        floor.actionOutcomeStack.push(new QuizElement(
            () => {
                floor.actionOutcomeStack.push(new HeavySlashElement(damage, target, this));
            },
            () => {},
            shouldInvert
        ));
    }

    stinkySpray(floor, quizCount, amount, target, shouldInvert = true) {
        floor.actionOutcomeStack.push(new SomeQuizzesElement(false, quizCount, () => {
            floor.actionOutcomeStack.push(new AddWeakElement(amount, target));
            floor.actionOutcomeStack.push(new AddPoisonElement(amount, target));
        }, () => {}, () => {}, false, shouldInvert));
    }
}

class Bat extends Character {
    constructor(power, attackCount) {
        const image = new Image(240, 240);
        image.src = 'img/characters/bat.png';
        super('Bat', 40, image);
        this.power = power;
        this.attackCount = attackCount;
    }

    action(floor) {
        this.bite(floor, this.power, this.attackCount, floor.player);
    }

    bite(floor, damage, attackCount, target, shouldInvert = true) {
        floor.actionOutcomeStack.push(new SomeQuizzesElement(false, attackCount, () => {
            floor.actionOutcomeStack.push(new BiteElement(damage, target, this));
        }, () => {}, () => {}, true, shouldInvert));
    }
}

class ThreeHeadedDog extends Character {
    constructor(power) {
        const image = new Image(240, 240);
        image.src = 'img/characters/three_headed_dog.png';
        super('Three Headed Dog', 200, image);
        this.power = power;
    }

    action(floor) {
        this.bite(floor, this.power, floor.player);
    }
    
    bite(floor, damage, target, shouldInvert = true) {
        floor.actionOutcomeStack.push(new SomeQuizzesElement(false, 3, () => {
            floor.actionOutcomeStack.push(new BiteElement(damage, target, this));
        }, () => {}, () => {}, false, shouldInvert));

    }
}

class PoisonMagician extends Character {
    constructor(power, poisonAmount, requiredPoisonAmount) {
        const image = new Image(240, 240);
        image.src = 'img/characters/poison_magician.png';
        super('Poison Magician', 300, image);
        this.power = power;
        this.poisonAmount = poisonAmount;
        this.requiredPoisonAmount = requiredPoisonAmount;
    }

    action(floor) {
        if (floor.player.effects.hasOwnProperty('poison')) {
            if (floor.player.effects['poison'].amount >= this.requiredPoisonAmount) {
                this.evolvePoison(floor, floor.player);
                return;
            }
        }
        this.poisonShot(floor, this.poisonAmount, floor.player);
    }

    poisonShot(floor, amount, target) {
        floor.actionOutcomeStack.push(new QuizElement(
            () => {
                floor.actionOutcomeStack.push(new AddPoisonElement(amount, target));
            },
            () => {},
            true
        ));
    }

    evolvePoison(floor, target) {
        floor.actionOutcomeStack.push(new QuizElement(
            () => {
                floor.actionOutcomeStack.push(new EvolvePoisonElement(target));
            },
            () => {},
            true
        ));
    }
}

class VampireKnight extends Bat {
    constructor(power, attackCount, vampPower) {
        super(power, attackCount);
        this.vampPower = vampPower;
        this.vampImage = new Image(240, 240);
        this.vampImage.src = 'img/characters/vampire_knight.png';
        this.isTransformed = false;
    }

    action(floor) {
        if (this.isTransformed) {
            this.bite(floor, this.vampPower, 1, floor.player);
        } else {
            this.bite(floor, this.power, this.attackCount, floor.player);
        }
    }

    transform(floor) {
        this.isTransformed = true;
        floor.actionOutcomeStack.push(new VampireTransformElement(this));
    }

    emit(event) {
        // When the Vampire Knight is about to die, transform into a Vampire
        if (!this.isTransformed && event.type === 'beforeAttack' && event.damageTarget === this && event.damage >= this.health) {
            event.isCancelled = true;
            this.health = 1;
            this.transform(event.floor);
        }
    }
}