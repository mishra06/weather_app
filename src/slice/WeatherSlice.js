import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    weatherDatas: {},  
};

const weatherSlice = createSlice({
    name: "weather",
    initialState,  
    reducers: {
        setWeather: (state, action) => {
            state.weatherDatas = action.payload;
        },
    },
});

export const { setWeather } = weatherSlice.actions;
export default weatherSlice.reducer;
