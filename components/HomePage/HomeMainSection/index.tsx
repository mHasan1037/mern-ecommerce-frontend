"use client";
import React, { useEffect } from "react";
import ProductSlideSection from "../ProductSliceSection";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchMostSoldProducts,
  fetchProducts,
} from "@/redux/slices/productSlice";
import LoadingScreen from "@/components/LoadingScreen";

const HomeMainSection = () => {
  const dispatch = useAppDispatch();
  const { productsInfo, mostSoldProducts, loading, error } = useAppSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts({ is_featured: true }));
    dispatch(fetchMostSoldProducts(10));
  }, [dispatch]);

  if (loading) return <LoadingScreen />;
  if (error) return <p>Error fetching products: {error}</p>;

  return (
    <div className="w-full flex flex-col gap-16">
      {productsInfo && (
        <div>
          <h2 className="headline">Featured Products</h2>
          <ProductSlideSection allProductSlideSections={productsInfo} />
        </div>
      )}
      {mostSoldProducts && (
        <div>
          <h2 className="headline">Best Selling Products</h2>
          <ProductSlideSection
            allProductSlideSections={{
              total: mostSoldProducts.length,
              page: 1,
              pages: 1,
              products: mostSoldProducts,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default HomeMainSection;
