import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../redux/features/user/userSlice'
import adminUserReducer from '../redux/features/admin/adminUser/adminUserSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    adminUsers:adminUserReducer,
  },
});