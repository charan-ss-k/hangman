
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from "sonner";
import { 
  getRandomWord, 
  checkLetter, 
  checkWin,
  createWordDisplay
} from '../utils/hangmanUtils';
import HangmanImage from '../components/HangmanImage';
import WordDisplay from '../components/WordDisplay';
import DifficultySelector from '../components/DifficultySelector';
import GameOverMessage from '../components/GameOverMessage';
import CharacterInput from '../components/CharacterInput';

const Index = () => {
  // Game states
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [isHardMode, setIsHardMode] = useState<boolean>(false);
  const [word, setWord] = useState<string>('');
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [correctLetters, setCorrectLetters] = useState<string[]>([]);
  const [incorrectLetters, setIncorrectLetters] = useState<string[]>([]);
  const [wordDisplay, setWordDisplay] = useState<string[]>([]);
  const [wrongAttempts, setWrongAttempts] = useState<number>(0);
  const [maxAttempts, setMaxAttempts] = useState<number>(6);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isWin, setIsWin] = useState<boolean>(false);

  // Effect for first load animations
  useEffect(() => {
    // Preload hangman images
    for (let i = 0; i <= 6; i++) {
      const img = new Image();
      img.src = `/hangman-${i}.png`;
    }
  }, []);

  // Effect to update word display based on guessed letters
  useEffect(() => {
    if (word) {
      setWordDisplay(createWordDisplay(word, guessedLetters));
    }
  }, [word, guessedLetters]);

  // Effect to check win/lose conditions
  useEffect(() => {
    if (!word || wrongAttempts === 0) return;

    // Check if player has won
    if (checkWin(word, guessedLetters)) {
      setIsWin(true);
      setIsGameOver(true);
      toast.success("Congratulations! You won!");
    }
    
    // Check if player has lost
    if (wrongAttempts >= maxAttempts) {
      setIsGameOver(true);
      toast.error("Game Over! You ran out of attempts.");
    }
  }, [word, guessedLetters, wrongAttempts, maxAttempts]);

  const startGame = (hardMode: boolean) => {
    const newWord = getRandomWord(hardMode);
    setIsHardMode(hardMode);
    setWord(newWord);
    setGuessedLetters([]);
    setCorrectLetters([]);
    setIncorrectLetters([]);
    setWrongAttempts(0);
    setMaxAttempts(hardMode ? 5 : 6); // Hard mode has fewer attempts
    setIsGameOver(false);
    setIsWin(false);
    setGameStarted(true);
    
    console.log(`Game started with word: ${newWord} (${hardMode ? 'Hard' : 'Easy'} mode)`);
  };

  const handleLetterGuess = (letter: string) => {
    if (isGameOver || guessedLetters.includes(letter)) return;

    const letterLower = letter.toLowerCase();
    setGuessedLetters((prev) => [...prev, letterLower]);

    // Check if the letter is in the word
    if (checkLetter(letterLower, word)) {
      setCorrectLetters((prev) => [...prev, letterLower]);
      toast.success(`Good guess! '${letter.toUpperCase()}' is in the word.`);
    } else {
      setIncorrectLetters((prev) => [...prev, letterLower]);
      setWrongAttempts((prev) => prev + 1);
      toast.error(`Oops! '${letter.toUpperCase()}' is not in the word.`);
    }
  };

  const restartGame = () => {
    setGameStarted(false);
  };

  // Card variants for animations
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div 
        className="hangman-card"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 
          className="hangman-title text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Hangman Game
        </motion.h1>

        {!gameStarted ? (
          <DifficultySelector onSelectDifficulty={startGame} />
        ) : (
          <>
            <div className="flex flex-col items-center">
              <div className="text-center mb-4">
                <motion.p
                  className="text-sm font-medium text-gray-600"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                >
                  Mode: {isHardMode ? 'Hard' : 'Easy'}
                </motion.p>
                <motion.p
                  className="text-sm font-medium text-gray-600"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                >
                  Attempts Left: {maxAttempts - wrongAttempts}
                </motion.p>
              </div>

              <WordDisplay wordDisplay={wordDisplay} />
              
              <HangmanImage 
                wrongAttempts={wrongAttempts} 
                maxAttempts={maxAttempts} 
              />

              <GameOverMessage 
                isWin={isWin}
                word={word}
                onRestart={restartGame}
                isVisible={isGameOver}
              />

              <CharacterInput 
                onLetterGuess={handleLetterGuess}
                isGameOver={isGameOver}
                onRestart={restartGame}
              />
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default Index;
