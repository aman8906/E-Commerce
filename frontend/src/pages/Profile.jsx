import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("trendora_user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setPhone(parsedUser.phone || "");
        setAddress(parsedUser.address || "");
      } catch {
        localStorage.removeItem("trendora_user");
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("trendora_user");
    navigate("/login");
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/update`,
        { phone, address },
        { headers: { authorization: `Bearer ${token}` } } // ✅ recommended pattern
      );

      if (response.data.success) {
        const updatedUser = { ...user, phone, address };
        setUser(updatedUser);
        localStorage.setItem("trendora_user", JSON.stringify(updatedUser));
        setEditMode(false);
        toast.success("Profile updated successfully!");
      } else {
        toast.error(response.data.message || "Update failed");
      }
    } catch (error) {
      console.error("Update Error:", error.message);
      toast.error("Error updating profile");
    }
  };

  if (!user) {
    return (
      <div className="text-center mt-20 text-gray-600 text-sm sm:text-base">
        Please log in to view your profile.
      </div>
    );
  }

  return (
    <main className="px-4 sm:px-6 py-10 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 items-start border rounded-md p-6 shadow bg-white">
        {/* Left Avatar */}
        <div className="w-full sm:w-1/3 text-center">
          <FaUserCircle className="text-7xl text-gray-400 mx-auto" />
          <p className="text-sm mt-2 text-gray-500 break-all">
            User ID: {user._id || "N/A"}
          </p>
        </div>

        {/* Right Info */}
        <div className="w-full sm:w-2/3">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">👤 My Profile</h2>
          <div className="grid grid-cols-1 gap-4 text-gray-700 text-sm">
            <p><b>Name:</b> {user.name}</p>
            <p><b>Email:</b> {user.email}</p>
            <div>
              <b>Phone:</b>{" "}
              {editMode ? (
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="border p-1 mt-1 w-full"
                />
              ) : (
                <span className="ml-1">{phone || "N/A"}</span>
              )}
            </div>
            <div>
              <b>Location:</b>{" "}
              {editMode ? (
                <input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="border p-1 mt-1 w-full"
                />
              ) : (
                <span className="ml-1">{address || "N/A"}</span>
              )}
            </div>
            <p>
              <b>Joined:</b>{" "}
              {user.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : "N/A"}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mt-6">
            {editMode ? (
              <>
                <button
                  onClick={handleSave}
                  className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditMode(false)}
                  className="px-6 py-2 border rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditMode(true)}
                className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800"
              >
                Edit Profile
              </button>
            )}
            <button
              onClick={handleLogout}
              className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
