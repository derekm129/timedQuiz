var carousel = document.querySelector("#quizBox");
var next = document.querySelector(".next");
var prev = document.querySelector(".prev");

// Start Button
var startBtn = document.querySelector('.startBtn');
startBtn.addEventListener('click', startGame)

// Q & A
var questionElement = document.querySelector("#question");
var responseElement = document.querySelector("#responses");
var index = 0;

var timerElement = document.querySelector(".timerSec");

function startGame() {
   console.log('game started');
   startBtn.classList.add('hide');
   questionElement.classList.remove('hide');
   responseElement.classList.remove('hide');
   renderQuestion();
   renderResponses();
   startTimer();
}

function startTimer() {
   var counter = 90;
   var timerInterval = setInterval(function() {
       counter--;
       if (counter >= 0) {
           // Update HTML with current counter value
           timerElement.innerHTML = "Time remaining: " + counter;
       } else {
           // Stop timer 
           clearInterval(timerInterval)
       }
   }, 1000);
};

// Render Questions
function renderQuestion() {
    // Update the html with the current question
   questionElement.textContent = questions[0].question;
   
  }

// Render Responses
function renderResponses() {
   responseElement.innerHTML = "";
   for (var i = 0; i < questions[0].responses.length; i++ ) {
   console.log(questions[0].responses[i]);
   var li = document.createElement("li");
   li.textContent = questions[0].responses[i];
   li.addEventListener("click", function(event) {
    handleResponseClick(event.target.textContent)
   });
   responseElement.appendChild(li);
   }
}

// Handle Click Event
function handleResponseClick(clickedResponse) {
    var currentQuestion = questions[index];
    if (clickedResponse === currentQuestion.responses[currentQuestion.answer]) {
        console.log("Correct answer!");
    } else {
        console.log("Incorrect answer.");
    }
 
    // Navigate to the next question
    navigate(1);
    renderQuestionAndResponses();
 };
 

// Generate questions
var questions = [
   { question: "What is a function?", 
     responses: [ "Resuable code", "Primitive value", "None of the above" ], answer: 0 },
    { question: "What is an array?", 
    responses: [ "List of values", "Key value pairs", "None of the above" ], answer: 2 },
    { question: "What is a primitive value?", 
    responses: [ "123", "1234", "None of the above" ], answer: 2 },
    { question: "What is the abbreviation JSON?", 
    responses: [ "JASON", "Javascript notation object", "None of the above" ], answer: 1 },
  ];

// Carousel

next.addEventListener("click", function() {
   navigate(1);
   renderQuestionAndResponses();
});

prev.addEventListener("click", function() {
   navigate(-1);
   renderQuestionAndResponses();
});

// Render Questions and Responses
function renderQuestionAndResponses() {
   var question = questions[index];
   questionElement.textContent = question.question;
   
   responseElement.innerHTML = ""; // Clear previous responses
   for (var i = 0; i < question.responses.length; i++) {
       var li = document.createElement("li");
       li.textContent = question.responses[i];
       responseElement.appendChild(li);
   }
}
  
//    // Navigate through list of questions

function navigate(direction) {
   index = index + direction;
     // If you try to navigate 'back' from the start
    // Go to last question
   if (index < 0) { 
     index = questions.length - 1; 
   }
      // If you are at the very end. 
      // Go to the first image/question
      else if (index > questions.length - 1) { 
      index = 0;
    }
    
   }

