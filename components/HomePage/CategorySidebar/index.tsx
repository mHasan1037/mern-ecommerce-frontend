"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchCategories } from "@/redux/slices/categorySlice";
import React, { useEffect } from "react";

const CategorySidebar = () => {
  const dispatch = useAppDispatch();
  const { categories, loading, error } = useAppSelector(
    (state) => state.categories
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (loading) return <p>Loading</p>;
  if (error) return <p>Error: {error}</p>;

  return <div>
    {categories.map((category) => (
        <div>{category.name}</div>
    ))}
  </div>;
};

export default CategorySidebar;
