import { Box, Button, SxProps, TextField, Theme } from '@mui/material';
import React, { ChangeEvent, useState } from 'react';
import { store } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { setChartSettings } from '../../redux/charSettinsSlice';

const sx: SxProps<Theme> = {
    display: "flex",
    minHeight: "80px",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: "20px",
    paddingRight: "20px",
}

const sxInnerItem: SxProps<Theme> = {
    marginRight: "10px"
}

const RATE_RANGE = {min: 0, max: 100};
const FIB_LENGTH_RANGE = {min: 0, max: 30};


function ChartSettings() {
    const [rate, setRate] = useState(store.getState().chartSettings.rate);
    const [fibLength, setFibLength] = useState(store.getState().chartSettings.fibLength);
    const dispatch = useDispatch();
    
    function handleRateChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setRate(+e.target.value)
    }

    function handleFibLengthChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setFibLength(+e.target.value)
    }

    function handleClick() {
        //TODO add alerts
        dispatch(setChartSettings({rate, fibLength}));
    }
    
    return (
        <Box sx={sx} className="chart-settings">
            <TextField
                error={rate < RATE_RANGE.min || rate > RATE_RANGE.max}
                sx={sxInnerItem} 
                label="Коэффициент"
                value={rate}
                type="number"
                onChange={handleRateChange}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <TextField 
                error={fibLength < FIB_LENGTH_RANGE.min || fibLength > FIB_LENGTH_RANGE.max}
                sx={sxInnerItem} 
                label="Длина ряда Фибоначчи"
                value={fibLength}
                type="number"
                onChange={handleFibLengthChange}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <Button variant="contained" onClick={handleClick}>{"Применить"}</Button>
        </Box>
    );
}

export default ChartSettings;