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

interface Props {
  productId: string;
}

const ProductDetailClient = ({ productId }: Props) => {
  const [productCartQuantity, setProductCartQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
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

  return (
    <div>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-10">
          <div className="w-full md:w-1/2">
            <div className="w-[400px] h-[400px] relative rounded-md border overflow-hidden">
              <Image
                src={mainImage as string}
                alt={product?.name || "Product Image"}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex gap-2 mt-4">
              {product?.images?.map((img) => (
                <Image
                  key={img.url}
                  src={img.url}
                  alt={product.name}
                  width={70}
                  height={70}
                  onClick={() => setSelectedImage(img.url)}
                  className="rounded-md border cursor-pointer hover:scale-105 transition"
                />
              ))}
            </div>
          </div>
          <div className="w-full md:w-1/2 space-y-4">
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <p className="text-lg font-semibold text-green-700">
              ${product?.price}
            </p>
            <p className="text-sm text-gray-500 uppercase">
              Category: {product?.category?.name?.toUpperCase()}
            </p>
            <div className="flex gap-4 items-center">
              <span className="text-yellow-500 font-semibold">
                Ratings: {product?.ratings.average}
              </span>
              <span className="text-gray-600">
                Total review: {product?.ratings?.totalReviews}
              </span>
            </div>
            <p className="text-sm text-gray-700">Stocks: {product?.stock}</p>
            {product?.is_featured && (
              <p className="text-sm font-medium text-white bg-blue-600 inline-block px-3 py-1 rounded">
                Featured
              </p>
            )}
            <div className="mt-4">
              <AddWishList id={product._id} />
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-4">
              <input
                type="number"
                placeholder="1"
                className="border rounded px-3 py-1 w-24 focus:outline-none"
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
                onclick={() =>
                  router.push(
                    `/checkout?productId=${product._id}&quantity=${productCartQuantity}`
                  )
                }
              />
            </div>
            <p className="mt-4 text-gray-700">{product?.description}</p>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <NewReviewForm id={product._id} />
      </div>

      {product?.reviews !== null && product?.reviews.length > 0 && (
        <div className="mb-10 mx-20 space-y-6">
          <h2 className="text-xl font-semibold border-b pb-2">
            Customer Reviews
          </h2>
          {product?.reviews.map((review, idx) => (
            <div
              key={idx}
              className="border p-4 rounded-md bg-gray-50 shadow-sm"
            >
              <p className="font-semibold">{review?.name}</p>
              {review?.rating && (
                <p className="text-sm text-yellow-600">
                  Rating: {review?.rating} / 5
                </p>
              )}
              {review?.comment && (
                <div className="text-gray-700 mt-1">“{review?.comment}”</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductDetailClient;
