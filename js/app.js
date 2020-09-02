//this is as same as app2 except it has few fetures. first I did this way and later added some other feature. just for record
const originText = document.querySelector("#origin-text p").innerText;
const testArea = document.querySelector("#test-area")
const timer = document.querySelector('.timer');
const reset = document.querySelector("#reset");
const stop = document.querySelector("#stop");
let testWrapper = document.querySelector('.test-wrapper');

let timeInitial = [0,0,0,0];
let timerRunning = false;
let interval;

function timerRunner(){
 //let timeIntialHere = `${timeInitial[0]}:${timeInitial[1]}:${timeInitial[2]}`
 let timeIntialHere = `${leadingZero(timeInitial[0])}:${leadingZero(timeInitial[1])}:${leadingZero(timeInitial[2])}`

 timer.innerHTML = timeIntialHere;
 timeInitial[3]++;
 timeInitial[0] = Math.floor(timeInitial[3]/50/60)
 timeInitial[1] = Math.floor(timeInitial[3]/50-(timeInitial[0]*60))
 timeInitial[2] = Math.floor(timeInitial[3]-(timeInitial[1]*50) -(timeInitial[0]*3000))
}

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

function leadingZero(time){
if(time <= 9){
    time = "0" + time
}
return time;
}

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

function resetAll(){
    clearInterval(interval)
    interval = false;
    timerRunning = false;
    timeInitial = [0,0,0,0];
    testArea.value = "";
    timer.innerHTML = "00:00:00"
    testArea.style.border = "10px solid  #429890";   
}

function stopAll(){
    clearInterval(interval)
    timerRunning = false;
}


testArea.addEventListener("keypress",start);
reset.addEventListener('click',resetAll);
testArea.addEventListener('keyup',spellCheck);
stop.addEventListener('click' , stopAll)

