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
  const {productsInfo, loading, error} = useAppSelector((state) => state.products);
  const { isAuthenticated }= useAppSelector((state) => state.auth);
  const selectedCategory = useAppSelector(state => state.categories.selectedCategory);
  const router = useRouter();



  useEffect(()=>{
    if(!isAuthenticated){
      router.push('/');
      toast.success('Login to your account')
    }
  }, [isAuthenticated])

  useEffect(() => {
    dispatch(fetchProducts({category: selectedCategory ?? undefined }))
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

      dispatch(fetchProducts({category: selectedCategory ?? undefined }));
    } catch (error) {
      console.error("Error deleting product", error);
    }
  };

  if (loading) return <LoadingContainer />;
  if (error) return <p>Error fetching products: {error}</p>;

  return (
    <div>
      <h1>All products</h1>
      <div>
        {!productsInfo ? (
          <LoadingContainer />
        ) : (
          <table>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Stock status</th>
              <th>Price</th>
              <th>Ratings</th>
              <th>Action</th>
            </tr>
            {productsInfo.products.map((product) => {
              return (
                <tr key={product._id}>
                  <td className="cursor-pointer hover:text-mainBg2" onClick={()=> router.push(`/${product._id}`)}>{product.name}</td>
                  <td>{product.category?.name}</td>
                  <td>{product.stock}</td>
                  <td>{product.price}</td>
                  <td>{product.ratings?.average}</td>
                  <td className="flex gap-2">
                    <button
                      onClick={() =>
                        router.push(`/admin/product/edit/${product._id}`)
                      }
                    >
                      <MdEdit />
                    </button>
                    <button onClick={() => handleDeleteProduct(product._id)}>
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              );
            })}
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminProductsList;
