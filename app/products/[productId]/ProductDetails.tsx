"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchProductById } from "@/redux/slices/productSlice";
import AddToCart from "@/components/AddToCart";
import AddWishList from "@/components/AddWishList";
import ConfirmButton from "@/components/buttons/ConfirmButton";
import NewReviewForm from "@/components/NewReviewForm";
import Image from "next/image";
import { useRouter } from "next/navigation";
import LoadingScreen from "@/components/LoadingScreen";
import { toast } from "react-toastify";
import { baseStyle } from "@/app/style";
import { FaCodeCompare } from "react-icons/fa6";
import { stageProductForCompare } from "@/redux/slices/aiChatSlice";
import { openAiChat } from "@/redux/slices/uiSlice";

interface Props {
  productId: string;
}

const ProductDetailClient = ({ productId }: Props) => {
  const [productCartQuantity, setProductCartQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const {
    singleProduct: product,
    singleLoading,
    error,
  } = useAppSelector((state) => state.products);

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductById(productId));
    }
  }, [dispatch, productId]);

  const mainImage = selectedImage || product?.images[0]?.url;

  if (singleLoading) return <LoadingScreen />;
  if (error) return <p>Error: {error}</p>;
  if (!product) return <p>No product found.</p>;

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
    <main className="storefront-page">
      <div className="storefront-shell py-8 md:py-12">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)] lg:gap-12">
          <div className="w-full">
            <div className="relative aspect-square w-full overflow-hidden border border-mist bg-white p-6 shadow-boutique">
              <Image
                src={mainImage as string}
                alt={product?.name || "Product Image"}
                fill
                className="object-contain p-6"
              />
            </div>
            <div className="mt-4 grid grid-cols-4 gap-3 sm:flex">
              {product?.images?.map((img) => (
                <Image
                  key={img.url}
                  src={img.url}
                  alt={product.name}
                  width={70}
                  height={70}
                  onClick={() => setSelectedImage(img.url)}
                  className={`h-20 w-full cursor-pointer border bg-white p-2 object-contain transition duration-200 hover:border-brass hover:shadow-boutique-sm sm:w-20 ${
                    selectedImage === img.url ? "border-brass" : "border-mist"
                  }`}
                />
              ))}
            </div>
          </div>
          <div className="storefront-card space-y-5 p-6 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brass">
              {product?.category?.name}
            </p>
            <h1 className="font-display text-4xl font-semibold leading-tight text-ink md:text-5xl">{product.name}</h1>
            <p className="text-3xl font-semibold text-laurel">
              ${product?.price}
            </p>
            <div className="flex flex-wrap gap-3 border-y border-mist py-4 text-sm text-ink/65">
              <span className="font-semibold text-brass">
                Ratings: {product?.ratings.average}
              </span>
              <span>
                Total review: {product?.ratings?.totalReviews}
              </span>
              <span>Stock: {product?.stock}</span>
            </div>
            {product?.is_featured && (
              <p className="inline-block border border-brass bg-brass/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-laurel">
                Featured
              </p>
            )}
            <div className="flex items-center gap-3">
              <FaCodeCompare
                title="Add to Compare"
                className={baseStyle}
                onClick={handleCompareClick}
              />
              <AddWishList id={product._id} />
            </div>
            <div className="flex flex-col items-start gap-4 border-t border-mist pt-5 sm:flex-row sm:items-center">
              <input
                type="number"
                placeholder="1"
                className="storefront-focus w-24 border border-mist bg-white px-3 py-2 text-center"
                value={productCartQuantity}
                min={1}
                onChange={(e) => setProductCartQuantity(Number(e.target.value))}
              />
              <AddToCart
                productId={product._id}
                quantity={productCartQuantity}
                stock={product.stock}
              />
              <ConfirmButton
                buttonText={"Buy now"}
                onclick={() => {
                  if (isAuthenticated) {
                    router.push(
                      `/checkout?productId=${product._id}&quantity=${productCartQuantity}`,
                    );
                  } else {
                    toast.error("Please log in to place order");
                  }
                }}
              />
            </div>
            <p className="text-base leading-7 text-ink/70">{product?.description}</p>
          </div>
        </div>
      </div>

      <div className="storefront-shell pb-8">
        <NewReviewForm id={product._id} />
      </div>

      {product?.reviews !== null && product?.reviews.length > 0 && (
        <div className="storefront-shell mb-10 space-y-5">
          <h2 className="border-b border-mist pb-3 font-display text-2xl font-semibold text-ink">
            Customer Reviews
          </h2>
          {product?.reviews.map((review, idx) => (
            <div
              key={idx}
              className="border border-mist bg-white/85 p-5 shadow-boutique-sm"
            >
              <p className="font-semibold text-ink">{review?.name}</p>
              {review?.rating && (
                <p className="text-sm text-brass">
                  Rating: {review?.rating} / 5
                </p>
              )}
              {review?.comment && (
                <div className="mt-2 text-ink/70">"{review?.comment}"</div>
              )}
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default ProductDetailClient;
