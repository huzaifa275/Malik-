import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart, Music } from 'lucide-react';

interface TapToEnterOverlayProps {
  onEnter: () => void;
}

export const TapToEnterOverlay: React.FC<TapToEnterOverlayProps> = ({ onEnter }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      onClick={onEnter}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6 bg-[#FFF5F8]/85 backdrop-blur-2xl cursor-pointer select-none overflow-hidden"
    >
      {/* Soft Ambient glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-pink-300/30 rounded-full blur-[90px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-300/30 rounded-full blur-[100px] pointer-events-none animate-pulse" />

      {/* Main Frosted Card */}
      <motion.div
        initial={{ scale: 0.92, y: 16 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative bg-white/65 backdrop-blur-xl border border-pink-200/80 rounded-[32px] p-8 md:p-10 shadow-lg text-center max-w-sm w-full space-y-5"
      >
        {/* Top Floating Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-pink-200/80 text-pink-600 text-xs font-semibold shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-pink-400 animate-spin" style={{ animationDuration: '6s' }} />
          <span>A Little Surprise 🎀</span>
          <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-300" />
        </div>

        {/* Title */}
        <div className="space-y-1.5">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-800 font-['Comfortaa']">
            For You 🎀
          </h1>
          <p className="text-xs text-gray-500 font-medium">
            Turn your sound up for the sweet experience 🎵
          </p>
        </div>

        {/* Action Button */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onEnter();
          }}
          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-pink-400 via-rose-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white font-bold text-base shadow-md border border-white/40 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Music className="w-4 h-4 text-pink-100 animate-bounce" />
          <span>Tap to Enter 🎀</span>
        </motion.button>

        <p className="text-[11px] text-pink-700/60 font-medium">
          Tap anywhere to open with music ✨
        </p>
      </motion.div>
    </motion.div>
  );
};
