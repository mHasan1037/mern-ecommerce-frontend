import { ProductType } from "@/types/product";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface ProductBoxProps {
  product: ProductType;
}

const ProductBox: React.FC<ProductBoxProps> = ({ product }) => {
   const router = useRouter();
  return (
    <div key={product._id} className="cursor-pointer" onClick={()=> router.push(`/${product._id}`)}>
      <Image
        src={product.images[0]?.url}
        width={100}
        height={100}
        alt={product.name}
      />
      <p>{product.name}</p>
      <div className="flex justify-between">
        <p>{product.price}</p>
        <p>{product.ratings?.average}</p>
      </div>
    </div>
  );
};

export default ProductBox;
