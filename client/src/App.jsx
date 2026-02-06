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
  const hideOn = ['/signin', '/signup'];
  const showHeaderFooter = !hideOn.includes(path);

  return (
    <>
      {showHeaderFooter && <Header/>}
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/cat/:id' element={<Listing/>} />
        <Route path='/product/:id' element={<ProductDetails/>} />
        <Route path='/card' element={<Card/>} />
        <Route path='/signIn' element={<AuthForm />} />
        <Route path='/signUp' element={<AuthForm />} />
      </Routes>
      {showHeaderFooter && <Footer/>}
    </>
  );
}

export default App;
