//Query Selectors
const number1 = document.querySelector(".num1");
const number2 = document.querySelector(".num2");
const answers = document.querySelector(".answers");
const ans1 = document.querySelector("#an-num1");
const ans2 = document.querySelector("#an-num2");
const ans3 = document.querySelector("#an-num3");
const ans4 = document.querySelector("#an-num4");
const ans5 = document.querySelector("#an-num5");
const incorrectSound = document.querySelector(".incorrect");
const playAgain = document.querySelector(".play-again");
const displayTimer = document.querySelector(".timer");
const displayScore = document.querySelector(".score");
const timeUp = document.querySelector(".time-up");
const equation = document.querySelector(".equation");
const bellSound = new Audio("./sounds/bell.mp3");

//Global Variables
//Random numbers for equations
const min = 10;
const max = 19;
const otherMin = 6;
const otherMax = 9;
let randomNum1;
let randomNum2;
let answer;

//Random numbers for answers
const minAns = 1;
const maxAns = 25;
let randomAns1;
let randomAns2;
let randomAns3;
let randomAns4;
let answersArray = [];

//score keeper
let score = 0;

///TIMER
function timer() {
  let timeleft = 60;

  let downloadTimer = setInterval(function() {
    displayTimer.innerHTML = timeleft;
    timeleft--;
    if (timeleft === -1) {
      clearInterval(downloadTimer);
      gameOver();
    }
  }, 1000);
}

//Start functions onload
timer();
randomNumbers();
randomAnswers();

//Generate & Display random Numbers for the equation
function randomNumbers() {
  randomNum1 = Math.floor(Math.random() * (+max - +min)) + +min;
  randomNum2 = Math.floor(Math.random() * (+otherMax - +otherMin)) + +otherMin;

  //if statement to ensure larger numbeer is at top of equation
  if (randomNum1 > randomNum2) {
    number1.innerHTML = randomNum1;
    number2.innerHTML = randomNum2;
  } else if (randomNum1 < randomNum2) {
    number1.innerHTML = randomNum2;
    number2.innerHTML = randomNum1;
  } else {
    number1.innerHTML = randomNum1 + 1;
    number2.innerHTML = randomNum2;
  }
}

// function displayEquation() {
//   if (randomNum1 > randomNum2) {
//     number1.innerHTML = randomNum1;
//     number2.innerHTML = randomNum2;
//   } else number1.innerHTML = randomNum2;
//   number2.innerHTML = randomNum1;
// }

//Generate random Numbers for the answer
function randomAnswers() {
  randomAns1 = Math.floor(Math.random() * (+maxAns - +minAns)) + +minAns;
  randomAns2 = Math.floor(Math.random() * (+maxAns - +minAns)) + +minAns;
  randomAns3 = Math.floor(Math.random() * (+maxAns - +minAns)) + +minAns;
  randomAns4 = Math.floor(Math.random() * (+maxAns - +minAns)) + +minAns;
  //place all the random answers in an array
  answersArray = [randomAns1, randomAns2, randomAns3, randomAns4];
  //Calculate the correct answer

  if (randomNum1 > randomNum2) {
    answer = randomNum1 - randomNum2;
  } else if (randomNum1 < randomNum2) {
    answer = randomNum2 - randomNum1;
  } else {
    answer = randomNum1 + 1 - randomNum2;
  }

  noRepeat(answersArray, answer);
  answersArray.push(answer);
  outputAnswers();
}

//To prevent the correct answer from duplicating with random answers
function noRepeat(array, trueAnswer) {
  for (var i = 0; i < array.length; ++i) {
    if (array[i] === trueAnswer) {
      array[i] = 0;
    }
  }
}

//Display answers
function outputAnswers() {
  console.log(answer);

  shuffle(answersArray);
  console.log(answersArray);
  // show answers on screen
  ans1.innerHTML = answersArray[0];
  ans2.innerHTML = answersArray[1];
  ans3.innerHTML = answersArray[2];
  ans4.innerHTML = answersArray[3];
  ans5.innerHTML = answersArray[4];
}

//event listeners added to each answer
ans1.addEventListener("click", function() {
  checkingAnswer(answersArray[0], answer, ans1);
});

ans2.addEventListener("click", function() {
  checkingAnswer(answersArray[1], answer, ans2);
});
ans3.addEventListener("click", function() {
  checkingAnswer(answersArray[2], answer, ans3);
});
ans4.addEventListener("click", function() {
  checkingAnswer(answersArray[3], answer, ans4);
});
ans5.addEventListener("click", function() {
  checkingAnswer(answersArray[4], answer, ans5);
});

//Keep track of score and display

function scoreKeeper() {
  answersArray.length = 0;
  score += 1;
  displayScore.innerHTML = score;
}

//Reset the score

function resetScore() {
  score = 0;
  displayScore.innerHTML = score;
}

//Play again button
playAgain.addEventListener("click", function() {
  randomNumbers();
  randomAnswers();
  resetScore();
  timer();
  timeUp.style.display = "none";
  // answers.style.display = 'inherit';
  // equation.style.display = 'inherit';
  answers.classList.remove("opacity");
  equation.classList.remove("opacity");

  displayScore.classList.remove("endingScore");
});

//Once clicked, check to see if answer is correct or not

function checkingAnswer(numberClicked, actualAnswer, clickedAns) {
  if (numberClicked === actualAnswer) {
    bellSound.play();
    clickedAns.classList.add("correctAnswer");
    scoreKeeper();

    setTimeout(function() {
      randomNumbers();
      randomAnswers();

      clickedAns.classList.remove("correctAnswer");
    }, 100);
  } else {
    incorrectSound.play();
    clickedAns.classList.add("incorrectAnswer");

    setTimeout(function() {
      randomNumbers();
      randomAnswers();
      clickedAns.classList.remove("incorrectAnswer");
    }, 100);
  }
}

//Shuffle answer array
function shuffle(arra1) {
  let ctr = arra1.length;
  let temp;
  let index;

  // While there are elements in the array
  while (ctr > 0) {
    // Pick a random index
    index = Math.floor(Math.random() * ctr);
    // Decrease ctr by 1
    ctr--;
    // And swap the last element with it
    temp = arra1[ctr];
    arra1[ctr] = arra1[index];
    arra1[index] = temp;
  }
  return arra1;
}

//game over - game display
function gameOver() {
  timeUp.style.display = "block";
  // answers.style.display = 'none';
  // equation.style.display = 'none';
  answers.classList.add("opacity");
  equation.classList.add("opacity");
  displayScore.classList.add("endingScore");
  answers.style.cursor = "none";
}
