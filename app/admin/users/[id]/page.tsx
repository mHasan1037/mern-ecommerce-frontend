"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getUserById } from "@/redux/slices/authSlice";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

const UserProfile = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { adminViewedUser } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (typeof id === "string") {
      dispatch(getUserById(id));
    }
  }, [dispatch, id]);

  return (
    <div>
      <h1>User name: {adminViewedUser?.name}</h1>
      <h1>Email: {adminViewedUser?.email}</h1>
      {adminViewedUser?.isVerified && <h2>Verified: Yes</h2>}
      {adminViewedUser?.isAdmin && <h2>Role: Admin</h2>}
      {adminViewedUser?.totalSpent && (
        <h2>Total amount ordered: ${adminViewedUser.totalSpent}</h2>
      )}
      {adminViewedUser?.totalDeliveredOrders != null && (
        <h2>Total Delivered orders: {adminViewedUser.totalDeliveredOrders}</h2>
      )}
      {adminViewedUser?.recentOrder ? (
        adminViewedUser.recentOrder.orderItems?.[0]?.name ? (
          <h2>
            Recent order: {adminViewedUser.recentOrder.orderItems[0].name}
          </h2>
        ) : (
          <h2>Recent order: None</h2>
        )
      ) : (
        <h2>Recent order: None</h2>
      )}
      {adminViewedUser?.totalCancelledOrders != null && (
        <h2>Total Cancel orders: {adminViewedUser.totalCancelledOrders}</h2>
      )}
    </div>
  );
};

export default UserProfile;
