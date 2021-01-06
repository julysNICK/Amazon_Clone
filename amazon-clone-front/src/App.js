import React, { useContext } from "react";
import { Context } from "./context/auth/contextAuth.js";
import "./App.css";
import { AuthProvider } from "./context/auth/contextAuth.js";
import Header from "./components/Header/Header.js";
import Searchproduct from "./components/searchProduct/Searchproduct.js";
import Checkout from "./components/Checkout/Checkout.js";
import Login from "./components/Login/Login.js";
import Home from "./components/Home/Home.js";
import Payment from "./components/Payment/Payment.js";
import Register from "./components/Register/Register.js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
function CustomRoute({ isPrivate, ...rest }) {
  const { authenticated } = useContext(Context);
  if (isPrivate && !authenticated) {
    return <Redirect to="/login" />;
  }
  return <Route {...rest} />;
}
const promissse = loadStripe(
  "pk_test_51I4UADIIUzVP06xR5iky9C8WGYLBzjiGqhhIw6mg9EkXkDsmnb377RUu4ODT8DbJ1WwnJGsI6fBO9E7zlJI2qW4I00knXa0GT5"
);

function App(props) {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Header />
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/checkout">
              <Checkout />
            </Route>
            <CustomRoute isPrivate path="/payment">
              <Elements stripe={promissse}>
                <Payment />
              </Elements>
            </CustomRoute>
            <Route exact path="/searchProduct/search=:search">
              <Searchproduct />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
