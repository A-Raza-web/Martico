import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header/index';
import Home  from './pages/Home';
import Listing  from './pages/Listing/index';
import ProductDetails from './pages/ProductDetails';
import Card from "./pages/Card";
import Footer from './components/Footer';
import AuthForm from './pages/AuthForm';
import Profile from './pages/Profile';
import Orders from './pages/Orders';

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

function AppRoutes() {
  const location = useLocation();
  const path = location.pathname.toLowerCase();
  const hideOn = ['/signin', '/signup', '/profile', '/orders', '/order'];
  const showHeaderFooter = !hideOn.includes(path);

  return (
    <>
      {showHeaderFooter && <Header/>}
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/cat/:id' element={<Listing/>} />
        <Route path='/product/:id' element={<ProductDetails/>} />
        <Route path='/card' element={<Card/>} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='/orders' element={<Orders/>} />
        <Route path='/order' element={<Orders/>} />
        <Route path='/signIn' element={<AuthForm />} />
        <Route path='/signUp' element={<AuthForm />} />
      </Routes>
      {showHeaderFooter && <Footer/>}
    </>
  );
}

export default App;
