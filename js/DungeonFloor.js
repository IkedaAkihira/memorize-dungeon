class DungeonFloor {
    /**
     * @param {CanvasRenderingContext2D} ctx
     * @param {Player} player
     */
    constructor(ctx, player) {
        /** @type {CanvasRenderingContext2D} */
        this.ctx = ctx;
        /** @type {Player} */
        this.player = player;
        /** @type {EventHandler} */
        this.eventHandler = new EventHandler();
        /** @type {Array<ActionOutcomeElement>} */
        this.actionOutcomeStack = [];
        /** @type {ActionOutcomeElement} */
        this.currentOutcomeElement = null;
    }

    // This method is called when the player enters the floor
    enter() {
        // Override this method
    }

    /**
     * 
     * @param {number} delta 
     */
    update(delta) {
        // Override this method
    }
}


class BattleFloor extends DungeonFloor{
    constructor(ctx, player, enemy) {
        super(ctx, player);
        /** @type {Character} */
        this.enemy = enemy;
        this.eventHandler = new BattleFloorEventHandlers(player, enemy);
    }

    update(delta) {
        console.log(JSON.stringify(this));
        if (this.currentOutcomeElement != null) {
            this.currentOutcomeElement.update(delta, this);
            if (!this.currentOutcomeElement.isRunning) {
                this.currentOutcomeElement = null;
            }
        } else {
            if (this.actionOutcomeStack.length > 0) {
                this.currentOutcomeElement = this.actionOutcomeStack.pop();
                this.currentOutcomeElement.isRunning = true;
            } else {
                this.eventHandler.emit(new TurnEndEvent(this.player, this.enemy, this));
            }
        }
    }
}

class BattleFloorEventHandlers extends EventHandler {
    /**
     * 
     * @param {Player} player
     * @param {Character} enemy
     */
    constructor(player, enemy) {
        super();
        /** @type {Player} */
        this.player = player;
        /** @type {Character} */
        this.enemy = enemy;
    }

    /**
     * 
     * @param {GameEvent} event 
     */
    emit(event) {
        this.player.emit(event);
        this.enemy.emit(event);
    }
}