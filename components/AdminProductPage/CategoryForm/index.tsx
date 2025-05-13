import ConfirmButton from "@/components/buttons/ConfirmButton";
import { CloudinaryImage } from "@/types/product";
import axiosInstance from "@/utils/axiosInstance";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import React, { useState } from "react";

interface CategoryProps {
  title: string;
  setShowCategoryForm: React.Dispatch<React.SetStateAction<boolean>>;
}

interface CategoryFormData {
  name: string;
  description: string;
  parentCategory: string;
  image: CloudinaryImage | null;
}

const CategoryForm: React.FC<CategoryProps> = ({
  title,
  setShowCategoryForm,
}) => {
  const [formData, setFormData] = useState<CategoryFormData>({
    name: "",
    description: "",
    parentCategory: "",
    image: null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (result: any) => {
    const newImage = {
      url: result.info.secure_url,
      public_id: result.info.public_id,
    };

    setFormData((prev) => ({
      ...prev,
      image: newImage,
    }));
  };

  const handleImageDelete = async (publicId: string) => {
    try {
      await axiosInstance.delete(`/api/products/delete-image/${publicId}`);
      setFormData((prev) => ({
        ...prev,
        image: null,
      }));
    } catch (error) {
      console.error("Failed to delete image", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      await axiosInstance.post(`/api/categories`, formData);
      setFormData({
        name: "",
        description: "",
        parentCategory: "",
        image: null,
      });
      setShowCategoryForm(false);
    } catch (error) {}
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-md">
      <button
        onClick={() => setShowCategoryForm(false)}
        className="mb-4 text-sm text-blue-600 hover:underline"
      >
        ← Back to categories
      </button>
      <h1 className="text-xl font-semibold mb-4">{title}</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-1 text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Description</label>
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full min-h-[100px] border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          ></textarea>
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">
            Parent Category
          </label>
          <input
            type="text"
            name="parentCategory"
            value={formData.parentCategory}
            onChange={handleChange}
            placeholder="Optional"
            className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <CldUploadWidget
          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || ""}
          options={{ maxFiles: 1 }}
          onSuccess={handleImageUpload}
        >
          {({ open }: { open: () => void }) => (
            <div>
              <label className="block mb-1 text-sm font-medium">
                Upload image of the category
              </label>
              <button
                type="button"
                onClick={() => open()}
                className="bg-green-600 block hover:bg-green-700 text-white px-4 py-2 rounded-md transition"
              >
                Upload Image
              </button>
            </div>
          )}
        </CldUploadWidget>
        {formData.image && (
          <div
            key={formData?.image.public_id}
            className="relative w-[100px] h-[100px] mt-2"
          >
            <Image
              src={formData?.image.url}
              alt="Preview"
              width={100}
              height={100}
              className="rounded-md object-cover border"
            />
            <button
              type="button"
              onClick={() => handleImageDelete(formData.image!.public_id)}
              className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 text-xs"
            >
              ❌
            </button>
          </div>
        )}
        <ConfirmButton buttonText={title} type="submit" />
      </form>
    </div>
  );
};

export default CategoryForm;
