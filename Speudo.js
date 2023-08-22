// Sample Ancient Greek sentences (you can add more)
const sentences = [
  {
    greek:
      "τῶν τε γὰρ μαινομένων τοὺς μὲν οὐδὲ τὰ δεινὰ δεδιέναι, τοὺς δὲ καὶ τὰ μὴ φοβερὰ φοβεῖσθαι",
    english:
      "For, among madmen, some have no terror even of what is terrible, while others are frightened even by what is not frightening",
    author: "Xenophon",
    book: "Memorabilia",
  },
  {
    greek:
      "οὔτε γὰρ τῷ καλῶς ἀγρὸν φυτευσαμένῳ δῆλον ὅστις καρπώσεται, οὔτε τῷ καλῶς οἰκίαν οἰκοδομησαμένῳ δῆλον ὅστις ἐνοικήσει",
    english:
      "For, to the one who has nobly planted a field, it is not clear who will reap from it; nor to the one who has nobly built a house is it clear who will inhabit it",
    author: "Xenophon",
    book: "Memorabilia",
  },
  {
    greek: "οὐ θαυμαστὸν εἰ μὴ τούτων ἐνεθυμήθησαν;",
    english:
      "But is it not a wonder that they didn't take to heart what everyone knew?",
    author: "Xenophon",
    book: "Memorabilia",
  },
  {
    greek: "γενοῦ ὅποιος εἶ, μαθὼν τάδ᾽ ἔστιν.",
    english: "Become such as you are, having learned what that is.",
    author: "Pindar",
    book: "Second Pythian Ode",
  },

  // Add more sentences with their translations here
];

const textToType = document.getElementById("text-to-type");
const englishTranslation = document.getElementById("english-translation");
const textInfo = document.getElementById("text-info");
const userInput = document.getElementById("user-input");
const authorSelect = document.getElementById("author-select");

let usedSentenceIndices = [];
let currentSentenceIndex = -1; // Initialize with an invalid index

// Function to shuffle an array randomly
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function getRandomSentenceIndex(sentencesArray) {
  const availableIndices = sentencesArray
    .map((_, index) => index)
    .filter((index) => !usedSentenceIndices.includes(index));

  if (availableIndices.length === 0) {
    // All sentences have been used, reset the usedSentenceIndices array
    usedSentenceIndices = [];
    return getRandomSentenceIndex(sentencesArray); // Get a random sentence from the reset list
  }

  return availableIndices[Math.floor(Math.random() * availableIndices.length)];
}

function startTypingTest() {
  // Determine which author is selected in the dropdown
  const selectedAuthor = authorSelect.value;

  // Filter the sentences based on the selected author or show all sentences
  const filteredSentences =
    selectedAuthor === "all"
      ? sentences
      : sentences.filter((sentence) => sentence.author === selectedAuthor);

  // Ensure that the next sentence is not the current sentence or in the usedSentenceIndices
  do {
    currentSentenceIndex = getRandomSentenceIndex(filteredSentences);
  } while (
    currentSentenceIndex === usedSentenceIndices[usedSentenceIndices.length - 1]
  );

  usedSentenceIndices.push(currentSentenceIndex);

  textToType.textContent = filteredSentences[currentSentenceIndex].greek;
  englishTranslation.textContent =
    filteredSentences[currentSentenceIndex].english;
  textInfo.textContent = `- ${filteredSentences[currentSentenceIndex].author}, ${filteredSentences[currentSentenceIndex].book}`;

  userInput.value = "";
  userInput.focus();
}

// Add an event listener to the author dropdown
authorSelect.addEventListener("change", () => {
  usedSentenceIndices = []; // Clear the history when the author changes
  userInput.value = ""; // Clear the textbox
  startTypingTest();
});

// Add an event listener to the Enter key press
userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault(); // Prevent the default form submission
    userInput.value = ""; // Clear the textbox
    startTypingTest();
  }
});

// Initialize the typing test automatically when the page loads
window.addEventListener("load", startTypingTest);
