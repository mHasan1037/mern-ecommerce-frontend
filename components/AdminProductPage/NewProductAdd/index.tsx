"use client";
import AdminSidebar from "@/components/adminSidebar";
import ConfirmButton from "@/components/buttons/ConfirmButton";
import axiosInstance from "@/utils/axiosInstance";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import React, { useState } from "react";
import ProductForm from "../ProductForm";
import { ProductFormDataType } from "@/types/product";

const NewProductAdd = () => {
  const handleSubmit = async (data: ProductFormDataType) => {
    const payload = {
      ...data,
      price: Number(data.price),
      stock: Number(data.stock),
      is_featured: data.is_featured === "true" || data.is_featured === "1",
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
