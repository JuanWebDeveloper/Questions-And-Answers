// Import Of The Functions
import { selectQuestion, showFooter, showQuestion, showTime } from './gameFunctions.js';

// Elements HTML:
const startGame = document.getElementById('startGame');
const startGameButton = document.getElementById('startGameButton');
const quizBox = document.getElementById('quizBox');
const gameButtons = document.querySelector('#quizBox .buttons-game');
const nextQuestion = document.getElementById('nextQuestion');

// Default Game Values
let gameRound = 1;
let roundData = {};
let points = 0;

// Events Listeners
startGameButton.addEventListener('click', () => {
  startGame.classList.remove('show');
  quizBox.classList.add('show');
  roundData = selectQuestion(gameRound, points);
  showQuestion(roundData);
  showTime(roundData);
  showFooter(gameRound);
});

nextQuestion.addEventListener('click', () => {
  gameRound++;
  points = roundData.points;
  gameButtons.classList.remove('show');
  if (gameRound <= 5) {
    roundData = selectQuestion(gameRound, points);
    showQuestion(roundData);
    showTime(roundData);
    showFooter(gameRound);
  } else {
    points += 1000;
    console.log(points);
  }
});
