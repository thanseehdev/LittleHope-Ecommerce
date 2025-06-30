
import { Routes, Route } from 'react-router-dom'
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
