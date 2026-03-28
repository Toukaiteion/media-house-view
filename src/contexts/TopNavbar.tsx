import { AppBar, Toolbar, Typography } from "@mui/material";
import { useLocation } from 'react-router-dom';


export function TopNavbar() { 
    const location = useLocation();
    const isMedia = location.pathname.startsWith('/media-center');
    const isSettings = location.pathname.startsWith('/settings');

    return (
        <AppBar position="static" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    {isMedia && '媒体中心'}
                    {isSettings && '系统设置'}
                </Typography>
            </Toolbar>
        </AppBar>
    );

}