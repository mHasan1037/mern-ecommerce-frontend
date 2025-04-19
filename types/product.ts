interface Category {
    name: string;
    slug: string;
    _id: string;
  }
  
  interface Image {
    url: string;
    public_id: string;
    altText?: string;
    _id: string;
  }
  
  interface Rating {
    average: number;
    totalReviews: number;
  }
  
  interface Review {
    user: string;
    name: string;
    comment: string;
    rating: number;
    createdAt: string;
  }
  
  export interface ProductType {
    _id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    is_featured: boolean;
    category: Category;
    images: Image[];
    ratings: Rating;
    reviews: Review[];
    createdAt: string;
    updatedAt: string;
  }

  export interface CloudinaryImage {
    url: string;
    public_id: string;
  }

  export type ProductFormDataType = {
    name: string;
    description: string;
    price: string;
    category: string;
    stock: string;
    images: CloudinaryImage[];
    is_featured: string;
  };
  