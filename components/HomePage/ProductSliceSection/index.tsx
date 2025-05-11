"use client";
import ProductBox from "@/components/ProductBox";
import { ProductResponse } from "@/types/product";
import React from "react";
interface ProductSlideSectionProps {
  allProductSlideSections: ProductResponse;
}

const ProductSlideSection: React.FC<ProductSlideSectionProps> = ({
  allProductSlideSections,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
      {allProductSlideSections.products.map((product) => {
        return (
          <ProductBox key={product._id} product={product}/>
        );
      })}
    </div>
  );
};

export default ProductSlideSection;
