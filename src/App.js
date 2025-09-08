import './App.css';
import Layout from './layouts/Layout';
import { Routes,Route } from 'react-router';
import Login from './pages/Login.js';
import EState from './context/ecommerce/EState';
import Items from './pages/Items.js';
import Cart from './pages/Cart.js';

function App() {
  return (
   <EState>  
    <Layout>
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/items" element={<Items/>}></Route>
        <Route path="/cart" element={<Cart/>}></Route>
      </Routes>
    </Layout>
    </EState>
  );
}

export default App;

