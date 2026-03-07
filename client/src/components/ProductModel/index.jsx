import { useState, useEffect, useRef } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { IoMdLock, IoMdCloseCircle } from "react-icons/io";
import { GrClose } from "react-icons/gr";
import QuantityBtn from "../Quantitybtn";
import "./ProductModel.css";

const ProductModel = ({ open, onClose, product }) => {
  const [activeImg, setActiveImg] = useState(null);
  const [zoomStyle, setZoomStyle] = useState({});
  const imgContainerRef = useRef(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (product) {
      // Get the first image from images array or fall back to img property
      if (product.images && product.images.length > 0) {
        setActiveImg(product.images[0].url);
      } else if (product.img) {
        setActiveImg(product.img);
      } else {
        setActiveImg(null);
      }
    }
  }, [product]);

  if (!product) return null;

  // Handle different data formats (API vs static)
  const productName = product.name || '';
  const productBrand = product.brand || '';
  const productDesc = product.description || product.desc || '';
  const productPrice = product.newPrice ?? product.price ?? 0;
  const productOldPrice = product.oldPrice ?? ((product.price ?? 0) * 1.2);
  const productInStock = (product.countInStock ?? product.inStock ?? 0) > 0;
  const productRating = product.rating ?? 0;
  const maxQty = (product.countInStock ?? 99) || 99;

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
        <button className="modalCloseBtn" onClick={onClose}>
          <GrClose />

        </button>
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

          {product.images?.length > 0 ? (
            <div className="amazonThumbWrapper">
              <Swiper slidesPerView={5} spaceBetween={10}>
                {product.images.map((imgObj, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={imgObj.url}
                      alt="thumb"
                      className={`amazonThumb ${activeImg === imgObj.url ? "amazonActiveThumb" : ""}`}
                      onClick={() => setActiveImg(imgObj.url)}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          ) : product.img ? (
            <div className="amazonThumbWrapper">
              <Swiper slidesPerView={5} spaceBetween={10}>
                <SwiperSlide>
                  <img
                    src={product.img}
                    alt="thumb"
                    className="amazonThumb amazonActiveThumb"
                  />
                </SwiperSlide>
              </Swiper>
            </div>
          ) : null}
        </div>

        {/* CENTER – DETAILS */}
        <div className="amazonCenter">
          <h2 className="amazonTitle">
            {productName} {productBrand ? <span className="brandTag">({productBrand})</span> : ''}
          </h2>

          <p className="amazonDesc">
           {productDesc?.split(" ").slice(0, 17).join(" ")}...
          </p>

          <div className="amazonRatings">
            {renderStars(productRating)} <span className="count">(1,245 ratings)</span>
          </div>

          <div className="amazonPriceBox">
            <span className="amazonPrice">${productPrice.toFixed(2)}</span>
            <span className="amazonOldPrice">${productOldPrice.toFixed(2)}</span>
          </div>
          
          <div className="qtyInline">
            <QuantityBtn value={qty} onChange={setQty} min={1} max={maxQty} />
          </div>

          <p className={`amazonStock ${productInStock ? "inS" : "outS"}`}>
            {productInStock ? "In Stock." : "Currently unavailable."}
          </p>
         
        </div>
                 
        {/* RIGHT – BUY BOX */}
        <div className="amazonRightBox">
          <div className="boxPrice">${productPrice.toFixed(2)}</div>

          <div className="deliveryText">
            FREE delivery available <br />
            <strong>Tomorrow</strong> if you order today
          </div>

          <Button  className="buyNowBtn">
            Buy Now
          </Button>
          <Button variant="contained" className="addToCartBtn" disabled={!productInStock}>
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
