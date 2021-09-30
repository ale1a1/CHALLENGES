var gamePlay= false;

var gameArea= document.querySelector(".game");

var message;

var instructions;

var codeGuesses;

var correctCode=[];

var button= document.querySelector("button");
button.addEventListener("click", start);
button.style.marginTop= "15px";
button.style.marginBottom= "10px";

count=0;

var startAgainButton;


function start() {
    if (!gamePlay) {
        gamePlay= true;
        button.innerText="CHECK THE CODE";
        maker();
    } else {
        checkCode();        
    }
}


function maker () {
    for (x=0; x<4; x++) {
    var el = document.createElement("input");
    el.type="number"
    el.max = 9;
    el.classList.add("numb");
    el.min = 0;
    el.size = 1;
    el.style.width = "50px";
    el.style.fontSize= "40px";
    el.order = x;
    el.correct= Math.floor(Math.random()*10);
    el.value = 0;
    gameArea.appendChild(el);
    }
}


function checkCode() {
    codeGuesses= document.querySelectorAll(".numb");
    for (x=0; x<codeGuesses.length;x++) {
        if (codeGuesses[x].value>codeGuesses[x].correct) {
            codeGuesses[x].style.backgroundColor= "red";
        } else if (codeGuesses[x].value<codeGuesses[x].correct) {
            codeGuesses[x].style.backgroundColor= "blue";
        } else if (codeGuesses[x].value==codeGuesses[x].correct) {
            codeGuesses[x].style.backgroundColor= "green";
        }
    }
    count++;
    if(count<2){
    instructions= document.createElement("p");
    instructions.innerText= "RED= you guessed too high\n BLUE= you guessed too low\n GREEN= correct number";
    instructions.style.fontSize="1.5em";
    gameArea.appendChild(instructions);
    }
    winningMessage(codeGuesses);     
}


function winningMessage(c) {
    if (c[0].style.backgroundColor=="green" && c[1].style.backgroundColor=="green" && c[2].style.backgroundColor=="green" && c[3].style.backgroundColor=="green") {
        for(x=0;x<codeGuesses.length;x++){
        correctCode.push(c[x].value);
        }
        message= document.createElement("h1");
        message.innerText="THE CODE INSTERTED IS CORRECTED! \n CODE: "+correctCode+"\nTotal attempts: "+count; 
        gameArea.appendChild(message);
        button.remove();
        instructions.remove();
        for (x=0;x<codeGuesses.length;x++) {
            codeGuesses[x].remove();
        }
        startAgainButton=document.createElement("button");
        startAgainButton.addEventListener("click", playNewGame);
        startAgainButton.innerText="CLICK HERE TO START A NEW GAME";
        gameArea.appendChild(startAgainButton);
    }
}



function playNewGame() {
    message.remove();
    startAgainButton.remove();
    gamePlay=false;
    count=0;
    correctCode=[];
    codeGuesses=[];
    button.innerText="START";
    document.body.appendChild(button);
}