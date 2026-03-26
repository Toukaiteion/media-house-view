import { Outlet, Link, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Container,
} from '@mui/material';
import {
  Folder as FolderIcon,
  Movie as MovieIcon,
  Tv as TvIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';

const DRAWER_WIDTH = 240;

const menuItems = [
  { text: 'Media Libraries', icon: <FolderIcon />, path: '/libraries' },
  { text: 'Movies', icon: <MovieIcon />, path: '/movies' },
  { text: 'TV Shows', icon: <TvIcon />, path: '/tvshows' },
  { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
];

export function MainLayout() {
  const location = useLocation();

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${DRAWER_WIDTH}px)`, ml: `${DRAWER_WIDTH}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            MediaHouse
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                component={Link}
                to={item.path}
                selected={location.pathname === item.path}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: `calc(100% - ${DRAWER_WIDTH}px)` }}
      >
        <Toolbar />
        <Container maxWidth="xl">
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
}
