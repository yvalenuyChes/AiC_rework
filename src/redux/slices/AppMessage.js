import { createSlice } from '@reduxjs/toolkit'


const initialState= {
   appMessage:'',
   color: ''
}

export const appMessage = createSlice({
   name:'appMessage',
   initialState,
   reducers:{
      setMessage : (state, action) => {
         state.appMessage = action.payload
      },
      removeMessage: (state, action) => {
         state.appMessage = ''
      },
      setColor: (state, action) => {
         state.color = action.payload
      },
      removeColor: (state, action) => {
         state.color = ''
      }
   }
   })


export const {setMessage,removeMessage, setColor, removeColor  } = appMessage.actions
export const appMessageState = state => state.isAuth
export default appMessage.reducer