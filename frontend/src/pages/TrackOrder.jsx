import React, { useEffect, useState, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import toast from "react-hot-toast";
import html2pdf from "html2pdf.js";

const TrackOrder = () => {
  const { backendUrl, token } = useContext(ShopContext);
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");
  const invoiceRef = useRef();

  const statusSteps = [
    "Order Placed",
    "Processing",
    "Shipped",
    "Out for Delivery",
    "Delivered",
  ];

  const fetchOrderDetails = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/order/${id}`, {
        headers: { token },
      });
      if (res.data.success) {
        setOrder(res.data.order);
      } else {
        setError("Order not found");
      }
    } catch (err) {
      setError("Server error: " + err.message);
    }
  };

  const cancelOrder = async () => {
    try {
      const res = await axios.post(
        `${backendUrl}/api/order/cancel`,
        { orderId: id },
        { headers: { token } }
      );
      if (res.data.success) {
        toast.success("Order cancelled");
        fetchOrderDetails();
      } else {
        toast.error("Failed to cancel: " + res.data.message);
      }
    } catch (err) {
      toast.error("Cancel failed: " + err.message);
    }
  };

  const downloadInvoice = () => {
    const element = invoiceRef.current;
    setTimeout(() => {
      html2pdf()
        .set({
          margin: 0.5,
          filename: "Invoice.pdf",
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
        })
        .from(element)
        .save();
    }, 300);
  };

  useEffect(() => {
    fetchOrderDetails();
  }, [id]);

  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;
  if (!order) return <div className="text-center mt-10">Loading...</div>;

  const currentStep = statusSteps.indexOf(order.status);
  const estimatedDelivery = new Date(
    new Date(order.date).getTime() + 5 * 24 * 60 * 60 * 1000
  ).toDateString();

  const total = order.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Track Your Order</h2>

      {/* Order Summary */}
      <div className="bg-white shadow-sm border rounded p-4 mb-8">
        <p><b>Status:</b> <span className="text-green-600">{order.status}</span></p>
        <p><b>Payment:</b> {order.paymentMethod}</p>
        <p><b>Date:</b> {new Date(order.date).toDateString()}</p>
        <p><b>Estimated Delivery:</b> {estimatedDelivery}</p>
        <p><b>Total:</b> ₹ {total}</p>

        {["Order Placed", "Processing"].includes(order.status) && (
          <button
            className="mt-4 px-4 py-2 border text-sm bg-red-600 text-white rounded hover:bg-red-700"
            onClick={cancelOrder}
          >
            Cancel Order
          </button>
        )}

        <button
          className="ml-4 mt-4 px-4 py-2 border text-sm text-gray-700 hover:bg-gray-100 rounded"
          onClick={downloadInvoice}
        >
          Download Invoice
        </button>
      </div>

      {/* Shipping Address */}
      <div className="bg-gray-50 border p-4 rounded mb-6">
        <h3 className="font-semibold mb-2">Shipping Address</h3>
        <p>{order.address?.name}</p>
        <p>{order.address?.street}</p>
        <p>{order.address?.city}, {order.address?.state} - {order.address?.zip}</p>
        <p>Phone: {order.address?.phone}</p>
      </div>

      {/* Progress Bar */}
      <div className="mb-12">
        <div className="flex justify-between text-sm text-gray-500 font-medium mb-2">
          {statusSteps.map((step, index) => (
            <span key={index} className={index <= currentStep ? "text-green-600" : ""}>
              {step}
            </span>
          ))}
        </div>
        <div className="relative h-2 bg-gray-200 rounded-full">
          <div
            className="absolute h-2 bg-green-500 rounded-full transition-all duration-500"
            style={{ width: `${(currentStep / (statusSteps.length - 1)) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Ordered Items */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Items:</h3>
        {order.items.map((item, i) => {
          const imageUrl = item.image?.[0]
            ? item.image[0].startsWith("http")
              ? item.image[0]
              : `${backendUrl}/${item.image[0]}`
            : "https://via.placeholder.com/100";
          return (
            <div key={i} className="flex items-center gap-4 border-b pb-4 mb-4">
              <img
                src={imageUrl}
                alt={item.name}
                className="w-16 h-16 object-cover border rounded"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/100";
                }}
              />
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-600">
                  Size: {item.size} | Qty: {item.quantity}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* ✅ Hidden Printable Invoice */}
      <div
        ref={invoiceRef}
        style={{
          position: "absolute",
          left: "-9999px",
          top: 0,
          backgroundColor: "#fff",
          padding: "20px",
          width: "800px",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Trendify Invoice</h2>
        <p><b>Order ID:</b> {order._id}</p>
        <p><b>Date:</b> {new Date(order.date).toDateString()}</p>
        <p><b>Status:</b> {order.status}</p>
        <p><b>Payment Method:</b> {order.paymentMethod}</p>
        <p><b>Total:</b> ₹ {total}</p>
        <hr />
        <h3>Items:</h3>
        {order.items.map((item, i) => (
          <p key={i}>
            {item.name} - ₹{item.price} × {item.quantity} = ₹
            {item.price * item.quantity}
          </p>
        ))}
        <hr />
        <p><b>Shipping Address:</b></p>
        <p>
          {order.address?.name}, {order.address?.street}, {order.address?.city},{" "}
          {order.address?.state} - {order.address?.zip}
        </p>
        <p>Phone: {order.address?.phone}</p>
      </div>
    </div>
  );
};

export default TrackOrder;
