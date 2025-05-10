"use client";
import { fetchCategories } from "@/redux/slices/categorySlice";
import Image from "next/image";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import LoadingContainer from "@/components/LoadingScreen/LoadingContainer";


const AllCategoryList = () => {
    const dispatch = useAppDispatch();
    const { categories, loading, error } = useAppSelector((state) => state.categories);

    useEffect(()=>{
       dispatch(fetchCategories())
    }, [dispatch]);

    if(loading) return <LoadingContainer />
    if(error) return <p>Error: {error}</p>

  return (
    <div className="flex gap-3">
      {categories.map((category) => {
        return (
          <div key={category._id}>
            <Image
              alt={category.name}
              src={category.image.url}
              width={100}
              height={100}
            />
            <h1>{category.name}</h1>
            <p>{category.description}</p>
            <button>Edit</button>
            <button>Delete</button>
          </div>
        );
      })}
    </div>
  );
};

export default AllCategoryList;
