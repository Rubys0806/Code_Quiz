var startBtn = document.getElementById('start');
var beginningScreen = document.getElementById('beginning');
var quizScreen = document.getElementById('quiz');
var question = document.getElementById('question');
var answers = document.getElementById('answers');
var choice = "";
var time = 100;
var timer = document.getElementById("timer");
timer.innerHTML = time;
var timeout = document.getElementById("timeout");
var currentQuestion = 0;
var backBtn = document.getElementById('back');
var end = document.getElementById('endscreen');
var score = document.getElementById('finalScore');
var submitBtn = document.getElementById ('submitScores')
var scoreList = document.getElementById('scoreList')
var highscoreDisplay = document.getElementById('highscoreDisplay');
var highscoreBtn = document.getElementById('highscores');
var clear = document.getElementById('clearHighScore');
var correct = document.getElementById('correct');
var wrong = document.getElementById('wrong');

startBtn.addEventListener("click", function() {
    currentQuestion = 0;
    time = 100;
    beginningScreen.style.display = "none";
    codequiz();
    startTime();
});

backBtn.addEventListener("click", function() {
    beginningScreen.style.display = "block";
    end.style.display = "none";
    highscoreDisplay.style.display = "none";
    quizScreen.style.display = "none";
});

const questionsArray = ["Commonly used data types DO NOT include: ","The condition in an if / else statement is enclosed within ____.",
"Arrays in JavaScript can be used to store ____.", "String values must be enclosed within _____ when being assigned to variables.",
"A very useful tool used during development and debugging for printing content to the debugger is: "]

const answerArray = [ ["Strings", "Booleans", "Alerts", "Numbers"], ["Quotes", "Curly brackets", "Parentheses", "Square brackets"],
["Numbers and Strings", "Other arrays", "Booleans", "All of the above"],["Commas", "Curly brackets", "Quotes", "Parentheses"],
["JavaScript", "Terminal/Bash", "For Loops", "console.log"]]

const answerLog =["Alerts", "Parentheses", "All of the above", "Quotes", "console.log"]

function codequiz(){
    quizScreen.style.display = "block";

    if (currentQuestion<questionsArray.length){ 
    var showAnswers = "";
    question.innerText = questionsArray[currentQuestion];
    for (var i=0; i<answerArray[currentQuestion].length; i++){
        showAnswers +="<li class='item'>"+answerArray[currentQuestion][i]+"</li>";
    }
    answers.innerHTML=showAnswers;
    }
    else {
        quizScreen.style.display = "none";  
        score.innerHTML = time;
        end.style.display = "block";
        return; 
    }
}

answers.addEventListener("click", function(e) {
    if(e.target.tagName == 'LI'){
        choice= e.target.innerText;
        isAnswer();

    }
}
)

function isAnswer(){
    if (choice==answerLog[currentQuestion]){
        correct.style.display="block";
        wrong.style.display="none";
        currentQuestion++;
        codequiz();
    }
    else{
    if (time>10)
    {
     time=time-10;
     wrong.style.display="block";
     correct.style.display="none";
    }
    else {
        time=0;
    }
    currentQuestion++;
    codequiz();
    }
}

function startTime(){
var countDown = setInterval (()=>{
    if(time<=0){
        clearInterval(countDown);
        timer.innerHTML=time;
        score.innerHTML=0; 
        endscreen.style.display = "block";
        quizScreen.style.display = "none";
    }
    else {
    time--;
    timer.innerHTML=time;
    }
},1000)

}

submitBtn.addEventListener("click", function()
{
    var initials = document.getElementById("initials").value;
    var node = document.createElement('li');
    node.appendChild(document.createTextNode(initials+" "+score.innerHTML));
    scoreList.appendChild(node);
    localStorage.setItem("highscoreSave",scoreList.innerHTML);
    highscoreDisplay.style.display = "block";
    endscreen.style.display = "none";
}
)


highscoreBtn.addEventListener("click", function ()
{
    var saved = localStorage.getItem('highscoreSave');
    if(saved) {
        scoreList.innerHTML = saved;
    }
    beginningScreen.style.display = "none";
    quizScreen.style.display = "none";
    endscreen.style.display = "none";
    highscoreDisplay.style.display = "block";

}
)

clear.addEventListener("click", function () {
    localStorage.clear();
    scoreList.innerHTML="";
})
