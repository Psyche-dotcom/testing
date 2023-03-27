import { createSlice } from "@reduxjs/toolkit";

export const sectionsSlice = createSlice({
  name: "vreel",
  initialState: {
    vreel: null,
    duration: 0,

    metadata: {
      employee: null,
      username: null
    },
    current: {
      slide: null,
      section: null,
    },
  },
  reducers: {

    setVreel: (state, actions) => {
      state.vreel = actions.payload;
    },
    setVreelMetadata: (state, actions) => {
      state.metadata = actions.payload;
    },
    getDuration: (state, actions) => {
      state.duration = actions.payload
    },
    setCurrent: (state, payload) => {
      state.current = payload.payload;
    }
  },
});

export const { setVreel, getDuration, setVreelMetadata, setCurrent } = sectionsSlice.actions;
export default sectionsSlice.reducer;
