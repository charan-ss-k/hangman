
// Word lists for different difficulty levels
export const easyWords = [
  "apple", "banana", "cherry", "orange", "grape", 
  "table", "chair", "house", "beach", "light",
  "music", "happy", "smile", "laugh", "friend",
  "water", "paper", "phone", "movie", "plant"
];

export const hardWords = [
  "psychology", "xylophone", "jurisprudence", "cryptography", "pneumonia",
  "kaleidoscope", "pharmaceutical", "entrepreneur", "connoisseur", "idiosyncrasy",
  "mississippi", "acquiesce", "phenomenon", "labyrinth", "mnemonic",
  "quintessential", "zeitgeist", "juxtaposition", "rhinoceros", "neuroscience"
];

// Get a random word from the list
export const getRandomWord = (isHardMode: boolean): string => {
  const wordList = isHardMode ? hardWords : easyWords;
  return wordList[Math.floor(Math.random() * wordList.length)];
};

// Check if letter exists in the word
export const checkLetter = (letter: string, word: string): boolean => {
  return word.toLowerCase().includes(letter.toLowerCase());
};

// Check if the player has won the game
export const checkWin = (word: string, guessedLetters: string[]): boolean => {
  return [...word.toLowerCase()].every(letter => 
    guessedLetters.includes(letter.toLowerCase())
  );
};

// Create the display for the word with blanks and correctly guessed letters
export const createWordDisplay = (word: string, guessedLetters: string[]): string[] => {
  return [...word.toLowerCase()].map(letter => 
    guessedLetters.includes(letter.toLowerCase()) ? letter : ""
  );
};

// Generate keyboard keys
export const generateKeyboardKeys = (): string[] => {
  return "abcdefghijklmnopqrstuvwxyz".split("");
};
