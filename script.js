const questions = [
    { question: "ما هو نوع البيانات الذي يستخدم لتخزين النصوص في JavaScript؟", answers: ["int", "string", "boolean", "float"], correct: 1 },
    { question: "ما هو الامتداد الرئيسي لملفات HTML؟", answers: [".css", ".html", ".js", ".php"], correct: 1 },
    { question: "ما هو العنصر الأساسي في CSS لتغيير لون الخلفية؟", answers: ["background-color", "color", "border", "font-size"], correct: 0 },
    { question: "ما هو بروتوكول الإنترنت الأكثر استخدامًا لنقل صفحات الويب؟", answers: ["FTP", "HTTP", "TCP", "SMTP"], correct: 1 },
];

// إنشاء 46 سؤالًا إضافيًا ليصبح العدد 50
for (let i = 0; i < 46; i++) {
    questions.push({
        question: `سؤال رقم ${i + 5}: ما هو مفهوم البرمجة ${i % 3 === 0 ? "كائنية التوجه" : "الإجرائية"}؟`,
        answers: ["مفهوم حديث", "نهج برمجي", "أداة تطوير", "لغة برمجة"],
        correct: 1
    });
}

let currentQuestionIndex = 0;
let score = 0;
let studentName = "";

const questionText = document.getElementById("question-text");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-button");
const scoreText = document.getElementById("score-text");
const startButton = document.getElementById("start-button");
const studentNameInput = document.getElementById("student-name");
const questionContainer = document.getElementById("question-container");
const studentNameContainer = document.getElementById("student-name-container");

// عند الضغط على "التالي"، يبدأ الامتحان بعد إدخال اسم الطالب
startButton.addEventListener("click", () => {
    studentName = studentNameInput.value.trim();
    if (studentName === "") {
        alert("يرجى إدخال اسم الطالب قبل بدء الاختبار.");
        return;
    }
    studentNameContainer.style.display = "none";
    questionContainer.style.display = "block";
    startQuiz();
});

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
    questionText.innerText = `الطالب: ${studentName}\n لقد حصلت على ${score} من ${questions.length}`;
    scoreText.innerText = "انتهى الاختبار! شكرًا لمشاركتك.";
}

startQuiz();
