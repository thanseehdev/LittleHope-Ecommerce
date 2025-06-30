import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import AdminNavbar from './components/adminCom/common/Navbar';
import Navbar from './components/userCom/common/Navbar';
import AdminDashboard from './pages/adminPages/AdminDashboard';
import UsersPage from './pages/adminPages/Users';
import AdminProductPage from './pages/adminPages/Products';



ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
<UsersPage/>
    </BrowserRouter>
  </StrictMode>
);

