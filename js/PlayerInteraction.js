let actionCode = '';
let isBusy = true;

const strikeButton = document.getElementById('strike');
const heabyStrikeButton = document.getElementById('heavy-strike');

strikeButton.addEventListener('click', () => {
    if (isBusy) {
        return;
    }
    actionCode = 'strike';
});

heabyStrikeButton.addEventListener('click', () => {
    if (isBusy) {
        return;
    }
    actionCode = 'heavy-strike';
});