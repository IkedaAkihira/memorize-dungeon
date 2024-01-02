let actionCode = '';
let isActionBusy = true;

const strikeButton = document.getElementById('strike');
const heabyStrikeButton = document.getElementById('heavy-strike');
const quizDialog = document.getElementById('quiz-dialog');
const answerDialog = document.getElementById('answer-dialog');
const showAnswerButton = document.getElementById('quiz-dialog-show-answer');
const correctAnswerButton = document.getElementById('correct-answer');
const wrongAnswerButton = document.getElementById('wrong-answer');

strikeButton.addEventListener('click', () => {
    if (isActionBusy) {
        return;
    }
    actionCode = 'strike';
});

heabyStrikeButton.addEventListener('click', () => {
    if (isActionBusy) {
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

const quizzes = [
    ['\\[1 + 1\\]', '\\[2\\]'],
    ["Accommodate", "収容する"],
    ["Commence", "始める"],
    ["Diligent", "勤勉な"],
    ["Facilitate", "促進する"],
    ["Inquire", "尋ねる"],
    ["Negligible", "取るに足らない"],
    ["Obtain", "手に入れる"],
    ["Relinquish", "放棄する"],
    ["Unprecedented", "前例のない"],
    ["Withhold", "保留する"]
]

function showQuizDialog() {
    const quiz = quizzes[Math.floor(Math.random() * quizzes.length)];
    const quizText = document.getElementById('quiz-dialog-question');
    const answerText = document.getElementById('answer-dialog-answer');
    quizText.innerHTML = quiz[0];
    answerText.innerHTML = quiz[1];
    MathJax.Hub.Typeset(quizDialog);
    MathJax.Hub.Typeset(answerDialog);
    quizDialog.showModal();
}

function showAnswerDialog() {
    answerDialog.showModal();
}

addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        event.preventDefault();
    }
});