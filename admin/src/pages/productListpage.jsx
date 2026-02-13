import { useParams, useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import StarIcon from '@mui/icons-material/Star';
import Button from '@mui/material/Button';
import './ProductList.css'; // I will create this file for specific styles

const ProductList = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  // Enriched Dummy Products Data with Multiple Images Support
  const allProducts = {
    1: [
      {
        id: 101, name: "Premium Red T-Shirt", brand: "Martico", price: "20.00", stock: 12, rating: 4.5, number: "TS-001", description: "High-quality cotton t-shirt with a premium feel.", inFeatured: true, image: [
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80",
          "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&q=80",
          "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400&q=80"
        ]
      },
      { id: 102, name: "Casual Black T-Shirt", brand: "Classic", price: "30.00", stock: 45, rating: 4.0, number: "TS-002", description: "Comfortable black t-shirt for daily wear.", inFeatured: false, image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400&q=80" },
      { id: 103, name: "White Polo Shirt", brand: "Polo", price: "25.00", stock: 0, rating: 3.8, number: "TS-003", description: "Classic white polo shirt with breathable fabric.", inFeatured: true, image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=400&q=80" },
    ],
    2: [
      {
        id: 201, name: "Classic Blue Jeans", brand: "Denim Co", price: "60.00", stock: 24, rating: 4.7, number: "JN-001", description: "Durable blue jeans with a classic fit.", inFeatured: true, image: [
          "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&q=80",
          "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&q=80"
        ]
      },
      { id: 202, name: "Slim Fit Dark Jeans", brand: "Urban", price: "75.00", stock: 15, rating: 4.2, number: "JN-002", description: "Stylish dark jeans with a modern slim fit.", inFeatured: false, image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&q=80" },
    ],
    3: [
      { id: 301, name: "Winter Arctic Jacket", brand: "NorthFace", price: "150.00", stock: 8, rating: 4.9, number: "JK-101", description: "Heavy-duty winter jacket for extreme cold.", inFeatured: true, image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&q=80" },
    ],
    4: [
      {
        id: 401, name: "Ultra Sports Shoes", brand: "Nike", price: "90.00", stock: 20, rating: 4.6, number: "SH-501", description: "Performance sports shoes with advanced cushioning.", inFeatured: true, image: [
          "https://images.unsplash.com/photo-1542291026-7eec264c2744?w=400&q=80",
          "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400&q=80"
        ]
      },
    ],
  };

  const products = id
    ? (allProducts[id] || [])
    : Object.values(allProducts).flat();

  const categoryName = id
    ? (["", "T-Shirts", "Jeans", "Jackets", "Shoes"][id] || "Category")
    : "All Products";

  return (
    <div className="product-list-container">
      <header className="page-header">
        <div className="header-top">
          <div className="header-left">
            <Button onClick={() => navigate('/products')} className="back-btn">
              <ArrowBackIcon sx={{ fontSize: 24 }} />
            </Button>
            <div className="title-group">
              <span className="product-count">{products.length} Products Available</span>
              <h2>{categoryName}</h2>
            </div>
          </div>
        </div>

        <div className="search-filter-row">
          <div className="modern-search-wrapper">
            <input
              type="text"
              className="modern-search-input"
              placeholder={`Search in ${categoryName}...`}
            />
            <SearchIcon className="search-icon-btn" />
          </div>
        </div>
      </header>

      <div className="product-grid">
        {products.length === 0 ? (
          <div className="card no-products-aura">
            <p>No products reflect your selection yet.</p>
          </div>
        ) : (
          products.map((item) => (
            <div key={item.id} className="card product-card-v2" onMouseMove={handleMouseMove}>
              <div className="product-image-wrapper">
                {(Array.isArray(item.image) ? item.image : [item.image]).map((img, idx) => (
                  <div key={idx} className="product-img-container">
                    <img src={img} alt={`${item.name} ${idx}`} className="product-img" />
                    {idx === 0 && (
                      <>
                        <div className={`glass-badge ${item.stock > 0 ? 'in-stock-badge' : 'out-of-stock-badge'}`}>
                          {item.stock > 0 ? `${item.stock} IN STOCK` : 'SOLD OUT'}
                        </div>
                        {item.inFeatured && <div className="glass-badge featured-aura">FEATURED</div>}
                      </>
                    )}
                  </div>
                ))}
              </div>

              <div className="product-info">
                <div className="main-details">
                  <div className="brand-sku-tag">
                    <span className="brand-pill">{item.brand}</span>
                    <span className="sku-id">#{item.number}</span>
                  </div>
                  <h4 className="product-name">{item.name}</h4>
                  <p className="product-desc">{item.description}</p>
                </div>

                <footer className="meta-footer">
                  <div className="rating-column">
                    <StarIcon sx={{ fontSize: 18, color: '#f59e0b' }} />
                    <span className="rating-val">{item.rating}</span>
                  </div>

                  <div className="price-box">
                    <span className="label">PRICE</span>
                    <span className="product-price">€{item.price}</span>
                  </div>

                  <div className="action-btns">
                    <Button className="btn-ultra btn-primary-ultra">Edit</Button>
                    <Button className="btn-ultra btn-danger-ultra">Delete</Button>
                  </div>
                </footer>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductList;
