let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let running = false;
let lapCounter = 1;

const display = document.getElementById("display");
const lapList = document.getElementById("lapList");

function formatTime(ms){

    let milliseconds = ms % 1000;
    let seconds = Math.floor(ms / 1000) % 60;
    let minutes = Math.floor(ms / (1000 * 60)) % 60;
    let hours = Math.floor(ms / (1000 * 60 * 60));

    return (
        String(hours).padStart(2,'0') + ":" +
        String(minutes).padStart(2,'0') + ":" +
        String(seconds).padStart(2,'0') + "." +
        String(milliseconds).padStart(3,'0')
    );
}

function updateDisplay(){
    elapsedTime = Date.now() - startTime;
    display.textContent = formatTime(elapsedTime);
}

function startTimer(){

    if(!running){

        startTime = Date.now() - elapsedTime;

        timerInterval = setInterval(updateDisplay, 10);

        running = true;
    }
}

function pauseTimer(){

    if(running){

        clearInterval(timerInterval);

        elapsedTime = Date.now() - startTime;

        running = false;
    }
}

function resetTimer(){

    clearInterval(timerInterval);

    running = false;
    elapsedTime = 0;
    lapCounter = 1;

    display.textContent = "00:00:00.000";
    lapList.innerHTML = "";
}

function recordLap(){

    if(elapsedTime === 0) return;

    const lap = document.createElement("div");

    lap.classList.add("lap-item");

    lap.innerHTML = `
        <span>Lap ${lapCounter}</span>
        <span>${formatTime(elapsedTime)}</span>
    `;

    lapList.prepend(lap);

    lapCounter++;
}