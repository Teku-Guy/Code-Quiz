const timerEl = document.querySelector("#timer");
const startBtn = document.querySelector('#start-btn');
const questionContainerEl = document.querySelector('#question-container');
const questionEl = document.querySelector('#question');
const answerBtnsEl = document.querySelector('#answer-btns');
const welcomeEl = document.querySelector('#welcome');
const scoreEl = document.querySelector('.score');
const currentScoreEl = document.querySelector('#currentScore');
const finalScore = document.querySelector('#final-score');
const highscoreFormEl = document.querySelector('#highscore-form');
const endGameEl = document.querySelector('#end-game');
const inputGroupEl = document.querySelector('.input-group');

let gameState = false;
let shuffledQuestions, currentQuestionIndex, userName, userScore;

let userNameArry = JSON.parse(localStorage.getItem("userName") || "[]");
let userScoreArry = JSON.parse(localStorage.getItem("userScore") || "[]");

let timeLeft = 10;
let points = 10;
let currentScore = 0;
let currentHighScore;
let interval 

let startTimer = function() {
    timerEl.innerText = timeLeft;
    timeLeft--;
    if (timeLeft === 0 || !gameState){
        clearInterval(interval);
        endGame();
        // //} else if (){
        //     debugger;
        //     clearInterval(interval);
        //     timerEl.innerText = 0;
        //     return endGame(false);
        //     console.log(shuffledQuestions.length + " " + (currentQuestionIndex + 1));
        }
}

let countdown = () => {
    interval = setInterval(startTimer, 1000);   
};

let highScoreHandler = function(event) {
    event.preventDefault();

    const usernameInput = document.querySelector("input[name='user-name']").value;
    if (usernameInput === "") {
        alert("You need to fill out your username in form!");
        return false;
    }

    let hsDataObj = {
        username: usernameInput,
        score: currentScore
    };

    submitHighScore(hsDataObj);

    
};

let submitHighScore = function(obj) {
    let unorderedListEl = document.createElement('ul');
    unorderedListEl.className = "list-group";
    let listItemEl = document.createElement('li');
    listItemEl.className = "list-group-item d-flex justify-content-between align-items-center user-info";
    listItemEl.innerHTML = obj.username + "<span class='badge bg-secondary' id='user-score'>" + obj.score + "</span>";

    unorderedListEl.appendChild(listItemEl);
    highscoreFormEl.appendChild(unorderedListEl);

    
    userNameArry.push(obj.username);
    userScoreArry.push(obj.score);

    userName = localStorage.setItem('userName', JSON.stringify(userNameArry));
    userScore = localStorage.setItem('userScore', JSON.stringify(userScoreArry));
};

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
        timerEl.innerText = 0;
        questionContainerEl.classList.add('hide');
        scoreEl.classList.add('hide');
        endGameEl.classList.remove('hide');
        finalScore.innerText = currentScore;

        //window.location = "./highscores.html";
    }
    if(userName !== null && userScore !== null){
        let prevScoreInfoEl = document.createElement("div");
        prevScoreInfoEl.className = "card";
        prevScoreInfoEl.innerHTML = "<div class='card-body'> <h1 class='card-title text-center'>Previous Scores</h1>  </div>";
        
        let prevHsListEl = document.createElement("ul");
        prevHsListEl.className = "list-group";
        
        debugger;
        for(var i = userNameArry.length - 1; i >= 0; i--){
            debugger;
            let prevListItemEl = document.createElement('li');
            prevListItemEl.className = "list-group-item d-flex justify-content-between align-items-center user-info";
            prevListItemEl.innerHTML = userNameArry[i] + "<span class='badge bg-secondary' id='user-score'>" + userScoreArry[i] + "</span>";
            console.log(userNameArry[i]);
            prevHsListEl.appendChild(prevListItemEl);
        }
        
        prevScoreInfoEl.appendChild(prevHsListEl);
        endGameEl.appendChild(prevScoreInfoEl);
    }
    
}

function setScore(a){
    if(a){
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
highscoreFormEl.addEventListener('submit', highScoreHandler);

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