
import { motion } from 'framer-motion';

interface GameOverMessageProps {
  isWin: boolean;
  word: string;
  onRestart: () => void;
  isVisible: boolean;
}

const GameOverMessage = ({ isWin, word, onRestart, isVisible }: GameOverMessageProps) => {
  if (!isVisible) return null;
  
  return (
    <motion.div
      className="mt-3 text-center"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className={`text-xl font-bold mb-2 ${isWin ? 'text-green-600' : 'text-hangman-highlight'}`}>
        {isWin ? 'Congratulations! You won!' : 'Game Over!'}
      </h2>
      <p className="mb-2">
        {isWin 
          ? 'Great job guessing the word!'
          : `The word was: ${word.toUpperCase()}`
        }
      </p>
    </motion.div>
  );
};

export default GameOverMessage;
