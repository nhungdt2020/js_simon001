let gamePattern = [];
let buttonColors = ["green", "red", "yellow", "blue"];
let userClickedPattern = [];

let level = 0;
let started = false;

// get random number from 1 to 4
$(document).keypress(function() {
    if (!started) {
        nextSequence();
        //change title
        $("#level-title").text("Level " + level);
        started = true;
    }

})

function nextSequence() {
    level += 1;
    console.log('---NEXT LEVEL = ', level, '---');
    userClickedPattern = [];

    //create random number to show next sequence
    let randomnumber = Math.floor(Math.random() * 4);
    // console.log('randome button next', randomnumber);
    let randomColor = buttonColors[randomnumber];

    gamePattern.push(randomColor);
    // console.log("gamePattern:", gamePattern);

    $("#" + randomColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    // audio = new Audio("sounds/" + randomColor + ".mp3");
    // audio.play();

    playSound(randomColor);

    console.log('gamePattern', gamePattern)

}
//get ramdom color from array buttonColors to push to gamePattern


$('.btn').click(function() {;
    // console.log('hello', this.id);
    let userChoosenColor = this.id;
    userClickedPattern.push(userChoosenColor);


    //play sound when click btn
    playSound(userChoosenColor);

    //show animation when click button
    animationPress(userChoosenColor);

    if (userClickedPattern.length === gamePattern.length) {
        console.log('userClickedPattern', userClickedPattern);
        //check answer
        checkAnswer(level);
    }

})



//play sounds to button clicks
function playSound(name) {
    audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
    // console.log('--------let play the sound------------')
}

//add animation to user clicks
function animationPress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed")
    }, 200)
}

//check user answer

function checkAnswer(currentLevel) {

    // console.log('gamePattern', gamePattern)
    // console.log('userClickPattern', userClickedPattern)

    let lastGamePattern = gamePattern[gamePattern.length - 1];
    let lastUserClickedPattern = userClickedPattern[userClickedPattern.length - 1];

    let a = gamePattern.toString();
    let b = userClickedPattern.toString()

    if ((lastGamePattern === lastUserClickedPattern) & (a === b)) {
        // console.log('userClickedPattern', userClickedPattern)
        userClickedPattern = [];
        // console.log('ok')
        console.log('================wait to next level================')
        setTimeout(nextSequence(), 5000);

    } else {
        audio = new Audio("sounds/wrong.mp3");
        audio.play();

        // console.log('notOk')
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        $(document).keypress(startOver());
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);


        console.log(level, gamePattern, userClickedPattern)
        console.log('---------------STOP GAME---------------')
    }

    function startOver() {

        level = 0;
        started = false;
        gamePattern = [];
        userClickedPattern = [];
    }

}