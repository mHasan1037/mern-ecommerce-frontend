"use client";
import { useAppDispatch } from "@/redux/hooks";
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

  const handleStarClick = (index: number) => {
    setReviewData((prev) => ({ ...prev, rating: index + 1 }));
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReviewData((prev) => ({ ...prev, comment: e.target.value }));
  };

  const handlePost = async () => {
    try {
      const res = await axiosInstance.post(
        `/api/products/${id}/review`,
        reviewData
      );
      dispatch(updateSingleProduct(res.data.product));
      setReviewData(initialReviewFeild);
    } catch (error: any) {
      const message = error?.response?.data?.message || "Failed to post review";
      toast.error(message);
    }
  };

  return (
    <div>
      <div>
        <h1>Add your review</h1>
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              onClick={() => handleStarClick(i)}
              className="cursor-pointer"
            >
              {i < reviewData.rating ? (
                <FaStar size={24} />
              ) : (
                <CiStar size={24} />
              )}
            </span>
          ))}
        </div>
        <textarea
          value={reviewData.comment}
          onChange={handleCommentChange}
          className="border border-green-400"
        ></textarea>
        <button onClick={handlePost}>Post</button>
      </div>
    </div>
  );
};

export default NewReviewForm;
