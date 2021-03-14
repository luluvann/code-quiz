var timerEl = document.getElementById('countdown');
var startMenu = document.getElementById('start-menu');
var startBtn = document.getElementById('start');
var quizEl = document.getElementById('quiz');
var questionEl = document.getElementById('question');
var answersEl = document.getElementById('answers');


var questions = [
    {id:1, question: "1e question", answers:["This is the first answer","2","3","4"], correctAnswer:"3"},
    {id:2, question: "2e question", answers:["1","2","3","4"], correctAnswer:"1"},
    {id:3, question: "bluh", answers:["1","2","3","4"], correctAnswer:"3"},
    {id:4, question: "bleh", answers:["1","2","3","4"], correctAnswer:"3"}
]

var score = 0


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
         timerEl.textContent = '';
        clearInterval(timeInterval);
      }
    }, 1000);
  } 

  function startQuiz(){
    // Hide the Welcome Quiz Code screen and makes the Quiz section appear
    quizEl.style.display = "flex"
    startMenu.style.display = "none"

    // Display the 1st question  
    questionEl.textContent = questions[0].question;
    questionEl.style.display= "block"
    questionEl.setAttribute("id",questions[0].id)

    // Display the answer choices elements for the 1st question
    for(var i=0;i<questions.length;i++){
        var answerChoice = document.createElement("BUTTON");
        var textnode = document.createTextNode(questions[0].answers[i]);
        answerChoice.className = "col-12 btn btn-outline-primary"
        answerChoice.setAttribute("id","answer" + (i+1))
        answerChoice.appendChild(textnode);
        answersEl.appendChild(answerChoice);
        
        var answer1 = document.getElementById('answer1')
        var answer2 = document.getElementById('answer2')
        var answer3 = document.getElementById('answer3')
        var answer4 = document.getElementById('answer4')


    }
    countdown()
  }


  

  startBtn.onclick = startQuiz;