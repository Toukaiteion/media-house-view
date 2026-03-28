import { Outlet } from 'react-router-dom';
import {
  Box
} from '@mui/material';
import { TopNavbar } from '../contexts/TopNavbar';
import { Sidebar } from '../contexts/Sidebar';


export function MainLayout() {

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* 顶部导航 */}
      <TopNavbar />

      {/* 侧边栏 + 内容 */}
      <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar />
        <Outlet />
      </Box>
    </Box>
  );
}
