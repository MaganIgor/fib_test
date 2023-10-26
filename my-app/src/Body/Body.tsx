import { Box, SxProps, Theme } from '@mui/material';
import React from 'react';
import Chart from './Chart/Chart';
import ChartSettings from './ChartSettings/ChartSettings';

const sx: SxProps<Theme> = {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden"
}

function Body() {
    return (
        <Box sx={sx} className="body">
            <ChartSettings/>
            <Chart/>
        </Box>
    );
}

export default Body;