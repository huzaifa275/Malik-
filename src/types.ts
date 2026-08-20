export enum Section {
  WELCOME = 1,
  QUESTION = 2,
  REAL_MESSAGE = 3,
  PAGALPANTI = 4,
  LAST_THING = 5,
  FINAL_REVEAL = 6,
}

export interface SoundConfig {
  musicPlaying: boolean;
  soundEnabled: boolean;
  volume: number;
}
