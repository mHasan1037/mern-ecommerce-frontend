import Image from "next/image";
import Link from "next/link";
import { ProductListCard as ProductListCardType } from "@/types/chat";

const ProductListCard = ({ card }: { card: ProductListCardType }) => (
  <div className="mt-2 space-y-2">
    {card.products.map((product, i) => (
      <div
        key={i}
        className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white p-2 text-xs"
      >
        {product.image && (
          <Image
            src={product.image}
            alt={product.name}
            width={36}
            height={36}
            className="rounded object-cover shrink-0"
          />
        )}
        <div className="flex-1 min-w-0">
          <p className="truncate font-medium">{product.name}</p>
          <p className="text-gray-600">৳{product.price}</p>
        </div>
        {product.link && (
          <Link href={product.link} className="text-blue-600 underline shrink-0">
            View
          </Link>
        )}
      </div>
    ))}
  </div>
);

export default ProductListCard;