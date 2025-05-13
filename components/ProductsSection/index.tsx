"use client";
import { useAppSelector } from "@/redux/hooks";
import React from "react";
import ProductBox from "../ProductBox";
import LoadingContainer from "../LoadingScreen/LoadingContainer";
import NoProductFound from "../HomePage/NoProductFound";

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
    return <NoProductFound />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2">
      {productsInfo &&
        productsInfo.products.map((product) => {
          return <ProductBox product={product} key={product._id} />;
        })}
    </div>
  );
};

export default ProductsSection;
