import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/index';
import Home  from './pages/Home';
import Listing  from './pages/Listing/index';
import ProductDetails from './pages/ProductDetails';
import Card from "./pages/Card";
import Footer from './components/Footer';

function App() {
  return (
      <BrowserRouter>
        <Header/>
        <Routes>
            <Route path='/' element={<Home/>} />   
            <Route path='/cat/:id' element={<Listing/>} />  
            <Route path='/product/:id' element={<ProductDetails/>} /> 
            <Route path='/card' element={<Card/>} />                  
        </Routes>
        <Footer/>
      </BrowserRouter>
  );
}

export default App;
