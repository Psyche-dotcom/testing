import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  findItem:{id:0,thumbnail:"",link_header:"",link_sub_header:""},
}

export const sectionsSlice = createSlice({
  name: 'bottomSheet',
  initialState,
  reducers: {
  
    getIdActions:(state,actions)=>{
        state.findItem = actions.payload;
    },

  }
})


export const {getIdActions} = sectionsSlice.actions;
export default sectionsSlice.reducer;