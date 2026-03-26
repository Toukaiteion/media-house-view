import { Routes, Route } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { LibrariesPage } from './pages/LibrariesPage';
import { MoviesPage } from './pages/MoviesPage';
import { TVShowsPage } from './pages/TVShowsPage';
import { SettingsPage } from './pages/SettingsPage';

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<LibrariesPage />} />
        <Route path="/libraries" element={<LibrariesPage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/tvshows" element={<TVShowsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
