import EditProduct from "./EditProduct";

export const dynamic = "force-dynamic";

export default function EditProductPage(props: any) {
  const productId = props.params?.id;
  return <EditProduct params={{ id: productId }} />;
}