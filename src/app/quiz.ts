import { _fetchQuestions } from "../services/api";
import { _generateQuestions, _getOptionClass } from "../utils/helpers";
import { IQuestion } from "../types/question";
import { _welcome } from "../main";

let questions: IQuestion[];
let questionIndex: number;
let _currentQuestion: IQuestion;
let _userAnswers: string[] = [];
let timer: number;
let remainingTime: number;

async function _prepareQuestions() {
  const placeholder = await _fetchQuestions();
  const questions = _generateQuestions(placeholder);
  return questions;
}

export async function quiz(app: HTMLDivElement) {
  questions = await _prepareQuestions();
  questionIndex = 0;
  _currentQuestion = questions[questionIndex];
  _userAnswers = new Array(questions.length).fill("");
  _prepareQuizCard(app);
}

async function _prepareQuizCard(app: HTMLDivElement) {
  const questionCard = `<div class="shadow-xl border border-slate-300 rounded-xl w-80 md:w-[500px] p-4 space-y-4 text-left relative">
          <h3 class="text-slate-800 text-2xl font-bold">Question ${
            questionIndex + 1
          }</h3>
          <div class="h-[1px] w-full bg-slate-300"></div>
  
          <div id="timer" class="text-center text-blue-950 w-10 h-10 rounded-full absolute right-4 flex items-center justify-center top-0 border-2 border-blue-950 animate-pulse font-bold text-lg">30</div>
  
          <p class="text-xl text-slate-500 font-semibold">${
            _currentQuestion.question
          }</p>
  
          <div class="text-slate-500 text-md flex flex-col space-y-2">
              ${_currentQuestion.options
                .map(
                  (option) => `
                  <button class="option p-2 border border-slate-300 rounded hover:bg-slate-100 transition-colors" disabled>
                      ${option}
                  </button>
              `
                )
                .join("")}
          </div>
  
          <div class="flex justify-end">
              <button id="next" class="bg-blue-950 text-white p-2 rounded hover:bg-blue-900 transition-colors">Next -></button>
          </div>
  
          <p id="info" class="text-center text-slate-400 text-sm"></p>
      </div>`;

  app.innerHTML = questionCard;

  const infoText = document.querySelector("#info")!;

  const _nextButton = document.querySelector("#next") as HTMLButtonElement;
  if (_nextButton) {
    _nextButton.addEventListener("click", () => _nextQuestion(app));
  }

  const optionButtons = document.querySelectorAll(
    ".option"
  ) as NodeListOf<HTMLButtonElement>;

  // Disable options for the first 10 seconds
  setTimeout(() => {
    optionButtons.forEach((button) => {
      button.disabled = false;
    });
  }, 10000);

  optionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      optionButtons.forEach((btn) =>
        btn.classList.remove("bg-blue-100", "border-blue-500")
      );
      button.classList.add("bg-blue-100", "border-blue-500");
      _userAnswers[questionIndex] = button.textContent?.trim() ?? "";
    });
  });

  // Start the timer
  startTimer(app, infoText);
}

function startTimer(app: HTMLDivElement, info: Element) {
  remainingTime = 30;
  const timerElement = document.getElementById("timer");
  info.textContent = `Options will be enabled 10 seconds.`;

  timer = setInterval(() => {
    remainingTime--;
    if (timerElement) {
      timerElement.textContent = remainingTime.toString();
    }

    if (remainingTime >= 20) {
      info.textContent = `Options will be enabled ${
        remainingTime - 20
      } seconds.`;
    } else {
      info.textContent = "";
    }

    if (remainingTime <= 0) {
      clearInterval(timer);
      _nextQuestion(app);
    }
  }, 1000);
}

function _nextQuestion(app: HTMLDivElement) {
  clearInterval(timer);
  questionIndex = questionIndex + 1;
  if (questionIndex < questions.length) {
    _currentQuestion = questions[questionIndex];
    _prepareQuizCard(app);
    return;
  }
  _showResults(app);
}

function _showResults(app: HTMLDivElement) {
  const totalQuestions = questions.length;
  const numberOfCorrectAnswers = questions.filter(
    (q, index) => q.correctOption === _userAnswers[index]
  ).length;

  app.innerHTML = `
    <div class="space-y-4">
      <div class="shadow-xl border-2 border-slate-300 p-4 rounded-xl text-left text-2xl font-bold text-blue-950">
        <h2>Quiz Completed! 🎉</h2>
        <p>Thank you for participating.</p>
      </div>
      <div class="flex justify-end">
        <button id="restart" class="bg-blue-950 text-white text-lg">Restart Quiz</button>
      </div>
      <div class="shadow-xl border-2 border-slate-300 p-4 rounded-xl">
        <p class="text-left text-blue-950 text-lg font-semibold">Your results:</p>
        <p class="text-left text-slate-600 text-xl font-extrabold mt-2">${numberOfCorrectAnswers} / ${totalQuestions}</p>
      </div>
  
      <div class="shadow-xl border-2 border-slate-300 p-4 rounded-xl space-y-4">
        <h2 class="text-blue-950 text-xl text-left font-medium">Answers Table</h2>
        ${questions
          .map(
            (question: IQuestion, index: number) => `
          <div class="text-slate-600 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 items-start">
            <p class="text-sm text-left flex-1">
              ${question.question}
            </p>
            <div class="flex border border-slate-300 divide-x-2 divide-slate-300 rounded-xl w-full md:w-fit">
              ${question.options
                .map(
                  (option, optionIndex) => `
                <div class="p-2 flex-1 md:flex-auto ${_getOptionClass(
                  option,
                  question.correctOption,
                  _userAnswers[index],
                  optionIndex
                )}">
                  ${["A", "B", "C", "D"][optionIndex]}
                </div>
              `
                )
                .join("")}
            </div>
          </div>
        `
          )
          .join("")}
      </div>
    </div>`;

  const restartButton = document.querySelector("#restart")!;
  if (restartButton) restartButton.addEventListener("click", _restart);
}

function _restart() {
  _welcome();
}
