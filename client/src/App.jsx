
import { Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loadUser } from './redux/features/user/userActions'
import { useEffect } from 'react'
import PrivateRoute from './utils/privateRoute'
import ScrollToTop from './components/userCom/ScrollToTop'


import RegisterPage from './pages/userPages/Register'
import Login from './pages/userPages/Login'
import EnterOtp from './pages/userPages/Otp'
import Home from './pages/userPages/Home'
import ProductGrid from './components/userCom/products/allProducts/ProductGrid'
import ProductDetail from './pages/userPages/ProductDetails'
import CartPage from './pages/userPages/CartPage'
import WishlistCard from './pages/userPages/Wishlist'
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
import AccountPage from './pages/userPages/AccountCenter'
import AddAdress from './components/userCom/address/AddAddressModal'
import ForgetPassword from './pages/userPages/forgetPassword'
import AdminOrderDetails from './pages/adminPages/AdminOrderDetails'
import ComingSoon from './pages/userPages/ComingSoon'
import SearchResultPage from './pages/userPages/SearchResult'
import CouponPage from './pages/userPages/Coupon'



function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadUser());
  }, []);

  return (
    <>
      <ScrollToTop />
      <Routes>

        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/otp' element={<EnterOtp />} />
        <Route path='/home' element={<Home />} />
        <Route path='/allProducts' element={<ProductGrid />} />
        <Route path='/productDetails/:id' element={<ProductDetail />} />
        <Route path='/cart' element={<PrivateRoute><CartPage /></PrivateRoute>} />
        <Route path='/wishlist' element={<PrivateRoute><WishlistCard /></PrivateRoute>} />
        <Route path='/checkoutPayment' element={<PrivateRoute><CheckoutPayment /></PrivateRoute>} />
        <Route path='/profile' element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
        <Route path='/orderSuccess' element={<PrivateRoute><OrderSuccess /></PrivateRoute>} />
        <Route path='/order' element={<PrivateRoute><OrderPage /></PrivateRoute>} />
        <Route path="/order/:orderId" element={<PrivateRoute><OrderDetailPage /></PrivateRoute>} />
        <Route path='/contact' element={<ContactPage />} />
        <Route path='/account' element={<PrivateRoute><AccountPage /></PrivateRoute>} />
        <Route path='/addAddress' element={<PrivateRoute><AddAdress /></PrivateRoute>} />
        <Route path='/forgotPassword' element={<ForgetPassword />} />
        <Route path='/comingSoon' element={<ComingSoon />} />
        <Route path='/search' element={<SearchResultPage />} />
        <Route path='/coupon' element={<CouponPage />} />



        <Route path='/admin/dashboard' element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
        <Route path='/admin/user' element={<PrivateRoute><AdminUsers /></PrivateRoute>} />
        <Route path='/admin/orders' element={<PrivateRoute><AdminOrder /></PrivateRoute>} />
        <Route path='/admin/product' element={<PrivateRoute><AdminProduct /></PrivateRoute>} />
        <Route path='/admin/addProduct' element={<PrivateRoute><AdminAddProduct /></PrivateRoute>} />
        <Route path='/admin/addCoupon' element={<PrivateRoute><AdminAddCoupon /></PrivateRoute>} />
        <Route path='/admin/coupon' element={<PrivateRoute><AdminGetCoupon /></PrivateRoute>} />
        <Route path='/admin/editProduct/:id' element={<PrivateRoute><AdminGetEditProduct /></PrivateRoute>} />
        <Route path='/admin/adminOrderDetails/:id' element={<PrivateRoute><AdminOrderDetails /></PrivateRoute>} />

      </Routes>
    </>
  )
}

export default App
