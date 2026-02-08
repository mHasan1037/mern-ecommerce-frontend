"use client";
import AdminSidebar from "@/components/adminSidebar";
import LoadingContainer from "@/components/LoadingScreen/LoadingContainer";
import Pagination from "@/components/Pagination";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getAllUsersOrders } from "@/redux/slices/orderSlice";
import { firstLetterCapital } from "@/utils/firstLetterCapital";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Orders = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { adminOrders: orders, loading, totalPages } = useAppSelector(
    (state) => state.order
  );
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
      toast.success("Login to see orders");
      return;
    }
    dispatch(getAllUsersOrders({ page, limit: 10 }));
  }, [dispatch, isAuthenticated, page]);

  if (loading) {
    return <LoadingContainer />;
  }

  if (!orders.length) return <p>No order found</p>;

  console.log("API BASE URL:", process.env.NEXT_PUBLIC_API_BASE_URL);

  return (
    <div className="adminMainSection">
      <AdminSidebar />
      <div className="w-full p-6">
        <h1 className="text-2xl font-semibold mb-6">All Orders</h1>

        <div className="overflow-x-auto rounded-md border">
          <table className="min-w-full border-collapse table-auto text-sm text-left">
            <thead className="bg-gray-100 text-gray-700 font-semibold">
              <tr>
                <th className="p-3 border-b">Order ID</th>
                <th className="p-3 border-b">Customer</th>
                <th className="p-3 border-b">Products</th>
                <th className="p-3 border-b">Amount</th>
                <th className="p-3 border-b">Payment</th>
                <th className="p-3 border-b">Status</th>
                <th className="p-3 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders
                .filter((order) => order && order._id)
                .map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="p-3 border-b font-mono text-xs text-gray-800">
                      #{order._id.slice(-6)}
                    </td>
                    <td className="p-3 border-b text-blue-600 hover:underline">
                      {typeof order.user === "object" &&
                      "name" in order.user ? (
                        <Link href={`/admin/users/${order.user._id}`}>
                          {order.user.name}
                        </Link>
                      ) : (
                        <span>Unknown User</span>
                      )}
                    </td>
                    <td className="p-3 border-b">
                      <select
                        className="w-52 border px-2 py-1 rounded text-xs text-gray-700"
                        onChange={(e) => {
                          if (e.target.value) {
                            router.push(e.target.value);
                          }
                        }}
                      >
                        <option value="">Select product</option>
                        {order.orderItems
                          .filter((item) => item.product && item.product._id)
                          .map((item) => (
                            <option
                              key={item.product._id}
                              value={`/products/${item.product._id}`}
                            >
                              {item.product.name.length > 30
                                ? item.product.name.slice(0, 30) + "..."
                                : item.product.name}
                            </option>
                          ))}
                      </select>
                    </td>
                    <td className="p-3 border-b text-green-700 font-medium">
                      ${order.totalAmount}
                    </td>
                    <td className="p-3 border-b uppercase text-xs font-semibold">
                      {order.paymentMethod
                        .split(" ")
                        .map((w) => w[0])
                        .join("")}
                    </td>
                    <td className="p-3 border-b">
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                          order.status === "delivered"
                            ? "bg-green-100 text-green-700"
                            : order.status === "shipped"
                            ? "bg-yellow-100 text-yellow-700"
                            : order.status === "cancelled"
                            ? "bg-red-100 text-red-600"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {firstLetterCapital(order.status)}
                      </span>
                    </td>
                    <td className="p-3 border-b">
                      <button
                        className="text-blue-600 hover:underline text-sm"
                        onClick={() =>
                          router.push(`/admin/orders/details/${order._id}`)
                        }
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="mx-auto w-fit mt-10">
          {
            totalPages > 1 && (
              <Pagination totalPages={totalPages} page={page} setPage={setPage} />
            )
          }
        </div>
      </div>
    </div>
  );
};

export default Orders;
