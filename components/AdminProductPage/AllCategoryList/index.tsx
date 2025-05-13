"use client";
import { fetchCategories } from "@/redux/slices/categorySlice";
import Image from "next/image";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import LoadingContainer from "@/components/LoadingScreen/LoadingContainer";

const AllCategoryList = () => {
  const dispatch = useAppDispatch();
  const { categories, loading, error } = useAppSelector(
    (state) => state.categories
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (loading) return <LoadingContainer />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {categories.map((category) => {
        return (
          <div
            key={category._id}
            className="bg-white border rounded-md shadow-sm p-4 flex gap-2"
          >
            <div className="w-[35%] flex flex-col gap-2">
              <Image
                alt={category.name}
                src={category?.image?.url}
                width={100}
                height={100}
                className="rounded-md object-cover border"
              />
              <h1 className="font-semibold text-md">{category.name}</h1>
            </div>
            <div>
              <p className="text-sm text-gray-600">{category.description}</p>
              <div className="flex gap-2 mt-2">
                <button className="text-blue-600 hover:underline text-sm">
                  Edit
                </button>
                <button className="text-red-600 hover:underline text-sm">
                  Delete
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AllCategoryList;
