var timerEl = document.getElementById('countdown');
var startMenu = document.getElementById('start-menu');
var startBtn = document.getElementById('start');
var quizEl = document.getElementById('quiz');
var questionEl = document.getElementById('question');
var answersEl = document.getElementById('answers');


var questions = [
    {id:1, question: "1e question", answers:["This is the first answer","2","3","4"], correctAnswerNumber:"3"},
    {id:2, question: "2e question", answers:["1","2","3","4"], correction:[true,false,false,false]},
    {id:3, question: "bluh", answers:["1","2","3","4"], correction:[true,false,false,false]},
    {id:4, question: "bleh", answers:["1","2","3","4"], correction:[true,false,false,false]}
]

var score = 0

var state = 0

function countdown() {
    var timeLeft = 5;
    var timeInterval = setInterval(function() {
      if (timeLeft > 1) {
        timerEl.textContent = timeLeft;
        timeLeft--;
      } else if (timeLeft === 1) {
        timerEl.textContent = timeLeft;
        timeLeft--;
      } else {
         timerEl.textContent = 0;
        clearInterval(timeInterval);
      }
    }, 1000);
  } 

  function startQuiz(){
    quizEl.style.display = "flex";
    startMenu.style.display = "none";
    countdown();
    generateQuestion();
    generateAnswers();
    state++;    
  }



function generateQuestion(){
    questionEl.textContent = questions[state].question;
    questionEl.style.display= "block"
    questionEl.setAttribute("id",questions[state].id)
}

function generateAnswers(){
    for(var i=0;i<questions.length;i++){
        var answerChoice = document.createElement("BUTTON");
        var textnode = document.createTextNode(questions[state].answers[i]);
        answerChoice.className = "col-12 btn btn-outline-primary"
        answerChoice.setAttribute("id","answerChoice" + state + "-" + (i+1))
        answerChoice.appendChild(textnode);
        answersEl.appendChild(answerChoice);
    }
}
 

startBtn.onclick = startQuiz;