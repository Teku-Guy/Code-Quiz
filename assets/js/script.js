const timerEl = document.querySelector("#timer");
const startBtn = document.querySelector('#start-btn');
const questionContainerEl = document.querySelector('#question-container');
const questionEl = document.querySelector('#question');
const answerBtnsEl = document.querySelector('#answer-btns');
const welcomeEl = document.querySelector('#welcome');
const scoreEl = document.querySelector('.score');
const currentScoreEl = document.querySelector('#currentScore');
const finalScore = document.querySelector('#final-score');
const highscoreFormEL = document.querySelector('#highscore-form');
const endGameEl = document.querySelector('#end-game');
const inputGroupEl = document.querySelector('.input-group');

let gameState = false;
let shuffledQuestions, currentQuestionIndex;

let timeLeft = 5;
let points = 10;
let currentScore = 0;
let currentHighScore;

const countdown = () => {
    timeLeft = 5;
    var interval = setInterval(function(){
        timerEl.innerHTML = timeLeft;
        timeLeft--;
        if (timeLeft === 0){
            clearInterval(interval);
            gameState = false;
            endGame();
        }
    }, 1000);
};

var submitHighScore = function(event) {
    event.preventDefault();

    var listItemEl = document.createElement("li"); 
    listItemEl.className = "Test"; 
    listItemEl.textContent = "this is a test"; 
    highscoreFormEL.appendChild(listItemEl);
    inputGroupEl.classList.add('hide');
}

function selectAnswer(e) {
    const selectedButton = e.target.id;
    let correct = false;
    if(shuffledQuestions[currentQuestionIndex].correctAnswer === selectedButton){
        correct = true;
        setScore(correct);
    } else {
        correct = false;
        setScore(correct);
    }
    setStatusClass(scoreEl, correct);
    Array.from(answerBtnsEl.children).forEach(button => {
      setStatusClass(button, correct);
    });

    console.log(currentScoreEl.innerText);

    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        currentQuestionIndex++;
        setNextQuestion();
    } else {
        gameState = false;
        endGame();
    }
}

function endGame() {
    if(!gameState){
        questionContainerEl.classList.add('hide');
        scoreEl.classList.add('hide');
        endGameEl.classList.remove('hide');
        finalScore.innerText = currentScore;
        //window.location = "./highscores.html";
    }
    
    if(currentScore > currentHighScore){
        currentHighScore = currentScore;
    }
    
}

function setScore(a){
    if(a){
        debugger;
        currentScore += points;
        currentScoreEl.innerText = currentScore;
    }
}
  
function setStatusClass(element, correct) {
    if (correct) {
      element.classList.add('correct');
    } else {
      element.classList.add('wrong');
    }
  }
  
function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
  }
  

function resetState() {
    //startBtn.classList.add('hide');
    while (answerBtnsEl.firstChild) {
        answerBtnsEl.removeChild(answerBtnsEl.firstChild);
    }
}


const setNextQuestion = () => {
    resetState();
    renderQuestion(shuffledQuestions[currentQuestionIndex]);
};

function renderQuestion(questionArry) {
    questionEl.innerText = questionArry.question;
    for(letter in questionArry.answers){
        const btn = document.createElement('button');
        btn.innerText = letter + ".) " + questionArry.answers[letter];
        btn.classList.add('btn');
        btn.classList.add('btn-primary');
        btn.setAttribute('id', letter);

        btn.addEventListener('click', selectAnswer);
        answerBtnsEl.appendChild(btn);
    }
}

function startQuiz() {
    gameState = true;
    countdown(); //start out timer
    welcomeEl.classList.add('hide')
    shuffledQuestions = questionListArry.sort(() => Math.random() - .5);
    scoreEl.classList.remove('hide');
    currentQuestionIndex = 0;
    questionContainerEl.classList.remove('hide');
    setNextQuestion();
    
}

startBtn.addEventListener('click', startQuiz);
highscoreFormEL.addEventListener('submit', submitHighScore);

const questionListArry = [
    // {
    //     question: 'What is 4 * 2?',
    //     answers: [
    //     { text: '6', correct: false },
    //     { text: '8', correct: true }
    //     ]
    // },
    {
      question: "Which one of these is a JavaScript package manager?",
      answers: {
        a: "Node.js",
        b: "TypeScript",
        c: "npm",
        d: 'HTML'
      },
      correctAnswer: "c"
    },
    {
      question: "Which tool can you use to ensure code quality?",
      answers: {
        a: "Angular",
        b: "jQuery",
        c: "RequireJS",
        d: "ESLint"
      },
      correctAnswer: "d"
    }
  ];