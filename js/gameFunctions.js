// Import Of Game Questions
import { firstRoundQuestions, secondRoundQuestions, thirdRoundQuestions, fourthRoundQuestions, fifthRoundQuestions } from './questions.js';

/*==> Functions For The Operation Of The Game <==*/

// Function To Select The Question
export const selectQuestion = (gameRound) => {
  let questionToShow = Math.floor(Math.random() * (5 - 0)) + 0;
  let questionOfTheRound = {};

  switch (gameRound) {
    case 1:
      questionOfTheRound = firstRoundQuestions[questionToShow];
      break;
    case 2:
      questionOfTheRound = secondRoundQuestions[questionToShow];
      break;
    case 3:
      questionOfTheRound = thirdRoundQuestions[questionToShow];
      break;
    case 4:
      questionOfTheRound = fourthRoundQuestions[questionToShow];
      break;
    case 5:
      questionOfTheRound = fifthRoundQuestions[questionToShow];
      break;
    default:
      questionOfTheRound = {};
      break;
  }

  return questionOfTheRound;
};

// Function To Show The Question
export const showQuestion = (questionOfTheRound, points) => {
  let elementOfPoints = document.querySelector('#quizBox .points span');
  let question = document.getElementById('questionText');
  let optionList = document.getElementById('optionList');

  elementOfPoints.innerHTML = points;
  question.innerHTML = `<span>${questionOfTheRound.question}</span>`;
  optionList.innerHTML = `
    <div class='option'>${questionOfTheRound.options[0]}<span></span></div>
    <div class='option'>${questionOfTheRound.options[1]}<span></span></div>
    <div class='option'>${questionOfTheRound.options[2]}<span></span></div>
    <div class='option'>${questionOfTheRound.options[3]}<span></span></div>
  `;
};
