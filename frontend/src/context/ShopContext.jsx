import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { assets, products as localProducts } from "../assets/products";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const currency = "$";
  const delivery_fee = 10;

  // ✅ Load cart from localStorage safely
  useEffect(() => {
    try {
      const storedCartItems = JSON.parse(localStorage.getItem("cartItems") || "{}");
      setCartItems(storedCartItems);
    } catch (error) {
      console.error("❌ Invalid cartItems in localStorage:", error.message);
    }
  }, []);

  // ✅ Save cart to localStorage
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // ✅ Load products
  useEffect(() => {
    setProducts(localProducts);
    console.log("✅ Products loaded:", localProducts);
  }, []);

  // ✅ Load token + user from localStorage
  useEffect(() => {
    if (!token) {
      const localToken = localStorage.getItem("token");
      const userData = localStorage.getItem("trendora_user");

      if (localToken) {
        setToken(localToken);
        if (userData) {
          try {
            setUser(JSON.parse(userData));
          } catch {
            setUser(null);
            console.error("❌ Invalid user data in localStorage");
          }
        }
        getUserCart(localToken);
      }
    }
  }, [token]);

  // ✅ Fetch cart from backend
  const getUserCart = async (token) => {
    try {
      const response = await fetch(`${backendUrl}/api/cart/get`, {
        method: "POST",
        headers: { "Content-Type": "application/json", token },
      });
      const data = await response.json();
      if (data.success) setCartItems(data.cartData);
    } catch (error) {
      console.error("❌ Cart fetch error:", error.message);
    }
  };

  // ✅ Add item to cart
  const addToCart = async (itemId, size) => {
    if (!size) return toast.error("Please Select a Size");
    toast.success("Item Added To The Cart");

    const cartCopy = structuredClone(cartItems);
    cartCopy[itemId] = cartCopy[itemId] || {};
    cartCopy[itemId][size] = (cartCopy[itemId][size] || 0) + 1;
    setCartItems(cartCopy);

    if (token) {
      try {
        await fetch(`${backendUrl}/api/cart/add`, {
          method: "POST",
          headers: { "Content-Type": "application/json", token },
          body: JSON.stringify({ itemId, size }),
        });
      } catch (error) {
        console.error("❌ Add to Cart Error:", error.message);
        toast.error(error.message);
      }
    }
  };

  // ✅ Update cart item quantity
  const updateQuantity = async (itemId, size, quantity) => {
    if (quantity === 0) toast.success("Item Removed From The Cart");

    const cartCopy = structuredClone(cartItems);
    cartCopy[itemId][size] = quantity;
    setCartItems(cartCopy);

    if (token) {
      try {
        await fetch(`${backendUrl}/api/cart/update`, {
          method: "POST",
          headers: { "Content-Type": "application/json", token },
          body: JSON.stringify({ itemId, size, quantity }),
        });
      } catch (error) {
        console.error("❌ Update Cart Error:", error.message);
        toast.error(error.message);
      }
    }
  };

  // ✅ Cart item count
  const getCartCount = () => {
    let count = 0;
    for (const item in cartItems) {
      for (const size in cartItems[item]) {
        count += cartItems[item][size];
      }
    }
    return count;
  };

  // ✅ Cart total amount
  const getCartAmount = () => {
    let amount = 0;
    for (const item in cartItems) {
      const product = products.find((p) => p._id === item);
      if (!product) continue;
      for (const size in cartItems[item]) {
        amount += product.price * cartItems[item][size];
      }
    }
    return amount;
  };

  // ✅ Provide values via context
  const value = {
    user,
    setUser,
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    addToCart,
    updateQuantity,
    getCartCount,
    getCartAmount,
    navigate,
    backendUrl,
    token,
    setToken,
    assets,
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
