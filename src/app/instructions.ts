export function instructions(element: HTMLButtonElement, app: HTMLDivElement) {
  function hideInstructions() {
    const _instructionsContainer = document.querySelector(
      "#instructions-container"
    );
    if (_instructionsContainer) {
      _instructionsContainer.remove();
    }
  }

  function showInstructions() {
    const instructionsHTML = `
        <div id="instructions-container" class="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div class="bg-bodyBg w-[380px] text-slate-700 rounded-lg p-8 relative">
            <button id="close-instructions" class="absolute right-4 top-4 text-white bg-blue-950 px-2 p-1 rounded">×</button>
            <h3 class="text-slate-700 font-semibold text-2xl text-left mb-4">Welcome to Baykar Quiz!</h3>
            <ul class="flex flex-col space-y-2 text-left text-sm">
                <li>
                    • The total number of questions is 10.
                </li>
                <li>
                    • There is only one correct answer for each question.
                </li>
                <li>
                    • The time given for each question is 30 seconds.
                </p>
                </li>
                    • You cannot mark any answer in the first 10 seconds. 
                </p>
                <p>
                    • After 30 seconds, if you do not click on any answer, your answer is considered incorrect.
                    After you finish, you can see your quiz result.
                </li>
                <li class="italic">
                    Good luck!
                </li>
            </div>
          </div>
        </div>
      `;

    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = instructionsHTML.trim();
    const instructionsElement = tempDiv.firstChild as HTMLElement;

    app.appendChild(instructionsElement);

    const closeButton = document.querySelector("#close-instructions");
    if (closeButton) {
      console.log("test");
      closeButton.addEventListener("click", hideInstructions);
    }
  }

  element.addEventListener("click", showInstructions);
}
