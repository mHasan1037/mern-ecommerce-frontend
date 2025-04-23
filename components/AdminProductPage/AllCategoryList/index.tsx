"use client";
import Image from "next/image";

interface Category {
  _id: string;
  name: string;
  description: string;
  image: {
    url: string;
  };
}

interface AllCategoryListProps {
  categires: Category[];
}

const AllCategoryList: React.FC<AllCategoryListProps> = ({ categires }) => {
  return (
    <div className="flex gap-3">
      {categires.map((category) => {
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
