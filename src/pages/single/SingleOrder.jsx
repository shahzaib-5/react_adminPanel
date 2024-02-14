import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

const SingleOrder = () => {
  const [orderDetails, setOrderDetails] = useState(null);
  const { ordersId } = useParams();
  console.log("bnsvghsvhd", ordersId);

  // Check local storage to see if the order has been marked as complete
  const isOrderComplete = localStorage.getItem(`order_${ordersId}_complete`);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const orderDoc = doc(db, "Orders", ordersId);
        const orderSnapshot = await getDoc(orderDoc);
        if (orderSnapshot.exists()) {
          const orderData = orderSnapshot.data();
          setOrderDetails(orderData);
        } else {
          // Handle the case where the order doesn't exist
          console.error("Order not found");
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    fetchOrderDetails();
  }, [ordersId]);

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const orderDoc = doc(db, "Orders", orderId);
      await updateDoc(orderDoc, {
        "paymentIntent.status": newStatus,
      });

      // Store in local storage to indicate that the order has been marked as complete
      localStorage.setItem(`order_${orderId}_complete`, "true");
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const markOrderAsComplete = async () => {
    try {
      // Check if the order has already been marked as complete in local storage
      if (!isOrderComplete) {
        // Update the order status in Firestore
        await updateOrderStatus(ordersId, "Completed");

        // Update the order status in the local state
        setOrderDetails((prevOrderDetails) => ({
          ...prevOrderDetails,
          paymentIntent: {
            ...prevOrderDetails.paymentIntent,
            status: "completed",
          },
        }));
      }
    } catch (error) {
      console.error("Error marking the order as complete:", error);
    }
  };

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <h1 className="title">Order Details</h1>

            {orderDetails ? (
              <div className="item">
                <div className="details">
                  {orderDetails.cartItems.map((cartItem, index) => (
                    <div key={index}>
                      <img src={cartItem.item.img} alt="" className="itemImg" />
                      <h1 className="itemTitle">{cartItem.item.productName}</h1>
                      <div className="detailItem">
                        <span className="itemKey">Email:</span>
                        <span className="itemValue">{orderDetails.email}</span>
                      </div>
                      <div className="detailItem">
                        <span className="itemKey">Shipping Address:</span>
                        <span className="itemValue">
                          {orderDetails.address}
                        </span>
                      </div>
                      <div className="detailItem">
                        <span className="itemKey">Total Quantity:</span>
                        <span className="itemValue">{cartItem.quantity}</span>
                      </div>

                      <div className="detailItem">
                        <span className="itemKey">Product Price:</span>
                        <span className="itemValue">
                          {cartItem.item.productPrice}
                        </span>
                      </div>
                      <div className="detailItem">
                        <span className="itemKey">Item ID:</span>
                        <span className="itemValue">{cartItem.itemId}</span>
                      </div>
                    </div>
                  ))}
<div>----------------------------------------------------------------------------------------------------</div>
                  <div className="detailItem">
                    <span className="itemKey">Total Bill:</span>
                    <span className="itemValue">{orderDetails.grandTotal}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Payment Method Type:</span>
                    <span className="itemValue">
                      {
                        orderDetails.paymentIntent.paymentMethod
                          .paymentMethodType
                      }
                    </span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Order Status:</span>
                    <span className="itemValue">
                      {orderDetails.paymentIntent.status}
                    </span>
                  </div>
                </div>

                {orderDetails.paymentIntent.status !== "completed" &&
                  !isOrderComplete && (
                    <div className="btn">
                      <button
                        className="completeButton"
                        onClick={markOrderAsComplete}
                      >
                        Mark as Complete
                      </button>
                    </div>
                  )}
              </div>
            ) : (
              <p>Loading order details...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleOrder;
