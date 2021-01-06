import React, { useState, useEffect } from "react";
import "./Register.css";
import { Link, useHistory } from "react-router-dom";
import api from "../../services/api.js";
function Register() {
  const history = useHistory();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [error, setError] = useState(true);
  useEffect(() => {
    const verifyError = error;
    if (verifyError === false) {
      history.push("/login");
    }
  }, [error,history]);
  async function handleRegister(e) {
    e.preventDefault();
    await api
      .post("/users/register", {
        name_user: name,
        email: email,
        password: password,
        confirmPassword: confirmpassword,
      })
      .then((res) => {
        setError(false);
      })
      .catch((error) => {
        if (error.response.status === 400) {
          setError(true);
        }
      });
  }

  const register = (e) => {
    e.preventDefault();
  };

  return (
    <div className="register">
      <Link to="/">
        <img
          className="register_logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1280px-Amazon_logo.svg.png"
          alt=""
        />
      </Link>

      <div className="register_container">
        <h1>Create your count</h1>
        <form onSubmit={handleRegister}>
          <h5>Name</h5>
          <input
            type="text"
            name=""
            id=""
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

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

          <h5>Confirm password</h5>
          <input
            type="password"
            name=""
            id=""
            value={confirmpassword}
            onChange={(e) => setConfirmpassword(e.target.value)}
          />

          {
            <button type="submit" className="register_signInButton">
              Sign in
            </button>
          }
        </form>
        <p>AMAZON FAKE CLONE inclui benefícios do Prime Gaming.</p>

        <button onClick={register} className="registerButton">
          <Link to="/login">Log in</Link>
        </button>
      </div>
    </div>
  );
}

export default Register;
