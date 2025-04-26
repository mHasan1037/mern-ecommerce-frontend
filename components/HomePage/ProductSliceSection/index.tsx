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
    <div className="flex gap-5">
      {allProductSlideSections.products.map((product) => {
        return (
          <ProductBox product={product}/>
        );
      })}
    </div>
  );
};

export default ProductSlideSection;
