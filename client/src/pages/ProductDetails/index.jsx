import { useState } from "react";
import ProductInfo from "../../components/ProductDetails/ProductInfo";
import CartDrawer from "../../components/ProductDetails/CartDrawer";
import ReviewSection from "../../components/ProductDetails/ReviewSection";
import Reatedproduct from "../../components/ProductDetails/Reatedproduct"
import "./ProductDetails.css";

const ProductDetails = () => {
  const [qty, setQty] = useState(1);
  const [showCart, setShowCart] = useState(false);

  return (
    <>
      <ProductInfo
        qty={qty}
        setQty={setQty}
        onAddToCart={() => setShowCart(true)}
      />

      {showCart && (
        <CartDrawer
          qty={qty}
          onClose={() => setShowCart(false)}
        />
      )}
       
       <ReviewSection />  
       <Reatedproduct />
    </>
  );
};

export default ProductDetails;
