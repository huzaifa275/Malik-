import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart } from 'lucide-react';
import { playSoftPopSound } from '../utils/soundEffects';

interface SectionWelcomeProps {
  onNext: () => void;
}

export const SectionWelcome: React.FC<SectionWelcomeProps> = ({ onNext }) => {
  const handleClick = () => {
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
      <div className="relative bg-white/75 backdrop-blur-xl border border-white/90 rounded-[32px] p-8 md:p-10 shadow-xl shadow-pink-200/40 text-center overflow-hidden">
        {/* Soft background glow decoration */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-pink-200/40 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-purple-200/40 rounded-full blur-2xl pointer-events-none" />

        {/* Cute Ribbon Header */}
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100/80 border border-pink-200/80 text-pink-600 text-xs font-semibold mb-6 shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-pink-500 animate-spin" style={{ animationDuration: '6s' }} />
          <span>A Special Little Note</span>
          <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-400" />
        </motion.div>

        {/* Main Title */}
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#5c2d49] mb-6 flex items-center justify-center gap-2 font-['Comfortaa']">
          For You <span className="inline-block animate-bounce" style={{ animationDuration: '2.5s' }}>🎀</span>
        </h1>

        {/* Text Block */}
        <div className="space-y-3 text-base md:text-lg text-[#6b425b] leading-relaxed font-normal mb-8 bg-pink-50/50 rounded-2xl p-5 border border-pink-100/60 shadow-inner">
          <p className="font-semibold text-pink-700">“Oyee… rukooo 👀”</p>
          <p>Ye normal website nahi hai 😭🎀</p>
          <p className="text-sm md:text-base text-[#80506d] italic font-['Plus_Jakarta_Sans']">
            Thora sa patience rakho… kuch kehna hai.
          </p>
        </div>

        {/* Cute Animated Button */}
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={handleClick}
          type="button"
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-pink-400 via-rose-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white font-bold text-base md:text-lg shadow-lg shadow-pink-300/50 hover:shadow-pink-400/60 transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
        >
          <span>Okayyy, bolo 😭👉🏻👈🏻</span>
        </motion.button>
      </div>
    </motion.div>
  );
};
