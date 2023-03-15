import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { navOpen } from './slices/openNav';
import {openPopup} from './slices/openPopup';

 const store = () =>
  configureStore({
    reducer: {
       [navOpen.name]: navOpen.reducer,
       [openPopup.name]: openPopup.reducer
    },
    devTools: true,
  })

export const wrapper = createWrapper(store)