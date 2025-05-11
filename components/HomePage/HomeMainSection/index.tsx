"use client";
import React, { useEffect } from "react";
import ProductSlideSection from "../ProductSliceSection";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchProducts } from "@/redux/slices/productSlice";
import LoadingScreen from "@/components/LoadingScreen";

const HomeMainSection = () => {
  const dispatch = useAppDispatch();
  const {productsInfo, loading, error} = useAppSelector((state) => state.products)

  useEffect(() => {
    dispatch(fetchProducts({ is_featured: true }))
  }, [dispatch]);

  if (loading) return <LoadingScreen />;
  if (error) return <p>Error fetching products: {error}</p>;

  return (
    <div className="w-full">
      {productsInfo && (
        <>
          <h2 className="headline">
            Featured Products
          </h2>
          <ProductSlideSection allProductSlideSections={productsInfo} />
        </>
      )}
    </div>
  );
};

export default HomeMainSection;
