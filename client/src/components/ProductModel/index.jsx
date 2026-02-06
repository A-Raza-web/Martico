import { useState, useEffect, useRef } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { IoMdLock } from "react-icons/io";
import "./ProductModel.css";

const ProductModel = ({ open, onClose, product }) => {
  const [activeImg, setActiveImg] = useState(null);
  const [zoomStyle, setZoomStyle] = useState({});
  const imgContainerRef = useRef(null);

  useEffect(() => {
    if (product) setActiveImg(product.img);
  }, [product]);

  if (!product) return null;

  // Zoom handlers
  const handleMouseMove = (e) => {
    const { left, top, width, height } = imgContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({ transformOrigin: `${x}% ${y}%`, transform: "scale(2)" });
  };
  const handleMouseLeave = () => setZoomStyle({ transform: "scale(1)", transformOrigin: "center center" });

  // Render stars
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) stars.push(<AiFillStar key={i} className="starIcon" />);
      else stars.push(<AiOutlineStar key={i} className="starIcon outline" />);
    }
    return stars;
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>

      <div className="amazonModal">
        {/* LEFT – IMAGE + SLIDER */}
        <div className="amazonLeft">
          <div
            className="amazonMainImgWrapper"
            ref={imgContainerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <img src={activeImg} alt="product" className="amazonMainImgZoom" style={zoomStyle} />
          </div>

          {product.images?.length > 0 && (
            <div className="amazonThumbWrapper">
              <Swiper slidesPerView={5} spaceBetween={10}>
                {product.images.map((img, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={img}
                      alt="thumb"
                      className={`amazonThumb ${activeImg === img ? "amazonActiveThumb" : ""}`}
                      onClick={() => setActiveImg(img)}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
        </div>

        {/* CENTER – DETAILS */}
        <div className="amazonCenter">
          <h2 className="amazonTitle">{product.name}</h2>

          <div className="amazonRatings">
            {renderStars(product.rating)} <span className="count">(1,245 ratings)</span>
          </div>

          <p className="amazonDesc">{product.desc}</p>

          <ul className="amazonBullets">
            <li>High-quality premium material</li>
            <li>Fast delivery available</li>
            <li>Easy 7-day return policy</li>
            <li>Trusted Brand</li>
          </ul>

          <div className="amazonPriceBox">
            <span className="amazonPrice">${product.newPrice}</span>
            <span className="amazonOldPrice">${product.oldPrice}</span>
          </div>

          <p className={`amazonStock ${product.inStock ? "inS" : "outS"}`}>
            {product.inStock ? "In Stock." : "Currently unavailable."}
          </p>
          <div className="closeBtnWrapper">
            <Button className="closeBtn" variant="outlined" onClick={onClose}>
                Close
            </Button>
          </div>
         
        </div>
                 
        {/* RIGHT – BUY BOX */}
        <div className="amazonRightBox">
          <div className="boxPrice">${product.newPrice}</div>

          <div className="deliveryText">
            FREE delivery available <br />
            <strong>Tomorrow</strong> if you order today
          </div>

          <Button  className="buyNowBtn">
            Buy Now
          </Button>
          <Button variant="contained" className="addToCartBtn" disabled={!product.inStock}>
            Add to Cart
          </Button>
          <Button variant="outlined" className="amazonWishlistBtn">
            Add to Wishlist
          </Button>

          <div className="secureText">
            <IoMdLock /> Secure transaction
          </div>
        </div>
      
      </div>
        
    </Dialog>
  );
};

export default ProductModel;
