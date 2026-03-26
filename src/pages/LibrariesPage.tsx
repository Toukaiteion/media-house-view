import { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Card,
  CardContent,
  CardActions,
  Chip,
  Grid,
  IconButton,
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon, Refresh as RefreshIcon } from '@mui/icons-material';
import { useMedia } from '../contexts/MediaContext';
import { api } from '../services/api';
import type { MediaLibrary } from '../types';

export function LibrariesPage() {
  const { libraries, loading, error, refreshLibraries } = useMedia();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newLibrary, setNewLibrary] = useState({ name: '', type: 'Movie' as 'Movie' | 'TVShow', path: '' });

  const handleCreateLibrary = async () => {
    try {
      await api.createLibrary(newLibrary);
      setDialogOpen(false);
      setNewLibrary({ name: '', type: 'Movie', path: '' });
      refreshLibraries();
    } catch (err) {
      console.error('Failed to create library:', err);
    }
  };

  const handleDeleteLibrary = async (id: number) => {
    try {
      await api.deleteLibrary(id);
      refreshLibraries();
    } catch (err) {
      console.error('Failed to delete library:', err);
    }
  };

  const handleScan = async (id: number) => {
    try {
      await api.triggerScan(id, 'full');
      refreshLibraries();
    } catch (err) {
      console.error('Failed to scan library:', err);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="xl">
        <Typography variant="h6">Loading...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="xl">
        <Typography variant="h6" color="error">{error}</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Media Libraries</Typography>
        <Box>
          <IconButton onClick={refreshLibraries}>
            <RefreshIcon />
          </IconButton>
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => setDialogOpen(true)}>
            Add Library
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {libraries.map((library) => (
          <Grid item xs={12} md={6} lg={4} key={library.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {library.name}
                </Typography>
                <Box sx={{ mb: 1 }}>
                  <Chip label={library.type} size="small" sx={{ mr: 1 }} />
                  <Chip label={library.status} size="small" color={library.status === 'Scanning' ? 'warning' : 'default'} />
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {library.path}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => handleScan(library.id)}>
                  Scan
                </Button>
                <IconButton color="error" onClick={() => handleDeleteLibrary(library.id)}>
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add Media Library</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Library Name"
            fullWidth
            value={newLibrary.name}
            onChange={(e) => setNewLibrary({ ...newLibrary, name: e.target.value })}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Library Type</InputLabel>
            <Select
              value={newLibrary.type}
              label="Library Type"
              onChange={(e) => setNewLibrary({ ...newLibrary, type: e.target.value as 'Movie' | 'TVShow' })}
            >
              <MenuItem value="Movie">Movies</MenuItem>
              <MenuItem value="TVShow">TV Shows</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            label="Library Path"
            fullWidth
            value={newLibrary.path}
            onChange={(e) => setNewLibrary({ ...newLibrary, path: e.target.value })}
            helperText="Absolute path to the media folder"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleCreateLibrary} variant="contained">Create</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
