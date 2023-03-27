import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mediaMobileSelectorOpen: false,
  mediaDesktopPreview: false,
  mediaSelectorInitState: [
    {
      id: 1,
      file_type: "image/png",
      uri: "/assets/images/female.png",
    },
    {
      id: 2,
      file_type: "image/png",
      uri: "/assets/images/female.png",
    },
    {
      id: 3,
      file_type: "image/png",
      uri: "/assets/images/regLogBg.png",
    },
    {
      id: 4,
      file_type: "image/png",
      uri: "/assets/images/female.png",
    },
  ],

  advancedLogoSelector: [
    {
      id: 1,
      file_type: "icons",
      uri: "/assets/images/female.png",
    },
    {
      id: 2,
      file_type: "icons",
      uri: "/assets/images/female.png",
    },
    {
      id: 3,
      file_type: "icons",
      uri: "/assets/images/regLogBg.png",
    },
    {
      id: 4,
      file_type: "icons",
      uri: "/assets/images/female.png",
    },
  ],
  advancedLogoShow: false,
  getMediaMobileLink: {
    id: 0,
    file_type: "",
    uri: "",
  },
  getMediaDesktopLink: {
    id: 0,
    file_type: "",
    uri: "",
  },
  mediaSlidePreviewLink: [],
  mediaMobileSlidePreviewLink: [],
  getMediaIconsLink: {
    id: 0,
    file_type: "",
    uri: "",
  },

  isDesktopInit: false,
};
export const mobileMediaSelector = createSlice({
  name: "mobileMediaSelector",
  initialState,
  reducers: {
    setMediaSelector: (state, action) => {
      state.mediaSelectorInitState = action.payload;
    },
    getMediaSelector: (state, actions) => {
      if (actions.payload.file_type === "icons") {
        const findMedia = state.advancedLogoSelector.find(
          (item) => item.id === actions.payload.id
        );
        state.getMediaIconsLink = findMedia;
      } else {
        const findMedia = state.mediaSelectorInitState.find(
          (item) => item.id === actions.payload.id
        );
        state.mediaMobileSlidePreviewLink.push(findMedia);
        state.getMediaMobileLink = findMedia;
      }
    },
    removeMediaMobilePreview: (state) => {
      state.getMediaMobileLink = { id: 0, file_type: "", uri: "" };
    },
    removeDesktopMediaPreview: (state) => {
      state.getMediaDesktopLink = { id: 0, file_type: "", uri: "" };
    },

    mediaSlidePreviewSelector: (state, actions) => {
      const findMedia = state.mediaSelectorInitState.find(
        (item) => item.id === actions.payload.id
      );

      state.mediaSlidePreviewLink.push(findMedia);
      state.getMediaDesktopLink = findMedia;
    },

    isDesktopShow: (state, actions) => {
      state.isDesktopInit = actions.payload;
    },

    showMediaMobileSelector: (state) => {
      state.mediaMobileSelectorOpen = !state.mediaMobileSelectorOpen;
    },
    showMediaDesktopPreview: (state) => {
      state.mediaDesktopPreview = !state.mediaDesktopPreview;
    },

    showAdvancedLogo: (state, actions) => {
      state.advancedLogoShow = actions.payload;
    },
  },
});

export const {
  getMediaSelector,
  showMediaMobileSelector,
  showMediaDesktopPreview,
  showAdvancedLogo,
  removeMediaMobilePreview,
  mediaSlidePreviewSelector,
  isDesktopShow,
  removeDesktopMediaPreview,
  setMediaSelector,
} = mobileMediaSelector.actions;
export default mobileMediaSelector.reducer;
