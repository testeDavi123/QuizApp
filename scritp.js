const questoes = [
    {
        pergunta: "Qual o maior animal do mundo?",
        respostas:[
            {texto: "Tubarão", correto: false},
            {texto: "Baleia azul", correto: true},
            {texto: "Elefante", correto: false},
            {texto: "Girafa", correto: false},
        ]
    },
    {
        pergunta: "Qual a menor cidade do mundo?",
        respostas:[
            {texto: "Cidade do vaticano", correto: true},
            {texto: "Bhutan", correto: false},
            {texto: "São Paulo", correto: false},
            {texto: "Shri Lanka", correto: false},
        ]
    },
    {
        pergunta: "Qual o maior deserto do mundo?",
        respostas:[
            {texto: "Kalahari", correto: false},
            {texto: "Gobi", correto: false},
            {texto: "Sahara", correto: false},
            {texto: "Antartica", correto: true},
        ]
    },
    {
        pergunta: "Qual o menor continente do mundo?",
        respostas:[
            {texto: "Asia", correto: false},
            {texto: "Australia", correto: true},
            {texto: "Europa", correto: false},
            {texto: "Africa", correto: false},
        ]
    }
    
];

const questionElement = document.getElementById("question");
const answerButtons =  document.getElementById("answer-buttons");
const nextButton =  document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState()


    let currentQuestion = questoes[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.pergunta;

    currentQuestion.respostas.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.texto;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correto){
            button.dataset.correto = answer.correto;
           
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correto === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correto === "true"){
            button.classList.add("correct");
            
        }
        button.disabled = true;
    });
    nextButton.style.display = "block"
}

function showScore(){
    resetState();
    questionElement.innerHTML = `Sua pontuação total foi ${score} de ${questoes.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block"
}


function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questoes.length) {
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questoes.length) {
        handleNextButton();
    }else{
        startQuiz();
    }
});


startQuiz();