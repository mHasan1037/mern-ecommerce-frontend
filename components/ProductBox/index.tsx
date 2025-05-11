import { ProductType } from "@/types/product";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import AddWishList from "../AddWishList";
import AddToCart from "../AddToCart";
import ConfirmButton from "../buttons/ConfirmButton";

interface ProductBoxProps {
  product: ProductType;
}

const ProductBox: React.FC<ProductBoxProps> = ({ product }) => {
  const router = useRouter();
  return (
    <div
      key={product._id}
      className="relative bg-gray-50 border border-gray-200 rounded-lg shadow-sm p-4 hover:shadow-md transition duration-300 flex flex-col gap-4"
    >
      <div className="w-full h-40">
        <Image
          src={product.images[0]?.url}
          alt={product.name}
          width={200}
          height={200}
          className="w-full h-full object-contain"
        />
      </div>
      <p
        className="cursor-pointer text-mainBg2 font-bold h-10"
        onClick={() => router.push(`/${product._id}`)}
      >
        {product.name.length > 40
          ? `${product.name.slice(0, 40)}...`
          : product.name}
      </p>
      <div className="flex justify-between">
        <p>Price: {product.price}</p>
        <p>
          {product.ratings?.average === 0
            ? "No ratings"
            : `Rating: ${product.ratings?.average}`}
        </p>
      </div>
      <AddWishList id={product._id} />
      <div className="flex justify-between">
        <AddToCart productId={product._id} quantity={1} />
        <ConfirmButton
          buttonText={"Buy now"}
          onclick={() =>
            router.push(`/checkout?productId=${product._id}&quantity=1`)
          }
        />
      </div>
    </div>
  );
};

export default ProductBox;
