import { OrderCard as  OrderCardType } from "@/types/chat";


const OrderCard = ({ card }: { card: OrderCardType }) => (
  <div className="mt-2 rounded-lg border border-gray-200 bg-white p-2 text-xs">
    <p className="font-medium capitalize"><b>Order status: </b> {card.status}</p>
    <ul className="mt-1 space-y-1">
      {card.items.map((item, i) => (
        <li key={i}>
          <div>
            <b>Product Name: </b>{item.name}
          </div>
          <div>
            <b>Product Quantity: </b>{item.quantity}
          </div>
          {item.price != null && <div><b>Price: </b>৳{item.price}</div>}
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
