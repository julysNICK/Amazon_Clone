import React, { useState, useContext, useEffect } from "react";
import "./Login.css";
import { Context } from "../../context/auth/contextAuth.js";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../services/api.js";
function Login() {
  const {
    checkedLogin,
    authenticated,
    setUserData,
    setauthenticated,
  } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorr, seterrorr] = useState("");
  const [existerror, setexisterror] = useState(null);
  async function handleLogin(e) {
    if (e) e.preventDefault();
    await api
      .post("/users/login", {
        email,
        password,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        api.defaults.headers.Authorization = `Bearer ${res.data.token}`;
        
        setUserData({
          token: res.data.token,
          user: res.data.user.email,
        });

        setauthenticated(true);
        setexisterror(false);
      })
      .catch((error) => {
        setexisterror(true);
        seterrorr(error.response.data);
      });
  }
  function notifySucess() {
    if (authenticated === true) {
      return toast.success("successfully logged in", {
        position: toast.POSITION.TOP_LEFT,
      });
    }
  }
  useEffect(() => {
    function notifyError() {
      if (existerror) {
        return (
          toast.error(errorr, { position: toast.POSITION.TOP_LEFT }),
          seterrorr(true)
        );
      } else {
        return checkedLogin, notifySucess(), seterrorr(false);
      }
    }
    notifyError();
    // eslint-disable-next-line
  }, [errorr]);

  return (
    <div className="login">
      <Link to="/">
        <img
          className="login_logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1280px-Amazon_logo.svg.png"
          alt=""
        />
      </Link>

      <div className="login_container">
        <h1>Sign-in</h1>
        <form onSubmit={handleLogin} method="post">
          <h5>E-mail</h5>
          <input
            type="text"
            name=""
            id=""
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h5>PASSWORD</h5>
          <input
            type="password"
            name=""
            id=""
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="login_signInButton"
            onClick={notifySucess}
          >
            Sign in
          </button>
          <ToastContainer />
        </form>
        <p>AMAZON FAKE CLONE inclui benefícios do Prime Gaming.</p>

        <button onClick={"oi"} className="login_registerButton">
          <Link to="/register">Create your Amazon clone count</Link>
        </button>
      </div>
    </div>
  );
}

export default Login;
