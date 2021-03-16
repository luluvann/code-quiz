var questions = [
    {id:1, question: "1st question", answers:["This is the first answer of q1","2","3","4","5"], correctAnswerIndex:3},
    {id:2, question: "2nd question", answers:["This is the first answer of q2","2","3","4"], correctAnswerIndex:1},
    {id:3, question: "3rd question", answers:["This is the first answer of q3","2","3","4"], correctAnswerIndex:1},
    {id:4, question: "4th question", answers:["This is the first answer of q4","2","3","4"], correctAnswerIndex:2}
]

var score = 0

var state = 0

var correction = ""

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
  $("#state").text(state)  
}

function generateAnswers(){
  for(var i=0;i<questions[state-1].answers.length;i++){
      var answer = questions[state-1].answers[i]
      $("#answers").append(`<button class="col-12 btn btn-outline-primary" id=${state}-${i}>${answer}</button>`)
  }
  checkAnswer()
}

function checkAnswer(){
  $(`[id*=${state}-]`).each(function(index) {
    $(this).click(function(){
      console.log(index)
      console.log(questions[state-1].correctAnswerIndex)
      if(index == questions[state-1].correctAnswerIndex){
        console.log(true)
        state++
        erasePreviousAnswers()
        generateQuestion()
        generateAnswers()
        $("#correction").text("You answered correctly to the previous question")
      } else {
        state++
        console.log(false)
        erasePreviousAnswers()
        generateQuestion()
        generateAnswers()
        $("#correction").text("You answered incorrectly to the previous question")
      }
    })
  });
}

function erasePreviousAnswers(){
  $(`[id*=${state-1}-]`).each(function() {
    $(this).css("display","none")})
}




$("#start").click(function(){startQuiz()})
