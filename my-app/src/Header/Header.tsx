import React from 'react';
import { AppBar, Typography } from '@mui/material';

function Header() {
    return (
        <AppBar position="static" className="header">
            <Typography variant="h6">{"Спираль Фибоначчи"}</Typography>
        </AppBar>
    );
}

export default Header;