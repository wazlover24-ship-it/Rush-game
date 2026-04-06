export interface UserProfile {
  name: string;
  phone: string;
  totalScore: number;
  currentLevel: number;
  highScore?: number;
  highScoreName?: string;
}

export type GameScreen = 'splash' | 'login' | 'home' | 'gameplay' | 'levelComplete' | 'retry' | 'finalResult';

export interface Target {
  id: string;
  x: number; // 0 to 100 (percentage)
  y: number; // 0 to 100 (percentage)
  size: number; // in pixels
}
