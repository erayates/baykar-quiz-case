import { start } from "./app/start";
import { instructions } from "./app/instructions";
import "./style.css";
import baykarLogo from "/assets/logo.png";

export function _welcome() {
  document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div id="welcome" class="space-y-8">
    <a href="https://baykartech.com/en/" target="_blank" class="flex items-right flex-col space-y-1">
      <img src="${baykarLogo}" class="logo" alt="Vite logo" width="350" />
      <h1 class="uppercase text-blue-950 font-bold leading-6 text-left text-3xl">Quiz Application</h1>
    </a>

    <p class="text-slate-400 text-left">You can click on the “Start Quiz” button to start the quiz and click on the “Show Instructions button to browse the instructions. Have fun, read the questions carefully :)</p>

    <div class="flex space-x-4 w-full">
      <button id="start" type="button" class="bg-blue-950 w-full">Start Quiz</button>
      <button id="rules" type="button" class="bg-blue-950 w-full">Show Instructions</button>
    </div>
  </div>
`;

  start(
    document.querySelector<HTMLButtonElement>("#start")!,
    document.querySelector<HTMLDivElement>("#app")!
  );

  instructions(
    document.querySelector<HTMLButtonElement>("#rules")!,
    document.querySelector<HTMLDivElement>("#app")!
  );
}

_welcome();
