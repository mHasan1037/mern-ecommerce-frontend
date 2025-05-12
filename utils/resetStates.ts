import { AppDispatch } from "@/redux/store";
import {setSelectedCategory } from "@/redux/slices/categorySlice"
import { setSearchTerm } from "@/redux/slices/productSlice"

export const resetStates = () => (dispatch: AppDispatch) => {
  dispatch(setSelectedCategory(""));
  dispatch(setSearchTerm(""));
};