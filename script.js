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
const keyButton = document.getElementById("key-button");
const keyContent = document.getElementById("key-content");

let usedSentenceIndices = [];
let currentSentenceIndex;

// Find unique authors from the sentences array
const authors = Array.from(
  new Set(sentences.map((sentence) => sentence.author))
);

// Populate the select element with author options
authors.forEach((author) => {
  const option = document.createElement("option");
  option.value = author;
  option.textContent = author;
  authorSelect.appendChild(option);
});

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

  // Update the display with the first sentence of the filtered list
  currentSentenceIndex = getRandomSentenceIndex(filteredSentences);
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

keyButton.addEventListener("click", () => {
  if (keyContent.style.display === "block") {
    keyContent.style.display = "none";
  } else {
    keyContent.style.display = "block";
  }
});

// Initialize the typing test automatically when the page loads
window.addEventListener("load", startTypingTest);
