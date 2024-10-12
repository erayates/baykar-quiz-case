import { IPlaceholderItem } from "../types/placeholder";

export function _generateQuestions(data: IPlaceholderItem[]) {
  // Shuffle the placeholder items
  const _shuffle = data.sort(() => 0.5 - Math.random());

  // Select 10 of them to use for questions
  const _select = _shuffle.slice(0, 10);

  // Create questions from selected 10 placeholder items
  const _questions = _select.map((item, _idx) => {
    const question = _sanitizeText(item.body);
    const options = _generateOptions(question);

    const correctOptionIndex = Math.floor(Math.random() * 4);
    const correctOption = options[correctOptionIndex];

    return { id: _idx, question, options, correctOption };
  });

  return _questions;
}

function _generateOptions(text: string, maxAttempts: number = 100): string[] {
  let options: string[] = [];

  // Generates unique options
  options = Array.from({ length: 4 }).map(() => {
    let _newOption: string;
    let attempts: number = 0;
    do {
      _newOption = _createOption(text) ?? "";
      attempts++;
    } while (options.includes(_newOption) && attempts < maxAttempts);

    if(options.includes(_newOption)) _newOption = "Lorem dolor sit amet!"
    return _newOption;
  });

  return options;
}

export function _createOption(
  text: string,
  minWords: number = 3,
  maxWords: number = 6
): string | undefined {
  // Split the text and trim it
  const words = text.split(" ").filter((word) => word.trim() !== "");

  // Restrict max. and min. number of words
  const clampedMinWords = Math.max(1, minWords);
  const clampedMaxWords = Math.min(maxWords, words.length);

  // Define random words
  const numberOfWords =
    Math.floor(Math.random() * (clampedMaxWords - clampedMinWords + 1)) +
    clampedMinWords;

  // Define random starting index
  const maxStartIndex = words.length - numberOfWords;
  if (maxStartIndex < 0) {
    console.warn("The text doesn't have enough words.");
    return undefined;
  }

  const startIndex = Math.floor(Math.random() * (maxStartIndex + 1));

  // Merge the words
  const selectedWords = words.slice(startIndex, startIndex + numberOfWords);
  const option = _sanitizeText(selectedWords.join(" "));

  return option;
}

function _sanitizeText(text: string): string {
  return text
    .replace(/[\n\r]/g, " ") // Replace newlines with spaces
    .replace(/\s+/g, " ") // Replace multiple spaces with a single space
    .replace(/[^\w\s.,!?-]/g, "") // Remove special characters except punctuation
    .trim(); // Remove leading and trailing whitespace
}

export function _getOptionClass(
  option: string,
  correctAnswer: string,
  userAnswer: string,
  optionIndex: number
) {
  let radius: string = "";
  if (optionIndex === 0) radius = "rounded-l-xl";
  if (optionIndex === 3) radius = "rounded-r-xl";

  if (option === correctAnswer && option == userAnswer)
    return `bg-green-800 text-white ${radius}`;
  if (option === correctAnswer) return `bg-green-500 text-white ${radius}`;
  if (option === userAnswer) return `bg-red-600 text-white ${radius}`;
}
