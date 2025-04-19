import AdminProductsList from "@/components/AdminProductPage/AdminProductsList";
import ProductHeader from "@/components/AdminProductPage/ProductHeader";
import AdminSidebar from "@/components/adminSidebar";
import React from "react";

const Product = () => {
  return (
    <div className="adminMainSection">
      <AdminSidebar />
      <div className="w-full">
        <ProductHeader />
        <AdminProductsList />
      </div>
    </div>
  );
};

export default Product;
