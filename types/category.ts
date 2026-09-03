import { CloudinaryImage } from "./product";

export interface Category {
  _id: string;
  name: string;
  description: string;
  image: {
    url: string;
    public_id?: string;
  };
  parentCategory: {
    _id: string;
    name: string;
  } | null;
  isDeleted?: boolean;
}

interface CategoryState {
  categories: Category[];
  loading: boolean;
  error: string | null;
  selectedCategory: string | null;
}

export interface DeleteCategoryArgs {
  categoryId: string;
  reassignTo?: string;
}

export interface DeleteCategoryRejectValue {
  message: string;
  productCount?: number;
}

export const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: null,
  selectedCategory: null,
};

export interface CategoryFormData {
  name: string;
  description: string;
  parentCategory: {
    _id: string;
    name: string;
  } | null;
  image: CloudinaryImage | null;
}

export interface CreateCategoryArgs {
  formData: CategoryFormData;
  categoryId?: string;
}
