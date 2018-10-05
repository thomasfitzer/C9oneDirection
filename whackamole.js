  const holes = document.querySelectorAll('.hole');
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
    const time = randomTime(600, 1150);
    const hole = randomHole(holes);
    hole.classList.add('up');
    setTimeout(() => {
      hole.classList.remove('up');
      if (!timeUp) peep();
    }, time);
  }
  document.getElementById("startbutton").addEventListener("click", startGame, startTimer);
  function startGame() {
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    
    peep();
    setTimeout(() => timeUp = true, 10000)
  }

 
  
  
  function bonk(e) {
    if(!e.isTrusted) return; // cheater!
    score++;
    this.parentNode.classList.remove('up');
    scoreBoard.textContent = score;
  }
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
