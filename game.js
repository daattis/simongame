let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];

let level = 0;
let started = false;

//-------STARTS THE GAME
document.addEventListener("keypress", function(){
    if (started === false) {
        document.querySelector("#level-title").innerHTML = "Level " + level;
        nextSequence();
        started = true;
    }    
});

//------DETECTS CLICKS AND RESPONDS TO THEM
let buttons = document.querySelectorAll(".btn").length;
for (var i = 0; i < buttons; i++) {
    document.querySelectorAll(".btn")[i].addEventListener("click", function() {
        let userChosenColour = this.id;
        userClickedPattern.push(userChosenColour);
        playSound(userChosenColour);     
        animatePress(userChosenColour);

        checkAnswer(userClickedPattern.length-1);
        })
}


//-------GAME PATTERN
function nextSequence() {
    // in the beginning of every sequense, the pattern is reset
    userClickedPattern = [];
    // level grows by one on every sequence, and the title shows the current level
    level++;
    document.querySelector("#level-title").innerHTML = "Level " + level;

    // make another random sequence
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
        
    playSound(randomChosenColour);
    animatePress(randomChosenColour);
}

//-------COMPARE ANSWER TO THE GAME PATTERN, RESET FOR NEXT LEVEL
function checkAnswer(currentLevel) {

   
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        
      if (userClickedPattern.length === gamePattern.length){
         setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
        document.body.classList.add("game-over");
        setTimeout(function(){
            document.body.classList.remove("game-over");
        }, 200);
        playSound("wrong");
        document.querySelector("#level-title").innerHTML = "Game Over, Press Any Key to Restart";
        startOver();
    }
}  

//-------PLAYS SOUNDS
function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
//-------BUTTON ANIMATION
function animatePress(currentColour){
    let activeButton = document.querySelector("." + currentColour);
    activeButton.classList.add("pressed");
    setTimeout(function(){
        activeButton.classList.remove("pressed");
    }, 100);
}
//-------RESETS THE VARIABLES AT GAME OVER
function startOver () {
    level = 0;
    gamePattern = [];
    started = false;
}