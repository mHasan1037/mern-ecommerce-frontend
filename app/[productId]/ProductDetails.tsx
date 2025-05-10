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
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { singleProduct: product, singleLoading, error } = useAppSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductById(productId));
    }
  }, [dispatch, productId]);

  if (singleLoading) return <LoadingScreen />;
  if (error) return <p>Error: {error}</p>;
  if (!product) return <p>No product found.</p>;

  return (
    <div>
      <div className="flex gap-10">
        <div>
          <Image
            src={product?.images[0]?.url}
            alt={product?.name}
            width={250}
            height={250}
          />
          <div className="flex gap-2">
            {product?.images?.map((img) => (
              <Image
                key={img.url}
                src={img.url}
                alt={product.name}
                width={50}
                height={50}
              />
            ))}
          </div>
        </div>
        <div>
          <h1>{product.name}</h1>
          <p>$ {product?.price}</p>
          <p>Category: {product?.category?.name?.toUpperCase()}</p>
          <div className="flex gap-4">
            <p>{product?.ratings.average}</p>
            <p>Ratings: {product?.ratings?.totalReviews}</p>
          </div>
          <p>Stocks: {product?.stock}</p>
          <p>{product?.is_featured && <b>Featured product</b>}</p>
          <AddWishList id={product._id} />
          <div>
            <input
              type="number"
              placeholder="1"
              value={productCartQuantity}
              min={1}
              onChange={(e) => setProductCartQuantity(Number(e.target.value))}
            />
            <AddToCart
              productId={product._id}
              quantity={productCartQuantity}
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
          <p>{product?.description}</p>
        </div>
      </div>

      <NewReviewForm id={product._id} />

      {product?.reviews !== null && (
        <div>
          {product?.reviews.map((review, idx) => (
            <div key={idx}>
              <p>{review?.name}</p>
              {review?.rating && <p>Rating: {review?.rating} / 5</p>}
              {review?.comment && <div>Comment: {review?.comment}</div>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductDetailClient;
