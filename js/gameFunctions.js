// Import Of Game Questions
import { firstRoundQuestions, secondRoundQuestions, thirdRoundQuestions, fourthRoundQuestions, fifthRoundQuestions } from './questions.js';

/*==> Functions For The Operation Of The Game <==*/

// Function To Select The Question
export const selectQuestion = (gameRound) => {
  let questionToShow = Math.floor(Math.random() * (5 - 0)) + 0;
  let questionOfTheRound = {};
  let questionTime = 0;

  switch (gameRound) {
    case 1:
      questionOfTheRound = firstRoundQuestions[questionToShow];
      questionTime = 30;
      break;
    case 2:
      questionOfTheRound = secondRoundQuestions[questionToShow];
      questionTime = 40;
      break;
    case 3:
      questionOfTheRound = thirdRoundQuestions[questionToShow];
      questionTime = 50;
      break;
    case 4:
      questionOfTheRound = fourthRoundQuestions[questionToShow];
      questionTime = 60;
      break;
    case 5:
      questionOfTheRound = fifthRoundQuestions[questionToShow];
      questionTime = 70;
      break;
    default:
      questionOfTheRound = {};
      break;
  }

  return { questionOfTheRound, questionTime };
};

// Function To Show The Question
export const showQuestion = (roundData, points) => {
  let { questionOfTheRound } = roundData;
  let elementOfPoints = document.querySelector('#quizBox .points span');
  let question = document.getElementById('questionText');
  let optionList = document.getElementById('optionList');

  elementOfPoints.innerHTML = points;
  question.innerHTML = `<span>${questionOfTheRound.question}</span>`;

  optionList.innerHTML = questionOfTheRound.options.map((option, index) => {
    let op = ['A', 'B', 'C', 'D'];
    return `
      <div class='option'>
        <span>
          <span class='op'>${op[index]}:</span> <span class='opText'>${option}</span>
        </span>
        <span></span>
      </div>
    `;
  });
};

// Shows The Time Remaining To Answer The Question
export const showTime = (roundData) => {
  let { questionOfTheRound, questionTime } = roundData;
  let timeCount = quizBox.querySelector('.timer .time-sec');
  let endOfTheGame = document.querySelector('#quizBox .finish-game_button');
  let counter = setInterval(timer, 1000);
  startTimerLine(questionTime);

  // Icons
  const correctIcon = '<div class="icon tick"><i class="fas fa-check"></i></div>';

  function timer() {
    timeCount.textContent = questionTime;
    questionTime--;

    if (questionTime < 9) {
      let addZero = timeCount.textContent;
      timeCount.textContent = `0${addZero}`;
    }
    if (questionTime < 0) {
      clearInterval(counter);
      timeCount.textContent = '0';

      let answer = questionOfTheRound.answer;
      let allOptions = document.querySelectorAll('#optionList .option');

      allOptions.forEach((option) => {
        if (option.querySelector('.opText').textContent === answer) {
          option.classList.add('correct');
          option.insertAdjacentHTML('beforeend', correctIcon);
        }
        option.classList.add('disabled');
      });

      endOfTheGame.classList.add('show');
    }
  }
};

// Show The Timer Line
const startTimerLine = (questionTime) => {
  let time = 0;
  let timerLine = (questionTime / 100) * 1000;
  let counterLine = setInterval(timer, timerLine + 10);
  let timeLine = quizBox.querySelector('.header .time-line');

  function timer() {
    time += 1;
    timeLine.style.width = `${time}%`;

    time > 99 && clearInterval(counterLine);
  }
};
