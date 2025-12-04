import Button from '@mui/material/Button';
import { IoIosMenu } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import {
  CiHome,
  CiShoppingTag,
  CiLaptop,
  CiPizza,
  CiMobile3,
  CiRead,
  CiPhone,
} from "react-icons/ci"; // Outline Icons
import { useState } from 'react';

const Navication = () => {
  const [isopenSidebarVal, setisopenSidebarVal] = useState(false);
   

  return (   
   <nav className="custom-navbar py-2 shadow-sm">
      <div className='container navbar'>
        <div className='row align-items-center'>

          {/* Left Section */}
          <div className='col-sm-2 navPart1 d-flex align-items-center'>
            <div className='cadWrapper'>
              <Button className='allCatTab align-items-center px-3 py-2'
                  onClick={() => setisopenSidebarVal(!isopenSidebarVal)}
                >
                <span className='icon1 mr-2'><IoIosMenu /></span>
                <span className='text font-weight-bold'>All CATEGORIES</span>
                <span className='icon2 ml-2'><FaAngleDown /></span>
              </Button>
              <div >
               <ul className={`sidebarNav ${isopenSidebarVal ? 'open' : ''}`}>
                <li><Link to="/"><CiHome size={22} /><span>Home</span></Link></li>
                <li><Link to="/"><CiShoppingTag size={22} /><span>Fashion</span></Link></li>
                <li><Link to="/"><CiLaptop size={22} /><span>Electronic</span></Link></li>
                <li><Link to="/"><CiPizza size={22} /><span>Bakery</span></Link></li>
                <li><Link to="/"><CiMobile3 size={22} /><span>Mobiles</span></Link></li>
                <li><Link to="/"><CiRead size={22} /><span>Blog</span></Link></li>
                <li><Link to="/"><CiPhone size={22} /><span>Contact</span></Link></li>
              </ul>
                   
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className='col-sm-10 navPart2 d-flex align-items-center justify-content-end navpart2'>
            <ul className="list list-inline d-flex align-items-center justify-content-end mb-0">

              <li className='list-line-items '>
                <Link to="/"><CiHome size={22} /> <span>Home</span></Link>
              </li>

              <li className='list-line-items '>
                <Link to="/"><CiShoppingTag size={22} /> <span>Fashion</span></Link>
                 <div className='subMenu shadow'>
                    <Link to="/"> <span>clothing</span></Link>
                    <Link to="/"> <span>footwear</span></Link>
                    <Link to="/"> <span>watches</span></Link> 
                    <Link to="/"> <span>clothing</span></Link>
                    <Link to="/"> <span>footwear</span></Link>
                    <Link to="/"> <span>watches</span></Link>
                 </div>
              </li>

              <li className='list-line-items'>
                <Link to="/"><CiLaptop size={22} /> <span>Electronic</span></Link>
                <div className='subMenu shadow'>
                    <Link to="/"> <span>clothing</span></Link>
                    <Link to="/"> <span>footwear</span></Link>
                    <Link to="/"> <span>watches</span></Link> 
                    <Link to="/"> <span>clothing</span></Link>
                    <Link to="/"> <span>footwear</span></Link>
                    <Link to="/"> <span>watches</span></Link>
                 </div>
              </li>

              <li className='list-line-items '>
                <Link to="/"><CiPizza size={22} /> <span>Bakery</span></Link>
                <div className='subMenu shadow'>
                    <Link to="/"> <span>clothing</span></Link>
                    <Link to="/"> <span>footwear</span></Link>
                    <Link to="/"> <span>watches</span></Link> 
                    <Link to="/"> <span>clothing</span></Link>
                    <Link to="/"> <span>footwear</span></Link>
                    <Link to="/"> <span>watches</span></Link>
                 </div>
              </li>

              <li className='list-line-items '>
                <Link to="/"><CiMobile3 size={22} /> <span>Mobiles</span></Link>
                <div className='subMenu shadow'>
                    <Link to="/"> <span>clothing</span></Link>
                    <Link to="/"> <span>footwear</span></Link>
                    <Link to="/"> <span>watches</span></Link> 
                    <Link to="/"> <span>clothing</span></Link>
                    <Link to="/"> <span>footwear</span></Link>
                    <Link to="/"> <span>watches</span></Link>
                 </div>
              </li>

              <li className='list-line-items '>
                <Link to="/"><CiRead size={22} /> <span>Blog</span></Link>
              </li>

              <li className='list-line-items '>
                <Link to="/"><CiPhone size={22} /> <span>Contact</span></Link>
              </li>

            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navication;
