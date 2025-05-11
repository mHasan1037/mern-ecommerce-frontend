"use client";
import LoadingScreen from "@/components/LoadingScreen";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchCategories,
  setSelectedCategory,
} from "@/redux/slices/categorySlice";
import { fetchProducts } from "@/redux/slices/productSlice";
import React, { useEffect } from "react";

const CategorySidebar = () => {
  const dispatch = useAppDispatch();
  const { categories, loading, error } = useAppSelector(
    (state) => state.categories
  );
  const { selectedCategory } = useAppSelector(state => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (loading) return <LoadingScreen />;
  if (error) return <p>Error: {error}</p>;

  const handleCategory = (id: string) => {
    dispatch(setSelectedCategory(id));
    dispatch(fetchProducts({ category: id }));
  };

  return (
    <div className="w-48 bg-white p-4 shadow rounded-md">
      <ul className="space-y-2 text-sm">
        {categories.map((category) => {
          const longCategory = category?.name.length > 20;
          return (
            <li
              title={longCategory ? category.name : ""}
              key={category._id}
              onClick={() => handleCategory(category._id)}
              className={`w-full block cursor-pointer text-nowrap text-[16px] px-2 py-1 rounded-md transition-all duration-200
              ${
                selectedCategory === category._id
                  ? "text-mainBg2 underline font-medium"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              {longCategory
                ? category.name.slice(0, 20) + "..."
                : category.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CategorySidebar;
