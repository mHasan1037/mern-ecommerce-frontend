"use client";
import AdminSidebar from "@/components/adminSidebar";
import { RootState } from "@/redux/store";
import axiosInstance from "@/utils/axiosInstance";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CiShoppingCart } from "react-icons/ci";
import { FaUserFriends } from "react-icons/fa";
import { MdOutlineInventory, MdAttachMoney } from "react-icons/md";
import AdminInfoBox from "@/components/AdminInfoBox";
import LoadingScreen from "@/components/LoadingScreen";

type AdminSummary = {
  lowStockProducts: {
    _id: string;
    name: string;
    stock: number;
  }[];
  orderStatusCount: {
    status: string;
    count: number;
  }[];
  totalOrders: number;
  totalProducts: number;
  totalRevenue: number;
  totalUsers: number;
  usersGrowthThisMonth: number;
  ordersGrowthThisMonth: number;
  revenueGrowthThisMonth: number;
  newProductsThisMonth: number;
  revenueGraphSixMonth: {
    month: string;
    count: number;
  }[];
  ordersGraphSixMonth: {
    month: string;
    count: number;
  }[];
  userGraphSixMonth: {
    month: string;
    count: number;
  }[];
};

const Admin = () => {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const [isLoading, setIsLoading] = useState(true);
  const [adminSummary, setAdminSummary] = useState<AdminSummary | null>(null);

  useEffect(() => {
    if (user || isAuthenticated) {
      if (!isAuthenticated || !user?.isAdmin) {
        router.replace("/");
      } else {
        setIsLoading(false);
      }
    }
  }, [user, isAuthenticated, router]);

  useEffect(() => {
    const fetchSummary = async () => {
      setIsLoading(true);
      try {
        const res = await axiosInstance.get("/api/admin/summary");
        setAdminSummary(res.data.summary);
        setIsLoading(false);
      } catch (err: any) {
        console.error(
          "Error fetching admin orders:",
          err?.response?.data || err.message
        );
      }
    };

    fetchSummary();
  }, [user]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="adminMainSection">
      <AdminSidebar />
      <div className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <AdminInfoBox
            title={"Total orders"}
            amount={adminSummary?.totalOrders}
            Icon={CiShoppingCart}
            percentageGrowth={`Orders growth this month: ${adminSummary?.ordersGrowthThisMonth}%`}
          />
          <AdminInfoBox
            title={"Total users"}
            amount={adminSummary?.totalUsers}
            Icon={FaUserFriends}
            percentageGrowth={`Users growth this month: ${adminSummary?.usersGrowthThisMonth}%`}
          />
          <AdminInfoBox
            title={"Total products"}
            amount={adminSummary?.totalProducts}
            Icon={MdOutlineInventory}
            percentageGrowth={`New products this month: ${adminSummary?.newProductsThisMonth}`}
          />
          <AdminInfoBox
            title={"Total revenue"}
            amount={adminSummary?.totalRevenue}
            Icon={MdAttachMoney}
            percentageGrowth={`Revenue growth this month: ${adminSummary?.revenueGrowthThisMonth}%`}
          />
        </div>

        <div className="pt-10">
          <h2 className="text-lg font-semibold mb-4">⚠️ Low Stock Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {adminSummary?.lowStockProducts.map((product, idx) => (
              <div
                key={idx}
                className="border border-red-300 bg-red-50 p-4 rounded-md shadow-sm cursor-pointer"
                onClick={()=> router.push(`/admin/product/edit/${product._id}`)}
              >
                <p className="font-semibold text-red-700">{product.name}</p>
                <p className="text-sm text-red-500">Stock: {product.stock}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;

// dashboard
//  - total order
//  - total customer
//  - total products
//  - total revenue
//  - Earning reports (weekly, monthly, yearly)
//  - Sales report graph
//  - Most popular product table
//  https://mannatthemes.com/robotech/default/index.html#

// product, category, order, customer, inventory
// https://techzaa.in/venton/product-list.html

//setting
