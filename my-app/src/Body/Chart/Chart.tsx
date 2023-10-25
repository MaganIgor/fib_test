import React, { useLayoutEffect, useRef } from 'react';
import { Box, SxProps, Theme } from '@mui/material';
import { useResizeDetector } from 'react-resize-detector';
import { makeFibArray } from './utils';

const sx: SxProps<Theme> = (theme) => ({
    border: `1px solid ${theme.palette.primary.main}`,
    flexGrow: 1,
    overflow: "hidden"
});

const arr = makeFibArray(20);
console.log(arr);
const a = 1;
const rotateInfo = [
    {startAngle: Math.PI, endAngle: Math.PI / 2, startX: -1, startY: 0, endX: 0, endY: 1},
    {startAngle: Math.PI / 2, endAngle: 0, startX: 0, startY: 1, endX: 1, endY: 0},
    {startAngle: 0, endAngle: -Math.PI / 2, startX: 1, startY: 0, endX: 0, endY: -1},
    {startAngle: -Math.PI / 2, endAngle: -Math.PI, startX: 0, startY: -1, endX: -1, endY: 0}
]

function Chart() {
    const { width, height, ref } = useResizeDetector();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useLayoutEffect(() => {
        if(canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            if(ctx) {
                // ctx.canvas.width = width;
                // ctx.canvas.height = height;
                let centerX = 1000 / 2;
                let centerY = 1000 / 2;
                let startX = centerX + rotateInfo[0].startX * arr[0] * a;
                let startY = centerY + rotateInfo[0].startY * arr[0] * a;
                ctx.beginPath();
                for(let i = 0; i < arr.length; ++i) {
                    const rotateSide = i % rotateInfo.length;
                    centerX = startX - rotateInfo[rotateSide].startX * arr[i] * a;
                    centerY = startY - rotateInfo[rotateSide].startY * arr[i] * a;
                    ctx.arc(centerX, centerY, arr[i] * a, rotateInfo[rotateSide].startAngle, rotateInfo[rotateSide].endAngle, true);
                    startX = centerX + rotateInfo[rotateSide].endX * arr[i] * a;
                    startY = centerY + rotateInfo[rotateSide].endY * arr[i] * a;
                }
                ctx.stroke();
            }

        }
    }, [])
    return (
        <Box sx={sx} ref={ref} className="chart">
            <canvas width={1000} height={1000} ref={canvasRef}/>
        </Box>
    );
}

export default Chart;