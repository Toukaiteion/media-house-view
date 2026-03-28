import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";


export function Sidebar() { 
    const location = useLocation();
    const navigate = useNavigate();
    const isMedia = location.pathname.startsWith('/media-center');
    const isSettings = location.pathname.startsWith('/settings');

    return (
    <Box
      sx={{
        width: 240,
        height: '100%',
        p: 2
      }}
    >
      {/* 媒体中心菜单 */}
      {isMedia && (
        <Box>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            媒体中心
          </Typography>
          <List>
            <ListItem onClick={() => navigate('/media-center/home')} sx={{ cursor: 'pointer' }}>
              <ListItemText primary="首页" />
            </ListItem>
            <ListItem onClick={() => navigate('/media-center/movies')} sx={{ cursor: 'pointer' }}>
              <ListItemText primary="电影" />
            </ListItem>
            <ListItem onClick={() => navigate('/media-center/tvshows')} sx={{ cursor: 'pointer' }}>
              <ListItemText primary="电视剧" />
            </ListItem>
          </List>
        </Box>
      )}

      {/* 设置菜单 */}
      {isSettings && (
        <Box>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            系统设置
          </Typography>
          <List>
            <ListItem onClick={() => navigate('/settings/media-library')} sx={{ cursor: 'pointer' }}>
              <ListItemText primary="媒体库" />
            </ListItem>
            <ListItem onClick={() => navigate('/settings/metadata')} sx={{ cursor: 'pointer' }}>
              <ListItemText primary="元数据管理" />
            </ListItem>
            <ListItem onClick={() => navigate('/settings/account')} sx={{ cursor: 'pointer' }}>
              <ListItemText primary="账号管理" />
            </ListItem>
            <ListItem onClick={() => navigate('/settings/logs')} sx={{ cursor: 'pointer' }}>
              <ListItemText primary="日志" />
            </ListItem>
          </List>
        </Box>
      )}
    </Box>
  )
}