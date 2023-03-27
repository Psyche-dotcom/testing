import { createSlice } from "@reduxjs/toolkit";

export const presentationSlice = createSlice({
    name: "presentation",
    initialState: {
        activeSectionId: "slides"
    },
    reducers: {

        setActiveSection(state, { payload }) {
            return { ...state, activeSectionId: payload }
        },
    }
})

export const { setActiveSection } = presentationSlice.actions;

export default presentationSlice.reducer;