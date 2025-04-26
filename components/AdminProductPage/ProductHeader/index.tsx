"use client";
import ConfirmButton from "@/components/buttons/ConfirmButton";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchCategories,
  setSelectedCategory,
} from "@/redux/slices/categorySlice";
import { fetchProducts } from "@/redux/slices/productSlice";

const ProductHeader = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isFeatured, setIsFeatured] = useState<boolean>(false);
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

  const handleFeaturedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsFeatured(e.target.checked);
  };

  useEffect(() => {
    dispatch(
      fetchProducts({
        category: selectedCategory ?? undefined,
        is_featured: isFeatured ? true : undefined,
      })
    );
  }, [selectedCategory, isFeatured, dispatch]);

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
        <div>
          Featured{" "}
          <input
            type="checkbox"
            checked={isFeatured}
            onChange={handleFeaturedChange}
          />
        </div>
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
