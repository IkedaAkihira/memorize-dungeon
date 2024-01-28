const selectRelicDialog = document.getElementById('select-relic-dialog');

const relicDetailDialog = document.getElementById('relic-detail-dialog');
const relicNameElement = document.getElementById('relic-detail-dialog-name');
const relicDescriptionElement = document.getElementById('relic-detail-dialog-description-text');
const relicEffectsElement = document.getElementById('relic-detail-dialog-effects');
const relicImageElement = document.getElementById('relic-detail-dialog-image');
const relicObtainButton = document.getElementById('relic-detail-dialog-obtain');
const relicCancelButton = document.getElementById('relic-detail-dialog-cancel');


let relics = [];
let unselectedRelics = [
    new PoisonJar(),
    new Spike(),
    new PoisonGas(),
    new GrowingSuit(),
    new PowerMachine(),
    new RegenMachine(),
    new EnergySource(),
    new PoisonSword(),
    new ChargeSword(),
    new EnergySword(),
    new CatalystSword(),
    new LightSword(),
    new PoisonEvolver(),
    new LightningJar(),
    new StinkyTank(),
    new EnergyCharger(),
    new HexKnives(),
    new CursedPuppet(),
    new HolyWater(),
    new Minion()
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
        item.querySelector('img').src = item.dataset.imageSrc = '';
        item.querySelector('.select-relic-dialog-relic-item-name').innerText = item.dataset.name = '';
        item.querySelector('.select-relic-dialog-relic-item-description').innerText = item.dataset.description = '';
        item.dataset.relatedEffectIds = '[]';
    }
    for (let i = 0; i < relicSelections.length; i++) {
        items[i].dataset.selectionIdx = i;
        items[i].querySelector('img').src = items[i].dataset.imgSrc = relicSelections[i].image.src;
        items[i].querySelector('.select-relic-dialog-relic-item-name').innerText = items[i].dataset.name = relicSelections[i].name;
        items[i].querySelector('.select-relic-dialog-relic-item-description').innerText = items[i].dataset.description = relicSelections[i].description;
        items[i].dataset.relatedEffectIds = JSON.stringify(relicSelections[i].relatedEffectIds);
    }
    selectRelicDialog.showModal();
}

for (const item of selectRelicDialog.querySelectorAll('.select-relic-dialog-relic-item')) {
    item.addEventListener('click', onRelicSelected);
}

function onRelicSelected(event) {
    const selectionIdx = event.currentTarget.dataset.selectionIdx;
    const relicImageSrc = event.currentTarget.dataset.imgSrc;
    const relicName = event.currentTarget.dataset.name;
    const relicDescription = event.currentTarget.dataset.description;
    const relatedEffectIds = JSON.parse(event.currentTarget.dataset.relatedEffectIds);
    if (selectionIdx == -1) {
        return;
    }
    console.log(event.currentTarget.dataset);
    relicImageElement.src = relicImageSrc;
    relicNameElement.innerHTML = relicName;
    relicDescriptionElement.innerHTML = relicDescription;
    relicObtainButton.dataset.selectionIdx = selectionIdx;
    relicEffectsElement.innerHTML = '';
    for (const action of relicSelections[selectionIdx].actions) {
        relicEffectsElement.innerHTML += getActionDetailHTMLText(action);
        relatedEffectIds.push(...action.relatedEffectIds);
    }
    for (const effectId of relatedEffectIds) {
        relicEffectsElement.innerHTML += getEffectDetailHTMLText(effectId);
    }
    relicDetailDialog.showModal();
}

relicObtainButton.addEventListener('click', (e) => {
    const selectionIdx = e.currentTarget.dataset.selectionIdx;
    player.addRelic(relicSelections[selectionIdx]);
    unselectedRelics = unselectedRelics.concat(relicSelections.filter((_, idx) => idx != selectionIdx));
    selectRelicDialog.close();
    relicDetailDialog.close();
    isRelicSelectionDialogOpen = false;
});

relicCancelButton.addEventListener('click', () => {
    relicDetailDialog.close();
});