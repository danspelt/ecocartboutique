"use client";
import { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { FIRESTORE } from "@/firebaseConfig";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import useSWRMutation from "swr/mutation";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

export default function OrderDetails({ orderId, paypalClientId }) {
  const [orderData, setOrderData] = useState(null);
  const [isDelivering, setIsDelivering] = useState(false);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      const orderRef = doc(FIRESTORE, "orders", orderId);
      const orderSnap = await getDoc(orderRef);
      if (orderSnap.exists()) {
        setOrderData(orderSnap.data());
      } else {
        toast.error("Order not found");
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  const { trigger: deliverOrder } = useSWRMutation(
    `/api/orders/${orderId}/deliver`,
    async () => {
      setIsDelivering(true);
      try {
        const orderRef = doc(FIRESTORE, "orders", orderId);
        await updateDoc(orderRef, {
          isDelivered: true,
          deliveredAt: new Date(),
        });
        toast.success("Order delivered successfully");
        setOrderData((prevData) => ({
          ...prevData,
          isDelivered: true,
          deliveredAt: new Date(),
        }));
      } catch (error) {
        toast.error("Failed to mark as delivered");
      }
      setIsDelivering(false);
    }
  );

  function createPayPalOrder() {
    // Your logic for creating a PayPal order
  }

  function onApprovePayPalOrder(data) {
    // Your logic for approving a PayPal order
  }

  if (!orderData) return "Loading...";

  const {
    paymentMethod,
    shippingAddress,
    items,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    isDelivered,
    deliveredAt,
    isPaid,
    paidAt,
    } = orderData;
    
  return (
    <div className="max-w-screen-lg mx-auto p-4">
      <h1 className="text-2xl py-4">Order {orderId}</h1>
      {/* Grid Layout for order details */}
      <div className="grid md:grid-cols-4 md:gap-5 my-4">
        {/* Column for shipping and payment details */}
        <div className="md:col-span-3 space-y-4">
          {/* Shipping Address */}
          <div className="card bg-base-100 shadow-xl p-4">
            <h2 className="text-lg font-semibold mb-2">Shipping Address</h2>
            <p>{shippingAddress.fullName}</p>
            <p>
              {shippingAddress.address}, {shippingAddress.city}
            </p>
            <p>
              {shippingAddress.postalCode}, {shippingAddress.country}
            </p>
            <p className={isDelivered ? "text-green-500" : "text-red-500"}>
              {isDelivered ? `Delivered at ${deliveredAt}` : "Not Delivered"}
            </p>
          </div>

          {/* Payment Method */}
          <div className="card bg-base-100 shadow-xl p-4">
            <h2 className="text-lg font-semibold mb-2">Payment Method</h2>
            <p>{paymentMethod}</p>
            <p className={isPaid ? "text-green-500" : "text-red-500"}>
              {isPaid ? `Paid at ${paidAt}` : "Not Paid"}
            </p>
          </div>

          {/* Items List */}
          <div className="card bg-base-100 shadow-xl p-4">
            <h2 className="text-lg font-semibold mb-2">Items</h2>
            {/* Items Table */}
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.slug}>
                      <td>
                        <Link href={`/product/${item.slug}`}>
                          <a className="flex items-center">
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={50}
                              height={50}
                            />
                            <span className="ml-2">
                              {item.name} ({item.color}, {item.size})
                            </span>
                          </a>
                        </Link>
                      </td>
                      <td>{item.qty}</td>
                      <td>${item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="md:col-span-1">
          <div className="card bg-base-100 shadow-xl p-4">
            <h2 className="text-lg font-semibold mb-2">Order Summary</h2>
            {/* Order Summary List */}
            <ul>
              <li className="flex justify-between my-2">
                <span>Items:</span>
                <span>${itemsPrice}</span>
              </li>
              <li className="flex justify-between my-2">
                <span>Tax:</span>
                <span>${taxPrice}</span>
              </li>
              <li className="flex justify-between my-2">
                <span>Shipping:</span>
                <span>${shippingPrice}</span>
              </li>
              <li className="flex justify-between my-2">
                <span>Total:</span>
                <span>${totalPrice}</span>
              </li>
              {!isPaid && paymentMethod === "PayPal" && (
                <li>
                  <PayPalScriptProvider
                    options={{ "client-id": paypalClientId }}
                  >
                    <PayPalButtons
                      createOrder={createPayPalOrder}
                      onApprove={onApprovePayPalOrder}
                    />
                  </PayPalScriptProvider>
                </li>
              )}
              {/* Delivery Button for Admin */}
              {/* ... */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
