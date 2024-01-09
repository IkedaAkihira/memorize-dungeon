class GameEvent {
    /**
     * 
     * @param {String} type 
     * @param {DungeonFloor} floor
     */
    constructor(type, floor) {
        /** @type {String} */
        this.type = type;
        /** @type {DungeonFloor} */
        this.floor = floor;
        /** @type {boolean} */
        this.isCancelled = false;
    }
}

class AttackEvent extends GameEvent {
    /**
     * 
     * @param {Character} damageSource
     * @param {Character} damageTarget
     * @param {number} damage 
     * @param {DungeonFloor} floor
     */
    constructor(damageSource, damageTarget, damage, floor) {
        super('attack', floor);
        /** @type {Character} */
        this.damageSource = damageSource;
        /** @type {Character} */
        this.damageTarget = damageTarget;
        /** @type {number} */
        this.damage = damage;
    }
}

class BeforeAttackEvent extends GameEvent {
    /**
     * 
     * @param {Character} damageSource
     * @param {Character} damageTarget
     * @param {number} damage 
     * @param {DungeonFloor} floor
     */
    constructor(damageSource, damageTarget, damage, floor) {
        super('beforeAttack', floor);
        /** @type {Character} */
        this.damageSource = damageSource;
        /** @type {Character} */
        this.damageTarget = damageTarget;
        /** @type {number} */
        this.damage = damage;
        /** @type {number} */
        this.relativeDamageBoost = 0;
        /** @type {number} */
        this.damageBoost = 0;
    }

    getDamage() {
        return Math.floor(this.damage * Math.max(0, 1 + this.relativeDamageBoost)) + this.damageBoost;
    }
}

class TurnStartEvent extends GameEvent {
    /**
     * 
     * @param {Character} target 
     * @param {Character} opponent
     * @param {DungeonFloor} floor
     */
    constructor(target, opponent, floor) {
        super('turnStart', floor);
        /** @type {Character} */
        this.target = target;
        /** @type {Character} */
        this.opponent = opponent;
    }
}

class BeforeTurnStartEvent extends GameEvent {
    /**
     * 
     * @param {Character} target 
     * @param {Character} opponent
     * @param {DungeonFloor} floor
     */
    constructor(target, opponent, floor) {
        super('beforeTurnStart', floor);
        /** @type {Character} */
        this.target = target;
        /** @type {Character} */
        this.opponent = opponent;
    }
}

class TurnEndEvent extends GameEvent {
    /**
     * 
     * @param {Character} target 
     * @param {Character} opponent
     * @param {DungeonFloor} floor
     */
    constructor(target, opponent, floor) {
        super('turnEnd', floor);
        /** @type {Character} */
        this.target = target;
        /** @type {Character} */
        this.opponent = opponent;
    }
}

class BeforeTurnEndEvent extends GameEvent {
    /**
     * 
     * @param {Character} target 
     * @param {Character} opponent
     * @param {DungeonFloor} floor
     */
    constructor(target, opponent, floor) {
        super('beforeTurnEnd', floor);
        /** @type {Character} */
        this.target = target;
        /** @type {Character} */
        this.opponent = opponent;
    }
}

class AnswerCorrectEvent extends GameEvent {
    /**
     * 
     * @param {Character} target 
     * @param {Character} opponent
     * @param {DungeonFloor} floor
     */
    constructor(target, opponent, floor) {
        super('answerCorrect', floor);
        /** @type {Character} */
        this.target = target;
        /** @type {Character} */
        this.opponent = opponent;
    }
}

class AnswerWrongEvent extends GameEvent {
    /**
     * 
     * @param {Character} target 
     * @param {Character} opponent
     * @param {DungeonFloor} floor
     */
    constructor(target, opponent, floor) {
        super('answerWrong', floor);
        /** @type {Character} */
        this.target = target;
        /** @type {Character} */
        this.opponent = opponent;
    }
}