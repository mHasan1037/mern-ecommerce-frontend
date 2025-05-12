"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updateSingleProduct } from "@/redux/slices/productSlice";
import axiosInstance from "@/utils/axiosInstance";
import React, { useState } from "react";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { toast } from "react-toastify";

interface newReviewFormProps {
  id: string;
}

const initialReviewFeild = {
  rating: 0,
  comment: "",
};

const NewReviewForm: React.FC<newReviewFormProps> = ({ id }) => {
  const dispatch = useAppDispatch();
  const [reviewData, setReviewData] = useState(initialReviewFeild);
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const handleStarClick = (index: number) => {
    setReviewData((prev) => ({ ...prev, rating: index + 1 }));
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReviewData((prev) => ({ ...prev, comment: e.target.value }));
  };

  const handlePost = async () => {
    try {
      if (isAuthenticated) {
        const res = await axiosInstance.post(
          `/api/products/${id}/review`,
          reviewData
        );
        dispatch(updateSingleProduct(res.data.product));
        setReviewData(initialReviewFeild);
        toast.success("Review and rating added successfully");
      } else {
        toast.error("Login to give review");
      }
    } catch (error: any) {
      const message = error?.response?.data?.message || "Failed to post review";
      toast.error(message);
    }
  };

  return (
    <div className="mt-12 mb-10 bg-white border rounded-lg shadow-sm p-6 max-w-3xl mx-auto">
      <h1 className="text-xl font-semibold mb-4">Add your review</h1>
      <div className="flex items-center mb-4 gap-2">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            onClick={() => handleStarClick(i)}
            className="cursor-pointer text-yellow-500 hover:scale-110 transition-transform"
          >
            {i < reviewData.rating ? (
              <FaStar size={24} />
            ) : (
              <CiStar size={24} />
            )}
          </span>
        ))}
        <span className="ml-2 text-sm text-gray-500">
          {reviewData.rating} / 5
        </span>
      </div>
      <textarea
        value={reviewData.comment}
        onChange={handleCommentChange}
        className="w-full h-28 border rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
      ></textarea>
      <div className="mt-4">
        <button
          onClick={handlePost}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default NewReviewForm;
