class Action {
    /**
     * 
     * @param {String} id
     * @param {String} name
     * @param {String} description
     */
    constructor(id, name, description) {
        /** @type {String} */
        this.id = id;
        /** @type {String} */
        this.name = name;
        /** @type {String} */
        this.description = description;
    }

    /**
     * 
     * @param {BattleFloor} floor
     * @returns {Boolean} True if the action was used, false otherwise 
     */
    onUse(floor) {
        // Override this method
    }
}

class StrikeAction extends Action {
    /**
     * 
     * @param {number} damage
     */
    constructor(damage) {
        super('strike', 'ストライク', `問題を1問解き、正解なら敵に${damage}ダメージを与える。`);
        /** @type {number} */
        this.damage = damage;
    }

    /**
     * 
     * @param {BattleFloor} floor
     * @returns {Boolean} True if the action was used, false otherwise 
     */
    onUse(floor) {
        floor.actionOutcomeStack.push(new QuizElement(() => {
            floor.actionOutcomeStack.push(new SlashElement(this.damage, floor.enemy, floor.player));
        }, () => {

        }));
        return true;
    }
}

class HeavyStrikeAction extends Action {
    /**
     * 
     * @param {number} damage
     */
    constructor(damage) {
        super('heavy-strike', 'ヘビー・ストライク', `問題を3問解き、すべて正解なら敵に${damage}ダメージを与える。`);
        /** @type {number} */
        this.damage = damage;
    }

    /**
     * 
     * @param {BattleFloor} floor
     * @returns {Boolean} True if the action was used, false otherwise 
     */
    onUse(floor) {
        floor.actionOutcomeStack.push(new SomeQuizzesElement(false, 3, () => {}, () => {
            floor.actionOutcomeStack.push(new HeavySlashElement(this.damage, floor.enemy, floor.player));
        }, () => {}, true));
        return true;
    }
}

class PoisonStrikeAction extends Action {
    /**
     * 
     * @param {number} damage
     * @param {number} poisonAmount
     */
    constructor(damage, poisonAmount) {
        super('poison-strike', 'ポイズン・ストライク', `問題を1問解き、正解なら敵に${damage}ダメージと${poisonAmount}の毒を与える。`);
        /** @type {number} */
        this.damage = damage;
        /** @type {number} */
        this.poisonAmount = poisonAmount;
    }

    /**
     * 
     * @param {BattleFloor} floor
     * @returns {Boolean} True if the action was used, false otherwise 
     */
    onUse(floor) {
        floor.actionOutcomeStack.push(new QuizElement(() => {
            floor.actionOutcomeStack.push(new SlashElement(this.damage, floor.enemy, floor.player));
            floor.actionOutcomeStack.push(new AddPoisonElement(this.poisonAmount, floor.enemy));
        }, () => {}));
        return true;
    }
}

class ChargeStrikeAction extends Action {
    /**
     * 
     * @param {number} damage
     * @param {number} chargeAmount
     */
    constructor(damage, chargeAmount) {
        super('charge-strike', 'チャージ・ストライク', `問題を1問解き、正解なら敵に${damage}ダメージを与え、${chargeAmount}のエネルギーを得る。`);
        /** @type {number} */
        this.damage = damage;
        /** @type {number} */
        this.chargeAmount = chargeAmount;
    }

    /**
     * 
     * @param {BattleFloor} floor
     * @returns {Boolean} True if the action was used, false otherwise 
     */
    onUse(floor) {
        floor.actionOutcomeStack.push(new QuizElement(() => {
            floor.actionOutcomeStack.push(new SlashElement(this.damage, floor.enemy, floor.player));
            floor.actionOutcomeStack.push(new GainEnergyElement(this.chargeAmount, floor.player));
        }, () => {}));
        return true;
    }
}

class EnergyStrikeAction extends Action {
    /**
     * 
     * @param {number} damage
     * @param {number} requireEnergyAmount
     */
    constructor(damage, requireEnergyAmount) {
        super('energy-strike', 'エナジー・ストライク', `${requireEnergyAmount}のエネルギーを消費して問題を1問解き、正解なら敵に${damage}ダメージを与える。`);
        /** @type {number} */
        this.damage = damage;
        /** @type {number} */
        this.requireEnergyAmount = requireEnergyAmount;
    }

    /**
     * 
     * @param {BattleFloor} floor
     * @returns {Boolean} True if the action was used, false otherwise 
     */
    onUse(floor) {
        if (!floor.player.effects.hasOwnProperty('energy') || floor.player.effects['energy'].amount < this.requireEnergyAmount) {
            return false;
        }
        floor.player.effects['energy'].amount -= this.requireEnergyAmount;
        if (floor.player.effects['energy'].amount === 0) {
            floor.player.removeEffect('energy');
        }
        floor.actionOutcomeStack.push(new QuizElement(() => {
            floor.actionOutcomeStack.push(new SlashElement(this.damage, floor.enemy, floor.player));
        }, () => {}));
        return true;
    }
}

class CatalystStrikeAction extends Action {
    /**
     * 
     * @param {number} damage
     * @param {number} additionalDamagePerPoison
     */
    constructor(damage, additionalDamagePerPoison) {
        super('catalyst-strike', 'カタリスト・ストライク', `問題を1問解き、正解なら敵に${damage}ダメージと、相手の毒の数だけ${additionalDamagePerPoison}ダメージを与える。`);
        /** @type {number} */
        this.damage = damage;
        /** @type {number} */
        this.additionalDamagePerPoison = additionalDamagePerPoison;
    }

    /**
     * 
     * @param {BattleFloor} floor
     * @returns {Boolean} True if the action was used, false otherwise 
     */
    onUse(floor) {
        floor.actionOutcomeStack.push(new QuizElement(() => {
            const poisonCount = floor.enemy.effects.hasOwnProperty('poison') ? floor.enemy.effects['poison'].amount : 0;
            floor.actionOutcomeStack.push(new SlashElement(this.damage + this.additionalDamagePerPoison * poisonCount, floor.enemy, floor.player));
        }, () => {}));
        return true;
    }
}

class ContinuousSlashAction extends Action {
    /**
     * 
     * @param {number} damage
     * @param {number} count
     */
    constructor(damage, count) {
        super('continuous-slash', '連続斬り', `問題を間違えるか${count}問正解するまで解き、正解するたび敵に${damage}ダメージを与える。`);
        /** @type {number} */
        this.damage = damage;
        /** @type {number} */
        this.count = count;
    }

    /**
     * 
     * @param {BattleFloor} floor
     * @returns {Boolean} True if the action was used, false otherwise 
     */
    onUse(floor) {
        floor.actionOutcomeStack.push(new SomeQuizzesElement(false, this.count, () => {
            floor.actionOutcomeStack.push(new SlashElement(this.damage, floor.enemy, floor.player));
        }, () => {}, () => {}, true));
        return true;
    }
}

class LightningAction extends Action {
    /**
     * 
     * @param {number} damage
     */
    constructor(damage) {
        super('lightning', 'ライトニング', `エネルギーをすべて消費する。そのあと、間違えるか消費したエネルギーの数だけ正解するまで問題を解き、正解するたび敵に${damage}ダメージを与える。`);
        /** @type {number} */
        this.damage = damage;
    }

    /**
     * 
     * @param {BattleFloor} floor
     * @returns {Boolean} True if the action was used, false otherwise 
     */
    onUse(floor) {
        if (!floor.player.effects.hasOwnProperty('energy') || floor.player.effects['energy'].amount === 0) {
            return false;
        }
        const energyAmount = floor.player.effects['energy'].amount;
        floor.player.removeEffect('energy');
        floor.actionOutcomeStack.push(new SomeQuizzesElement(false, energyAmount, () => {
            floor.actionOutcomeStack.push(new SlashElement(this.damage, floor.enemy, floor.player));
        }, () => {}, () => {}, true));
        return true;
    }
}

class StinkySprayAction extends Action {
    /**
     * 
     * @param {number} poisonAmount
     * @param {number} quizCount
     */
    constructor(poisonAmount, quizCount) {
        super('stinky-spray', 'スティンキー・スプレー', `問題を${quizCount}問解き、正解するたび敵に${poisonAmount}の毒と脱力を与える。`);
        /** @type {number} */
        this.poisonAmount = poisonAmount;
        /** @type {number} */
        this.quizCount = quizCount;
    }

    /**
     * 
     * @param {BattleFloor} floor
     * @returns {Boolean} True if the action was used, false otherwise
     */
    onUse(floor) {
        floor.actionOutcomeStack.push(new SomeQuizzesElement(false, this.quizCount, () => {
            floor.actionOutcomeStack.push(new AddWeakElement(this.poisonAmount, floor.enemy));
            floor.actionOutcomeStack.push(new AddPoisonElement(this.poisonAmount, floor.enemy));
        }, () => {}, () => {}, false));
        return true;
    }
}

class EvolvePoisonAction extends Action {
    /**
     * 
     * @param {number} requireEnergyAmount
     */
    constructor(requireEnergyAmount) {
        super('evolve-poison', 'エボルブ・ポイズン', `${requireEnergyAmount}のエネルギーを消費して問題を1問解き、正解なら敵の毒をスーパー毒にする。`);
        /** @type {number} */
        this.requireEnergyAmount = requireEnergyAmount;
    }

    /**
     * 
     * @param {BattleFloor} floor
     * @returns {Boolean} True if the action was used, false otherwise
     */
    onUse(floor) {
        if (!floor.player.effects.hasOwnProperty('energy') || floor.player.effects['energy'].amount < this.requireEnergyAmount) {
            return false;
        }
        floor.player.effects['energy'].amount -= this.requireEnergyAmount;
        if (floor.player.effects['energy'].amount === 0) {
            floor.player.removeEffect('energy');
        }
        floor.actionOutcomeStack.push(new QuizElement(() => {
            floor.actionOutcomeStack.push(new EvolvePoisonElement(floor.enemy));
        }, () => {}));
        return true;
    }
}