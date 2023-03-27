import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  collupse: { level1: [], level2: [], level3: [] },
};

export const collapseSlice = createSlice({
  name: "collapse",
  initialState,

  reducers: {
    addCollupse: (state, actions) => {
      const { level, height } = actions.payload;
      if (level == 2) {
        state.collupse.level1.push(actions.payload);
      }
      if (level == 3) {
        state.collupse.level2.push(actions.payload);
      }
    },
    removeCollupse: (state, actions) => {
      const { level, height, id } = actions.payload;
      if (level == 2) {
        state.collupse.level1.map((e) => e.id).indexOf(id);
        state.collupse.level1.splice(0, 1);
      }
      if (level == 3) {
        state.collupse.level2.map((e) => e.id).indexOf(id);
        state.collupse.level2.splice(0, 1);
      }
    },
  },
});

// ewjrwehyjrhewjxcv cfvc
export const { addCollupse, removeCollupse } = collapseSlice.actions;
export default collapseSlice.reducer;
