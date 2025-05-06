"use client";
import React, { useEffect } from "react";
import ProductSlideSection from "../ProductSliceSection";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchProducts } from "@/redux/slices/productSlice";

const HomeMainSection = () => {
  const dispatch = useAppDispatch();
  const {productsInfo, loading, error} = useAppSelector((state) => state.products)

  useEffect(() => {
    dispatch(fetchProducts({ is_featured: true }))
  }, [dispatch]);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error fetching products: {error}</p>;

  return (
    <div>
      {productsInfo && (
        <>
          <h1>Featured products</h1>
          <ProductSlideSection
            allProductSlideSections={productsInfo}
          />
        </>
      )}
    </div>
  );
};

export default HomeMainSection;
