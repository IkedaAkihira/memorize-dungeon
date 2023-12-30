const dungeonCanvas = document.getElementById('dungeon');

const player = new Player('Player', 100, new Image('img/hero.png'));
const enemy = new Character('Enemy', 100, new Image('img/slime.png'));


const floor = new BattleFloor(dungeonCanvas.getContext('2d'), player, enemy);


player.addEffect(new PoisonEffect(3));