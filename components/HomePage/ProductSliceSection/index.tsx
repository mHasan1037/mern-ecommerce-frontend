"use client";
import { ProductResponse } from "@/types/product";
import Image from "next/image";
import React from "react";
interface ProductSlideSectionProps {
  allProductSlideSections: ProductResponse;
}

const ProductSlideSection: React.FC<ProductSlideSectionProps> = ({
  allProductSlideSections,
}) => {
  return (
    <div>
      {allProductSlideSections.products.map((product) => {
        return (
          <div key={product._id}>
            <Image
              src={product.images[0]?.url}
              width={100}
              height={100}
              alt={product.name}
            />
            <p>{product.name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ProductSlideSection;
