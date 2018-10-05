<<<<<<< HEAD
const holes = document.querySelectorAll('.hole');
=======
  const holes = document.querySelectorAll('.hole');
>>>>>>> 17ceff73813de9a0a7cc6400f5ac7377d3be54f9
  const scoreBoard = document.querySelector('.score');
  const moles = document.querySelectorAll('.mole');
  let lastHole;
  let timeUp = false;
  let score = 0;
  
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
<<<<<<< HEAD
    const time = randomTime(2000, 2150);
=======
    const time = randomTime(600, 1150);
>>>>>>> 17ceff73813de9a0a7cc6400f5ac7377d3be54f9
    const hole = randomHole(holes);
    hole.classList.add('up');
    setTimeout(() => {
      hole.classList.remove('up');
      if (!timeUp) peep();
    }, time);
  }
<<<<<<< HEAD
  document.getElementById("startbutton").addEventListener("click", startGame);
=======
  document.getElementById("startbutton").addEventListener("click", startGame, startTimer);
>>>>>>> 17ceff73813de9a0a7cc6400f5ac7377d3be54f9
  function startGame() {
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
<<<<<<< HEAD
    peep();
    setTimeout(() => timeUp = true, 10000)
  }
=======
    
    peep();
    setTimeout(() => timeUp = true, 10000)
  }

 
>>>>>>> 17ceff73813de9a0a7cc6400f5ac7377d3be54f9
  
  
  function bonk(e) {
    if(!e.isTrusted) return; // cheater!
    score++;
    this.parentNode.classList.remove('up');
    scoreBoard.textContent = score;
  }
<<<<<<< HEAD
  moles.forEach(mole => mole.addEventListener('click', bonk));
=======
  moles.forEach(mole => mole.addEventListener('click', bonk));

  // countdown: function() {
  //   game.counter--;
  //   $("#counter-number").html(game.counter);
  //   if (game.counter === 0) {
  //     console.log("TIME UP");
  //     game.done();
  //   }
  // },

  // start: function() {
  //   timer = setInterval(game.countdown, 1000);

  //   $("#sub-wrapper").prepend("<h2>Time Remaining: <span id='counter-number'>120</span> Seconds</h2>");

  //   $("#start").remove();

  //   for (var i = 0; i < questions.length; i++) {
  //     card.append("<h2>" + questions[i].question + "</h2>");
  //     for (var j = 0; j < questions[i].answers.length; j++) {
  //       card.append("<input type='radio' name='question-" + i +
  //       "' value='" + questions[i].answers[j] + "''>" + questions[i].answers[j]);
  //     }
  //   }

  //   card.append("<button id='done'>Done</button>");
  // },
>>>>>>> 17ceff73813de9a0a7cc6400f5ac7377d3be54f9
