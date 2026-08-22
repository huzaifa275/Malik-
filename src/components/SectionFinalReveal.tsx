import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Flower2, RotateCcw, Smile } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSoftPopSound, playSparkleSound, playPlayfulSound } from '../utils/soundEffects';

interface SectionFinalRevealProps {
  onRestart: () => void;
}

export const SectionFinalReveal: React.FC<SectionFinalRevealProps> = ({ onRestart }) => {
  const [smileCount, setSmileCount] = useState(0);
  const [showHug, setShowHug] = useState(false);

  const handleSmileClick = () => {
    playSparkleSound();
    setSmileCount((prev) => prev + 1);

    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#f472b6', '#e9d5ff', '#fb7185', '#fbcfe8'],
    });
  };

  const handleHugClick = () => {
    playPlayfulSound();
    setShowHug(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-lg mx-auto"
    >
      <div className="relative bg-white/85 backdrop-blur-2xl border-2 border-pink-200/90 rounded-[36px] p-8 md:p-11 shadow-2xl shadow-pink-300/50 text-center overflow-hidden">
        {/* Soft background magical glows */}
        <div className="absolute -top-16 -left-16 w-48 h-48 bg-pink-300/40 rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-purple-300/40 rounded-full blur-3xl pointer-events-none animate-pulse" />

        {/* Top Flower Ribbon */}
        <motion.div
          animate={{ rotate: [0, 8, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-pink-100/90 border border-pink-200 text-pink-700 text-xs font-bold mb-6 shadow-sm"
        >
          <Flower2 className="w-4 h-4 text-pink-500" />
          <span>Always Remember 🎀</span>
          <Sparkles className="w-4 h-4 text-purple-500" />
        </motion.div>

        {/* Large Elegant Heading */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#4a1f3d] mb-6 font-['Comfortaa'] leading-tight tracking-tight">
          You’re Special. <span className="inline-block text-pink-500">🌷</span>
        </h1>

        {/* Heartfelt Message Box */}
        <div className="space-y-4 text-base md:text-lg text-[#5c2d49] leading-relaxed mb-8 bg-gradient-to-br from-pink-50/90 via-purple-50/50 to-pink-50/90 rounded-3xl p-6 border border-pink-200/80 shadow-inner">
          <p className="text-sm md:text-base text-pink-800 font-medium italic font-['Plus_Jakarta_Sans']">
            “Zyada complicated words nahi hain mere paas…<br />
            bas simple si baat hai:”
          </p>

          <div className="py-2">
            <p className="text-lg md:text-xl font-bold text-pink-700 font-['Comfortaa']">
              You matter. You’re appreciated.<br />
              And you deserve lots of smiles. 💗
            </p>
          </div>

          <div className="pt-3 border-t border-pink-200/70">
            <p className="text-base md:text-lg font-semibold text-purple-900">
              So please… <span className="text-pink-600 font-extrabold underline decoration-pink-300 decoration-wavy">smile karo</span>.<br />
              <span className="text-sm md:text-base font-normal text-[#6b3c5a] block mt-1">
                Because your smile suits you. 🎀✨
              </span>
            </p>
          </div>
        </div>

        {/* Handwritten Elegant Signature */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="my-8 py-4 px-6 rounded-2xl bg-white/70 border border-pink-100/90 shadow-sm inline-block w-full"
        >
          <p className="text-base text-pink-700/80 font-medium mb-1 font-['Plus_Jakarta_Sans']">
            With a little smile,
          </p>
          <p className="text-3xl md:text-4xl font-bold text-pink-700 font-['Caveat'] tracking-wide">
            from Huzaifa 💗✨
          </p>
        </motion.div>

        {/* Interactive Cute Action Buttons */}
        <div className="space-y-3">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleSmileClick}
            type="button"
            className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-pink-400 to-rose-400 text-white font-bold text-sm md:text-base shadow-md shadow-pink-200/80 hover:shadow-pink-300/90 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Smile className="w-4 h-4 text-yellow-200" />
            <span>
              {smileCount === 0 ? 'Send a smile back! 😊' : `Smiles sent: ${smileCount} 💖!`}
            </span>
            <Heart className="w-4 h-4 fill-white" />
          </motion.button>

          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleHugClick}
              type="button"
              className="flex-1 py-3 px-4 rounded-xl bg-purple-100 hover:bg-purple-200 text-purple-800 font-semibold text-xs md:text-sm border border-purple-200 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Virtual Hug 🫂</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                playSoftPopSound();
                onRestart();
              }}
              type="button"
              className="py-3 px-4 rounded-xl bg-pink-50 hover:bg-pink-100 text-pink-700 font-semibold text-xs md:text-sm border border-pink-200 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Replay 🔄</span>
            </motion.button>
          </div>
        </div>

        {/* Virtual Hug Modal Pop */}
        <AnimatePresence>
          {showHug && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-300 text-purple-900 shadow-md text-sm font-medium relative"
            >
              <p>🫂 **Virtual Hug Sent!**</p>
              <p className="text-xs text-purple-700 mt-1">
                Whenever you feel down, remember you have a great friend in Huzaifa. 🌸✨
              </p>
              <button
                onClick={() => setShowHug(false)}
                type="button"
                className="mt-2 px-3 py-1 bg-white/80 rounded-full text-xs text-purple-800 font-bold border border-purple-200"
              >
                Close 💖
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
