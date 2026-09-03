import ConfirmButton from "@/components/buttons/ConfirmButton";
import { useUnsavedChanges } from "@/hooks/useUnsavedChanges";
import { useAppDispatch } from "@/redux/hooks";
import { saveCategory } from "@/redux/slices/categorySlice";
import { Category, CategoryFormData } from "@/types/category";
import axiosInstance from "@/utils/axiosInstance";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import React, { useCallback, useState } from "react";
import { toast } from "react-toastify";

interface CategoryProps {
  title: string;
  setShowCategoryForm: React.Dispatch<React.SetStateAction<boolean>>;
  isEdit?: boolean;
  initialData?: Category;
}

const CategoryForm: React.FC<CategoryProps> = ({
  title,
  setShowCategoryForm,
  isEdit = false,
  initialData
}) => {
  const [formData, setFormData] = useState<CategoryFormData>({
    name: initialData?.name || "",
    description: initialData?.description || "",
    parentCategory: initialData?.parentCategory
       ? {
        _id: initialData.parentCategory._id,
        name: initialData.parentCategory.name,
      }
    : null,
    image: initialData?.image
    ? {
      url: initialData.image.url,
      public_id: initialData.image.public_id || "", 
    }
    : null,
  });
  const dispatch = useAppDispatch();
  const [isDirty, setIsDirty] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setIsDirty(true);
  };

  const handleImageUpload = async (result: any) => {
    const newImage = {
      url: result.info.secure_url,
      public_id: result.info.public_id,
    }

    let oldPublicId: string | undefined;
    const originalPublicId = initialData?.image?.public_id;

    setFormData((prev) => {
      oldPublicId = prev.image?.public_id;
      return {
        ...prev,
        image: newImage
      }
    });
    setIsDirty(true);

    if (oldPublicId && oldPublicId !== newImage.public_id && oldPublicId !== originalPublicId) {
      try {
        await axiosInstance.delete(`/api/products/delete-image/${oldPublicId}`);
      } catch (err) {
        console.error("Failed to delete replaced image from Cloudinary", err);
      }
    }
  };

  const handleImageDelete = async (publicId: string) => {
    try {
      await axiosInstance.delete(`/api/products/delete-image/${publicId}`);
      setFormData((prev) => ({
        ...prev,
        image: null,
      }));
      setIsDirty(true);
    } catch (error) {
      console.error("Failed to delete image", error);
    }
  };

  const cleanupOrphanedImage = useCallback(async () => {
    const currentId = formData.image?.public_id;
    const originalId = initialData?.image?.public_id;
    if (currentId && currentId !== originalId) {
      try {
        await axiosInstance.delete(`/api/products/delete-image/${currentId}`);
      } catch (err) {
        console.error("Failed to clean up orphaned category image", err);
      }
    }
  }, [formData.image, initialData]);

  const {guardedAction} = useUnsavedChanges(isDirty, cleanupOrphanedImage);
  const handleBack = () => guardedAction(() => setShowCategoryForm(false));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await dispatch(
        saveCategory({
          formData,
          categoryId: isEdit ? initialData?._id : undefined,
        }),
      ).unwrap();

      toast.success(isEdit ? "Category updated successfully" : "Category created successfully");
      setIsDirty(false);
      setFormData({
        name: "",
        description: "",
        parentCategory: null,
        image: null,
      });
      setShowCategoryForm(false);
    } catch (message: any) {
      if (message === "Category already exists") {
        toast.error(message);
      } else {
        toast.error("Something went wrong, Try again");
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-md">
      <button
        onClick={handleBack}
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
            value={formData.parentCategory?.name || ""}
            onChange={handleChange}
            placeholder="Optional"
            className="w-full border px-4 py-2 rounded-md focus:outline-none"
            readOnly={true}
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
                {isEdit && formData?.image?.url ? 'Change' : 'Upload'} Image
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
