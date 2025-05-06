"use client";
import { useAppSelector } from "@/redux/hooks";
import React from "react";
import ProductBox from "../ProductBox";

const ProductsSection = () => {
  const { productsInfo, loading, error } = useAppSelector(
    (state) => state.products
  );

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error fetching category products: {error}</p>;

  if(productsInfo?.products.length === 0){
    return <h1>No product found</h1>
  }

  return (
    <div className="flex gap-2">
      {productsInfo &&
        productsInfo.products.map((product) => {
          return <ProductBox product={product} key={product._id}/>;
        })}
    </div>
  );
};

export default ProductsSection;
