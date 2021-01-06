import React, {  useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { useStateValue } from "../../redux/StateProvider";

import { Context } from "../../context/auth/contextAuth.js";

function Header(props) {
  const { authenticated,logout } = useContext(Context);
  const [search, setsearch] = useState("");
  const [{ basket }] = useStateValue();
  return (
    <div className="header">
      <Link to="/">
        <img
          className="header_logo"
          src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt=""
        />
      </Link>

      <div className="header_search">
        <input
          className="header_searchInput"
          name="search"
          type="text"
          id="search"
          onChange={(e) => setsearch(e.target.value)}
        />
        <Link to={`/searchProduct/search=${search}`}>
          <SearchIcon className="header_searchIcon" type="submit" />
        </Link>
      </div>
      <div className="header_nav">
        <Link to="/login">
          <div className="header_option">
            <span className="header_optionLineOne">hello, guess</span>
            {authenticated ? (
              <span className="header_optionLineTwo" onClick={logout}>
                Logout
              </span>
            ) : (
              <span className="header_optionLineTwo">Sign In</span>
            )}
          </div>
        </Link>
        <div className="header_option">
          <span className="header_optionLineOne">Returns</span>
          <span className="header_optionLineTwo">Orders</span>
        </div>
        <div className="header_option">
          <span className="header_optionLineOne">your</span>
          <span className="header_optionLineTwo">Prime</span>
        </div>

        <Link to="/Checkout">
          <div className="header_optionBasket">
            <ShoppingBasketIcon />
            <span className="header_optionLineTwo header_basketCount">
              {basket?.length}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}
export default Header;
