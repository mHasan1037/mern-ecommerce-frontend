import ProductDetailClient from "./ProductDetails";

export async function generateStaticParams() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products`);
  const json = await res.json();
  const products = json.products;

  return products.map((product: { _id: string }) => ({
    productId: product._id,
  }));
}

type Props = {
  params: { productId: string };
};

const ProductPage = ({ params }: Props) => {
  return <ProductDetailClient productId={params.productId} />
};

export default ProductPage;
