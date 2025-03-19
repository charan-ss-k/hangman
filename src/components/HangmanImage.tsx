
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface HangmanImageProps {
  wrongAttempts: number;
  maxAttempts: number;
}

const HangmanImage = ({ wrongAttempts, maxAttempts }: HangmanImageProps) => {
  const [imageSrc, setImageSrc] = useState<string>('/hangman-0.png');

  useEffect(() => {
    // Update image when wrong attempts change
    setImageSrc(`/hangman-${wrongAttempts}.png`);
  }, [wrongAttempts]);

  return (
    <div className="hangman-image-container">
      <motion.img 
        src={imageSrc} 
        alt={`Hangman state ${wrongAttempts} of ${maxAttempts}`}
        className="w-full h-full object-contain"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        key={wrongAttempts}
      />
    </div>
  );
};

export default HangmanImage;
