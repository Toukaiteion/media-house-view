import { Container, Typography, Box, TextField, Button } from '@mui/material';

export function SettingsPage() {
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>

      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          API Configuration
        </Typography>
        <TextField
          fullWidth
          label="API Base URL"
          defaultValue={import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'}
          sx={{ mb: 2 }}
          helperText="Restart the application after changing this setting"
          disabled
        />
        <Typography variant="body2" color="text.secondary">
          Current API URL: {import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'}
        </Typography>
      </Box>
    </Container>
  );
}
