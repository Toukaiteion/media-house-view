import type {
  MediaLibrary,
  CreateMediaLibraryDto,
  UpdateMediaLibraryDto,
  Movie,
  TVShow,
  Season,
  Episode,
  PlaybackUrl,
  PlaybackProgress,
  ScanLog,
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5249/api';

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'An error occurred' }));
      throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // Libraries
  async getLibraries(): Promise<MediaLibrary[]> {
    return this.request<MediaLibrary[]>('/libraries');
  }

  async getLibrary(id: number): Promise<MediaLibrary> {
    return this.request<MediaLibrary>(`/libraries/${id}`);
  }

  async createLibrary(dto: CreateMediaLibraryDto): Promise<MediaLibrary> {
    return this.request<MediaLibrary>('/libraries', {
      method: 'POST',
      body: JSON.stringify(dto),
    });
  }

  async updateLibrary(id: number, dto: UpdateMediaLibraryDto): Promise<MediaLibrary> {
    return this.request<MediaLibrary>(`/libraries/${id}`, {
      method: 'PUT',
      body: JSON.stringify(dto),
    });
  }

  async deleteLibrary(id: number): Promise<void> {
    await this.request(`/libraries/${id}`, {
      method: 'DELETE',
    });
  }

  async triggerScan(id: number, scanType: 'full' | 'incremental' = 'full'): Promise<void> {
    await this.request(`/libraries/${id}/scan?scanType=${scanType}`, {
      method: 'POST',
    });
  }

  async getScanLogs(libraryId: number, limit: number = 10): Promise<ScanLog[]> {
    return this.request<ScanLog[]>(`/libraries/${libraryId}/scan-logs?limit=${limit}`);
  }

  // Movies
  async getMovies(libraryId?: number): Promise<Movie[]> {
    const params = libraryId ? `?libraryId=${libraryId}` : '';
    return this.request<Movie[]>(`/movies${params}`);
  }

  async getMovie(id: number): Promise<Movie> {
    return this.request<Movie>(`/movies/${id}`);
  }

  // TV Shows
  async getTVShows(libraryId?: number): Promise<TVShow[]> {
    const params = libraryId ? `?libraryId=${libraryId}` : '';
    return this.request<TVShow[]>(`/tvshows${params}`);
  }

  async getTVShow(id: number): Promise<TVShow> {
    return this.request<TVShow>(`/tvshows/${id}`);
  }

  async getSeasons(tvShowId: number): Promise<Season[]> {
    return this.request<Season[]>(`/tvshows/${tvShowId}/seasons`);
  }

  async getEpisodes(tvShowId: number, seasonId: number): Promise<Episode[]> {
    return this.request<Episode[]>(`/tvshows/${tvShowId}/seasons/${seasonId}/episodes`);
  }

  // Playback
  async getPlaybackUrl(mediaId: number, mediaType: 'movie' | 'episode'): Promise<PlaybackUrl> {
    return this.request<PlaybackUrl>(`/playback/url?mediaId=${mediaId}&mediaType=${mediaType}`);
  }

  async getPlaybackProgress(userId: string, movieId?: number, episodeId?: number): Promise<PlaybackProgress> {
    const params = new URLSearchParams({ userId });
    if (movieId) params.append('movieId', movieId.toString());
    if (episodeId) params.append('episodeId', episodeId.toString());
    return this.request<PlaybackProgress>(`/playback/progress?${params.toString()}`);
  }

  async updatePlaybackProgress(
    userId: string,
    movieId: number | undefined,
    episodeId: number | undefined,
    position: number,
    duration?: number
  ): Promise<void> {
    const params = new URLSearchParams({ userId });
    await this.request(`/playback/progress?${params.toString()}`, {
      method: 'POST',
      body: JSON.stringify({ movieId, episodeId, position, duration }),
    });
  }
}

export const api = new ApiClient(API_BASE_URL);
