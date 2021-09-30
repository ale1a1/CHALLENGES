var gameMessage = document.querySelector(".gameMessage");

var score = document.querySelector(".score");

var gameArea = document.querySelector(".gameArea");

var tips= document.querySelector(".tips");




var player= {
    score:0,
    speed:2,
    inplay: false
}


var keys= {
    space: false,
}


document.addEventListener("keydown", pressOn);
document.addEventListener("keyup", pressOff);

gameMessage.addEventListener("click", start);






function start () {
    gameMessage.classList.add("hide");
    tips.classList.add("hide");
    if (!player.inplay==true){
    makeEnemy();
    player.inplay= true;
    player.score= 2000;
    player.plane= document.createElement("div");
    player.plane.setAttribute("class", "plane");
    player.totalBombs= 2;
    player.activeBombs= 0;
    player.bombScore=0;
    player.ready= true;
    gameArea.appendChild(player.plane);    
    window.requestAnimationFrame(playGame);
    player.x= player.plane.offsetLeft;
    player.y= player.plane.offsetTop;
    }
}



function makeEnemy() {
    player.base= document.createElement("div");
    player.base.setAttribute("class", "base");
    player.base.style.width= Math.floor(Math.random()*200) +10 + "px";
    player.base.style.height= Math.floor(Math.random()*100) +100 + "px";
    player.base.style.left= Math.floor(Math.random() * (gameArea.offsetWidth -200)) +100 + "px";
    gameArea.appendChild(player.base);
}



function makeBomb () {
    if(player.ready) {
    player.score-= 300;
    player.activeBombs++;
    player.bombScore++;
    var bomb=  document.createElement("div");
    bomb.setAttribute("class", "bomb");
    bomb.innerText= player.bombScore;
    bomb.x= player.x;
    bomb.y= player.y;
    bomb.style.left= bomb.x;
    bomb.style.top= player.y;
    gameArea.appendChild(bomb);
    player.ready= false;
    setTimeout(function() {
        player.ready= true;
    }, 500);
    }
}



function moveBomb() {
    var bombs= document.querySelectorAll(".bomb");
    bombs.forEach(function(item){
        item.y+=5;
        item.style.top= item.y;
        if(item.y > 1000) {
            player.activeBombs--;
            item.parentElement.removeChild(item);
        }
        if (isCollide(item, player.base)) {
            player.score+= 2000;
            player.base.parentElement.removeChild(player.base);
            item.parentElement.removeChild(item);
            makeEnemy();
        }
    })
}



function isCollide(a, b) {
    var aRect= a.getBoundingClientRect();
    var bRect= b.getBoundingClientRect();   
    return !(
        (aRect.bottom < bRect.top) || (aRect.top > bRect.bottom) || (aRect.right < bRect.left) || (aRect.left > bRect.right));
} 



function playGame() {
    if (player.inplay===true) {          
        moveBomb();
    if (keys.space) {
        makeBomb();   
    }     
    if (keys.ArrowUp && player.y >80) {
        player.y -= player.speed; 
    }
    if (keys.ArrowDown && player.y < 200) {
        player.y += player.speed; 
    }
    if (keys.ArrowLeft && player.x >0) {
        player.x -= player.speed; 
    }
    if (keys.ArrowRight && player.x < (gameArea.offsetWidth-50)) {
        player.x += player.speed; 
    }
    player.x+= (player.speed*2);
    if (player.x > gameArea.offsetWidth) {
        player.x=0;
        player.score-= 100;        
    }
    score.innerText= "SCORE:" + player.score; 
    player.score--;
    if(player.score<0) {
        score.innerText= "GAME OVER!";
        player.inplay= false; 
        gameArea.innerHTML= "";
        gameMessage.classList.remove("hide");   
        tips.classList.remove("hide");
        gameMessage.innerText= "Press here to Play a new Game"; 
    }
    player.plane.style.left= player.x;
    player.plane.style.top= player.y;
    window.requestAnimationFrame(playGame);
    }    
}




function pressOn (e) {
    e.preventDefault();
    var tempKey= (e.key==" ") ? "space" : e.key;
    keys[tempKey]= true;
}



function pressOff (e) {
    e.preventDefault();
    var tempKey= (e.key==" ") ? "space" : e.key;
    keys[tempKey]= false;
}






