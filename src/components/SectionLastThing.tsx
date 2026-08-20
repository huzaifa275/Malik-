import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Eye, Stars } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSparkleSound, playSoftPopSound } from '../utils/soundEffects';

interface SectionLastThingProps {
  onFinalReveal: () => void;
}

export const SectionLastThing: React.FC<SectionLastThingProps> = ({ onFinalReveal }) => {
  const handleClick = () => {
    playSparkleSound();

    // Trigger sweet sparkle particles burst
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f472b6', '#c084fc', '#fbcfe8', '#fb7185', '#e9d5ff'],
      shapes: ['star', 'circle'],
      scalar: 1.2,
    });

    onFinalReveal();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -25, scale: 0.96 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-md mx-auto"
    >
      <div className="relative bg-white/80 backdrop-blur-xl border border-white/90 rounded-[32px] p-8 md:p-10 shadow-2xl shadow-purple-200/50 text-center overflow-hidden">
        {/* Glowing aura */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-r from-pink-300/40 to-purple-300/40 rounded-full blur-3xl pointer-events-none" />

        {/* Suspense icon */}
        <motion.div
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-purple-100 text-purple-600 mb-6 shadow-inner"
        >
          <Eye className="w-7 h-7 text-pink-500" />
        </motion.div>

        {/* Suspense Text */}
        <div className="space-y-3 text-base md:text-lg text-[#5c2d49] leading-relaxed mb-8 bg-purple-50/60 rounded-2xl p-6 border border-purple-100 shadow-inner font-medium">
          <p className="text-lg md:text-xl font-bold text-purple-900">
            “Bas itna hi kehna tha…”
          </p>
          <p className="text-pink-600 font-semibold flex items-center justify-center gap-1.5 text-lg">
            <span>lekin wait 👀</span>
          </p>
          <p className="text-sm md:text-base text-purple-700 italic font-['Plus_Jakarta_Sans']">
            ek last thing hai. ✨
          </p>
        </div>

        {/* Final Reveal Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleClick}
          type="button"
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-400 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-extrabold text-lg shadow-xl shadow-pink-300/60 hover:shadow-pink-400/80 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer group"
        >
          <Stars className="w-5 h-5 text-yellow-200 animate-spin" style={{ animationDuration: '4s' }} />
          <span>One Last Thing ✨</span>
          <Sparkles className="w-5 h-5 text-pink-200" />
        </motion.button>
      </div>
    </motion.div>
  );
};
