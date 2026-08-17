import { ProductType } from "@/types/product";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import AddWishList from "../AddWishList";
import AddToCart from "../AddToCart";
import ConfirmButton from "../buttons/ConfirmButton";
import { useAppSelector } from "@/redux/hooks";
import { toast } from "react-toastify";
import { useAppDispatch } from "@/redux/hooks";
import { stageProductForCompare } from "@/redux/slices/aiChatSlice";
import { openAiChat } from "@/redux/slices/uiSlice";
import { FaCodeCompare } from "react-icons/fa6";
import { baseStyle } from "@/app/style";

interface ProductBoxProps {
  product: ProductType;
}

const ProductBox: React.FC<ProductBoxProps> = ({ product }) => {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const router = useRouter();

  const handleCompareClick = () => {
    dispatch(openAiChat());
    dispatch(
      stageProductForCompare({
        id: product._id,
        name: product.name,
        image: product.images?.[0]?.url ?? null,
      }),
    );
  };
  return (
    <div
      key={product._id}
      className="group relative flex min-h-[430px] flex-col gap-4 border border-mist bg-white/90 p-4 shadow-boutique-sm transition duration-300 ease-out hover:-translate-y-1 hover:border-brass/60 hover:shadow-boutique"
    >
      <div
        className="h-56 w-full cursor-pointer bg-pearl p-5 transition duration-300 group-hover:bg-mist/60"
        onClick={() => router.push(`/products/${product._id}`)}
      >
        <Image
          src={product.images[0]?.url}
          alt={product.name}
          width={200}
          height={200}
          className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
        />
      </div>
      <p
        className="h-12 cursor-pointer font-display text-lg font-semibold leading-tight text-ink transition hover:text-laurel"
        onClick={() => router.push(`/products/${product._id}`)}
        title={product.name}
      >
        {product.name.length > 40
          ? `${product.name.slice(0, 40)}...`
          : product.name}
      </p>
      <div className="flex items-end justify-between gap-3 border-t border-mist pt-3 text-sm text-ink/65">
        <p className="font-body text-lg font-semibold text-laurel">${product.price}</p>
        <p className="text-right">
          {product.ratings?.average === 0
            ? "No ratings"
            : `Rating: ${product.ratings?.average}`}
        </p>
      </div>
      <div className="absolute right-4 top-4 flex items-center gap-2 px-2 py-1">
        <FaCodeCompare title="Add to Compare" className={baseStyle} onClick={handleCompareClick} />
        <AddWishList id={product._id} />
      </div>
      <div className="mt-auto flex flex-col gap-2 sm:flex-row sm:justify-between">
        <AddToCart productId={product._id} quantity={1} stock={product.stock} />
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
