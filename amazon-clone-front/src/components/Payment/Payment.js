import React, { useContext } from "react";
import { useStateValue } from "../../redux/StateProvider";
import CheckoutProduct from "../CheckoutProduct/CheckoutProduct.js";
import "./Payment.css";
import { Context } from "../../context/auth/contextAuth.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { CardElement } from "@stripe/react-stripe-js";
function Payment() {
  const [{ basket }] = useStateValue();
  const { userData } = useContext(Context);
 
  const payment = () => {
    return toast.success(`successful payment`, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };
  return (
    <div className="payment">
      <div className="payment_container">
        <h1>Checkout {<Link to="/checkout">({basket?.length} item)</Link>}</h1>
        <div className="payment_section">
          <div className="payment_title">
            <h3>Endereço de entrega</h3>
          </div>
          <div className="payment_address">
            <h5>E-mail</h5>
            <p>{userData.user}</p>
            <h5>Endereço de entrega</h5>
            <input type="text" name="" id="" />
            <h5>CEP</h5>
            <input type="text" name="" id="" />
          </div>
        </div>
        <div className="payment_section">
          <div className="payment_title">
            <h3>Rever itens e entrega</h3>
          </div>
          <div className="payment_items">
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
        <div className="payment_section">
          <div className="payment_title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment_detail">
            <form>
              <CardElement />
            </form>
            <button onClick={payment}> buy now </button>
            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
