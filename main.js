
const questions = [
    {
        question: "Какой материк всегда покрыт снегом и льдами?",
        answer: [
            { text: "Евразия", correct: false},
            { text: "Антарктида", correct: true},
            { text: "Северная Америка", correct: false},
            { text: "Африка", correct: false},
        ]
    },
    {
        question: "У какого животного самая длинная шея?",
        answer: [
            { text: "Змея", correct: false},
            { text: "Утконос", correct: false},
            { text: "Страус", correct: false},
            { text: "Жираф", correct: true},
        ]
    },
    {
        question: "Год какого животного будет 2024?",
        answer: [
            { text: "Петух", correct: false},
            { text: "Крыса", correct: false},
            { text: "Дракон", correct: true},
            { text: "Тигр", correct: false},
        ]
    }
];

const questionElem = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElem.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElem.innerHTML = `Правильных ответов ${score} из ${questions.length}`;
    nextButton.innerHTML = "Сыграть снова";
    nextButton.style.display = "block";
}




function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});


startQuiz();