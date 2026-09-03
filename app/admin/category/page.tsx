"use client";
import AllCategoryList from "@/components/AdminProductPage/AllCategoryList";
import CategoryForm from "@/components/AdminProductPage/CategoryForm";
import AdminSidebar from "@/components/adminSidebar";
import ConfirmButton from "@/components/buttons/ConfirmButton";
import CategoryReorderModal from "@/components/CategoryReorderModal";
import LoadingContainer from "@/components/LoadingScreen/LoadingContainer";
import RadioSelectModal from "@/components/RadioSelectModal";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { deleteCategory, fetchCategories, reorderCategories } from "@/redux/slices/categorySlice";
import { Category as CategoryType } from "@/types/category";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Category = () => {
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [showCategoryEditForm, setShowCategoryEditForm] = useState(false);
  const [editCategory, setEditCategory] = useState<CategoryType | null>(null);
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [isReorderOpen, setReorderOpen] = useState(false);
  const [reassignTarget, setReassignTarget] = useState<{
    categoryId: string;
    categoryName: string;
    productCount: number;
  } | null> (null);
  const [selectedReassignId, setSelectedReassignId] = useState<string>("");
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { categories, loading, error } = useAppSelector(
    (state) => state.categories
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
      toast.success("Login to your account");
    }
  }, [isAuthenticated]);

  const handleEditClick = (category: CategoryType) =>{
      setEditCategory(category)
      setShowCategoryEditForm(true);
      setShowCategoryForm(false);
  }

  const handleDeleteCatogory = async(id: string) =>{
    const category = categories.find((c) => c._id === id);
    const result = await dispatch(deleteCategory({ categoryId: id }));

    if(deleteCategory.fulfilled.match(result)){
      toast.success(`"${category?.name}" deleted successfully`);
      return;
    };

    if(result.payload?.productCount){
      setReassignTarget({
        categoryId: id,
        categoryName: category?.name || '',
        productCount: result.payload.productCount,
      })
    }else{
      toast.error(result.payload?.message || "Failed to delete category");
    }
  }

  const handleReassignSubmit = async () =>{
    if (!reassignTarget || !selectedReassignId) return;

    const result = await dispatch(
      deleteCategory({
        categoryId: reassignTarget.categoryId,
        reassignTo: selectedReassignId
      })
    )

    if (deleteCategory.fulfilled.match(result)) {
      toast.success(`deleted successfully and reassigned to ${reassignTarget.categoryName}`);
      setReassignTarget(null);
      setSelectedReassignId("");
    } else {
      console.error(result.payload?.message);
    }
  }

  const handleSaveCategoryOrder = (orderedIds: string[]): void => {
    dispatch(reorderCategories(orderedIds));
    setReorderOpen(false);
  };

  
  if (loading) return <LoadingContainer />;

  return (
    <div className="adminMainSection">
      <AdminSidebar />
      <div className="w-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Product Categories</h1>
          <div className="flex gap-5">
            <ConfirmButton
              buttonText="Reorder Categories"
              onclick={() => setReorderOpen(true)}
            />
            <ConfirmButton
              buttonText="Add Category"
              onclick={() => setShowCategoryForm(true)}
            />
          </div>
        </div>
        {isReorderOpen && (
          <CategoryReorderModal
            categories={categories}
            onSave={handleSaveCategoryOrder}
            onClose={() => setReorderOpen(false)}
          />
        )}
        {reassignTarget && (
          <RadioSelectModal
            title={`Reassign products from ${reassignTarget.categoryName}`}
            detail={`${reassignTarget.productCount} product(s) use this category. Pick a
        category to move them to before deleting.`}
            options={categories
              .filter((c) => c._id !== reassignTarget.categoryId)
              .map((c) => ({ id: c._id, label: c.name }))}
            selectedId={selectedReassignId}
            onSelect={setSelectedReassignId}
            onCancel={() => {
              setReassignTarget(null);
              setSelectedReassignId("");
            }}
            onSubmit={handleReassignSubmit}
            submitLabel="Reassign & Delete"
          />
        )}
        {showCategoryForm ? (
          <CategoryForm
            title="Upload Category"
            setShowCategoryForm={setShowCategoryForm}
          />
        ) : showCategoryEditForm && editCategory ? (
          <CategoryForm
            title="Edit Category"
            setShowCategoryForm={setShowCategoryEditForm}
            isEdit={true}
            initialData={editCategory}
          />
        ) : (
          <AllCategoryList
            onEdit={handleEditClick}
            onDelete={handleDeleteCatogory}
            categories={categories}
          />
        )}
      </div>
    </div>
  );
};

export default Category;
