import React from 'react';
import { Volume2, VolumeX, Music, Sparkles } from 'lucide-react';
import { playSoftPopSound } from '../utils/soundEffects';

interface MusicPlayerProps {
  isPlaying: boolean;
  onToggle: () => void;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ isPlaying, onToggle }) => {
  const handleToggle = () => {
    playSoftPopSound();
    onToggle();
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={handleToggle}
        type="button"
        className={`group relative flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold transition-all duration-300 shadow-md backdrop-blur-md border cursor-pointer select-none ${
          isPlaying
            ? 'bg-white/80 text-pink-700 border-pink-300/80 shadow-pink-200/50 scale-105'
            : 'bg-white/60 hover:bg-white/90 text-pink-600 border-white/80 hover:border-pink-200 shadow-purple-100/40 hover:scale-105'
        }`}
        title={isPlaying ? 'Pause Music' : 'Play Song'}
      >
        <span className="relative flex h-2.5 w-2.5 items-center justify-center">
          {isPlaying ? (
            <>
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
            </>
          ) : (
            <Sparkles className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
          )}
        </span>

        <span className="flex items-center gap-1.5 font-medium tracking-wide">
          {isPlaying ? (
            <>
              <Music className="w-3.5 h-3.5 animate-bounce text-purple-500" />
              <span>Playing Song 🎵</span>
            </>
          ) : (
            <>
              <span>🎵 Play Song</span>
            </>
          )}
        </span>

        <div className="ml-1 text-pink-500">
          {isPlaying ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5 opacity-60" />}
        </div>
      </button>
    </div>
  );
};

