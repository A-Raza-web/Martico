import {Link, useLocation, useNavigate} from 'react-router-dom';
import { useState, useEffect } from 'react';
import logo from '../../assets/images/logo11.png'
import Countrydorp from '../CountryDropdown';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Person from '@mui/icons-material/Person';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LocalShipping from '@mui/icons-material/LocalShipping';
import LogoutIcon from '@mui/icons-material/Logout';
import { PiUserDuotone } from "react-icons/pi";
import { IoBagOutline } from "react-icons/io5";
import SearchBar from './SearchBar';
import Navigation from './Navigation'



const Header = ()=>{
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setUser(JSON.parse(userData));
    } else {
      setUser(null);
    }
  }, [location]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    handleClose();
  };

  const handleProfile = () => {
    handleClose();
    navigate('/profile');
    setTimeout(() => {
      if (window.location.pathname.toLowerCase() !== '/profile') {
        window.location.assign('/profile');
      }
    }, 0);
  };

  const handleOrders = () => {
    handleClose();
    window.location.assign('/orders');
  };

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
                              {user ? (
                                <>
                                  <Button 
                                    className='circle2  mr-3'
                                    onClick={handleClick}
                                  >
                                    <PiUserDuotone />                                  
                                  </Button>
                                  <Menu
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                  >
                                    <div className='userInfo' style={{ padding: '12px 16px' }}>
                                      <div style={{ fontWeight: 600 }}>{user.name}</div>
                                      <div style={{ fontSize: '0.85rem', color: '#666' }}>{user.email}</div>
                                    </div>
                                    <Divider />
                                    <MenuItem onClick={handleProfile}>
                                      <ListItemIcon>
                                        <Person fontSize="small" />
                                      </ListItemIcon>
                                      Profile
                                    </MenuItem>
                                    <MenuItem onClick={handleProfile}>
                                      <ListItemIcon>
                                        <AccountCircle fontSize="small" />
                                      </ListItemIcon>
                                      My Account
                                    </MenuItem>
                                    <MenuItem onClick={handleOrders}>
                                      <ListItemIcon>
                                        <LocalShipping fontSize="small" />
                                      </ListItemIcon>
                                      Orders
                                    </MenuItem>
                                    <Divider />
                                    <MenuItem onClick={handleLogout}>
                                      <ListItemIcon>
                                        <LogoutIcon fontSize="small" />
                                      </ListItemIcon>
                                      Log Out
                                    </MenuItem>
                                  </Menu>
                                  <span className='price'>$3.22</span>
                                </>
                              ) : (
                                <Button component={Link} to={'/signIn'} className='btn-lg signInBtn mr-3'>Sign In</Button>
                              )}
                             
                              <div className='ml-auto cardTab d-flex align-items-center'> 
                                 
                                 <div className=' positon-relative ml-2'>
                                    <Button component={Link} to={'/card'} className='circle2 '><IoBagOutline/></Button>
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
