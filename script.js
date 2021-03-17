var questions = [
  {question: "Commonly used data types DO not include ____ :", answers:["strings","booleans","alerts","numbers"], correctAnswerIndex:2},
  {question: "The condition in an if/else statement is enclosed with ____ :", answers:["quotes","curly brackets","parenthesis","square brackets"], correctAnswerIndex:2},
  {question: "A very useful tool used during development and debugging for printing content to the debugger is ____ :", answers:["javascript","terminal/bash","for loops","console.log"], correctAnswerIndex:3},
  {question: "Arrays in Javascript can be used to store ____ :", answers:["numbers and strings","other arrays","booleans","all of the above"], correctAnswerIndex:3}
]


//initial state when page loads
var state = 0
var score = 0
var questionNumber = state-1
$("#state").text(state)
$("#quiz").css("display","none")
$("#initials").css("display","none")
$("#high-scores").css("display","none")
$("#correction").css("display","none")

//Independent functions
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

function updateState(){
  state++
  $("#state").text(state)
}

function generateQuestion(){
  if(state > questions.length){
      $("#question").remove()
      $("#initials").css("display","flex")
      $("#score").append(score)
      console.log(score)
  } else {
      $("#question").text(questions[state-1].question)
  }
}

function generateAnswers(){
  if(state > questions.length){
      $("#answers").remove()
  } else {
      for(var i=0;i<questions[state-1].answers.length;i++){
      var answer = questions[state-1].answers[i]
      $("#answers").append(`<button class="col-12 btn btn-outline-primary" id=${state}-${i}><li>${answer}</li></button>`)
      }
  }
}

function erasePreviousAnswers(){
  $(`[id*=${state-1}-]`).each(function() {
      $(this).css("display","none")})
}


//Groups of functions
function nextQuestion(){
  updateState()
  erasePreviousAnswers()
  generateQuestion()
  generateAnswers()
}

function checkAnswerAndNext() {
  $("#answers").on("click", "button", function() {
     var answerID = $(this).attr("id")
     if(answerID == state + "-" + questions[state-1].correctAnswerIndex){
          score++ 
          nextQuestion()
         $("#correction").css("display","flex")
         $("#correction").text("You answered correctly to the previous question!").css("color","green")
     } else {
          nextQuestion()
          $("#correction").css("display","flex")
          $("#correction").text("You answered incorrectly to the previous question!").css("color","red")
     }
  })
}

function startQuiz(){
  $("#start-menu").css("display","none")
  $("#quiz").css("display","flex")
  countdown();
  updateState()
  generateQuestion();
  generateAnswers();
  checkAnswerAndNext()
}


function buildHighScoresEntry(initials,score){
  var highScores =  JSON.parse(localStorage.getItem("highScores"))
  if(!highScores){
    var highScores = []
    var newEntry = {"initials":initials,"score":score}
    highScores.push(newEntry)
    localStorage.setItem("highScores",JSON.stringify(highScores))
  } else {
    var newEntry = {"initials":initials,"score":score}
    highScores.push(newEntry)
    localStorage.setItem("highScores",JSON.stringify(highScores))
  }
}
/* 
function scoreTable(){
  var highScores =  JSON.parse(localStorage.getItem("highScores"))
  for(var i = 0; i < highScores.length; i++){
    $("#")
  }
} */

// Actionable buttons
$("#start").click(function(){startQuiz()})

$("#initials").submit(function(event){
  event.preventDefault()
  updateState()
  $("#initials").css("display","none")
  $("#high-scores").css("display","flex")
  var initials = $("#myInitials").val()

  buildHighScoresEntry(initials,score)

})