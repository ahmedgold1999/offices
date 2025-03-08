const questions = [
    { question: "ما هو نوع البيانات الذي يستخدم لتخزين النصوص في JavaScript؟", answers: ["int", "string", "boolean", "float"], correct: 1 },
    { question: "ما هو الامتداد الرئيسي لملفات HTML؟", answers: [".css", ".html", ".js", ".php"], correct: 1 },
    { question: "ما هو العنصر الأساسي في CSS لتغيير لون الخلفية؟", answers: ["background-color", "color", "border", "font-size"], correct: 0 },
    { question: "ما هو بروتوكول الإنترنت الأكثر استخدامًا لنقل صفحات الويب؟", answers: ["FTP", "HTTP", "TCP", "SMTP"], correct: 1 },
    { question: "أي لغة برمجة تستخدم بشكل أساسي لتطوير تطبيقات Android؟", answers: ["Python", "Swift", "Kotlin", "C#"], correct: 2 },
    { question: "ما هو المفهوم الذي يمثل إعادة استخدام الكود في البرمجة؟", answers: ["التجريد", "التوريث", "التعددية", "الكبسلة"], correct: 1 },
    { question: "ما هو دور 'div' في HTML؟", answers: ["عنصر تفاعلي", "عنصر إدخال", "عنصر تقسيم", "عنصر صوتي"], correct: 2 },
    { question: "ما هو اسم لغة الاستعلام المستخدمة في قواعد البيانات؟", answers: ["HTML", "CSS", "SQL", "JavaScript"], correct: 2 },
    { question: "ما هو الاختصار الذي يشير إلى 'واجهة برمجة التطبيقات'؟", answers: ["API", "UI", "IDE", "SDK"], correct: 0 },
    { question: "ما هي أسرع وحدة تخزين في الحاسوب؟", answers: ["HDD", "SSD", "RAM", "USB"], correct: 2 },
];

// إنشاء 40 سؤالًا إضافيًا تلقائيًا لنصل إلى 50 سؤال
for (let i = 0; i < 40; i++) {
    questions.push({
        question: `سؤال رقم ${i + 11}: ما هو مفهوم البرمجة ${i % 3 === 0 ? "كائنية التوجه" : "الإجرائية"}؟`,
        answers: ["مفهوم حديث", "نهج برمجي", "أداة تطوير", "لغة برمجة"],
        correct: 1
    });
}

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
    scoreText.innerText = "انتهى الاختبار! شكرًا لمشاركتك.";
}

startQuiz();
