class Relic extends EventHandler{
    /**
     * 
     * @param {String} name 
     * @param {String} description 
     * @param {HTMLImageElement} image 
     */
    constructor(name, description, image) {
        super();
        /** @type {String} */
        this.name = name;
        /** @type {String} */
        this.description = description;
        /** @type {HTMLImageElement} */
        this.image = image;
    }

    /**
     * Called when the player picks up the relic
     * @param {Character} player 
     */
    onEquip(player) {
        // Override this method
    }

    
}

class Spike extends Relic {
    constructor() {
        super('Spike', 'Deal 1 damage to the enemy at the start of your turn.', new Image('img/relic/spike.png'));
    }

    emit(event) {
        if (event.type === 'turnStart') {
            event.target.damage(1);
        }
    }
}

class Suicidy extends Relic {
    constructor() {
        super('Suicidy', 'DEATH', new Image('img/relic/suicidy.png'));
    }

    emit(event) {
        if (event.type === 'attack') {
            event.floor.actionOutcomeStack.push(new SuicidyElement(event.damage * 2, event.damageTarget));
        }
    }
}