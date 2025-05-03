"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getOrderById } from "@/redux/slices/orderSlice";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const OrderSuccess = () => {
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

  if (loading) {
    return <p>Loading...</p>;
  }

  const shippingInfo = currentOrder?.shippingInfo

  return (
    <div className="flex justify-between">
      <div>
        <h1>Thank you for your purchase</h1>
        <div>
            <p>Delived to:</p>
            <div>
                <p>Name: {shippingInfo?.fullName}</p>
                <p>Phone: {shippingInfo?.phone}</p>
            </div>
        </div>
        <div>
            <p>Shipping address</p>
            <div>
                <p>Address: {shippingInfo?.address}</p>
                <p>City: {shippingInfo?.city}</p>
                <p>Post code: {shippingInfo?.postCode}</p>
            </div>
        </div>
        <div>
            <p>Payment method: {currentOrder?.paymentMethod}</p>
        </div>
        <div>
            <p>Delivery status: {currentOrder?.status}</p>
        </div>
      </div>
      <div>
        {currentOrder?.orderItems.map((item) => (
          <div key={item._id} className="flex gap-3">
            <p>{item.product.name}</p>
            <p>Price: ${item.product.price}</p>
            <p>Quantity: {item.quantity}</p>
            <Image
              src={item.product.images[0]?.url}
              alt={item.product.name}
              width={60}
              height={60}
            />
          </div>
        ))}
        <p>Total Amount: {currentOrder?.totalAmount}</p>
      </div>
    </div>
  );
};

export default OrderSuccess;
