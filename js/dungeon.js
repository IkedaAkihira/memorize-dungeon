const dungeonCanvas = document.getElementById('dungeon');

const playerImage = new Image(240, 240);
playerImage.src = 'img/characters/hero.png';
const enemyImage = new Image(240, 240);
enemyImage.src = 'img/characters/dummy.png';
const player = new Player('Player', 100, [], 100, playerImage);
const enemy = new Character('Enemy', 100, enemyImage);


const floor = new BattleFloor(dungeonCanvas.getContext('2d'), player, enemy);

player.x = 120;
player.y = dungeonCanvas.height / 2;
// player.addEffect(new SuperPoisonEffect(5, player));
// player.addRelic(new Suicidy());

enemy.x = dungeonCanvas.width - 120;
enemy.y = dungeonCanvas.height / 2;
// enemy.addEffect(new PoisonEffect(5, enemy));

let lastTime = 0;

function update() {
    const time = Date.now();
    const delta = time - lastTime;
    lastTime = time;
    floor.update(delta);
}

setInterval(update, 1000 / 30, 0);