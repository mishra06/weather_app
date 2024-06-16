import { configureStore } from "@reduxjs/toolkit";
import WeatherSlice from "../slice/WeatherSlice";
const store = configureStore({
  reducer: WeatherSlice,
  
});

export default store;
