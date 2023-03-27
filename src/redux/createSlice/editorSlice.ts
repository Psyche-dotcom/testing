import { client } from "@graphql/index";
import { CREATE_PAGE } from "@graphql/mutations";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const createPage = createAsyncThunk(
  `editor/createPage`,
  async (payload: any, thunkAPI: any) => {
    // const { account_type } = thunkAPI.getState().auth.flow
    const { data, errors } = await client.mutate({
      mutation: CREATE_PAGE,
      variables: {
        token: payload.token,
        name: payload.name
      },
    });
    console.log(errors, data);
    return { id: data?.addPage.message, name: payload.name };
  }
);

type Modules =
  | "files"
  | "home"
  | "sections"
  | "display_options"
  | "contact_information"
  | "page_privacy"
  | null;

interface EditorStateValues {
  module: Modules;
  currentPageId: string | null;
  pages: any[] | null;
  slides: any[] | null;
  slidesPreview: { title: string; id: string }[] | null;
  sectionsPreview: { header: string; id: string; type: string }[] | null;
  sections: { string: any } | {};
}

const editorSlice = createSlice({
  name: "editor",
  initialState: {
    module: null,
    currentPageId: null,
    pages: [],
    slides: null,
    slidesPreview: null,
    sectionsPreview: null,
    sections: {},
  } as EditorStateValues,
  reducers: {
    setModule(state, { payload }) {
      state.module = payload;
    },
    resetEditTrigger(state) {
      return { ...state, editTrigger: 0 };
    },
    setCurrentPageId(state, { payload }) {
      state.currentPageId = payload;
    },
    setEditorPages(state, { payload }) {
      state.pages = payload;
      state.currentPageId = payload[0].id;
    },
    setEditorSlides(state, { payload }) {
      state.slides = payload;
    },
    cacheSectionContent(state, { payload }) {
      console.log("cache payload => ", payload);
      state.sections[payload.id] = payload.value;
    },
    cacheClearSection(state, { payload }) {
      delete state.sections[payload];
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(createPage.fulfilled, (state, action) => {
      if (!action.payload?.id) return;
      console.log("ADDED => ", action.payload)
      state.pages = [...state.pages, action.payload]
    });
  },
});

export const {
  setCurrentPageId,
  setEditorPages,
  resetEditTrigger,
  setModule,
  setEditorSlides,
  cacheSectionContent,
  cacheClearSection,
} = editorSlice.actions;
export default editorSlice.reducer;
