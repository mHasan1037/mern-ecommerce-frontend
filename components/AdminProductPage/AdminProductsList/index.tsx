import { ProductType } from "@/types/product";
import { MdEdit, MdDelete } from "react-icons/md";
import LoadingContainer from "@/components/LoadingScreen/LoadingContainer";
import NoProductFound from "@/components/HomePage/NoProductFound";

interface AdminProductsListProps {
  products?: ProductType[];
  loading: boolean;
  error: string | null;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  onView: (id: string) => void;
}

const AdminProductsList = ({
  products,
  loading,
  error,
  onDelete,
  onEdit,
  onView,
}: AdminProductsListProps) => {
  if (loading) return <LoadingContainer />;
  if (error) return <p>Error fetching products: {error}</p>;
  if (!products) return <LoadingContainer />;
  if (products?.length === 0) {
    return (
      <div className="bg-white p-6 rounded-md shadow-md">
        <NoProductFound />
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4">All Products</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2 border">Title</th>
              <th className="px-4 py-2 border">Category</th>
              <th className="px-4 py-2 border">Stock</th>
              <th className="px-4 py-2 border">Price</th>
              <th className="px-4 py-2 border">Ratings</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50">
                <td
                  className="px-4 py-2 border cursor-pointer text-mainBg2 hover:underline"
                  onClick={() => onView(product._id)}
                >
                  {product.name}
                </td>
                <td className="px-4 py-2 border">{product.category?.name}</td>
                <td className="px-4 py-2 border">{product.stock}</td>
                <td className="px-4 py-2 border">${product.price}</td>
                <td className="px-4 py-2 border">
                  {product.ratings?.average ?? 0}
                </td>
                <td className="px-4 py-2 border">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEdit(product._id)}
                      className="text-blue-600 hover:text-blue-800 transition"
                    >
                      <MdEdit size={18} />
                    </button>
                    <button
                      onClick={() => onDelete(product._id)}
                      className="text-red-600 hover:text-red-800 transition"
                    >
                      <MdDelete size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProductsList;
