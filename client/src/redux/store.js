import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../redux/features/user/userSlice'
import adminUserReducer from '../redux/features/admin/adminUser/adminUserSlice'
import adminProductReducer from '../redux/features/admin/adminProduct/adminProductSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    adminUsers:adminUserReducer,
    product:adminProductReducer
  },
});