"use client";
import AllCategoryList from "@/components/AdminProductPage/AllCategoryList";
import CategoryForm from "@/components/AdminProductPage/CategoryForm";
import AdminSidebar from "@/components/adminSidebar";
import ConfirmButton from "@/components/buttons/ConfirmButton";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";


const Category = () => {
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
      toast.success("Login to your account");
    }
  }, [isAuthenticated]);

  return (
    <div className="adminMainSection">
      <AdminSidebar />
      <div className="w-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Product Categories</h1>
          <ConfirmButton
            buttonText="Add Category"
            onclick={() => setShowCategoryForm(true)}
          />
        </div>
        {showCategoryForm ? (
          <CategoryForm title="Upload Category" setShowCategoryForm={setShowCategoryForm}/>
        ) : (
          <AllCategoryList />
        )}
      </div>
    </div>
  );
};

export default Category;
