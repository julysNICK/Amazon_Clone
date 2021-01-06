import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Product.css";
import { useStateValue } from "../../redux/StateProvider";
function Product({ id, title, image, price, rating }) {
  const [, dispatch] = useStateValue();
  const Addtobasket = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    });
  };
  const notifyAdd = () => {
    return toast.success(`${title} successfully added to cart`, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };
  return (
    <div className="product">
      <div className="product_info">
        <p>{title}</p>
        <p className="product_price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="product_rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>🌟</p>
            ))}
        </div>
      </div>
      <img src={image} alt="" />
      <button
        onClick={() => {
          notifyAdd();
          Addtobasket();
        }}
      >
        Add to Basket
      </button>
      <ToastContainer />
    </div>
  );
}

export default Product;
