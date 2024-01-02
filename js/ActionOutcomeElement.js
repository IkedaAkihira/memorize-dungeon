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
        /** @type {HTMLAudioElement} */
        this.audio = document.getElementById('audio-poison');
    }

    start() {
        super.start();
        this.startTime = Date.now();
        this.audio.currentTime = 0;
        this.audio.play();
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
        /** @type {HTMLAudioElement} */
        this.audio = document.getElementById('audio-super-poison');
    }

    start() {
        super.start();
        this.startTime = Date.now();
        this.audio.currentTime = 0;
        this.audio.play();
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
        floor.ctx.drawImage(this.images[Math.floor((Date.now() - this.startTime) / (this.animationTime / this.frames))], this.target.x - 60, this.target.y - 60, 120, 120);
    }
}

class HeavySlashElement extends ActionOutcomeElement {
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
        this.images = separateImages(document.getElementById('animation-heavy-slash'), this.frames, 1, 120, 120, 120, 120);
        /** @type {HTMLAudioElement} */
        this.audio = document.getElementById('audio-heavy-slash');
    }
    
    start() {
        super.start();
        this.startTime = Date.now();
        this.audio.currentTime = 0;
        this.audio.play();
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

class SlashElement extends ActionOutcomeElement {
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
        /** @type {HTMLAudioElement} */
        this.audio = document.getElementById('audio-slash');
    }
    
    start() {
        super.start();
        this.startTime = Date.now();
        this.audio.currentTime = 0;
        this.audio.play();
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

class EnemyAttackElement {
    constructor(enemy) {
        /** @type {boolean} */
        this.isRunning = false;
        /**@type {number} */
        this.startTime = 0;
        /** @type {number} */
        this.animationTime = 1000;
        /** @type {Character} */
        this.enemy = enemy;
        /** @type {number} */
        this.startX = this.enemy.x;
        /** @type {boolean} */
        this.hasAttacked = false;
        /** @type {HTMLAudioElement} */
        this.audio = document.getElementById('audio-heavy-slash');
    }

    start() {
        this.isRunning = true;
        this.startTime = Date.now();
    }

    /**
     * 
     * @param {number} delta
     * @param {DungeonFloor} floor
     */
    update(delta, floor) {
        if (this.startTime + this.animationTime / 2 < Date.now() && !this.hasAttacked) {
            this.attemptAttack(floor);
            this.audio.currentTime = 0;
            this.audio.play();
            this.hasAttacked = true;
        }
        if (this.startTime + this.animationTime < Date.now()) {
            this.isRunning = false;
            this.enemy.x = this.startX;
            return;
        }

        this.enemy.x = this.startX - 120 * this.f((Date.now() - this.startTime) / this.animationTime);
    }

    f(x) {
        return Math.max(0, Math.sin(x * Math.PI));
    }


    attemptAttack(floor) {
        floor.player.addEffect(new SuperPoisonEffect(2, floor.player));
    }
}

class PlayerInteractionElement {
    constructor() {
        /** @type {boolean} */
        this.isRunning = false;
    }

    start() {
        this.isRunning = true;
        isActionBusy = false;
    }

    update(delta, floor) {
        if (actionCode === '') {
            return;
        }

        if (actionCode === 'strike') {
            floor.actionOutcomeStack.push(new QuizElement(() => {
                floor.actionOutcomeStack.push(new SlashElement(10, floor.enemy));
            }, () => {

            }));
        } else if (actionCode === 'heavy-strike') {
            floor.actionOutcomeStack.push(new QuizElement(() => {
                floor.actionOutcomeStack.push(new QuizElement(() => {
                    floor.actionOutcomeStack.push(new QuizElement(() => {
                        floor.actionOutcomeStack.push(new HeavySlashElement(25, floor.enemy));
                    }, () => {}));
                }, () => {}));
            }, () => {}));
            // floor.actionOutcomeStack.push(new HeavySlashElement(25, floor.enemy));
        } else {
            console.log('Unknown action code: ' + actionCode);
            return;
        }

        actionCode = '';
        this.isRunning = false;
        isActionBusy = true;
    }
}

class QuizElement extends ActionOutcomeElement{
    constructor(onCorrect, onWrong) {
        super();
        /** @type {function} */
        this.onCorrect = onCorrect;
        /** @type {function} */
        this.onWrong = onWrong;
        /**
         * 0 = quiz
         * 1 = answer
         *  @type {number} */
        this.quizState = 0;
    }

    start() {
        super.start();
        showQuizDialog();
    }
    
    update(delta, floor) {
        if (this.quizState === 0) {
            if (actionCode === 'show-answer') {
                quizDialog.close();
                actionCode = '';
                this.quizState = 1;
                showAnswerDialog();
            }
            return;
        }

        if (this.quizState === 1) {
            if (actionCode === 'correct-answer') {
                actionCode = '';
                this.onCorrect();
                this.isRunning = false;
                return;
            }
            if (actionCode === 'wrong-answer') {
                actionCode = '';
                this.onWrong();
                this.isRunning = false;
                return;
            }
        }
    }
}