import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface IChartSettingsState {
    rate: number;
    fibLength: number;
}

const initialState: IChartSettingsState = {
    rate: 5,
    fibLength: 8
}

export const counterSlice = createSlice({
  name: 'chartSettings',
  initialState,
  reducers: {
    setRate: (state, action: PayloadAction<number>) => {
      state.rate = action.payload
    },
    setFibLength: (state, action: PayloadAction<number>) => {
        state.fibLength = action.payload
    },
    setChartSettings: (state, action: PayloadAction<IChartSettingsState>) => {
        return action.payload
    },
  },
})

export const { setRate, setFibLength, setChartSettings } = counterSlice.actions

export default counterSlice.reducer