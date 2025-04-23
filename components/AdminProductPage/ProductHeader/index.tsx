"use client";
import ConfirmButton from "@/components/buttons/ConfirmButton";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchCategories } from "@/redux/slices/categorySlice";

const ProductHeader = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { categories, loading, error } = useAppSelector(
    (state) => state.categories
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="flex justify-between items-start w-full mb-10">
      <select
        name="category"
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
