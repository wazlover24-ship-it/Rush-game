import React, { useState, useEffect } from 'react';
import { GameScreen, UserProfile } from './types';
import Splash from './screens/Splash';
import Login from './screens/Login';
import Home from './screens/Home';
import Gameplay from './screens/Gameplay';
import LevelComplete from './screens/LevelComplete';
import Retry from './screens/Retry';
import FinalResult from './screens/FinalResult';
import AdBanner from './components/AdBanner';

const STORAGE_KEY = 'tap_master_user';

export default function App() {
  const [screen, setScreen] = useState<GameScreen>('splash');
  const [user, setUser] = useState<UserProfile | null>(null);
  const [lastLevelScore, setLastLevelScore] = useState(0);

  // Load user from local storage
  useEffect(() => {
    const savedUser = localStorage.getItem(STORAGE_KEY);
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Save user to local storage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    }
  }, [user]);

  const handleLogin = (name: string, phone: string) => {
    const newUser: UserProfile = {
      name,
      phone,
      totalScore: 0,
      currentLevel: 1,
    };
    setUser(newUser);
    setScreen('home');
  };

  const handleLevelComplete = (points: number) => {
    if (user) {
      const newTotalScore = user.totalScore + points;
      const nextLevel = user.currentLevel + 1;
      
      // Check for new high score
      const isNewHighScore = newTotalScore > (user.highScore || 0);
      
      const updatedUser = {
        ...user,
        totalScore: newTotalScore,
        currentLevel: nextLevel,
        highScore: isNewHighScore ? newTotalScore : (user.highScore || 0),
        highScoreName: isNewHighScore ? user.name : (user.highScoreName || user.name),
      };
      
      setUser(updatedUser);
      setLastLevelScore(points);

      // Simulate Interstitial Ad
      console.log('Showing Interstitial Ad:', import.meta.env.VITE_ADMOB_INTERSTITIAL_ID);
      
      if (nextLevel > 10) {
        setScreen('finalResult');
      } else {
        setScreen('levelComplete');
      }
    }
  };

  const handleRetry = () => {
    setScreen('gameplay');
  };

  const handleNextLevel = () => {
    setScreen('gameplay');
  };

  const handleRestartGame = () => {
    if (user) {
      setUser({ ...user, currentLevel: 1, totalScore: 0 });
    }
    setScreen('home');
  };

  const renderScreen = () => {
    switch (screen) {
      case 'splash':
        return <Splash onComplete={() => setScreen(user ? 'home' : 'login')} />;
      case 'login':
        return <Login onLogin={handleLogin} />;
      case 'home':
        return user ? <Home user={user} onStart={() => setScreen('gameplay')} /> : null;
      case 'gameplay':
        return user ? (
          <Gameplay 
            level={user.currentLevel} 
            onComplete={handleLevelComplete} 
            onFail={() => setScreen('retry')} 
          />
        ) : null;
      case 'levelComplete':
        return user ? (
          <LevelComplete 
            level={user.currentLevel - 1} 
            points={lastLevelScore} 
            totalScore={user.totalScore} 
            onNext={handleNextLevel} 
          />
        ) : null;
      case 'retry':
        return <Retry onRetry={handleRetry} onHome={() => setScreen('home')} />;
      case 'finalResult':
        return user ? (
          <FinalResult 
            totalScore={user.totalScore} 
            onRestart={handleRestartGame} 
          />
        ) : null;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans overflow-hidden select-none touch-none">
      <div className="game-container flex flex-col">
        <div className="flex-1 relative overflow-hidden">
          {renderScreen()}
        </div>
        <AdBanner />
      </div>
    </div>
  );
}
