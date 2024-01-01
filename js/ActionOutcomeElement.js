class ActionOutcomeElement {
    constructor() {
        /** @type {boolean} */
        this.isRunning = false;
    }

    start() {
        this.isRunning = true;
    }

    /**
     * 
     * @param {number} delta
     * @param {DungeonFloor} floor
     */
    update(delta, floor) {
        // Override this method
    }
}

class PoisonDamageElement extends ActionOutcomeElement {
    constructor(damage, target) {
        super();
        /** @type {number} */
        this.damage = damage;
        /** @type {Character} */
        this.target = target;
        /** @type {boolean} */
        this.hasDealtDamage = false;
        /** @type {number} */
        this.startTime = 0;
        /** @type {number} */
        this.frames = 8;
        /** @type {number} */
        this.animationTime = 500;
        /** @type {Image[]} */
        this.images = separateImages(document.getElementById('animation-poison'), this.frames, 1, 120, 120, 120, 120);
    }

    start() {
        super.start();
        this.startTime = Date.now();
    }

    update(delta, floor) {
        if (!this.hasDealtDamage && this.startTime + this.animationTime / 2 < Date.now()) {
            this.hasDealtDamage = true;
            this.target.damage(this.damage, null, floor);
        }

        if (this.startTime + this.animationTime < Date.now()) {
            this.target.effects['poison'].amount--;
            if(this.target.effects['poison'].amount <= 0) {
                this.target.removeEffect('poison');
            }
            this.isRunning = false;
            return;
        }

        // render
        console.log(this.images);
        console.log(Math.floor((Date.now() - this.startTime) / (this.animationTime / this.frames)));
        floor.ctx.drawImage(this.images[Math.floor((Date.now() - this.startTime) / (this.animationTime / this.frames))], this.target.x - 60, this.target.y - 60, 120, 120);
    }
}

class SuperPoisonElement extends ActionOutcomeElement {
    constructor(amount, target) {
        super();
        /** @type {number} */
        this.amount = amount;
        /** @type {Character} */
        this.target = target;
        /** @type {boolean} */
        this.hasDealtDamage = false;
        /** @type {number} */
        this.startTime = 0;
        /** @type {number} */
        this.frames = 8;
        /** @type {number} */
        this.animationTime = 500;
        /** @type {Image[]} */
        this.images = separateImages(document.getElementById('animation-super-poison'), this.frames, 1, 120, 120, 120, 120);
    }

    start() {
        super.start();
        this.startTime = Date.now();
    }

    update(delta, floor) {
        if (!this.hasDealtDamage && this.startTime + this.animationTime / 2 < Date.now()) {
            this.hasDealtDamage = true;
            this.target.addEffect(new PoisonEffect(this.amount, this.target));
        }

        if (this.startTime + this.animationTime < Date.now()) {
            this.target.effects['superPoison'].amount--;
            if(this.target.effects['superPoison'].amount <= 0) {
                this.target.removeEffect('superPoison');
            }
            this.isRunning = false;
            return;
        }

        // render
        console.log(this.images);
        console.log(Math.floor((Date.now() - this.startTime) / (this.animationTime / this.frames)));
        floor.ctx.drawImage(this.images[Math.floor((Date.now() - this.startTime) / (this.animationTime / this.frames))], this.target.x - 60, this.target.y - 60, 120, 120);
    }
}

class SuicidyElement extends ActionOutcomeElement {
    constructor(damage, target) {
        super();
        /** @type {number} */
        this.damage = damage;
        /** @type {Character} */
        this.target = target;
        /** @type {boolean} */
        this.hasDealtDamage = false;
        /** @type {number} */
        this.startTime = 0;
        /** @type {number} */
        this.frames = 5;
        /** @type {number} */
        this.animationTime = 300;
        /** @type {Image[]} */
        this.images = separateImages(document.getElementById('animation-slash'), this.frames, 1, 120, 120, 120, 120);
    }
    
    start() {
        super.start();
        this.startTime = Date.now();
    }


    update(delta, floor) {
        if (!this.hasDealtDamage) {
            this.hasDealtDamage = true;
            this.target.damage(this.damage, null, floor);
        }

        if (this.startTime + this.animationTime < Date.now()) {
            this.isRunning = false;
            return;
        }

        // render
        floor.ctx.drawImage(this.images[Math.floor((Date.now() - this.startTime) / (this.animationTime / this.frames))], this.target.x - 60, this.target.y - 60, 120, 120);
    }
}