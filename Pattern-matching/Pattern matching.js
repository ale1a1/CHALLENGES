var message = document.querySelector(".message");

var message2 = document.querySelector(".message2");

var gamearea = document.querySelector(".gamearea");

var button = document.querySelector("button");
button.addEventListener("click", start)


var gameColors = ["red", "blue", "green", "yellow"];

var gameClicks= [];

var userClicks= [];

var inPlay= false;

var playNum=5;


window.addEventListener("load", setUp)



function setUp () { 
    for (x=0; x<4; x++) {
        var div= document.createElement("div");
        div.classList.add("box")
        div.style.backgroundColor= gameColors[x];
        div.style.opacity= "0.4";
        div.addEventListener("click", checkAnswer)
        div.myColor= gameColors[x];
        gamearea.appendChild(div);
    }
}


function start () {
    if(!inPlay) {
        player();
    }
}


function player() {
    message.style.display="none";
    button.disabled=true;
    gameClicks= [];
    userClicks= [];
    runSequence(playNum);
}


function runSequence(num) {    
    var squares= document.querySelectorAll(".box");
    num--;
    if (num<0) {
        inPlay=true;
        return
    }     
    var randomNum= Math.floor(Math.random()*gameColors.length);  
    gameClicks.push(squares[randomNum].myColor);
    squares[randomNum].style.opacity= "1";
    setTimeout(function () {
        squares[randomNum].style.opacity = "0.4";
        setTimeout(function () {runSequence(num);}, 100);
    }, 500);
    if(userClicks.length == gameClicks.length){
        inPlay = false;
        endGame();
}
}



function checkAnswer(e) {
    if (inPlay) {
        var el= e.target;
        userClicks.push(el.myColor);
        el.style.opacity= "1";
        setTimeout(function(){el.style.opacity= "0.4"}, 500);
        if(userClicks.length == gameClicks.length){
            inPlay = false;
            endGame();
        }
    }
    console.log(userClicks);
}




function endGame() {
    message2.innerText= "GAME OVER!";
    button.disabled = false;
    if(userClicks.toString() == gameClicks.toString()) {
        message2.innerText+= "\nYOU WON!!!\n\nCLICK START TO PLAY A NEW GAME!";
    } else {
        message2.innerText+= "\nYOU LOST!!!\n\nCLICK START TO PLAY A NEW GAME!";
    }
}