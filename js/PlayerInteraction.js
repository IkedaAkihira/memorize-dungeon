let actionCode = '';
let isActionBusy = true;

const actionList = document.querySelector('.action-list');
const quizDialog = document.getElementById('quiz-dialog');
const answerDialog = document.getElementById('answer-dialog');
const showAnswerButton = document.getElementById('quiz-dialog-show-answer');
const correctAnswerButton = document.getElementById('correct-answer');
const wrongAnswerButton = document.getElementById('wrong-answer');
const actionDetailDialog = document.getElementById('action-detail-dialog');

const actionNameElement = document.getElementById('action-detail-dialog-name');
const actionDescriptionElement = document.getElementById('action-detail-dialog-description-text');
const actionExecuteButton = document.getElementById('action-detail-dialog-execute');
const actionCancelButton = document.getElementById('action-detail-dialog-cancel');
const actionEffectsElement = document.getElementById('action-detail-dialog-effects');

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

actionExecuteButton.addEventListener('click', () => {
    const actionId = actionExecuteButton.dataset.actionId;
    if (actionId === undefined) {
        return;
    }
    actionCode = actionId;
});

actionCancelButton.addEventListener('click', () => {
    actionDetailDialog.close();
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
    const actionName = event.currentTarget.dataset.actionName;
    const actionDescription = event.currentTarget.dataset.actionDescription;
    const relatedEffectIds = JSON.parse(event.currentTarget.dataset.relatedEffectIds);
    if (actionId === undefined) {
        return;
    }
    actionNameElement.innerHTML = actionName;
    actionDescriptionElement.innerHTML = actionDescription;
    actionExecuteButton.dataset.actionId = actionId;
    actionEffectsElement.innerHTML = '';
    for (const effectId of relatedEffectIds) {
        actionEffectsElement.innerHTML += getEffectDetailHTMLText(effectId);
    }
    actionDetailDialog.showModal();
}

function getEffectDetailHTMLText(effectId) {
    const effectDetail = EffectDetails[effectId];
    return ''+
    `<div class="action-detail-dialog-effect">`+
    `    <img class="action-detail-dialog-effect-image" src="${effectDetail.icon}" alt="effect"/>`+
    `    <div class="action-detail-dialog-effect-content">`+
    `        <div class="action-detail-dialog-effect-content-name">`+
    `            ${effectDetail.name}`+
    `        </div>`+
    `        <div class="action-detail-dialog-effect-content-description">`+
    `            ${effectDetail.description}`+
    `        </div>`+
    `    </div>`+
    `</div>`;
}

function getActionDetailHTMLText(action) {
    return ''+
    `<div class="action-detail-dialog-effect">`+
    // `    <img class="action-detail-dialog-effect-image" src="${effectDetail.icon}" alt="effect"/>`+
    `    <div class="action-detail-dialog-effect-content">`+
    `        <div class="action-detail-dialog-effect-content-name">`+
    `            ${action.name}`+
    `        </div>`+
    `        <div class="action-detail-dialog-effect-content-description">`+
    `            ${action.description}`+
    `        </div>`+
    `    </div>`+
    `</div>`;
}

addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        event.preventDefault();
    }
});