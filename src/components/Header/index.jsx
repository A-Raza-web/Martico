import {Link} from 'react-router-dom';
import logo from '../../assets/images/logo11.png'
import Countrydorp from '../CountryDropdown';
import Button from '@mui/material/Button';
import { PiUserDuotone } from "react-icons/pi";
import { IoBagOutline } from "react-icons/io5";
import SearchBar from './SearchBar';
import Navigation from './Navigation'



const Header = ()=>{
 return (
     <div className="headerWrapper">
       <div className="top-strip bg-aqua">
         <div className="container"> 
            <p className="mt-0 mb-0 text-center">
                 Orders may be slightly delayed due to unforeseen reasons.
            </p>
         </div>
      </div>
         <div className="header">
               <div className="container">
                  <div className="row">
                     <div className="logoWrapper d-flex align-items-center  col-sm-3  " >
                        <Link  to={'/'}> <img  src={logo} alt='logo'/> </Link>
                     </div> 
                     <div className='col-sm-9 d-flex align-items-center part2 '>
                         <Countrydorp/>
                         <SearchBar/>
                           <div className=' part3 d-flex align-items-center  ml-auto '>
                              <Button className='circle1 mr-3'><PiUserDuotone/></Button>
                              <div className='ml-auto cardTab d-flex align-items-center'> 
                                 <span className='price'>$3.22</span>
                                 <div className=' positon-relative ml-2'>
                                    <Button className='circle2 '><IoBagOutline/></Button>
                                    <span className='count d-flex align-items-center justify-content-center'>1</span>
                                 </div>
                              </div>                             
                           </div>
                     </div>   
                       
                  </div>
              </div>
         </div>    
          <Navigation/>
      </div>
  
 )

}
export default Header;