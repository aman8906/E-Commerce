import React, { useEffect, useState } from "react";

export default function Dashboard() {
  // Dummy state, replace with API calls
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    // TODO: Replace with real API call
    // Example:
    // fetch("/api/admin/dashboard-stats")
    //   .then(res => res.json())
    //   .then(data => setStats(data));

    // Dummy data for demo:
    setStats({
      totalProducts: 125,
      totalOrders: 87,
      totalUsers: 56,
      totalRevenue: 45200,
    });
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-gray-600">Total Products</h2>
          <p className="text-2xl font-semibold">{stats.totalProducts}</p>
        </div>

        <div className="bg-white shadow rounded p-4">
          <h2 className="text-gray-600">Total Orders</h2>
          <p className="text-2xl font-semibold">{stats.totalOrders}</p>
        </div>

        <div className="bg-white shadow rounded p-4">
          <h2 className="text-gray-600">Total Users</h2>
          <p className="text-2xl font-semibold">{stats.totalUsers}</p>
        </div>

        <div className="bg-white shadow rounded p-4">
          <h2 className="text-gray-600">Total Revenue</h2>
          <p className="text-2xl font-semibold">₹{stats.totalRevenue.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}
