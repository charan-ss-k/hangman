
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface CharacterInputProps {
  onLetterGuess: (letter: string) => void;
  isGameOver: boolean;
  onRestart: () => void;
}

const CharacterInput = ({ onLetterGuess, isGameOver, onRestart }: CharacterInputProps) => {
  const [inputChar, setInputChar] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputChar.trim() && /^[a-zA-Z]$/.test(inputChar)) {
      onLetterGuess(inputChar.toLowerCase());
      setInputChar('');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow a single character
    const value = e.target.value;
    if (value.length <= 1) {
      setInputChar(value);
    }
  };

  // Show input and guess button during game, play again button when game is over
  if (isGameOver) {
    return (
      <motion.div
        className="mt-6 flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Button 
          onClick={onRestart}
          className="bg-hangman-button hover:bg-hangman-button-hover text-hangman-text px-6 py-2"
        >
          Play Again
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.form
      className="mt-6 flex justify-center items-center gap-2"
      onSubmit={handleSubmit}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Input
        type="text"
        value={inputChar}
        onChange={handleInputChange}
        className="w-16 text-center text-xl"
        maxLength={1}
        placeholder="A-Z"
        autoFocus
      />
      <Button 
        type="submit"
        className="bg-hangman-button hover:bg-hangman-button-hover text-hangman-text"
        disabled={!inputChar.trim() || !/^[a-zA-Z]$/.test(inputChar)}
      >
        Guess
      </Button>
    </motion.form>
  );
};

export default CharacterInput;
