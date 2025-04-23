"use client";
import AllCategoryList from "@/components/AdminProductPage/AllCategoryList";
import CategoryForm from "@/components/AdminProductPage/CategoryForm";
import AdminSidebar from "@/components/adminSidebar";
import ConfirmButton from "@/components/buttons/ConfirmButton";
import React, { useState } from "react";


const Category = () => {
  const [showCategoryForm, setShowCategoryForm] = useState(false);

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
          <AllCategoryList />
        )}
      </div>
    </div>
  );
};

export default Category;
