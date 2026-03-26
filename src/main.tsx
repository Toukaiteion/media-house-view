import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { MediaProvider } from './contexts/MediaContext'
import App from './App.tsx'

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MediaProvider>
          <App />
        </MediaProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
