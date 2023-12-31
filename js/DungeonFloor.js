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
        /** @type {number} */
        this.turnCount = 0;
        /** @type {boolean} */
        this.hasTurnEnded = true;
    }

    update(delta) {

        // Render the player and the enemy
        this.ctx.font = '30px Arial';
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.drawImage(this.player.image, this.player.x - this.player.image.width / 2, this.player.y - this.player.image.height / 2, this.player.image.width, this.player.image.height);
        this.ctx.fillText(this.player.health, this.player.x - this.player.image.width / 2, this.player.y + this.player.image.height / 2);
        this.ctx.drawImage(this.enemy.image, this.enemy.x - this.enemy.image.width / 2, this.enemy.y - this.enemy.image.height / 2, this.enemy.image.width, this.enemy.image.height);
        this.ctx.fillText(this.enemy.health, this.enemy.x - this.enemy.image.width / 2, this.enemy.y + this.enemy.image.height / 2);
        
        
        // Update action outcome elements
        if (this.currentOutcomeElement != null) {
            this.currentOutcomeElement.update(delta, this);
            if (!this.currentOutcomeElement.isRunning) {
                this.currentOutcomeElement = null;
            }
        } else {
            if (this.player.health <= 0 || this.enemy.health <= 0) {
                // Game over
                this.ctx.font = '30px Arial';
                this.ctx.fillText('Game over', this.ctx.canvas.width / 2, this.ctx.canvas.height / 2);
                return;
            }
            if (this.actionOutcomeStack.length > 0) {
                this.currentOutcomeElement = this.actionOutcomeStack.pop();
                this.currentOutcomeElement.start();
            } else {
                if (this.turnCount % 2 === 0) {
                    if (this.hasTurnEnded) {
                        this.hasTurnEnded = false;
                        this.eventHandler.emit(new BeforeTurnEndEvent(this.player, this.enemy, this));
                    } else {
                        this.hasTurnEnded = true;
                        this.eventHandler.emit(new TurnEndEvent(this.player, this.enemy, this));
                        this.turnCount++;
                    }
                } else {
                    if (this.hasTurnEnded) {
                        this.hasTurnEnded = false;
                        this.eventHandler.emit(new BeforeTurnEndEvent(this.enemy, this.player, this));
                    } else {
                        this.hasTurnEnded = true;
                        this.eventHandler.emit(new TurnEndEvent(this.enemy, this.player, this));
                        this.turnCount++;
                    }
                }
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