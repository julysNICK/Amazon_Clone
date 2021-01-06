import React from "react";
import "./CheckoutProduct.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useStateValue } from "../../redux/StateProvider";
function CheckoutProduct({ id, image, title, price, rating }) {
  const [, dispatch] = useStateValue();

  const removeFromBasket = () => {
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: id,
    });
  };
  const notifyRemoved = () => {
    return toast.success(`${title} successfully removed from cart`, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };
  return (
    <div className="checkoutproduct">
      <img className="checkoutproduct_image" src={image} alt="" />

      <div className="checkoutproduct_info">
        <p className="checkoutproduct_title"></p>
        <p className="checkoutproduct_price">
          <small>R$</small>
          <strong>{price}</strong>
        </p>
        <div className="checkoutproduct_rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>🌟</p>
            ))}
        </div>
        <button
          onClick={() => {
            notifyRemoved();
            removeFromBasket();
          }}
        >
          Remove from Basket
        </button>
        <ToastContainer />
      </div>
    </div>
  );
}

export default CheckoutProduct;
