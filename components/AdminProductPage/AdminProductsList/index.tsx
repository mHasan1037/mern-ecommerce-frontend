"use client";
import React, { useState, useEffect } from "react";
import style from "./adminProductList.module.css";
import axiosInstance from "@/utils/axiosInstance";
import { ProductResponse } from "@/types/product";
import { MdEdit, MdDelete } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchProducts } from "@/redux/slices/productSlice";
import { toast } from "react-toastify";
import LoadingContainer from "@/components/LoadingScreen/LoadingContainer";

const AdminProductsList = () => {
  const dispatch = useAppDispatch();
  const { productsInfo, loading, error } = useAppSelector(
    (state) => state.products
  );
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const selectedCategory = useAppSelector(
    (state) => state.categories.selectedCategory
  );
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
      toast.success("Login to your account");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    dispatch(fetchProducts({ category: selectedCategory ?? undefined }));
  }, [selectedCategory, dispatch]);

  const handleDeleteProduct = async (id: string) => {
    try {
      const productToDelete = productsInfo?.products.find(
        (prod) => prod._id === id
      );

      if (!productToDelete) return;

      for (const img of productToDelete.images) {
        await axiosInstance.delete(
          `/api/products/delete-image/${img?.public_id}`
        );
      }

      await axiosInstance.delete(`/api/products/${id}`);

      dispatch(fetchProducts({ category: selectedCategory ?? undefined }));
    } catch (error) {
      console.error("Error deleting product", error);
    }
  };

  if (loading) return <LoadingContainer />;
  if (error) return <p>Error fetching products: {error}</p>;

  return (
    <div className="bg-white p-6 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4">All Products</h2>
      <div>
        {!productsInfo ? (
          <LoadingContainer />
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border border-gray-200">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="px-4 py-2 border">Title</th>
                  <th className="px-4 py-2 border">Category</th>
                  <th className="px-4 py-2 border">Stock</th>
                  <th className="px-4 py-2 border">Price</th>
                  <th className="px-4 py-2 border">Ratings</th>
                  <th className="px-4 py-2 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {productsInfo.products.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50">
                    <td
                      className="px-4 py-2 border cursor-pointer text-mainBg2 hover:underline"
                      onClick={() => router.push(`/${product._id}`)}
                    >
                      {product.name}
                    </td>
                    <td className="px-4 py-2 border">
                      {product.category?.name}
                    </td>
                    <td className="px-4 py-2 border">{product.stock}</td>
                    <td className="px-4 py-2 border">${product.price}</td>
                    <td className="px-4 py-2 border">
                      {product.ratings?.average ?? 0}
                    </td>
                    <td className="px-4 py-2 border">
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            router.push(`/admin/product/edit/${product._id}`)
                          }
                          className="text-blue-600 hover:text-blue-800 transition"
                        >
                          <MdEdit size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product._id)}
                          className="text-red-600 hover:text-red-800 transition"
                        >
                          <MdDelete size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProductsList;
