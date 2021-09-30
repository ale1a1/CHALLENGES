var message = document.querySelector(".message");
message.innerText= "GUESS THE HIDDEN WORD CLICKING ON THE LETTERS SHOWED ON THE SCREEN! CLICK START START TO GET THE LETTERS";


var output1 = document.querySelector(".output1");


var output2 = document.querySelector(".output2");


var btn = document.querySelector("button");
btn.addEventListener("click", function () {
        if(counter==3) {
        myWords= ["javascript", "course", "laurence"];
        counter=0;
        }
        message.innerText="";
        btn.style.display="none"; 
        myWords.sort(function () {return .5 - Math.random();});
        var theWord = myWords.shift();
        player.solution= theWord.split("");
        buildBoard();   
})


var myWords= ["javascript", "course", "laurence"];

var player = {};

var counterArr=[];

var counter=0;









function buildBoard() {
    console.log(player.solution.join(""));
    player.solution.forEach(function(letter) {
        var div= document.createElement("div");
        div.classList.add("letter2")
        div.innerText="_";
        div.myLetter= letter;
        output2.appendChild(div);
    })  
    var solutionLetter= document.querySelectorAll(".letter2");
    console.log(solutionLetter.length);
    for (var x = 0; x < 26; x++) {
        var temp = String.fromCharCode(65 + x);
        var div = document.createElement("div");
        div.classList.add("letter");  
        div.myLetter = temp;       
        var handler= function(e) {
            e.target.classList.add("done");
            e.target.removeEventListener("click", handler);         
            solutionLetter.forEach(function (letter) {
                if (letter.myLetter.toUpperCase() === e.target.myLetter) {
                    letter.innerText = e.target.myLetter;    
                    counterArr.push(letter.myLetter)             
                }             
            })     
            if(solutionLetter.length==counterArr.length) {
                startNewGame();
                counter++;
                console.log(counter);
            }
        }   
        div.addEventListener("click", handler);    
        div.innerText= temp;
        output1.appendChild(div);
    }     
}


function startNewGame() {
    output1.innerHTML="";
    output2.innerHTML="";   
    btn.style.display="block";
    counterArr=[];
    message.innerText= "WELL DONE!THE HIDDEN WORDS WAS: \n " + player.solution.join("").toUpperCase();
    btn.innerText= "CLICK TO START A NEW GAME";
}



