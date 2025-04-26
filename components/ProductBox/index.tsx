import { ProductType } from "@/types/product";
import Image from "next/image";
import React from "react";

interface ProductBoxProps {
  product: ProductType;
}

const ProductBox: React.FC<ProductBoxProps> = ({ product }) => {
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
};

export default ProductBox;
