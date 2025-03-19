
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { generateKeyboardKeys } from '../utils/hangmanUtils';

interface KeyboardProps {
  onLetterPress: (letter: string) => void;
  correctLetters: string[];
  incorrectLetters: string[];
  isGameOver: boolean;
}

const Keyboard = ({ 
  onLetterPress, 
  correctLetters, 
  incorrectLetters, 
  isGameOver 
}: KeyboardProps) => {
  const [keys, setKeys] = useState<string[]>([]);

  useEffect(() => {
    setKeys(generateKeyboardKeys());
  }, []);

  const getButtonClass = (key: string) => {
    const baseClass = "keyboard-button";
    
    if (correctLetters.includes(key)) {
      return `${baseClass} keyboard-button-correct`;
    }
    
    if (incorrectLetters.includes(key)) {
      return `${baseClass} keyboard-button-incorrect`;
    }
    
    if (isGameOver) {
      return `${baseClass} keyboard-button-disabled`;
    }
    
    return baseClass;
  };

  return (
    <div className="keyboard-container">
      {keys.map((key, index) => (
        <motion.button
          key={key}
          className={getButtonClass(key)}
          onClick={() => onLetterPress(key)}
          disabled={
            correctLetters.includes(key) || 
            incorrectLetters.includes(key) || 
            isGameOver
          }
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.3, 
            delay: index * 0.03,
            ease: "easeOut" 
          }}
        >
          {key.toUpperCase()}
        </motion.button>
      ))}
    </div>
  );
};

export default Keyboard;
