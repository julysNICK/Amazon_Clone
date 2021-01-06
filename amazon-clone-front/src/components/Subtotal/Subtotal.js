import React from "react";
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "../../redux/reducer";
import { useStateValue } from "../../redux/StateProvider";
import { useHistory } from "react-router-dom";
function Subtotal() {
  const history = useHistory();
  const [{ basket }] = useStateValue();
  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal( {basket.length} items):
              <strong>{value}</strong>
            </p>
            <small className="subtotal_gift">
              <input type="checkbox" /> This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"R$"}
      />
      <button onClick={(e) => history.push("/payment")}>
        Proced to Checkout
      </button>
    </div>
  );
}

export default Subtotal;
