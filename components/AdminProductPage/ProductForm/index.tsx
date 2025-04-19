"use client";
import ConfirmButton from "@/components/buttons/ConfirmButton";
import { ProductFormDataType } from "@/types/product";
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
  is_featured: "",
};

const ProductForm: React.FC<ProductFormProps> = ({
  initialData,
  onSubmit,
  mode = "create",
}) => {
  const [formData, setFormData] = useState<ProductFormDataType>(
    initialData || defaultFormData
  );
  const router = useRouter();

  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

  const handleImageDelete = (publicId: string) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((img) => img.public_id !== publicId),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
    setFormData({
      name: "",
      description: "",
      price: "",
      category: "",
      stock: "",
      images: [],
      is_featured: "",
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
      <input
        type="text"
        name="category"
        value={formData.category}
        onChange={handleChange}
        placeholder="Category"
        required
      />
      <input
        type="number"
        name="stock"
        value={formData.stock}
        onChange={handleChange}
        placeholder="Stock"
        required
      />

      <CldUploadWidget
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || ""}
        onSuccess={handleImageUpload}
      >
        {({ open }: { open: () => void }) => (
          <button type="button" onClick={() => open()}>
            Upload Image
          </button>
        )}
      </CldUploadWidget>

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

      <input
        type="text"
        name="is_featured"
        value={formData.is_featured}
        onChange={handleChange}
        placeholder="Is featured"
        required
      />

      <ConfirmButton
        buttonText={mode === "edit" ? "Update" : "Upload"}
        type="submit"
      />
    </form>
  );
};

export default ProductForm;
