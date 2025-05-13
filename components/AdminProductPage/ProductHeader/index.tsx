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
import { useDebounce } from "@/utils/useDebounce";

const ProductHeader = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isFeatured, setIsFeatured] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState("");
  const selectedCategory = useAppSelector(
    (state) => state.categories.selectedCategory
  );
  const { categories, loading, error } = useAppSelector(
    (state) => state.categories
  );
  const debouncedSearch = useDebounce(searchTerm, 400);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSelectedCategory(e.target.value));
  };

  const handleFeaturedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsFeatured(e.target.checked);
  };

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(
      fetchProducts({
        category: selectedCategory ?? undefined,
        is_featured: isFeatured ? true : undefined,
        search: debouncedSearch.trim() || undefined,
      })
    );
  }, [selectedCategory, isFeatured, dispatch, debouncedSearch]);

  return (
    <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
      <div className="flex flex-wrap gap-3 items-center">
        <select
          name="category"
          value={selectedCategory ?? ""}
          onChange={handleCategoryChange}
          className="border px-3 py-1 rounded-md text-sm"
          required
        >
          <option value="">All Categories</option>
          {categories.map((category) => {
            return (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            );
          })}
        </select>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={isFeatured}
            onChange={handleFeaturedChange}
          />
          Featured
        </label>
      </div>
      <div className="flex gap-4 w-full md:w-auto">
        <input
          type="text"
          placeholder="Search product"
          value={searchTerm}
          onChange={(e)=> setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setSearchTerm(searchTerm)
            }
          }}
          className="border px-3 py-1 rounded-md w-full md:w-60 text-sm focus:outline-none"
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
