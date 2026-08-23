"use client";
import { Category, fetchCategories } from "@/redux/slices/categorySlice";
import Image from "next/image";

interface AllCategoryListProps{
  onEdit: (category: Category) => void;
  onDelete: (id: string) => void;
  categories: Category[]
}

const AllCategoryList: React.FC<AllCategoryListProps> = ({onEdit, onDelete, categories}) => {


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {categories.map((category) => {
        return (
          <div
            key={category._id}
            className="bg-white border rounded-md shadow-sm p-4 flex gap-2"
          >
            <div className="w-[35%] flex flex-col gap-2">
              {category?.image ? (
                <Image
                  alt={category.name}
                  src={category?.image?.url}
                  width={100}
                  height={100}
                  className="rounded-md object-cover border"
                />
              ) : (
                <div className="w-[100px] h-[100px] mt-2 flex items-center justify-center border rounded-md text-xs text-gray-400 bg-gray-50">
                  No image
                </div>
              )}
              <h1 className="font-semibold text-md">{category.name}</h1>
            </div>
            <div>
              <p className="text-sm text-gray-600">{category.description}</p>
              <div className="flex gap-2 mt-2">
                <button
                  className="text-blue-600 hover:underline text-sm"
                  onClick={() => onEdit(category)}
                >
                  Edit
                </button>
                <button
                  className="text-red-600 hover:underline text-sm"
                  onClick={() => onDelete(category._id)}
                >
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
