import { Alert, Box, Button, Snackbar, SxProps, TextField, Theme } from '@mui/material';
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
    const [message, setMessage] = React.useState("");
    const dispatch = useDispatch();
    
    function handleRateChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setRate(+e.target.value)
    }

    function handleFibLengthChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setFibLength(+e.target.value)
    }

    function handleClick() {
        if(isNaN(rate) || isNaN(fibLength)) {
            setMessage("Что-то пошло не так, будут установлены дефолтные значения");
            dispatch(setChartSettings({rate: 5, fibLength: 8}));
        } else if (rate < RATE_RANGE.min || rate > RATE_RANGE.max || fibLength < FIB_LENGTH_RANGE.min || fibLength > FIB_LENGTH_RANGE.max) {
            setMessage(`Вы вышли за граничные значения (коэффициент ${RATE_RANGE.min} - ${RATE_RANGE.max}; длина ${FIB_LENGTH_RANGE.min} - ${FIB_LENGTH_RANGE.max}), исправьте и попробуйте ещё раз.`);
        } else if(fibLength % 1 > 0) {
            setMessage("Длина округлена до целых значений");
            dispatch(setChartSettings({rate, fibLength: Math.round(fibLength)}));
            setFibLength(Math.round(fibLength));
        } else {
            dispatch(setChartSettings({rate, fibLength}));
        }
    }

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
        setMessage("");
      };
    
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
            <Snackbar open={!!message} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="info" >
                    {message}
                </Alert>
            </Snackbar>
        </Box>
    );
}

export default ChartSettings;