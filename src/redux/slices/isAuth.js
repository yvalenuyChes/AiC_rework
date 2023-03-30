import { createSlice } from '@reduxjs/toolkit'


const initialState= {
   isAuth:false
}

export const isAuth = createSlice({
   name:'isAuth',
   initialState,
   reducers:{
      setAuthTrue: (state, action) => {
         state.isAuth = true
      },
      setAuthFalse:(state, action) => {
         state.isAuth = false
      }
   }
})

export const {setAuthTrue,setAuthFalse } = isAuth.actions
export const authState = state => state.isAuth
export default isAuth.reducer

