"use client";
import AdminSidebar from "@/components/adminSidebar";
import axiosInstance from "@/utils/axiosInstance";
import ProductForm from "../ProductForm";
import { ProductFormDataType } from "@/types/product";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const NewProductAdd = () => {
  const router = useRouter();
  const handleSubmit = async (data: ProductFormDataType) => {
    try {
      const payload = {
        ...data,
        price: Number(data.price),
        stock: Number(data.stock),
      };
      await axiosInstance.post(`/api/upload-product`, payload);
      toast.success("Product is uploaded.")
      router.push("/admin/product");
    } catch (error) {
      console.error("Failed to submit product:", error);
      throw error; 
    }
  };

  return (
    <div className="adminMainSection">
      <AdminSidebar />
      <ProductForm onSubmit={handleSubmit} mode="create" />
    </div>
  );
};

export default NewProductAdd;
