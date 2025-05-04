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
          value={searchTerm}
          onChange={(e)=> setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setSearchTerm(searchTerm)
            }
          }}
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
