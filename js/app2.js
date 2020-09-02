//this is the  typing application which allows the user to type the given texts exactly and see the typing speeed
// accordingly.if users encounters any typo it will give hints with letters and border turned to red . otherwise letters
// and border remain balck and greed respectively. if users type correctly until end,the timer stops automatically.
//besides, there are buttons like stop button to stop (timer also stops) and start over button to start back again.

//elements taken from dom
const originText = document.querySelector(".origin").innerText;
const testArea = document.querySelector("#test-area")
const timer = document.querySelector('.timer');
const reset = document.querySelector("#reset");
const stop = document.querySelector("#stop");
let testWrapper = document.querySelector('.test-wrapper');

//initial timing array and others.
let timeInitial = [0,0,0,0,0];
let timerRunning = false;
let interval;


//it shows the timing of hour, minute and second with calculation. while timeInitial[4] increases , then the total time
// is divided according to the timing limit. As set interval method in start function makes it 20ms to increase one each time
// second will be (20*50 == 1000ms). time initial[3] here represents miliseconds. time initial[2]-second, time initial[1]-minute, 
// time initial[0]- hour. 
function timerRunner(){
 let timeIntialHere = `${leadingZero(timeInitial[0])}:${leadingZero(timeInitial[1])}:${leadingZero(timeInitial[2])}:${leadingZero(timeInitial[3])}`

 timer.innerHTML = timeIntialHere;
 timeInitial[4]++;
 timeInitial[0] = Math.floor(timeInitial[4]/50/60/60)
 timeInitial[1] = Math.floor(timeInitial[4]/50/60-(timeInitial[0]*60))
 timeInitial[2] = Math.floor(timeInitial[4]/50-(timeInitial[0]*60)-timeInitial[1]*60)
 timeInitial[3] = Math.floor(timeInitial[4]-(timeInitial[2]*50) -(timeInitial[1]*3000)-(timeInitial[0]*180000))
}

// it is the function which takes time runner function in to setInterval method once condition met.
function start(){
    let textEnteredLength = testArea.value.length
    if(textEnteredLength===0 && !timerRunning ){
        timerRunning = true;
        interval = setInterval(timerRunner,20)
    }
    if(textEnteredLength>0 && !stopAll() ){
        timerRunning = true;
        interval = setInterval(timerRunner,20)
    }


}
// it is for adding zero time less than 10
function leadingZero(time){
if(time <= 9){
    time = "0" + time
}
return time;
}

// it checks the spelling with origin text and entered tests and takes action accordingly.
function spellCheck(){
    let textEntered = testArea.value;
    let originTextMatch = originText.substring(0,textEntered.length)
    if(originText === textEntered){
        clearInterval(interval);
        testArea.style.border = "10px solid #429890"
        testArea.style.color = "black"
    }else{
        if(textEntered === originTextMatch){
            testArea.style.border = "10px solid green";
            testArea.style.color = "black"
        }else{
            testArea.style.border = "10px solid red" ;
             testArea.style.color = "red"
        }
    }
}
//it resets the timer making it to initial value and deletss all entered letters.
function resetAll(){
    clearInterval(interval)
    interval = false;
    timerRunning = false;
    timeInitial = [0,0,0,0,0];
    testArea.value = "";
    timer.innerHTML = "00:00:00:00"
    testArea.style.border = "10px solid  #429890";   
}
//it just stops the timer 
function stopAll(){
    clearInterval(interval)
    timerRunning = false;
}

// these are the eventhandlers which takes approprote functions for the events to work. while users type anything(keypress) in 
// test area it starts the runner. while any key up(keyup) in the test area, it starts spellcheck function. similiarly, 
// while clicking stop and startover, it stops and startsover.
testArea.addEventListener("keypress",start);
reset.addEventListener('click',resetAll);
testArea.addEventListener('keyup',spellCheck);
stop.addEventListener('click' , stopAll)

