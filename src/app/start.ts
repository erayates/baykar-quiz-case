import { _fetchQuestions } from "../services/api";
import { _generateQuestions } from "../utils/helpers";
import { quiz } from "./quiz";

export function start(element: HTMLButtonElement, app: HTMLDivElement) {
  function startQuiz() {
    // Remove welcome div
    const welcomeDiv = document.querySelector("#welcome")!;
    welcomeDiv.remove();

    quiz(app);
  }

  element.addEventListener("click", startQuiz);
}
