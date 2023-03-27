import { createSlice } from "@reduxjs/toolkit";

const initialState={
    heart:false,
}
export const HeroBannerSlice = createSlice({
    name:"heroBannerSlice",
    initialState,
    reducers:{
        heartReducers:(state)=>{
            state.heart= !state.heart;
        }
    }
})
export const {heartReducers} = HeroBannerSlice.actions;
export default HeroBannerSlice.reducer;