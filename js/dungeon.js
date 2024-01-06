const dungeonCanvas = document.getElementById('dungeon');

const playerImage = new Image(240, 240);
playerImage.src = 'img/characters/hero.png';
const enemyImage = new Image(240, 240);
enemyImage.src = 'img/characters/dummy.png';
const player = new Player('Player', 100, [], 100, playerImage);


let floor;

initFloor(1);

let lastTime = 0;

function update() {
    if (isRelicSelectionDialogOpen) {
        return;
    }
    if (!floor.isRunning) {
        initFloor(floor.floorCount + 1);
        openSelectRelicDialog();
        return;
    }
    const time = Date.now();
    const delta = time - lastTime;
    lastTime = time;
    floor.update(delta);
}

function initFloor(floorCount) {
    const enemy = new Character('Enemy', 100, enemyImage);
    floor = new BattleFloor(dungeonCanvas.getContext('2d'), player, enemy, floorCount);

    player.x = 120;
    player.y = dungeonCanvas.height / 2;
    // player.addEffect(new SuperPoisonEffect(5, player));
    // player.addRelic(new Suicidy());
    // player.addRelic(new PoisonJar());


    enemy.x = dungeonCanvas.width - 120;
    enemy.y = dungeonCanvas.height / 2;
    // enemy.addEffect(new PoisonEffect(5, enemy));
}

setInterval(update, 1000 / 30, 0);