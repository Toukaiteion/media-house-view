import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api } from '../services/api';
import type { MediaLibrary, Movie, TVShow } from '../types';

interface MediaContextType {
  libraries: MediaLibrary[];
  loading: boolean;
  error: string | null;
  refreshLibraries: () => Promise<void>;
  createLibrary: (name: string, type: 'Movie' | 'TVShow', path: string) => Promise<void>;
  deleteLibrary: (id: number) => Promise<void>;
}

const MediaContext = createContext<MediaContextType | undefined>(undefined);

export function MediaProvider({ children }: { children: ReactNode }) {
  const [libraries, setLibraries] = useState<MediaLibrary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshLibraries = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getLibraries();
      setLibraries(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load libraries');
    } finally {
      setLoading(false);
    }
  };

  const createLibrary = async (name: string, type: 'Movie' | 'TVShow', path: string) => {
    await api.createLibrary({ name, type, path });
    await refreshLibraries();
  };

  const deleteLibrary = async (id: number) => {
    await api.deleteLibrary(id);
    await refreshLibraries();
  };

  useEffect(() => {
    refreshLibraries();
  }, []);

  return (
    <MediaContext.Provider
      value={{
        libraries,
        loading,
        error,
        refreshLibraries,
        createLibrary,
        deleteLibrary,
      }}
    >
      {children}
    </MediaContext.Provider>
  );
}

export function useMedia() {
  const context = useContext(MediaContext);
  if (context === undefined) {
    throw new Error('useMedia must be used within a MediaProvider');
  }
  return context;
}
