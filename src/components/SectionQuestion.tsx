import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flower2, Sparkles, Heart } from 'lucide-react';
import { playPlayfulSound, playSoftPopSound } from '../utils/soundEffects';

interface SectionQuestionProps {
  onNext: () => void;
}

export const SectionQuestion: React.FC<SectionQuestionProps> = ({ onNext }) => {
  const [showReaction, setShowReaction] = useState(false);

  const handleAnswer = () => {
    playPlayfulSound();
    setShowReaction(true);
  };

  const handleContinue = () => {
    playSoftPopSound();
    onNext();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -25, scale: 0.96 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-md mx-auto"
    >
      <div className="relative bg-white/75 backdrop-blur-xl border border-white/90 rounded-[32px] p-8 md:p-10 shadow-xl shadow-purple-200/40 text-center overflow-hidden">
        {/* Glow decoration */}
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-purple-200/40 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-pink-200/40 rounded-full blur-2xl pointer-events-none" />

        {/* Top Flower icon */}
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 mb-5 shadow-sm"
        >
          <Flower2 className="w-6 h-6 text-pink-500" />
        </motion.div>

        {/* Question Text */}
        <div className="space-y-4 text-center mb-8">
          <p className="text-xl md:text-2xl font-bold text-[#5c2d49] font-['Comfortaa']">
            “Ek choti si baat poochun? 👀”
          </p>

          <div className="bg-gradient-to-br from-purple-50/80 to-pink-50/80 rounded-2xl p-5 border border-purple-100/60 shadow-inner">
            <p className="text-base md:text-lg text-[#6b425b] leading-relaxed font-medium">
              “Tumhe pata hai na…<br />
              <span className="text-pink-600 font-bold text-lg md:text-xl inline-block mt-1">
                tum actually bohot special ho? 🥹🌷
              </span>
            </p>
          </div>
        </div>

        {/* Playful Reaction Popup */}
        <AnimatePresence>
          {showReaction && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="mb-6 p-4 rounded-2xl bg-pink-100/90 border border-pink-300 text-pink-800 shadow-md font-semibold text-base flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-pink-500 animate-spin" />
              <span>“Acchaaa… itna confidence 😭😂🎀”</span>
              <Heart className="w-4 h-4 text-rose-500 fill-rose-400" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Button */}
        {!showReaction ? (
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleAnswer}
            type="button"
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 hover:from-purple-500 hover:to-rose-500 text-white font-bold text-base md:text-lg shadow-lg shadow-purple-200/60 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Haan pata hai 😌</span>
          </motion.button>
        ) : (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleContinue}
            type="button"
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-400 to-purple-500 text-white font-bold text-base md:text-lg shadow-lg shadow-pink-300/60 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Aage bolo 😭👉🏻👈🏻</span>
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};
