"use client";
import ProductForm from "@/components/AdminProductPage/ProductForm";
import AdminSidebar from "@/components/adminSidebar";
import { ProductFormDataType } from "@/types/product";
import axiosInstance from "@/utils/axiosInstance";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const defaultFormData: ProductFormDataType = {
  name: "",
  description: "",
  price: "",
  category: "",
  stock: "",
  images: [],
  is_featured: "",
};

type EditProductProps = {
  params: {
    id: string;
  };
};

const EditProduct = ({ params }: EditProductProps) => {
  const [productInfo, setProductInfo] =
    useState<ProductFormDataType>(defaultFormData);
  const router = useRouter();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const product = await axiosInstance.get(`/api/products/${params.id}`);
        const {
          name,
          description,
          price,
          category,
          stock,
          images,
          is_featured,
        } = product.data.product;
        setProductInfo({
          name,
          description,
          price,
          category: category._id,
          stock,
          images,
          is_featured,
        });
      } catch (error) {
        console.error("Error fetching:", error);
      }
    };
    getProduct();
  }, [params.id]);

  const handleSubmit = async (data: ProductFormDataType) => {
    try {
      const payload = {
        ...data,
        price: Number(data.price),
        stock: Number(data.stock),
        is_featured: data.is_featured === "true" || data.is_featured === "1",
      };

      await axiosInstance.put(`/api/products/${params.id}`, payload);

      router.push("/admin/product");
    } catch (error) {
      console.error("Error updating product", error);
    }
  };
  return (
    <div className="adminMainSection">
      <AdminSidebar />
      <ProductForm
        initialData={productInfo}
        onSubmit={handleSubmit}
        mode="edit"
      />
    </div>
  );
};

export default EditProduct;
