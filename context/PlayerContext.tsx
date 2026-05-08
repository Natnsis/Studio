import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PlayerContextType {
  videoId: string | null;
  playing: boolean;
  play: (videoId: string) => void;
  pause: () => void;
  resume: () => void;
  title: string;
  setTitle: (title: string) => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [videoId, setVideoId] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const [title, setTitle] = useState("No Track Selected");

  const play = (id: string) => {
    setVideoId(id);
    setPlaying(true);
  };

  const pause = () => setPlaying(false);
  const resume = () => setPlaying(true);

  return (
    <PlayerContext.Provider value={{ videoId, playing, play, pause, resume, title, setTitle }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};
