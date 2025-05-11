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
    <div>
      {categories.map((category) => (
        <div
          key={category._id}
          onClick={() => handleCategory(category._id)}
          className="cursor-pointer text-nowrap"
        >
          {category.name}
        </div>
      ))}
    </div>
  );
};

export default CategorySidebar;
