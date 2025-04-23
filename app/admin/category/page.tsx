"use client";
import AllCategoryList from "@/components/AdminProductPage/AllCategoryList";
import CategoryForm from "@/components/AdminProductPage/CategoryForm";
import AdminSidebar from "@/components/adminSidebar";
import ConfirmButton from "@/components/buttons/ConfirmButton";
import axiosInstance from "@/utils/axiosInstance";
import React, { useEffect, useState } from "react";

interface Category {
  _id: string;
  name: string;
  description: string;
  image: {
    url: string;
  };
}

const Category = () => {
  const [categires, setCategories] = useState<Category[]>([]);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  useEffect(() => {
    const getAllCategory = async () => {
      try {
        const response = await axiosInstance.get("/api/categories");
        setCategories(response.data.categories);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    getAllCategory();
  }, []);

  return (
    <div className="adminMainSection">
      <AdminSidebar />
      <div className="w-full">
        <div className="w-full flex justify-between items-start">
          <h1>Category</h1>
          <ConfirmButton
            buttonText="Add Category"
            onclick={() => setShowCategoryForm(true)}
          />
        </div>
        {showCategoryForm ? (
          <CategoryForm title="Add Category" setShowCategoryForm={setShowCategoryForm}/>
        ) : (
          <AllCategoryList categires={categires} />
        )}
      </div>
    </div>
  );
};

export default Category;
