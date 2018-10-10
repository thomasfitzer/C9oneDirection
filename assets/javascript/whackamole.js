const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
let lastHole;
let timeUp = false;
let score = 0;
let number = 10;

function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}


function randomHole(holes) {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    if (hole === lastHole) {
        console.log('Same one!');
        return randomHole(holes);
    }
    lastHole = hole;
    return hole;
}


function peep() {
    const time = randomTime(600, 1150);
    const hole = randomHole(holes);
    hole.classList.add('up');
    setTimeout(() => {
        hole.classList.remove('up');
        if (!timeUp) peep();
    }, time);
}
document.getElementById("startbutton").addEventListener("click", startGame);
function startGame() {
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    
    

    peep();
    setTimeout(() => timeUp = true, 10000);
    
}




function bonk(e) {
    if (!e.isTrusted) return; // cheater!
    score++;
    this.parentNode.classList.remove('up');
    scoreBoard.textContent = score;
}
moles.forEach(mole => mole.addEventListener('click', bonk));


// var intervalId;
    
    
         
    
//         function runTimer() {
           
//             intervalId = setInterval(decrement, 1000);
          
//         }
    
//         function decrement() {
            
//           number--;
    
//           $("#show-number").html("<h2>" + (number) + "</h2>");
//             //Stops the timer when it reaches 0.
//           if (number === 0) {
    
//             stopTimer();
            
            
//           };
          

//         }
//         //When the timer is stopped, the interval is cleared.
//         function stopTimer(){
//             clearInterval(intervalId);
//         }
//         $("#startButton").on("click", runTimer);
//         $("#show-number").html("<h2>" + (number) + "</h2>");

  


