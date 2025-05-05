"use client";
import AdminSidebar from "@/components/adminSidebar";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getAllUsersOrders } from "@/redux/slices/orderSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Orders = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { orders, loading, error } = useAppSelector((state) => state.order);

  useEffect(() => {
    dispatch(getAllUsersOrders());
  }, [dispatch]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="adminMainSection">
      <AdminSidebar />
      <div className="w-full">
        <table className="w-full border-collapse table-auto text-left">
          <thead className="bg-gray-100 text-sm font-semibold">
            <tr>
              <th className="p-3">Order ID</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Products</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Payment</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-b text-sm">
                <td className="p-3">{order._id.slice(-6)}</td>
                <td className="p-3 text-blue-600 cursor-pointer hover:underline">
                  {typeof order.user === "object" && "name" in order.user ? (
                    <Link href={`/admin/users/${order.user._id}`}>
                      {order.user.name}
                    </Link>
                  ) : (
                    <span>Unknown User</span>
                  )}
                </td>
                <td className="p-3 space-y-1">
                  <select
                    className="border px-2 py-1 text-sm rounded"
                    onChange={(e) => {
                      if (e.target.value) {
                        router.push(e.target.value);
                      }
                    }}
                  >
                    <option value="">Select product</option>
                    {order.orderItems.map((item) => (
                      <option
                        key={item.product._id}
                        value={`/${item.product._id}`}
                      >
                        {item.product.name}
                      </option>
                    ))}
                  </select>
                </td>
                <td>${order.totalAmount}</td>
                <td>
                  {order.paymentMethod
                    .split(" ")
                    .map((w) => w[0])
                    .join("")
                    .toUpperCase()}
                </td>
                <td>{order.status}</td>
                <td className="p-3 space-x-2">
                  <button className="text-sm text-blue-600 hover:underline">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
