"use client";
import { useAppSelector } from "@/redux/hooks";
import React from "react";
import ProductBox from "../ProductBox";
import LoadingContainer from "../LoadingScreen/LoadingContainer";

const ProductsSection = () => {
  const { productsInfo, loading, error } = useAppSelector(
    (state) => state.products
  );

  if (loading)
    return (
      <div className="flex justify-center items-center h-[75vh] w-[80%]">
        <LoadingContainer />
      </div>
    );
  if (error) return <p>Error fetching category products: {error}</p>;

  if (productsInfo?.products.length === 0) {
    return <h1>No product found</h1>;
  }

  return (
    <div className="flex gap-2">
      {productsInfo &&
        productsInfo.products.map((product) => {
          return <ProductBox product={product} key={product._id} />;
        })}
    </div>
  );
};

export default ProductsSection;
