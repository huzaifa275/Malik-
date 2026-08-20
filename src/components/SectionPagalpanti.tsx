import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Laugh, Sparkles, Heart } from 'lucide-react';
import { playPlayfulSound, playSoftPopSound } from '../utils/soundEffects';

interface SectionPagalpantiProps {
  onNext: () => void;
}

export const SectionPagalpanti: React.FC<SectionPagalpantiProps> = ({ onNext }) => {
  const [pagalShakeCount, setPagalShakeCount] = useState(0);

  const handlePagalClick = () => {
    playPlayfulSound();
    setPagalShakeCount((prev) => prev + 1);
  };

  const handleNextClick = () => {
    playSoftPopSound();
    onNext();
  };

  const floatingEmojis = ['😭', '😂', '🎀', '🌷', '🤪', '🌸', '💖'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 25, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -25, scale: 0.96 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-md mx-auto relative"
    >
      {/* Floating Emojis in the background */}
      {floatingEmojis.map((emoji, index) => (
        <motion.div
          key={index}
          animate={{
            y: [0, -18, 0],
            x: [0, (index % 2 === 0 ? 10 : -10), 0],
            rotate: [0, 15, -15, 0],
          }}
          transition={{
            duration: 3 + (index % 3),
            repeat: Infinity,
            ease: 'easeInOut',
            delay: index * 0.3,
          }}
          className="absolute text-xl md:text-2xl pointer-events-none select-none z-10"
          style={{
            top: `${(index * 12) % 80}%`,
            left: index % 2 === 0 ? `-8%` : `100%`,
          }}
        >
          {emoji}
        </motion.div>
      ))}

      <div className="relative bg-white/80 backdrop-blur-xl border border-white/90 rounded-[32px] p-8 md:p-10 shadow-2xl shadow-rose-200/50 text-center overflow-hidden">
        {/* Glow decoration */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-yellow-200/40 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-pink-200/40 rounded-full blur-2xl pointer-events-none" />

        {/* Section Title */}
        <motion.div
          whileHover={{ rotate: [-2, 2, -2] }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100/80 border border-amber-200 text-amber-800 text-xs font-bold mb-6 shadow-sm"
        >
          <Laugh className="w-4 h-4 text-amber-600 animate-bounce" />
          <span>Thori Si Pagalpanti 😂🎀</span>
        </motion.div>

        <h2 className="text-2xl md:text-3xl font-extrabold text-[#5c2d49] mb-6 font-['Comfortaa']">
          “Okayyy… ab serious mode off 😭”
        </h2>

        {/* Main Text Block */}
        <div className="space-y-4 text-base md:text-lg text-[#6b3c5a] leading-relaxed mb-8 bg-gradient-to-br from-pink-50/90 to-purple-50/90 rounded-2xl p-5 border border-pink-100 shadow-inner">
          <p>“Aur haan…</p>
          <p className="flex items-center justify-center gap-1.5 flex-wrap">
            <span>kabhi kabhi tum thori si</span>
            {/* Interactive Shaking Word "pagal" */}
            <motion.span
              key={pagalShakeCount}
              animate={{
                x: [0, -6, 6, -4, 4, -2, 2, 0],
                rotate: [0, -5, 5, -3, 3, 0],
              }}
              transition={{ duration: 0.5 }}
              onClick={handlePagalClick}
              className="inline-flex items-center px-2.5 py-0.5 rounded-lg bg-pink-200 text-pink-900 font-black cursor-pointer shadow-sm hover:bg-pink-300 transition-colors select-none"
              title="Tap to shake!"
            >
              pagal
            </motion.span>
            <span>ho 😭😂</span>
          </p>

          <p className="text-sm md:text-base text-pink-700 font-medium">
            Kabhi cute, kabhi annoying,<br />
            aur kabhi dono ek saath. 🎀
          </p>

          <div className="pt-2 border-t border-pink-200/60 mt-3">
            <p className="text-base md:text-lg font-bold text-purple-900">
              “But unfortunately…<br />
              <span className="text-rose-600 font-extrabold text-xl font-['Comfortaa'] inline-block mt-1">
                meri favourite type ki pagal ho. 😭🌷
              </span>”
            </p>
          </div>
        </div>

        {/* Action Button */}
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={handleNextClick}
          type="button"
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400 hover:from-rose-500 hover:to-purple-500 text-white font-bold text-base md:text-lg shadow-lg shadow-rose-200/60 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Wait... ek last thing 👀</span>
        </motion.button>
      </div>
    </motion.div>
  );
};
