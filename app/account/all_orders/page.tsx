"use client";
import React, { useEffect, useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getCurrentUserOrders } from "@/redux/slices/orderSlice";
import { Order } from "@/types/order";
import Image from "next/image";

const orderStatusType = [
  "processing",
  "shipped",
  "delivered",
  "cancelled",
] as const;

const getStatusClasses = (status: string) => {
  if (status === "processing") return "bg-yellow-100 text-yellow-700";
  if (status === "shipped") return "bg-blue-100 text-blue-700";
  if (status === "delivered") return "bg-green-100 text-green-700";
  if (status === "cancelled") return "bg-red-100 text-red-700";
  return "";
};

const AllOrders = () => {
  const dispatch = useAppDispatch();
  const { orders, loading, error } = useAppSelector((state) => state.order);
  const [orderType, setOrderType] =
    useState<(typeof orderStatusType)[number]>("processing");

  useEffect(() => {
    dispatch(getCurrentUserOrders());
  }, [dispatch]);

  const filteredOrders: Order[] = orders.filter(
    (order: Order) => order.status === orderType
  );

  if (loading) return <LoadingScreen />;
  if (error) return <p className="text-center text-red-600">Error: {error}</p>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-center mb-6">My Orders</h1>

      {/* Filter Tabs */}
      <div className="flex gap-4 justify-center mb-8">
        {orderStatusType.map((status) => (
          <button
            key={status}
            onClick={() => setOrderType(status)}
            className={`px-4 py-2 rounded-md border text-sm font-medium transition ${
              orderType === status
                ? "bg-green-600 text-white border-green-600"
                : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Order List */}
      {filteredOrders.length === 0 ? (
        <p className="text-center text-gray-500">
          No {orderType} orders found.
        </p>
      ) : (
        <div className="space-y-6">
          {filteredOrders.map((order) => (
            <div
              key={order._id}
              className="border rounded-lg shadow-sm bg-white p-5 space-y-4"
            >
              {/* Order Header */}
              <div className="flex justify-between items-start flex-wrap gap-4">
                <div>
                  <p className="text-sm text-gray-500">Order ID</p>
                  <p className="font-medium text-gray-800">{order._id}</p>
                </div>

                <div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusClasses(
                      order.status
                    )}`}
                  >
                    {order.status.toUpperCase()}
                  </span>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Placed At</p>
                  <p className="text-sm">
                    {new Date(order.placedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Order Items */}
              <div className="grid sm:grid-cols-2 gap-4">
                {order.orderItems
                  .filter((item) => item.product)
                  .map((item) => (
                    <div
                      key={item.product._id}
                      className="flex items-center gap-4 border rounded-md px-3 py-2"
                    >
                      <Image
                        src={item.product.images[0]?.url}
                        alt={item.product.name}
                        width={50}
                        height={50}
                        className="rounded object-cover border"
                      />
                      <div>
                        <p className="text-sm font-medium">
                          {item.product.name}
                        </p>
                        <p className="text-xs text-gray-600">
                          Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllOrders;
