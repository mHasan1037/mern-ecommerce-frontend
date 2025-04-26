"use client"
import CategoryProductsSection from "@/components/CategoryProductsSection";
import CategorySidebar from "@/components/HomePage/CategorySidebar";
import HomeMainSection from "@/components/HomePage/HomeMainSection";
import { useAppSelector } from "@/redux/hooks";

export default function Home() {
  const selectedCategory = useAppSelector(
    (state) => state.categories.selectedCategory
  );
  return (
    <div className="m-5 flex gap-10">
      <CategorySidebar />
      {selectedCategory ? <CategoryProductsSection /> : <HomeMainSection />}
    </div>
  );
}
