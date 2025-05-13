"use client";

import LoadingScreen from "@/components/LoadingScreen";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getOrderById } from "@/redux/slices/orderSlice";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const OrderSuccessClient = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const { currentOrder, loading, error } = useAppSelector(
    (state) => state.order
  );

  useEffect(() => {
    if (orderId) {
      dispatch(getOrderById(orderId));
    }
  }, [dispatch, orderId]);

  if (loading) return <LoadingScreen />;

  const shippingInfo = currentOrder?.shippingInfo;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
      <h1 className="text-2xl font-bold text-center text-green-600">
        Thank you for your purchase!
      </h1>

      <div className="flex flex-col lg:flex-row gap-10">

        <div className="flex-1 space-y-6">
          <div className="bg-white border rounded p-6 shadow-sm space-y-3">
            <h2 className="text-lg font-semibold">Delivery Details</h2>
            <p>
              <span className="font-medium">Name:</span>{" "}
              {shippingInfo?.fullName}
            </p>
            <p>
              <span className="font-medium">Phone:</span> {shippingInfo?.phone}
            </p>
            <p>
              <span className="font-medium">Address:</span>{" "}
              {shippingInfo?.address}
            </p>
            <p>
              <span className="font-medium">City:</span> {shippingInfo?.city}
            </p>
            <p>
              <span className="font-medium">Post Code:</span>{" "}
              {shippingInfo?.postCode}
            </p>
          </div>

          <div className="bg-white border rounded p-6 shadow-sm space-y-3">
            <h2 className="text-lg font-semibold">Order Summary</h2>
            <p>
              <span className="font-medium">Payment Method:</span>{" "}
              {currentOrder?.paymentMethod}
            </p>
            <p>
              <span className="font-medium">Delivery Status:</span>{" "}
              {currentOrder?.status}
            </p>
            <p className="text-lg font-semibold text-green-700">
              Total Amount: ${currentOrder?.totalAmount}
            </p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => router.push("/")}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
            >
              Continue Shopping
            </button>
            <button
              onClick={() => router.push("/account/all_orders")}
              className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded transition"
            >
              View All Orders
            </button>
          </div>
        </div>

        <div className="flex-1 space-y-4">
          <h2 className="text-lg font-semibold mb-2">Ordered Items</h2>
          {currentOrder?.orderItems.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between gap-4 p-4 border rounded bg-white shadow-sm"
            >
              <div className="flex items-center gap-4">
                <Image
                  src={item.product.images[0]?.url}
                  alt={item.product.name}
                  width={60}
                  height={60}
                  className="rounded border object-cover"
                />
                <div>
                  <p className="font-medium">{item.product.name}</p>
                  <p className="text-sm text-gray-600">
                    Price: ${item.product.price}
                  </p>
                  <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                </div>
              </div>
              <p className="font-semibold text-green-600">
                ${item.quantity * item.product.price}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessClient;
