import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, Flower2 } from 'lucide-react';
import { playSoftPopSound } from '../utils/soundEffects';

interface SectionRealMessageProps {
  onNext: () => void;
}

export const SectionRealMessage: React.FC<SectionRealMessageProps> = ({ onNext }) => {
  const [revealedIndex, setRevealedIndex] = useState<number>(0);

  const lines = [
    "“Shayad main har baar properly express nahi kar pata,",
    "lekin tum meri life ke un logon mein se ho jinki presence genuinely matter karti hai. 💗”",
    "“Tumse baat karna, tumhari silly baatein sunna, aur tumhara around hona… somehow everything feels a little better. 🌷”",
    "“Bas ye yaad rakhna — tum jaisi ho, waise hi bohot achi ho. 🦋✨”"
  ];

  useEffect(() => {
    // Automatically reveal lines one by one gently
    if (revealedIndex < lines.length - 1) {
      const timer = setTimeout(() => {
        setRevealedIndex((prev) => prev + 1);
      }, 2200);
      return () => clearTimeout(timer);
    }
  }, [revealedIndex, lines.length]);

  const handleNextClick = () => {
    playSoftPopSound();
    onNext();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -25, scale: 0.96 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-lg mx-auto"
    >
      <div className="relative bg-white/80 backdrop-blur-2xl border border-white/90 rounded-[32px] p-7 md:p-10 shadow-2xl shadow-pink-200/50 text-left overflow-hidden">
        {/* Soft floating glow orbs */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-pink-300/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-300/30 rounded-full blur-3xl pointer-events-none" />

        {/* Card Header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-pink-100/80">
          <div className="flex items-center gap-2 text-pink-600 font-bold font-['Comfortaa'] text-lg">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-400 animate-pulse" />
            <span>The Real Message 💗</span>
          </div>
          <motion.div
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="p-1.5 rounded-full bg-pink-100 text-pink-500"
          >
            <Sparkles className="w-4 h-4" />
          </motion.div>
        </div>

        {/* Staggered Lines */}
        <div className="space-y-4 mb-8">
          {lines.map((line, idx) => {
            const isVisible = idx <= revealedIndex;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -15, y: 10 }}
                animate={isVisible ? { opacity: 1, x: 0, y: 0 } : { opacity: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className={`p-4 rounded-2xl transition-all duration-300 ${
                  idx === 1
                    ? 'bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-200/60 font-semibold text-pink-900'
                    : idx === 3
                    ? 'bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200/60 font-bold text-purple-900'
                    : 'bg-white/60 border border-pink-100/80 text-[#6a3f5a]'
                } text-base md:text-lg leading-relaxed shadow-sm`}
              >
                <p>{line}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Continue Button */}
        {revealedIndex >= lines.length - 1 && (
          <motion.button
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleNextClick}
            type="button"
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-pink-400 via-rose-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white font-bold text-base md:text-lg shadow-lg shadow-pink-200/60 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Ek aur baat hai... 👀</span>
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};
