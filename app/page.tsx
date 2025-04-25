import CategorySidebar from "@/components/HomePage/CategorySidebar";
import HomeMainSection from "@/components/HomePage/HomeMainSection";

export default function Home() {
  return (
    <div className="m-5 flex gap-10">
       <CategorySidebar />
       <HomeMainSection />
    </div>
  );
}
