var score = document.querySelector(".score");

var startScreen = document.querySelector(".startScreen");
startScreen.addEventListener("click", start);

var gameArea = document.querySelector(".gameArea");

var keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowRight: false,
    ArrowLeft: false,
};

var player= {
    speed: 5,
    score: 0,
};

document.addEventListener("keydown", pressOn);
document.addEventListener("keyup", pressOff);





function start() {
    startScreen.classList.add("hide");
    gameArea.innerHTML= "";   
    player.start= true; 
    player.score= 0;       
    for (var x = 0; x < 10; x++) {
        var div = document.createElement("div");
        div.classList.add("line");
        div.style.top = (x * 150) + "px";
        div.y=x * 150;
        gameArea.appendChild(div);
    }
    window.requestAnimationFrame(playGame);
    var car= document.createElement("div");
    car.setAttribute("class", "car");
    gameArea.appendChild(car);
    player.y= car.offsetTop;
    player.x=car.offsetLeft;
    for (var x = 0; x < 3; x++) {
        var enemy = document.createElement("div");
        enemy.classList.add("enemy");
        enemy.style.top = (x * 150) + "px";
        enemy.style.left= Math.floor(Math.random()*350) + "px";
        enemy.y= ((x+1)*600)*-1;
        enemy.style.backgroundColor="Red"
        enemy.innerText="";
        gameArea.appendChild(enemy);
    }    
}



function playGame() {
    var car= document.querySelector(".car");    
    moveLines();
    moveEnemy(car);
    var road= gameArea.getBoundingClientRect();
    if(player.start) {
        if(keys.ArrowUp && player.y>road.top) {player.y -= player.speed};
        if(keys.ArrowDown && player.y<road.bottom) {player.y += player.speed};
        if(keys.ArrowLeft && player.x>0) {player.x -= player.speed};
        if(keys.ArrowRight && player.x<(road.width)-50) {player.x += player.speed};
        car.style.left=player.x + "px";
        car.style.top=player.y + "px";
        window.requestAnimationFrame(playGame);
        player.score ++;
        score.innerText= "SCORE: " + player.score;
    }
}



function moveLines() {
    var lines = document.querySelectorAll(".line");
    lines.forEach(function (item) {
        if (item.y >= 1500) {
            item.y -= 1500;            
        }
        item.y += player.speed;
        item.style.top = item.y + "px";
    })
}



function moveEnemy(car) {
    var ele = document.querySelectorAll(".enemy");
    ele.forEach(function (item) {
        if(isCollide(car, item)) {
            endGame();
        } 
        if (item.y >= 1500) {
            item.y = -600;
            item.style.left= Math.floor(Math.random()*350) + "px";
        }
        item.y += player.speed;
        item.style.top = item.y + "px";
    })
}



function pressOn(e) {
    e.preventDefault();
    keys[e.key] = true;    
}



function pressOff(e) {
    e.preventDefault();
    keys[e.key] = false;    
}



function isCollide(a, b) {
    let aRect = a.getBoundingClientRect();
    let bRect = b.getBoundingClientRect();
    return !(
        (aRect.bottom < bRect.top) || (aRect.top > bRect.bottom) || (aRect.right < bRect.left) || (aRect.left > bRect.right))
}


function endGame() {
    player.start= false;
    score.innerHTML= "GAME OVER!<br>SCORE WAS: " + player.score;
    startScreen.classList.remove("hide");
}