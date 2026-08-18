"use client";
import LoadingScreen from "@/components/LoadingScreen";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchCategories,
  setSelectedCategory,
} from "@/redux/slices/categorySlice";
import { fetchProducts } from "@/redux/slices/productSlice";
import { RiArrowDropDownLine } from "react-icons/ri";
import React, { useEffect, useState } from "react";

const CategorySidebar = () => {
  const dispatch = useAppDispatch();
  const { categories, loading, error } = useAppSelector(
    (state) => state.categories,
  );
  const { selectedCategory } = useAppSelector((state) => state.categories);
  const [isShowCategories, setIsShowCategories] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (loading) return <LoadingScreen />;
  if (error) return <p>Error: {error}</p>;

  const handleCategory = (id: string) => {
    dispatch(setSelectedCategory(id));
    dispatch(fetchProducts({ category: id }));
  };

  const selectedCategoryName = categories.find((category) => category._id === selectedCategory)?.name;

  return (
    <aside className="storefront-card w-full shrink-0 p-4 lg:sticky lg:top-24 lg:w-60 lg:self-start">
      <div 
      onClick={() => setIsShowCategories(!isShowCategories)}
      className="mb-4 border-b border-mist pb-3 flex items-center justify-between max-lg:cursor-pointer">
        <p className="font-display text-xl font-semibold text-ink flex items-center gap-1">
          Categories
          {!isShowCategories && selectedCategoryName && (
            <span className="hidden max-lg:inline text-ink/50 font-normal text-sm">
              / {selectedCategoryName}
            </span>
          )}
        </p>
        <RiArrowDropDownLine className="hidden max-lg:block text-ink/75 text-2xl" />
      </div>
      <ul className={`space-y-1 text-sm ${isShowCategories ? "block" : "hidden"} lg:block`}>
        {categories.map((category) => {
          const longCategory = category?.name.length > 20;
          return (
            <li
              title={longCategory ? category.name : ""}
              key={category._id}
              onClick={() => {
                handleCategory(category._id);
                setIsShowCategories(false);
              }}
              className={`w-full block cursor-pointer text-nowrap px-3 py-2 text-[15px] transition-all duration-200 storefront-focus
              ${
                selectedCategory === category._id
                  ? "bg-laurel text-pearl font-semibold"
                  : "text-ink/75 hover:bg-mist/70 hover:text-ink"
              }`}
            >
              {longCategory
                ? category.name.slice(0, 20) + "..."
                : category.name}
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default CategorySidebar;
