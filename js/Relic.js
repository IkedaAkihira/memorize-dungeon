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