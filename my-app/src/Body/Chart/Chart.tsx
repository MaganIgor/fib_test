import React, { useLayoutEffect, useRef } from 'react';
import { Box, SxProps, Theme } from '@mui/material';
import { makeFibArray } from './utils';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const sx: SxProps<Theme> = (theme) => ({
    border: `1px solid ${theme.palette.primary.main}`,
    flexGrow: 1,
    overflow: "hidden",
    margin: "10px"
});

const rotateInfo = [
    {startAngle: Math.PI, endAngle: Math.PI / 2, startX: -1, startY: 0, endX: 0, endY: 1},
    {startAngle: Math.PI / 2, endAngle: 0, startX: 0, startY: 1, endX: 1, endY: 0},
    {startAngle: 0, endAngle: -Math.PI / 2, startX: 1, startY: 0, endX: 0, endY: -1},
    {startAngle: -Math.PI / 2, endAngle: -Math.PI, startX: 0, startY: -1, endX: -1, endY: 0}
]

function Chart() {
    const chartSettings = useSelector((state: RootState) => state.chartSettings)
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    useLayoutEffect(() => {
        if(canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            const height = containerRef.current?.clientHeight;
            const width = containerRef.current?.clientWidth;
            if(ctx && height && width) {
                const arr = makeFibArray(chartSettings.fibLength);
                const rate = chartSettings.rate;
                ctx.canvas.width = width;
                ctx.canvas.height = height;
                let centerX = width / 2;
                let centerY = height / 2;
                let startX = centerX + rotateInfo[0].startX * arr[0] * rate;
                let startY = centerY + rotateInfo[0].startY * arr[0] * rate;
                ctx.beginPath();
                for(let i = 0; i < arr.length; ++i) {
                    const rotateSide = i % rotateInfo.length;
                    centerX = startX - rotateInfo[rotateSide].startX * arr[i] * rate;
                    centerY = startY - rotateInfo[rotateSide].startY * arr[i] * rate;
                    ctx.arc(centerX, centerY, arr[i] * rate, rotateInfo[rotateSide].startAngle, rotateInfo[rotateSide].endAngle, true);
                    startX = centerX + rotateInfo[rotateSide].endX * arr[i] * rate;
                    startY = centerY + rotateInfo[rotateSide].endY * arr[i] * rate;
                }
                ctx.stroke();
            }

        }
    }, [chartSettings])
    return (
        <Box sx={sx} ref={containerRef} className="chart">
            <canvas width={1000} height={1000} ref={canvasRef}/>
        </Box>
    );
}

export default Chart;