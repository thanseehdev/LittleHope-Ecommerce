import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import OrderSuccess from './components/products/testNewArrival';

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <OrderSuccess/>
    </BrowserRouter>
  </StrictMode>
);

