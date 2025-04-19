"use client"
import AdminSidebar from '@/components/adminSidebar';
import ConfirmButton from '@/components/buttons/ConfirmButton';
import axiosInstance from '@/utils/axiosInstance';
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import React, { useState } from 'react'

interface CloudinaryImage {
    url: string;
    public_id: string;
  }

const initialFormData = {
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    images: [] as CloudinaryImage[],
    is_featured: "",
  };

const NewProductAdd = () => {
    const [formData, setFormData] = useState(initialFormData);

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

    const handleImageDelete = async (publicId: string) => {
        try {
          await axiosInstance.delete(`/api/products/delete-image/${publicId}`);
          setFormData((prev) => ({
            ...prev,
            images: prev.images.filter((img) => img.public_id !== publicId),
          }));
        } catch (error) {}
      };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
          const payload = {
            ...formData,
            price: Number(formData.price),
            stock: Number(formData.stock),
            is_featured:
              formData.is_featured === "true" || formData.is_featured === "1",
          };
    
          await axiosInstance.post(`/api/upload-product`, payload);
    
          setFormData({
            name: "",
            description: "",
            price: "",
            category: "",
            stock: "",
            images: [],
            is_featured: "",
          });
        } catch (error) {}
      };

  return (
    <div className="adminMainSection">
      <AdminSidebar />
      <form onSubmit={handleSubmit}>
        <div>
          <p>Title:</p>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <p>Description:</p>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div>
          <p>Price</p>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <p>Categroy</p>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <p>Stock</p>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <p>Image</p>
          <CldUploadWidget
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || ""}
            onSuccess={handleImageUpload}
          >
            {({ open }: { open: () => void }) => (
              <button
                type="button"
                className="text-green-500"
                onClick={() => open()}
              >
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
                  className="text-red-500 absolute top-0 right-0"
                >
                  ❌
                </button>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p>Featured</p>
          <input
            type="text"
            name="is_featured"
            value={formData.is_featured}
            onChange={handleChange}
            required
          />
        </div>
        <ConfirmButton buttonText="Upload" type="submit" />
      </form>
    </div>
  )
}

export default NewProductAdd