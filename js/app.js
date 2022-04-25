// Import Of The Functions
import { selectQuestion, showFooter, showQuestion, showTime } from './gameFunctions.js';

// Elements HTML:
const startGame = document.getElementById('startGame');
const startGameButton = document.getElementById('startGameButton');
const quizBox = document.getElementById('quizBox');
const gameButtons = document.querySelector('#quizBox .buttons-game');
const nextQuestion = document.getElementById('nextQuestion');
const finishGame = document.getElementById('finishGame');
const finishGameButton = document.querySelector('#quizBox .finish-game_button');
const endOfTheGame = document.getElementById('endOfTheGame');

// Default Game Values
let gameRound = 1;
let roundData = {};
let points = 0;

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
  points = parseInt(localStorage.getItem('points'));
  gameButtons.classList.remove('show');
  if (gameRound <= 5) {
    roundData = selectQuestion(gameRound);
    showQuestion(roundData, points);
    showTime(roundData);
    showFooter(gameRound);
  } else {
    // Win Game Alert
    const winGameAlert = Swal.mixin({
      customClass: {
        confirmButton: 'button game-button next-btn',
      },
      buttonsStyling: false,
    });

    winGameAlert
      .fire({
        title: '<span class="alert-win_title">!Felicidades!</span>',
        html: `<span class="alert-success_text">Has completado el juego con <span>${points}</span> puntos</span>`,
        icon: 'success',
        allowOutsideClick: false,
        background: '#0c0c22',
        confirmButtonText: '<span>Entendido, Gracias</span>',
      })
      .then((result) => {
        if (result.isConfirmed) {
          gameRound = 1;
          roundData = {};
          points = 0;
          localStorage.setItem('points', 0);
          quizBox.classList.remove('show');
          gameButtons.classList.remove('show');
          finishGame.classList.remove('hide');
          startGame.classList.add('show');
        }
      });
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
      title: '<span class="withdrawal-title">¿Estas seguro de que quieres retirarte?</span>',
      html: "<span class='withdrawal-text'>¡Si te retiras perderás tu avance!</span>",
      icon: 'warning',
      background: '#0c0c22',
      width: 600,
      showCancelButton: true,
      allowOutsideClick: false,
      confirmButtonText: '<span>Si, Estoy Seguro</span>',
      cancelButtonText: 'No, Cancelar',
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        points = parseInt(localStorage.getItem('points'));

        withdrawalAlert
          .fire({
            title: '<span class="alert-success_title">Te retiraste del juego</span>',
            html: `<span class="alert-success_text">Has terminado el juego con <span>${points}</span> puntos</span>`,
            icon: 'success',
            allowOutsideClick: false,
            background: '#0c0c22',
            confirmButtonText: '<span>Entendido, Gracias</span>',
          })
          .then((result) => {
            if (result.isConfirmed) {
              gameRound = 1;
              roundData = {};
              points = 0;
              localStorage.setItem('points', 0);
              quizBox.classList.remove('show');
              gameButtons.classList.remove('show');
              startGame.classList.add('show');
            }
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        withdrawalAlert.fire({
          title: '<span class="withdrawal-title">Se canceló el retiro del juego</span>',
          html: "<span class='withdrawal-text'>Puedes seguir jugando :)</span>",
          icon: 'error',
          allowOutsideClick: false,
          background: '#0c0c22',
          confirmButtonText: '<span>Entendido, Gracias</span>',
        });
      }
    });
});

// End Game Event
endOfTheGame.addEventListener('click', () => {
  const endGameAlert = Swal.mixin({
    customClass: {
      confirmButton: 'button game-button next-btn',
    },
    buttonsStyling: false,
  });

  endGameAlert
    .fire({
      title: '<span class="alert-end_game-title">¡Fin del juego!</span>',
      html: "<span class='withdrawal-text'>¡Perdiste todos tus puntos al responder mal!</span>",
      icon: 'error',
      background: '#0c0c22',
      allowOutsideClick: false,
      confirmButtonText: '<span>Entendido, Gracias</span>',
    })
    .then((result) => {
      if (result.isConfirmed) {
        gameRound = 1;
        roundData = {};
        points = 0;
        localStorage.setItem('points', 0);
        quizBox.classList.remove('show');
        finishGame.classList.contains('hide') && finishGame.classList.remove('hide');
        finishGameButton.classList.remove('show');
        startGame.classList.add('show');
      }
    });
});
