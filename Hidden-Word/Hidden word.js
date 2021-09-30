window.addEventListener("load", init);

var myWords= ["javascript", "html", "course", "laurence", "coding", "brackets"];

var tempArr= myWords.slice(0);


var curr=0;

var startTime;




function init() {
    var div = document.createElement("div");
    div.classList.add("message");
    div.innerText = "HIDDEN WORD GAME! Press start button";
    document.body.appendChild(div);
    var button = document.createElement("button");
    button.type = "button";
    button.innerText = "START GAME";
    button.classList.add("button");
    button.addEventListener("click", start);
    document.body.appendChild(button);
    var div1 = document.createElement("div");
    div1.classList.add("game");
    document.body.appendChild(div1);
}



function start(e) {
    startTime= Date.parse(new Date());
    curr=0;    
    e.target.style.display="none";    
    console.log(tempArr);
    myWords.sort(function(a,b) {return 0.5 - Math.random()});
    tempArr.sort(function(a,b) {return 0.5 - Math.random()});
    var game= document.querySelector(".game");
    myWords.forEach(function(item){
        var temp= item.split("");
        temp.sort(function(a,b) {return 0.5 - Math.random()});
        var temp1= temp.join("");
        var div= document.createElement("div");
        div.innerText="SELECT";
        div.classList.add("box");
        div.word=item;
        div.addEventListener("click", function(){
            if(div.word===tempArr[curr]){
                this.classList.add("hidden");
                curr++;
                nextWord();  
            }                                        
        })
        div.addEventListener("mouseenter", function(){
            div.style.backgroundColor="red";
            div.innerText= temp1;
        })
        div.addEventListener("mouseleave", function(){
            div.style.backgroundColor="white";
            div.innerText= "SELECT";
        })
        game.appendChild(div);
    })   
    nextWord();    
}



function nextWord() {
    if(curr>=myWords.length) {
        var endTime= Date.parse(new Date());
        var duration= (endTime - startTime)/1000; 
        message("GAME OVER; it took you " + duration + "seconds");
        var buttonRestart= document.createElement("button");
        buttonRestart.type="button";
        buttonRestart.classList.add("buttonRestart")
        buttonRestart.addEventListener("click", startNewGame);
        buttonRestart.innerText= "START A NEW GAME";
        document.body.appendChild(buttonRestart);       
    } else {
    message("SELECT THE WORD: " + tempArr[curr]);
    }
}



function message(output) {
    var message= document.querySelector(".message");
    message.innerText= output;
}



function startNewGame() {
    var div= document.querySelector(".message");
    var button= document.querySelector(".button")
    var div1= document.querySelector(".game")
    var buttonRestart= document.querySelector(".buttonRestart")
    div.remove();
    button.remove();
    div1.remove();
    buttonRestart.remove();
    init();
}




