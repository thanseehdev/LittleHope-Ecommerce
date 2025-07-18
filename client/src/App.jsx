
import { Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loadUser } from './redux/features/user/userActions'
import { useEffect } from 'react'

import RegisterPage from './pages/userPages/Register'
import Login from './pages/userPages/Login'
import EnterOtp from './pages/userPages/Otp'
import Home from './pages/userPages/Home'
import ProductGrid from './components/userCom/products/allProducts/ProductGrid'
import ProductDetail from './pages/userPages/ProductDetails'
import CartPage from './pages/userPages/CartPage'
import WishlistCard from './pages/userPages/Wishlist'
import AddressPage from './pages/userPages/AddressPage'
import CheckoutPayment from './pages/userPages/CheckoutPage'
import ProfilePage from './pages/userPages/ProfilePage'
import OrderSuccess from './pages/userPages/OrderSuccessPage'
import OrderPage from './pages/userPages/OrderPage'
import OrderDetailPage from './pages/userPages/OrderDetails'
import ContactPage from './pages/userPages/Contact'
import AdminDashboard from './pages/adminPages/AdminDashboard'
import AdminUsers from './pages/adminPages/Users'
import AdminProduct from './pages/adminPages/Products'
import AdminOrder from './pages/adminPages/Orders'
import AdminAddProduct from './components/adminCom/AddProduct'
import AdminAddCoupon from './components/adminCom/AddCoupon'
import AdminGetCoupon from './pages/adminPages/Coupon'
import AdminGetEditProduct from './components/adminCom/EditProduct'
import Test from './pages/userPages/test'
import AddAdress from './components/userCom/address/AddAddressModal'
import ForgetPassword from './pages/userPages/forgetPassword'
import AdminOrderDetails from './pages/adminPages/AdminOrderDetails'



function App() {
  // const dispatch = useDispatch()
  // useEffect(() => {
  //   dispatch(loadUser());
  // }, []);

  return (
    <Routes>

      <Route path='/register' element={<RegisterPage />} />
      <Route path='/login' element={<Login />} />
      <Route path='/otp' element={<EnterOtp />} />
      <Route path='/home' element={<Home />} />
      <Route path='/allProducts' element={<ProductGrid />} />
      <Route path='/productDetails/:id' element={<ProductDetail />} />
      <Route path='/cart' element={<CartPage />} />
      <Route path='/wishlist' element={<WishlistCard />} />
      <Route path='/checkoutAddress' element={<AddressPage />} />
      <Route path='/checkoutPayment' element={<CheckoutPayment />} />
      <Route path='/profile' element={<ProfilePage />} />
      <Route path='/orderSuccess' element={<OrderSuccess />} />
      <Route path='/order' element={<OrderPage />} />
      <Route path="/order/:orderId" element={<OrderDetailPage />} />
      <Route path='/contact' element={<ContactPage />} />
      <Route path='/admin/dashboard' element={<AdminDashboard />} />
      <Route path='/admin/user' element={<AdminUsers />} />
      <Route path='/admin/orders' element={<AdminOrder />} />
      <Route path='/admin/product' element={<AdminProduct />} />
      <Route path='/admin/addProduct' element={<AdminAddProduct />} />
      <Route path='/admin/addCoupon' element={<AdminAddCoupon />} />
      <Route path='/admin/coupon' element={<AdminGetCoupon />} />
      <Route path='/admin/editProduct/:id' element={<AdminGetEditProduct />} />
      <Route path='/test' element={<Test />} />
      <Route path='/addAddress' element={<AddAdress />} />
      <Route path='/forgotPassword' element={<ForgetPassword />} />
      <Route path='/admin/adminOrderDetails/:id' element={<AdminOrderDetails />} />

    </Routes>

  )
}

export default App
