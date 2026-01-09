import { FaTimes } from "react-icons/fa";
import Pro from "../../../assets/images/pro.jpg";
import Button from '@mui/material/Button';

const CartDrawer = ({ qty, onClose }) => {
  const total = (12.99 * qty).toFixed(2);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="cart-drawer p-4" onClick={(e) => e.stopPropagation()}>
        
        <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-4">
          <h5 className="fw-bold mb-0">Shopping Cart ({qty})</h5>
          <button className="btn-close-custom" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <div className="cart-item-card d-flex gap-3 mb-4 align-items-center">
          <img src={Pro} alt="Product" width="70" height="70" className="rounded-3 border" />
          <div className="flex-grow-1">
            <h6 className="fw-bold small mb-0">Chicken Meatballs</h6>
            <p className="text-muted small mb-0">
              Qty: {qty} × $12.99
            </p>
          </div>
          <strong>${total}</strong>
        </div>

        <div className="mt-auto border-top pt-4">
          <div className="d-flex justify-content-between fs-5 fw-bold mb-4">
            <span>Total</span>
            <span>${total}</span>
          </div>

          <Button className="btn btn-primary-1 w-100 py-3 mb-3">
            Check Out Now
          </Button>

          <Button
            className="btn-1 btn-outline-secondary w-100"
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
