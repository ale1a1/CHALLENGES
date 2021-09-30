var endDate= document.querySelector("input[name='endDate']");
endDate.addEventListener("change", count);

var temp;

var currentDate;


var timer;

var days, hours, minutes, seconds;



var mainDiv= document.querySelector(".mainDiv");

var instructions= document.querySelector(".instructions");


var clock= document.querySelector(".clock");
clock.style.display="none";
clock.style.marginTop="75px";
clock.style.fontSize="30px";
clock.style.fontWeight="30px";

var timeLeftMessage= document.querySelector(".timeLeftMessage");

var message= document.querySelector(".message");

var secondsSpan= document.querySelector(".seconds"); 
var minutesSpan= document.querySelector(".minutes");
var hoursSpan= document.querySelector(".hours");
var daysSpan= document.querySelector(".days");

var newStartButton= document.querySelector("input[name='newStartButton']");
newStartButton.style.display="none";
newStartButton.addEventListener("click",startNewCounter);
newStartButton.style.marginTop="120px";
newStartButton.style.padding="10px";








function count(e) {
    e.preventDefault();
    temp= new Date(endDate.value);   
    message.innerText="";
    message.style.display="block";
    startClock(temp);
}




function startClock(d) {
    function updateCounter(){
    timeLeft(d)
    }
    updateCounter();
    timer= setInterval(updateCounter,1000);
    }



    function timeLeft(d) {
    currentDate= new Date();    
    var t= Date.parse(d)- Date.parse(currentDate);
    if(t>0){
        endDate.style.display="none";
        instructions.style.display="none";
        clock.style.display="block";
        message.style.display="none";
        timeLeftMessage.innerText="TIME LEFT TO " + endDate.value + ":";
        days= Math.floor((((t/1000)/60)/60)/24);
        hours=Math.floor(((t/1000)/60)/60);
        minutes=Math.floor((t/1000)/60);
        seconds= Math.floor(t/1000);
        secondsSpan.innerText= seconds;
        secondsSpan.style.color="red";
        minutesSpan.innerText= minutes;
        minutesSpan.style.color="red";
        hoursSpan.innerText= hours;
        hoursSpan.style.color="red";
        daysSpan.innerText= days;
        daysSpan.style.color="red";
        newStartButton.style.display="block";
        } else {
        message.innerText="ERROR!!!\nYOU SELECTED A DATE IN THE PAST!!!\nPLEASE SELECT A DATE IN THE FUTURE!!!";   
        }
    }






function startNewCounter() { 
    clearInterval(timer)
    prova ();
}

function prova () {
    newStartButton.style.display="none";
    endDate.style.display="block";
    instructions.style.display="block";
    clock.style.display="none";
    timeLeftMessage.style.display="block";
    timeLeftMessage.innerText="";
}



