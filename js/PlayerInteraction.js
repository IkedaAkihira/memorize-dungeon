let actionCode = '';
let isActionBusy = true;

const actionList = document.querySelector('.action-list');
const quizDialog = document.getElementById('quiz-dialog');
const answerDialog = document.getElementById('answer-dialog');
const showAnswerButton = document.getElementById('quiz-dialog-show-answer');
const correctAnswerButton = document.getElementById('correct-answer');
const wrongAnswerButton = document.getElementById('wrong-answer');

const relicList = document.querySelector('.relic-list');


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

/**
 * @param {Quiz} quiz 
 */
function showQuizDialog(quiz) {
    const quizText = document.getElementById('quiz-dialog-question');
    const answerText = document.getElementById('answer-dialog-answer');
    quizText.innerText = quiz.question;
    answerText.innerText = quiz.answer;
    MathJax.Hub.Typeset(quizDialog);
    MathJax.Hub.Typeset(answerDialog);
    quizDialog.showModal();
}

function showAnswerDialog() {
    answerDialog.showModal();
}

function onActionButtonClick(event) {
    if (isActionBusy) {
        return;
    }
    const actionId = event.currentTarget.dataset.actionId;
    if (actionId === undefined) {
        return;
    }
    actionCode = actionId;

}

addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        event.preventDefault();
    }
});