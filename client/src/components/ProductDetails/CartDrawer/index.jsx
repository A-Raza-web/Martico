import { FaTimes, FaTrash } from "react-icons/fa";
import { AiTwotoneDelete } from "react-icons/ai";
import Pro from "../../../assets/images/pro.jpg";
import Button from '@mui/material/Button';
import './CardDrawer.css';

const CartDrawer = ({ product, qty, onClose, onDelete }) => {

  const productImage = product?.images?.[0]?.url || Pro;
  const productName = product?.name || "Product";
  const productPrice = product?.price || 0;

  const total = (productPrice * qty).toFixed(2);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="cart-drawer p-4 d-flex flex-column" onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-4">
          <h5 className="fw-bold mb-0">Shopping Cart ({qty})</h5>

          <button className="btn-close-custom" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        {/* Cart Item */}
        <div className="cart-item-card d-flex align-items-center gap-3 mb-4">

          <img
            src={productImage}
            alt={productName}
            className="cart-img"
          />

          <div className="flex-grow-1">
            <h6 className="fw-bold small mb-1 ml-2">{productName}</h6>

            <p className="text-muted small mb-0 ml-2">
              Qty: {qty} × ${productPrice.toFixed(2)}
            </p>
          </div>

          <strong className="price">${total}</strong>

          {/* Delete Button */}
          <Button className="delete-cart-btn circle " onClick={onDelete}>
            <AiTwotoneDelete />
          </Button>

        </div>

        {/* Footer */}
        <div className="mt-auto border-top pt-4">

          <div className="d-flex justify-content-between fs-5 fw-bold mb-4">
            <span>Total</span>
            <span>${total}</span>
          </div>

          <Button className="btn-primary-1 w-100 py-3 mb-3">
            Check Out Now
          </Button>

          <Button
            className="btn-outline-secondary w-100 "
            onClick={onClose}
          >
            Back to Shop
          </Button>

        </div>

      </div>
    </div>
  );
};

export default CartDrawer;