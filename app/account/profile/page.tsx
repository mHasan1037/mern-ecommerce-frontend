"use client";
import LoadingScreen from "@/components/LoadingScreen";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Profile = () => {
  const { user, loading, isAuthenticated } = useAppSelector((state) => state.auth);
  const router = useRouter();
  
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace("/");
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-center text-green-600 mb-8">
        My Profile
      </h1>

      <div className="bg-white border rounded-md shadow-sm p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-500 text-sm">Name</p>
            <p className="font-medium text-lg">{user?.name}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Email</p>
            <p className="font-medium text-lg">{user?.email}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Verified</p>
            <p className="font-medium">
              {user?.isVerified ? "Yes ✅" : "No ❌"}
            </p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Role</p>
            <p className="font-medium">
              {user?.isAdmin ? "Admin 👑" : "Customer"}
            </p>
          </div>

          {user?.totalSpent && (
            <div>
              <p className="text-gray-500 text-sm">Total Amount Ordered</p>
              <p className="font-semibold text-green-700">${user.totalSpent}</p>
            </div>
          )}

          {user?.totalDeliveredOrders != null && (
            <div>
              <p className="text-gray-500 text-sm">Delivered Orders</p>
              <p className="font-medium">{user.totalDeliveredOrders}</p>
            </div>
          )}

          {user?.totalCancelledOrders != null && (
            <div>
              <p className="text-gray-500 text-sm">Cancelled Orders</p>
              <p className="font-medium">{user.totalCancelledOrders}</p>
            </div>
          )}

          {user?.recentOrder && (
            <div className="sm:col-span-2">
              <p className="text-gray-500 text-sm">Recent Order</p>
              <p className="font-medium">
                {user?.recentOrder?.orderItems?.name}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
