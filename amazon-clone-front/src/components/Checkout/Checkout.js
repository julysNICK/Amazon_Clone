import React from "react";
import { Link } from "react-router-dom";
import Subtotal from "../Subtotal/Subtotal";
import "./Checkout.css";
import { useStateValue } from "../../redux/StateProvider";
import CheckoutProduct from "../CheckoutProduct/CheckoutProduct";
function Checkout() {
  const [{ basket }] = useStateValue();
  return (
    <div className="checkout">
      <div className="checkout_left">
        <Link to="/">
          <img
            className="checkout_add"
            src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
            alt=""
          />
        </Link>
        <div>
          <h2 className="checkout_title">Your shopping Basket</h2>
          {basket.map((item) => (
            <CheckoutProduct
              id={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
              rating={item.rating}
            />
          ))}
        </div>
      </div>
      <div className="checkout_right">
        <Subtotal />
      </div>
    </div>
  );
}

export default Checkout;
