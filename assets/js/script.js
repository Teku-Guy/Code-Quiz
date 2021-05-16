const timerEl = document.querySelector("#timer");
const startBtn = document.querySelector('#start-btn');
const questionContainerEl = document.querySelector('#question-container');
const questionEl = document.querySelector('#question');
const answerBtnsEl = document.querySelector('#answer-btns');
const welcomeEl = document.querySelector('#welcome');

let shuffledQuestions, currentQuestionIndex;

let timeLeft = 5;
let points = 10;
let currentScore = 0;
let currentHighScore;

const stopCountdown = () => {
    clearInterval(countdown.interval);
};

const countdown = () => {
    var interval = setInterval(function(){
        timerEl.innerHTML = timeLeft;
        timeLeft--;
        if (timeLeft === 0){
            clearInterval(interval);
        }
    }, 1000);
};

function selectAnswer(e) {
    const selectedButton = e.target.id;
    let correct = false;
    console.log(shuffledQuestions[currentQuestionIndex].correctAnswer + selectedButton);
    if(shuffledQuestions[currentQuestionIndex].correctAnswer === selectedButton){
        correct = true;
        currentScore += points;
        console.log(currentScore);
    } else {
        correct = false;
    }
    setStatusClass(document.body, correct);
    Array.from(answerBtnsEl.children).forEach(button => {
      setStatusClass(button, button.dataset.correct);
    })
    console.log(shuffledQuestions.length);
    console.log(currentQuestionIndex);
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
      //nextButton.classList.remove('hide')
        currentQuestionIndex++;
        setNextQuestion();
    } else {
        alert();
    }
}
  
function setStatusClass(element, correct) {
    //clearStatusClass(element)
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
        console.log(questionArry.answers[letter]);

        btn.addEventListener('click', selectAnswer);
        answerBtnsEl.appendChild(btn);
    }
}

function setScore(){
    if(currentScore > currentHighScore){
        currentHighScore = currentScore;
    } 
}

function startQuiz() {
    timeLeft = 5; //reset timer
    welcomeEl.classList.add('hide')
    shuffledQuestions = questionListArry.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    questionContainerEl.classList.remove('hide');
    setNextQuestion();
    countdown(); //start out timer
    
}

startBtn.addEventListener('click', startQuiz);

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