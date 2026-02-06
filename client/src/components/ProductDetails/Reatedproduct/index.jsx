import { useState } from 'react';
import Button from '@mui/material/Button';
import img1 from "../../../assets/images/banner1.jpg";
import pro from '../../../assets/images/pro.jpg';
import { IoArrowForward } from "react-icons/io5";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { FaStar, FaRegStar} from "react-icons/fa";
import { IoMdHeartEmpty } from "react-icons/io";
import { RxExitFullScreen } from "react-icons/rx";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import './List1.css';
import ProductModel from '../../ProductModel';

const List1 = () => {

  // -------------------------------
  //  PRODUCT MODAL STATE
  // -------------------------------
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedProduct(null);
  };


  const products = [
    {
      id: 1,
      name: "Leather Handbag",
      desc: "Stylish red PU handbag for women",
      img: "https://api.spicezgold.com/download/file_1734527074321_ksc-khatushyam-collection-red-pu-for-women-handheld-bag-product-images-rvvxdnkjfy-0-202405290001.webp",
      oldPrice: 79.99,
      newPrice: 49.99,
      rating: 4.5,
      inStock: true,
    },
    {
      id: 2,
      name: "Smart Watch",
      desc: "Waterproof Bluetooth wrist watch",
      img: pro,
      oldPrice: 99.99,
      newPrice: 69.99,
      rating: 4.0,
      inStock: false,
    },
    {
      id: 3,
      name: "Trendy Shoes",
      desc: "Comfortable sneakers for men",
      img: pro,
      oldPrice: 89.99,
      newPrice: 59.99,
      rating: 3.5,
      inStock: true,
    },
    {
      id: 4,
      name: "Classic Sunglasses",
      desc: "UV-protected stylish eyewear",
      img: pro,
      oldPrice: 59.99,
      newPrice: 39.99,
      rating: 5,
      inStock: true,
    },
    {
      id: 5,
      name: "Designer Wallet",
      desc: "Premium leather men’s wallet",
      img: pro,
      oldPrice: 49.99,
      newPrice: 29.99,
      rating: 4.2,
      inStock: false,
    },
  ];

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 !== 0;
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) stars.push(<FaStar key={i} className="text-warning" />);
      else if (i === fullStars && hasHalf)
        stars.push(<FaStar key={i} className="text-warning opacity-50" />);
      else stars.push(<FaRegStar key={i} className="text-muted" />);
    }
    return stars;
  };

  const getDiscountPercent = (oldPrice, newPrice) => {
    const discount = ((oldPrice - newPrice) / oldPrice) * 100;
    return Math.round(discount);
  };

  return (
    <section className="homeProducts py-5">
      <div className="container">
        <div className="row">

          {/* Product list */}
          <div className="col-md-12 ProductsRow">
            <div className="d-flex align-items-center mb-3">
              <div className="info w-75 ml-4">
                <h3 className="mb-0 hd"> RELATED PRODUCTS</h3>
               
              </div>
              <Button
                className='viewAllBtn ml-auto'
                variant="contained"
                color="primary"
                endIcon={<IoArrowForward />}
              >
                View All
              </Button>
            </div>

            <div className="product_row w-100 mt-2 ml-4">
              <div className="custom-swiper-button-prev-1">
                <IoChevronBack />
              </div>
              <div className="custom-swiper-button-next-1">
                <IoChevronForward />
              </div>

              <Swiper
                slidesPerView={4}
                spaceBetween={25}
                modules={[Navigation]}
                className="mySwiper"
                onInit={(swiper) => {
                  swiper.params.navigation.prevEl = '.custom-swiper-button-prev-1';
                  swiper.params.navigation.nextEl = '.custom-swiper-button-next-1';
                  swiper.navigation.init();
                  swiper.navigation.update();
                }}
              >
                {products.map((item) => (
                  <SwiperSlide key={item.id}>
                    <div className='card productCard shadow-sm border-0 rounded-lg'>
                      <div className='imgWrapper overflow-hidden position-relative'>
                        <img src={item.img} alt={item.name} className="img-fluid w-100" />

                        {/* Discount */}
                        <span className="discountBadge">
                          {getDiscountPercent(item.oldPrice, item.newPrice)} % OFF
                        </span>

                        {/* Icons */}
                        <div className="imageIcons">

                          {/*  FULL SCREEN ICON CLICK → OPEN MODAL */}
                          <span className="iconBox" onClick={() => handleOpenModal(item)}>
                            <RxExitFullScreen />
                          </span>

                          <span className="iconBox">
                            <IoMdHeartEmpty />
                          </span>

                        </div>
                      </div>

                      <div className='card-body text-start px-3'>
                        <h6 className='card-title mb-1 fw-bold'>{item.name}</h6>
                        <p className='text-muted small mb-1'>{item.desc}</p>

                        <div className={`stockStatus ${item.inStock ? 'inStock' : 'outStock'}`}>
                          {item.inStock ? "In Stock" : "Out of Stock"}
                        </div>

                        <div className='rating mb-2'>
                          {renderStars(item.rating)}
                        </div>

                        <div className='priceBox mt-1'>
                          <span className='oldPrice me-2'>${item.oldPrice.toFixed(2)}</span>
                          <span className='newPrice ml-3'>${item.newPrice.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>

        </div>

        {/*  PRODUCT MODAL COMPONENT */}
        <ProductModel 
          open={openModal} 
          onClose={handleCloseModal} 
          product={selectedProduct} 
        />

      </div>
    </section>
  );
};

export default List1;
