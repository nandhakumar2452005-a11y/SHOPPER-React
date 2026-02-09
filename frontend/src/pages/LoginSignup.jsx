import { useState } from "react";
import axios from "axios";
import "./CSS/LoginSignup.css";

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const [agree, setAgree] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");

    if (!agree) {
      setMessage("Please accept terms & conditions ❗");
      return;
    }

    const url = isLogin
      ? "http://localhost:8080/login-signup/login"
      : "http://localhost:8080/login-signup/signup";

    axios
      .post(url, loginData)
      .then((res) => {
        setMessage(res.data.message);

        if (isLogin) {
          // Store username in localStorage for checkout
          localStorage.setItem("username", loginData.username);
          //  login success redirect
          setTimeout(() => {
            window.location.href = "/";
          }, 1000);
        }
      })
      .catch((err) => {
        if (err.response) {
          setMessage(err.response.data.message);
        } else {
          setMessage("Server error occurred. Please try again later.");
        }
      });
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{isLogin ? "Login" : "Sign Up"}</h1>

        <form onSubmit={handleSubmit}>
          <div className="loginsignup-fields">
            <input
              type="email"
              name="username"
              placeholder="Email"
              value={loginData.username}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={loginData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" disabled={!agree}>
            Continue
          </button>

          {message && <p>{message}</p>}

          <p className="loginsignup-login">
            {isLogin ? (
              <>
                New user?{" "}
                <span onClick={() => setIsLogin(false)}>Sign up here</span>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <span onClick={() => setIsLogin(true)}>Login here</span>
              </>
            )}
          </p>

          <div className="loginsignup-agree">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
            />
            <p>By continuing, i agree to the terms of use & privacy policy.</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginSignup;
