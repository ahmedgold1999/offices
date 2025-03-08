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
let answeredQuestions = new Array(questions.length).fill(false);
let timeRemaining = 3600;

const questionText = document.getElementById("question-text");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-button");
const finishButton = document.getElementById("finish-button");
const startButton = document.getElementById("start-button");
const studentNameInput = document.getElementById("student-name");
const questionContainer = document.getElementById("question-container");
const studentNameDisplay = document.getElementById("student-name-display");
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

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion();
    }
});

finishButton.addEventListener("click", () => {
    let unanswered = answeredQuestions.includes(false);
    if (unanswered) {
        let confirmEnd = confirm("لديك أسئلة غير مكتملة، هل أنت متأكد من إنهاء الامتحان؟");
        if (!confirmEnd) return;
    }
    endExam();
});

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionText.innerText = currentQuestion.question;
    
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
    answeredQuestions[currentQuestionIndex] = true;
    nextButton.style.display = "block";
}

function startTimer() {
    setInterval(() => {
        if (timeRemaining <= 0) endExam();
        timeRemaining--;
        timerDisplay.innerText = `الوقت المتبقي: ${Math.floor(timeRemaining / 60)}:${timeRemaining % 60}`;
    }, 1000);
}

function endExam() {
    alert(`انتهى الامتحان! الدرجة: ${score}/${questions.length}`);
}
