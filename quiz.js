// questions

const questions = [
    {
        question: "What does the 'typeof' operator return when used on an array in JavaScript?",
        answers: [
            { text: "object", correct: true },
            { text: "array", correct: false },
            { text: "undefined", correct: false },
            { text: "function", correct: false }
        ]
    },
    {
        question: "Which statement correctly declares a variable in JavaScript?",
        answers: [
            { text: "let myVariable = 10;", correct: false },
            { text: "const myVariable = 10;", correct: false },
            { text: "var myVariable = 10;", correct: false },
            { text: "all of the above", correct: true }
        ]
    },
    {
        question: "What does the 'NaN' stand for in JavaScript?",
        answers: [
            { text: "Not a Null", correct: false },
            { text: "Not a Number", correct: true },
            { text: "No Action Needed", correct: false },
            { text: "Null and Negative", correct: false }
        ]
    },
    {
        question: "Which of the following is a correct way to check if a variable is undefined in JavaScript?",
        answers: [
            { text: "if (myVar === undefined)", correct: false },
            { text: "if (typeof myVar === 'undefined')", correct: true },
            { text: "if (myVar == null)", correct: false },
            { text: "if (!myVar)", correct: false }
        ]
    },
    {
        question: "Which of the following statements about closures in JavaScript is true?",
        answers: [
            { text: "Closures can only be created with arrow functions.", correct: false },
            { text: "Closures allow functions to access variables from their containing scope even after the scope has closed.", correct: true },
            { text: "Closures are only used in asynchronous JavaScript code.", correct: false },
            { text: "Closures can only be created using the 'this' keyword.", correct: false }
        ]
    },
    {
        question: "What does the 'bind' method do in JavaScript?",
        answers: [
            { text: "Binds a function to an object.", correct: false },
            { text: "Binds event listeners to DOM elements.", correct: false },
            { text: "Binds a value to a variable.", correct: false },
            { text: "Binds a function to a specific execution context.", correct: true }
        ]
    },
    {
        question: "Which of the following is NOT a valid way to comment in JavaScript?",
        answers: [
            { text: "// This is a single-line comment", correct: false },
            { text: "/* This is a multi-line comment */", correct: false },
            { text: "'< ! - - This is a comment - - >'", correct: true },
            { text: "# This is a comment", correct: false }
        ]
    },
    {
        question: "What is the purpose of the 'use strict' directive in JavaScript?",
        answers: [
            { text: "It enables strict mode, which catches common coding mistakes and 'unsafe' actions.", correct: true },
            { text: "It allows the use of strict comparison operators.", correct: false },
            { text: "It forces the browser to use the latest JavaScript version.", correct: false },
            { text: "It prevents the use of external libraries in a script.", correct: false }
        ]
    }
];

// questions functionality 

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex=0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        else{
            button.classList.add("incorrect");
        }
        button.disabled = true;
    })
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You Scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click", () =>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})

startQuiz();

