"use client"
import ProductsSection from "@/components/ProductsSection";
import CategorySidebar from "@/components/HomePage/CategorySidebar";
import HomeMainSection from "@/components/HomePage/HomeMainSection";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";
import { fetchProducts } from "@/redux/slices/productSlice";

export default function Home() {
  const dispatch = useAppDispatch();
  const selectedCategory = useAppSelector(
    (state) => state.categories.selectedCategory
  );
  const searchTerm = useAppSelector((state) => state.products.searchTerm);

  const showCategoryOrSearch = !!searchTerm || !!selectedCategory;

  useEffect(()=>{
     const filters: any = {};

     if(searchTerm) filters.search = searchTerm;
     if(selectedCategory) filters.category = selectedCategory;

     if(searchTerm || selectedCategory){
      dispatch(fetchProducts(filters));
     }

  }, [dispatch, searchTerm, selectedCategory])

  return (
    <main className="storefront-page">
      <div className="storefront-shell flex flex-col gap-6 py-6 lg:flex-row lg:gap-8 lg:py-10">
      <CategorySidebar />
      <div className="w-full min-w-0">
        {showCategoryOrSearch ? <ProductsSection /> : <HomeMainSection />}
      </div>
      </div>
    </main>
  );
}
