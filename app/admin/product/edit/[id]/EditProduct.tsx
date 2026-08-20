"use client";
import ProductForm from "@/components/AdminProductPage/ProductForm";
import AdminSidebar from "@/components/adminSidebar";
import LoadingScreen from "@/components/LoadingScreen";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { clearProducts, fetchProductById } from "@/redux/slices/productSlice";
import { ProductFormDataType } from "@/types/product";
import axiosInstance from "@/utils/axiosInstance";
import React, { useEffect } from "react";
import { toast } from "react-toastify";

const defaultFormData: ProductFormDataType = {
  name: "",
  description: "",
  price: "",
  category: "",
  stock: "",
  images: [],
  is_featured: false,
};

type EditProductProps = {
  params: {
    id: string;
  };
};

const EditProduct = ({ params }: EditProductProps) => {
  const dispatch = useAppDispatch();
  const { singleProduct, singleLoading } = useAppSelector((state) => state.products);

  useEffect(() => {
    if(params.id){
      dispatch(fetchProductById(params.id));
    }

    return () =>{
      dispatch(clearProducts())
    }
  }, [params.id, dispatch]);

  const handleSubmit = async (data: ProductFormDataType) => {
    try {
      const payload = {
        ...data,
        price: Number(data.price),
        stock: Number(data.stock),
      };

      await axiosInstance.put(`/api/products/${params.id}`, payload);

      toast.success("Product is updated.")
    } catch (error: any) {
      console.error("Error updating product", error?.response?.data);
      toast.error("You have reached your max featured product limit.")
    }
  };

  if (singleLoading) return <LoadingScreen />;

  const initialData: ProductFormDataType = singleProduct
  ? {
      name: singleProduct.name,
      description: singleProduct.description,
      price: singleProduct.price.toString(),
      stock: singleProduct.stock.toString(),
      images: singleProduct.images,
      is_featured: singleProduct.is_featured,
      category: typeof singleProduct.category === "string" ? singleProduct.category : singleProduct.category._id,
    }
  : defaultFormData;

  return (
    <div className="adminMainSection">
      <AdminSidebar />
      <ProductForm
        initialData={initialData}
        onSubmit={handleSubmit}
        mode="edit"
      />
    </div>
  );
};

export default EditProduct;
