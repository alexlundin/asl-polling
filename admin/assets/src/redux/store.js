import {configureStore} from "@reduxjs/toolkit";
import pollReducer from './pollSlice/pollSlice'

export const store = configureStore({
    reducer: {
        polls: pollReducer,
    }
})
