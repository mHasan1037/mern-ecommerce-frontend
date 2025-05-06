import EditProduct from "./EditProduct";

export async function generateStaticParams() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products`);
  const json = await res.json();
  const products = json.products;

  return products.map((product: { _id: string }) => ({
    id: product._id,
  }));
}

export default function EditProductPage(props: any) {
  const productId = props.params?.id;
  return <EditProduct params={{ id: productId }} />;
}