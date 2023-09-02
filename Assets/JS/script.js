// Variables
var carousel = document.querySelector("#quizBox");
var next = document.querySelector(".next");
var prev = document.querySelector(".prev");
var scoreBox = document.querySelector("#scoreBox");
var scoreTitle = document.querySelector("#scoreTitle");
var initialsBox = document.querySelector("#initialsBox");
var questionElement = document.querySelector("#question");
var responseElement = document.querySelector("#responses");
var resultsBox = document.querySelector("#resultsBox");
var initialsBox = document.querySelector("#initialsBox");
var yourInitials = document.querySelector("#yourInitials");
var index = 0;
var score = 0;
var counter = 60;
var timerElement = document.querySelector(".timerSec");

// Start Button
var startBtn = document.querySelector('.startBtn');
startBtn.addEventListener('click', startGame)

// Submit Button
function submit() {
    // Set local Storage
    document.getElementById("initials").value;
    localStorage.setItem("yourScore", score);
    localStorage.setItem("initials", document.getElementById("initials").value);
    console.log(document.getElementById("initials").value);
    console.log(score);
    results();
}

// Start Game Function
function startGame() {
   console.log('game started');
   startBtn.classList.add('hide');
   questionElement.classList.remove('hide');
   responseElement.classList.remove('hide');
   renderQuestion();
   renderResponses();
   startTimer();
}

// Start Timer
function startTimer() {
   var timerInterval = setInterval(function() {
       counter--;
       if (counter >= 0) {
           // Update HTML with current counter value
           timerElement.innerHTML = "Time remaining: " + counter;
       } else {
           // Stop timer 
           clearInterval(timerInterval);
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
   responseElement.appendChild(li);
   }
}

// Handle Click Event
function handleResponseClick(clickedResponse) {
    var currentQuestion = questions[index];
    if (clickedResponse === currentQuestion.responses[currentQuestion.answer]) {
        console.log("Correct answer!");
        score += 5;
    } else {
        console.log("Incorrect answer.");
        counter -= 10;
        // Subtract 10 seconds from timer
    }
 
    // Navigate to the next question
    navigate(1);
 };
 
//  Response event listener
responseElement.addEventListener("click", function(event) {
    console.log(event.target.tagName);
    if (event.target.tagName = "LI") {
      handleResponseClick(event.target.textContent);  
    }
})

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
  
// Navigate through list of questions

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
      endGame();
    } else {
        renderQuestionAndResponses();
    }
    
   }

// End Game Function
function endGame() {
    // Give Score 
    quizBox.style.display = "none";
    timerElement.style.display="none";
    scoreTitle.classList.remove("hide");
    scoreTitle.textContent = "Your Score";
    scoreBox.classList.remove("hide");
    scoreBox.textContent = score;
    // Ask for initials
    initialsBox.classList.remove("hide");
}

// Render Initials and Score
function results() {
    resultsBox.classList.remove("hide");
    scoreTitle.style.display = "none";
    scoreBox.style.display = "none";
    initials.style.display = "none";
    resultsBox.textContent = "Your score: " + localStorage.getItem("yourScore");
    initialsBox.textContent = "Your initials: " + localStorage.getItem("initials");
    localStorage.getItem("initials");
    }
