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
        this.audio = AudioResources.poison;
    }

    start() {
        super.start();
        this.startTime = Date.now();
        this.audio.pause();
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
        this.audio = AudioResources.superPoison;
    }

    start() {
        super.start();
        this.startTime = Date.now();
        this.audio.pause();
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

class AddPoisonElement extends ActionOutcomeElement {
    constructor(amount, target) {
        super();
        /** @type {number} */
        this.amount = amount;
        /** @type {Character} */
        this.target = target;
        /** @type {boolean} */
        this.hasAddedPoison = false;
        /** @type {number} */
        this.startTime = 0;
        /** @type {number} */
        this.frames = 8;
        /** @type {number} */
        this.animationTime = 500;
        /** @type {Image[]} */
        this.images = separateImages(document.getElementById('animation-poison'), this.frames, 1, 120, 120, 120, 120);
        /** @type {HTMLAudioElement} */
        this.audio = AudioResources.poison;
    }

    start() {
        super.start();
        this.startTime = Date.now();
        this.audio.pause();
        this.audio.currentTime = 0;
        this.audio.play();
    }

    update(delta, floor) {
        if (!this.hasAddedPoison && this.startTime + this.animationTime / 2 < Date.now()) {
            this.hasAddedPoison = true;
            this.target.addEffect(new PoisonEffect(this.amount, this.target));
        }

        if (this.startTime + this.animationTime < Date.now()) {
            this.isRunning = false;
            return;
        }

        // render
        floor.ctx.drawImage(this.images[Math.floor((Date.now() - this.startTime) / (this.animationTime / this.frames))], this.target.x - 60, this.target.y - 60, 120, 120);
    }
}

class HeavySlashElement extends ActionOutcomeElement {
    constructor(damage, target, source) {
        super();
        /** @type {number} */
        this.damage = damage;
        /** @type {Character} */
        this.target = target;
        /** @type {Character} */
        this.source = source;
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
        this.audio = AudioResources.heavySlash;
    }
    
    start() {
        super.start();
        this.startTime = Date.now();
        this.audio.pause();
        this.audio.currentTime = 0;
    }


    update(delta, floor) {
        if (!this.hasDealtDamage && this.startTime + this.animationTime / 2 < Date.now()) {
            this.hasDealtDamage = true;
            this.target.damage(this.damage, this.source, floor);
            this.audio.play();
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
    constructor(damage, target, source) {
        super();
        /** @type {number} */
        this.damage = damage;
        /** @type {Character} */
        this.target = target;
        /** @type {Character} */
        this.source = source;
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
        this.audio = AudioResources.slash;
    }
    
    start() {
        super.start();
        this.startTime = Date.now();
        this.audio.pause();
        this.audio.currentTime = 0;
    }


    update(delta, floor) {
        if (!this.hasDealtDamage && this.startTime + this.animationTime / 2 < Date.now()) {
            this.hasDealtDamage = true;
            this.target.damage(this.damage, this.source, floor);
            this.audio.play();
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
        this.audio = AudioResources.heavySlash;
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
            this.audio.pause();
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
        let rand = Math.floor(Math.random() * 2);
        if (rand === 0) {
            floor.player.damage(5, this.enemy, floor);
        } else {
            floor.player.addEffect(new PoisonEffect(3, floor.player));
        }
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
                floor.actionOutcomeStack.push(new SlashElement(10, floor.enemy, floor.player));
            }, () => {

            }));
        } else if (actionCode === 'heavy-strike') {
            floor.actionOutcomeStack.push(new QuizElement(() => {
                floor.actionOutcomeStack.push(new QuizElement(() => {
                    floor.actionOutcomeStack.push(new QuizElement(() => {
                        floor.actionOutcomeStack.push(new HeavySlashElement(25, floor.enemy, floor.player));
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
        /** @type {Quiz} */
        this.quiz = getRandomQuiz();
    }

    start() {
        super.start();
        showQuizDialog(this.quiz);
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
                this.isRunning = false;
                if (!this.quiz.isProtected)
                    this.quiz.solveCount++;
                this.quiz.lastSolveDate = new Date(new Date().setHours(0, 0, 0, 0));
                this.onCorrect();
                floor.eventHandler.emit(new AnswerCorrectEvent(floor.player, floor.enemy, floor));
                return;
            }
            if (actionCode === 'wrong-answer') {
                actionCode = '';
                this.isRunning = false;
                if (!this.quiz.isProtected)
                    this.quiz.solveCount = 0;
                else
                    this.quiz.solveCount = 1;
                this.quiz.lastSolveDate = new Date(new Date().setHours(0, 0, 0, 0));
                this.onWrong();
                floor.eventHandler.emit(new AnswerWrongEvent(floor.player, floor.enemy, floor));
                return;
            }
        }
    }
}

class GainStrengthElement extends ActionOutcomeElement {
    constructor(amount, target, isTemporary) {
        super();
        /** @type {number} */
        this.amount = amount;
        /** @type {Character} */
        this.target = target;
        /** @type {boolean} */
        this.hasDecreasedStrength = false;
        /** @type {number} */
        this.startTime = 0;
        /** @type {number} */
        this.frames = 10;
        /** @type {number} */
        this.animationTime = 500;
        /** @type {Image[]} */
        this.images = separateImages(document.getElementById(amount<0?'animation-power-down':'animation-power-up'), this.frames, 1, 120, 120, 120, 120);
        /** @type {HTMLAudioElement} */
        this.audio = amount<0?AudioResources.powerDown:AudioResources.powerUp;
        /** @type {boolean} */
        this.isTemporary = isTemporary;
    }

    start() {
        super.start();
        this.startTime = Date.now();
        this.audio.pause();
        this.audio.currentTime = 0;
        this.audio.play();
    }

    update(delta, floor) {
        if (!this.hasDecreasedStrength && this.startTime + this.animationTime / 2 < Date.now()) {
            this.hasDecreasedStrength = true;
            this.target.addEffect(new StrengthEffect(this.amount, this.target));
            if(this.isTemporary) {
                this.target.addEffect(new StrengthDownEffect(this.amount, this.target));
            }
        }

        if (this.startTime + this.animationTime < Date.now()) {
            this.isRunning = false;
            return;
        }

        // render
        floor.ctx.drawImage(this.images[Math.floor((Date.now() - this.startTime) / (this.animationTime / this.frames))], this.target.x - 60, this.target.y - 60, 120, 120);
    }
}

class HealElement extends ActionOutcomeElement {
    constructor(amount, target) {
        super();
        /** @type {number} */
        this.amount = amount;
        /** @type {Character} */
        this.target = target;
        /** @type {boolean} */
        this.hasHealed = false;
        /** @type {number} */
        this.startTime = 0;
        /** @type {number} */
        this.frames = 8;
        /** @type {number} */
        this.animationTime = 500;
        /** @type {Image[]} */
        this.images = separateImages(document.getElementById('animation-heal'), this.frames, 1, 120, 120, 120, 120);
        /** @type {HTMLAudioElement} */
        this.audio = AudioResources.heal;
    }

    start() {
        super.start();
        this.startTime = Date.now();
        this.audio.pause();
        this.audio.currentTime = 0;
        this.audio.play();
    }

    update(delta, floor) {
        if (!this.hasHealed && this.startTime + this.animationTime / 2 < Date.now()) {
            this.hasHealed = true;
            this.target.heal(this.amount, floor);
        }

        if (this.startTime + this.animationTime < Date.now()) {
            this.isRunning = false;
            return;
        }

        // render
        floor.ctx.drawImage(this.images[Math.floor((Date.now() - this.startTime) / (this.animationTime / this.frames))], this.target.x - 60, this.target.y - 60, 120, 120);
    }
}

class GainEnergyElement extends ActionOutcomeElement {
    constructor(amount, target) {
        super();
        /** @type {number} */
        this.amount = amount;
        /** @type {Character} */
        this.target = target;
        /** @type {boolean} */
        this.hasGainedEnergy = false;
        /** @type {number} */
        this.startTime = 0;
        /** @type {number} */
        this.frames = 14;
        /** @type {number} */
        this.animationTime = 500;
        /** @type {Image[]} */
        this.images = separateImages(document.getElementById('animation-energy'), this.frames, 1, 120, 120, 120, 120);
        /** @type {HTMLAudioElement} */
        this.audio = AudioResources.energy;
    }

    start() {
        super.start();
        this.startTime = Date.now();
        this.audio.pause();
        this.audio.currentTime = 0;
        this.audio.play();
    }

    update(delta, floor) {
        if (!this.hasGainedEnergy && this.startTime + this.animationTime / 2 < Date.now()) {
            this.hasGainedEnergy = true;
            this.target.addEffect(new EnergyEffect(this.amount, this.target));
        }

        if (this.startTime + this.animationTime < Date.now()) {
            this.isRunning = false;
            return;
        }

        // render
        floor.ctx.drawImage(this.images[Math.floor((Date.now() - this.startTime) / (this.animationTime / this.frames))], this.target.x - 60, this.target.y - 60, 120, 120);
    }
}