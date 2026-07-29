import { OrderCard as  OrderCardType } from "@/types/chat";


const OrderCard = ({ card }: { card: OrderCardType }) => (
  <div className="mt-2 rounded-lg border border-gray-200 bg-white p-2 text-xs">
    <p className="font-medium capitalize">{card.status}</p>
    <ul className="mt-1 space-y-1">
      {card.items.map((item, i) => (
        <li key={i} className="flex justify-between">
          <span>
            {item.name} × {item.quantity}
          </span>
          {item.price != null && <span>৳{item.price}</span>}
        </li>
      ))}
    </ul>
    <div className="mt-1 border-t pt-1 flex justify-between font-medium">
      <span>Total</span>
      <span>৳{card.total}</span>
    </div>
  </div>
);

export default OrderCard;
