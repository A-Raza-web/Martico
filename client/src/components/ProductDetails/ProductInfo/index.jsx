import {
  FaStar,
  FaShoppingCart,
  FaHeart,
  FaMinus,
  FaPlus
} from "react-icons/fa";
import Pro from "../../../assets/images/pro.jpg";
import Button from '@mui/material/Button';


const ProductInfo = ({ qty, setQty, onAddToCart }) => {
  return (
    <section className="product-details-section py-5">
      <div className="container">
        <div className="row bg-white p-4 rounded-4   align-items-center">

          {/* IMAGE */}
          <div className="col-md-6 mb-4 mb-md-0">
            <div className="product-img-wrapper overflow-hidden rounded-4 border shadow-sm">
              <img
                src={Pro}
                alt="Product"
                className="img-fluid w-100 h-100 object-fit-cover transition-zoom"
              />
            </div>
          </div>

          {/* INFO */}
          <div className="col-md-6 ">
            
            <h1 className="fw-bold mb-2 ">
              All Natural Italian-style Chicken Meatballs
            </h1>
            <div className="mb-3">
              <span className="badge bg-soft-success me-2">In Stock</span>
              <span className="text-muted small ml-2">SKU: MB-001</span>
            </div>

            <div className="d-flex align-items-center gap-3 mb-3">
              <div className="text-warning small ml-1">
                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
              </div>
              <span className="text-muted small border-start ps-3 ml-2 mt-1">
                23 Reviews
              </span>
            </div>

            <div className="d-flex align-items-center gap-3 mb-4">
              <h2 className="price-tag fw-bold mb-0">$12.99</h2>
              <del className="text-muted ml-3">$15.99</del>
              <span className="badge1  ml-2">Save 20%</span>
            </div>

            <p className="text-muted mb-4">
              Premium quality Italian-style chicken meatballs made with
              all-natural ingredients.
            </p>

            {/* QTY + BUTTONS */}
            <div className="d-flex flex-wrap align-items-center gap-4 mb-4">
              <div className="qty-selector d-flex align-items-center gap-2">
                <Button
                  className="qty-btn minus"
                  disabled={qty === 1}
                  onClick={() => setQty(qty - 1)}
                >
                  <FaMinus size={13} />
                </Button>

                <span className="qty-number fw-bold">
                  {qty}
                </span>

                <Button
                  className="qty-btn plus"
                  onClick={() => setQty(qty + 1)}
                >
                  <FaPlus size={13} />
                </Button>
              </div>

              <div className="d-flex flex-grow-1 p-3">
                <Button
                  className="btn btn-primary  ml-2 mt-2 btn-lg flex-grow-1 d-flex  justify-content-center"
                  onClick={onAddToCart}
                >
                  <FaShoppingCart /> 
                  <span className="ml-2">Add to Cart </span> 
                </Button>
                <Button className="btn btn-outline-danger ml-4  btn-lg">
                  <FaHeart />
                </Button>  
                
              </div>
               
            </div>

            <hr />
            <p className="small text-muted mb-0">
              Category: <strong>Frozen Foods</strong>
            </p>
          </div>

        </div>
      </div>
      

    </section>
  );
};

export default ProductInfo;
