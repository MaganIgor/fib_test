import React, { useLayoutEffect, useRef } from 'react';
import { Box, SxProps, Theme } from '@mui/material';
import { useResizeDetector } from 'react-resize-detector';

const sx: SxProps<Theme> = (theme) => ({
    border: `1px solid ${theme.palette.primary.main}`,
    flexGrow: 1,
    overflow: "hidden"
});

const arr = [1,1,2,3];
const a = 5;
const rotateInfo = [
    {startAngle: Math.PI, endAngle: Math.PI / 2},
    {startAngle: Math.PI / 2, endAngle: 0},
    {startAngle: 0, endAngle: -Math.PI / 2},
    {startAngle: -Math.PI / 2, endAngle: -Math.PI}
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
                let beginX = 500 / 2;
                let beginY = 500 / 2;
                ctx.beginPath();
                for(let i = 0; i < arr.length; ++i) {
                    const rotateSide = i % rotateInfo.length;
                    ctx.arc(beginX, beginY, arr[i] * a, rotateInfo[rotateSide].startAngle, rotateInfo[rotateSide].endAngle, true);
                }
                ctx.stroke();
            }

        }
    }, [])
    return (
        <Box sx={sx} ref={ref} className="chart">
            <canvas width={500} height={500} ref={canvasRef}/>
        </Box>
    );
}

export default Chart;