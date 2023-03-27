import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  slide: false,
  section: false,
};

export const trackChangesSlice = createSlice({
  name: "trackChanges",
  initialState,
  reducers: {
    toggleChangesFag: (state) => {
      state.slide = !state.slide;
    },
  },
});

export const { toggleChangesFag } = trackChangesSlice.actions;
export default trackChangesSlice.reducer;
