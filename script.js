const questions = [
    { question: "ما هو أكبر كوكب في المجموعة الشمسية؟", answers: ["الأرض", "المريخ", "المشتري", "زحل"], correct: 2 },
    { question: "ما هو العنصر الكيميائي الذي يرمز له بـ O؟", answers: ["أكسجين", "ذهب", "فضة", "حديد"], correct: 0 },
    { question: "كم عدد قارات العالم؟", answers: ["5", "6", "7", "8"], correct: 2 },
];

let currentQuestionIndex = 0;
let score = 0;

const questionText = document.getElementById("question-text");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-button");
const scoreText = document.getElementById("score-text");

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.style.display = "none";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionText.innerText = currentQuestion.question;
    currentQuestion.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.innerText = answer;
        button.classList.add("btn");
        button.onclick = () => selectAnswer(index);
        answerButtons.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = "none";
    answerButtons.innerHTML = "";
}

function selectAnswer(index) {
    let correctIndex = questions[currentQuestionIndex].correct;
    if (index === correctIndex) {
        score++;
    }
    nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
});

function showScore() {
    resetState();
    questionText.innerText = `لقد حصلت على ${score} من ${questions.length}`;
    scoreText.innerText = "انتهى الاختبار!";
}

startQuiz();
