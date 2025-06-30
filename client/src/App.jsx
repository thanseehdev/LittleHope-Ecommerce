
import { Routes, Route } from 'react-router-dom'
import RegisterPage from './pages/Register'
import Login from './pages/Login'
import EnterOtp from './pages/Otp'
import Home from './pages/Home'
import ProductGrid from './components/products/allProducts/ProductGrid'
import ProductDetail from './pages/ProductDetails'
import CartPage from './pages/CartPage'
import WishlistCard from './pages/Wishlist'
import AddressPage from './pages/AddressPage'
import CheckoutPayment from './pages/CheckoutPage'
import ProfilePage from './pages/ProfilePage'
import OrderSuccess from './pages/OrderSuccessPage'
import OrderPage from './pages/OrderPage'
import OrderDetailPage from './pages/OrderDetails'
import ContactPage from './pages/Contact'




function App() {
  return (
    <Routes>

      <Route path='/register' element={<RegisterPage />} />
      <Route path='/login' element={<Login />} />
      <Route path='/otp' element={<EnterOtp />} />
      <Route path='/home' element={<Home />} />
      <Route path='/allProducts' element={<ProductGrid />} />
      <Route path='/productDetails' element={<ProductDetail />} />
      <Route path='/cart' element={<CartPage />} />
       <Route path='/wishlist' element={<WishlistCard/>} />
        <Route path='/checkoutAddress' element={<AddressPage/>} />
         <Route path='/checkoutPayment' element={<CheckoutPayment/>} />
         <Route path='/profile' element={<ProfilePage/>} />
         <Route path='/orderSuccess' element={<OrderSuccess/>} />
         <Route path='/order' element={<OrderPage/>} />
          <Route path="/order/:orderId" element={<OrderDetailPage />} />
          <Route path='/contact' element={<ContactPage/>} />
         
        

    </Routes>

  )
}

export default App
