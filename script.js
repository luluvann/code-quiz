
var questionEl = document.getElementById('question');
var answersEl = document.getElementById('answers');


var questions = [
    {id:1, question: "1e question", answers:["This is the first answer","2","3","4","5"], correctAnswerNumber:"3"},
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
    state++;  
    generateQuestion();
    generateAnswers();
  }



function generateQuestion(){
    $("#question").text(questions[state-1].question)
    $("#question").attr("id",`${questions[state-1].id}`)
    $("#state").text(state)  
}

function generateAnswers(){
    for(var i=0;i<questions[state-1].answers.length;i++){
        var answer = questions[state-1].answers[i]
        $("#answers").append(`<button class="col-12 btn btn-outline-primary" id=${i+1}>${answer}</button>`)
    }
}
 
function checkAnswer(){
 
  console.log("bwahahaha")
} 




$("#start").click(function(){startQuiz()})
