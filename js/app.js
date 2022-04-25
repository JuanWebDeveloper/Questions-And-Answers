// Import Of The Functions
import { selectQuestion, showFooter, showQuestion, showTime } from './gameFunctions.js';

// Elements HTML:
const startGame = document.getElementById('startGame');
const startGameButton = document.getElementById('startGameButton');
const quizBox = document.getElementById('quizBox');
const gameButtons = document.querySelector('#quizBox .buttons-game');
const nextQuestion = document.getElementById('nextQuestion');
const finishGame = document.getElementById('finishGame');

// Default Game Values
let gameRound = 1;
let roundData = {};
let points = parseInt(localStorage.getItem('points')) || 0;

// Events Listeners
startGameButton.addEventListener('click', () => {
  startGame.classList.remove('show');
  quizBox.classList.add('show');
  roundData = selectQuestion(gameRound);
  showQuestion(roundData, points);
  showTime(roundData);
  showFooter(gameRound);
});

// Event To Show The Next Question
nextQuestion.addEventListener('click', () => {
  gameRound++;
  gameButtons.classList.remove('show');
  if (gameRound <= 5) {
    points = parseInt(localStorage.getItem('points'));
    roundData = selectQuestion(gameRound);
    showQuestion(roundData, points);
    showTime(roundData);
    showFooter(gameRound);
  } else {
    console.log(points);
  }
});

// Event to withdraw from the game
finishGame.addEventListener('click', () => {
  const withdrawalAlert = Swal.mixin({
    customClass: {
      confirmButton: 'button game-button next-btn',
      cancelButton: 'button game-button finish-btn',
    },
    buttonsStyling: false,
  });

  withdrawalAlert
    .fire({
      title: '<span class="withdrawal-title">Are you sure?</span>',
      html: "<span class='withdrawal-text'>You won't be able to revert this!</span>",
      icon: 'warning',
      background: '#0c0c22',
      showCancelButton: true,
      confirmButtonText: '<span>Yes, I am sure!</span>',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        withdrawalAlert.fire({
          title: '<span class="alert-success_title">You Retired From The Game</span>',
          html: `<span class="alert-success_text">You have finished the game with <span>${points}</span> points</span>`,
          icon: 'success',
          background: '#13142a99',
          confirmButtonText: '<span>Understood thanks!</span>',
        });

        gameRound = 1;
        roundData = {};
        localStorage.setItem('points', 0);
        quizBox.classList.remove('show');
        startGame.classList.add('show');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        withdrawalAlert.fire({
          title: '<span class="withdrawal-title">Cancelled</span>',
          html: "<span class='withdrawal-text'>You can continue playing :)</span>",
          icon: 'error',
          background: '#13142a99',
          confirmButtonText: '<span>Understood thanks!</span>',
        });
      }
    });
});
