var playArea= {}; 

var player= {};



playArea.stats = document.querySelector(".stats");
playArea.main = document.querySelector(".main");
playArea.game = document.querySelector(".game");
playArea.btns = Array.from(document.querySelectorAll(".btn"));
playArea.btns.forEach(function(item) {item.addEventListener("click", handleBtn)})
playArea.page = Array.from(document.querySelectorAll(".page"));

player.items=3;
player.score=0;
playArea.btns.forEach(function(item) {item.addEventListener("click", handleBtn)})

document.addEventListener("DOMContentLoaded", getData);

function getData(){
    gameObj=data.data;
    playArea.main.classList.add("visible");
    buildBoard();
}

var gameObj;

var data= {"data": [ {"icon": "\u0026#8902;", "value": 10}, 
{"icon": "\u0026#10031;", "value": 30}, 
{"icon": "\u0026#10036;", "value": 50},
{"icon": "\u0026#10042;", "value": 70},
{"icon": "\u0026#10084;", "value": 75},
{"icon": "\u0026#9813;", "value": 50},
{"icon": "\u0026#9822;", "value": 60},
{"icon": "\u0026#9924;", "value": 40},
{"icon": "\u0026#9971;", "value": 100},
{"icon": "\u0026#9729;", "value": -50}, 
{"icon": "\u0026#9785;", "value": -100},
{"icon": "\u0026#9760;", "value": -250},
{"icon": "\u0026#9791;", "value": -20} ]} 


function handleBtn(e) {
    console.log(player.score, player.items)
    if(e.target.classList.contains("newGame")){
        startGame();
    }
}


function startGame(){
    player.score=0;
    player.items=3;
    playArea.main.classList.remove("visible");
    playArea.game.classList.add("visible");
    player.gameOver=false;
    startPop();
}


function buildBoard() {
    playArea.scorer = document.createElement("span");
    playArea.scorer.innerHTML = "GAME INSTRUCTIONS:<br>- Click on the popping squares to get the points.<br>- You start with 3 lives.<br>- Everytime you miss a click you loose 1 life.<br><br>PRESS THE BUTTON TO START";
    playArea.stats.appendChild(playArea.scorer);
    var rows = 4;
    var cols = 4;
    var cnt = 0;
    playArea.game.style.width = cols * 100 + (cols * 2);
    playArea.game.style.margin = "auto";
    for (var y = 0; y < rows; y++) {
        var divMain = document.createElement("div");
        divMain.setAttribute("class", "row");
        divMain.style.width = cols * 100 + (cols * 2);
        for (var x = 0; x < cols; x++) {
            var div = document.createElement("div");
            div.setAttribute("class", "pop");
            cnt++;
            div.innerText = cnt;
            div.cnt = cnt;
            divMain.appendChild(div);
        }
        playArea.game.appendChild(divMain);
    }
}


function startPop() {
    playArea.scorer.innerHTML = "Score: " + player.score + " Lives: " + player.items;
    var newPop = randomUp();
    newPop.classList.add("active");
    newPop.addEventListener("click", hitPop);
    var time = Math.round(Math.random() * (1000) + 750);
    var val = Math.floor(Math.random() * gameObj.length);
    newPop.old = newPop.innerText;
    newPop.v=gameObj[val].value;
    newPop.innerHTML = gameObj[val].icon + "<br>" + gameObj[val].value;
    playArea.inPlay = setTimeout(function () {
        newPop.classList.remove("active");
        newPop.removeEventListener("click", hitPop);
        newPop.innerText = newPop.old;
        if (newPop.v > 0) {
            player.items--;
            updateScore();
        }
        if (player.items <= 0) {
            gameOver();
        }
        if (!player.gameOver) {
            startPop();
        }
    }, time);
}




function hitPop(e) {
    console.log(e.target.cnt);
    console.log(e.target.v);
    var newPop = e.target;
    player.score = player.score + newPop.v;
    updateScore();
    newPop.classList.remove("active");
    newPop.removeEventListener("click", hitPop);
    newPop.innerText = newPop.old;
    clearTimeout(playArea.inPlay);
    if (!player.gameOver) {
        startPop();
    }
} 




function gameOver() {
    player.gameOver = true;
    playArea.main.classList.add("visible");
    playArea.game.classList.remove("visible");
    document.querySelector(".newGame").innerText = "Try Again";
    playArea.scorer.innerHTML = "Score: " + player.score + " Lives: " + player.items + "<br> GAME OVER!!!";
}



function randomUp() {
    var pops= document.querySelectorAll(".pop");
    var idx= Math.floor(Math.random() * pops.length);
    if(pops[idx].cnt==playArea.last){
        return randomUp();
    }
    playArea.last= pops[idx].cnt;
    return pops[idx];
}



function updateScore() {
    playArea.scorer.innerHTML = "Score: " + player.score + " Lives: " + player.items;
    }
