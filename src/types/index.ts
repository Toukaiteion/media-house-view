export interface MediaLibrary {
  id: number;
  name: string;
  type: 'Movie' | 'TVShow';
  path: string;
  status: 'Idle' | 'Scanning' | 'Error';
  createdAt: string;
  updatedAt: string;
  isEnabled: boolean;
}

export interface CreateMediaLibraryDto {
  name: string;
  type: 'Movie' | 'TVShow';
  path: string;
}

export interface UpdateMediaLibraryDto {
  name: string;
  type: 'Movie' | 'TVShow';
  path: string;
  isEnabled: boolean;
}

export interface Movie {
  id: number;
  title: string;
  year?: number;
  posterPath?: string;
  overview?: string;
  createdAt: string;
  mediaLibraryId: number;
  filePath?: string;
  containerFormat?: string;
  width?: number;
  height?: number;
  duration?: number;
  fileSize?: number;
}

export interface TVShow {
  id: number;
  title: string;
  year?: number;
  posterPath?: string;
  overview?: string;
  createdAt: string;
  mediaLibraryId: number;
}

export interface Season {
  id: number;
  seasonNumber: number;
  tvShowId: number;
  createdAt: string;
  episodeCount: number;
}

export interface Episode {
  id: number;
  episodeNumber: number;
  fileName: string;
  title?: string;
  overview?: string;
  seasonId: number;
  filePath?: string;
  containerFormat?: string;
  duration?: number;
  fileSize?: number;
}

export interface PlaybackUrl {
  url: string;
  mimeType?: string;
  canDirectPlay: boolean;
}

export interface PlaybackProgress {
  id: number;
  userId: string;
  movieId?: number;
  episodeId?: number;
  position: number;
  duration?: number;
  lastPlayed: string;
  isCompleted: boolean;
}

export interface ScanLog {
  id: number;
  mediaLibraryId: number;
  syncType: 'FullScan' | 'IncrementalScan' | 'FileChange' | 'ManualSync';
  status: 'Started' | 'InProgress' | 'Completed' | 'Failed';
  addedCount: number;
  updatedCount: number;
  deletedCount: number;
  startTime: string;
  endTime?: string;
  errorMessage?: string;
}
