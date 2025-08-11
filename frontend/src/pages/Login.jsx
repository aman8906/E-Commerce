import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const { setToken, setUser, backendUrl } = useContext(ShopContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      console.log("Sending login request:", { email, password, backendUrl });

      const response = await axios.post(
        `${backendUrl}/api/user/login`,
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem(
          "trendora_user",
          JSON.stringify(response.data.user)
        );
        setToken(response.data.token);
        setUser(response.data.user);
        toast.success("Login successful");
        navigate("/");
      } else {
        toast.error(response.data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <form
      onSubmit={onLogin}
      className="max-w-md mx-auto mt-20 px-4 py-6 border shadow"
    >
      <h2 className="text-2xl mb-4 font-bold text-center">Login</h2>

      <input
        type="email"
        placeholder="Email"
        className="w-full p-2 mb-4 border"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full p-2 mb-4 border"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button type="submit" className="w-full bg-black text-white py-2">
        Login
      </button>

      <p className="text-sm text-center mt-6 text-gray-600">
        Don’t have an account?{" "}
        <a
          href="/register"
          className="relative font-semibold text-blue-600 group"
        >
          <span className="relative z-10 group-hover:text-blue-800 transition-colors duration-300">
            Create Account
          </span>
          <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-blue-600 group-hover:w-full transition-all duration-300"></span>
        </a>
      </p>
    </form>
  );
};

export default Login;
