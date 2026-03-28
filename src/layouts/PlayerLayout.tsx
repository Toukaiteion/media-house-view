import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

export function PlayerLayout() { 
    return (
        <Box sx={{ width: '100vh', height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Outlet />
        </Box>
    );
}