import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../redux/features/user/userSlice'
import adminUserReducer from '../redux/features/admin/adminUser/adminUserSlice'
import adminProductReducer from '../redux/features/admin/adminProduct/adminProductSlice'
import newArrivalReducer from '../redux/features/user/product/newArrivalSlice'
import productDetailReducer from '../redux/features/user/product/productDetailSlice'
import allProductReducer from '../redux/features/user/product/allProductsSlice'
import profileReducer from '../redux/features/user/profile/profileSlice'
import couponReducer from '../redux/features/admin/adminCoupon/couponSlice'
import cartReducer from '../redux/features/user/cart/cartSlice'
import orderReducer from '../redux/features/user/order/orderSlice'
import wishlistReducer from '../redux/features/user/wishlist/wishlistSlice'
import adminOrderReducer from '../redux/features/admin/adminOrder/adminOrderSlice'


export const store = configureStore({
  reducer: {
    user: userReducer,
    adminUsers:adminUserReducer,
    product:adminProductReducer,
    newArrival:newArrivalReducer,
    productDetail:productDetailReducer,
    allProducts:allProductReducer,
    profile:profileReducer,
    coupons:couponReducer,
    cart:cartReducer,
    order:orderReducer,
    wishlist:wishlistReducer,
    adminOrder:adminOrderReducer
  },
});