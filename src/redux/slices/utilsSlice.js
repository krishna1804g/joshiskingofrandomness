// utilsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    utils: null,
};

const utilsSlice = createSlice({
    name: "utils",
    initialState,
    reducers: {
        getUtils: (state, action) => {
            state.utils = action.payload;
        },
        clearUtils: (state) => {
            state.utils = null;
        },
    },
});

export const { getUtils, clearUtils } = utilsSlice.actions;

export default utilsSlice.reducer;
