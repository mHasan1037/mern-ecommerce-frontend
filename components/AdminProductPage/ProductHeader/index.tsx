"use client";
import ConfirmButton from "@/components/buttons/ConfirmButton";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchCategories,
  setSelectedCategory,
} from "@/redux/slices/categorySlice";

const ProductHeader = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const selectedCategory = useAppSelector(
    (state) => state.categories.selectedCategory
  );
  const { categories, loading, error } = useAppSelector(
    (state) => state.categories
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSelectedCategory(e.target.value));
  };

  return (
    <div className="flex justify-between items-start w-full mb-10">
      <div className="flex gap-2">
        <select
          name="category"
          value={selectedCategory ?? ""}
          onChange={handleCategoryChange}
          required
        >
          {categories.map((category) => {
            return (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            );
          })}
        </select>
        <p className="text-red-500">Add a feature product filter tick here</p>
      </div>
      <div className="flex gap-5">
        <input
          type="text"
          placeholder="Search product"
          className="px-3 rounded-md focus:outline-none"
        />
        <ConfirmButton
          buttonText={"Add product"}
          onclick={() => router.push("/admin/product/new")}
        />
      </div>
    </div>
  );
};

export default ProductHeader;
