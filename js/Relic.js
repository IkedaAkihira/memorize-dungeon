function createRelic(id) {
    switch (id) {
        case 'poisonJar':
            return new PoisonJar();
        case 'spike':
            return new Spike();
        case 'poisonGas':
            return new PoisonGas();
        case 'growingSuit':
            return new GrowingSuit();
        case 'regenMachine':
            return new RegenMachine();
        case 'powerMachine':
            return new PowerMachine();
        case 'energySource':
            return new EnergySource();
        case 'poisonSword':
            return new PoisonSword();
        case 'chargeSword':
            return new ChargeSword();
        case 'energySword':
            return new EnergySword();
        case 'catalystSword':
            return new CatalystSword();
        case 'lightSword':
            return new LightSword();
        case 'stinkyTank':
            return new StinkyTank();
        case 'lightningJar':
            return new LightningJar();
        case 'poisonEvolver':
            return new PoisonEvolver();
        case 'energyCharger':
            return new EnergyCharger();
        case 'hexKnives':
            return new HexKnives();
        case 'cursedPuppet':
            return new CursedPuppet();
        case 'holyWater':
            return new HolyWater();
        case 'minion':
            return new Minion();
        default:
            return null;
    }
}

class Relic extends EventHandler{
    /**
     * 
     * @param {String} id
     * @param {String} name 
     * @param {String} description 
     * @param {HTMLImageElement} image 
     */
    constructor(id, name, description, image, relatedEffectIds = [], actions = []) {
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
        /** @type {Array<String>} */
        this.relatedEffectIds = relatedEffectIds;
        /** @type {Array<Action>} */
        this.actions = actions;
    }

    /**
     * Called when the player picks up the relic
     * @param {Character} player 
     */
    onEquip(player) {
        // Override this method
        this.player = player;
        for (const action of this.actions) {
            player.addAction(action);
        }
    }

    
}

class PoisonJar extends Relic {
    constructor() {
        const image = document.createElement('img');
        image.src = 'img/relics/poison_jar.png';
        super('poisonJar', '毒瓶', '問題に正解するたび、相手に1の毒を付与する。', image, ['poison']);
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
        super('spike', 'スパイク', '問題に正解するたびに、相手に3ダメージを与える。', image);
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
        super('poisonGas', '毒ガス', 'ターン開始時、相手に2の毒を付与する。', image, ['poison']);
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
        super(
            'growingSuit', 
            '成長するスーツ', 
            '問題に正解するたびに、筋力を1得る。この筋力はターン終了時に失われる。\nターン開始時に、「裁き」を2得る。', 
            image,
            ['strength', 'judgement']);
    }

    emit(event) {
        if (event.type === 'answerCorrect') {
            event.floor.actionOutcomeStack.push(new GainStrengthElement(1, event.target, true));
        } else if(event.type === 'turnStart' && event.target === this.player) {
            this.player.addEffect(new JudgementEffect(2, this.player));
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
        super('powerMachine', '筋力強化装置', 'ターン開始時、筋力を1得る。', image, ['strength']);
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
        super('energySource', 'エネルギー源', 'ターン開始時、エネルギーを2得る。', image, ['energy']);
    }

    emit(event) {
        if (event.type === 'turnStart' && event.target === this.player) {
            event.floor.actionOutcomeStack.push(new GainEnergyElement(2, event.target));
        }
    }
}

class PoisonSword extends Relic {
    constructor() {
        const image = document.createElement('img');
        image.src = 'img/relics/poison_sword.png';
        super('poisonSword', '毒の剣', '行動に「ポイズン・ストライク」を追加する。', image, [], [new PoisonStrikeAction(10, 3)]);
    }
}

class ChargeSword extends Relic {
    constructor() {
        const image = document.createElement('img');
        image.src = 'img/relics/charge_sword.png';
        super('chargeSword', '充電の剣', '行動に「チャージ・ストライク」を追加する。', image, [], [new ChargeStrikeAction(10, 3)]);
    }
}

class EnergySword extends Relic {
    constructor() {
        const image = document.createElement('img');
        image.src = 'img/relics/energy_sword.png';
        super('energySword', 'エナジーの剣', '行動に「エナジー・ストライク」を追加する。', image, [], [new EnergyStrikeAction(20, 3)]);
    }
}

class CatalystSword extends Relic {
    constructor() {
        const image = document.createElement('img');
        image.src = 'img/relics/catalyst_sword.png';
        super('catalystSword', '触媒の剣', '行動に「カタリスト・ストライク」を追加する。', image, [], [new CatalystStrikeAction(10, 2)]);
    }
}

class LightSword extends Relic {
    constructor() {
        const image = document.createElement('img');
        image.src = 'img/relics/light_sword.png';
        super('lightSword', '軽量の剣', '行動に「連続斬り」を追加する。', image, [], [new ContinuousSlashAction(2, 10)]);
    }
}

class StinkyTank extends Relic {
    constructor() {
        const image = document.createElement('img');
        image.src = 'img/relics/stinky_tank.png';
        super('stinkyTank', '悪臭のタンク', '行動に「スティンキー・スプレー」を追加する。', image, [], [new StinkySprayAction(3, 3)]);
    }
}

class LightningJar extends Relic {
    constructor() {
        const image = document.createElement('img');
        image.src = 'img/relics/lightning_jar.png';
        super('lightningJar', '雷の瓶', '行動に「ライトニング」を追加する。', image, [], [new LightningAction(5)]);
    }
}

class PoisonEvolver extends Relic {
    constructor() {
        const image = document.createElement('img');
        image.src = 'img/relics/poison_evolver.png';
        super('poisonEvolver', '毒進化装置', '行動に「エボルブ・ポイズン」を追加する。', image, [], [new EvolvePoisonAction(5)]);
    }
}

class EnergyCharger extends Relic {
    constructor() {
        const image = document.createElement('img');
        image.src = 'img/relics/energy_charger.png';
        super('energyCharger', 'エナジー充電器', '行動に「チャージ・エナジー」を追加する。', image, [], [new ChargeEnergyAction(3, 3)]);
    }
}

class HexKnives extends Relic {
    constructor() {
        const image = document.createElement('img');
        image.src = 'img/relics/hex_knives.png';
        super('hexKnives', 'ヘックス・ナイフ', '行動に「ヘックス・ナイフ」を追加する。', image, [], [new HexKnivesAction(5, 6)]);
    }
}

class CursedPuppet extends Relic {
    constructor() {
        const image = document.createElement('img');
        image.src = 'img/relics/cursed_puppet.png';
        super('cursedPuppet', '呪いの人形', 'ターン終了時、相手が毒を持っているならば、毒の数だけダメージを与える。', image, ['poison']);
    }

    emit(event) {
        if (event.type === 'turnEnd' && event.target === this.player) {
            if (event.opponent.effects.hasOwnProperty('poison')) {
                event.floor.actionOutcomeStack.push(new SlashElement(event.opponent.effects['poison'].amount, event.opponent));
            }
        }
    }
}

class HolyWater extends Relic {
    constructor() {
        const image = document.createElement('img');
        image.src = 'img/relics/holy_water.png';
        super('holyWater', '聖水', '問題に正解するたびに、体力を1回復する。', image);
    }

    emit(event) {
        if (event.type === 'answerCorrect') {
            event.floor.actionOutcomeStack.push(new HealElement(1, event.target));
        }
    }
}

class Minion extends Relic {
    constructor() {
        const image = document.createElement('img');
        image.src = 'img/relics/minion.png';
        super('minion', '手下', 'ターン開始時、エネルギーを3消費して、相手に10ダメージを与える。', image, ['energy']);
    }

    emit(event) {
        if (event.type === 'turnStart' && event.target === this.player) {
            if (event.target.effects.hasOwnProperty('energy') && event.target.effects['energy'].amount >= 3) {
                event.floor.actionOutcomeStack.push(new SlashElement(10, event.opponent));
                event.target.effects['energy'].amount -= 3;
                if (event.target.effects['energy'].amount === 0) {
                    event.target.removeEffect('energy');
                }
            }
        }
    }
}