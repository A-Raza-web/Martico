import { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import { FaAngleDown, FaStar, FaRegStar } from "react-icons/fa6";
import { BiGridSmall, BiSolidGrid } from "react-icons/bi";
import { TfiLayoutGrid4Alt } from "react-icons/tfi";
import { IoIosMenu } from "react-icons/io";
import { IoMdHeartEmpty } from "react-icons/io";
import { RxExitFullScreen } from "react-icons/rx";

import pro from "../../assets/images/pro.jpg";
import "./content_right.css";
import ProductModel from '../ProductModel';



// Products (same as List1)
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
  }, {
    id: 4,
    name: "Trendy Shoes",
    desc: "Comfortable sneakers for men",
    img: pro,
    oldPrice: 89.99,
    newPrice: 59.99,
    rating: 3.5,
    inStock: true,
  }, {
    id: 5,
    name: "Trendy Shoes",
    desc: "Comfortable sneakers for men",
    img: pro,
    oldPrice: 89.99,
    newPrice: 59.99,
    rating: 3.5,
    inStock: true,
  }, {
    id: 6,
    name: "Trendy Shoes",
    desc: "Comfortable sneakers for men",
    img: pro,
    oldPrice: 89.99,
    newPrice: 59.99,
    rating: 3.5,
    inStock: true,
  }, {
    id: 7,
    name: "Trendy Shoes",
    desc: "Comfortable sneakers for men",
    img: pro,
    oldPrice: 89.99,
    newPrice: 59.99,
    rating: 3.5,
    inStock: true,
  }, {
    id: 8,
    name: "Trendy Shoes",
    desc: "Comfortable sneakers for men",
    img: pro,
    oldPrice: 89.99,
    newPrice: 59.99,
    rating: 3.5,
    inStock: true,
  }, {
    id: 9,
    name: "Trendy Shoes",
    desc: "Comfortable sneakers for men",
    img: pro,
    oldPrice: 89.99,
    newPrice: 59.99,
    rating: 3.5,
    inStock: true,
  }, {
    id: 10,
    name: "Trendy Shoes",
    desc: "Comfortable sneakers for men",
    img: pro,
    oldPrice: 89.99,
    newPrice: 59.99,
    rating: 3.5,
    inStock: true,
  }, {
    id: 11,
    name: "Trendy Shoes",
    desc: "Comfortable sneakers for men",
    img: pro,
    oldPrice: 89.99,
    newPrice: 59.99,
    rating: 3.5,
    inStock: true,
  }, {
    id: 12,
    name: "Trendy Shoes",
    desc: "Comfortable sneakers for men",
    img: pro,
    oldPrice: 89.99,
    newPrice: 59.99,
    rating: 3.5,
    inStock: true,
  }, {
    id: 13,
    name: "Trendy Shoes",
    desc: "Comfortable sneakers for men",
    img: pro,
    oldPrice: 89.99,
    newPrice: 59.99,
    rating: 3.5,
    inStock: true,
  }, {
    id: 14,
    name: "Trendy Shoes",
    desc: "Comfortable sneakers for men",
    img: pro,
    oldPrice: 89.99,
    newPrice: 59.99,
    rating: 3.5,
    inStock: true,
  }, {
    id: 15,
    name: "Trendy Shoes",
    desc: "Comfortable sneakers for men",
    img: pro,
    oldPrice: 89.99,
    newPrice: 59.99,
    rating: 3.5,
    inStock: true,
  }, {
    id: 16,
    name: "Trendy Shoes",
    desc: "Comfortable sneakers for men",
    img: pro,
    oldPrice: 89.99,
    newPrice: 59.99,
    rating: 3.5,
    inStock: true,
  }, {
    id: 17,
    name: "Trendy Shoes",
    desc: "Comfortable sneakers for men",
    img: pro,
    oldPrice: 89.99,
    newPrice: 59.99,
    rating: 3.5,
    inStock: true,
  }, {
    id: 18,
    name: "Trendy Shoes",
    desc: "Comfortable sneakers for men",
    img: pro,
    oldPrice: 89.99,
    newPrice: 59.99,
    rating: 3.5,
    inStock: true,
  }, {
    id: 19,
    name: "Trendy Shoes",
    desc: "Comfortable sneakers for men",
    img: pro,
    oldPrice: 89.99,
    newPrice: 59.99,
    rating: 3.5,
    inStock: true,
  }, {
    id: 20,
    name: "Trendy Shoes",
    desc: "Comfortable sneakers for men",
    img: pro,
    oldPrice: 89.99,
    newPrice: 59.99,
    rating: 3.5,
    inStock: true,
  }, {
    id: 21,
    name: "Trendy Shoes",
    desc: "Comfortable sneakers for men",
    img: pro,
    oldPrice: 89.99,
    newPrice: 59.99,
    rating: 3.5,
    inStock: true,
  }, {
    id: 22,
    name: "Trendy Shoes",
    desc: "Comfortable sneakers for men",
    img: pro,
    oldPrice: 89.99,
    newPrice: 59.99,
    rating: 3.5,
    inStock: true,
  }, {
    id: 23,
    name: "Trendy Shoes",
    desc: "Comfortable sneakers for men",
    img: pro,
    oldPrice: 89.99,
    newPrice: 59.99,
    rating: 3.5,
    inStock: true,
  }, {
    id: 24,
    name: "Trendy Shoes",
    desc: "Comfortable sneakers for men",
    img: pro,
    oldPrice: 89.99,
    newPrice: 59.99,
    rating: 3.5,
    inStock: true,
  }, {
    id: 25,
    name: "Trendy Shoes",
    desc: "Comfortable sneakers for men",
    img: pro,
    oldPrice: 89.99,
    newPrice: 59.99,
    rating: 3.5,
    inStock: true,
  }, {
    id: 26,
    name: "Trendy Shoes",
    desc: "Comfortable sneakers for men",
    img: pro,
    oldPrice: 89.99,
    newPrice: 59.99,
    rating: 3.5,
    inStock: true,
  }, {
    id: 27,
    name: "Trendy Shoes",
    desc: "Comfortable sneakers for men",
    img: pro,
    oldPrice: 89.99,
    newPrice: 59.99,
    rating: 3.5,
    inStock: true,
  }, {
    id: 28,
    name: "Trendy Shoes",
    desc: "Comfortable sneakers for men",
    img: pro,
    oldPrice: 89.99,
    newPrice: 59.99,
    rating: 3.5,
    inStock: true,
  }, {
    id: 29,
    name: "Trendy Shoes",
    desc: "Comfortable sneakers for men",
    img: pro,
    oldPrice: 89.99,
    newPrice: 59.99,
    rating: 3.5,
    inStock: true,
  }, {
    id: 30,
    name: "Trendy Shoes",
    desc: "Comfortable sneakers for men",
    img: pro,
    oldPrice: 89.99,
    newPrice: 59.99,
    rating: 3.5,
    inStock: true,
  },
];

//  Rating stars
const renderStars = (rating) => {
  const stars = [];
  const full = Math.floor(rating);
  const half = rating % 1 !== 0;

  for (let i = 0; i < 5; i++) {
    if (i < full) stars.push(<FaStar key={i} className="text-warning" />);
    else if (i === full && half)
      stars.push(<FaStar key={i} className="text-warning opacity-50" />);
    else stars.push(<FaRegStar key={i} className="text-muted" />);
  }
  return stars;
};

// 💲 Discount
const discountPercent = (oldP, newP) =>
  Math.round(((oldP - newP) / oldP) * 100);

const ContentRight = () => {
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
  const [anchorEl, setAnchorEl] = useState(null);
  const [showCount, setShowCount] = useState(10);
  const [view, setView] = useState("grid-3");

  const open = Boolean(anchorEl);

  return (
    <div className="content_right">
      {/* Toolbar */}
      <div className="showBy mt-3 mb-3 d-flex align-items-center">

        <div className="d-flex align-items-center btnWapper">
          <Button onClick={() => setView("list")} className={view === "list" ? "active" : ""}>
            <IoIosMenu />
          </Button>
          <Button onClick={() => setView("grid-2")} className={view === "grid-2" ? "active" : ""}>
            <BiGridSmall />
          </Button>
          <Button onClick={() => setView("grid-3")} className={view === "grid-3" ? "active" : ""}>
            <BiSolidGrid />
          </Button>
          <Button onClick={() => setView("grid-4")} className={view === "grid-4" ? "active" : ""}>
            <TfiLayoutGrid4Alt />
          </Button>
        </div>

        <div className="ml-auto showByFilter">
          <Button className="showBtn" onClick={(e) => setAnchorEl(e.currentTarget)} >
            Show {showCount}
            <FaAngleDown />
          </Button>

          <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
            <MenuItem onClick={() => { setShowCount(10); setAnchorEl(null); }}>Show 10</MenuItem>
            <MenuItem onClick={() => { setShowCount(20); setAnchorEl(null); }}>Show 20</MenuItem>
            <MenuItem onClick={() => { setShowCount(30); setAnchorEl(null); }}>Show 30</MenuItem>
          </Menu>
        </div>
      </div>

      {/* Products */}
      <div className={`productListing ${view}`}>
        {products.slice(0, showCount).map((item) => (
          <div className="productCard shadow-sm rounded-lg" key={item.id}>
            <div className="imgWrapper position-relative overflow-hidden">
              <img src={item.img} alt={item.name} className="img-fluid w-100" />

              <span className="discountBadge">
                {discountPercent(item.oldPrice, item.newPrice)}% OFF
              </span>

              <div className="imageIcons">
                <span className="iconBox" onClick={() => handleOpenModal(item)}><RxExitFullScreen /></span>
                <span className="iconBox"><IoMdHeartEmpty /></span>
              </div>
            </div>

            <div className="card-body text-start px-3">
              <h6 className="fw-bold mb-1">{item.name}</h6>
              <p className="text-muted small mb-1">{item.desc}</p>

              <div className={`stockStatus ${item.inStock ? "inStock" : "outStock"}`}>
                {item.inStock ? "In Stock" : "Out of Stock"}
              </div>

              <div className="rating mb-2">
                {renderStars(item.rating)}
              </div>

              <div className="priceBox">
                <span className="oldPrice">${item.oldPrice}</span>
                <span className="newPrice ms-2">${item.newPrice}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ProductModel
        open={openModal}
        onClose={handleCloseModal}
        product={selectedProduct}
      />

    </div>
  );
};

export default ContentRight;
