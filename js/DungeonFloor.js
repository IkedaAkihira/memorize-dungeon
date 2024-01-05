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
        /** 
         * 0 = Before player's turn start
         * 1 = Player's turn start
         * 2 = Player's turn
         * 3 = Before player's turn end
         * 4 = Player's turn end
         * 5 = Before enemy's turn start
         * 6 = Enemy's turn start
         * 7 = Enemy's turn
         * 8 = Before enemy's turn end
         * 9 = Enemy's turn end
         * @type {number} */
        this.turnState = 0;
        /** @type {number} */
        this.floorCount = 1;
    }

    update(delta) {

        // Render the player and the enemy
        this.ctx.fillStyle = 'black';
        this.ctx.strokeStyle = 'white';
        this.ctx.lineWidth = 0.3;
        const effectIconSize = 50;
        const effectIconMargin = 5;


        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.font = '30px Arial';
        this.ctx.fillText(`Floor ${this.floorCount}`, this.ctx.canvas.width / 2, 30);
        
        // Render the player
        this.ctx.drawImage(this.player.image, this.player.x - this.player.image.width / 2, this.player.y - this.player.image.height / 2, this.player.image.width, this.player.image.height);
        // Render the player's effects
        this.ctx.font = 'bolder 25px Arial';
        const effects = Object.values(this.player.effects);
        for (let i = 0; i < effects.length; i++) {
            this.ctx.drawImage(effects[i].image, this.player.x - this.player.image.width / 2 + i * (effectIconSize + effectIconMargin), this.player.y + this.player.image.height / 2, effectIconSize, effectIconSize);
            this.ctx.fillText(effects[i].amount, this.player.x - this.player.image.width / 2 + i * (effectIconSize + effectIconMargin), this.player.y + this.player.image.height / 2 + effectIconSize);
            this.ctx.strokeText(effects[i].amount, this.player.x - this.player.image.width / 2 + i * (effectIconSize + effectIconMargin), this.player.y + this.player.image.height / 2 + effectIconSize);
        }
        // Render the player's health
        this.ctx.font = '30px Arial';
        this.ctx.fillText(this.player.health, this.player.x - this.player.image.width / 2, this.player.y + this.player.image.height / 2);
        
        // Render the enemy
        this.ctx.drawImage(this.enemy.image, this.enemy.x - this.enemy.image.width / 2, this.enemy.y - this.enemy.image.height / 2, this.enemy.image.width, this.enemy.image.height);
        // Render the enemy's effects
        this.ctx.font = 'bolder 25px Arial';
        const enemyEffects = Object.values(this.enemy.effects);
        for (let i = 0; i < enemyEffects.length; i++) {
            this.ctx.drawImage(enemyEffects[i].image, this.enemy.x - this.enemy.image.width / 2 + i * (effectIconSize + effectIconMargin), this.enemy.y + this.enemy.image.height / 2, effectIconSize, effectIconSize);
            this.ctx.fillText(enemyEffects[i].amount, this.enemy.x - this.enemy.image.width / 2 + i * (effectIconSize + effectIconMargin), this.enemy.y + this.enemy.image.height / 2 + effectIconSize);
            this.ctx.strokeText(enemyEffects[i].amount, this.enemy.x - this.enemy.image.width / 2 + i * (effectIconSize + effectIconMargin), this.enemy.y + this.enemy.image.height / 2 + effectIconSize);
        }
        // Render the enemy's health
        this.ctx.font = '30px Arial';
        this.ctx.fillText(this.enemy.health, this.enemy.x - this.enemy.image.width / 2, this.enemy.y + this.enemy.image.height / 2);
        
        
        // Update action outcome elements
        if (this.currentOutcomeElement == null) {
            if (this.player.health <= 0) {
                // Game over
                this.ctx.font = '30px Arial';
                this.ctx.fillText('Game over', this.ctx.canvas.width / 2, this.ctx.canvas.height / 2);
                return;
            }
            if (this.enemy.health <= 0) {
                const enemyImage = new Image(240, 240);
                enemyImage.src = 'img/characters/dummy.png';
                this.enemy = new Character('Enemy', 100, enemyImage);
                this.enemy.x = dungeonCanvas.width - 120;
                this.enemy.y = dungeonCanvas.height / 2;

                this.player.effects = {};
                this.turnCount = 0;
                this.turnState = 0;
                this.floorCount++;
                return;
            }
            if (this.actionOutcomeStack.length > 0) {
                this.currentOutcomeElement = this.actionOutcomeStack.pop();
                this.currentOutcomeElement.start();
            } else {
                if (this.turnState === 0) {
                    this.turnCount++;
                    this.eventHandler.emit(new BeforeTurnStartEvent(this.player, this.enemy, this));
                } else if (this.turnState === 1) {
                    this.eventHandler.emit(new TurnStartEvent(this.player, this.enemy, this));
                } else if (this.turnState === 2) {
                    // Player's turn
                    this.player.action(this);
                } else if (this.turnState === 3) {
                    this.eventHandler.emit(new BeforeTurnEndEvent(this.player, this.enemy, this));
                } else if (this.turnState === 4) {
                    this.eventHandler.emit(new TurnEndEvent(this.player, this.enemy, this));
                } else if (this.turnState === 5) {
                    this.eventHandler.emit(new BeforeTurnStartEvent(this.enemy, this.player, this));
                } else if (this.turnState === 6) {
                    this.eventHandler.emit(new TurnStartEvent(this.enemy, this.player, this));
                } else if (this.turnState === 7) {
                    // Enemy's turn
                    this.enemy.action(this);
                } else if (this.turnState === 8) {
                    this.eventHandler.emit(new BeforeTurnEndEvent(this.enemy, this.player, this));
                } else if (this.turnState === 9) {
                    this.eventHandler.emit(new TurnEndEvent(this.enemy, this.player, this));
                }

                this.turnState = (this.turnState + 1) % 10;

                
            }
        }
        this.currentOutcomeElement.update(delta, this);
        if (!this.currentOutcomeElement.isRunning) {
            this.currentOutcomeElement = null;
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