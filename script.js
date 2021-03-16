
var questionEl = document.getElementById('question');
var answersEl = document.getElementById('answers');


var questions = [
    {id:1, question: "1e question", answers:["This is the first answer","2","3","4"], correctAnswerNumber:"3"},
    {id:2, question: "2e question", answers:["1","2","3","4"], correctAnswerNumber:"3"},
    {id:3, question: "bluh", answers:["1","2","3","4"], correctAnswerNumber:"3"},
    {id:4, question: "bleh", answers:["1","2","3","4"], correctAnswerNumber:"3"}
]

var score = 0

var state = 0

function countdown() {
    var timeLeft = 5;
    var timeInterval = setInterval(function() {
      if (timeLeft > 1) {
        $("#countdown").text(timeLeft)
        timeLeft--;
      } else if (timeLeft === 1) {
        $("#countdown").text(timeLeft)
        timeLeft--;
      } else {
        $("#countdown").text(0)
        clearInterval(timeInterval);
      }
    }, 1000);
  } 

  function startQuiz(){
    $("#quiz").css("display","flex")
    $("#start-menu").css("display","none")
    countdown();
    generateQuestion();
    state++;  
    generateAnswers();
  }



function generateQuestion(){
    $("#question").text(questions[state].question)
    $("#question").attr("id",`${questions[state].id}`)  
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
    var answerChoice12 = document.getElementById("answerChoice1-2");
    answerChoice12.onclick = checkAnswer
}
 
function checkAnswer(){
 
  console.log("bwahahaha")
} 




$("#start").click(function(){startQuiz()})
