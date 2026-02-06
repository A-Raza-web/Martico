import { Link } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import { MdOutlineDelete } from "react-icons/md";
import QuantityBtn from '../../components/Quantitybtn/index';
import { IoBagCheckOutline } from "react-icons/io5";

import './card.css';

const Card = () => {

  return (
   
   <section className="section card-section">
      <div className="container">
        <h2 className="hd mb-1">Your Cart</h2>
        <p>
          There are <b className='text-red'>1</b> products in your cart.
        </p>
          <div className="controiler">
            <div className='row'> 
              <div className="col-md-9 pr-5">
                  <table className="table">
                    <thead >
                      <tr>
                        <th width="35%">Products</th>
                        <th width="10%">Price</th>
                        <th width="25%">Quantity</th>
                        <th width="20%">Subtotal</th>
                        <th width="10%">Remove</th>
                      </tr>
                    </thead>
                
                  <tbody>
                      <tr >
                      <td  width="35%"  >
                        <Link to="/product/1">
                          <div className="d-flex align-items-center cardProductItem ">
                              <img
                              src="https://api.spicezgold.com/download/file_1734771942206_motorola-edge-50-fusion-5g-hot-pink-256-gb-12-gb-ram-product-images-orvvh2thgzw-p609069813-0-202405250532.webp"
                              alt="Product Image"
                              className="imgWapper"
                              />
                              <div className="info px-3">
                                <h6>Motorola Edge 50 Fusion 5G</h6>
                                <Rating name="size-small" defaultValue={2} size="small" />
                              </div>
                          </div>
                        </Link>
                      </td>
                      <td width="10%" className='fond-weight'>1.00$</td>
                      <td width="25%">
                            <QuantityBtn/>
                      </td>
                      <td width="20%" className='fond-weight '>7.00$</td>
                      <td width="10%" >
                        <Button className="deleteBtn">
                           <MdOutlineDelete />
                        </Button>
                      </td>
                      </tr>
                      <tr >
                      <td  width="35%"  >
                        <Link to="/product/1">
                          <div className="d-flex align-items-center cardProductItem ">
                              <img
                              src="https://api.spicezgold.com/download/file_1734771942206_motorola-edge-50-fusion-5g-hot-pink-256-gb-12-gb-ram-product-images-orvvh2thgzw-p609069813-0-202405250532.webp"
                              alt="Product Image"
                              className="imgWapper"
                              />
                              <div className="info px-3">
                                <h6>Motorola Edge 50 Fusion 5G</h6>
                                <Rating name="size-small" defaultValue={2} size="small" />
                              </div>
                          </div>
                        </Link>
                      </td>
                      <td width="10%" className='fond-weight'>1.00$</td>
                      <td width="25%">
                            <QuantityBtn/>
                      </td>
                      <td width="20%" className='fond-weight '>7.00$</td>
                      <td width="10%" >
                        <Button className="deleteBtn">
                           <MdOutlineDelete />
                        </Button>
                      </td>
                      </tr>
                      <tr >
                      <td  width="35%"  >
                        <Link to="/product/1">
                          <div className="d-flex align-items-center cardProductItem ">
                              <img
                              src="https://api.spicezgold.com/download/file_1734771942206_motorola-edge-50-fusion-5g-hot-pink-256-gb-12-gb-ram-product-images-orvvh2thgzw-p609069813-0-202405250532.webp"
                              alt="Product Image"
                              className="imgWapper"
                              />
                              <div className="info px-3">
                                <h6>Motorola Edge 50 Fusion 5G</h6>
                                <Rating name="size-small" defaultValue={2} size="small" />
                              </div>
                          </div>
                        </Link>
                      </td>
                      <td width="10%" className='fond-weight'>1.00$</td>
                      <td width="25%">
                            <QuantityBtn/>
                      </td>
                      <td width="20%" className='fond-weight '>7.00$</td>
                      <td width="10%" >
                        <Button className="deleteBtn">
                           <MdOutlineDelete />
                        </Button>
                      </td>
                      </tr>
                      <tr >
                      <td  width="35%"  >
                        <Link to="/product/1">
                          <div className="d-flex align-items-center cardProductItem ">
                              <img
                              src="https://api.spicezgold.com/download/file_1734771942206_motorola-edge-50-fusion-5g-hot-pink-256-gb-12-gb-ram-product-images-orvvh2thgzw-p609069813-0-202405250532.webp"
                              alt="Product Image"
                              className="imgWapper"
                              />
                              <div className="info px-3">
                                <h6>Motorola Edge 50 Fusion 5G</h6>
                                <Rating name="size-small" defaultValue={2} size="small" />
                              </div>
                          </div>
                        </Link>
                      </td>
                      <td width="10%" className='fond-weight'>1.00$</td>
                      <td width="25%">
                            <QuantityBtn/>
                      </td>
                      <td width="20%" className='fond-weight '>7.00$</td>
                      <td width="10%" >
                        <Button className="deleteBtn">
                           <MdOutlineDelete />
                        </Button>
                      </td>
                      </tr>
                      <tr >
                      <td  width="35%"  >
                        <Link to="/product/1">
                          <div className="d-flex align-items-center cardProductItem ">
                              <img
                              src="https://api.spicezgold.com/download/file_1734771942206_motorola-edge-50-fusion-5g-hot-pink-256-gb-12-gb-ram-product-images-orvvh2thgzw-p609069813-0-202405250532.webp"
                              alt="Product Image"
                              className="imgWapper"
                              />
                              <div className="info px-3">
                                <h6>Motorola Edge 50 Fusion 5G</h6>
                                <Rating name="size-small" defaultValue={2} size="small" />
                              </div>
                          </div>
                        </Link>
                      </td>
                      <td width="10%" className='fond-weight'>1.00$</td>
                      <td width="25%">
                            <QuantityBtn/>
                      </td>
                      <td width="20%" className='fond-weight '>7.00$</td>
                      <td width="10%" >
                        <Button className="deleteBtn">
                           <MdOutlineDelete />
                        </Button>
                      </td>
                      </tr>
                  </tbody>
                </table>
              </div>
              <div className="col-md-3">
                  <div className='card border p-3 cardDetail'>
                     <h4>Cart Summary</h4>
                     <div className="d-flex align-items-center mb-3">
                        <span>Subtotal</span>
                        <span className="text-red ml-auto font-weight-bold">$ 7.00</span>
                     </div>
                     <div className="d-flex align-items-center mb-3">
                        <span>Shipping</span>
                        <span className=" ml-auto"><b>Free</b></span>
                     </div>
                     <div className="d-flex align-items-center mb-3">
                        <span>Estimate for</span>
                        <span className="ml-auto"><b>United Kingdom</b></span>
                     </div>
                     <div className="d-flex align-items-center ">
                        <span>Total</span>
                        <span className="text-red ml-auto font-weight-bold">₹22,490.00</span>
                     </div>
                     <br/>
                     <Button className='checkBtn'>
                      <IoBagCheckOutline />
                       <span className='ml-2'>Checkout</span>
                     </Button>
                  </div>
              </div>
            </div>
          </div>
        </div>
    </section>
  );
};

export default Card;