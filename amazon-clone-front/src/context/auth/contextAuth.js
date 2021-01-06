import React, { createContext, useState, useEffect, useCallback } from "react";
import api from "../../services/api.js";
import axios from "axios";
const Context = createContext();
function AuthProvider({ children }) {
  const [authenticated, setauthenticated] = useState(null);
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (authenticated === true) {
      logout();
    } else {
      checkedLogin();
    }
    if (token) {
      axios.defaults.headers.Authorization = `Bearer ${token}`;
      setauthenticated(true);
    }
    // eslint-disable-next-line
  }, []);
  const checkedLogin = useCallback(async () => {
    const { token } = userData;
    await api
      .post("/validationToken", null, {
        headers: { token: token },
      })
      .then((res) => {
        setauthenticated(true);
      })
      .catch((err) => {
        setUserData(false);
      });
  }, [userData]);
  const logout = useCallback(() => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("token", "");
    setauthenticated(false);
  }, []);
  return (
    <Context.Provider
      value={{
        userData,
        setUserData,
        checkedLogin,
        authenticated,
        logout,
        setauthenticated,
      }}
    >
      {children}
    </Context.Provider>
  );
}
export { Context, AuthProvider };
