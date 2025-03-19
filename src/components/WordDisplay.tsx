
import { motion } from 'framer-motion';

interface WordDisplayProps {
  wordDisplay: string[];
}

const WordDisplay = ({ wordDisplay }: WordDisplayProps) => {
  return (
    <div className="flex justify-center my-6 min-h-12">
      {wordDisplay.map((letter, index) => (
        <motion.div
          key={`${index}-${letter}`}
          className="character-dash"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: index * 0.1,
            duration: 0.4,
            ease: "easeOut"
          }}
        >
          {letter.toUpperCase()}
        </motion.div>
      ))}
    </div>
  );
};

export default WordDisplay;
