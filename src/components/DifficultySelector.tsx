
import { motion } from 'framer-motion';

interface DifficultySelectorProps {
  onSelectDifficulty: (isHard: boolean) => void;
}

const DifficultySelector = ({ onSelectDifficulty }: DifficultySelectorProps) => {
  return (
    <motion.div 
      className="mt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <h2 className="hangman-subtitle text-center mb-6">Choose your level:</h2>
      <div className="flex justify-center space-x-4">
        <motion.button
          className="difficulty-button bg-green-500 hover:bg-green-600 text-white"
          onClick={() => onSelectDifficulty(false)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Easy
        </motion.button>
        <motion.button
          className="difficulty-button bg-hangman-highlight hover:bg-red-700 text-white"
          onClick={() => onSelectDifficulty(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Hard
        </motion.button>
      </div>
    </motion.div>
  );
};

export default DifficultySelector;
