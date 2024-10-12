import { API_URL } from "../utils/constants";

export async function _fetchQuestions() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch questions:", error);
    throw error;
  }
}
