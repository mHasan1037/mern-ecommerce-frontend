"use client";
import AdminProductsList from "@/components/AdminProductPage/AdminProductsList";
import ProductHeader from "@/components/AdminProductPage/ProductHeader";
import AdminSidebar from "@/components/adminSidebar";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import { fetchProducts } from "@/redux/slices/productSlice";
import axiosInstance from "@/utils/axiosInstance";
import Pagination from "@/components/Pagination";

const LIMIT = 20;

const Product = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [page, setPage] = useState(1);

  const { productsInfo, loading, error } = useAppSelector(
    (state) => state.products,
  );
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const selectedCategory = useAppSelector(
    (state) => state.categories.selectedCategory,
  );

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
      toast.success("Login to your account");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    setPage(1);
  }, [selectedCategory]);

  useEffect(() => {
    dispatch(
      fetchProducts({
        category: selectedCategory ?? undefined,
        page,
        limit: LIMIT,
      }),
    );
  }, [selectedCategory, page, dispatch]);

  const handleDeleteProduct = async (id: string) => {
    try {
      const productToDelete = productsInfo?.products.find(
        (prod) => prod._id === id,
      );
      if (!productToDelete) return;

      for (const img of productToDelete.images) {
        await axiosInstance.delete(
          `/api/products/delete-image/${img?.public_id}`,
        );
      }

      await axiosInstance.delete(`/api/products/${id}`);

      dispatch(
        fetchProducts({
          category: selectedCategory ?? undefined,
          page,
          limit: LIMIT,
        }),
      );
    } catch (error) {
      console.error("Error deleting product", error);
    }
  };

  return (
    <div className="adminMainSection">
      <AdminSidebar />
      <div className="w-full">
        <ProductHeader />
        <AdminProductsList
          products={productsInfo?.products}
          loading={loading}
          error={error}
          onDelete={handleDeleteProduct}
          onEdit={(id) => router.push(`/admin/product/edit/${id}`)}
          onView={(id) => router.push(`/products/${id}`)}
        />
        {productsInfo && productsInfo.pages > 1 && (
          <div className="mt-4 flex justify-center">
            <Pagination
              totalPages={productsInfo.pages}
              page={page}
              setPage={setPage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
