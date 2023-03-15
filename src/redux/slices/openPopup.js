import { createSlice } from '@reduxjs/toolkit'


const initialState= {
   openPopup:false
}

export const openPopup = createSlice({
   name:'openPopup',
   initialState,
   reducers:{
      togglePopup: (state, action) => {
         state.openPopup = !state.openPopup
      }
   }
})

export const {togglePopup} = openPopup.actions
export const popupState = state => state.openPopup
export default openPopup.reducer

