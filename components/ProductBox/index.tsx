import { ProductType } from "@/types/product";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import AddWishList from "../AddWishList";
import AddToCart from "../AddToCart";
import ConfirmButton from "../buttons/ConfirmButton";
import { useAppSelector } from "@/redux/hooks";
import { toast } from "react-toastify";

interface ProductBoxProps {
  product: ProductType;
}

const ProductBox: React.FC<ProductBoxProps> = ({ product }) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
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
        onClick={() => router.push(`/products/${product._id}`)}
        title={product.name}
      >
        {product.name.length > 40
          ? `${product.name.slice(0, 40)}...`
          : product.name}
      </p>
      <div className="flex justify-between">
        <p>Price: ${product.price}</p>
        <p>
          {product.ratings?.average === 0
            ? "No ratings"
            : `Rating: ${product.ratings?.average}`}
        </p>
      </div>
      <div className="absolute top-3 right-3">
        <AddWishList id={product._id} />
      </div>
      <div className="flex justify-between">
        <AddToCart productId={product._id} quantity={1} stock={product.stock}/>
        <ConfirmButton
          buttonText={"Buy now"}
          onclick={() => {
            if (isAuthenticated) {
              router.push(`/checkout?productId=${product._id}&quantity=1`);
            } else {
              toast.error("Please log in to place order");
            }
          }}
        />
      </div>
    </div>
  );
};

export default ProductBox;
