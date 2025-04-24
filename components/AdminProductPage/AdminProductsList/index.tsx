"use client";
import React, { useState, useEffect } from "react";
import style from "./adminProductList.module.css";
import axiosInstance from "@/utils/axiosInstance";
import { ProductType } from "@/types/product";
import { MdEdit, MdDelete } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";

interface ProductResponse {
  total: number;
  page: number;
  pages: number;
  products: ProductType[];
}

const AdminProductsList = () => {
  const [allProductInfo, setAllProductsInfo] = useState<ProductResponse | null>(
    null
  );
  const selectedCategory = useAppSelector(state => state.categories.selectedCategory);
  const router = useRouter();

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const params = new URLSearchParams();
        if(selectedCategory) params.append('category', selectedCategory);

        const allProducts = await axiosInstance.get(`/api/products?${params.toString()}`);
        setAllProductsInfo(allProducts.data);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };
    getAllProducts();
  }, [selectedCategory]);

  const handleDeleteProduct = async (id: string) => {
    try {
      const productToDelete = allProductInfo?.products.find(
        (prod) => prod._id === id
      );

      if (!productToDelete) return;

      for (const img of productToDelete.images) {
        await axiosInstance.delete(
          `/api/products/delete-image/${img?.public_id}`
        );
      }

      await axiosInstance.delete(`/api/products/${id}`);

      setAllProductsInfo((prev) =>
        prev
          ? {
              ...prev,
              products: prev.products.filter((prod) => prod._id !== id),
              total: prev.total - 1,
            }
          : null
      );
    } catch (error) {
      console.error("Error deleting product", error);
    }
  };

  return (
    <div>
      <h1>All products</h1>
      <div>
        {!allProductInfo ? (
          <p>Loading...</p>
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
            {allProductInfo.products.map((product) => {
              return (
                <tr key={product._id}>
                  <td>{product.name}</td>
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
