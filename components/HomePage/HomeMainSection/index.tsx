"use client";
import React, { useEffect } from "react";
import ProductSlideSection from "../ProductSliceSection";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchMostSoldProducts,
  fetchProducts,
} from "@/redux/slices/productSlice";
import LoadingScreen from "@/components/LoadingScreen";
import HeroHomeSection from "../HeroHomePage";

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
    <div className="w-full flex flex-col gap-14 md:gap-18">
      <HeroHomeSection 
        headerText="Curated essentials"
        TitleText="Elevated finds for a quieter kind of luxury."
        descriptionText="Discover polished pieces selected for everyday utility, lasting texture, and a refined point of view."
      />
      {productsInfo && (
        <section>
          <h2 className="headline">Featured Products</h2>
          <ProductSlideSection allProductSlideSections={productsInfo} />
        </section>
      )}
      {mostSoldProducts && (
        <section>
          <h2 className="headline">Best Selling Products</h2>
          <ProductSlideSection
            allProductSlideSections={{
              total: mostSoldProducts.length,
              page: 1,
              pages: 1,
              products: mostSoldProducts,
            }}
          />
        </section>
      )}
    </div>
  );
};

export default HomeMainSection;
