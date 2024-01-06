const selectRelicDialog = document.getElementById('select-relic-dialog');


let relics = [];
let unselectedRelics = [
    new PoisonJar(),
    new Spike(),
    new PoisonGas()
];

let relicSelections = [];

function getRandomRelic() {
    if (relics.length === 0) {
        relics = unselectedRelics;
        shuffle(relics);
        unselectedRelics = [];
    }
    if (relics.length === 0) {
        return null;
    }
    return relics.pop();
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const rand = Math.floor(Math.random() * (i + 1));
        [array[i], array[rand]] = [array[rand], array[i]];
    }
}

function initRelicSelections() {
    relicSelections = [];
    for (let i = 0; i < 3; i++) {
        const relic = getRandomRelic();
        if (relic == null) {
            break;
        }
        relicSelections.push(relic);
    }
}

let isRelicSelectionDialogOpen = false;

function openSelectRelicDialog() {
    initRelicSelections();
    if (relicSelections.length === 0) {
        return;
    }
    isRelicSelectionDialogOpen = true;
    const items = selectRelicDialog.querySelectorAll('.select-relic-dialog-relic-item');
    for (const item of items) {
        item.dataset.selectionIdx = -1;
        item.querySelector('img').src = '';
        item.querySelector('.select-relic-dialog-relic-item-name').innerText = '';
        item.querySelector('.select-relic-dialog-relic-item-description').innerText = '';
    }
    for (let i = 0; i < relicSelections.length; i++) {
        items[i].dataset.selectionIdx = i;
        items[i].querySelector('img').src = relicSelections[i].image.src;
        items[i].querySelector('.select-relic-dialog-relic-item-name').innerText = relicSelections[i].name;
        items[i].querySelector('.select-relic-dialog-relic-item-description').innerText = relicSelections[i].description;
    }
    selectRelicDialog.showModal();
}

for (const item of selectRelicDialog.querySelectorAll('.select-relic-dialog-relic-item')) {
    item.addEventListener('click', (e) => {
        const selectionIdx = e.currentTarget.dataset.selectionIdx;
        if (selectionIdx == -1) {
            return;
        }
        player.addRelic(relicSelections[selectionIdx]);
        unselectedRelics = unselectedRelics.concat(relicSelections.filter((_, idx) => idx != selectionIdx));
        selectRelicDialog.close();
        isRelicSelectionDialogOpen = false;
    });
}