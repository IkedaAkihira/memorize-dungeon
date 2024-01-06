class Relic extends EventHandler{
    /**
     * 
     * @param {String} id
     * @param {String} name 
     * @param {String} description 
     * @param {HTMLImageElement} image 
     */
    constructor(id, name, description, image) {
        super();
        /** @type {String} */
        this.id = id;
        /** @type {String} */
        this.name = name;
        /** @type {String} */
        this.description = description;
        /** @type {HTMLImageElement} */
        this.image = image;
        /** @type {Player} */
        this.player = null;
    }

    /**
     * Called when the player picks up the relic
     * @param {Character} player 
     */
    onEquip(player) {
        // Override this method
        this.player = player;
    }

    
}

class PoisonJar extends Relic {
    constructor() {
        const image = document.createElement('img');
        image.src = 'img/relics/poison_jar.png';
        super('poisonJar', '毒瓶', 'クイズに正解するたび、相手に1の毒を付与する。', image);
    }

    emit(event) {
        if (event.type === 'answerCorrect') {
            event.floor.actionOutcomeStack.push(new AddPoisonElement(1, event.opponent));
        }
    }
}

class Spike extends Relic {
    constructor() {
        const image = document.createElement('img');
        image.src = 'img/relics/spike.png';
        super('spike', 'スパイク', 'クイズに正解するたびに、相手に3ダメージを与える。', image);
    }

    emit(event) {
        if (event.type === 'answerCorrect') {
            event.floor.actionOutcomeStack.push(new SlashElement(3, event.opponent));
        }
    }
}

class PoisonGas extends Relic {
    constructor() {
        const image = document.createElement('img');
        image.src = 'img/relics/poison_gas.png';
        super('poisonGas', '毒ガス', 'ターン開始時、相手に2の毒を付与する。', image);
    }

    emit(event) {
        if (event.type === 'turnStart' && event.target === this.player) {
            event.floor.actionOutcomeStack.push(new AddPoisonElement(2, event.opponent));
        }
    }
}

class GrowingSuit extends Relic {
    constructor() {
        const image = document.createElement('img');
        image.src = 'img/relics/growing_suit.png';
        super('growingSuit', '成長するスーツ', 'クイズに正解するたびに、筋力を1得る。この筋力はターン終了時に失われる。', image);
    }

    emit(event) {
        if (event.type === 'answerCorrect') {
            event.floor.actionOutcomeStack.push(new GainStrengthElement(1, event.target, true));
        }
    }
}

class RegenMachine extends Relic {
    constructor() {
        const image = document.createElement('img');
        image.src = 'img/relics/regen_machine.png';
        super('regenMachine', '再生装置', 'ターン開始時、体力を2回復する。', image);
    }

    emit(event) {
        if (event.type === 'turnStart' && event.target === this.player) {
            event.floor.actionOutcomeStack.push(new HealElement(2, event.target));
        }
    }
}

class PowerMachine extends Relic {
    constructor() {
        const image = document.createElement('img');
        image.src = 'img/relics/power_machine.png';
        super('powerMachine', '筋力強化装置', 'ターン開始時、筋力を1得る。', image);
    }

    emit(event) {
        if (event.type === 'turnStart' && event.target === this.player) {
            event.floor.actionOutcomeStack.push(new GainStrengthElement(1, event.target, false));
        }
    }
}

class EnergySource extends Relic {
    constructor() {
        const image = document.createElement('img');
        image.src = 'img/relics/energy_source.png';
        super('energySource', 'エネルギー源', 'ターン開始時、エネルギーを1得る。', image);
    }

    emit(event) {
        if (event.type === 'turnStart' && event.target === this.player) {
            event.floor.actionOutcomeStack.push(new GainEnergyElement(1, event.target));
        }
    }
}