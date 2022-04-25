// Import Of The Functions
import { selectQuestion, showQuestion, showTime } from './gameFunctions.js';

// Elements HTML:
const startGame = document.getElementById('startGame');
const startGameButton = document.getElementById('startGameButton');
const quizBox = document.getElementById('quizBox');

// Default Game Values
let gameRound = 1;
let roundData = {};
let points = 0;

// Events Listeners
startGameButton.addEventListener('click', () => {
  startGame.classList.remove('show');
  quizBox.classList.add('show');
  roundData = selectQuestion(gameRound);
  showTime(roundData);
  showQuestion(roundData, points);
});
