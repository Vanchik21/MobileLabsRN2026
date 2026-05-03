import React, { createContext, useState } from 'react';

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [score, setScore] = useState(0);
  const [stats, setStats] = useState({
    taps: 0,
    doubleTaps: 0,
    longPresses: 0,
    drags: 0,
    swipeRights: 0,
    swipeLefts: 0,
    pinches: 0,
  });

  const updateStat = (type, points) => {
    setScore((prev) => prev + points);
    setStats((prev) => ({ ...prev, [type]: prev[type] + 1 }));
  };

  return (
    <GameContext.Provider value={{ score, stats, updateStat }}>
      {children}
    </GameContext.Provider>
  );
};