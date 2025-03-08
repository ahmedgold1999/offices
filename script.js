const questions = [
    { question: "ما هو نوع البيانات الذي يستخدم لتخزين النصوص في JavaScript؟", answers: ["int", "string", "boolean", "float"], correct: 1 },
    { question: "ما هو الامتداد الرئيسي لملفات HTML؟", answers: [".css", ".html", ".js", ".php"], correct: 1 },
];

for (let i = 0; i < 48; i++) {
    questions.push({
        question: `سؤال رقم ${i + 3}: ما هو مفهوم البرمجة ${i % 3 === 0 ? "كائنية التوجه" : "الإجرائية"}؟`,
        answers: ["مفهوم حديث", "نهج برمجي", "أداة تطوير", "لغة برمجة"],
        correct: 1
    });
}

let currentQuestionIndex = 0;
let score = 0;
let studentName = "";
let timeRemaining = 3600; // 60 دقيقة

const questionText = document.getElementById("question-text");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-button");
const startButton = document.getElementById("start-button");
const studentNameInput = document.getElementById("student-name");
const questionContainer = document.getElementById("question-container");
const studentNameDisplay = document.getElementById("student-name-display");
const questionNumbers = document.getElementById("question-numbers");
const header = document.getElementById("header");
const studentNameContainer = document.getElementById("student-name-container");
const examInfo = document.getElementById("exam-info");
const timerDisplay = document.getElementById("timer");

startButton.addEventListener("click", () => {
    studentName = studentNameInput.value.trim();
    if (studentName === "") {
        alert("يرجى إدخال اسم الطالب الرباعي قبل بدء الامتحان.");
        return;
    }
    studentNameDisplay.innerText = `الطالب: ${studentName}`;
    header.style.display = "none";
    studentNameContainer.style.display = "none";
    examInfo.style.display = "flex";
    questionContainer.style.display = "block";
    startQuiz();
    startTimer();
});

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    questionNumbers.innerHTML = "";
    nextButton.style.display = "none";
    questions.forEach((_, index) => {
        const numDiv = document.createElement("div");
        numDiv.innerText = index + 1;
        numDiv.classList.add("question-number");
        questionNumbers.appendChild(numDiv);
    });
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionText.innerText = currentQuestion.question;
    questionNumbers.children[currentQuestionIndex].classList.add("answered");

    currentQuestion.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.innerText = answer;
        button.classList.add("btn");
        button.onclick = () => selectAnswer(index, button);
        answerButtons.appendChild(button);
    });
}

function selectAnswer(index, button) {
    button.classList.add("selected");
    button.parentNode.childNodes.forEach(btn => btn.onclick = null);
    nextButton.style.display = "block";
}

function startTimer() {
    setInterval(() => {
        if (timeRemaining <= 0) {
            alert("انتهى الوقت!");
        }
        timeRemaining--;
        timerDisplay.innerText = `الوقت المتبقي: ${Math.floor(timeRemaining / 60)}:${timeRemaining % 60}`;
    }, 1000);
}
