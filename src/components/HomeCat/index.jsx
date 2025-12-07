import { useRef } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import './HomeCat.css';
import { IoIosArrowRoundForward } from "react-icons/io";
import { IoIosArrowRoundBack } from "react-icons/io";

const HomeCat = () => {
    const swiperRef = useRef(null);

  const images = [
    'https://nest.botble.com/storage/product-categories/image-2.png',
    'https://nest.botble.com/storage/product-categories/image-2.png',
    'https://nest.botble.com/storage/product-categories/image-2.png',
    'https://nest.botble.com/storage/product-categories/image-2.png',
    'https://nest.botble.com/storage/product-categories/image-2.png',
    'https://nest.botble.com/storage/product-categories/image-2.png',
    'https://nest.botble.com/storage/product-categories/image-2.png',
    'https://nest.botble.com/storage/product-categories/image-2.png',
    'https://nest.botble.com/storage/product-categories/image-2.png',   
    'https://nest.botble.com/storage/product-categories/image-2.png',
    'https://nest.botble.com/storage/product-categories/image-2.png',
    'https://nest.botble.com/storage/product-categories/image-2.png',
    'https://nest.botble.com/storage/product-categories/image-2.png', 
    'https://nest.botble.com/storage/product-categories/image-2.png',
    'https://nest.botble.com/storage/product-categories/image-2.png',
    'https://nest.botble.com/storage/product-categories/image-2.png', 
];

const colors = [
  "#FEEFEA",  // light peach
  "#EAF4FF",  // sky blue
  "#FFF3E8",  // light orange
  "#E4F9F5",  // mint light
  "#FFEAF4",  // light pink
  "#FFF9E6",  // cream yellow
  "#E6F7FF",  // baby blue
  "#F5E8FF",  // soft violet
  "#FFECEC",  // soft rose
  "#E8FFE8",  // soft green
  "#F9E8D9",  // milk coffee
  "#FDEBFF",  // pastel lavender
  "#EAF0FF",  // crystal blue
  "#FFF1F0",  // blush white
  "#EDF9FF",  // ice blue
  "#FFF7FB",  // cotton pink
  "#F3FFE6",  // lemon mist
  "#FFEFF5",  // strawberry cream
  "#E9FFFD",  // aqua milk
  "#FDF5FF",  // orchid tint
];

  return (
    
    <section className="homeCat">
      <div className="container">
        <h3 className='mb-3 hd '>Top Categories</h3>
       
       <div className="swiper-wrapper-container" style={{ position: "relative" }}>
          {/* Arrows */}
          <div
            className="arrow-prev"
            onClick={() => swiperRef.current?.slidePrev()}
          >
            < IoIosArrowRoundBack  /> 
          </div>
          <div
            className="arrow-next"
            onClick={() => swiperRef.current?.slideNext()}
          >
             <IoIosArrowRoundForward /> 
          </div>
            
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          slidesPerView={10}
          slidesPerGroup={3}
          spaceBetween={10}
          modules={[Navigation]}
         

        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <div
                className="items  cursor"
                style={{ background: colors[index % colors.length] }}
              >
                <img src={img} alt="cat" />
                <h6>Category</h6>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
          
      
      </div>
      </div>
    </section>
  );
};

export default HomeCat;
