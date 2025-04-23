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

const CategoryForm: React.FC<CategoryProps> = ({ title, setShowCategoryForm }) => {
  const [formData, setFormData] = useState<CategoryFormData>({
    name: "",
    description: "",
    parentCategory: "",
    image: null
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
    try{
        e.preventDefault();
        await axiosInstance.post(`/api/categories`, formData)
        setFormData({
          name: "",
          description: "",
          parentCategory: "",
          image: null,
        });
        setShowCategoryForm(false);
    }catch(error){

    }

  };

  return (
    <div>
      <button onClick={()=> setShowCategoryForm(false)}>Go to categories</button>
      <h1>{title}</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <p>Name:</p>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <p>Description:</p>
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div>
          <p>Parent Category:</p>
          <input
            type="text"
            name="parentCategory"
            value={formData.parentCategory}
            onChange={handleChange}
          />
        </div>
        <CldUploadWidget
          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || ""}
          options={{ maxFiles: 1 }}
          onSuccess={handleImageUpload}
        >
          {({ open }: { open: () => void }) => (
            <button type="button" onClick={() => open()}>
              Upload Image
            </button>
          )}
        </CldUploadWidget>
        {formData.image && (
          <div key={formData?.image.public_id} className="relative">
            <Image
              src={formData?.image.url}
              alt="Preview"
              width={100}
              height={100}
            />
            <button
              type="button"
              onClick={() => handleImageDelete(formData.image!.public_id)}
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
