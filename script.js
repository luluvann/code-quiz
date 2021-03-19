var questions = [
  {question: "Commonly used data types DO not include ____ :", answers:["strings","booleans","alerts","numbers"], correctAnswerIndex:2},
  {question: "The condition in an if/else statement is enclosed with ____ :", answers:["quotes","curly brackets","parenthesis","square brackets"], correctAnswerIndex:2},
  {question: "A very useful tool used during development and debugging for printing content to the debugger is ____ :", answers:["javascript","terminal/bash","for loops","console.log"], correctAnswerIndex:3},
  {question: "Arrays in Javascript can be used to store ____ :", answers:["numbers and strings","other arrays","booleans","all of the above"], correctAnswerIndex:3}
]
//initial state when page loads
var state = 0
var score = 0
var timeLeft = 60
/* $("#state").text(state) */
$("#timer").css("display","none")
$("#quiz").css("display","none")
$("#initials").css("display","none")
$("#high-scores").css("display","none")
$("#correction").css("display","none")

//Independent functions
var timeInterval

function countdown(timeLeft) {

  if(timeInterval != null){
    clearInterval(timeInterval)
  } 
  timeInterval = setInterval(function() {
    if (timeLeft > 1) {
      $("#countdown").text(timeLeft)
      timeLeft--;
    } else if (timeLeft === 1) {
      $("#countdown").text(timeLeft)
      timeLeft--;
    } else {
      $("#countdown").text(0)
      $("#quiz").css("display","none")
      $("#initials").css("display","flex")
      $("#score").text(score)
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
      $("#question").empty()
      $("#question").css("display","none")
      $("#initials").css("display","flex")
      $("#score").text(score)
      clearInterval(timeInterval)
  } else {
      $("#question").empty()
      $("#question").css("display","flex")
      $("#question").text(questions[state-1].question)
  }
}

function generateAnswers(){
  if(state > questions.length){
      $("#answers").empty()
      $("#answers").css("display","none")
  } else {
      $("#answers").empty()
      $("#answers").css("display","flex")
      for(var i=0;i<questions[state-1].answers.length;i++){
        var answer = questions[state-1].answers[i]
        $("#answers").append(`<button class="col-12 btn btn-outline-primary" id=${state}-${i}><li>${answer}</li></button>`)
      }
  }
}

//Groups of functions
function startQuiz(){
  $("#start-menu").css("display","none")
  $("#quiz").css("display","flex")
  $("#timer").css("display","block")
  $("#viewHighScores").css("display","none")
  countdown(timeLeft);
  updateState()
  generateQuestion();
  generateAnswers();
}

function nextQuestion(){
  updateState()
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
         $("#correction").fadeOut(2000);
     } else {
          var newTimeLeft = $("#countdown").text() - 10 
          countdown(newTimeLeft)
          nextQuestion()
          $("#correction").css("display","flex")
          $("#correction").text("You answered incorrectly to the previous question!").css("color","red")
          $("#correction").fadeOut(2000);
     }
  })
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

function scoreTable(){
  var highScores =  JSON.parse(localStorage.getItem("highScores"))
  $("#highScoresTable").empty()
  for(var i = 0; i < highScores.length; i++){
    $("#highScoresTable").append(`<button type="button" class="list-group-item player">${highScores[i].initials} - ${highScores[i].score}`)
  }
}

// Actionable buttons
$("#start").click(function(){startQuiz()})

$("#initials").submit(function(event){
  event.preventDefault()
  $("#quiz").css("display","none")
  $("#correction").css("display","none")
  updateState()
  $("#initials").css("display","none")
  $("#high-scores").css("display","flex")
  $("#timer").css("display","none")
  var initials = $("#myInitials").val()

  buildHighScoresEntry(initials,score)
  scoreTable()
  $("#myInitials").val("")

})

$("#clearHighScores").click(function(){
  localStorage.removeItem("highScores")
  $(".player").remove()
})

$("#goBack").click(function(){
  state = 0
  score = 0
  timeLeft = 60
  $("#start-menu").css("display","flex")
  $("#state").text(state)
  $("#quiz").css("display","none")
  $("#initials").css("display","none")
  $("#high-scores").css("display","none")
  $("#correction").css("display","none")
  $("#viewHighScores").css("display","block")
})

$("#viewHighScores").click(function(){
  $("#start-menu").css("display","none")
  $("#quiz").css("display","none")
  $("#high-scores").css("display","block")
  scoreTable()
})

checkAnswerAndNext()