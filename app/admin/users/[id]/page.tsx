"use client";
import LoadingScreen from "@/components/LoadingScreen";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getUserById } from "@/redux/slices/authSlice";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "react-toastify";

const UserProfile = () => {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { adminViewedUser, loading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
      toast.success("Login to see user's details");
      return;
    } else if (typeof id === "string") {
      dispatch(getUserById(id));
    }
  }, [dispatch, id, isAuthenticated]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-md p-6 mt-10 space-y-4">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        User Details
      </h1>

      {adminViewedUser?.name && (
        <div className="flex justify-between">
          <span className="font-medium text-gray-700">Name:</span>
          <span className="text-gray-900">{adminViewedUser.name}</span>
        </div>
      )}

      {adminViewedUser?.email && (
        <div className="flex justify-between">
          <span className="font-medium text-gray-700">Email:</span>
          <span className="text-gray-900">{adminViewedUser.email}</span>
        </div>
      )}

      <div className="flex justify-between">
        <span className="font-medium text-gray-700">Verified:</span>
        <span
          className={
            adminViewedUser?.isVerified ? "text-green-600" : "text-red-500"
          }
        >
          {adminViewedUser?.isVerified ? "Yes" : "No"}
        </span>
      </div>

      <div className="flex justify-between">
        <span className="font-medium text-gray-700">Role:</span>
        <span
          className={
            adminViewedUser?.isAdmin
              ? "text-blue-600 font-semibold"
              : "text-gray-800"
          }
        >
          {adminViewedUser?.isAdmin ? "Admin" : "Customer"}
        </span>
      </div>

      {adminViewedUser?.totalSpent && (
        <div className="flex justify-between">
          <span className="font-medium text-gray-700">
            Total Amount Ordered:
          </span>
          <span className="text-gray-900">${adminViewedUser.totalSpent}</span>
        </div>
      )}

      <div className="flex justify-between">
        <span className="font-medium text-gray-700">
          Total Delivered Orders:
        </span>
        <span>{adminViewedUser?.totalDeliveredOrders ?? 0}</span>
      </div>

      <div className="flex justify-between">
        <span className="font-medium text-gray-700">
          Total Cancelled Orders:
        </span>
        <span>{adminViewedUser?.totalCancelledOrders ?? 0}</span>
      </div>

      <div className="flex justify-between gap-5">
        <span className="font-medium text-gray-700 text-nowrap">Recent Order:</span>
        <span>{adminViewedUser?.recentOrder?.orderItems?.name ?? "None"}</span>
      </div>
    </div>
  );
};

export default UserProfile;
