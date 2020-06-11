var intro = document.querySelector("#intro");
var question = document.querySelector("#question");
var timer = document.querySelector("#timer");
var answers = document.querySelector("#answers");
var btnStart = document.querySelector("#btnStart");
var resultArea = document.querySelector("#resultArea");
var resultText = document.querySelector("#resultText");
var interval;

var seconds = 75;
var currentQuestionIndex = 0;

questions = [
    {
        question: 'Inside which HTML element do we put the JavaScript?',
        answers: ['<js>',
        '<javascript>',
        '<scripting>',
        '<script>'],
        correctAnswer: 3
    },
    {
        question: 'What is the correct JavaScript syntax to change the content of the following HTML element: <p id="demo">This is a demonstration.</p>',
        answers: ['document.getElementById("p").innerHTML = "Hello World!";',
        'document.getElementById("demo").innerHTML = "Hello World!";',
        '#demo.innerHTML = "Hello World!"',
        'document.getElement("p").innerHTML = "Hello World!"'],
        correctAnswer: 1
    },
    {
        question: 'Where is the correct place to insert a JavaScript?',
        answers: ['The <head> section',
        'Both the <head> section and the <body> section are correct',
        'The <body> section'],
        correctAnswer: 1
    },
    {
        question: 'What is the correct syntax for referring to an external script called "xxx.js"?',
        answers: ['<script name="xxx.js">',
        '<script href="xxx.js">',
        '<script src="xxx.js">'],
        correctAnswer: 2
    },
    {
        question: 'The external JavaScript file must contain the <script> tag.',
        answers: ['True',
        'False'],
        correctAnswer: 1
    },
    {
        question: 'How do you write "Hello World" in an alert box?',
        answers: ['alert("Hello World");',
        'alertBox("Hello World");',
        'msgBox("Hello World")',
        'msg("Hello World");'],
        correctAnswer: 0
    },
    {
        question: 'How do you create a function in JavaScript?',
        answers: ['function = myFunction()',
        'function myFunction()',
        'function:myFunction()'],
        correctAnswer: 1
    },
    {
        question: 'How do you call a function named "myFunction"?',
        answers: ['call myFunction()',
        'call function myFunction()',
        'myFunction()'],
        correctAnswer: 2
    },
    {
        question: 'How to write an IF statement in JavaScript?',
        answers: ['if i = 5',
        'if i == 5 then',
        'if i = 5 then',
        'if (i==5)'],
        correctAnswer: 3
    },
    {
        question: 'How to write an IF statement for executing some code if "i" is NOT equal to 5?',
        answers: ['if (i != 5)',
        'if i <> 5',
        'if i =! 5 then',
        'if (i <> 5)'],
        correctAnswer: 0
    }
]

function startQuiz() {
    intro.setAttribute("style", "display: none;");
    btnStart.setAttribute("style", "display: none;");
    interval = startTimer();
    loadQuestion(currentQuestionIndex);
}

function startTimer() {
    return setInterval(function() {
        seconds--;
        refreshClock();
    }, 1000);
}

function refreshClock() {
    if(seconds <= 0) {
        seconds = 0;
        clearInterval(interval);
        endQuiz();
    }
    timer.textContent = seconds;
}

function loadQuestion(questionIndex) {
    // Clear previous answers
    document.querySelectorAll("li").forEach(e => e.parentNode.removeChild(e));

    var currentQuestion = questions[questionIndex];
    question.textContent = currentQuestion.question;
    var answerButton;
    var answerIndex = 0;
    currentQuestion.answers.forEach(answer => {
        answerButton = document.createElement("button");
        answerButton.setAttribute("type", "button");
        answerButton.setAttribute("class", "btn btn-primary");
        answerButton.setAttribute("style", "word-wrap: break-word; width: 300px;");
        answerButton.setAttribute("data-id", answerIndex);
        answerButton.textContent = `${answerIndex + 1}: ${answer}`;
        answerButton.addEventListener("click", checkAnswer);
        var listItem = document.createElement("li");
        listItem.appendChild(answerButton);
        answers.appendChild(listItem);
        answerIndex++;
    });
}

function checkAnswer() {
    if (questions[currentQuestionIndex].correctAnswer == this.getAttribute("data-id")) {
        resultText.textContent = "Correct!";
        currentQuestionIndex++;
        if(currentQuestionIndex < questions.length)
            loadQuestion(currentQuestionIndex);
        else {
            clearInterval(interval);
            endQuiz();
        }
            
    }
    else {
        resultText.textContent = "Wrong!";
        seconds -= 10;
        refreshClock();
    }
    resultArea.setAttribute("style", "display: block;");
    setTimeout(function() {
        resultArea.setAttribute("style", "display: none;");
    }, 3000)
}

function endQuiz() {
    document.querySelector("#questionArea").setAttribute("style", "display: none;");
    document.querySelector("#done").setAttribute("style", "display: block;");
    document.querySelector("#finalScore").textContent = `Your final score is: ${seconds}`;
}

function saveScore() {
    var initialInput = document.querySelector("#initials").value;
    var scoreList = JSON.parse(localStorage.getItem("scores"));

    if (scoreList == null)
        scoreList = [];

    scoreList.push({initials: initialInput,score: seconds});

    // Sort the list after pushing
    scoreList.sort((a, b) => (a.score < b.score) ? 1 : -1);

    localStorage.setItem("scores", JSON.stringify(scoreList));
    window.location.href = "highscores.html";
}

btnStart.addEventListener("click", startQuiz);
document.querySelector("#btnSubmit").addEventListener("click", saveScore);
document.querySelector("#initials").addEventListener("keyup", function(event) {
    if (event.keyCode == 13)
        saveScore();
});