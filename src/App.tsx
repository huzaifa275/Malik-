/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Section } from './types';
import { BackgroundCanvas } from './components/BackgroundCanvas';
import { MusicPlayer } from './components/MusicPlayer';
import { YouTubeAudio, playBackgroundSongDirectly } from './components/YouTubeAudio';
import { TapToEnterOverlay } from './components/TapToEnterOverlay';
import { SectionWelcome } from './components/SectionWelcome';
import { SectionQuestion } from './components/SectionQuestion';
import { SectionRealMessage } from './components/SectionRealMessage';
import { SectionPagalpanti } from './components/SectionPagalpanti';
import { SectionLastThing } from './components/SectionLastThing';
import { SectionFinalReveal } from './components/SectionFinalReveal';
import { Heart, Sparkles } from 'lucide-react';
import { playSoftPopSound } from './utils/soundEffects';

export default function App() {
  const [currentSection, setCurrentSection] = useState<Section>(Section.WELCOME);
  const [hasEntered, setHasEntered] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  const totalSteps = 5;

  const getStepProgress = () => {
    switch (currentSection) {
      case Section.WELCOME:
        return 1;
      case Section.QUESTION:
        return 2;
      case Section.REAL_MESSAGE:
        return 3;
      case Section.PAGALPANTI:
        return 4;
      case Section.LAST_THING:
        return 5;
      case Section.FINAL_REVEAL:
        return 5;
      default:
        return 1;
    }
  };

  const handleEnter = () => {
    playSoftPopSound();
    playBackgroundSongDirectly();
    setIsPlaying(true);
    setHasEntered(true);
  };

  return (
    <main className="relative min-h-screen w-full flex flex-col justify-between items-center px-4 py-8 md:py-12 overflow-x-hidden font-['Plus_Jakarta_Sans'] select-none">
      {/* Background YouTube Audio Engine (Hidden UI, continuous playback) */}
      <YouTubeAudio
        isPlaying={isPlaying}
        onAutoplaySuccess={() => {
          setHasEntered(true);
        }}
      />

      {/* Tap to Enter screen if browser blocks initial sound autoplay */}
      <AnimatePresence>
        {!hasEntered && (
          <TapToEnterOverlay key="tap_overlay" onEnter={handleEnter} />
        )}
      </AnimatePresence>

      {/* Dreamy Animated Background */}
      <BackgroundCanvas isFinalStage={currentSection === Section.FINAL_REVEAL} />

      {/* Music Player Bar (Floating corner play/pause control) */}
      <MusicPlayer isPlaying={isPlaying} onToggle={() => setIsPlaying((prev) => !prev)} />

      {/* Top Header Badge */}
      <header className="z-10 text-center mb-6 pt-2">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-pink-200/80 text-pink-700 text-xs font-semibold shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-pink-500 animate-pulse" />
          <span>For You 🎀 — A Little Surprise</span>
          <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-300" />
        </motion.div>
      </header>

      {/* Main Interactive Stage */}
      <div className="z-10 w-full my-auto flex items-center justify-center">
        <AnimatePresence mode="wait">
          {currentSection === Section.WELCOME && (
            <SectionWelcome key="welcome" onNext={() => setCurrentSection(Section.QUESTION)} />
          )}

          {currentSection === Section.QUESTION && (
            <SectionQuestion key="question" onNext={() => setCurrentSection(Section.REAL_MESSAGE)} />
          )}

          {currentSection === Section.REAL_MESSAGE && (
            <SectionRealMessage key="real_message" onNext={() => setCurrentSection(Section.PAGALPANTI)} />
          )}

          {currentSection === Section.PAGALPANTI && (
            <SectionPagalpanti key="pagalpanti" onNext={() => setCurrentSection(Section.LAST_THING)} />
          )}

          {currentSection === Section.LAST_THING && (
            <SectionLastThing key="last_thing" onFinalReveal={() => setCurrentSection(Section.FINAL_REVEAL)} />
          )}

          {currentSection === Section.FINAL_REVEAL && (
            <SectionFinalReveal key="final_reveal" onRestart={() => setCurrentSection(Section.WELCOME)} />
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Step Indicator Bar */}
      <footer className="z-10 mt-8 text-center">
        {currentSection !== Section.FINAL_REVEAL && (
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 backdrop-blur-md border border-white/80 shadow-xs">
            {Array.from({ length: totalSteps }).map((_, idx) => {
              const active = idx + 1 <= getStepProgress();
              return (
                <div
                  key={idx}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    active ? 'w-6 bg-pink-400 shadow-xs' : 'w-2 bg-pink-200/60'
                  }`}
                />
              );
            })}
          </div>
        )}
        <p className="text-[11px] text-pink-700/60 font-medium mt-2">
          Made with gentle care 🌷
        </p>
      </footer>
    </main>
  );
}
