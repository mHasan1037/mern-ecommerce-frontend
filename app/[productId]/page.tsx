"use client";
import AddToCart from "@/components/AddToCart";
import AddWishList from "@/components/AddWishList";
import NewReviewForm from "@/components/NewReviewForm";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchProductById } from "@/redux/slices/productSlice";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface ProductDetailsProps {
  params: {
    productId: string;
  };
}

const ProductDetail = ({ params }: ProductDetailsProps) => {
  const { productId } = params;
  const [productCartQuantity, setProductCartQuantity] = useState(0);
  const dispatch = useAppDispatch();
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

  if (singleLoading) return <p>Loading product details...</p>;
  if (error) return <p>Error: {error}</p>;

  console.log("singleProduct", product);
  if (!product) {
    return <div>No product found</div>;
  }

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
            {product?.images.map((img) => {
              return (
                <Image
                  src={img.url}
                  alt={product.name}
                  width={50}
                  height={50}
                />
              );
            })}
          </div>
        </div>
        <div>
          <h1>{product.name}</h1>
          <p>$ {product?.price}</p>
          <p>Category: {product?.category.name.toUpperCase()}</p>
          <div className="flex gap-4">
            <p>{product?.ratings.average}</p>
            <p>Ratings: {product?.ratings.totalReviews}</p>
          </div>
          <p>Stocks: {product?.stock}</p>
          <p>{product?.is_featured && <b>Featured product</b>}</p>
          <AddWishList id={product._id} />
          <div>
            <input
              type="number"
              placeholder="0"
              value={productCartQuantity}
              min={0}
              onChange={(e) => setProductCartQuantity(Number(e.target.value))}
            />
            <AddToCart productId={product._id} quantity={productCartQuantity} />
          </div>
          <p>{product?.description}</p>
        </div>
      </div>

      {/*Review section*/}
      <NewReviewForm id={product._id} />

      {product?.reviews !== null && (
        <div>
          {product?.reviews.map((review) => (
            <div>
              <div>
                <p>{review.name}</p>
                <p>Rating: {review.rating} / 5</p>
              </div>
              <div>Comment: {review.comment}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
