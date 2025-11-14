"use client";
import ConfirmButton from "@/components/buttons/ConfirmButton";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchCategories } from "@/redux/slices/categorySlice";
import { ProductFormDataType } from "@/types/product";
import axiosInstance from "@/utils/axiosInstance";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface ProductFormProps {
  initialData?: ProductFormDataType;
  onSubmit: (data: ProductFormDataType) => Promise<void>;
  mode?: "create" | "edit";
}

const defaultFormData: ProductFormDataType = {
  name: "",
  description: "",
  price: "",
  category: "",
  stock: "",
  images: [],
  is_featured: false,
};

const ProductForm: React.FC<ProductFormProps> = ({
  initialData,
  onSubmit,
  mode = "create",
}) => {
  const [formData, setFormData] = useState<ProductFormDataType>(
    initialData || defaultFormData
  );
  const dispatch = useAppDispatch();
  const { categories, loading, error } = useAppSelector(
    (state) => state.categories
  );
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const target = e.target as HTMLInputElement;
      setFormData({ ...formData, [name]: target.checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageUpload = (result: any) => {
    const newImage = {
      url: result.info.secure_url,
      public_id: result.info.public_id,
    };

    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, newImage],
    }));
  };

  const handleImageDelete = async (publicId: string) => {
    try {
      await axiosInstance.delete(`/api/products/delete-image/${publicId}`);
      setFormData((prev) => ({
        ...prev,
        images: prev.images.filter((img) => img.public_id !== publicId),
      }));
    } catch (error) {
      console.error("Failed to delete image", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const uploadingProduct = {
      ...formData,
      category: formData.category || categories[0]?._id || "",
    };
    await onSubmit(uploadingProduct);
    setFormData({
      name: "",
      description: "",
      price: "",
      category: "",
      stock: "",
      images: [],
      is_featured: false,
    });
    router.push("/admin/product");
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-6xl w-full mx-auto bg-white p-6 rounded-md shadow-md space-y-5"
    >
      <h2 className="text-xl font-semibold mb-4">
        {mode === "edit" ? "Edit Product" : "Create Product"}
      </h2>
      <div>
        <h3>Product Name</h3>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Name"
          className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
      <div>
        <h3>Description</h3>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Decription"
          required
          className="w-full min-h-[200px] border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <h3>Price</h3>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            required
            className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <h3>Stock</h3>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            placeholder="Stock"
            required
            className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      <div>
        <h3>Category</h3>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">Select category</option>
          {categories.map((category) => {
            return (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            );
          })}
        </select>
      </div>

      {formData.images.length < 4 && (
        <CldUploadWidget
          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || ""}
          options={{ maxFiles: 4 }}
          onSuccess={handleImageUpload}
        >
          {({ open }: { open: () => void }) => (
            <button
              type="button"
              onClick={() => open()}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition"
            >
              Upload Image
            </button>
          )}
        </CldUploadWidget>
      )}

      <div className="flex flex-wrap gap-4">
        {formData.images.map((img) => (
          <div key={img.public_id} className="relative w-[100px] h-[100px]">
            <Image
              src={img.url}
              alt="Preview"
              width={100}
              height={100}
              className="object-cover rounded-md border"
            />
            <button
              type="button"
              onClick={() => handleImageDelete(img.public_id)}
              className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 text-xs"
            >
              ❌
            </button>
          </div>
        ))}
      </div>

      <label className="inline-flex items-center gap-2 mt-4">
        <input
          type="checkbox"
          name="is_featured"
          id="is_featured"
          checked={formData.is_featured}
          onChange={handleChange}
          className="accent-green-600"
        />
        <span className="text-sm text-gray-700">Mark as featured</span>
      </label>

      <div className="mt-6">
        <ConfirmButton
          buttonText={mode === "edit" ? "Update" : "Upload"}
          type="submit"
        />
      </div>
    </form>
  );
};

export default ProductForm;
