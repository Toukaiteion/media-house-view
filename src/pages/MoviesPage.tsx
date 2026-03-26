import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Box,
  Chip,
} from '@mui/material';
import { api } from '../services/api';
import type { Movie } from '../types';

export function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    try {
      const data = await api.getMovies();
      setMovies(data);
    } catch (err) {
      console.error('Failed to load movies:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="xl">
        <Typography variant="h6">Loading movies...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" gutterBottom>
        Movies
      </Typography>

      <Grid container spacing={3}>
        {movies.map((movie) => (
          <Grid item xs={6} sm={4} md={3} lg={2} key={movie.id}>
            <Card>
              {movie.posterPath ? (
                <CardMedia
                  component="img"
                  height="300"
                  image={movie.posterPath}
                  alt={movie.title}
                />
              ) : (
                <Box
                  sx={{
                    height: 300,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: 'grey.300',
                  }}
                >
                  No poster
                </Box>
              )}
              <CardContent>
                <Typography variant="subtitle2" noWrap>
                  {movie.title}
                </Typography>
                {movie.year && (
                  <Chip label={movie.year} size="small" sx={{ mt: 1 }} />
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
