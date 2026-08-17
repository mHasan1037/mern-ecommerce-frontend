"use client";
import ProductsSection from "@/components/ProductsSection";
import CategorySidebar from "@/components/HomePage/CategorySidebar";
import HomeMainSection from "@/components/HomePage/HomeMainSection";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import { fetchProducts } from "@/redux/slices/productSlice";
import { ProductFilters } from "@/types/product";
import Pagination from "@/components/Pagination";

export default function Home() {
  const dispatch = useAppDispatch();
  const selectedCategory = useAppSelector(
    (state) => state.categories.selectedCategory,
  );
  const searchTerm = useAppSelector((state) => state.products.searchTerm);
  const productsInfo = useAppSelector((state) => state.products.productsInfo);
  const [page, setPage] = useState(1);

  const showCategoryOrSearch = !!searchTerm || !!selectedCategory;

  useEffect(() => {
    setPage(1);
  }, [searchTerm, selectedCategory]);

  useEffect(() => {
    const filters: ProductFilters = { page, limit: 20 };

    if (searchTerm) filters.search = searchTerm;
    if (selectedCategory) filters.category = selectedCategory;

    if (searchTerm || selectedCategory) {
      dispatch(fetchProducts(filters));
    }
  }, [dispatch, searchTerm, selectedCategory, page]);

  return (
    <main className="storefront-page">
      <div className="storefront-shell flex flex-col gap-6 py-6 lg:flex-row lg:gap-8 lg:py-10">
        <CategorySidebar />
        <div className="w-full min-w-0">
          {showCategoryOrSearch ? (
            <>
              <ProductsSection />
              {productsInfo && productsInfo.pages > 1 && (
                <div className="flex justify-center mt-6">
                  <Pagination
                    totalPages={productsInfo.pages}
                    page={page}
                    setPage={setPage}
                  />
                </div>
              )}
            </>
          ) : (
            <HomeMainSection />
          )}
        </div>
      </div>
    </main>
  );
}
