var streak= document.querySelector(".streak");
streak.classList.add("hideButton");

var score = document.querySelector(".score");

var message = document.querySelector(".message");

var gameplay = document.querySelector(".gameplay");

var button = document.querySelectorAll("button");
for (var i = 0; i < button.length; i++) {
    button[i].addEventListener("click", playGame);
}

var curCardValue = 0;

var scoreValue = 0;

var deck = [];

var ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];

var suits = ["hearts", "diams", "clubs", "spades"];



function playGame(e) {
    var temp = e.target.innerText;
    var myCard = drawCard();
    if (temp == "Start") {
        message.innerHTML = "Guess if next card will be higher or lower";
        gameplay.innerHTML = "";
        makeCard(myCard);
        toggleButtons();
        return;
    }
    if (myCard.value == curCardValue) {
        message.innerHTML = "Draw";
    }
    else {
        if ((temp == "Higher" && (myCard.value > curCardValue)) || (temp == "Lower" && (myCard.value < curCardValue))) {
            scoreValue++;
            score.innerHTML = scoreValue;
            streak.classList.remove("hideButton");
            message.innerHTML = "Correct, Next?";
        }
        else {
            message.innerHTML = "Wrong Game Over.<br>Streak scored: " + scoreValue;
            scoreValue=0;
            score.innerHTML = scoreValue;
            streak.classList.add("hideButton");
            toggleButtons();
        }
    }
    makeCard(myCard);
}



function toggleButtons() {
    button[0].classList.toggle("hideButton");
    button[1].classList.toggle("hideButton");
    button[2].classList.toggle("hideButton");
}



function drawCard() {
    if (deck.length > 0) {
        var randIndex = Math.floor(Math.random() * deck.length);
        var card = deck.splice(randIndex, 1)[0];
        return card;
        } else {
        makeDeck();
        return drawCard();
    }
}



function makeDeck() {
    deck = [];
    for (var i = 0; i < suits.length; i++) {
        for (var j = 0; j < ranks.length; j++) {
            var card = {};
            card.suit = suits[i];
            card.rank = ranks[j];
            card.value = (j + 1);
            deck.push(card);
        }
    }
}





function makeCard(card) {
    var html1 = card.rank + "<br>&" + card.suit + ";";
    var html2 = card.rank + "&" + card.suit + ";";
    var curCards = document.querySelectorAll(".card");
    var div = document.createElement("div");
    div.setAttribute("class", "card");
    div.style.left = (curCards.length * 25) + "px";
    curCardValue = card.value;
    if (card.suit === "hearts" || card.suit === "diams") {
        div.classList.add("red");
    }
    var span1 = document.createElement("span");
    span1.setAttribute("class", "tiny");
    span1.innerHTML = html2;
    div.appendChild(span1);
    var span2 = document.createElement("span");
    span2.setAttribute("class", "big");
    span2.innerHTML = html1;
    div.appendChild(span2);
    gameplay.appendChild(div);
}
