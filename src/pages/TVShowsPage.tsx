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
import type { TVShow } from '../types';

export function TVShowsPage() {
  const [tvShows, setTVShows] = useState<TVShow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTVShows();
  }, []);

  const loadTVShows = async () => {
    try {
      const data = await api.getTVShows();
      setTVShows(data);
    } catch (err) {
      console.error('Failed to load TV shows:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="xl">
        <Typography variant="h6">Loading TV shows...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" gutterBottom>
        TV Shows
      </Typography>

      <Grid container spacing={3}>
        {tvShows.map((show) => (
          <Grid item xs={6} sm={4} md={3} lg={2} key={show.id}>
            <Card>
              {show.posterPath ? (
                <CardMedia
                  component="img"
                  height="300"
                  image={show.posterPath}
                  alt={show.title}
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
                  {show.title}
                </Typography>
                {show.year && (
                  <Chip label={show.year} size="small" sx={{ mt: 1 }} />
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
