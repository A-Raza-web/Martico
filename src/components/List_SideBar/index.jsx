import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useState } from "react";
import Button from "@mui/material/Button";
import { Link } from 'react-router-dom';

import "./sideBar.css"

const SideBar =  ({ onPriceFilter }) => {
  const [priceRange, setPriceRange] = useState(200);

  const applyPriceFilter = () => {
    onPriceFilter(priceRange); 
  };

  return(
    <>
       <div className="sideBar">
         <div  className="filterBox">
          <h6>PRODUCT CATEGORIES</h6>
          <div className='scroll'>
            <ul>
              <li>
                <FormControlLabel className='w-100' control={<Checkbox defaultChecked />} label="Fashion" />
              </li>
              <li>
                <FormControlLabel className='w-100' control={<Checkbox defaultChecked />} label="Electronic" />
              </li>
              <li>
                <FormControlLabel className='w-100' control={<Checkbox defaultChecked />} label="Bakery" />
              </li>
             <li>
                <FormControlLabel className='w-100' control={<Checkbox defaultChecked />} label="Mobiles" />
              </li>
              <li>
                <FormControlLabel className='w-100' control={<Checkbox defaultChecked />} label="Fashion" />
              </li>
              <li>
                <FormControlLabel className='w-100' control={<Checkbox defaultChecked />} label="Fashion" />
              </li>
              <li>
                <FormControlLabel className='w-100' control={<Checkbox defaultChecked />} label="FASHION" />
              </li>
              <li>
                <FormControlLabel className='w-100' control={<Checkbox defaultChecked />} label="FASHION" />
              </li>
              <li>
                <FormControlLabel className='w-100' control={<Checkbox defaultChecked />} label="FASHION" />
              </li>
              <li>
                <FormControlLabel className='w-100' control={<Checkbox defaultChecked />} label="FASHION" />
              </li>
              <li>
                <FormControlLabel className='w-100' control={<Checkbox defaultChecked />} label="FASHION" />
              </li>
            </ul>
          </div>
         </div>
        <div className="filterBox ">
            <h6 className="filterTitle">FILTER BY PRICE</h6>

            <div className="priceSliderWrapper">
              <input
                type="range"
                min="0"
                max="200"
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="priceSlider"
                style={{
                  // Yeh line dynamic color update karegi
                  background: `linear-gradient(to right, #2DE1C2 0%, #2DE1C2 ${(priceRange / 200) * 100}%, #e0e0e0 ${(priceRange / 200) * 100}%, #e0e0e0 100%)`
                }}
              />
            </div>

            <div className="priceValues">
              <span>$0</span>
              <span className="activePrice">${priceRange}</span>
            </div>

            <Button
              variant="contained"
              size="small"
              className="filterBtn"
              onClick={applyPriceFilter}
            >
              <span className='Apply_fil'>Apply Filter</span>
            </Button>
        </div>
        <div  className="filterBox ">
          <h6>PRODUCT STATUS</h6>
          <div className='scroll'>
            <ul>
              <li>
                <FormControlLabel className='w-100' control={<Checkbox defaultChecked />} label="In Stock" />
              </li>
              <li>
                <FormControlLabel className='w-100' control={<Checkbox defaultChecked />} label="Out Stock" />
              </li>
              
            
            </ul>
          </div>
        </div>
         <div  className="filterBox ">
          <h6>BRANDS</h6>
          <div className='scroll'>
            <ul>
              <li>
                <FormControlLabel className='w-100' control={<Checkbox defaultChecked />} label="In Stock" />
              </li>
              <li>
                <FormControlLabel className='w-100' control={<Checkbox defaultChecked />} label="Out Stock" />
              </li>
              
            
            </ul>
          </div>
        </div>
        <div className="sideBarBanner">
            <Link to="#">
            <img src="https://api.spicezgold.com/download/file_1734525767798_NewProject(35).jpg"/>
            </Link> 
        </div>
        <div>
            <Link to="#">
            <img src="https://api.spicezgold.com/download/file_1734525767798_NewProject(35).jpg"/>
            </Link> 
        </div>
       </div>
       
    </>
  )
}
export default SideBar;