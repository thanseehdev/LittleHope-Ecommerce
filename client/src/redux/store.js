import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../redux/features/user/userSlice'
import adminUserReducer from '../redux/features/admin/adminUser/adminUserSlice'
import adminProductReducer from '../redux/features/admin/adminProduct/adminProductSlice'
import newArrivalReducer from '../redux/features/user/product/newArrivalSlice'
import productDetailReducer from '../redux/features/user/product/productDetailSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    adminUsers:adminUserReducer,
    product:adminProductReducer,
    newArrival:newArrivalReducer,
    productDetail:productDetailReducer
  },
});