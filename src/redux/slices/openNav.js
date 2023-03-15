import { createSlice } from '@reduxjs/toolkit'


const initialState= {
   navOpen:false
}

export const navOpen = createSlice({
   name:'navOpen',
   initialState,
   reducers:{
      toggleNavOpen: (state, action) => {
         state.navOpen = !state.navOpen
      }
   }
})

export const {toggleNavOpen} = navOpen.actions
export const navState = state => state.navOpen
export default navOpen.reducer

