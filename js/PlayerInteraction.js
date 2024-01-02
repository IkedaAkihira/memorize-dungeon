let actionCode = '';
let isBusy = true;

const strikeButton = document.getElementById('strike');
const heabyStrikeButton = document.getElementById('heavy-strike');
const quizDialog = document.getElementById('quiz-dialog');
const answerDialog = document.getElementById('answer-dialog');
const showAnswerButton = document.getElementById('quiz-dialog-show-answer');
const correctAnswerButton = document.getElementById('correct-answer');
const wrongAnswerButton = document.getElementById('wrong-answer');

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


quizDialog.addEventListener('close', () => {
    if (actionCode === '') {
        actionCode = 'show-answer';
    }
});

answerDialog.addEventListener('close', () => {
    if (actionCode === '') {
        actionCode = 'wrong-answer';
    }
});

showAnswerButton.addEventListener('click', () => {
    actionCode = 'show-answer';
    quizDialog.close();
});

correctAnswerButton.addEventListener('click', () => {
    actionCode = 'correct-answer';
    answerDialog.close();
});

wrongAnswerButton.addEventListener('click', () => {
    actionCode = 'wrong-answer';
    answerDialog.close();
});