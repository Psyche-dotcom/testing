import { createSlice } from "@reduxjs/toolkit";

const initialState:any={
    previewObj:[],
    activeIndex:0,
}
export const previewSlice = createSlice({
  name: "preview",
  initialState,
  reducers: {
    setPreviewObj:(state,actions)=>{
      let index:number;
        if(state.previewObj.length > 0){
          const item = state.previewObj.find((item)=> item.id === actions.payload.id);
          if(item){
              index = state.previewObj.findIndex((obj)=> obj.id===item.id);
              state.previewObj[index] = actions.payload;
          }else{
            state.previewObj.push(actions.payload);
          }
          
        }else {
          state.previewObj.push(actions.payload);
        }
    },
    setActiveIndex:(state,actions)=>{
        state.activeIndex = actions.payload;
    }
  },
});

export const {setPreviewObj,setActiveIndex } = previewSlice.actions;
export default previewSlice.reducer;
