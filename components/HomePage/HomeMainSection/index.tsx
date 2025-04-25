"use client";
import React, { useEffect, useState } from "react";
import ProductSlideSection from "../ProductSliceSection";
import { ProductResponse } from "@/types/product";
import axiosInstance from "@/utils/axiosInstance";

const HomeMainSection = () => {
  const [allProductSlideSections, setAllProductSlideSectionsI] =
    useState<ProductResponse | null>(null);

  useEffect(() => {
    const getAllProductSlideSections = async () => {
      try {
        const allProducts = await axiosInstance.get(
          `/api/products?is_featured=true`
        );
        setAllProductSlideSectionsI(allProducts.data);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };
    getAllProductSlideSections();
  }, []);

  if (!allProductSlideSections) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {allProductSlideSections?.products.length !== 0 && (
        <>
          <h1>Featured products</h1>
          <ProductSlideSection
            allProductSlideSections={allProductSlideSections}
          />
        </>
      )}
    </div>
  );
};

export default HomeMainSection;
