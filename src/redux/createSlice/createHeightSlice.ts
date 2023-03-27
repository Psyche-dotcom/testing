import { createSlice } from "@reduxjs/toolkit";

interface ParentType {
  parent: Array<{
    index: null | number;
    title: null | string;
    height: number;
  }>;
}

const initialState: ParentType = {
  parent: [
    {
      index: null,
      title: null,
      height: 0,
    },
  ],
};

export const heightSlice = createSlice({
  name: "nestedHeight",
  initialState,

  reducers: {
    setParent: (
      state,
      actions: {
        payload: {
          index: number;
          height: number;
          title: string;
        };
      }
    ) => {
      state.parent = [...state.parent, actions.payload];
    },

    removeFromParent: (
      state,
      actions: {
        payload: { index: number };
      }
    ) => {
      state.parent = state.parent.filter(
        (obj) => obj.index !== actions.payload.index
      );
    },

    removeAll: (state) => {
      state.parent = [];
    },
  },
});

export const { setParent, removeFromParent, removeAll } = heightSlice.actions;
export default heightSlice.reducer;
