"use client";
import LoadingScreen from "@/components/LoadingScreen";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getCurrentUserOrders } from "@/redux/slices/orderSlice";
import { Order } from "@/types/order";
import React, { useEffect, useState } from "react";

const orderStatusType = [
  "processing",
  "shipped",
  "delivered",
  "cancelled",
] as const;

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
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <select
        name="status"
        onChange={(e) => setOrderType(e.target.value as typeof orderType)}
      >
        {orderStatusType.map((status, idx) => (
          <option key={idx} value={status}>
            {status}
          </option>
        ))}
      </select>
      <div>
        {
            filteredOrders.map((order) =>(
                <div key={order._id}>
                    {order.orderItems.map((item) =>(
                        <div className="flex gap-3">
                            <p>Name: {item.product.name}</p>
                            <p>Quantity: {item.quantity}</p>
                        </div>
                    ))}
                </div>
            ))
        }
      </div>
    </div>
  );
};

export default AllOrders;
