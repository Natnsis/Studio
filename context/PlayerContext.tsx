import React, { createContext, useContext, useState, ReactNode } from 'react';

type PlayOptions = {
  title?: string | null;
  youtubeUrl?: string | null;
};

interface PlayerContextType {
  videoId: string | null;
  playing: boolean;
  loading: boolean;
  error: string | null;
  play: (videoId: string | null | undefined, options?: PlayOptions) => Promise<void>;
  pause: () => Promise<void>;
  resume: () => Promise<void>;
  title: string;
  setTitle: (title: string) => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

const YOUTUBE_WATCH_URL = 'https://www.youtube.com/watch?v=';

const fetchTitle = async (id: string): Promise<string> => {
  try {
    const response = await fetch(
      `https://www.youtube.com/oembed?url=${YOUTUBE_WATCH_URL}${id}&format=json`
    );
    const data = await response.json();
    return data?.title || `Track ${id}`;
  } catch (error) {
    console.error('Error fetching title:', error);
    return `Track ${id}`;
  }
};

export const PlayerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [videoId, setVideoId] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState('No Track Selected');

  const play = async (id: string | null | undefined, options: PlayOptions = {}) => {
    const nextVideoId = id?.trim();

    if (!nextVideoId) {
      setError('No YouTube video selected.');
      setPlaying(false);
      return;
    }

    setLoading(true);
    setError(null);
    setVideoId(nextVideoId);
    setPlaying(true);

    if (options.title) {
      setTitle(options.title);
      setLoading(false);
      return;
    }

    setTitle(await fetchTitle(nextVideoId));
    setLoading(false);
  };

  const pause = async () => {
    setPlaying(false);
  };

  const resume = async () => {
    if (!videoId) {
      setError('No YouTube video selected.');
      return;
    }

    setError(null);
    setPlaying(true);
  };

  return (
    <PlayerContext.Provider
      value={{ videoId, playing, loading, error, play, pause, resume, title, setTitle }}
    >
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
