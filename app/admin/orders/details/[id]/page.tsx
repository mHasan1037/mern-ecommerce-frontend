"use client";
import LoadingScreen from "@/components/LoadingScreen";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getOrderById, updateOrderStatus } from "@/redux/slices/orderSlice";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import AdminSidebar from "@/components/adminSidebar";
import { firstLetterCapital } from "@/utils/firstLetterCapital";
import { toast } from "react-toastify";

const OrderDetails = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const router = useRouter();
  const { currentOrder, loading, error } = useAppSelector(
    (state) => state.order
  );
  const [newStatus, setNewStatus] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (!id) return;
    dispatch(getOrderById(id as string));
  }, [dispatch, id]);

  useEffect(()=>{
    if(currentOrder?.status){
      setNewStatus(currentOrder.status);
    }
  }, [currentOrder]);

  const handleStatusUpdate = async () =>{
    if(!currentOrder) return;
    if(newStatus === currentOrder.status){
      toast.info("No changes to update");
      return;
    };

    try{
      setIsUpdating(true);
      await dispatch(
        updateOrderStatus({ orderId: currentOrder._id, status: newStatus })
      ).unwrap();
      toast.success(`Order status updated to ${firstLetterCapital(newStatus)}`);
    } catch (err: any){
      toast.error(err || "Failed to update order status");
    } finally {
      setIsUpdating(false);
    }
  }

  if (loading) return <LoadingScreen />;
  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!currentOrder)
    return <p className="text-gray-500 text-center">No order found.</p>;

  const { user, shippingInfo, paymentMethod, status, totalAmount, orderItems } =
    currentOrder;

  const canUpdate = status !== "cancelled" && status !== "delivered";
  const validNextStatuses =
    status === "processing"
      ? ["processing", "shipped", "cancelled"]
      : status === "shipped"
      ? ["shipped", "delivered"]
      : [status];

  return (
    <div className="adminMainSection">
      <AdminSidebar />
      <div className="w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Order Details</h1>
          <button
            onClick={() => router.back()}
            className="text-blue-600 hover:underline text-sm"
          >
            ← Back to Orders
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="border rounded-lg p-4 bg-white shadow-sm">
            <h2 className="font-semibold text-lg mb-2">Customer</h2>
            <p className="text-sm">
              <span className="font-semibold">Name:</span>{" "}
              {typeof user === "object" ? user?.name : "N/A"}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Email:</span>{" "}
              {typeof user === "object" ? user?.email : "N/A"}
            </p>
            <p className="text-sm">
              <span className="font-semibold">User ID:</span>{" "}
              {typeof user === "object" ? user?._id : user}
            </p>
          </div>

          <div className="border rounded-lg p-4 bg-white shadow-sm">
            <h2 className="font-semibold text-lg mb-2">Shipping Info</h2>
            <p className="text-sm">
              <span className="font-semibold">Name:</span>{" "}
              {shippingInfo?.fullName}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Address:</span>{" "}
              {shippingInfo?.address}
            </p>
            <p className="text-sm">
              <span className="font-semibold">City:</span> {shippingInfo?.city}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Country:</span>{" "}
              {shippingInfo?.country}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Postcode:</span>{" "}
              {shippingInfo?.postCode}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Phone:</span>{" "}
              {shippingInfo?.phone}
            </p>
          </div>
        </div>

        <div className="border rounded-lg p-4 bg-white shadow-sm mb-8">
          <h2 className="font-semibold text-lg mb-2">Order Info</h2>
          <p className="text-sm">
            <span className="font-semibold">Order ID:</span> {currentOrder._id}
          </p>
          <p className="text-sm">
            <span className="font-semibold">Payment Method:</span>{" "}
            {paymentMethod}
          </p>
          <p className="text-sm">
            <span className="font-semibold">Status:</span>{" "}
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                status === "delivered"
                  ? "bg-green-100 text-green-700"
                  : status === "shipped"
                  ? "bg-yellow-100 text-yellow-700"
                  : status === "cancelled"
                  ? "bg-red-100 text-red-600"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {firstLetterCapital(status)}
            </span>
          </p>
        </div>

        {canUpdate ? (
          <div className="border rounded-lg p-4 bg-white shadow-sm mb-8">
            <h2 className="font-semibold text-lg mb-2">Update Order Status</h2>
            <div className="flex gap-3 items-center">
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="border px-3 py-2 rounded-md outline-none text-sm"
              >
                {validNextStatuses.map((s) => (
                  <option key={s} value={s}>
                    {firstLetterCapital(s)}
                  </option>
                ))}
              </select>
              <button
                onClick={handleStatusUpdate}
                disabled={isUpdating}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
              >
                {isUpdating ? "Updating..." : "Update"}
              </button>
            </div>
          </div>
        ) : (
          <div className="border rounded-lg p-4 bg-gray-50 shadow-sm mb-8">
            <h2 className="font-semibold text-lg mb-2">Order Closed</h2>
            <p className="text-sm text-gray-600">
              This order is{" "}
              <span className="font-semibold">
                {firstLetterCapital(status)}
              </span>{" "}
              and can no longer be updated.
            </p>
          </div>
        )}

        <div className="border rounded-lg p-4 bg-white shadow-sm mb-8">
          <h2 className="font-semibold text-lg mb-4">Ordered Products</h2>
          <div className="divide-y">
            {orderItems.map((item: any) => (
              <div
                key={item._id}
                className="flex flex-col sm:flex-row justify-between items-center py-3"
              >
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 border rounded-md overflow-hidden">
                    <Image
                      src={item.product?.images?.[0]?.url || "/no-image.png"}
                      alt={item.product?.name || "Product Image"}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">
                      {item.product?.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      ${item.product?.price}
                    </p>
                  </div>
                </div>
                <div className="text-right text-sm text-gray-700 mt-2 sm:mt-0">
                  <p>Qty: {item.quantity}</p>
                  <p className="font-semibold">
                    Total: ${item.quantity * item.product?.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border rounded-lg p-4 bg-white shadow-sm">
          <h2 className="font-semibold text-lg mb-2">Order Summary</h2>
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Grand Total:</span>{" "}
            <span className="text-green-700 font-semibold">${totalAmount}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
