// Import Of The Functions
import { selectQuestion, showQuestion } from './gameFunctions.js';

// Elements HTML:
const startGame = document.getElementById('startGame');
const startGameButton = document.getElementById('startGameButton');
const quizBox = document.getElementById('quizBox');

// Default Game Values
let gameRound = 1;
let questionOfTheRound = {};
let points = 0;

// Events Listeners
startGameButton.addEventListener('click', () => {
  startGame.classList.remove('show');
  quizBox.classList.add('show');
  questionOfTheRound = selectQuestion(gameRound);
  showQuestion(questionOfTheRound, points);
});
