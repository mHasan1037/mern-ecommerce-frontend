"use client";
import CategoryForm from "@/components/AdminProductPage/CategoryForm";
import AdminSidebar from "@/components/adminSidebar";
import ConfirmButton from "@/components/buttons/ConfirmButton";
import React from "react";

const Category = () => {

  return (
    <div className="adminMainSection">
      <AdminSidebar />
      <div className="w-full">
        <div className="w-full flex justify-between items-start">
          <h1>Category</h1>
          <ConfirmButton
            buttonText="Add Category"
            onclick={() => console.log("hello world")}
          />
        </div>
        <CategoryForm title="Add Category"/>
      </div>
    </div>
  );
};

export default Category;
