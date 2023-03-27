import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  initMenuState: false,
  initQRState: false,
  initShareState: false,
  initInfoState: false,
  initialAccountMenuState: false,
  mobilePreviewInitialState: false,
  showPreviewInitialState: {
    type: "",
    payload: "",
  },
  collupse: { level1: [], level2: [], level3: [] },
};

export const menuSlice = createSlice({
  name: "expandMenu",
  initialState,

  reducers: {
    expandMenu: (state) => {
      state.initMenuState = !state.initMenuState;
    },
    expandQR: (state) => {
      state.initQRState = !state.initQRState;
    },
    expandShare: (state) => {
      state.initShareState = !state.initShareState;
    },

    expandInfo: (state) => {
      state.initInfoState = !state.initInfoState;
    },
    expandAccountMenu: (state) => {
      state.initialAccountMenuState = !state.initialAccountMenuState;
    },
    showMobilePreview: (state, actions) => {
      state.mobilePreviewInitialState = actions.payload;
    },
    showPreviewActions: (state, actions) => {
      state.showPreviewInitialState = actions.payload;
    },
  },
});

// ewjrwehyjrhewjxcv cfvc
export const {
  expandMenu,
  expandQR,
  expandShare,
  expandInfo,
  expandAccountMenu,
  showMobilePreview,
  showPreviewActions,
} = menuSlice.actions;
export default menuSlice.reducer;
