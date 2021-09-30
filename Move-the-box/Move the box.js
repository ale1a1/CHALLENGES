var myBlock;

var messageDiv;

var count=0;

var index=0;

var startButton;

var startAgainButton;

var comands=[];


document.addEventListener("DOMContentLoaded", createBlock) 

function createBlock(){
    createMessageDiv();
    myBlock= document.createElement("div");
    myBlock.textContent= "Move me";
    myBlock.style.width= "150px";
    myBlock.style.height= "100px";
    myBlock.style.position= "absolute";
    myBlock.style.top= "350px";
    myBlock.style.left= "750px";
    myBlock.style.backgroundColor= "yellow";
    myBlock.style.color= "black";
    myBlock.style.textAlign= "center";
    myBlock.style.lineHeight= "100px";
    myBlock.style.fontSize="35px";
    document.body.appendChild(myBlock);
}

function createMessageDiv () {
    messageDiv= document.createElement("div");
    messageDiv.innerHTML= "<h1>Click the arrows on your keybord 10 times to select 10 directions to move the box<h1><br>";
    document.body.appendChild(messageDiv);
}

document.addEventListener("keydown", trackKeyboard);

function trackKeyboard(e) {
    e.preventDefault();
    var keyC= e.keyCode;
    if (keyC== 37) {
        createInputsSpans("left");       
    } else if (keyC== 39) {
        createInputsSpans("right");
    } else if (keyC== 38) {
        createInputsSpans("up");
    } else if (keyC== 40) {
        createInputsSpans("down");
    }
}


function randomColor() {
    var color= "#"+ Math.random().toString(16).substr(-6);
    return color;
}



function createInputsSpans(comand) { 
        if (comands.length<10) {
        var span= document.createElement("span");
        span.innerText= comand;
        span.id= count;
        span.style.marginBottom= "200px";
        span.style.padding="20px";
        span.style.border= "1px solid black";
        comands.push(comand);
        document.body.appendChild(span);
        } 
        if (comands.length==10) {
            createStartButton ();
        }
        count++;
}


function createStartButton () {
    if (document.body.lastElementChild.value!="Click here to get the box moving"){
    messageDiv.innerHTML="";
    startButton= document.createElement("input");
    startButton.type= "button";
    startButton.value= "Click here to get the box moving";
    startButton.style.backgroundColor= "orange";
    startButton.style.color="red";
    startButton.style.padding= "40px";
    startButton.style.position= "absolute";
    startButton.style.left= "950px";
    startButton.style.fontSize= "35px";
    startButton.addEventListener("click", moveTheBox);
    document.body.appendChild(startButton)
    }        
}



function moveTheBox(){  
        if (index<=9) {
        startButton.style.display="none";
        myBlock.textContent= "Moving...";
        myBlock.style.fontSize= "27px";
        myBlock.style.backgroundColor= randomColor();
        myBlock.style.color= "black";
        var flashingSpan= document.getElementById(index);
        flashingSpan.style.color="white";
        flashingSpan.style.backgroundColor="green";
        console.dir(flashingSpan);
        if (comands[index]== "left") goLeft();
        else if(comands[index]=="right") goRight();
        else if (comands[index]=="up") goUp();
        else if (comands[index]=="down") goDown();
        index++;
        setTimeout(moveTheBox,1000);
        }
        else {
            myBlock.textContent= "MOVED!!";
            myBlock.style.fontSize= "25px";
            myBlock.style.backgroundColor= "yellow";
            myBlock.style.color= "black";
            var a= document.querySelectorAll("span");
            for (x=0; x<a.length; x++) {
                a[x].remove();  
            }
        }
        if (myBlock.textContent== "MOVED!!") {
            createNewGame();
        }
 }         


function goLeft() {
    var value= myBlock.offsetLeft;
    myBlock.style.left= value - 50 + "px"
}

function goRight() {
    var value= myBlock.offsetLeft;
    myBlock.style.left= value + 50 + "px"
}


function goUp() {
    var value= myBlock.offsetTop;
    myBlock.style.top= value - 50 + "px"
}

function goDown() {
    var value= myBlock.offsetTop;
    myBlock.style.top= value + 50 + "px"
}



function createNewGame() {
    startAgainButton= document.createElement("input");
    startAgainButton.type="button";
    startAgainButton.value= "Click here to play again";
    startAgainButton.style.backgroundColor= "orange";
    startAgainButton.style.color="red";
    startAgainButton.style.fontSize="25px";
    startAgainButton.style.padding="10px";
    startAgainButton.addEventListener("click", startAgain)
    document.body.appendChild(startAgainButton);
}


function startAgain() {
    console.log("hello")
    count=0;
    index=0;
    comands=[];
    startAgainButton.style.display= "none"
    myBlock.style.display="none";
    createBlock()
}




