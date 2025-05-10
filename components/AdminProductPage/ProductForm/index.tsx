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
    const {name, value, type} = e.target;
    
    if(type === 'checkbox'){
      const target = e.target as HTMLInputElement;
      setFormData({...formData, [name]: target.checked})
    }else{
      setFormData({...formData, [name]: value})
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
      category: formData.category || categories[0]?._id || ""
    }
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <h2>{mode === "edit" ? "Edit Product" : "Create Product"}</h2>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        placeholder="Name"
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Decription"
        required
      />
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Price"
        required
      />
      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
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
      <input
        type="number"
        name="stock"
        value={formData.stock}
        onChange={handleChange}
        placeholder="Stock"
        required
      />

      {formData.images.length < 4 && (
        <CldUploadWidget
          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || ""}
          options={{ maxFiles: 4 }}
          onSuccess={handleImageUpload}
        >
          {({ open }: { open: () => void }) => (
            <button type="button" onClick={() => open()}>
              Upload Image
            </button>
          )}
        </CldUploadWidget>
      )}

      <div className="flex gap-4 mt-4">
        {formData.images.map((img) => (
          <div key={img.public_id} className="relative">
            <Image src={img.url} alt="Preview" width={100} height={100} />
            <button
              type="button"
              onClick={() => handleImageDelete(img.public_id)}
            >
              ❌
            </button>
          </div>
        ))}
      </div>

      <div>
        <label htmlFor="is_featured">Featured:</label>
        <input
          type="checkbox"
          name="is_featured"
          id="is_featured"
          checked={formData.is_featured}
          onChange={handleChange}
        />
      </div>

      <ConfirmButton
        buttonText={mode === "edit" ? "Update" : "Upload"}
        type="submit"
      />
    </form>
  );
};

export default ProductForm;
