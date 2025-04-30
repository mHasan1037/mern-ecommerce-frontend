import { ProductType } from "@/types/product";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import AddWishList from "../AddWishList";
import AddToCart from "../AddToCart";

interface ProductBoxProps {
  product: ProductType;
}

const ProductBox: React.FC<ProductBoxProps> = ({ product }) => {
  const router = useRouter();
  return (
    <div key={product._id}>
      <Image
        src={product.images[0]?.url}
        width={100}
        height={100}
        alt={product.name}
      />
      <p
        className="cursor-pointer"
        onClick={() => router.push(`/${product._id}`)}
      >
        {product.name}
      </p>
      <div className="flex justify-between">
        <p>{product.price}</p>
        <p>{product.ratings?.average}</p>
      </div>
      <AddWishList id={product._id} />
      <AddToCart productId={product._id} quantity={1} />
    </div>
  );
};

export default ProductBox;
