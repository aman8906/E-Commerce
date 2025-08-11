import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast"; // ✅ Correct toast library

const Register = () => {
  const { setToken, setUser, backendUrl } = useContext(ShopContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const onRegister = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.error("All required fields must be filled");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${backendUrl}/api/user/register`, {
        name,
        email,
        password,
        phone,
        address,
      });

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("trendora_user", JSON.stringify(response.data.user));
        setToken(response.data.token);
        setUser(response.data.user);
        toast.success("🎉 Registered successfully!");
        navigate("/");
      } else {
        toast.error(response.data.message || "Registration failed");
      }
    } catch (err) {
      console.error("Registration Error:", err);
      const message =
        err.response?.data?.message || "Server error. Please try again later.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={onRegister}
      className="max-w-md mx-auto mt-20 px-6 py-8 border rounded shadow bg-white"
    >
      <h2 className="text-2xl font-semibold text-center mb-6">Create Account</h2>

      <input
        type="text"
        placeholder="Full Name *"
        className="w-full p-2 mb-4 border rounded"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        autoFocus
      />

      <input
        type="email"
        placeholder="Email *"
        className="w-full p-2 mb-4 border rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password (min. 8 characters) *"
        className="w-full p-2 mb-4 border rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Phone (optional)"
        className="w-full p-2 mb-4 border rounded"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <input
        type="text"
        placeholder="Address (optional)"
        className="w-full p-2 mb-4 border rounded"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-2 rounded transition ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-black text-white hover:bg-gray-800"
        }`}
      >
        {loading ? "Registering..." : "Register"}
      </button>

     <p className="text-sm text-center mt-4 text-gray-600">
  Already have an account?{" "}
  <Link
    to="/login"
    className="relative font-semibold text-blue-600 group"
  >
    <span className="relative z-10 group-hover:text-blue-800 transition-colors duration-300">
      Login
    </span>
    <span
      className="absolute left-0 bottom-0 w-0 h-[2px] bg-blue-600 group-hover:w-full transition-all duration-300"
    ></span>
  </Link>
</p>

    </form>
  );
};

export default Register;
