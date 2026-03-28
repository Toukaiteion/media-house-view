import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { MediaCenter } from './pages/MediaCenter';
import { OverviewPage } from './pages/MediaCenter/OverviewPage';
import { MoviesPage } from './pages/MediaCenter/MoviesPage';
import { TvShowsPage } from './pages/MediaCenter/TvShowPage';
import { Settings } from './pages/Settings';
import { MediaLibrarySettingsPage } from './pages/Settings/MediaLibrarySettingsPage';
import { MetadataSettingsPage } from './pages/Settings/MetadataSettingsPage';
import { AccountSettingsPage } from './pages/Settings/AccountSettingsPage';
import { LogsManagerPage } from './pages/Settings/LogsManagerPage';
import { PlayerLayout } from './layouts/PlayerLayout';
import { PlayerPage } from './pages/Player/PlayerPage';

function App() {
  return (
    <div>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/media-center" element={<MediaCenter />} >
            <Route index element={<OverviewPage />} />
            <Route path="home" element={<OverviewPage />} />
            <Route path="movies" element={<MoviesPage />} />
            <Route path="tvshows" element={<TvShowsPage />} />
          </Route>
          <Route path="/settings" element={<Settings />} >
            <Route index element={<MediaLibrarySettingsPage />} />
            <Route path="media-library" element={<MediaLibrarySettingsPage />} />
            <Route path="metadata" element={<MetadataSettingsPage />} />
            <Route path="account" element={<AccountSettingsPage />} />
            <Route path="logs" element={<LogsManagerPage />} />
          </Route>
        </Route>
        <Route path="/play/:id" element={<PlayerLayout />} >
          <Route index element={<PlayerPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/media-center" replace />} />
      </Routes>
    </div>
    
    
  );
}

export default App;
