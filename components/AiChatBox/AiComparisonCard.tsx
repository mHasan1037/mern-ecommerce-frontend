import { ComparisonCard } from "@/types/chat";
import Link from "next/link";

interface AiComparisonCardProps {
  card: ComparisonCard;
}

const AiComparisonCard = ({ card }: AiComparisonCardProps) => {
  const [a, b] = card.products;
  if (!a || !b) return null;

  const rows: { label: string; a: string | number; b: string | number }[] = [
    { label: "Price", a: `৳${a.price}`, b: `৳${b.price}` },
    { label: "Category", a: a.category ?? "—", b: b.category ?? "—" },
    { label: "Rating", a: `${a.rating.toFixed(1)} (${a.totalReviews})`, b: `${b.rating.toFixed(1)} (${b.totalReviews})` },
    { label: "Stock", a: a.inStock ? "In stock" : "Out of stock", b: b.inStock ? "In stock" : "Out of stock" },
  ];

  return (
    <div className="mt-2 border border-gray-200 rounded-xl overflow-hidden bg-white text-xs">
      <div className="grid grid-cols-2 gap-2 p-2 border-b border-gray-100">
        {[a, b].map((p) => (
          <div key={p.id} className="flex flex-col items-center text-center gap-1">
            {p.image && (
              <img src={p.image} alt={p.name} className="w-14 h-14 object-cover rounded-lg" />
            )}
            <span className="font-medium text-gray-800 line-clamp-2">{p.name}</span>
          </div>
        ))}
      </div>

      <table className="w-full">
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="border-t border-gray-100">
              <td className="px-2 py-1 text-gray-500 w-1/4">{row.label}</td>
              <td className="px-2 py-1 text-center">{row.a}</td>
              <td className="px-2 py-1 text-center">{row.b}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="grid grid-cols-2 gap-2 p-2 border-t border-gray-100">
        {[a, b].map((p) => (
          <Link
            key={p.id}
            href={p.link ?? `/products/${p.id}`}
            className="text-blue-600 underline text-center"
          >
            View →
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AiComparisonCard;