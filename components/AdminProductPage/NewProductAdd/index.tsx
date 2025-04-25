"use client";
import AdminSidebar from "@/components/adminSidebar";
import axiosInstance from "@/utils/axiosInstance";
import React from "react";
import ProductForm from "../ProductForm";
import { ProductFormDataType } from "@/types/product";

const NewProductAdd = () => {
  const handleSubmit = async (data: ProductFormDataType) => {
    const payload = {
      ...data,
      price: Number(data.price),
      stock: Number(data.stock),
    };

    await axiosInstance.post(`/api/upload-product`, payload);
  };

  return (
    <div className="adminMainSection">
      <AdminSidebar />
      <ProductForm onSubmit={handleSubmit} mode="create" />
    </div>
  );
};

export default NewProductAdd;
